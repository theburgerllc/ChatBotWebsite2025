import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { trackServerEvent, POSTHOG_EVENTS } from "@/lib/posthog-server";
import { verifyTavusWebhook, verifyWebhookTimestamp, parseWebhookPayload } from "@/lib/webhook";

export const runtime = "nodejs"; // ensure Node runtime, not edge

async function writeEvent(line: string) {
  const day = new Date().toISOString().slice(0, 10);
  const dir = join(process.cwd(), "diagnostics", "events");
  await mkdir(dir, { recursive: true });
  await appendFile(join(dir, `${day}.jsonl`), line + "\n", "utf8");
}

export async function POST(req: NextRequest) {
  try {
    // Get raw payload for signature verification
    const rawPayload = await req.text();
    
    // Verify webhook signature
    const signature = req.headers.get('x-tavus-signature');
    const timestamp = req.headers.get('x-timestamp');
    const verification = verifyTavusWebhook(rawPayload, signature, timestamp);

    if (!verification.valid) {
      console.error('[Tavus Video Webhook] Signature verification failed:', verification.reason);
      return NextResponse.json(
        { error: 'Webhook verification failed', reason: verification.reason },
        { status: 401 }
      );
    }
    
    // Parse payload
    let payload;
    try {
      payload = JSON.parse(rawPayload);
    } catch (error) {
      console.error('[Tavus Video Webhook] Invalid JSON payload');
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
    
    // Additional timestamp verification from payload (already checked in webhook verification)
    const payloadTimestamp = payload.timestamp;
    if (payloadTimestamp && !timestamp && !verifyWebhookTimestamp(payloadTimestamp)) {
      console.error('[Tavus Video Webhook] Payload timestamp too old or invalid');
      return NextResponse.json(
        { error: 'Request timestamp invalid or too old' },
        { status: 400 }
      );
    }
    
    // Parse and validate webhook payload structure (fallback for video webhooks)
    let validatedPayload = parseWebhookPayload(payload);
    if (!validatedPayload) {
      // For video webhooks, create a fallback structure
      validatedPayload = {
        event_type: payload.status || payload.type || 'video.unknown',
        conversation_id: payload.video_id || payload.videoId || 'unknown',
        timestamp: payload.timestamp || new Date().toISOString(),
        data: payload,
      };
    }
    
    // Log the validated payload for debugging
    console.log("[Tavus Video Webhook] Received:", JSON.stringify(validatedPayload).substring(0, 500));
    
    // Write to JSONL file
    await writeEvent(JSON.stringify({ 
      ts: Date.now(), 
      topic: "video", 
      payload: validatedPayload.data
    }));
    
    // Track in PostHog
    const videoId = validatedPayload.data.video_id || validatedPayload.data.videoId || validatedPayload.conversation_id;
    const status = validatedPayload.data.status || validatedPayload.data.state || validatedPayload.event_type;
    
    // Track general webhook received event
    await trackServerEvent(
      videoId,
      POSTHOG_EVENTS.WEBHOOK_VIDEO_RECEIVED,
      {
        status,
        video_id: videoId,
        raw_payload: validatedPayload.data,
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        userAgent: req.headers.get('user-agent'),
        webhook_verified: verification.valid,
        verification_reason: verification.reason,
      }
    );
    
    // Track specific status types
    switch (status) {
      case 'completed':
      case 'complete':
      case 'success':
        await trackServerEvent(
          videoId,
          POSTHOG_EVENTS.WEBHOOK_VIDEO_COMPLETED,
          { 
            video_id: videoId,
            video_url: validatedPayload.data.video_url || validatedPayload.data.url,
            duration: validatedPayload.data.duration,
            ...validatedPayload.data 
          }
        );
        break;
      case 'error':
      case 'failed':
        await trackServerEvent(
          videoId,
          POSTHOG_EVENTS.WEBHOOK_VIDEO_ERROR,
          { 
            video_id: videoId,
            error: validatedPayload.data.error || validatedPayload.data.message,
            error_code: validatedPayload.data.error_code,
            ...validatedPayload.data 
          }
        );
        break;
    }
    
    // Return 200 immediately to acknowledge receipt
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Tavus video webhook error:", err);
    // Still return 200 to avoid retries, but log the error
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

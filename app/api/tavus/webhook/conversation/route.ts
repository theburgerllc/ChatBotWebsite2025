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
      console.error('[Tavus Conversation Webhook] Signature verification failed:', verification.reason);
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
      console.error('[Tavus Conversation Webhook] Invalid JSON payload');
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
    
    // Additional timestamp verification from payload (already checked in webhook verification)
    const payloadTimestamp = payload.timestamp;
    if (payloadTimestamp && !timestamp && !verifyWebhookTimestamp(payloadTimestamp)) {
      console.error('[Tavus Conversation Webhook] Payload timestamp too old or invalid');
      return NextResponse.json(
        { error: 'Request timestamp invalid or too old' },
        { status: 400 }
      );
    }
    
    // Parse and validate webhook payload structure
    const validatedPayload = parseWebhookPayload(payload);
    if (!validatedPayload) {
      console.error('[Tavus Conversation Webhook] Invalid payload structure');
      return NextResponse.json(
        { error: 'Invalid payload structure' },
        { status: 400 }
      );
    }
    
    // Log the validated payload for debugging
    console.log("[Tavus Conversation Webhook] Received:", JSON.stringify(validatedPayload).substring(0, 500));
    
    // Write to JSONL file
    await writeEvent(JSON.stringify({ 
      ts: Date.now(), 
      topic: "conversation", 
      payload: validatedPayload.data
    }));
    
    // Track in PostHog
    const conversationId = validatedPayload.conversation_id;
    const eventType = validatedPayload.event_type;
    
    // Track general webhook received event
    await trackServerEvent(
      conversationId,
      POSTHOG_EVENTS.WEBHOOK_CONVERSATION_RECEIVED,
      {
        event_type: eventType,
        conversation_id: conversationId,
        raw_payload: validatedPayload.data,
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        userAgent: req.headers.get('user-agent'),
        webhook_verified: verification.valid,
        verification_reason: verification.reason,
      }
    );
    
    // Track specific event types
    switch (eventType) {
      case 'conversation.joined':
      case 'joined':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_JOINED,
          { conversation_id: conversationId, ...validatedPayload.data }
        );
        break;
      case 'conversation.left':
      case 'left':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_LEFT,
          { conversation_id: conversationId, ...validatedPayload.data }
        );
        break;
      case 'conversation.transcript_ready':
      case 'transcript_ready':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_TRANSCRIPT_READY,
          { conversation_id: conversationId, ...validatedPayload.data }
        );
        break;
      case 'conversation.recording_ready':
      case 'recording_ready':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_RECORDING_READY,
          { conversation_id: conversationId, ...validatedPayload.data }
        );
        break;
      case 'conversation.summary_ready':
      case 'summary_ready':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_SUMMARY_READY,
          { conversation_id: conversationId, ...validatedPayload.data }
        );
        break;
    }
    
    // Return 200 immediately to acknowledge receipt
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Tavus conversation webhook error:", err);
    // Still return 200 to avoid retries, but log the error
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

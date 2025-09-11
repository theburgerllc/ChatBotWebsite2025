import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { trackServerEvent, POSTHOG_EVENTS } from "@/lib/posthog";

export const runtime = "nodejs"; // ensure Node runtime, not edge

async function writeEvent(line: string) {
  const day = new Date().toISOString().slice(0, 10);
  const dir = join(process.cwd(), "diagnostics", "events");
  await mkdir(dir, { recursive: true });
  await appendFile(join(dir, `${day}.jsonl`), line + "\n", "utf8");
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({}));
    
    // Log the raw payload for debugging
    console.log("[Tavus Video Webhook] Received:", JSON.stringify(payload).substring(0, 500));
    
    // Write to JSONL file
    await writeEvent(JSON.stringify({ 
      ts: Date.now(), 
      topic: "video", 
      payload 
    }));
    
    // Track in PostHog
    const videoId = payload.video_id || payload.videoId || 'unknown';
    const status = payload.status || payload.state || 'unknown';
    
    // Track general webhook received event
    await trackServerEvent(
      videoId,
      POSTHOG_EVENTS.WEBHOOK_VIDEO_RECEIVED,
      {
        status,
        video_id: videoId,
        raw_payload: payload,
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        userAgent: req.headers.get('user-agent'),
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
            video_url: payload.video_url || payload.url,
            duration: payload.duration,
            ...payload 
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
            error: payload.error || payload.message,
            error_code: payload.error_code,
            ...payload 
          }
        );
        break;
    }
    
    // TODO: Add signature verification when Tavus documents the header format
    // const signature = req.headers.get('x-tavus-signature');
    // if (signature && process.env.TAVUS_WEBHOOK_SECRET) {
    //   // Verify signature here
    // }
    
    // Return 200 immediately to acknowledge receipt
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Tavus video webhook error:", err);
    // Still return 200 to avoid retries, but log the error
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

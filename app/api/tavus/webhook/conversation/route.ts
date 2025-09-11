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
    console.log("[Tavus Conversation Webhook] Received:", JSON.stringify(payload).substring(0, 500));
    
    // Write to JSONL file
    await writeEvent(JSON.stringify({ 
      ts: Date.now(), 
      topic: "conversation", 
      payload 
    }));
    
    // Track in PostHog
    const conversationId = payload.conversation_id || payload.conversationId || 'unknown';
    const eventType = payload.event_type || payload.type || 'unknown';
    
    // Track general webhook received event
    await trackServerEvent(
      conversationId,
      POSTHOG_EVENTS.WEBHOOK_CONVERSATION_RECEIVED,
      {
        event_type: eventType,
        conversation_id: conversationId,
        raw_payload: payload,
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        userAgent: req.headers.get('user-agent'),
      }
    );
    
    // Track specific event types
    switch (eventType) {
      case 'conversation.joined':
      case 'joined':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_JOINED,
          { conversation_id: conversationId, ...payload }
        );
        break;
      case 'conversation.left':
      case 'left':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_LEFT,
          { conversation_id: conversationId, ...payload }
        );
        break;
      case 'conversation.transcript_ready':
      case 'transcript_ready':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_TRANSCRIPT_READY,
          { conversation_id: conversationId, ...payload }
        );
        break;
      case 'conversation.recording_ready':
      case 'recording_ready':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_RECORDING_READY,
          { conversation_id: conversationId, ...payload }
        );
        break;
      case 'conversation.summary_ready':
      case 'summary_ready':
        await trackServerEvent(
          conversationId,
          POSTHOG_EVENTS.WEBHOOK_CONVERSATION_SUMMARY_READY,
          { conversation_id: conversationId, ...payload }
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
    console.error("Tavus conversation webhook error:", err);
    // Still return 200 to avoid retries, but log the error
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/events";
import { verifyTavusWebhook, parseWebhookPayload, WebhookEventType } from "@/lib/webhook";
import { trackServerEvent, POSTHOG_EVENTS } from "@/lib/posthog-server";

/**
 * Tavus Webhook Handler
 * 
 * Processes webhook events from Tavus including:
 * - Conversation lifecycle events
 * - Utterances (user and AI speech)
 * - Perception tool calls
 * - Recording availability
 */

async function sendNotification(subject: string, body: string) {
  const sgMail = require("@sendgrid/mail");
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const to = process.env.SENDGRID_TO_EMAIL;
  
  if (!apiKey || !from || !to) {
    console.warn("Email notification skipped: Missing configuration", {
      hasApiKey: !!apiKey,
      hasFrom: !!from,
      hasTo: !!to
    });
    return;
  }
  
  sgMail.setApiKey(apiKey);
  
  try {
    await sgMail.send({
      to,
      from,
      subject,
      text: body,
      html: body.replace(/\n/g, "<br>")
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-tavus-signature');
    
    // Verify webhook signature
    if (!verifyTavusWebhook(rawBody, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    // Parse payload
    const payload = JSON.parse(rawBody);
    const parsed = parseWebhookPayload(payload);
    
    if (!parsed) {
      console.error('Invalid webhook payload structure');
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }
    
    const { event_type, conversation_id, timestamp, data } = parsed;
    
    // Log the event to file system
    await logEvent("webhook", "tavus", {
      event_type,
      conversation_id,
      timestamp,
      ...data
    });
    
    // Track event in PostHog (server-side)
    const distinctId = data.user_id || data.session_id || conversation_id;
    
    // Handle different event types
    switch (event_type) {
      case WebhookEventType.CONVERSATION_STARTED:
        await trackServerEvent(distinctId, POSTHOG_EVENTS.CONVERSATION_STARTED, {
          conversationId: conversation_id,
          vertical: data.metadata?.vertical,
          timestamp,
        });
        console.log(`Conversation started: ${conversation_id}`);
        break;
        
      case WebhookEventType.CONVERSATION_ENDED:
        await trackServerEvent(distinctId, POSTHOG_EVENTS.CONVERSATION_ENDED, {
          conversationId: conversation_id,
          duration: data.duration_seconds,
          timestamp,
        });
        
        // Send email notification for completed conversations
        const details = `
          Conversation ID: ${conversation_id}
          Duration: ${data.duration_seconds || 0}s
          Started: ${data.started_at || 'N/A'}
          Ended: ${timestamp}
          Vertical: ${data.metadata?.vertical || 'general'}
        `;
        await sendNotification("AI Video Conversation Completed", details);
        console.log(`Conversation ended: ${conversation_id}`);
        break;
        
      case WebhookEventType.UTTERANCE:
        // Track utterances for analytics
        const isUserUtterance = data.speaker === 'user';
        await trackServerEvent(
          distinctId,
          isUserUtterance ? POSTHOG_EVENTS.UTTERANCE_USER : POSTHOG_EVENTS.UTTERANCE_AI,
          {
            conversationId: conversation_id,
            text: data.text,
            duration: data.duration,
            timestamp,
          }
        );
        
        // Log significant utterances
        if (data.text && data.text.length > 10) {
          console.log(`Utterance in ${conversation_id}: ${data.speaker} - "${data.text.substring(0, 50)}..."`);
        }
        break;
        
      case WebhookEventType.PERCEPTION_TOOL_CALL:
        await trackServerEvent(distinctId, POSTHOG_EVENTS.PERCEPTION_TOOL_USED, {
          conversationId: conversation_id,
          tool: data.tool_name,
          parameters: data.parameters,
          timestamp,
        });
        console.log(`Perception tool used in ${conversation_id}: ${data.tool_name}`);
        break;
        
      case WebhookEventType.RECORDING_READY:
        console.log(`Recording ready for ${conversation_id}: ${data.recording_url}`);
        // Could store recording URL or send notification
        break;
        
      case WebhookEventType.ERROR:
        console.error(`Error in conversation ${conversation_id}:`, data.error);
        await trackServerEvent(distinctId, POSTHOG_EVENTS.CONVERSATION_ERROR, {
          conversationId: conversation_id,
          error: data.error,
          timestamp,
        });
        break;
        
      default:
        console.log(`Unhandled webhook event type: ${event_type}`);
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      event_type,
      conversation_id,
    });
    
  } catch (error) {
    console.error("Webhook processing error:", error);
    
    // Still return success to prevent webhook retries for processing errors
    // Log the error for debugging
    await logEvent("error", "webhook", {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { error: "Processing failed", details: error instanceof Error ? error.message : 'Unknown' },
      { status: 400 }
    );
  }
}

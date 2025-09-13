import { PostHog } from 'posthog-node';

/**
 * Server-side PostHog Analytics Integration
 * Provides server-side tracking capabilities only
 */

// Server-side client (for Node.js environments)
let posthogServer: PostHog | null = null;

export function getServerPostHog(): PostHog | null {
  if (typeof window !== 'undefined') {
    return null; // Don't use server client on client side
  }

  if (!posthogServer) {
    const apiKey = process.env.POSTHOG_KEY;
    const apiHost = process.env.POSTHOG_HOST || 'https://us.i.posthog.com';

    if (apiKey) {
      posthogServer = new PostHog(apiKey, {
        host: apiHost,
        flushAt: 1, // Flush events immediately in serverless environment
        flushInterval: 0, // Disable time-based flushing
      });
    }
  }

  return posthogServer;
}

/**
 * Track server-side event
 * @param distinctId - Unique user identifier
 * @param event - Event name
 * @param properties - Event properties
 */
export async function trackServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, any>
) {
  const ph = getServerPostHog();
  if (!ph) return;

  try {
    ph.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        $ip: properties?.ip,
        $user_agent: properties?.userAgent,
        source: 'server',
      },
    });

    // Ensure events are sent in serverless environment
    await ph.shutdown();
  } catch (error) {
    console.error('PostHog server tracking error:', error);
  }
}

// Standard event names for consistency
export const POSTHOG_EVENTS = {
  // Conversation events
  CONVERSATION_STARTED: 'Conversation Started',
  CONVERSATION_ENDED: 'Conversation Ended',
  CONVERSATION_ERROR: 'Conversation Error',

  // Widget events
  WIDGET_OPENED: 'Widget Opened',
  WIDGET_CLOSED: 'Widget Closed',
  WIDGET_ERROR: 'Widget Error',

  // Demo events
  DEMO_STARTED: 'Demo Started',
  DEMO_COMPLETED: 'Demo Completed',
  DEMO_ERROR: 'Demo Error',

  // User interactions
  UTTERANCE_USER: 'User Utterance',
  UTTERANCE_AI: 'AI Utterance',
  PERCEPTION_TOOL_USED: 'Perception Tool Used',

  // Business events
  LEAD_CAPTURED: 'Lead Captured',
  CHECKOUT_STARTED: 'Checkout Started',
  PAYMENT_SUCCESS: 'Payment Success',

  // Admin events
  ADMIN_LOGIN: 'Admin Login',
  ADMIN_EVENT_VIEWED: 'Admin Event Viewed',

  // Webhook events
  WEBHOOK_CONVERSATION_RECEIVED: 'Webhook Conversation Received',
  WEBHOOK_VIDEO_RECEIVED: 'Webhook Video Received',
  WEBHOOK_CONVERSATION_JOINED: 'Webhook Conversation Joined',
  WEBHOOK_CONVERSATION_LEFT: 'Webhook Conversation Left',
  WEBHOOK_CONVERSATION_TRANSCRIPT_READY: 'Webhook Transcript Ready',
  WEBHOOK_CONVERSATION_RECORDING_READY: 'Webhook Recording Ready',
  WEBHOOK_CONVERSATION_SUMMARY_READY: 'Webhook Summary Ready',
  WEBHOOK_VIDEO_COMPLETED: 'Webhook Video Completed',
  WEBHOOK_VIDEO_ERROR: 'Webhook Video Error',
} as const;

export type PostHogEventName = typeof POSTHOG_EVENTS[keyof typeof POSTHOG_EVENTS];
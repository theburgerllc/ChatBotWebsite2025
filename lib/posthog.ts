import posthog from 'posthog-js';
import { PostHog } from 'posthog-node';

/**
 * PostHog Analytics Integration
 * Provides both client-side and server-side tracking capabilities
 */

// Client-side initialization
if (typeof window !== 'undefined') {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
  
  if (apiKey) {
    posthog.init(apiKey, {
      api_host: apiHost,
      capture_pageview: false, // We'll manually track page views
      capture_pageleave: true,
      persistence: 'localStorage',
      autocapture: {
        dom_event_allowlist: ['click', 'submit'], // Only capture clicks and form submits
        element_allowlist: ['button', 'a', 'form'], // Only on these elements
      },
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded', posthog);
        }
      },
    });
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('PostHog API key not configured');
  }
}

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
} as const;

export type PostHogEventName = typeof POSTHOG_EVENTS[keyof typeof POSTHOG_EVENTS];

// Export the client-side instance
export default posthog;

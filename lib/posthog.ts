import posthog from 'posthog-js';

/**
 * PostHog Analytics Integration
 * Provides client-side tracking capabilities only
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

// Export the client-side instance
export default posthog;

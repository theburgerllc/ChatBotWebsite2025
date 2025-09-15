// Vendor-agnostic tracking (PostHog + GA4)
import posthog from '@/lib/posthog';
import { POSTHOG_EVENTS } from '@/lib/posthog';

declare global {
  interface Window {
    dataLayer?: any;
    gtag?: any;
  }
}

export interface Properties {
  [key: string]: any;
}

// Conversion Events for funnel analysis
export const CONVERSION_EVENTS = {
  // Micro conversions
  DEMO_QUALIFIED: 'demo_qualified',
  DEMO_10_SECONDS: 'demo_10_seconds_watched',
  DEMO_30_SECONDS: 'demo_30_seconds_watched',
  DEMO_COMPLETED: 'demo_completed',

  // Lead events
  EXIT_INTENT_SHOWN: 'exit_intent_shown',
  EXIT_INTENT_CONVERTED: 'exit_intent_converted',
  EMAIL_CAPTURED: 'email_captured',

  // Engagement
  ROI_CALCULATED: 'roi_calculated',
  ROI_EMAIL_CAPTURED: 'roi_email_captured',
  PRICING_VIEWED: 'pricing_viewed',
  TESTIMONIAL_PLAYED: 'testimonial_played',

  // Hero actions
  HERO_DEMO_CTA_CLICKED: 'hero_demo_cta_clicked',
  HERO_VIDEO_CTA_CLICKED: 'hero_video_cta_clicked',

  // Navigation
  DEMO_PAIN_POINT_SELECTED: 'demo_pain_point_selected',
  ROI_TO_PRICING_CLICKED: 'roi_to_pricing_clicked',
  ROI_TO_DEMO_CLICKED: 'roi_to_demo_clicked',

  // Conversion
  CHECKOUT_STARTED: 'checkout_started',
  PLAN_SELECTED: 'plan_selected',
};

/**
 * Track a conversion event with enhanced attribution
 * @param event - Event name
 * @param props - Event properties
 */
export function trackConversion(event: string, props: Properties = {}) {
  const attribution = getAttributionData();
  const enhancedProps = {
    ...props,
    ...attribution,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  };

  track(event, enhancedProps);

  // Store for funnel analysis
  storeConversionEvent(event, enhancedProps);
}

/**
 * Track an event across all analytics platforms
 * @param event - Event name
 * @param props - Event properties
 */
export function track(event: string, props: Properties = {}) {
  if (typeof window !== "undefined") {
    // Client-side tracking

    // PostHog (using imported instance)
    try {
      posthog.capture(event, props);
    } catch (e) {
      console.error("PostHog tracking error:", e);
    }

    // Google Analytics 4
    try {
      window.dataLayer?.push({ event, ...props });
      window.gtag?.('event', event, props);
    } catch (e) {
      console.error("GA tracking error:", e);
    }
  } else {
    // Server-side tracking
    if (process.env.NODE_ENV === 'development') {
      console.log("Server event:", event, props);
    }
    // Note: For server-side, use trackServerEvent directly with a distinctId
  }
}

/**
 * Get attribution data from URL parameters and referrer
 */
function getAttributionData() {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  return {
    source: urlParams.get('utm_source'),
    medium: urlParams.get('utm_medium'),
    campaign: urlParams.get('utm_campaign'),
    term: urlParams.get('utm_term'),
    content: urlParams.get('utm_content'),
    referrer: document.referrer,
    page: window.location.pathname,
  };
}

/**
 * Generate or retrieve session ID
 */
function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

/**
 * Store conversion events for funnel analysis
 */
function storeConversionEvent(event: string, props: Properties) {
  if (typeof window === "undefined") return;

  try {
    const events = JSON.parse(localStorage.getItem('conversionEvents') || '[]');
    events.push({ event, ...props });

    // Keep only last 50 events to prevent storage bloat
    if (events.length > 50) {
      events.splice(0, events.length - 50);
    }

    localStorage.setItem('conversionEvents', JSON.stringify(events));
  } catch (e) {
    console.error("Error storing conversion event:", e);
  }
}

/**
 * Get user's conversion journey
 */
export function getConversionJourney(): any[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem('conversionEvents') || '[]');
  } catch (e) {
    console.error("Error retrieving conversion journey:", e);
    return [];
  }
}

/**
 * Identify a user across analytics platforms
 * @param userId - Unique user identifier
 * @param traits - User traits/properties
 */
export function identify(userId: string, traits: Properties = {}) {
  if (typeof window !== "undefined") {
    // PostHog identification
    try {
      posthog.identify(userId, traits);
    } catch (e) {
      console.error("PostHog identify error:", e);
    }
    
    // GA4 user properties
    try {
      window.gtag?.('set', 'user_properties', {
        user_id: userId,
        ...traits
      });
    } catch (e) {
      console.error("GA identify error:", e);
    }
  }
}

/**
 * Reset user identification (e.g., on logout)
 */
export function reset() {
  if (typeof window !== "undefined") {
    try {
      posthog.reset();
    } catch {}
  }
}

// Re-export PostHog events for consistency
export { POSTHOG_EVENTS };

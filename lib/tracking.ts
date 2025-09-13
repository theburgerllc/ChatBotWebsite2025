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

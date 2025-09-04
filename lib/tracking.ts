// Vendor-agnostic tracking (PostHog + GA4)
declare global { 
  interface Window { 
    posthog?: any; 
    dataLayer?: any; 
    gtag?: any;
  } 
}

export interface Properties {
  [key: string]: any;
}

export function track(event: string, props: Properties = {}) {
  if (typeof window !== "undefined") {
    // Client-side tracking
    try { 
      window.posthog?.capture(event, props); 
    } catch (e) {
      console.error("PostHog tracking error:", e);
    }
    
    try { 
      window.dataLayer?.push({ event, ...props }); 
    } catch (e) {
      console.error("GA tracking error:", e);
    }
  } else {
    // Server-side tracking - log to console in development
    console.log("Server event:", event, props);
  }
}

export function identify(userId: string, traits: Properties = {}) {
  if (typeof window !== "undefined") {
    try {
      window.posthog?.identify(userId, traits);
    } catch {}
  }
}

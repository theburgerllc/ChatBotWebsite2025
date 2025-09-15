// lib/analytics.ts
// Minimal GA4 + optional PostHog helpers.
// GA4 events aligned to Google's recommended ecommerce taxonomy.

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params ?? {});

  // Also send to existing tracking system if available
  if (typeof window !== 'undefined' && 'track' in window) {
    try {
      (window as any).track(event, params);
    } catch (e) {
      // Ignore errors from existing tracking
    }
  }
}

export function initPostHog() {
  if (typeof window === 'undefined') return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  // Lazy import to avoid SSR issues
  import('posthog-js').then(({ default: posthog }) => {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: false
    });
  }).catch(() => {});
}

// Common event wrappers
export const Analytics = {
  demoStart() { track('tutorial_begin', { method: 'self_demo' }); },
  demoStep(n: number) { track('tutorial_progress', { step: n }); },
  demoFinish() { track('generate_lead', { method: 'self_demo' }); },
  liveDemoClick(vertical?: string) {
    track('select_promotion', {
      promotion_name: 'tavus_live_demo',
      vertical: vertical || 'general'
    });
  },
  pricingView() { track('view_item_list', { item_list_id: 'pricing_plans' }); },
  planSelect(planId: string) {
    track('select_item', {
      item_list_id: 'pricing_plans',
      items: [{ item_id: planId }]
    });
  },
  beginCheckout(value: number, planId?: string) {
    track('begin_checkout', {
      currency: 'USD',
      value,
      items: planId ? [{ item_id: planId, price: value }] : undefined
    });
  },
  purchaseServer(value: number, transactionId?: string) {
    track('purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value
    });
  },
  heroView(vertical: string) {
    track('view_promotion', {
      promotion_id: `hero_live_demo_${vertical}`,
      promotion_name: `Hero Live Demo (${vertical})`,
      creative_name: 'Hero section',
      creative_slot: 'above_the_fold',
      location_id: vertical,
    });
  },
  usageEstimated(minutes: number, planId: string) {
    track('configure', {
      item_id: planId,
      estimated_minutes: minutes,
      method: 'usage_estimator'
    });
  }
};
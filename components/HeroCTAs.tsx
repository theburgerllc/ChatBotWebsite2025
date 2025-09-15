// components/HeroCTAs.tsx
// Client-only CTA row used by /law, /health, /retail.
// It will *attempt* to call an existing Tavus trigger if present, otherwise fallback to /demos.
// No changes to Tavus files, calls, or routes.

'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Analytics } from '@/lib/analytics';

type Vertical = 'law' | 'health' | 'retail';

export function HeroCTAs({ vertical }: { vertical: Vertical }) {
  const router = useRouter();

  // Track hero view on mount
  useEffect(() => {
    Analytics.heroView(vertical);
  }, [vertical]);

  const onStartLiveDemo = useCallback(() => {
    // Track as a promotion interaction per GA4 guidance.
    Analytics.liveDemoClick(vertical);

    // Try existing Tavus triggers (unchanged); else fallback to /demos.
    // @ts-ignore
    if (vertical === 'law' && (window.tavus?.startLegal || (window as any).startLegalDemo)) {
      // @ts-ignore
      (window.tavus?.startLegal || (window as any).startLegalDemo)();
      return;
    }
    // @ts-ignore
    if (vertical === 'health' && (window.tavus?.startHealth || (window as any).startHealthDemo)) {
      // @ts-ignore
      (window.tavus?.startHealth || (window as any).startHealthDemo)();
      return;
    }
    // @ts-ignore
    if (vertical === 'retail' && (window.tavus?.startRetail || (window as any).startRetailDemo)) {
      // @ts-ignore
      (window.tavus?.startRetail || (window as any).startRetailDemo)();
      return;
    }
    // Fallback: send user to existing Demos page (no Tavus code changes).
    router.push('/demos');
  }, [router, vertical]);

  const onStartSelfDemo = useCallback(() => {
    // Track the user kicking off the self-guided flow.
    Analytics.demoStart();
    const el = document.querySelector('#self-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else router.push('/demos');
  }, [router]);

  const onSeePricing = useCallback(() => {
    // Helpful to send an intent signal as the user goes to pricing.
    Analytics.pricingView();
  }, []);

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3">
      <button
        onClick={onStartSelfDemo}
        className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Start 2-min self-guided demo
      </button>

      <a
        href="/pricing"
        onClick={onSeePricing}
        className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        See pricing
      </a>

      <button
        onClick={onStartLiveDemo}
        className="px-5 py-3 rounded-xl border border-primary bg-primary/10 hover:bg-primary hover:text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Start live video demo"
      >
        Start live video demo
      </button>
    </div>
  );
}
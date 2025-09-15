// lib/pricing.ts
// Typed pricing, estimator math, and Stripe-ready line items.
// Keep Stripe Price IDs in env. No Tavus changes here.

export type PlanId = 'basic' | 'starter' | 'growth' | 'scale';
export type AddOnId =
  | 'minutes_1k'
  | 'concurrency'
  | 'replica'
  | 'hipaa'
  | 'multilingual'
  | 'ivr'
  | 'sla';

export type Money = number; // USD in dollars

export interface Plan {
  id: PlanId;
  name: string;
  baseMinutes: number;     // included minutes / mo
  displayPrice: Money;     // shown on UI (monthly)
  stripePriceIdEnv: string; // env var name for Stripe Price ID
  features: string[];
  popular?: boolean;
  firstMonthDiscount?: number; // percentage off first month
}

export interface AddOn {
  id: AddOnId;
  name: string;
  displayPrice: Money;       // monthly
  stripePriceIdEnv: string;  // env var name
  quantityPerUnit?: number;  // used for packs if needed
  description: string;
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    baseMinutes: 25,
    displayPrice: 25,
    stripePriceIdEnv: 'STRIPE_PRICE_PLAN_BASIC',
    firstMonthDiscount: 50,
    features: [
      "25 conversation minutes/mo",
      "1 concurrent session",
      "Watermark on video",
      "Stock avatar only",
      "Email support"
    ]
  },
  {
    id: 'starter',
    name: 'Starter',
    baseMinutes: 150,
    displayPrice: 199,
    stripePriceIdEnv: 'STRIPE_PRICE_PLAN_STARTER',
    firstMonthDiscount: 15,
    popular: true,
    features: [
      "150 conversation minutes/mo",
      "2 concurrent sessions",
      "No watermark",
      "1 custom persona",
      "Custom scripts",
      "Priority email support"
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    baseMinutes: 1200,
    displayPrice: 599,
    stripePriceIdEnv: 'STRIPE_PRICE_PLAN_GROWTH',
    firstMonthDiscount: 10,
    features: [
      "1,200 conversation minutes/mo",
      "5 concurrent sessions",
      "No watermark",
      "3 custom personas",
      "Memories + Knowledge Base",
      "Custom scripts & workflows",
      "Dedicated support",
      "Advanced analytics"
    ]
  },
  {
    id: 'scale',
    name: 'Scale',
    baseMinutes: 5000,
    displayPrice: 1499,
    stripePriceIdEnv: 'STRIPE_PRICE_PLAN_SCALE',
    features: [
      "5,000 conversation minutes/mo",
      "15 concurrent sessions",
      "No watermark",
      "Unlimited custom personas",
      "Advanced AI training",
      "White-label options",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee"
    ]
  },
];

export const addOns: AddOn[] = [
  {
    id: 'minutes_1k',
    name: 'Extra Minutes (+1k)',
    displayPrice: 40,
    stripePriceIdEnv: 'STRIPE_PRICE_ADDON_MINUTES_1K',
    quantityPerUnit: 1000,
    description: "2× better than Tavus baseline. Scale on demand.",
    popular: true
  },
  {
    id: 'multilingual',
    name: 'Multilingual Support',
    displayPrice: 39,
    stripePriceIdEnv: 'STRIPE_PRICE_ADDON_MULTILINGUAL',
    description: "Support for 20+ languages with native accents"
  },
  {
    id: 'ivr',
    name: 'IVR & Call Routing',
    displayPrice: 59,
    stripePriceIdEnv: 'STRIPE_PRICE_ADDON_IVR',
    description: "Advanced phone integration and call routing"
  },
  {
    id: 'sla',
    name: 'Priority SLA',
    displayPrice: 99,
    stripePriceIdEnv: 'STRIPE_PRICE_ADDON_SLA',
    description: "99.9% uptime guarantee with priority support"
  },
  {
    id: 'concurrency',
    name: 'Extra Concurrency',
    displayPrice: 49,
    stripePriceIdEnv: 'STRIPE_PRICE_ADDON_CONCURRENCY',
    description: "Handle more simultaneous video calls"
  },
  {
    id: 'replica',
    name: 'Additional Replica',
    displayPrice: 199,
    stripePriceIdEnv: 'STRIPE_PRICE_ADDON_REPLICA',
    description: "Add another avatar/persona to your team"
  },
  {
    id: 'hipaa',
    name: 'HIPAA Compliance Mode',
    displayPrice: 59,
    stripePriceIdEnv: 'STRIPE_PRICE_ADDON_HIPAA',
    description: "Enhanced privacy controls for healthcare"
  },
];

export interface Totals {
  base: Money;
  overage: Money;
  addOns: Money;
  total: Money;
  overagePacks: number;
  firstMonthTotal?: Money;
}

export function envPriceId(envKey: string): string {
  const val = process.env[envKey];
  if (!val) {
    // During build time, return a placeholder to prevent build errors
    if (typeof window === 'undefined') {
      return `placeholder_${envKey.toLowerCase()}`;
    }
    throw new Error(`Missing Stripe price id for ${envKey}`);
  }
  return val;
}

export function computeOveragePacks(estimatedMonthlyMinutes: number, includedMinutes: number): number {
  const deficit = Math.max(0, estimatedMonthlyMinutes - includedMinutes);
  return Math.ceil(deficit / 1000); // sell overage in 1k-blocks
}

export function computeTotals(
  planId: PlanId,
  estimatedMonthlyMinutes: number,
  selectedAddOns: AddOnId[]
): Totals {
  const plan = plans.find(p => p.id === planId) ?? plans[0];
  const overagePacks = computeOveragePacks(estimatedMonthlyMinutes, plan.baseMinutes);
  const base = plan.displayPrice;
  const overage = overagePacks * (addOns.find(a => a.id === 'minutes_1k')?.displayPrice ?? 40);
  const addOnsPrice = selectedAddOns.reduce((sum, id) => {
    const match = addOns.find(a => a.id === id);
    return sum + (match?.displayPrice ?? 0);
  }, 0);
  const total = base + overage + addOnsPrice;

  // Calculate first month total if discount applies
  let firstMonthTotal: Money | undefined;
  if (plan.firstMonthDiscount) {
    const discountAmount = base * (plan.firstMonthDiscount / 100);
    firstMonthTotal = base - discountAmount + overage + addOnsPrice;
  }

  return { base, overage, addOns: addOnsPrice, total, overagePacks, firstMonthTotal };
}

export type StripeLineItem = { price: string; quantity: number };

export function toStripeLineItems(
  planId: PlanId,
  overagePacks: number,
  selectedAddOns: AddOnId[]
): StripeLineItem[] {
  const plan = plans.find(p => p.id === planId) ?? plans[0];
  const items: StripeLineItem[] = [
    { price: envPriceId(plan.stripePriceIdEnv), quantity: 1 },
  ];
  if (overagePacks > 0) {
    items.push({ price: envPriceId('STRIPE_PRICE_ADDON_MINUTES_1K'), quantity: overagePacks });
  }
  selectedAddOns.forEach(id => {
    const def = addOns.find(a => a.id === id);
    if (def) items.push({ price: envPriceId(def.stripePriceIdEnv), quantity: 1 });
  });
  return items;
}
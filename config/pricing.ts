export type AddOn = { 
  id: string; 
  title: string; 
  price: string; 
  blurb: string;
  popular?: boolean;
};

export type Plan = {
  id: "BASIC" | "STARTER" | "GROWTH";
  title: string;
  priceMonthly: number;
  firstMonthPrice: number;
  minutesIncluded: number;
  concurrency: number;
  features: string[];
  popular?: boolean;
};

export const ADDONS: AddOn[] = [
  { 
    id: "EXTRA_MINUTES", 
    title: "Extra Minutes", 
    price: "$40 / 100 min", 
    blurb: "2× better than Tavus baseline. Scale on demand.",
    popular: true
  },
  { 
    id: "EXTRA_CONCURRENCY", 
    title: "Extra Concurrency", 
    price: "$49 / session", 
    blurb: "Handle more simultaneous video calls." 
  },
  { 
    id: "EXTRA_REPLICA", 
    title: "Additional Replica", 
    price: "$199 each", 
    blurb: "Add another avatar/persona to your team." 
  },
  { 
    id: "HIPAA_MODE", 
    title: "HIPAA Mode", 
    price: "$99 / mo", 
    blurb: "Enhanced privacy controls for healthcare." 
  }
];

export const PLANS: Plan[] = [
  { 
    id: "BASIC", 
    title: "Basic", 
    priceMonthly: 25, 
    firstMonthPrice: 12.50, 
    minutesIncluded: 25, 
    concurrency: 1, 
    features: [
      "25 conversation minutes/mo",
      "1 concurrent session",
      "Watermark on video",
      "Stock avatar only",
      "Email support"
    ]
  },
  { 
    id: "STARTER", 
    title: "Starter", 
    priceMonthly: 199, 
    firstMonthPrice: 174, 
    minutesIncluded: 150, 
    concurrency: 2,
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
    id: "GROWTH", 
    title: "Growth", 
    priceMonthly: 599, 
    firstMonthPrice: 549, 
    minutesIncluded: 1200, 
    concurrency: 5, 
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
  }
];

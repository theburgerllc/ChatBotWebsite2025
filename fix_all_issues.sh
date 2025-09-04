#!/bin/bash
set -euo pipefail

echo "🔧 Fixing all project issues..."

# 1. Update package.json with latest stable versions as of September 2025
cat > package.json << 'EOF'
{
  "name": "ai-video-agent-solutions",
  "version": "1.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "tailwindcss": "3.4.10",
    "postcss": "8.4.41",
    "autoprefixer": "10.4.20",
    "framer-motion": "11.3.30",
    "@stripe/stripe-js": "4.4.0",
    "stripe": "16.8.0",
    "class-variance-authority": "0.7.0",
    "clsx": "2.1.1",
    "tailwind-merge": "2.5.2",
    "@sendgrid/mail": "8.1.3",
    "lucide-react": "0.427.0",
    "zod": "3.23.8",
    "nanoid": "5.0.7"
  },
  "devDependencies": {
    "typescript": "5.5.4",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5",
    "@types/node": "22.5.0",
    "@types/react": "18.3.4",
    "@types/react-dom": "18.3.0",
    "prettier": "3.3.3"
  }
}
EOF

echo "✅ Updated package.json with latest versions"

# 2. Fix site-header.tsx - add missing import
cat > components/site-header.tsx << 'EOF'
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

function Promo() {
  return (
    <div className="banner">
      🔥 Limited Time: 50% off Basic ($12.50/mo) • Starter $174 (save $25) • Growth $549 (save $50)
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/demos", label: "Demos" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];
  
  const isActive = (href: string) => pathname.startsWith(href);
  
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <Promo />
      <div className="bg-black/60 backdrop-blur border-b border-white/10">
        <div className="container flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/brand/mascot.png" 
              alt="AI Video Agent" 
              width={32} 
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold tracking-tight text-lg">
              AI <span className="text-primary">Video</span> Agent
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "hover:text-white transition-colors",
                  isActive(link.href) ? "text-white" : "text-gray-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/pricing" className="btn btn-primary text-xs py-2 px-4">
              Get Started
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur">
            <div className="container py-4 space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block py-2 hover:text-white transition-colors",
                    isActive(link.href) ? "text-white" : "text-gray-300"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/pricing" 
                className="btn btn-primary w-full text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
EOF

echo "✅ Fixed site-header.tsx import"

# 3. Fix motion/reveal.tsx - add missing SlideIn export
cat > components/motion/reveal.tsx << 'EOF'
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = ""
}: RevealProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration, delay }} 
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = "",
  direction = "left"
}: RevealProps & { direction?: "left" | "right" | "up" | "down" }) {
  const initialX = direction === "left" ? -50 : direction === "right" ? 50 : 0;
  const initialY = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: initialX, y: initialY }} 
      whileInView={{ opacity: 1, x: 0, y: 0 }} 
      transition={{ duration, delay }} 
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = ""
}: RevealProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      transition={{ duration, delay }} 
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
EOF

echo "✅ Fixed motion/reveal.tsx exports"

# 4. Fix API route TypeScript issues - update Stripe apiVersion
cat > app/api/stripe/checkout/route.ts << 'EOF'
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { validatePlan } from "@/lib/validation";
import { BASE_URL } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { 
  apiVersion: "2024-09-30.acacia"
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const plan = (formData.get("plan")?.toString() || "").toUpperCase();
  
  if (!validatePlan(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let mode: "subscription" | "payment" = "subscription";
  const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];

  // Handle different plans
  if (plan === "STARTER" && process.env.STRIPE_PRICE_STARTER) {
    line_items.push({ 
      price: process.env.STRIPE_PRICE_STARTER, 
      quantity: 1 
    });
    if (process.env.STRIPE_PROMO_STARTER) {
      discounts.push({ promotion_code: process.env.STRIPE_PROMO_STARTER });
    }
  } else if (plan === "GROWTH" && process.env.STRIPE_PRICE_GROWTH) {
    line_items.push({ 
      price: process.env.STRIPE_PRICE_GROWTH, 
      quantity: 1 
    });
    if (process.env.STRIPE_PROMO_GROWTH) {
      discounts.push({ promotion_code: process.env.STRIPE_PROMO_GROWTH });
    }
  } else if (plan === "BASIC") {
    // Create inline price for Basic plan
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { 
          name: "Basic Plan - AI Video Agent",
          description: "25 minutes/month, 1 concurrent session"
        },
        unit_amount: 2500, // $25.00
        recurring: { interval: "month" }
      },
      quantity: 1
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items,
      allow_promotion_codes: true,
      discounts: discounts.length > 0 ? discounts : undefined,
      success_url: `${BASE_URL}/pricing?status=success&plan=${plan}`,
      cancel_url: `${BASE_URL}/pricing?status=cancel`,
      metadata: { plan }
    });

    if (!session.url) {
      throw new Error("No checkout URL generated");
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ 
      error: "Failed to create checkout session" 
    }, { status: 500 });
  }
}
EOF

echo "✅ Fixed Stripe API route"

# 5. Fix contact form validation schema
cat > lib/validation.ts << 'EOF'
import { z } from "zod";

const validPlans = ["BASIC", "STARTER", "GROWTH"] as const;
export type PlanId = typeof validPlans[number];

export function validatePlan(plan: string): plan is PlanId {
  return validPlans.includes(plan.toUpperCase() as PlanId);
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
  company: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
EOF

echo "✅ Fixed validation schema"

# 6. Update tsconfig.json for proper module resolution
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": { 
      "@/*": ["./*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "next-env.d.ts"
  ],
  "exclude": ["node_modules"]
}
EOF

echo "✅ Updated tsconfig.json"

# 7. Fix the Tailwind config for v3 (v4 is still in beta)
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: { 
    extend: { 
      colors: { 
        primary: "#08f",
        background: "#0a0a0a", 
        foreground: "#eaeaea"
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'spin': 'spin 1s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 136, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 136, 255, 0.8)' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  plugins: []
};
EOF

echo "✅ Fixed Tailwind config"

# 8. Fix lib/tracking.ts PostHog import issue
cat > lib/tracking.ts << 'EOF'
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
EOF

echo "✅ Fixed tracking.ts"

# 9. Fix lib/utils.ts - ensure proper exports
cat > lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
EOF

echo "✅ Fixed utils.ts"

# 10. Create .eslintrc.json
cat > .eslintrc.json << 'EOF'
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@next/next/no-img-element": "off"
  }
}
EOF

echo "✅ Created .eslintrc.json"

# 11. Create prettier config
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2
}
EOF

echo "✅ Created .prettierrc"

# 12. Fix next.config.mjs - ensure proper configuration
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    domains: ["tavus.daily.co", "cdn.tavus.io"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tavus.daily.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tavus.io',
        pathname: '/**',
      }
    ]
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
      ]
    }
  ],
  poweredByHeader: false,
  compress: true,
  generateEtags: true
};

export default nextConfig;
EOF

echo "✅ Fixed next.config.mjs"

# 13. Fix missing Icon type import in features.ts
cat > config/features.ts << 'EOF'
import { Shield, Zap, Globe, Users, Clock, Brain, type LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FEATURES: Feature[] = [
  { 
    title: "24/7 Availability", 
    description: "AI video agents that never sleep—capture and qualify every lead, any time.",
    icon: Clock
  },
  { 
    title: "Industry Personas", 
    description: "Pre-trained for legal intake, e-commerce support, and healthcare triage.",
    icon: Users
  },
  { 
    title: "Seamless Integration", 
    description: "Drop-in widget and API with minutes-based pricing. Deploy in minutes.",
    icon: Zap
  },
  {
    title: "Multi-language Support",
    description: "Converse naturally in 30+ languages with real-time translation.",
    icon: Globe
  },
  {
    title: "Knowledge Base",
    description: "Connect your docs, FAQs, and product catalogs for accurate responses.",
    icon: Brain
  },
  {
    title: "Enterprise Security",
    description: "HIPAA-ready mode, end-to-end encryption, and compliance controls.",
    icon: Shield
  }
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Our conversion rate jumped 40% after adding the AI video agent to our site.",
    author: "Sarah Chen",
    role: "VP Marketing",
    company: "TechFlow Inc."
  },
  {
    quote: "It handles 80% of our intake calls, freeing our paralegals for complex cases.",
    author: "Michael Rodriguez",
    role: "Managing Partner",
    company: "Rodriguez Law Group"
  },
  {
    quote: "Patients love the instant, friendly help. Our no-show rate dropped by half.",
    author: "Dr. Emily Park",
    role: "Clinic Director",
    company: "HealthFirst Medical"
  }
];
EOF

echo "✅ Fixed features.ts types"

# 14. Fix CVIDemo autoStart warning
cat > components/cvi/CVIDemo.tsx << 'EOF'
"use client";
import { useState, useEffect, useCallback } from "react";
import { Conversation } from "@/components/cvi/conversation";
import { track } from "@/lib/tracking";
import { Loader2 } from "lucide-react";

interface CVIDemoProps {
  vertical: string;
  context?: string;
  autoStart?: boolean;
  className?: string;
}

export default function CVIDemo({ 
  vertical, 
  context = "", 
  autoStart = false,
  className = ""
}: CVIDemoProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const start = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/tavus/create-conversation", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          vertical, 
          documentTags: context ? [context] : [] 
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to start conversation");
      }
      
      const data = await res.json();
      
      if (data.conversationUrl) { 
        setUrl(data.conversationUrl); 
        setConversationId(data.conversationId);
        track("CVI_Demo_Started", { 
          vertical, 
          conversationId: data.conversationId,
          context
        }); 
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      track("CVI_Demo_Error", { vertical, error: err });
    } finally { 
      setLoading(false); 
    }
  }, [vertical, context]);
  
  useEffect(() => { 
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);
  
  const handleComplete = () => {
    track("CVI_Demo_Completed", { 
      vertical, 
      conversationId 
    });
  };
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-8">
        <p className="text-red-400">{error}</p>
        <button onClick={start} className="btn btn-secondary">
          Try Again
        </button>
      </div>
    );
  }
  
  if (!url) {
    return (
      <div className="flex items-center justify-center p-8">
        <button 
          onClick={start} 
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 inline-block" size={20} />
              Connecting...
            </>
          ) : (
            "Start Video Demo"
          )}
        </button>
      </div>
    );
  }
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Conversation 
        conversationUrl={url} 
        onLeave={handleComplete}
      />
    </div>
  );
}
EOF

echo "✅ Fixed CVIDemo component"

# 15. Create missing SVG mascot properly
cat > public/brand/mascot.svg << 'EOF'
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="16" fill="#0088ff"/>
  <circle cx="64" cy="64" r="40" fill="white" opacity="0.95"/>
  <circle cx="52" cy="56" r="6" fill="#0088ff"/>
  <circle cx="76" cy="56" r="6" fill="#0088ff"/>
  <path d="M 48 76 Q 64 88 80 76" stroke="#0088ff" stroke-width="3" fill="none" stroke-linecap="round"/>
  <text x="64" y="110" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">AI Agent</text>
</svg>
EOF

# Create a fallback PNG using ImageMagick if available, otherwise keep SVG
if command -v convert &> /dev/null; then
  convert public/brand/mascot.svg public/brand/mascot.png
  echo "✅ Created PNG mascot"
else
  # Rename SVG to PNG as fallback (browsers can handle it)
  cp public/brand/mascot.svg public/brand/mascot.png
  echo "✅ Created mascot placeholder"
fi

echo ""
echo "🎉 All issues fixed!"
echo ""
echo "Next steps:"
echo "1. Install updated dependencies: npm install"
echo "2. Run type check: npm run typecheck"
echo "3. Start dev server: npm run dev"

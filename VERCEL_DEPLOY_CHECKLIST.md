# 🚀 Vercel Deployment Checklist - AI Chatbot Solutions

## Pre-Deployment Setup

### 1. Vercel Project Configuration
- ✅ **vercel.json** configured with API route timeouts and memory limits
- ✅ **next.config.mjs** optimized with security headers and CSP
- ✅ **package.json** upgraded to Next.js 15, React 19, Tailwind v4

### 2. Environment Variables Required

#### Essential Variables (Required for Basic Functionality)
```bash
# Core Application
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NODE_ENV=production

# Tavus AI Video (Keep Existing Values)
TAVUS_API_KEY=your_tavus_api_key_here
TAVUS_PERSONA_ID_HEALTHCARE=pe653bcff599
TAVUS_REPLICA_ID_HEALTHCARE=r6ca16dbe104
TAVUS_PERSONA_ID_LEGAL=p11133015d34
TAVUS_REPLICA_ID_LEGAL=r9fa0878977a
TAVUS_PERSONA_ID_ECOMMERCE=pbf94cc6d6f0
TAVUS_REPLICA_ID_ECOMMERCE=r880666f8c89
TAVUS_PERSONA_ID_GENERAL=pd8b36dccdc2
TAVUS_REPLICA_ID_GENERAL=r3a47ce45e68

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
```

#### Stripe Price IDs (Required for New Pricing System)
```bash
# Plan Price IDs
STRIPE_PRICE_PLAN_BASIC=price_your_basic_plan_price_id
STRIPE_PRICE_PLAN_STARTER=price_your_starter_plan_price_id
STRIPE_PRICE_PLAN_GROWTH=price_your_growth_plan_price_id
STRIPE_PRICE_PLAN_SCALE=price_your_scale_plan_price_id

# Add-on Price IDs
STRIPE_PRICE_ADDON_MINUTES_1K=price_your_minutes_addon_price_id
STRIPE_PRICE_ADDON_MULTILINGUAL=price_your_multilingual_addon_price_id
STRIPE_PRICE_ADDON_IVR=price_your_ivr_addon_price_id
STRIPE_PRICE_ADDON_SLA=price_your_sla_addon_price_id
STRIPE_PRICE_ADDON_CONCURRENCY=price_your_concurrency_addon_price_id
STRIPE_PRICE_ADDON_REPLICA=price_your_replica_addon_price_id
STRIPE_PRICE_ADDON_HIPAA=price_your_hipaa_addon_price_id
```

#### Optional Variables (Analytics & Features)
```bash
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Email Services
SENDGRID_API_KEY=SG.your_sendgrid_api_key

# Optional Features
NEXT_PUBLIC_SHOPIFY_STORE_URL=https://your-shop.myshopify.com
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=your_secure_admin_password
```

## Deployment Steps

### Step 1: Deploy to Vercel
```bash
# If using Vercel CLI
npx vercel --prod

# Or push to main branch if auto-deployment is configured
git push origin main
```

### Step 2: Configure Environment Variables in Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Settings → Environment Variables**
4. Add all required variables listed above
5. Set environment to **Production**

### Step 3: Set Up Stripe Webhook
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Set endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook secret and add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

## Post-Deployment Testing

### ✅ Core Functionality Checks
- [ ] **Homepage loads** with animated stats and hero CTAs
- [ ] **Vertical pages work**: `/law`, `/health`, `/retail`
- [ ] **Pricing calculator** functions with real-time totals
- [ ] **Legal pages accessible**: `/accessibility`, `/legal/privacy`, `/legal/terms`, `/legal/baa`

### ✅ Tavus Integration (Unchanged)
- [ ] **Existing demos work**: `/demos/legal`, `/demos/healthcare`, `/demos/ecommerce`
- [ ] **CVI Demo component** loads and functions normally
- [ ] **Tavus API calls** succeed (check network tab)
- [ ] **Video conversations** connect properly

### ✅ New Features
- [ ] **Usage estimator** updates totals dynamically
- [ ] **Hero CTAs** track analytics events
- [ ] **Checkout flow** redirects to Stripe properly
- [ ] **Thank you page** displays after successful payment
- [ ] **Analytics tracking** fires (check browser dev tools)

### ✅ Security & Performance
- [ ] **Lighthouse score** shows good performance/accessibility
- [ ] **CSP headers** don't block Tavus/Daily video
- [ ] **WCAG compliance** - keyboard navigation works
- [ ] **Mobile responsive** on all new pages

## Monitoring & Maintenance

### Analytics Setup
1. **Google Analytics 4**: Verify ecommerce events are firing
2. **PostHog**: Check custom event tracking for demo interactions
3. **Stripe Dashboard**: Monitor successful subscriptions

### Performance Monitoring
- Monitor Vercel function execution times
- Check Core Web Vitals in Google Search Console
- Monitor conversion rates from new vertical pages

## Troubleshooting

### Common Issues
1. **Build fails**: Check package.json dependencies for Next 15/React 19 compatibility
2. **Tavus videos don't load**: Verify CSP frame-src includes Daily domains
3. **Stripe checkout fails**: Check environment variables and webhook configuration
4. **Analytics not tracking**: Verify GA4/PostHog keys are set correctly

### Stack Verification
After deployment, check footer shows: **Next 15 / React 19 / Tailwind v4**

## Success Criteria
- ✅ All existing Tavus functionality preserved
- ✅ New vertical landing pages drive conversions
- ✅ Enhanced pricing system with usage calculator
- ✅ WCAG 2.2 AA compliance features working
- ✅ Analytics tracking complete funnel
- ✅ Legal compliance pages accessible
- ✅ Security headers protect against common vulnerabilities

---

**🎉 Deployment Complete!** Your AI Chatbot Solutions platform is now optimized for revenue generation while maintaining all existing functionality.
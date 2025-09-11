# Vercel Deployment Guide for Tavus CVI Integration

## Pre-Deployment Checklist

### ✅ Code Status
- [x] All changes committed to GitHub
- [x] Node.js 20 runtime configured in vercel.json
- [x] Package.json engines field set to Node.js >=20.0.0
- [x] All TypeScript errors resolved
- [x] E2E tests configured (run locally with `npm run test:e2e`)

## Required Environment Variables in Vercel

### Step 1: Navigate to Vercel Dashboard
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `ChatBotWebsite2025` project
3. Go to "Settings" → "Environment Variables"

### Step 2: Add Tavus Core Variables

```bash
# REQUIRED - Without these, the integration won't work
TAVUS_API_KEY="your_actual_tavus_api_key"
TAVUS_WEBHOOK_SECRET="generate_a_secure_random_string_here"

# At minimum, you need the GENERAL vertical configured
TAVUS_PERSONA_ID_GENERAL="your_general_persona_id"
TAVUS_REPLICA_ID_GENERAL="your_general_replica_id"
```

### Step 3: Add Vertical-Specific Personas (Optional but Recommended)

```bash
# Healthcare Vertical
TAVUS_PERSONA_ID_HEALTHCARE="your_healthcare_persona_id"
TAVUS_REPLICA_ID_HEALTHCARE="your_healthcare_replica_id"

# Legal Vertical
TAVUS_PERSONA_ID_LEGAL="your_legal_persona_id"
TAVUS_REPLICA_ID_LEGAL="your_legal_replica_id"

# E-commerce Vertical
TAVUS_PERSONA_ID_ECOMMERCE="your_ecommerce_persona_id"
TAVUS_REPLICA_ID_ECOMMERCE="your_ecommerce_replica_id"
```

### Step 4: Add Analytics Variables (Optional but Recommended)

```bash
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_your_posthog_project_key"
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
POSTHOG_KEY="phc_your_posthog_server_key"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### Step 5: Add Security Variables

```bash
# Admin Panel Authentication
BASIC_AUTH_USER="admin"
BASIC_AUTH_PASS="choose_a_strong_password"
```

### Step 6: Keep Existing Variables
Make sure these existing variables remain configured:
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `SENDGRID_TO_EMAIL`

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)
1. The push to GitHub should trigger automatic deployment
2. Check deployment status at: https://vercel.com/theburgerllc/chatbotwebsite2025

### Option 2: Manual Deployment via CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to production
vercel --prod
```

### Option 3: Manual Deployment via Dashboard
1. Go to your project in Vercel Dashboard
2. Click "Deployments" tab
3. Click "Redeploy" on the latest deployment
4. Select "Use existing Build Cache" → "Redeploy"

## Post-Deployment Configuration

### 1. Configure Tavus Webhook
1. Log into your Tavus Dashboard: https://platform.tavus.io
2. Navigate to Webhooks settings
3. Add webhook URL: `https://chat-bot-website2025.vercel.app/api/tavus/webhook`
4. Select events to receive:
   - conversation.started
   - conversation.ended
   - utterance
   - perception_tool_call
   - recording.ready

### 2. Upload Knowledge Base Documents (Optional)
1. In Tavus Dashboard, go to Knowledge Base
2. Upload documents for each vertical
3. Tag them appropriately:
   - Legal documents: `kb-legal`
   - Healthcare documents: `kb-healthcare`
   - E-commerce documents: `kb-ecommerce`
   - General documents: `kb-global`

### 3. Configure PostHog (Optional)
1. Create account at https://posthog.com
2. Create new project
3. Copy API keys to Vercel environment variables
4. Configure data retention and privacy settings

## Verification Steps

### 1. Test Basic Functionality
```bash
# Test the API endpoint
curl -X POST https://chat-bot-website2025.vercel.app/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{"vertical": "general"}'
```

### 2. Test Widget
1. Visit https://chat-bot-website2025.vercel.app
2. Look for floating chat widget in bottom-right
3. Click to open conversation
4. If it fails, check browser console for errors

### 3. Test Demo Pages
- Legal: https://chat-bot-website2025.vercel.app/demos/legal
- Healthcare: https://chat-bot-website2025.vercel.app/demos/healthcare
- E-commerce: https://chat-bot-website2025.vercel.app/demos/ecommerce

### 4. Test Admin Panel
1. Visit https://chat-bot-website2025.vercel.app/admin/events
2. Login with BASIC_AUTH_USER and BASIC_AUTH_PASS
3. Verify you can see events (will be empty initially)

## Troubleshooting

### Common Issues and Solutions

#### 1. "Service not configured" Error
- **Cause**: Missing TAVUS_API_KEY
- **Solution**: Add TAVUS_API_KEY to Vercel environment variables

#### 2. "Invalid vertical configuration" Error
- **Cause**: Missing persona/replica IDs for requested vertical
- **Solution**: Add TAVUS_PERSONA_ID_[VERTICAL] and TAVUS_REPLICA_ID_[VERTICAL]

#### 3. Widget doesn't appear
- **Cause**: Build failed or JavaScript error
- **Solution**: Check Vercel build logs and browser console

#### 4. Webhook signature verification fails
- **Cause**: Missing or incorrect TAVUS_WEBHOOK_SECRET
- **Solution**: Ensure secret matches between Tavus dashboard and Vercel

#### 5. Rate limiting triggered too quickly
- **Cause**: Default limit is 5 requests/minute per IP
- **Solution**: Adjust limit in `/lib/ratelimit.ts` if needed

### Viewing Logs
1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Functions" tab
4. Click on any function to see logs
5. Or use Vercel CLI: `vercel logs`

## Production Readiness Checklist

- [ ] All required environment variables set in Vercel
- [ ] Webhook URL registered in Tavus dashboard
- [ ] At least GENERAL vertical configured
- [ ] Admin panel credentials set and secured
- [ ] Test conversation creation works
- [ ] Webhook events being received
- [ ] Analytics tracking verified (if configured)
- [ ] Email notifications working (if configured)
- [ ] Rate limiting tested
- [ ] Error handling verified

## Support Resources

### Documentation
- Tavus CVI Docs: https://docs.tavus.io/sections/conversational-video-interface
- Vercel Docs: https://vercel.com/docs
- PostHog Docs: https://posthog.com/docs

### Project Files
- Integration Summary: `/TAVUS_INTEGRATION_SUMMARY.md`
- Architecture: `/plan/architecture.md`
- Specifications: `/specs/tavus-cvi-integration.md`
- Environment Example: `/.env.example`

### Getting Help
- Tavus Support: support@tavus.io
- Vercel Support: https://vercel.com/support
- GitHub Issues: https://github.com/theburgerllc/ChatBotWebsite2025/issues

---

**Last Updated**: September 11, 2025
**Integration Version**: 1.0.0
**Required Node.js**: >=20.0.0

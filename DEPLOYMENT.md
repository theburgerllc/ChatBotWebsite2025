# Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the AI Video Agent Solutions platform to Vercel.

## Prerequisites

### Required Tools
- Node.js 18.x or 20.x LTS
- npm or pnpm package manager
- Vercel CLI (`npm install -g vercel`)
- Git for version control
- SSD CLI for workflow management

### Required Accounts
1. **Vercel Account**: For hosting and deployment
2. **Tavus Account**: For AI video conversations
3. **Stripe Account**: For payment processing
4. **SendGrid Account**: For email delivery

## Environment Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd ChatBotWebsite2025
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Create `.env.local` file with the following variables:

```env
# Application URLs
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# Tavus API Configuration
TAVUS_API_KEY=your_tavus_api_key
TAVUS_PERSONA_ID_HEALTHCARE=your_healthcare_persona_id
TAVUS_REPLICA_ID_HEALTHCARE=your_healthcare_replica_id
TAVUS_PERSONA_ID_LEGAL=your_legal_persona_id
TAVUS_REPLICA_ID_LEGAL=your_legal_replica_id
TAVUS_PERSONA_ID_ECOMMERCE=your_ecommerce_persona_id
TAVUS_REPLICA_ID_ECOMMERCE=your_ecommerce_replica_id
TAVUS_PERSONA_ID_GENERAL=your_general_persona_id
TAVUS_REPLICA_ID_GENERAL=your_general_replica_id

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PRICE_STARTER=price_xxx
STRIPE_PRICE_GROWTH=price_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PROMO_STARTER=promo_xxx
STRIPE_PROMO_GROWTH=promo_xxx

# SendGrid Configuration
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=your-email@domain.com
SENDGRID_TO_EMAIL=notifications@domain.com

# Admin Panel (Basic Auth)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password_here
```

## SSD Workflow Deployment

### 1. Initialize SDD Structure
```bash
ssd init
```

### 2. Build and Test
```bash
ssd implement "1-3"
```

### 3. Verify Build
```bash
npm run build
npm run typecheck
```

## Vercel Deployment

### 1. Login to Vercel
```bash
vercel login
```

### 2. Link Project
```bash
vercel link
```

### 3. Deploy to Staging
```bash
vercel --prod=false
```

### 4. Deploy to Production
```bash
vercel --prod
```

## Post-Deployment Configuration

### 1. Configure Environment Variables in Vercel Dashboard

1. Navigate to your project in Vercel Dashboard
2. Go to Settings → Environment Variables
3. Add all variables from `.env.local`
4. Set appropriate scopes (Production, Preview, Development)

### 2. Configure Webhook Endpoints

#### Stripe Webhooks
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

#### Tavus Webhooks
1. Configure in Tavus Dashboard
2. Add endpoint: `https://your-domain.vercel.app/api/tavus/webhook`
3. Enable conversation events

### 3. Configure Domain (Optional)

1. In Vercel Dashboard → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

## Verification Testing

### 1. Test Core Features
```bash
# Check homepage
curl https://your-domain.vercel.app

# Test API health
curl https://your-domain.vercel.app/api/health
```

### 2. Test Integrations
- Navigate to `/demos/healthcare` and start a video conversation
- Test Stripe checkout at `/pricing`
- Submit contact form at `/contact`
- Access admin panel at `/admin/events`

## Monitoring and Maintenance

### 1. Enable Vercel Analytics
```bash
vercel analytics enable
```

### 2. Monitor Logs
```bash
vercel logs --follow
```

### 3. Check Deployment Status
```bash
vercel list
```

## Rollback Procedure

If issues occur after deployment:

### 1. List Recent Deployments
```bash
vercel list
```

### 2. Rollback to Previous Version
```bash
vercel rollback [deployment-url]
```

### 3. Investigate Issues
```bash
vercel logs [deployment-id]
```

## Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review TypeScript errors: `npm run typecheck`

#### API Integration Issues
- Verify API keys are correctly set
- Check webhook endpoint URLs
- Review API rate limits

#### Performance Issues
- Enable caching in `vercel.json`
- Optimize images and assets
- Review function timeout settings

### Debug Commands
```bash
# Check build output
npm run build

# Test locally
npm run dev

# View Vercel logs
vercel logs --follow

# Check environment variables
vercel env ls
```

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use Vercel's encrypted environment variables
3. **CORS**: Configure appropriate CORS headers in `vercel.json`
4. **Rate Limiting**: Implement rate limiting on API routes
5. **Authentication**: Use strong passwords for admin panel

## CI/CD Pipeline

### GitHub Actions Workflow (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Tavus API Docs**: https://docs.tavus.io
- **Stripe API Docs**: https://stripe.com/docs/api
- **SendGrid API Docs**: https://docs.sendgrid.com

## Contact
For deployment support, contact: tim602575@gmail.com

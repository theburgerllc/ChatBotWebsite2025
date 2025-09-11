# AI Video Agent Solutions

Production-ready Next.js 14.2.5 application for AI video agent services using Tavus CVI, Stripe payments, and SendGrid notifications.

## Features

- 🎥 **Tavus CVI Integration** - Real-time video conversations with AI agents
- 💳 **Stripe Payments** - Subscription management with promotional discounts
- 📧 **SendGrid Notifications** - Automated email alerts for leads
- 🎨 **Modern UI** - Tailwind CSS with animations and responsive design
- 🔒 **Admin Panel** - Protected event viewer with basic auth
- 📊 **Analytics Ready** - GA4 and PostHog integration support

## Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **UI**: React 18.3, Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Payments**: Stripe
- **Video AI**: Tavus CVI
- **Email**: SendGrid
- **TypeScript**: Full type safety

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Add your API keys and configuration

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Environment Variables

Required environment variables (see `.env.example` for full list):

- `TAVUS_API_KEY` - Tavus API key
- `TAVUS_PERSONA_ID_*` - Persona IDs for each vertical
- `TAVUS_REPLICA_ID_*` - Replica IDs for each vertical
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PRICE_*` - Stripe price IDs
- `SENDGRID_API_KEY` - SendGrid API key
- `BASIC_AUTH_USER/PASS` - Admin panel credentials

## Project Structure

```
ai-video-agent-solutions/
├── app/                  # Next.js app router pages
│   ├── api/             # API routes
│   ├── admin/           # Admin panel
│   ├── demos/           # Demo pages
│   └── ...              # Other pages
├── components/          # React components
│   ├── cvi/            # Tavus CVI components
│   ├── ui/             # UI components
│   └── motion/         # Animation components
├── lib/                # Utilities and helpers
├── config/             # Configuration files
└── public/             # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Set environment variables
3. Start the server:
```bash
npm start
```

## API Endpoints

- `POST /api/tavus/create-conversation` - Create new CVI session
- `POST /api/tavus/webhook` - Handle Tavus webhooks (legacy)
- `POST /api/tavus/webhook/conversation` - Handle conversation callbacks
- `POST /api/tavus/webhook/video` - Handle video generation callbacks
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/contact` - Handle contact form submissions
- `GET /api/admin/webhook-events` - Fetch webhook events (protected)

## Tavus Webhooks

### Overview

The application implements two webhook endpoints to receive Tavus callbacks:

1. **Conversation Webhook** (`/api/tavus/webhook/conversation`)
   - Receives updates when conversations join/leave, transcript ready, recording ready
   - Automatically configured when creating conversations

2. **Video Webhook** (`/api/tavus/webhook/video`)
   - Receives notifications when video generation completes or errors
   - Used when creating videos with the Tavus API

### Setup

1. Set environment variables:
```bash
TAVUS_WEBHOOK_BASIC_USER=admin
TAVUS_WEBHOOK_BASIC_PASS=secure_password_here
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

2. Webhooks are automatically registered when creating conversations/videos

### Testing Webhooks

1. **Local Testing with ngrok**:
```bash
# Install ngrok
npm install -g ngrok

# Run local dev server
npm run dev

# In another terminal, expose localhost
ngrok http 3000

# Use the ngrok URL as NEXT_PUBLIC_BASE_URL
```

2. **Verify webhook delivery**:
   - Create a conversation via the API
   - Check `/admin/webhook-events` for received callbacks
   - Events are also logged to `diagnostics/events/*.jsonl`

3. **Test with curl**:
```bash
# Test conversation webhook
curl -X POST http://localhost:3000/api/tavus/webhook/conversation \
  -H "Content-Type: application/json" \
  -d '{"event_type":"conversation.started","conversation_id":"test-123"}'

# Test video webhook  
curl -X POST http://localhost:3000/api/tavus/webhook/video \
  -H "Content-Type: application/json" \
  -d '{"status":"completed","video_id":"test-456"}'
```

### Webhook Event Viewer

Access the webhook event viewer at `/admin/webhook-events`:
- Protected with basic auth (uses `TAVUS_WEBHOOK_BASIC_USER/PASS`)
- Shows all received webhook events
- Filter by topic (conversation/video)
- Auto-refreshes every 10 seconds
- Expandable payload view for debugging

### Event Storage

Webhook events are stored as JSONL files:
- Location: `./diagnostics/events/YYYY-MM-DD.jsonl`
- Format: `{"ts":timestamp,"topic":"conversation|video","payload":{}}`
- Files are created daily, one line per event

## Admin Panel

Access the admin panels with basic auth credentials:
- `/admin/webhook-events` - View Tavus webhook events
- `/admin/events` - View system events (if implemented)

## Support

For issues or questions:
- Email: hello@aichatbotsolutions.io
- Documentation: /docs

## License

MIT License - see LICENSE file for details

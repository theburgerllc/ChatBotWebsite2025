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
- `POST /api/tavus/webhook` - Handle Tavus webhooks
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/contact` - Handle contact form submissions
- `GET /api/admin/events` - Fetch system events (protected)

## Admin Panel

Access the admin panel at `/admin/events` with basic auth credentials set in environment variables.

## Support

For issues or questions:
- Email: hello@aichatbotsolutions.io
- Documentation: /docs

## License

MIT License - see LICENSE file for details

# Tavus CVI Integration Architecture

## Stack & Runtimes

### Core Framework (Target Versions)
- **Next.js**: 15.5.x (App Router, Server Components) - UPGRADE REQUIRED
- **React**: 19.1.x (with Suspense boundaries) - UPGRADE REQUIRED
- **TypeScript**: 5.3.x (strict mode)
- **Node.js**: 20.x LTS (Vercel runtime)

### UI & Styling
- **Tailwind CSS**: 4.1.x (with JIT compilation) - UPGRADE REQUIRED
- **Framer Motion**: 7.x (animations)
- **shadcn/ui**: Component library
- **Lucide Icons**: Icon system

### Tavus Integration
- **@tavus/cvi-ui**: Official CVI component library - NEW PACKAGE
- **Tavus API**: v2 REST endpoints
- **Webhook Processing**: Event-driven architecture
- **Memory Stores**: Persistent conversation context
- **Knowledge Base**: Document tagging system

### Analytics & Monitoring
- **PostHog**: Product analytics (client & server) - NEW
- **Google Analytics 4**: Additional tracking
- **Custom Events**: Unified tracking layer

### Infrastructure
- **Vercel**: Hosting platform
- **Edge Functions**: API routes
- **Stripe**: Payment processing
- **SendGrid**: Email notifications

## Module Boundaries

### Client Components (`/components`)
```
components/
├── cvi/
│   ├── CVIProvider.tsx       # Global CVI context
│   ├── CVIDemo.tsx           # Demo component wrapper
│   ├── Conversation.tsx      # Core conversation UI
│   └── VideoChatWidget.tsx   # Floating widget
├── motion/
│   └── reveal.tsx            # Animation wrappers
└── ui/
    └── [shadcn components]
```

### Server Components (`/app`)
```
app/
├── providers/
│   ├── cvi-provider.tsx      # CVI Provider wrapper
│   └── analytics-provider.tsx # PostHog/GA wrapper
├── api/
│   ├── tavus/
│   │   ├── create-conversation/
│   │   └── webhook/
│   └── admin/
│       └── events/
└── (marketing)/
    └── demos/
```

### Utilities (`/lib`)
```
lib/
├── tavus.ts          # Tavus API client
├── tracking.ts       # Analytics abstraction
├── posthog.ts        # PostHog configuration
├── ratelimit.ts      # Rate limiting logic
├── auth.ts           # Authentication helpers
├── events.ts         # Event logging
└── webhook.ts        # Webhook verification
```

## APIs & Contracts

### Tavus Conversation API
```typescript
interface CreateConversationRequest {
  persona_id: string;
  replica_id: string;
  callback_url?: string;
  document_tags?: string[];
  memory_stores?: string[];
  properties?: {
    language?: string;
    enable_transcription?: boolean;
  };
}

interface CreateConversationResponse {
  conversation_id: string;
  conversation_url: string;
  status: 'pending' | 'active';
}
```

### Webhook Events
```typescript
interface WebhookEvent {
  event_type: 'conversation.started' | 'utterance' | 'perception_tool_call' | 'conversation.ended';
  conversation_id: string;
  timestamp: string;
  payload: {
    // Event-specific data
  };
  signature?: string; // HMAC-SHA256
}
```

### PostHog Events
```typescript
interface TrackingEvent {
  name: string;
  properties: {
    conversation_id?: string;
    vertical?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    user_id?: string;
    session_id: string;
  };
}
```

## Data Model

### Conversation Entity
```typescript
interface Conversation {
  id: string;
  url: string;
  personaId: string;
  replicaId: string;
  vertical: 'healthcare' | 'legal' | 'ecommerce' | 'general';
  memoryStores: string[];
  documentTags: string[];
  createdAt: Date;
  endedAt?: Date;
  events: ConversationEvent[];
}
```

### Event Storage (File-based for MVP)
```typescript
interface SystemEvent {
  id: string;
  timestamp: string;
  type: 'webhook' | 'error' | 'info' | 'conversion';
  source: string;
  conversationId?: string;
  data: any;
}
```

## Security/Performance Considerations

### Security
- **API Keys**: Server-only environment variables
- **Webhook Verification**: HMAC-SHA256 signature validation
- **Admin Auth**: Basic authentication for /admin routes
- **Rate Limiting**: Token bucket (5 req/min per IP)
- **CORS**: Strict origin validation

### Performance
- **Code Splitting**: Lazy load CVI components
- **Bundle Optimization**: Separate chunks for Tavus SDK
- **Caching**: ISR for static pages, Cache-Control headers
- **Edge Functions**: Optimal latency for API routes
- **Image Optimization**: Next.js Image component

## Rollout Plan

### Phase 1: Foundation (Day 1-2)
1. Upgrade Next.js 14 → 15.5.x with codemods
2. Upgrade React 18 → 19.1.x
3. Upgrade Tailwind CSS 3 → 4.1.x
4. Update environment configuration

### Phase 2: Core Integration (Day 3-4)
1. Install @tavus/cvi-ui package
2. Implement CVI Provider wrapper
3. Refactor existing components to use official library
4. Enhance API routes with memory stores and document tags

### Phase 3: Advanced Features (Day 5-6)
1. Implement webhook signature verification
2. Add PostHog analytics integration
3. Create comprehensive event tracking
4. Build enhanced admin panel

### Phase 4: Testing & Documentation (Day 7-8)
1. Add Playwright E2E tests
2. Update all documentation
3. Performance testing
4. Security audit

### Phase 5: Deployment (Day 9)
1. Vercel configuration update
2. Production deployment
3. Monitoring setup
4. Launch verification

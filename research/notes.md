# Research Notes: Tavus CVI Integration

## Next.js 15 Migration Guide

### Breaking Changes from 14.x to 15.x
1. **Async Request APIs**: `cookies()`, `headers()`, and `params` are now async
2. **React 19 Required**: Minimum React version is 19.0.0
3. **Node.js 18.18+**: Minimum Node.js version increased
4. **Fetch Caching**: Default caching behavior changed (no-cache by default)
5. **Route Handlers**: `export const runtime` replaces `export const config`

### Migration Steps
```bash
# Use official codemod
npx @next/codemod@latest upgrade latest

# Manual updates needed:
# - Update async request APIs
# - Review fetch() calls for caching
# - Update runtime exports in route handlers
```

## React 19 Upgrade Considerations

### Breaking Changes
1. **Removed APIs**: 
   - `defaultProps` for function components (use default parameters)
   - `propTypes` (use TypeScript)
   - Legacy context API
2. **Suspense Changes**: More strict Suspense boundaries
3. **useEffect Timing**: Stricter timing in development mode

## Tailwind CSS 4.1 Migration

### Major Changes
1. **New Engine**: Oxide engine with faster compilation
2. **Configuration**: New configuration format
3. **JIT by Default**: Just-In-Time compilation is the only mode

### Migration Tool
```bash
npx @tailwindcss/upgrade@next --force
```

## Tavus CVI Documentation Review

### Package: @tavus/cvi-ui

#### Key Components
1. **CVIProvider**: Global provider for CVI context
2. **Conversation**: Main conversation component
3. **ConversationWidget**: Floating widget variant
4. **useConversation**: Hook for conversation state

### API Endpoints

#### Create Conversation
```http
POST https://tavusapi.com/v2/conversations
Authorization: x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "persona_id": "persona_123",
  "replica_id": "replica_456",
  "callback_url": "https://your-app.com/webhook",
  "document_tags": ["kb-legal"],
  "memory_stores": ["user_123"],
  "properties": {
    "language": "en",
    "enable_transcription": true
  }
}
```

## PostHog Integration Patterns

### Event Naming Convention
```typescript
const EVENTS = {
  'IVD_Start': 'Video conversation started',
  'Widget_Opened': 'Chat widget opened',
  'Demo_Completed': 'Full demo conversation finished',
  'Lead_Captured': 'Contact information collected',
};
```

## Technology Choices
- Choice: [Technology]
  - Pros: [List]
  - Cons: [List]
  - Alternative: [What was considered]

## Design Decisions
- Decision: [Description]
  - Rationale: [Why this approach]
  - Trade-offs: [What we're giving up]

## References
- [Resource 1]: [URL/Description]
- [Resource 2]: [URL/Description]

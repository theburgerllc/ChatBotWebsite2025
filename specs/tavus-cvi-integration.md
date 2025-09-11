# Tavus CVI Integration Specification

## Problem Statement

The current implementation uses a basic iframe approach for Tavus conversations, missing critical features:
- No official Tavus CVI UI library integration
- Limited webhook event handling
- No memory stores or knowledge base integration
- Minimal analytics tracking
- Outdated framework versions (Next.js 14, React 18)
- No comprehensive E2E testing

## Goals

1. **Production-Ready CVI Integration**: Implement Tavus CVI using the official `@tavus/cvi-ui` library
2. **Advanced Features**: Enable Memories, Knowledge Base, and comprehensive webhook handling
3. **Modern Stack**: Upgrade to Next.js 15.5.x, React 19.1.x, Tailwind 4.1.x
4. **Analytics**: Integrate PostHog for detailed conversation tracking
5. **Security**: Implement webhook signature verification and proper auth
6. **Testing**: Add Playwright E2E tests for all critical paths
7. **Documentation**: Comprehensive guides for developers and operations

## Primary User Stories

### End User Stories
- As a website visitor, I want to start a video conversation with an AI agent to get immediate assistance
- As a customer, I want the AI to remember my preferences across sessions
- As a user, I want to access vertical-specific AI agents (legal, healthcare, e-commerce)

### Admin Stories
- As an admin, I want to view all conversation events and transcripts
- As an operator, I want to receive notifications when conversations complete
- As a developer, I want comprehensive documentation and testing

## Acceptance Scenarios

### Happy Path Scenarios

1. **Widget Interaction**
   - User clicks floating video chat widget
   - Conversation loads within 3 seconds
   - User can interact with AI agent
   - Session persists memories for future interactions

2. **Demo Page Experience**
   - User navigates to /demos/legal
   - Clicks "Start Video Demo"
   - Legal-specific AI agent loads with appropriate knowledge base
   - Conversation completes successfully

3. **Admin Monitoring**
   - Admin accesses /admin/events with basic auth
   - Views real-time conversation events
   - Can filter by event type and conversation ID
   - Receives email notifications for completed conversations

### Error Scenarios

1. **Rate Limiting**
   - User exceeds 5 conversation attempts per minute
   - Receives clear error message
   - Can retry after cooldown period

2. **API Failures**
   - Tavus API is unavailable
   - User sees graceful error state
   - Error logged to admin panel
   - Retry mechanism available

3. **Missing Configuration**
   - Environment variables not set
   - Clear error messages in logs
   - Admin notification sent
   - Fallback behavior activated

### Edge Cases

1. **Multiple Concurrent Sessions**
   - User opens multiple tabs
   - Each session maintains separate state
   - Memory stores remain consistent

2. **Browser Compatibility**
   - Older browsers show compatibility warning
   - Core functionality degrades gracefully
   - Analytics still capture basic events

## Key Entities

### Conversations
- `conversation_id`: Unique identifier
- `conversation_url`: Embeddable URL from Tavus
- `persona_id`: Selected AI persona
- `replica_id`: Voice/video replica
- `memory_stores`: Array of memory keys
- `document_tags`: Knowledge base tags
- `callback_url`: Webhook endpoint

### Events
- `event_type`: conversation.started, utterance, perception_tool_call, conversation.ended
- `conversation_id`: Associated conversation
- `payload`: Event-specific data
- `timestamp`: ISO 8601 timestamp
- `signature`: HMAC verification

### Memory Stores
- User preferences
- Conversation history
- Context carryover
- Custom attributes

### Document Tags
- `kb-legal`: Legal knowledge base
- `kb-healthcare`: Healthcare protocols
- `kb-ecommerce`: Product catalogs
- `kb-global`: General knowledge

## Non-Goals

- Custom video rendering or processing
- Direct Daily.co integration
- Non-Tavus video providers
- Real-time video manipulation
- Custom AI model training
- Database persistence (using file-based for MVP)

## Domain Glossary

- **CVI**: Conversational Video Interface - Tavus's video chat solution
- **Persona**: Pre-configured AI agent personality and capabilities
- **Replica**: Voice and visual representation of the AI agent
- **Memory Store**: Persistent storage for conversation context
- **Document Tag**: Knowledge base category identifier
- **Perception Tool**: AI's ability to understand visual/contextual cues
- **Utterance**: Single speech segment in a conversation
- **Webhook**: HTTP callback for real-time event notifications

## Needs Clarification

None - all requirements are clear and ready for implementation.

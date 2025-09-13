# Tavus CVI Integration Testing Guide

This guide provides comprehensive testing procedures for the enhanced Tavus CVI integration.

## Pre-Testing Setup

### 1. Environment Variables Configuration
Ensure all required environment variables are configured in your `.env.local`:

```bash
# Required Tavus API Configuration
TAVUS_API_KEY=your_actual_tavus_api_key
TAVUS_WEBHOOK_SECRET=your_webhook_secret

# Required Persona/Replica IDs (at least one vertical)
TAVUS_PERSONA_ID_GENERAL=your_general_persona_id
TAVUS_REPLICA_ID_GENERAL=your_general_replica_id

# Optional: Additional verticals
TAVUS_PERSONA_ID_HEALTHCARE=your_healthcare_persona_id
TAVUS_REPLICA_ID_HEALTHCARE=your_healthcare_replica_id
# ... add others as needed

# Application URLs
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### 2. Build Verification
```bash
# Type checking
npm run typecheck

# Build validation
npm run build

# Development server (for local testing)
npm run dev
```

## API Testing Commands

### 1. Test Conversation Creation

#### Basic Conversation Creation
```bash
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{
    "vertical": "general"
  }'
```

#### Advanced Conversation with Memory Stores and Document Tags
```bash
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{
    "vertical": "healthcare",
    "userId": "user_123",
    "sessionId": "session_abc",
    "memoryKey": "patient_context_456",
    "documentTags": ["medical-history", "patient-notes"],
    "customTags": ["priority-patient"],
    "metadata": {
      "language": "en",
      "enableRecordings": true,
      "patientId": "P123456"
    }
  }'
```

#### Test All Verticals
```bash
# Healthcare
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{"vertical": "healthcare"}'

# Legal
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{"vertical": "legal"}'

# E-commerce
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{"vertical": "ecommerce"}'

# General (fallback)
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{"vertical": "general"}'
```

### 2. Test Rate Limiting
```bash
# Rapid fire requests to test rate limiting (should trigger 429 after 5 requests)
for i in {1..7}; do
  echo "Request $i:"
  curl -X POST http://localhost:3000/api/tavus/create-conversation \
    -H "Content-Type: application/json" \
    -d '{"vertical": "general"}' \
    -w "Status: %{http_code}\n"
  echo "---"
done
```

### 3. Test Webhook Signature Verification

#### Generate Test Webhook Signature
```bash
# You can use this Node.js script to generate test signatures
node -e "
const crypto = require('crypto');
const payload = JSON.stringify({
  event_type: 'conversation.started',
  conversation_id: 'test_123',
  timestamp: new Date().toISOString()
});
const secret = 'your_webhook_secret_here';
const signature = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
console.log('Payload:', payload);
console.log('Signature:', signature);
"
```

#### Test Valid Webhook
```bash
curl -X POST http://localhost:3000/api/tavus/webhook/conversation \
  -H "Content-Type: application/json" \
  -H "x-tavus-signature: GENERATED_SIGNATURE_HERE" \
  -H "x-timestamp: $(date +%s)" \
  -d '{
    "event_type": "conversation.started",
    "conversation_id": "test_123",
    "timestamp": "'$(date -Iseconds)'"
  }'
```

#### Test Invalid Webhook (should return 401)
```bash
curl -X POST http://localhost:3000/api/tavus/webhook/conversation \
  -H "Content-Type: application/json" \
  -H "x-tavus-signature: invalid_signature" \
  -d '{
    "event_type": "conversation.started",
    "conversation_id": "test_123"
  }'
```

## Frontend Testing Checklist

### 1. Widget Functionality
- [ ] Video chat widget appears in bottom-right corner
- [ ] Click opens conversation creation API call
- [ ] Loading state displays during conversation creation
- [ ] Error states display appropriately for:
  - [ ] Rate limiting (429)
  - [ ] Configuration errors (400)
  - [ ] Network errors
  - [ ] Server errors (500+)

### 2. CVI Component Integration
- [ ] Conversation component loads with official @tavus/cvi-ui library
- [ ] Daily.co provider initializes correctly
- [ ] Video and audio controls work (mic, camera, screen share)
- [ ] Fullscreen toggle functions
- [ ] Leave button properly exits conversation
- [ ] Error handling for device access denied

### 3. Memory & Context Persistence
- [ ] User ID and session ID are included in API calls
- [ ] Memory stores are created and used across conversations
- [ ] Document tags are properly applied based on vertical
- [ ] Context persists between sessions (if using same userId)

## Production Deployment Testing

### 1. Environment Validation
```bash
# Check all required environment variables are set
vercel env ls

# Verify webhook endpoints are accessible
curl -I https://your-domain.vercel.app/api/tavus/webhook/conversation
curl -I https://your-domain.vercel.app/api/tavus/webhook/video
```

### 2. Performance Testing
```bash
# Test response times
curl -w "@curl-format.txt" -X POST https://your-domain.vercel.app/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{"vertical": "general"}'

# Create curl-format.txt:
echo "     time_namelookup:  %{time_namelookup}
        time_connect:  %{time_connect}
     time_appconnect:  %{time_appconnect}
    time_pretransfer:  %{time_pretransfer}
       time_redirect:  %{time_redirect}
  time_starttransfer:  %{time_starttransfer}
                     ----------
          time_total:  %{time_total}" > curl-format.txt
```

### 3. Webhook Validation in Production
Set up Tavus webhooks pointing to:
- `https://your-domain.vercel.app/api/tavus/webhook/conversation`
- `https://your-domain.vercel.app/api/tavus/webhook/video`

Monitor webhook delivery in:
- Vercel function logs
- PostHog analytics dashboard
- Your application's diagnostics/events directory

## Success Criteria Validation

### ✅ Core Integration
- [ ] Official @tavus/cvi-ui library installed and functional
- [ ] All 4 verticals (healthcare, legal, ecommerce, general) create conversations
- [ ] Memory stores and document tags working
- [ ] Webhook signatures verified correctly
- [ ] No TypeScript errors
- [ ] Build succeeds without warnings

### ✅ Production Readiness
- [ ] Rate limiting prevents abuse
- [ ] Error states provide clear user feedback
- [ ] CSP headers allow necessary Tavus domains
- [ ] Webhook timestamp validation prevents replay attacks
- [ ] Server-side tracking separated from client-side

### ✅ User Experience
- [ ] Widget loads quickly and responsively
- [ ] Video quality is acceptable
- [ ] Audio is clear and synchronized
- [ ] Controls are intuitive and functional
- [ ] Error recovery works smoothly

## Troubleshooting Common Issues

### Conversation Creation Fails
1. Check API key validity in Tavus dashboard
2. Verify persona/replica IDs are correct for vertical
3. Check rate limiting status
4. Review server logs for detailed error messages

### Webhook Verification Fails
1. Ensure `TAVUS_WEBHOOK_SECRET` matches Tavus configuration
2. Check timestamp tolerance (default 5 minutes)
3. Verify payload format matches expected structure

### Video/Audio Issues
1. Check browser permissions for camera/microphone
2. Verify CSP headers allow Daily.co domains
3. Test on different browsers and devices
4. Check network connectivity and firewall settings

### Memory/Context Not Persisting
1. Verify userId and sessionId are being passed correctly
2. Check memory store naming conventions
3. Review document tags configuration
4. Ensure Tavus account has memory features enabled

## Monitoring and Analytics

### PostHog Events to Monitor
- `Conversation Started`
- `Conversation Error`
- `Widget Opened/Closed`
- `Webhook Conversation Received`
- Rate limiting triggers

### Log Files
- `diagnostics/events/YYYY-MM-DD.jsonl` - All webhook events
- Vercel function logs - API call details
- Browser console - Client-side errors

This comprehensive testing guide ensures your Tavus CVI integration is production-ready and provides excellent user experience across all supported verticals.
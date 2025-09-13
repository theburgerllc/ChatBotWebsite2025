# Tavus CVI Integration Testing Commands

## Conversation Creation

### Test conversation creation (General vertical)
```bash
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{
    "vertical": "general",
    "memoryKey": "user_session_123",
    "userId": "test_user",
    "sessionId": "test_session_456",
    "documentTags": ["kb-test"],
    "metadata": {
      "language": "en",
      "enableRecordings": true
    }
  }'
```

### Test conversation creation (Healthcare vertical)
```bash
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{
    "vertical": "healthcare",
    "memoryKey": "patient_session_789",
    "documentTags": ["kb-medical-guidelines"],
    "metadata": {
      "patientId": "patient_123",
      "appointmentType": "consultation"
    }
  }'
```

### Test rate limiting (trigger after 5 requests)
```bash
for i in {1..6}; do
  echo "Request $i:"
  curl -X POST http://localhost:3000/api/tavus/create-conversation \
    -H "Content-Type: application/json" \
    -d '{"vertical": "general"}' \
    -w "\nStatus: %{http_code}\n\n"
done
```

## Webhook Testing

### Test conversation webhook with valid signature
```bash
# Generate test signature (replace YOUR_WEBHOOK_SECRET)
SECRET="your_webhook_secret_here"
PAYLOAD='{"event_type":"conversation.joined","conversation_id":"test_123","timestamp":"'$(date +%s)'"}'
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" -binary | xxd -p)

curl -X POST http://localhost:3000/api/tavus/webhook/conversation \
  -H "Content-Type: application/json" \
  -H "x-tavus-signature: $SIGNATURE" \
  -d "$PAYLOAD"
```

### Test conversation webhook with invalid signature
```bash
curl -X POST http://localhost:3000/api/tavus/webhook/conversation \
  -H "Content-Type: application/json" \
  -H "x-tavus-signature: invalid_signature" \
  -d '{"event_type":"conversation.joined","conversation_id":"test_123"}' \
  -w "\nStatus: %{http_code}\n"
```

### Test video webhook with valid signature
```bash
SECRET="your_webhook_secret_here"
PAYLOAD='{"status":"completed","video_id":"video_123","video_url":"https://example.com/video.mp4","timestamp":"'$(date +%s)'"}'
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" -binary | xxd -p)

curl -X POST http://localhost:3000/api/tavus/webhook/video \
  -H "Content-Type: application/json" \
  -H "x-tavus-signature: $SIGNATURE" \
  -d "$PAYLOAD"
```

## Rate Limit Status Check

### Check current rate limit status
```bash
curl -X GET http://localhost:3000/api/tavus/rate-limit-status \
  -H "x-forwarded-for: 192.168.1.100"
```

## Environment Variables Testing

### Verify environment variables are loaded
```bash
# Test missing configuration
curl -X POST http://localhost:3000/api/tavus/create-conversation \
  -H "Content-Type: application/json" \
  -d '{"vertical": "nonexistent"}' \
  -w "\nStatus: %{http_code}\n"
```

## Performance Testing

### Test exponential backoff behavior
```bash
# This will test the client-side retry logic
# Monitor the browser console for retry attempts
open http://localhost:3000
```

## Webhook Signature Generation Helper

```bash
# Helper function to generate webhook signatures
generate_signature() {
  local payload="$1"
  local secret="$2"
  echo -n "$payload" | openssl dgst -sha256 -hmac "$secret" -binary | xxd -p
}

# Usage example:
# SIGNATURE=$(generate_signature '{"test":"data"}' 'your_secret')
```

## Notes

1. Replace `http://localhost:3000` with your actual domain in production
2. Set proper `TAVUS_WEBHOOK_SECRET` in your environment
3. Ensure all Tavus persona and replica IDs are configured
4. Monitor logs for detailed error information
5. Check browser developer tools for client-side retry behavior

## Expected Success Responses

### Conversation Creation
```json
{
  "conversationUrl": "https://tavus.daily.co/...",
  "conversationId": "conv_...",
  "requestId": "...",
  "memoryStores": ["user_session_123", "user_test_user"],
  "documentTags": ["kb-global", "kb-test"]
}
```

### Rate Limit Hit
```json
{
  "error": "Too many requests. Please wait before trying again.",
  "retryAfter": 45,
  "remaining": 0,
  "resetTime": 1694123456789,
  "message": "Rate limit exceeded. Try again in 45 seconds."
}
```

### Webhook Success
```json
{
  "ok": true
}
```
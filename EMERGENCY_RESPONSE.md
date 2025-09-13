# Tavus CVI Integration - Emergency Response Guide

## Common Issues & Solutions

### 🔴 Issue: All conversations failing
**Symptoms:** 500 errors on /api/tavus/create-conversation  
**Quick Fix:**
```bash
# Check API key validity
curl -H "x-api-key: $TAVUS_API_KEY" https://tavusapi.com/v2/personas

# If invalid, update in Vercel:
vercel env rm TAVUS_API_KEY
vercel env add TAVUS_API_KEY
```

### 🔴 Issue: Rate limiting too aggressive
**Symptoms:** 429 errors for legitimate users  
**Quick Fix:**
```javascript
// In lib/ratelimit.ts, increase limits:
const LIMIT = 10; // Was 5
const WINDOW_MS = 60_000;
```

### 🔴 Issue: Webhooks not receiving
**Symptoms:** No events in admin panel  
**Quick Fix:**
- Check webhook URL in Tavus dashboard
- Verify signature secret matches
- Check Vercel function logs

### 🔴 Issue: Memory/Document tags not working
**Symptoms:** Context not persisting  
**Quick Fix:**
```bash
# Verify persona configuration
curl -X GET https://tavusapi.com/v2/personas/{persona_id}   -H "x-api-key: $TAVUS_API_KEY"
```

## Emergency Contacts
- Tavus Support: support@tavus.io
- Tavus Status: https://status.tavus.io
- Your DevOps Lead: [Contact]
- Escalation: [Manager Contact]

## Recovery Procedures

### Full System Recovery
```bash
# Rollback deployment
vercel rollback

# Restore from backup
./scripts/restore-backup.sh

# Clear all caches
./scripts/clear-all-caches.sh

# Restart services
vercel dev --force

# Run health checks
npm run test:integration
```

### Data Recovery
- **Conversation logs:** Check Vercel Functions logs
- **Webhook events:** .backup/events/
- **User sessions:** Browser localStorage

## Monitoring Commands
```bash
# Check current status
curl http://localhost:3000/api/health

# View recent errors
vercel logs --since 1h | grep ERROR

# Monitor webhook events
tail -f diagnostics/events/*.jsonl

# Check rate limit status
redis-cli GET "ratelimit:*"
```

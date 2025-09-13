type Bucket = { tokens: number; last: number; resetTime: number };
const buckets = new Map<string, Bucket>();
const LIMIT = 5;
const WINDOW_MS = 60_000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Enhanced rate limiting with detailed feedback
 * @param id - Identifier for rate limiting (usually IP address)
 * @returns Rate limit result with detailed information
 */
export function checkRateLimit(id: string): boolean;
export function checkRateLimit(id: string, detailed: true): RateLimitResult;
export function checkRateLimit(id: string, detailed?: boolean): boolean | RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(id) ?? { 
    tokens: LIMIT, 
    last: now, 
    resetTime: now + WINDOW_MS 
  };
  
  // Reset bucket if window has expired
  if (now - bucket.last > WINDOW_MS) { 
    bucket.tokens = LIMIT; 
    bucket.last = now; 
    bucket.resetTime = now + WINDOW_MS;
  }
  
  const allowed = bucket.tokens > 0;
  const remaining = Math.max(0, bucket.tokens - (allowed ? 1 : 0));
  const retryAfter = allowed ? undefined : Math.ceil((bucket.resetTime - now) / 1000);
  
  if (allowed) {
    bucket.tokens -= 1;
  }
  
  buckets.set(id, bucket);
  
  if (detailed) {
    return {
      allowed,
      remaining,
      resetTime: bucket.resetTime,
      retryAfter
    };
  }
  
  return allowed;
}

/**
 * Get rate limit status without consuming a token
 * @param id - Identifier for rate limiting
 * @returns Current rate limit status
 */
export function getRateLimitStatus(id: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(id) ?? { 
    tokens: LIMIT, 
    last: now, 
    resetTime: now + WINDOW_MS 
  };
  
  // Check if window has expired without updating
  const effectiveTokens = (now - bucket.last > WINDOW_MS) ? LIMIT : bucket.tokens;
  const allowed = effectiveTokens > 0;
  const resetTime = (now - bucket.last > WINDOW_MS) ? now + WINDOW_MS : bucket.resetTime;
  
  return {
    allowed,
    remaining: effectiveTokens,
    resetTime,
    retryAfter: allowed ? undefined : Math.ceil((resetTime - now) / 1000)
  };
}

/**
 * Clear rate limit for a specific identifier (for testing/admin purposes)
 * @param id - Identifier to clear
 */
export function clearRateLimit(id: string): void {
  buckets.delete(id);
}

/**
 * Get rate limit configuration
 */
export function getRateLimitConfig() {
  return {
    limit: LIMIT,
    windowMs: WINDOW_MS,
    windowSeconds: WINDOW_MS / 1000
  };
}

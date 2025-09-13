// Simple in-memory token bucket rate limiter.
// NOTE: Suitable for single-instance deployments. For multi-region or serverless scale,
// replace with an external store (e.g., Upstash Redis) but keep the same interface.
//
// Usage:
//   import { rateLimit } from '@/lib/ratelimit';
//   const { success, remaining, reset } = rateLimit(`tavus:${ip}`, 5, 60_000);
//   if (!success) return new Response('Too Many Requests', { status: 429 });

type Bucket = {
  tokens: number;
  lastRefill: number;
};

const buckets: Map<string, Bucket> = new Map();

export function rateLimit(
  key: string,
  maxRequests: number = Number(process.env.RATE_LIMIT_RPM || 5),
  windowMs: number = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000)
) {
  const now = Date.now();
  const refillRate = maxRequests / windowMs; // tokens per ms

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { tokens: maxRequests, lastRefill: now };
    buckets.set(key, bucket);
  }

  // Refill tokens
  const elapsed = now - bucket.lastRefill;
  bucket.tokens = Math.min(maxRequests, bucket.tokens + elapsed * refillRate);
  bucket.lastRefill = now;

  const success = bucket.tokens >= 1;
  if (success) bucket.tokens -= 1;

  const remaining = Math.max(0, Math.floor(bucket.tokens));
  const reset = windowMs - (elapsed % windowMs);

  return { success, remaining, reset };
}

export function ipKey(req: Request): string {
  // Use standard headers; fall back to remote addr if available via Next headers in App Router.
  const fwd = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const cf = req.headers.get('cf-connecting-ip') || '';
  const real = req.headers.get('x-real-ip') || '';
  const ip = fwd || cf || real || 'unknown';
  return `ip:${ip}`;
}

type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();
const LIMIT = 5;
const WINDOW_MS = 60_000;

export function checkRateLimit(id: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(id) ?? { tokens: LIMIT, last: now };
  
  if (now - bucket.last > WINDOW_MS) { 
    bucket.tokens = LIMIT; 
    bucket.last = now; 
  }
  
  if (bucket.tokens <= 0) { 
    buckets.set(id, bucket); 
    return false; 
  }
  
  bucket.tokens -= 1; 
  buckets.set(id, bucket); 
  return true;
}

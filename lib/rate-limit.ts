/**
 * Best-effort fixed-window rate limiter kept in process memory.
 * On serverless platforms each instance has its own window, which is enough to
 * blunt simple abuse; swap `store` for Redis/Upstash for a shared limit.
 */
type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();
let lastSweep = 0;

export type RateLimitOptions = { limit?: number; windowMs?: number };

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60_000 }: RateLimitOptions = {},
) {
  const now = Date.now();
  if (now - lastSweep > windowMs) {
    for (const [k, v] of store) if (v.resetAt <= now) store.delete(k);
    lastSweep = now;
  }
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  entry.count += 1;
  return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}

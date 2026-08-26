interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Periodic cleanup of stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  // Allow Node process to exit gracefully
  if (cleanupInterval && typeof cleanupInterval.unref === "function") {
    cleanupInterval.unref();
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * In-memory rate limiter per key (e.g. IP address).
 * @param key Unique identifier (IP address)
 * @param limit Max requests allowed in the timeframe
 * @param windowMs Timeframe window in milliseconds (default: 10 minutes)
 */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetTime < now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, newEntry);
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: newEntry.resetTime,
    };
  }

  if (entry.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  entry.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    reset: entry.resetTime,
  };
}

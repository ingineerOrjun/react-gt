// IP-based rate limiting for public mutations (currently the contact form).
// Mirrors the `hasSupabaseEnv` pattern: if Upstash isn't configured the limiter
// is null and callers skip throttling, so local/dev and un-provisioned envs keep
// working instead of crashing. Wire it up in production by setting the two
// UPSTASH_REDIS_REST_* vars (Vercel + Upstash integration provides them).
import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const hasRateLimitEnv = Boolean(url && token);

// 5 requests per 10 minutes per IP, sliding window. `analytics` records
// allowed/blocked counts in the Upstash dashboard for monitoring.
export const contactRatelimit = hasRateLimitEnv
  ? new Ratelimit({
      redis: new Redis({ url: url!, token: token! }),
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      prefix: 'ratelimit:contact',
      analytics: true,
    })
  : null;

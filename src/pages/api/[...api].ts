/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextApiHandler } from 'next';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create a new ratelimiter, that allows 5 requests per 5 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, '5 s'),
});

const handler: NextApiHandler = async (req, res) => {
  // Use a constant string to limit all requests with a single ratelimit
  // Or use a userID, apiKey or ip address for individual limits.
  const identifier = 'api';
  const result = await ratelimit.limit(identifier);
  res.setHeader('X-RateLimit-Limit', result.limit);
  res.setHeader('X-RateLimit-Remaining', result.remaining);

  if (!result.success) {
    res.status(200).json({
      message: 'The request has been rate limited.',
      rateLimitState: result,
    });
    return;
  }

  res.status(200).json({ name: 'John Doe', rateLimitState: result });
};

export default handler;

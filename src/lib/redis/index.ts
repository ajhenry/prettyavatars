/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Redis } from '@upstash/redis'

// Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

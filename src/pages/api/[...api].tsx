/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Avatar, { Variant } from '@/components/pretty-avatars/src'
import { redis } from '@/lib/redis'
import { Ratelimit } from '@upstash/ratelimit'
import Color from 'color'
import { NextApiHandler } from 'next'
// import Avatar from 'pretty-avatars'
import { renderToString } from 'react-dom/server'
import requestIP from 'request-ip'

// convert color code to hex
const colorHex = (color: string) => {
  if (color.startsWith('#')) return color
  if (color.startsWith('rgb')) return Color(color).hex()

  return Color(`#${color}`).hex()
}

// default color palette
const palette = ['#BF616A', '#D08770', '#EBCB8B', '#A3BE8C', '#B48EAD']

// function that takes in the request url and returns
// the following data: /api/[icon]/[size]/[name]/[colors]
const parseRequest = (url: string) => {
  const parsed = url.split('/')
  const [_, __, variant, size, name, colors] = parsed
  return {
    variant: variant ?? 'circle',
    size: size ? parseInt(size) : 80,
    name: name ?? 'John Doe',
    colors: colors ? colors.split(',').map(colorHex) : palette,
  }
}

// Create a new ratelimiter, that allows 5 requests per 5 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, '5 s'),
})

const handler: NextApiHandler = async (req, res) => {
  // Use a constant string to limit all requests with a single ratelimit
  // Or use a userID, apiKey or ip address for individual limits.
  const detectedIP = requestIP.getClientIp(req)
  const identifier = detectedIP ?? 'fallback'
  const result = await ratelimit.limit(identifier)
  res.setHeader('X-RateLimit-Limit', result.limit)
  res.setHeader('X-RateLimit-Remaining', result.remaining)
  res.setHeader('X-RateLimit-Reset', result.reset)

  if (!result.success) {
    res.status(429).json({
      message: 'The request has been rate limited.',
      rateLimitState: result,
    })
    return
  }
  const { variant, size, name, colors } = parseRequest(req.url ?? '')
  const rendered = renderToString(
    <Avatar
      variant={variant as Variant}
      size={size}
      name={name}
      colors={colors}
    />
  )
  const imageBuffer = Buffer.from(rendered, 'utf-8')
  res.setHeader('Content-Type', 'image/svg+xml')
  res.send(imageBuffer)
}

export default handler

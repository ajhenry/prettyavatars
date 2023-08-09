/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { faker } from '@faker-js/faker'
import Color from 'color'
import { NextApiHandler } from 'next'
import Avatar, { Variant } from 'prettyavatars'
// import Avatar from 'pretty-avatars'
import pallettes from 'nice-color-palettes'
import queryString from 'query-string'
import { renderToString } from 'react-dom/server'
import requestIP from 'request-ip'

// convert color code to hex
// needs much much battle hardening
const colorHex = (color: string) => {
  try {
    if (color.startsWith('#')) return color
    if (color.startsWith('rgb')) return Color(color).hex()

    return Color(`#${color}`).hex()
  } catch (error) {
    // Light blue :)
    return '#90caf9'
  }
}

// default color palette
const palette = ['#BF616A', '#D08770', '#EBCB8B', '#A3BE8C', '#B48EAD']

// function that takes in the request url and returns
// the following data: /api/[icon]/[size]/[name]/[colors]
//
// Also accepts the following query params:
// - variant: string
// - size: number
// - name: string
// - colors: comma-separated list of colors
//
// And these additional query params for other avatars:
// - random-all: boolean
// - random-name: boolean
// - random-colors: boolean
// - seed: string

const parseRequest = (url: string) => {
  // There's such a better way to do this, but oh well
  // remove any q
  const [urlWithoutQueryParams, queryParams] = url.split('?')
  const parsed = urlWithoutQueryParams.split('/').map(decodeURIComponent)
  // parse out query params
  const query = queryString.parse(queryParams ?? '')

  // Parse variant, size, and name
  let variant = parsed[2] ?? query['variant'] ?? 'letter'
  let name = parsed[4] ?? query['name'] ?? 'John Doe'
  const size = Number(parsed[3] ?? query['size'] ?? 80)

  // Parse colors
  const colorString = parsed[5] ?? query['colors'] ?? palette.join(',')
  let colors = colorString.split(',').map(colorHex)

  // if random is true, generate a random avatar
  if (query['random-all']) {
    const variants: Variant[] = [
      'letter',
      'pixel',
      'bauhaus',
      'ring',
      'beam',
      'sunset',
      'marble',
      'letter-plain',
      'pixel-art',
    ]
    variant = variants[Math.floor(Math.random() * variants.length)]
    name = Math.random() > 0.5 ? faker.name.fullName() : faker.name.firstName()
    colors = pallettes[Math.floor(Math.random() * pallettes.length)]
  }

  if (query['random-name']) {
    name = Math.random() > 0.5 ? faker.name.fullName() : faker.name.firstName()
  }

  if (query['random-colors']) {
    colors = pallettes[Math.floor(Math.random() * pallettes.length)]
  }

  return {
    variant,
    size,
    name,
    colors,
  }
}

const handler: NextApiHandler = async (req, res) => {
  const detectedIP = requestIP.getClientIp(req)
  const identifier = detectedIP ?? 'fallback'
  // eslint-disable-next-line no-console
  console.log('identifier', identifier)

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

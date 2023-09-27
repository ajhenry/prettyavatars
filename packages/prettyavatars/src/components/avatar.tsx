import React from 'react'
import AvatarBauhaus from './bauhaus'
import AvatarBeam from './beam'
import AvatarLetter from './letter'
import AvatarMarble from './marble'
import AvatarPixel from './pixel'
import AvatarPixelArt from './pixel-art'
import AvatarRing from './ring'
import AvatarSmile from './smile'
import AvatarSunset from './sunset'

const variants = [
  'letter',
  'pixel',
  'bauhaus',
  'ring',
  'beam',
  'sunset',
  'marble',
  'letter-plain',
  'pixel-art',
  'smile',
] as const

export type Variant = (typeof variants)[number]

export interface AvatarProps {
  colors: string[]
  name: string
  square?: boolean
  size?: number
}

export const defaultProps = {
  variant: 'marble',
  colors: ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  name: 'Clara Barton',
  square: false,
  size: 40,
}

const checkedVariant = (variant: string) => {
  if (variants.includes(variant as Variant)) {
    return variant
  }
  return 'beam'
}

const Avatar = ({
  variant = 'marble',
  colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  name = 'Clara Barton',
  square = false,
  size = 40,
  ...props
}: AvatarProps & { variant: Variant }) => {
  const avatarProps = { colors, name, size, square, ...props }

  const avatars: Record<string, React.ReactElement> = {
    letter: <AvatarLetter {...avatarProps} />,
    pixel: <AvatarPixel {...avatarProps} />,
    bauhaus: <AvatarBauhaus {...avatarProps} />,
    ring: <AvatarRing {...avatarProps} />,
    beam: <AvatarBeam {...avatarProps} />,
    sunset: <AvatarSunset {...avatarProps} />,
    marble: <AvatarMarble {...avatarProps} />,
    'letter-plain': <AvatarLetter {...avatarProps} plain />,
    'pixel-art': <AvatarPixelArt {...avatarProps} />,
    smile: <AvatarSmile {...avatarProps} />,
  }

  return avatars[checkedVariant(variant)]
}

export default Avatar

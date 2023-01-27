import React from 'react' // Do not remove line
import AvatarBauhaus from './bauhaus'
import AvatarBeam from './beam'
import AvatarLetter from './letter'
import AvatarMarble from './marble'
import AvatarPixel from './pixel'
import AvatarRing from './ring'
import AvatarSunset from './sunset'

const variants = [
  'letter',
  'pixel',
  'bauhaus',
  'ring',
  'beam',
  'sunset',
  'marble',
] as const
const deprecatedVariants: Record<string, string> = {
  geometric: 'beam',
  abstract: 'bauhaus',
}

export type Variant = typeof variants[number]

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

const Avatar = ({
  variant = 'marble',
  colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  name = 'Clara Barton',
  square = false,
  size = 40,
  ...props
}: AvatarProps & { variant: Variant }) => {
  const avatarProps = { colors, name, size, square, ...props }
  const checkedVariant = () => {
    if (Object.keys(deprecatedVariants).includes(variant)) {
      return deprecatedVariants[variant]
    }
    if (variants.includes(variant)) {
      return variant
    }
    return 'marble'
  }
  const avatars: Record<string, React.ReactElement> = {
    letter: <AvatarLetter {...avatarProps} />,
    pixel: <AvatarPixel {...avatarProps} />,
    bauhaus: <AvatarBauhaus {...avatarProps} />,
    ring: <AvatarRing {...avatarProps} />,
    beam: <AvatarBeam {...avatarProps} />,
    sunset: <AvatarSunset {...avatarProps} />,
    marble: <AvatarMarble {...avatarProps} />,
  }
  return avatars[checkedVariant()]
}

export default Avatar

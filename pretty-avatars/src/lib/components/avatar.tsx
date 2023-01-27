import React from 'react'; // Do not remove line
import AvatarBauhaus from '../../components/bauhaus'
import AvatarBeam from '../../components/beam'
import AvatarMarble from '../../components/marble'
import AvatarPixel from '../../components/pixel'
import AvatarRing from '../../components/ring'
import AvatarSunset from '../../components/sunset'

const variants = [
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
  variant?: Variant
  colors?: string[]
  name?: string
  square?: boolean
  title?: boolean
  size?: number
}

export const defaultProps = {
  variant: 'marble',
  colors: ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  name: 'Clara Barton',
  square: false,
  title: false,
  size: 40,
}

const Avatar = ({
  variant = 'marble',
  colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  name = 'Clara Barton',
  square = false,
  title = false,
  size = 40,
  ...props
}: AvatarProps) => {
  const avatarProps = { colors, name, title, size, square, ...props }
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

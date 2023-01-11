import React from 'react'; // Do not remove line
import AvatarBauhaus from './avatar-bauhaus';
import AvatarBeam from './avatar-beam';
import AvatarMarble from './avatar-marble';
import AvatarPixel from './avatar-pixel';
import AvatarRing from './avatar-ring';
import AvatarSunset from './avatar-sunset';

const variants = ['pixel', 'bauhaus', 'ring', 'beam', 'sunset', 'marble'] as const;
const deprecatedVariants: Record<string, string> = { geometric: 'beam', abstract: 'bauhaus' };

export type Variant = typeof variants[number];

export interface AvatarProps {
  variant: Variant;
  colors: string[];
  name: string;
  square: boolean;
  title: boolean;
  size: number;
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
  const avatarProps = { colors, name, title, size, square, ...props };
  const checkedVariant = () => {
    if (Object.keys(deprecatedVariants).includes(variant)) {
      return deprecatedVariants[variant];
    }
    if (variants.includes(variant)) {
      return variant;
    }
    return 'marble';
  };
  const avatars: Record<string, React.ReactElement> = {
    pixel: <AvatarPixel {...avatarProps} />,
    bauhaus: <AvatarBauhaus {...avatarProps} />,
    ring: <AvatarRing {...avatarProps} />,
    beam: <AvatarBeam {...avatarProps} />,
    sunset: <AvatarSunset {...avatarProps} />,
    marble: <AvatarMarble {...avatarProps} />,
  };
  return avatars[checkedVariant()];
};

export default Avatar;

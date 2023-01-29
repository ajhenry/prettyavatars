// import Avatar, { AvatarProps } from 'pretty-avatars'
import Avatar, { Variant } from '@/components/pretty-avatars/src'
import { useState } from 'react'

import { generateName } from '@/lib/fake'

interface AvatarBlockProps {
  variant?: Variant
  colors?: string[]
  size?: number
  square?: boolean
}

export const AvatarBlock: React.FC<AvatarBlockProps> = ({
  colors,
  size,
  variant,
  square,
}) => {
  const [name, setName] = useState(generateName())

  return (
    <div className='m-2 flex flex-col items-center'>
      <Avatar
        variant={variant ?? 'marble'}
        name={name}
        size={size ?? 64}
        colors={
          colors ?? [
            '#F56565',
            '#ED8936',
            '#ECC94B',
            '#48BB78',
            '#4299E1',
            '#667EEA',
            '#9F7AEA',
            '#ED64A6',
          ]
        }
        square={square ?? false}
      />
      <input
        value={name}
        className='mt-2 w-32 bg-transparent text-center'
        onChange={(v) => setName(v.target.value)}
      />
    </div>
  )
}

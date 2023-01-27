import {
  faCircle,
  faRefresh,
  faSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from '@headlessui/react'
import clsx from 'clsx'
import palettes from 'nice-color-palettes'
import { AvatarProps } from 'pretty-avatars'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import useDarkMode from 'use-dark-mode'

import { AvatarBlock } from '@/components/Avatar'

const variants: AvatarProps['variant'][] = [
  'letter',
  'pixel',
  'bauhaus',
  'ring',
  'beam',
  'sunset',
  'marble',
]

// Picks a random color palette
const randomizeColors = () => {
  return palettes[Math.floor(Math.random() * palettes.length)]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PlaygroundProps {}

export const Playground: React.FC<PlaygroundProps> = () => {
  const { value: isDarkMode } = useDarkMode(true)
  const [size, setSize] = useState(80)
  const [colors, setColors] = useState<string[]>(randomizeColors())
  const [square, setSquare] = useState(false)

  const updateColors = (color: string, position: number, colors: string[]) => {
    const newColors = [...colors]
    newColors[position] = color
    setColors(newColors)
  }

  return (
    <div id='playground' className='mt-16 flex flex-col justify-center'>
      <div>
        <h2 className='text-6xl font-extrabold'>Playground</h2>
      </div>
      <div className='sticky mt-4 flex flex-row justify-center space-x-4'>
        <div
          className={clsx(
            'inline-block w-auto space-x-2 rounded p-1',
            isDarkMode ? 'bg-dark-paper' : 'bg-light-paper'
          )}
        >
          <button
            onClick={() => setSquare(false)}
            className={clsx(
              !square ? 'bg-white text-black' : 'bg-transparent',
              'h-8 w-8 rounded',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faCircle} size='lg' />
          </button>
          <button
            onClick={() => setSquare(true)}
            className={clsx(
              square ? 'bg-white text-black' : 'bg-transparent',
              'h-8 w-8 rounded',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faSquare} size='lg' />
          </button>
        </div>

        <div
          className={clsx(
            'inline-block w-auto space-x-2 rounded p-1',
            isDarkMode ? 'bg-dark-paper' : 'bg-light-paper'
          )}
        >
          <button
            onClick={() => setSize(40)}
            className={clsx(
              size === 40 ? 'bg-white text-black' : 'bg-transparent',
              'h-8 w-8 rounded',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faCircle} size='xs' />
          </button>
          <button
            onClick={() => setSize(80)}
            className={clsx(
              size === 80 ? 'bg-white text-black' : 'bg-transparent',
              'h-8 w-8 rounded',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faCircle} size='lg' />
          </button>
          <button
            onClick={() => setSize(120)}
            className={clsx(
              size === 120 ? 'bg-white text-black' : 'bg-transparent',
              'h-8 w-8 rounded',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faCircle} size='xl' />
          </button>
        </div>
        <div
          className={clsx(
            'w-auto space-x-1 rounded p-1',
            isDarkMode ? 'bg-dark-paper' : 'bg-light-paper',
            'inline-flex flex-row items-center'
          )}
        >
          {colors.map((color, i) => (
            <Popover key={color} className={clsx('h-8 w-8')}>
              <Popover.Button
                onClick={() => setSquare(false)}
                className={clsx(
                  'h-full w-full rounded',
                  'transition-all duration-200 ease-in-out'
                )}
                style={{ backgroundColor: color }}
              />

              <Popover.Panel className='absolute z-10'>
                <SketchPicker
                  color={color}
                  onChangeComplete={(color) =>
                    updateColors(color.hex, i, colors)
                  }
                  className={clsx(
                    isDarkMode ? 'bg-dark-paper' : 'bg-light-paper'
                  )}
                />
              </Popover.Panel>
            </Popover>
          ))}
          <button
            onClick={() => setColors(randomizeColors())}
            className={clsx(
              'h-8 w-8 rounded',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faRefresh} size='lg' />
          </button>
        </div>
      </div>
      {variants.map((variant) => (
        <div className='mt-8' key={variant}>
          <h3 className='text-left text-3xl'>{variant}</h3>
          <div className={clsx('mt-4 flex flex-row flex-wrap justify-around')}>
            {Array.from({ length: 14 }).map((_, i) => (
              <AvatarBlock
                key={i}
                variant={variant}
                size={size}
                square={square}
                colors={colors}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

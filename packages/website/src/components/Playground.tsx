import { AvatarBlock } from '@/components/Avatar'
import { useBreakpoint } from '@/hooks/useTailwind'
import {
  faCircle,
  faMoon,
  faRefresh,
  faSquare,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from '@headlessui/react'
import clsx from 'clsx'
import { useDarkMode } from 'next-dark-mode'
import palettes from 'nice-color-palettes'
import { Variant } from 'prettyavatars'
import { PropsWithChildren, useState } from 'react'
import { SketchPicker } from 'react-color'

const variants: Variant[] = [
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

const Holder: React.FC<PropsWithChildren> = ({ children }) => {
  const { darkModeActive: isDarkMode } = useDarkMode()

  return (
    <div
      className={clsx(
        'mx-5 my-2 w-fit space-x-1 rounded p-1 sm:m-0 sm:w-auto',
        isDarkMode ? 'bg-dark-paper' : 'bg-light-paper',
        'inline-flex flex-row items-center',
        'border border-primary-600'
      )}
    >
      {children}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PlaygroundProps {}

export const Playground: React.FC<PlaygroundProps> = () => {
  const isDesktop = useBreakpoint('sm', true)
  const [size, setSize] = useState(100)
  const [colors, setColors] = useState<string[]>(randomizeColors())
  const [square, setSquare] = useState(false)
  const iconSize = isDesktop ? 'lg' : '2xl'
  const {
    darkModeActive: isDarkMode,
    switchToLightMode,
    switchToDarkMode,
  } = useDarkMode()

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
      <div className='mt-4 flex flex-wrap justify-center sm:flex-row sm:flex-nowrap sm:space-x-4'>
        <Holder>
          <button
            onClick={switchToLightMode}
            className={clsx(
              !isDarkMode ? 'bg-white text-black' : 'bg-transparent',
              'h-12 w-12 rounded sm:h-8 sm:w-8',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faSun} size={iconSize} />
          </button>
          <button
            onClick={switchToDarkMode}
            className={clsx(
              isDarkMode ? 'bg-white text-black' : 'bg-transparent',
              'h-12 w-12 rounded sm:h-8 sm:w-8',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faMoon} size={iconSize} />
          </button>
        </Holder>
        <Holder>
          <button
            onClick={() => setSquare(false)}
            className={clsx(
              !square ? 'bg-white text-black' : 'bg-transparent',
              'h-12 w-12 rounded sm:h-8 sm:w-8',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faCircle} size={iconSize} />
          </button>
          <button
            onClick={() => setSquare(true)}
            className={clsx(
              square ? 'bg-white text-black' : 'bg-transparent',
              'h-12 w-12 rounded sm:h-8 sm:w-8',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faSquare} size={iconSize} />
          </button>
        </Holder>

        <Holder>
          <button
            onClick={() => setSize(60)}
            className={clsx(
              size === 60 ? 'bg-white text-black' : 'bg-transparent',
              'h-12 w-12 rounded sm:h-8 sm:w-8',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faCircle} size={isDesktop ? 'xs' : 'lg'} />
          </button>
          <button
            onClick={() => setSize(100)}
            className={clsx(
              size === 100 ? 'bg-white text-black' : 'bg-transparent',
              'h-12 w-12 rounded sm:h-8 sm:w-8',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faCircle} size={isDesktop ? 'lg' : '2x'} />
          </button>
          <button
            onClick={() => setSize(140)}
            className={clsx(
              size === 140 ? 'bg-white text-black' : 'bg-transparent',
              'h-12 w-12 rounded sm:h-8 sm:w-8',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faCircle} size={isDesktop ? 'xl' : '3x'} />
          </button>
        </Holder>
        <Holder>
          {colors.map((color, i) => (
            <Popover key={color} className={clsx('h-12 w-12 sm:h-8 sm:w-8')}>
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
              'h-12 w-12 rounded sm:h-8 sm:w-8',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <FontAwesomeIcon icon={faRefresh} size={iconSize} />
          </button>
        </Holder>
      </div>
      {variants.map((variant) => (
        <div className='mt-8' key={variant}>
          <h3 className='text-left text-3xl'>{variant}</h3>
          <div className={clsx('mt-4 flex flex-row flex-wrap justify-around')}>
            {Array.from({ length: isDesktop ? 14 : 6 }).map((_, i) => (
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

import Color from 'color'
import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import TextToSVG from 'text-to-svg'
import { letterMap } from '../lib/letters'
import { getInitials, getRandomColor, hashCode, sfc } from '../lib/utils'
import { AvatarProps } from './avatar'

const SIZE = 80

export interface AvatarDynamicLetterProps extends AvatarProps {
  fontUrl?: string
  unstable?: boolean
  plain?: boolean
}

const getInterLetters = (letter: string, fill: string) => {
  return `<path d="${letterMap[letter]}" fill="${fill}" />`
}

const AvatarDynamicLetter: React.FC<AvatarDynamicLetterProps> = (props) => {
  const { name, colors, fontUrl, unstable, plain } = props
  const [loader, setLoader] = React.useState<TextToSVG | null>(null)
  const [initials, setInitials] = React.useState<string>(getInitials(name))
  const [seed, setSeed] = React.useState(hashCode(props.name))
  const [color, setColor] = React.useState<string>(
    getRandomColor(seed, colors, colors.length)
  )
  const lightened = Color(color)
    .lighten(0.2 + sfc(unstable ? Math.random() : seed)() * 0.5)
    .hex()
  const darkened = Color(color)
    .darken(0.2 + sfc(unstable ? Math.random() : seed + 1)() * 0.5)
    .hex()

  React.useEffect(() => {
    TextToSVG.load(
      fontUrl ?? '/fonts/Inter-Black.ttf',
      function (err, textToSVG) {
        if (!textToSVG) {
          if (window === undefined) {
            // eslint-disable-next-line no-console
            console.log(err)
          }
          return
        }
        if (!loader) {
          setLoader(textToSVG)
        }
      }
    )
  }, [loader, fontUrl])

  React.useEffect(() => {
    setInitials(getInitials(name))
    setSeed(hashCode(name))
  }, [name])

  // Needed for SSR to work
  React.useEffect(() => {
    setColor(getRandomColor(seed, colors, colors.length))
  }, [seed, colors, name])

  const generatePath = (letters: string) => {
    if (!fontUrl) {
      return getInterLetters(letters, darkened)
    }

    // This is still a work in progress for dynamic fonts
    if (!loader) {
      return
    }

    return loader.getPath(letters, {
      x: SIZE / 2,
      y: SIZE / 2,
      anchor: 'center middle',
      fontSize: letters.length === 2 ? SIZE - 48 : SIZE - 32,
      attributes: {
        fill: darkened,
      },
    })
  }

  const SQUARE_CONST = 0.05
  const SCALE_CONSTANT = 0.8

  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {props.square ? (
        <>
          <rect
            width={SIZE}
            height={SIZE}
            fill={!plain ? darkened : lightened}
          />
          {!plain && (
            <rect
              width={SIZE * (1 - SQUARE_CONST * 2)}
              height={SIZE * (1 - SQUARE_CONST * 2)}
              fill={lightened}
              x={SIZE - SIZE * (1 - SQUARE_CONST)}
              y={SIZE - SIZE * (1 - SQUARE_CONST)}
            />
          )}
        </>
      ) : (
        <>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={SIZE / 2}
            fill={!plain ? darkened : lightened}
          />
          {!plain && (
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={SIZE / 2 - SIZE * 0.05}
              fill={lightened}
            />
          )}
        </>
      )}
      {initials.length === 2 ? (
        <>
          <g
            transform={`translate(-${8 * SCALE_CONSTANT}, ${
              10 * SCALE_CONSTANT
            }) scale(${SCALE_CONSTANT})`}
          >
            {ReactHtmlParser(generatePath(initials.split('')[0])!)}
          </g>
          <g
            transform={`translate(${26 * SCALE_CONSTANT}, ${
              10 * SCALE_CONSTANT
            }) scale(${SCALE_CONSTANT})`}
          >
            {ReactHtmlParser(generatePath(initials.split('')[1])!)}
          </g>
        </>
      ) : (
        ReactHtmlParser(generatePath(initials)!)
      )}
    </svg>
  )
}

export default AvatarDynamicLetter

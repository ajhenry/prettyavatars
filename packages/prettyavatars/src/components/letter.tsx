import Color from 'color'
import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { letterMap } from '../lib/letters'
import { getInitials, getRandomColor, hashCode, sfc } from '../lib/utils'
import { AvatarProps } from './avatar'

const SIZE = 80

export interface AvatarLetterProps extends AvatarProps {
  plain?: boolean
}

const getInterLetters = (letter: string, fill: string) => {
  return `<path d="${letterMap[letter]}" fill="${fill}" />`
}

const AvatarLetter: React.FC<AvatarLetterProps> = (props) => {
  const { name, colors, plain } = props
  const seed = hashCode(name)
  const initials = getInitials(name)
  const color = getRandomColor(seed, colors, colors.length)

  const lightened = Color(color)
    .lighten(0.2 + sfc(seed)() * 0.5)
    .hex()
  const darkened = Color(color)
    .darken(0.2 + sfc(seed + 1)() * 0.5)
    .hex()

  const generatePath = (letters: string) => {
    return getInterLetters(letters, darkened)
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

export default AvatarLetter

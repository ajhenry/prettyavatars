import React from 'react'
import { getRandomColor, hashCode } from '../lib/utils'
import { AvatarProps } from './avatar'

const SIZE = 90

export interface AvatarPixelArtProps extends AvatarProps {}

const AvatarPixelArt: React.FC<AvatarPixelArtProps> = (props) => {
  const { colors, name } = props
  const numFromName = hashCode(name)
  const range = colors && colors.length
  const backgroundColor = getRandomColor(numFromName, colors, range)
  const pixelColor = getRandomColor(numFromName + 13, colors, range)
  const hash = hashCode(name)
  const OFFSET = SIZE / 8

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={props.size}
      height={props.size}
      xmlns='http://www.w3.org/2000/svg'
    >
      {props.square ? (
        <rect width={SIZE} height={SIZE} fill={backgroundColor} />
      ) : (
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={SIZE / 2}
          fill={backgroundColor}
        />
      )}
      <g transform={`translate(${OFFSET * 1.5}, ${OFFSET * 1.5})`}>
        {
          // console.log("%c" + hash.toString(2).padStart(32, "0"), "font-family:monospace") // uncomment to debug
          [...Array(name ? 25 : 0)].map((_, i) =>
            // testing the 15 lowest weight bits of the hash
            hash & (1 << i % 15) ? (
              <rect
                key={i}
                x={`${(i > 14 ? 7 - ~~(i / 5) : ~~(i / 5)) * OFFSET}`}
                y={`${(i % 5) * OFFSET}`}
                width={OFFSET}
                height={OFFSET}
                fill={pixelColor}
              />
            ) : null
          )
        }
      </g>
    </svg>
  )
}

export default AvatarPixelArt

import * as React from 'react'
import {
  getBoolean,
  getContrast,
  getRandomColor,
  getUnit,
  hashCode,
} from '../lib/utils'
import { AvatarProps } from './avatar'

const SIZE = 36

function generateData(name: string, colors: string[]) {
  const numFromName = hashCode(name)
  const range = colors && colors.length
  const wrapperColor = getRandomColor(numFromName, colors, range)
  const backgroundColor = getRandomColor(numFromName + 13, colors, range)

  const data = {
    faceColor: getContrast(backgroundColor),
    backgroundColor: backgroundColor,
    wrapperScale: 1 + getUnit(numFromName, SIZE / 12) / 10,
    isMouthOpen: getBoolean(numFromName, 2),
    isCircle: getBoolean(numFromName, 1),
    eyeSpread: getUnit(numFromName, 5),
    mouthSpread: getUnit(numFromName, 5),
  }

  return data
}

export interface AvatarSmileProps extends AvatarProps {}

const AvatarSmile: React.FC<AvatarSmileProps> = (props) => {
  const data = generateData(props.name, props.colors)

  return (
    <svg
      viewBox={'0 0 ' + SIZE + ' ' + SIZE}
      fill='none'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
    >
      <mask
        id='mask__beam'
        maskUnits='userSpaceOnUse'
        x={0}
        y={0}
        width={SIZE}
        height={SIZE}
      >
        <rect
          width={SIZE}
          height={SIZE}
          rx={props.square ? undefined : SIZE * 2}
          fill='#FFFFFF'
        />
      </mask>
      <g mask='url(#mask__beam)'>
        <rect width={SIZE} height={SIZE} fill={data.backgroundColor} />
        <g transform={`rotate(0 ${SIZE / 2} ${SIZE / 2})`}>
          {data.isMouthOpen ? (
            <path
              d={'M15 ' + (19 + data.mouthSpread) + 'c2 1 4 1 6 0'}
              stroke={data.faceColor}
              fill='none'
              strokeLinecap='round'
            />
          ) : (
            <path
              d={'M13,' + (19 + data.mouthSpread) + ' a1,0.75 0 0,0 10,0'}
              fill={data.faceColor}
            />
          )}
          <rect
            x={14 - data.eyeSpread}
            y={14}
            width={3}
            height={3}
            rx={10}
            stroke='none'
            fill={data.faceColor}
          />
          <rect
            x={20 + data.eyeSpread}
            y={14}
            width={3}
            height={3}
            rx={10}
            stroke='none'
            fill={data.faceColor}
          />
        </g>
      </g>
    </svg>
  )
}

export default AvatarSmile

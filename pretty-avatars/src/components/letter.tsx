import Color from 'color'
import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import TextToSVG from 'text-to-svg'
import { getInitials, getRandomColor, hashCode, sfc } from '../lib/utils'
import { AvatarProps } from './avatar'

const SIZE = 80

const isSSR = typeof window === 'undefined'

export interface AvatarLetterProps extends AvatarProps {
  singleLetter?: boolean
  fontUrl?: string
  unstable?: boolean
}

const AvatarLetter: React.FC<AvatarLetterProps> = (props) => {
  const { name, colors, singleLetter, fontUrl, unstable } = props
  const [loader, setLoader] = React.useState<TextToSVG | null>(null)
  const seed = hashCode(props.name)
  const [color, setColor] = React.useState<string>()

  const lightened = Color(color)
    .lighten(0.2 + sfc(unstable ? Math.random() : seed)() * 0.5)
    .hex()
  const darkened = Color(color)
    .darken(0.2 + sfc(unstable ? Math.random() : seed + 1)() * 0.5)
    .hex()
  const initials = getInitials(name, singleLetter)

  React.useEffect(() => {
    TextToSVG.load(
      fontUrl ?? '/fonts/Inter-Black.ttf',
      function (err, textToSVG) {
        if (!textToSVG) {
          if (window === undefined) {
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

  // Needed for SSR to work
  React.useEffect(() => {
    setColor(getRandomColor(seed, colors, colors.length))
  }, [seed, colors])

  const generatePath = (letters: string) => {
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

  const letters = generatePath(initials) ?? 'A'

  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2} fill={darkened} />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={SIZE / 2 - SIZE * 0.05}
        fill={lightened}
      />
      {ReactHtmlParser(letters)}
    </svg>
  )
}

export default AvatarLetter

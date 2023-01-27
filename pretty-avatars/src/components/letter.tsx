import Color from 'color'
import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import TextToSVG from 'text-to-svg'
import { getRandomColor, hashCode } from '../lib/utils'

const SIZE = 80

const getInitials = (name: string) => {
  let names = name.trim().split(' '),
    initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  if (initials.length === 0) {
    initials = ''
  }

  return initials
}

interface AvatarLetterProps {
  name: string
  colors: string[]
  size?: number
  square?: boolean
  title?: boolean
}

const AvatarLetter: React.FC<AvatarLetterProps> = (props) => {
  const { name, colors } = props
  const [loader, setLoader] = React.useState<TextToSVG | null>(null)
  // pick a random color from the colors props and then use the color.lighten(Math.random() * 0.5) to get a random color
  const color = getRandomColor(hashCode(props.name), colors, colors.length)
  const lightened = Color(color)
    .lighten(0.2 + Math.random() * 0.5)
    .hex()
  const darkened = Color(color)
    .darken(0.2 + Math.random() * 0.5)
    .hex()
  const initials = getInitials(name)

  React.useEffect(() => {
    TextToSVG.load('/fonts/Inter-Black.ttf', function (err, textToSVG) {
      if (!textToSVG) {
        if (window === undefined) {
          console.log(err)
        }
        return
      }
      if (!loader) {
        setLoader(textToSVG)
      }
    })
  }, [loader])

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

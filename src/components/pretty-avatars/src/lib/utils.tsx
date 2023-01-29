export const hashCode = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    const character = name.charCodeAt(i)
    hash = (hash << 5) - hash + character
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Suedo-random number generator
// if no seed is provided, a random seed is used
export function sfc(a = Math.random(), b = 12, c = 19, d = 78) {
  return function () {
    a >>>= 0
    b >>>= 0
    c >>>= 0
    d >>>= 0
    let t = (a + b) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    d = (d + 1) | 0
    t = (t + d) | 0
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }
}

export const getModulus = (num: number, max: number) => {
  return num % max
}

export const getDigit = (number: number, ntn: number) => {
  return Math.floor((number / Math.pow(10, ntn)) % 10)
}

export const getBoolean = (number: number, ntn: number) => {
  return !(getDigit(number, ntn) % 2)
}

export const getAngle = (x: number, y: number) => {
  return (Math.atan2(y, x) * 180) / Math.PI
}

export const getUnit = (number: number, range: number, index?: number) => {
  const value = number % range

  if (index && getDigit(number, index) % 2 === 0) {
    return -value
  } else return value
}

export const getRandomColor = (
  number: number,
  colors: string[],
  range: number
) => {
  return colors[number % range]
}

export const getContrast = (hexcolor: string) => {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1)
  }

  // Convert to RGB value
  const r = parseInt(hexcolor.substring(0, 2), 16)
  const g = parseInt(hexcolor.substring(2, 2), 16)
  const b = parseInt(hexcolor.substring(4, 2), 16)

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  // Check contrast
  return yiq >= 128 ? '#000000' : '#FFFFFF'
}

export const getInitials = (name: string, singleLetter = false) => {
  const names = name.trim().split(' ')
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1 && !singleLetter) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  if (initials.length === 0) {
    initials = ''
  }

  return initials
}

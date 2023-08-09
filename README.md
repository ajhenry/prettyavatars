<!-- markdownlint-configure-file {
  "MD033": false,
  "MD041": false
} -->

<div align="center">

<img src="https://prettyavatars.com/api/letter/160?random-all=true"/>
<br/>
<br/>

# prettyavatars

**prettyavatars** is collection of pretty default avatars to use in your next project ✨

All avatars are SVG-based and are generated based on the name and color palette you provide 🎨<br />

_Also available as a standalone [React package](https://www.npmjs.com/package/prettyavatars)_

[Avatars](#avatars) •
[API](#api) •
[Installation](#installation)

</div>

## Avatars

### letter

<div align="center">
  <img src="https://prettyavatars.com/api/letter/100?random-name=true"/>
</div>

#### CDN URL

```url
https://prettyavatars.com/api/letter/100
```

#### React Component

<!-- prettier-ignore -->
```jsx
import Avatar from 'prettyavatars'

<Avatar
  variant='letter'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

### letter-plain

<div align="center">
  <img src="https://prettyavatars.com/api/letter-plain/100?random-name=true"/>
</div>

<!-- prettier-ignore -->
```jsx
import { LetterAvatar } from 'prettyavatars'

<Avatar
  variant='letter'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

#### CDN

```url
https://prettyavatars.com/api/letter-plain/100
```

#### React

<!-- prettier-ignore -->
```jsx
import Avatar from 'prettyavatars'

<Avatar
  variant='letter-plain'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

### pixel-art

Credit goes to [laurentpayot/minidenticons](https://github.com/laurentpayot/minidenticons)

<div align="center">
  <img src="https://prettyavatars.com/api/pixel-art/100?random-name=true"/>
</div>

#### CDN

```url
https://prettyavatars.com/api/pixel-art/100
```

#### React

<!-- prettier-ignore -->
```jsx
import Avatar from 'prettyavatars'

<Avatar
  variant='pixel-art'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

### beam

Credit goes to [boringdesigners/boring-avatars](https://github.com/boringdesigners/boring-avatars)

<div align="center">
  <img src="https://prettyavatars.com/api/beam/100?random-name=true"/>
</div>

#### CDN

```url
https://prettyavatars.com/api/beam/100
```

#### React

<!-- prettier-ignore -->
```jsx
import Avatar from 'prettyavatars'

<Avatar
  variant='beam'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

### bauhaus

Credit goes to [boringdesigners/boring-avatars](https://github.com/boringdesigners/boring-avatars)

<div align="center">
  <img src="https://prettyavatars.com/api/bauhaus/100?random-name=true"/>
</div>

#### CDN

```url
https://prettyavatars.com/api/bauhaus/100
```

#### React

<!-- prettier-ignore -->
```jsx
import Avatar from 'prettyavatars'

<Avatar
  variant='bauhaus'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

### ring

Credit goes to [boringdesigners/boring-avatars](https://github.com/boringdesigners/boring-avatars)

<div align="center">
  <img src="https://prettyavatars.com/api/ring/100?random-name=true"/>
</div>

#### CDN

```url
https://prettyavatars.com/api/ring/100
```

#### React

<!-- prettier-ignore -->
```jsx
import Avatar from 'prettyavatars'

<Avatar
  variant='ring'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

### sunset

Credit goes to [boringdesigners/boring-avatars](https://github.com/boringdesigners/boring-avatars)

<div align="center">
  <img src="https://prettyavatars.com/api/sunset/100?random-name=true"/>
</div>

#### CDN

```url
https://prettyavatars.com/api/sunset/100
```

#### React

<!-- prettier-ignore -->
```jsx
import Avatar from 'prettyavatars'

<Avatar
  variant='sunset'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

### marble

Credit goes to [boringdesigners/boring-avatars](https://github.com/boringdesigners/boring-avatars)

<div align="center">
  <img src="https://prettyavatars.com/api/marble/100?random-name=true"/>
</div>

#### CDN

```url
https://prettyavatars.com/api/marble/100
```

#### React

<!-- prettier-ignore -->
```jsx
import Avatar from 'prettyavatars'

<Avatar
  variant='marble'
  name='John Doe'
  size={100}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

## API

The API is available at `https://prettyavatars.com/api`

With the following query parameter options:

```txt
variant: string
  The avatar variant to use
  Default: "letter"

size: number
  The size of the avatar in pixels
  Default: 100

name: string
  The name of the avatar
  Default: "John Doe"

colors: string
  Comma-separated list of html colors
  Default: "#BF616A, #D08770, #EBCB8B, #A3BE8C, #B48EAD"

random-name: boolean
  Whether to generate a random name
  Default: false

random-all: boolean
  Whether to randomize all avatar properties (except square)
  Default: false

random-color: boolean
  Whether to randomize the avatar color
  Default: false

```

Or all together:

#### CDN

```url
https://prettyavatars.com/api/{VARIENT}/{SIZE}?name={NAME}&colors={COLORS}
```

## Installation

To use this package with React you can install it with the package manager of your choice:

```bash
yarn install prettyavatars

npm install prettyavatars

pnpm install prettyavatars
```

To see the full list of available avatars, check out the [Avatars](#avatars) section.

<div align="center">

# Pretty Avatars

**prettyavatars** is collection of pretty default avatars to use in your next project ✨

<!-- ![pretty avatars preview](packages/prettyavatars/public/preview.png) -->

</div>

## Install

```sh
yarn add prettyavatars

npm install prettyavatars

pnpm add prettyavatars
```

## Usage

<!-- prettier-ignore -->
```tsx
import Avatar from 'prettyavatars'

<Avatar
  variant='marble'
  name='Maria Mitchell'
  size={40}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

Or with tree-shaking:

<!-- prettier-ignore -->
```tsx
import LetterAvatar from 'prettyavatars/letter'

<LetterAvatar
  name='Maria Mitchell'
  size={40}
  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
/>
```

### Props

| Prop        | Type                                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| **variant** | oneOf: `letter`, `letter-plain`, `pixel-art`, `marble`, `beam`, `pixel`,`sunset`, `ring`, `bauhaus`, |
| **name**    | string                                                                                               |
| size        | number or string, `40px` (default)                                                                   |
| square      | boolean: `false` (default)                                                                           |
| colors      | array of colors                                                                                      |

<sub>\* bold means required</sub>

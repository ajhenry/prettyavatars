<div align="center">

# Pretty Avatars

A collection of pretty default avatars for your next project

<!-- ![pretty avatars preview](packages/prettyavatars/public/preview.png) -->

</div>

## Install

```sh
npm install prettyavatars
```

```sh
yarn add prettyavatars
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

| Prop        | Type                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| **variant** | oneOf: `letter`, `marble`, `beam`, `pixel`,`sunset`, `ring`, `bauhaus` |
| **name**    | string                                                                 |
| size        | number or string, `40px` (default)                                     |
| square      | boolean: `false` (default)                                             |
| title       | boolean: `false` (default)                                             |
| colors      | array of colors                                                        |

<sub>\* bold means required</sub>

## CDN Service

If you wish to use pretty avatars from a CDN, you can use the [Pretty Avatars API](https://prettyavatars.com/docs). For more information and how to customize your avatars, [check out the docs](https://prettyavatars.com/docs)

To choose a random avatar from a specific user and a color palette, the format follows:

<div align="center">
<img src="https://prettyavatars.com/api/letter/120/Johnny%20Appleseed/264653,2a9d8f,e9c46a,f4a261,e76f51" alt="Johnny Appleseed" width="120" height="120" />
</div>

```url
https://prettyavatars.com/api/letter/120/Johnny%20Appleseed/264653,2a9d8f,e9c46a,f4a261,e76f51
```

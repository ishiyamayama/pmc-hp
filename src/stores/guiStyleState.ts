import { atom } from 'recoil'
import { defaultStyles, StyleProps } from 'const'

const guiStyleState = atom<StyleProps>({
  key: 'guiStyle',
  default: defaultStyles,
})

export { guiStyleState }

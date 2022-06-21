import { atom } from 'recoil'
import { defaultStyles } from 'const'

const guiStyleState = atom<any>({
  key: 'guiStyle',
  default: defaultStyles,
})

export { guiStyleState }

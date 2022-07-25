import { atom } from 'recoil'

const searchState = atom<string>({
  key: 'textvalue',
  default: '',
})

export { searchState }

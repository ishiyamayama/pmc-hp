import { atom } from 'recoil'

const categoryState = atom<string>({
  key: 'currentCategory',
  default: 'All',
})

export { categoryState }

import { Content } from 'newt-client-js'
import { CategoryContentType } from './Category'

export interface PostContentType extends Content {
  category: CategoryContentType
  title: string
  slug: string
  date: string
  body: string
  hideList: boolean
  coverImage: {
    _id: string
    src: string
    width: number
    height: number
  }
}

import { Content } from 'newt-client-js'
import { CategoryContentType } from './Category'

export interface PostContentType extends Content {
  categories: CategoryContentType
  title: string
  slug: string
  date: string
  body: string
  hideList: string
  coverImage: {
    _id: string
    src: string
  }
}

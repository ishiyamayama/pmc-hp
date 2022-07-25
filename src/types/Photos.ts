import { Content } from 'newt-client-js'

export interface PhotosContentType extends Content {
  title: string
  order: number
  image: {
    _id: string
    src: string
    height: string
    width: string
  }
}

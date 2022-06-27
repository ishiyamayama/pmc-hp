import { Content } from 'newt-client-js'

export interface PhotosContentType extends Content {
  title: string
  image: {
    _id: string
    src: string
    height: string
    width: string
  }
}

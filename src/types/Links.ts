import { Content } from 'newt-client-js'

export interface LinksContentType extends Content {
  name: string
  url: string
  type: string
}

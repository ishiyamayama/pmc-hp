import { Content } from 'newt-client-js'
import { Client } from './client'
import { Raw } from './raw'

export type List = {
  index: number
  id: string
  projectName: string
  type: 'invoice' | 'quotation'
  day: string
  client: Client
  table: Raw[]
  total: number
} & Content

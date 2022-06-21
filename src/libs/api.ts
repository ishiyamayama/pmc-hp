import { createClient } from 'newt-client-js'
import { List, Client, Raw } from '@/types'

export const getContents = async (): Promise<{
  lists: List[]
  clients: Client[]
}> => {
  const lists = await getLists()
  const clients = await getClients()
  return { lists, clients }
}

const newtClient = createClient({
  spaceUid: process.env.NEXT_PUBLIC_NEWT_SPACE_UID as string,
  token: process.env.NEXT_PUBLIC_NEWT_API_TOKEN as string,
  apiType: process.env.NEXT_PUBLIC_NEWT_API_TYPE as 'cdn' | 'api',
})

const getClients = async () => {
  const { items } = await newtClient.getContents<Client>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID as string,
    modelUid: process.env.NEXT_PUBLIC_NEWT_CLIENT_MODEL_UID as string,
    query: {
      depth: 1,
      order: ['sortOrder'],
      limit: 1000,
    },
  })
  return items
}

const getLists = async () => {
  const { items } = await newtClient.getContents<List>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID as string,
    modelUid: process.env.NEXT_PUBLIC_NEWT_LIST_MODEL_UID as string,
    query: {
      depth: 1,
      order: ['sortOrder'],
      limit: 1000,
    },
  })
  items.map((item, index) => {
    item['index'] = index + 1
    item['id'] = getID(item)
    item['total'] = returnTotal(item.table)
  })
  return items
}

const getID = (project: List) => {
  const type = project.type === 'invoice' ? '1' : '0'
  const dateObj = new Date(project.day)
  const year = dateObj.getFullYear()
  const month = zeroPadding(dateObj.getMonth() + 1, 2)
  const day = zeroPadding(dateObj.getDate(), 2)
  const index = zeroPadding(project.index, 3)
  const slug = project.client.slug
  return `${index}-${slug}-${year}${month}${day}-${type}`
}
const zeroPadding = (number: number, length: number) => {
  return (Array(length).join('0') + number).slice(-length)
}
const returnTotal = (table: Raw[]) => {
  let total = 0
  table.forEach((table) => (total += table.price))
  return total
}

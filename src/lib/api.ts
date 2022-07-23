import { createClient } from 'newt-client-js'
import { CategoryContentType, DataTableContentType, LinksContentType, OverviewContentType } from 'types'
import { PhotosContentType, PostContentType, BiographyContentType } from 'types'

const newtClient = createClient({
  spaceUid: process.env.SPACE_UID as string,
  token: process.env.API_TOKEN as string,
  apiType: process.env.API_TYPE as 'cdn' | 'api',
})

export const fetchPosts = async () => {
  const { items } = await newtClient.getContents<PostContentType>({
    appUid: process.env.APP_UID_POSTS as string,
    modelUid: 'post',
    query: { depth: 1, limit: 1000 },
  })
  items.sort((a, b) => (a.date > b.date ? -1 : 1))
  return { posts: items }
}

// export const fetchPostById = async (id: string) => {
//   const post = await newtClient.getContent<PostContentType>({
//     appUid: process.env.APP_UID_POSTS as string,
//     modelUid: 'post',
//     contentId: id,
//   })
//   return { post }
// }

export const fetchCategory = async () => {
  const { items } = await newtClient.getContents<CategoryContentType>({
    appUid: process.env.APP_UID_POSTS as string,
    modelUid: 'category',
    query: { depth: 1, limit: 1000, order: ['createdAt'] },
  })
  items.sort((a, b) => (a.order > b.order ? -1 : 1)).reverse()
  return { categories: items }
}

export const fetchLinks = async () => {
  const { items } = await newtClient.getContents<LinksContentType>({
    appUid: process.env.APP_UID_PROFILE as string,
    modelUid: 'links',
    query: { depth: 1, limit: 1000 },
  })
  return { links: items }
}

export const fetchBiography = async () => {
  const { items } = await newtClient.getContents<BiographyContentType>({
    appUid: process.env.APP_UID_PROFILE as string,
    modelUid: 'biography',
    query: {
      japanese: { fmt: 'text' },
      english: { fmt: 'text' },
    },
  })
  return { bio: items[0] }
}

export const fetchDataTable = async () => {
  const { items } = await newtClient.getContents<DataTableContentType>({
    appUid: process.env.APP_UID_PROFILE as string,
    modelUid: 'datatable',
    query: { depth: 1, limit: 1000 },
  })
  return { dataTable: items }
}

export const fetchPhotos = async () => {
  const { items } = await newtClient.getContents<PhotosContentType>({
    appUid: process.env.APP_UID_PROFILE as string,
    modelUid: 'photo',
    query: { depth: 1, order: ['sortOrder'], limit: 1000 },
  })
  items.sort((a, b) => (a.order > b.order ? -1 : 1)).reverse()
  return { photos: items }
}

export const fetchOverview = async () => {
  const overview = await newtClient.getContent<OverviewContentType>({
    appUid: process.env.APP_UID_HATIHATIPRO as string,
    modelUid: 'overiew',
    contentId: '62a921eb7fea960018b0ac3a',
  })
  return { overview }
}

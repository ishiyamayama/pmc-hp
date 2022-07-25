import axios from 'axios'
import { utcToZonedTime } from 'date-fns-tz'
import { createClient } from 'newt-client-js'
import { primaryFonts } from 'const/primaryFonts'
import dayjs from 'libs/dayjs'
import { CategoryContentType, DataTableContentType, LinksContentType, OverviewContentType } from 'types'
import { PhotosContentType, PostContentType, BiographyContentType } from 'types'

const newtClient = createClient({
  spaceUid: process.env.SPACE_UID as string,
  token: process.env.API_TOKEN as string,
  apiType: process.env.API_TYPE as 'cdn' | 'api',
})

export const fetchFonts = async () => {
  const { data } = await axios.get(
    'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC7W_8e69CzoftwFnIrHFTBb4PdSapGsJg',
  )
  const fonts: string[] = []
  data.items.forEach((font: any) => {
    font.variants?.includes('regular') && !primaryFonts.includes(font.family) && fonts.push(font.family)
  })
  return { fonts: fonts }
}

export const fetchPosts = async () => {
  const { items } = await newtClient.getContents<PostContentType>({
    appUid: process.env.APP_UID_POSTS as string,
    modelUid: 'post',
    query: { depth: 1, limit: 1000 },
  })
  items.sort((a, b) => (a.date > b.date ? -1 : 1))
  // items.map((item: PostContentType) => {
  //   const d = utcToZonedTime(item.date, 'Asia/Tokyo')
  //   item.date = dayjs.utc(d).tz('Asia/Tokyo').format('YYYY/MM/DD')
  // })
  return { posts: items }
}

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

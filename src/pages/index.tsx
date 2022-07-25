import { Header, Posts, Profile } from 'components/organisms'
import {
  fetchPosts,
  fetchBiography,
  fetchDataTable,
  fetchPhotos,
  fetchLinks,
  fetchCategory,
} from 'libs/api'
import {
  CategoryContentType,
  PostContentType,
  LinksContentType,
  BiographyContentType,
  DataTableContentType,
  PhotosContentType,
} from 'types'

type Props = {
  categories: CategoryContentType[]
  posts: PostContentType[]
  bio: BiographyContentType
  dataTable: DataTableContentType[]
  photos: PhotosContentType[]
  links: LinksContentType[]
}

const Top = ({ categories, posts, bio, dataTable, photos, links }: Props) => {
  return (
    <>
      <Profile bio={bio} dataTable={dataTable} photos={photos} links={links} />
      <Posts categories={categories} posts={posts} />
    </>
  )
}

export const getStaticProps = async () => {
  const { categories } = await fetchCategory()
  const { posts } = await fetchPosts()
  const { bio } = await fetchBiography()
  const { dataTable } = await fetchDataTable()
  const { photos } = await fetchPhotos()
  const { links } = await fetchLinks()
  return {
    props: { categories, posts, bio, dataTable, photos, links },
    revalidate: 10,
  }
}

export default Top

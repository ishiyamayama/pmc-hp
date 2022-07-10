import { Posts, Profile } from 'components/organisms'
import {
  fetchPostById,
  fetchPosts,
  fetchBiography,
  fetchDataTable,
  fetchPhotos,
  fetchLinks,
  fetchCategory,
} from 'lib/api'
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
  currentId: string
  bio: BiographyContentType
  dataTable: DataTableContentType[]
  photos: PhotosContentType[]
  links: LinksContentType[]
}

const Detail = ({ categories, posts, currentId, bio, dataTable, photos, links }: Props) => {
  return (
    <>
      <Profile bio={bio} dataTable={dataTable} photos={photos} links={links} />
      <Posts currentId={currentId} categories={categories} posts={posts} />
    </>
  )
}

export const getStaticPaths = async () => {
  const { posts } = await fetchPosts()
  const paths = posts.map((content) => `/${content.slug}`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async (context: { params: { id: string } }) => {
  const currentId = context.params.id
  const { categories } = await fetchCategory()
  const { posts } = await fetchPosts()
  const { bio } = await fetchBiography()
  const { dataTable } = await fetchDataTable()
  const { photos } = await fetchPhotos()
  const { links } = await fetchLinks()
  return {
    props: { categories, posts, currentId, bio, dataTable, photos, links },
    revalidate: 120,
  }
}

export default Detail

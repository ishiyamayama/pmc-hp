import { htmlToText } from 'html-to-text'
import NextHeadSeo from 'next-head-seo'
import { Header, Posts, Profile } from 'components/organisms'
import { config } from 'const/siteData'
import {
  fetchPosts,
  fetchBiography,
  fetchDataTable,
  fetchPhotos,
  fetchLinks,
  fetchCategory,
} from 'libs/api';
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
  const currentPost = posts.find((post) => post.slug === currentId)
  const description = htmlToText(currentPost?.body || '', {
    singleNewLineParagraphs: true,
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'iframe', format: 'skip' },
    ],
  }).slice(0, 700)

  return (
    <>
      <NextHeadSeo
        title={currentPost?.title + ' | ' + config.siteName}
        description={description}
        twitter={{ card: 'summary_large_image' }}
        og={{
          title: currentPost?.title + ' | ' + config.siteName,
          description: description,
          image: currentPost?.coverImage?.src || config.ogImage,
        }}
      />
      <Profile bio={bio} dataTable={dataTable} photos={photos} links={links} />
      <Posts currentId={currentId} categories={categories} posts={posts} />
    </>
  )
}

export const getStaticPaths = async () => {
  const { posts } = await fetchPosts()
  const paths = posts.map((content) => `/${content.category.slug}/${content.slug}`)
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
    revalidate: 20,
  }
}

export default Detail

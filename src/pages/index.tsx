import { Editor, styled, Inputs } from '@compai/css-gui'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Profile } from 'components/organisms'
import { fetchPosts, fetchBiography, fetchDataTable, fetchPhotos, fetchLinks } from 'lib/api'
import { guiStyleState } from 'stores/guiStyle'
import { LinksContentType, PostContentType, BiographyContentType, DataTableContentType, PhotosContentType } from 'types'

type Props = {
  posts: PostContentType[]
  bio: BiographyContentType
  dataTable: DataTableContentType[]
  photos: PhotosContentType[]
  links: LinksContentType[]
}

const Top = ({ posts, bio, dataTable, photos, links }: Props) => {
  return (
    <>
      <Profile bio={bio} dataTable={dataTable} photos={photos} links={links} />
    </>
  )
}

export const getStaticProps = async () => {
  const { posts } = await fetchPosts()
  const { bio } = await fetchBiography()
  const { dataTable } = await fetchDataTable()
  const { photos } = await fetchPhotos()
  const { links } = await fetchLinks()
  return {
    props: { posts, bio, dataTable, photos, links },
    revalidate: 120,
  }
}

export default Top

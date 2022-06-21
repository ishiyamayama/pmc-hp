// import NextHead from 'next/head'
import React from 'react'
import { DetailHead, DetailBody, Footer } from '@/organisms'
import { List } from '@/types'
import { getContents } from 'libs/api'

type PropsType = { list: List }

const Top = ({ list }: PropsType) => {
  return (
    <>
      {/* <NextHead>
        <title>{list.projectName}</title>
      </NextHead> */}
      <div className='flex flex-col w-full h-full'>
        <DetailHead type={list.type} projectName={list.projectName} />
        <DetailBody list={list} />
        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const { lists } = await getContents()
  const paths = lists.map((item) => ({ params: { id: item.id } }))
  return { paths, fallback: false }
}
export const getStaticProps = async (context: { params: { id: string } }) => {
  const { lists } = await getContents()
  const list = lists.find((item) => item.id === context.params.id)
  return { props: { list } }
}

export default Top

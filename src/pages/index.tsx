import { Editor, styled, Inputs } from '@compai/css-gui'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getContents } from 'libs/api'
import { guiStyleState } from 'stores/guiStyle'
import { List, Client, Raw } from 'types'

const Top = ({ lists }: { lists: List[] }) => {
  const guiStyle = useRecoilValue(guiStyleState)
  return (
    <div className='grid w-full min-h-full text-black'>
      <styled.p styles={guiStyle}>アイウエオ</styled.p>
    </div>
  )
}

export const getStaticProps = async () => {
  const { lists } = await getContents()
  return { props: { lists } }
}

export default Top

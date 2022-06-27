import { styled } from '@compai/css-gui'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { guiStyleState } from 'stores/guiStyle'
import { LinksContentType, BiographyContentType, DataTableContentType, PhotosContentType } from 'types'

type Props = {
  bio: BiographyContentType
  dataTable: DataTableContentType[]
  photos: PhotosContentType[]
  links: LinksContentType[]
}

export const Profile = ({ bio, dataTable, photos, links }: Props) => {
  const guiStyle = useRecoilValue(guiStyleState)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const listItemClass = 'w-[37%] min-w-[10rem]'
  const LinkItem = ({ link }: { link: LinksContentType }) => (
    <li className={listItemClass}>
      <a href={link.url} target='_blank' key={link._id} rel='noreferrer' className='underline text-text'>
        {link.name}
      </a>
    </li>
  )

  return (
    <div className='text-black mt-[6rem] grid-head items-start'>
      <div className='aspect-[305/228] relative mt-2'>
        {photos.map((photo, index) => (
          <img
            className={`absolute top-0 left-0 object-cover w-full h-full cursor-pointer
            ${index === currentPhoto ? 'opacity-100' : 'opacity-0'}`}
            src={photo.image.src}
            alt={photo.title}
            key={photo.image._id}
            width={photo.image.width}
            height={photo.image.height}
            onClick={() => setCurrentPhoto((currentPhoto + 1) % photos.length)}
          />
        ))}
      </div>
      <div>
        <styled.p styles={guiStyle}>{bio.japanese}</styled.p>
        <styled.div styles={guiStyle}>--</styled.div>
        <styled.p styles={guiStyle}>{bio.english}</styled.p>
      </div>
      <div className='grid gap-y-[3.2rem]'>
        <ul className='mt-2 border-t border-opacity-50 border-text'>
          {dataTable.map((data) => (
            <li key={data._id} className='flex items-center p-[11px_0_10px] border-b border-text border-opacity-50'>
              <p className={listItemClass}>
                <styled.span styles={guiStyle}>{data.title}</styled.span>
              </p>
              <p className={listItemClass}>
                <styled.span styles={guiStyle}>{data.body}</styled.span>
              </p>
            </li>
          ))}
        </ul>
        <ul className='flex flex-wrap gap-y-[.9rem]'>
          {links.map((link) => link.type === 'music' && <LinkItem link={link} />)}
        </ul>
        <ul className='flex flex-wrap gap-y-[.9rem]'>
          {links.map((link) => link.type === 'sns' && <LinkItem link={link} />)}
        </ul>
        <ul className='flex flex-wrap gap-y-[.9rem]'>
          {links.map((link) => link.type === 'other' && <LinkItem link={link} />)}
        </ul>
      </div>
    </div>
  )
}

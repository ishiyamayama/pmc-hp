import { Fragment, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Divider, Link } from 'components/atoms'
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
  const listItemClass = 'min-w-[37%] pr-2'
  const LinkItem = ({ link }: { link: LinksContentType }) => (
    <li className={`${listItemClass} md:min-w-[44%]`}>
      <Link href={link.url} target='_blank' className='underline text-text'>
        {link.name}
      </Link>
    </li>
  )

  return (
    <div className='mt-[6rem] md:mt-11 mdMin:grid-head items-start'>
      <div className='aspect-[305/228] relative mt-2 md:w-[60%] md:max-w-[320px]'>
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
      <div className='md:mt-12'>
        <p>{bio.japanese}</p>
        <div>--</div>
        <p>{bio.english}</p>
      </div>
      <div className='md:mt-[1.4rem] grid gap-y-[3.2rem] md:gap-y-8'>
        <ul className='relative mt-2'>
          <Divider />
          {dataTable.map((data) => (
            <Fragment key={data._id}>
              <li className='relative flex flex-wrap items-center p-[11px_0_10px] md:p-[9px_0_11px]'>
                <p className={listItemClass}>
                  <span>{data.title}</span>
                </p>
                <Link href={data.link} target='_blank' className={`${listItemClass} ${data.link ? 'underline':''}`}>
                  <span>{data.body}</span>
                </Link>
              </li>
              <Divider />
            </Fragment>
          ))}
        </ul>
        <ul className='flex flex-wrap gap-y-[.9rem] md:justify-between'>
          {links.map((link) => link.type === 'music' && <LinkItem link={link} key={link._id} />)}
        </ul>
        <ul className='flex flex-wrap gap-y-[.9rem] md:justify-between'>
          {links.map((link) => link.type === 'sns' && <LinkItem link={link} key={link._id} />)}
        </ul>
        <ul className='flex flex-wrap gap-y-[.9rem] md:justify-between'>
          {links.map((link) => link.type === 'other' && <LinkItem link={link} key={link._id} />)}
        </ul>
      </div>
    </div>
  )
}

import { DateTime } from 'luxon'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import { categoryColors } from 'const/categoryColors'
import style from 'styles/modules/article.module.sass'
import { PostContentType } from 'types'

type PropsType = {
  post: PostContentType
  currentId?: string
}

export const PostRow = ({ post, currentId }: PropsType) => {
  const { category, title, date, body, hideList, coverImage } = post
  const dateString = DateTime.fromISO(date).setZone('Asia/Tokyo').toLocaleString()
  const isCurrent = currentId === post.slug
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (isCurrent && ref.current) {
      ref.current.offsetTop + ref.current.offsetHeight < window.scrollY || window.scrollY === 0
        ? window.scrollTo(0, ref.current.offsetTop - 10)
        : null
    }
  }, [isCurrent, post.slug])

  const href = isCurrent && !hideList ? '/' : `/${post.category.slug}/${post.slug}`

  return (
    <article className={style.article} id={`${post.slug}`}>
      {href === '/' ? (
        <NextLink href='/' scroll={false}>
          <a className='p-[.9rem_0] md:p-[1rem_0] grid-post' ref={ref}>
            <time>{dateString}</time>
            <h2>1st{title}</h2>
            <span className='md:hidden'>{category.name}</span>
            <span className='md:hidden min-w-[1em] flex mt-[.2em]'>
              {coverImage && (
                <img
                  className='w-full max-w-[1.25em] block object-cover aspect-[1/1]'
                  src={coverImage.src}
                  width='100'
                  height='100'
                  alt=''
                />
              )}
            </span>
            <span className='min-w-[1em] md:min-w-[1.5rem] flex mt-[.2em]'>
              <span
                className={`ml-auto w-full max-w-[1.25em] block object-cover aspect-[1/1] bg-${
                  categoryColors[category.name]
                }`}
              />
            </span>
          </a>
        </NextLink>
      ) : (
        <NextLink href={`/${post.category.slug}/${post.slug}`} scroll={false}>
          <a className='p-[.9rem_0] md:p-[1rem_0] grid-post' ref={ref}>
            <time>{dateString}</time>
            <h2>1st{title}</h2>
            <span className='md:hidden'>{category.name}</span>
            <span className='md:hidden min-w-[1em] flex mt-[.2em]'>
              {coverImage && (
                <img
                  className='w-full max-w-[1.25em] block object-cover aspect-[1/1]'
                  src={coverImage.src}
                  width='100'
                  height='100'
                  alt=''
                />
              )}
            </span>
            <span className='min-w-[1em] md:min-w-[1.5rem] flex mt-[.2em]'>
              <span
                className={`ml-auto w-full max-w-[1.25em] block object-cover aspect-[1/1] bg-${
                  categoryColors[category.name]
                }`}
              />
            </span>
          </a>
        </NextLink>
      )}

      {isCurrent && (
        <div className='mt-[1rem] mdMin:grid-body pb-[5rem]'>
          <div className='md:hidden' />
          <div className='body' dangerouslySetInnerHTML={{ __html: body }} />
          {coverImage && (
            <img
              className='block md:mt-20'
              src={coverImage.src}
              width={coverImage.width}
              height={coverImage.height}
              alt=''
            />
          )}
        </div>
      )}
    </article>
  )
}

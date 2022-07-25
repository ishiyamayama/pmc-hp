import { useEffect, useRef } from 'react'
import { Link } from 'components/atoms'
import { categoryColors } from 'const/categoryColors'
import style from 'styles/modules/article.module.sass'
import { PostContentType } from 'types'

type PropsType = {
  post: PostContentType
  currentId?: string
}

export const PostRow = ({ post, currentId }: PropsType) => {
  const { category, title, date, body, hideList, coverImage } = post
  const dateString = new Date(date).toLocaleDateString("ja-JP",{
    timeZone: "Asia/Tokyo",
  })
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
    <article id={`${post.slug}`}>
      <Link href={href} className='mdMin:hover:opacity-60 focus-visible:text-[blue] !outline-offset-0'>
        <span className={`p-[.9rem_0] md:p-[1rem_0] grid-post`} ref={ref}>
          <time>{dateString}</time>
          {isCurrent ? <h1>{title}</h1> : <p>{title}</p>}
          <span className='md:hidden'>{category.name}</span>
          <span className='md:hidden min-w-[1em] flex mt-[.2em]'>
            {coverImage && (
              <img className='w-full max-w-[1.25em] block object-cover aspect-[1/1]' src={coverImage.src} alt='' />
            )}
          </span>
          <span className='min-w-[1em] md:min-w-[1.5rem] flex mt-[.2em]'>
            <span
              className={`ml-auto w-full max-w-[1.25em] block object-cover aspect-[1/1] bg-${
                categoryColors[category.name]
              }`}
            />
          </span>
        </span>
      </Link>
      {isCurrent && (
        <div className='mt-[1rem] mdMin:grid-body pb-[5rem]'>
          <div className='md:hidden' />
          <div className={style.article} dangerouslySetInnerHTML={{ __html: body }} />
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

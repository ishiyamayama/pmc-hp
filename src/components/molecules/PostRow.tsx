import NextLink from 'next/link'
import { categoryColors } from 'const/categoryColors'
import style from 'styles/modules/article.module.sass'
import { PostContentType } from 'types'

type PropsType = {
  post: PostContentType
  currentPost?: boolean
}

export const PostRow = ({ post, currentPost }: PropsType) => {
  const { category, title, date, body, hideList, coverImage } = post
  const dateString = new Date(date).toLocaleDateString()
  return (
    <article className={style.article}>
      <NextLink href={currentPost && !hideList ? '/' : `/${post.slug}`} passHref scroll={false}>
        <a className='p-[.9rem_0] grid-post'>
          <time>{dateString}</time>
          <h2>{title}</h2>
          <span>{category.name}</span>
          <span className='min-w-[1em] flex'>
            <img className='w-full max-w-[1.25em] block object-cover aspect-[1/1]' src={coverImage.src} alt='' />
          </span>
          <span className='min-w-[1em] flex'>
            <span
              className={`ml-auto w-full max-w-[1.25em] block object-cover aspect-[1/1] bg-${categoryColors[category.name]}`}
            />
          </span>
        </a>
      </NextLink>
      {currentPost && (
        <div className='mt-[1rem] grid-body pb-[5rem]'>
          <div />
          <div className='body' dangerouslySetInnerHTML={{ __html: body }} />
          <img className='block' src={coverImage.src} alt='' />
        </div>
      )}
    </article>
  )
}

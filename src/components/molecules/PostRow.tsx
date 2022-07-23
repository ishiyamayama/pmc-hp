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
  const dateString = new Date(date).toLocaleDateString()
  const isCurrent = currentId === post.slug
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (isCurrent && ref.current) {
      ref.current.offsetTop + ref.current.offsetHeight < window.scrollY || window.scrollY === 0
        ? window.scrollTo(0, ref.current.offsetTop - 10)
        : null
    }
  }, [isCurrent, post.slug])

  return (
    <article className={style.article} id={`${post.slug}`}>

    </article>
  )
}

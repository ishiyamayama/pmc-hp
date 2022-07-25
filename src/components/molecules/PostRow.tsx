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

    </article>
  )
}

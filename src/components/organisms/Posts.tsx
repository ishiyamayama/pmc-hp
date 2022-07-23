import { useRouter } from 'next/router'
import { useEffect, useState, useRef, Fragment } from 'react'
import { useRecoilState } from 'recoil'
import { CategoryButton, Divider } from 'components/atoms'
import { PostRow } from 'components/molecules'
import { categoryState } from 'stores/categoryState'
import { CategoryContentType, PostContentType } from 'types'

type PostsProps = {
  currentId?: string
  categories: CategoryContentType[]
  posts: PostContentType[]
}

export const Posts = ({ currentId, categories, posts }: PostsProps) => {
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState)
  const [viewPosts, setViewPosts] = useState<PostContentType[]>(posts)
  const [exit, setExit] = useState(false)

  useEffect(() => {
    if (currentCategory !== '') {
      const newPosts = posts.filter((post) => post.category.name === currentCategory)
      setViewPosts(newPosts)
    } else {
      setViewPosts(posts)
    }
  }, [currentCategory, posts])

  const currentPost = posts.find((post) => post.slug === currentId)
  const singleView = currentPost?.hideList

  const handleClickCategory = (category: string) => {
    if (currentCategory === category) {
      setCurrentCategory('')
    } else {
      setCurrentCategory(category)
    }
  }

  const useCategoryArray = posts.map((post) => {
    return !post.hideList && post.category.name
  })

  // useEffect(() => {
  //   console.log(window.scrollY, 'inn')
  //   alert(window.scrollY)
  //   return () => {
  //     alert(window.scrollY)
  //   }
  // }, [router])

  return (
    <section className='mt-24'>
      <div className='flex gap-x-[1rem] font-inter text-[.833em]'>
        <CategoryButton
          categoryName='All'
          onClick={() => handleClickCategory('')}
          current={currentCategory === ''}
          order={0}
          disabled={singleView}
        />
        {categories.map((category) => {
          return useCategoryArray.includes(category.name) ? (
            <CategoryButton
              key={category._id}
              categoryName={category.name}
              onClick={() => handleClickCategory(category.name)}
              current={currentCategory === category.name}
              order={category.order}
              disabled={singleView}
            />
          ) : null
        })}
      </div>
      <div className='mt-8'>
        <Divider />
        {viewPosts.map((post) => {
          if (singleView && post.slug !== currentId) return null
          if (!singleView && post.hideList) return null
          return (
            <Fragment key={post._id}>
              <PostRow post={post} currentId={currentId} />
              <Divider />
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import * as Scroll from 'react-scroll'
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
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState)
  const [viewPosts, setViewPosts] = useState<PostContentType[]>(posts)

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
      setCurrentCategory('All')
    } else {
      setCurrentCategory(category)
    }
  }
  // useEffect(() => {
  //   if (currentPost) {
  //     Scroll.scroller.scrollTo(currentPost._id, {
  //       duration: 0,
  //       delay: 0,
  //       offset: -62,
  //     })
  //   }
  // }, [currentPost])

  return (
    <section className='mt-24'>
      <div className='flex gap-x-[1rem] font-inter text-[.833em]'>
        <CategoryButton
          categoryName='All'
          onClick={() => handleClickCategory('')}
          currentCategory={currentCategory}
          order={0}
          disabled={singleView}
        />
        {categories.map((category) => (
          <CategoryButton
            key={category._id}
            categoryName={category.name}
            onClick={() => handleClickCategory(category.name)}
            currentCategory={currentCategory}
            order={category.order}
            disabled={singleView}
          />
        ))}
      </div>
      <div className='mt-8'>
        <Divider />
        {viewPosts.map((post) => {
          if (singleView && post.slug !== currentId) return null
          if (!singleView && post.hideList) return null
          return (
            <Scroll.Element name={post._id} key={post._id}>
              <PostRow post={post} currentPost={post === currentPost} />
              <Divider />
            </Scroll.Element>
          )
        })}
      </div>
    </section>
  )
}

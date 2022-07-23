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
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState)
  const [viewPosts, setViewPosts] = useState<PostContentType[]>(posts)
  const [searchValue, setSearchValue] = useState('')
  const inputsRef = useRef<HTMLInputElement>(null)
  const ref = useRef<HTMLDivElement>(null)

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
      <div className='flex justify-between font-inter text-[.833em]'>
        <div className='flex gap-x-[1rem]'>
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
        <div>
          <input
            className='w-full px-2 border border-gray-300 border-solid rounded-lg bg-background'
            type='text'
            placeholder='Search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={inputsRef}
          />
        </div>
      </div>
      <div className='mt-8'>
        <Divider />
        {viewPosts.map((post) => {
          if (singleView && post.slug !== currentId) return null
          if (!singleView && post.hideList) return null
          if (searchValue !== '' && !post.title.toLowerCase().includes(searchValue.toLowerCase())) return null
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

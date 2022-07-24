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
  const [viewPosts, setViewPosts] = useState<PostContentType[]>(
    currentCategory ? posts.filter((post) => post.category.name === currentCategory) : posts,
  )
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const currentPost = posts.find((post) => post.slug === currentId)
  const singleView = currentPost?.hideList

  useEffect(() => {
    if (currentCategory !== '') {
      const newPosts = posts.filter((post) => post.category.name === currentCategory)
      setViewPosts(newPosts)
    }
    currentCategory === '' && setViewPosts(posts)
  }, [currentCategory, posts])

  const handleClickCategory = (category: string) =>
    currentCategory === category ? setCurrentCategory('') : setCurrentCategory(category)
  const useCategoryArray = posts.map((post) => !post.hideList && post.category.name)

  return (
    <section className='min-h-screen mt-24'>
      <div className='flex flex-wrap justify-between items-center font-inter text-[.833em] gap-x-[1rem]'>
        <div className='flex gap-x-[1rem] md:mb-4 items-center'>
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
        <div className='max-w-[50%] w-[16rem] md:mb-4'>
          <input
            className='w-full border border-current border-solid rounded-lg bg-background p-[3px_6px_3px_6px] leading-[1.2] placeholder:text-current placeholder:opacity-40 focus-visible:placeholder:text-blue'
            type='text'
            placeholder='Search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={inputRef}
          />
        </div>
      </div>
      <div className='mt-8 md:mt-0'>
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

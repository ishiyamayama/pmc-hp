import { Fragment } from 'react'
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
  const [currentcategory, setCurrentcategory] = useRecoilState(categoryState)
  const handleClickCategory = (category: string) => {
    if (currentcategory === category) {
      setCurrentcategory('All')
    } else {
      setCurrentcategory(category)
    }
  }

  const currentPost = posts.find((post) => post.slug === currentId)
  const singleView = currentPost?.hideList

  return (
    <section className='mt-24'>
      <div className='flex gap-x-[1rem] font-inter text-[.833em]'>
        <CategoryButton
          categoryName='All'
          onClick={() => handleClickCategory('All')}
          currentcategory={currentcategory}
          order={0}
          disabled={singleView}
        />
        {categories.map((category) => (
          <CategoryButton
            key={category._id}
            categoryName={category.name}
            onClick={() => handleClickCategory(category.name)}
            currentcategory={currentcategory}
            order={category.order}
            disabled={singleView}
          />
        ))}
      </div>
      <div className='mt-8'>
        <Divider />
        {posts.map((post) => {
          if (singleView && post.slug !== currentId) return null
          if (!singleView && post.hideList) return null
          return (
            <Fragment key={post._id}>
              <PostRow post={post} currentPost={post === currentPost} />
              <Divider />
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}

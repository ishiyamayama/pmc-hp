import { useRecoilValue } from 'recoil'
import { categoryColors } from 'const/categoryColors'
import { categoryState } from 'stores/categoryState'

export const ColorScheme = () => {
  const currentcategory = useRecoilValue(categoryState)
  return (
    <div className='fixed z-10 top-0 right-0 grid h-[2rem] w-[10rem] grid-cols-[1fr_1fr_1fr_1fr_1fr]'>
      <span className='bg-gray' />
      <span className='bg-yellow' />
      <span className='bg-brown' />
      <span className='bg-blue' />
      <span className='bg-orange' />
      {/* <span className='bg-green' /> */}
      <span className={`absolute top-0 left-0 z-10 w-full h-full bg-${categoryColors[currentcategory]}`} />
    </div>
  )
}

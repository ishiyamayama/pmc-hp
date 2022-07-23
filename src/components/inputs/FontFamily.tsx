import { useEffect, useState, useId } from 'react'

export const FontFamily = () => {
  const [fontFamily, setFontFamily] = useState('sans-serif')
  const id = useId()
  const handleChange = (e: any) => {
    setFontFamily(e.target.value)
  }
  useEffect(() => {
    const timeId = setTimeout(() => {
      console.log('change')
      // document.documentElement.style.setProperty('--font-family', fontFamily)
    }, 500)

    return () => {
      clearTimeout(timeId)
    }
  }, [fontFamily])
  return (
    <div className='relative'>
      <label htmlFor={id} className='block text-text font-inter'>
        Font Family
      </label>
      <input type='text' id={id} value={fontFamily} onChange={handleChange} />
    </div>
  )
}

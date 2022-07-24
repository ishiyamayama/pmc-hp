import { useEffect, useState, useId, useRef } from 'react'
const unitList = ['px', 'rem', 'em', 'vh', 'vw', 'vmin', 'vmax', '%']
import style from './Input.module.sass'

export const FontSize = () => {
  const [currentSize, setCurrentSize] = useState('12px')
  const [currentUnit, setCurrentUnit] = useState('px')
  const [inputValue, setInputValue] = useState(12)
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const ulRef = useRef<HTMLUListElement>(null)

  const handleChange = (e: any) => {
    setInputValue(e.target.value)
    setCurrentSize(`${e.target.value}${currentUnit}`)
  }

  const handleClickUnit = (unit: string) => {
    setIsOpen(false)
    setCurrentUnit(unit)
    setCurrentSize(`${inputValue}${unit}`)
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--textsize-variant', currentSize)
  }, [currentSize])

  useEffect(() => {
    if (ulRef.current) {
      document.addEventListener('click', (e: Event) => {
        if (ulRef.current && !ulRef.current.contains(e.target as Node)) {
          isOpen && setIsOpen(false)
        }
      })
    }
  }, [ulRef])

  return (
    <div className={style.container}>
      <label htmlFor={id} className={style.label}>
        Font Size
      </label>
      <div className={style.inner}>
        <input className={style.input} type='number' min={1} id={id} value={inputValue} onChange={handleChange} />
        <button
          className={style.unit}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        >
          {currentUnit}
        </button>
        <ul className={`${style.unitModal} ${isOpen ? 'block' : 'hidden'}`} ref={ulRef}>
          {unitList.map((unit) => (
            <li key={unit}>
              <button className={style.unitButton} onClick={() => handleClickUnit(unit)}>
                {unit}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

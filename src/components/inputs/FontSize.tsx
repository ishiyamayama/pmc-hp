import { useEffect, useState, useId, useRef } from 'react'
const unitList = ['px', 'rem', 'em', 'vh', 'vw', 'vmin', 'vmax', '%']
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { guiStyleState } from 'stores/guiStyleState'

export const FontSize = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const ulRef = useRef<HTMLUListElement>(null)

  const handleChange = (e: any) => {
    setGuiStyle((prevState) => ({
      ...prevState,
      fontSize: {
        value: Number(e.target.value),
        unit: prevState.fontSize.unit,
      },
    }))
  }

  const handleClickUnit = (unit: string) => {
    setIsOpen(false)
    setGuiStyle((prevState) => ({
      ...prevState,
      fontSize: {
        value: prevState.fontSize.value,
        unit: unit,
      },
    }))
  }

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
        <input className={style.input} type='number' min={1} id={id} value={guiStyle.fontSize.value} onChange={handleChange} />
        <button
          className={style.unit}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        >
          {guiStyle.fontSize.unit}
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

import { useEffect, useState, useId, useRef } from 'react'
const unitList = ['px', 'rem', 'em', 'vh', 'vw', '%']
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { guiStyleState } from 'stores/guiStyleState'

export const FontSize = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const [isOpen, setIsOpen] = useState(false)
  const [unitIndex, setUnitIndex] = useState(0)
  const id = useId()
  const ulRef = useRef<HTMLUListElement>(null)

  const handleChangeInput = (e: any) => {
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
    setUnitIndex(unitList.indexOf(unit))
    setGuiStyle((prevState) => ({
      ...prevState,
      fontSize: {
        value: prevState.fontSize.value,
        unit: unit,
      },
    }))
  }

  useEffect(() => {
    ulRef.current && document.addEventListener('click', () => setIsOpen(false))
  }, [ulRef])

  return (
    <div className={style.container}>
      <label htmlFor={id} className={style.label}>
        Font Size
      </label>
      <div className={style.inner}>
        <input
          className={style.input}
          type='number'
          min={1}
          id={id}
          value={guiStyle.fontSize.value}
          onChange={handleChangeInput}
        />
        <button
          className={style.unit}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        >
          {guiStyle.fontSize.unit}
        </button>
        <div
          className={`${style.unitModal} ${isOpen ? 'block' : 'hidden'}`}
          style={{
            transform: `translateY(-${unitIndex * 100}%)`,
          }}
        >
          <ul className={style.unitModalInner} ref={ulRef}>
            {unitList.map((unit) => (
              <li key={unit}>
                <button
                  className={`${style.unitButton}
                ${unit === guiStyle.fontSize.unit ? style.unitButtonActive : ''}`}
                  onClick={() => handleClickUnit(unit)}
                >
                  {unit}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

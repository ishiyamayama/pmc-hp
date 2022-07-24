import { useEffect, useState, useId, useRef } from 'react'
const unitList = ['px', 'rem', 'em', 'vh', 'vw', 'vmin', 'vmax', '%']
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { guiStyleState } from 'stores/guiStyleState'

export const LetterSpacing = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const [isOpen, setIsOpen] = useState(false)
  const [unitIndex, setUnitIndex] = useState(unitList.indexOf(guiStyle.letterSpacing.unit))
  const [offsetTop, setOffsetTop] = useState<number | null>(null)
  const id = useId()
  const ulRef = useRef<HTMLUListElement>(null)

  const handleChangeInput = (e: any) => {
    setGuiStyle((prevState) => ({
      ...prevState,
      letterSpacing: {
        value: Number(e.target.value),
        unit: prevState.letterSpacing.unit,
      },
    }))
  }

  const handleClickUnit = (unit: string) => {
    setIsOpen(false)
    setUnitIndex(unitList.indexOf(unit))
    setGuiStyle((prevState) => ({
      ...prevState,
      letterSpacing: {
        value: prevState.letterSpacing.value,
        unit: unit,
      },
    }))
  }

  useEffect(() => {
    ulRef.current && !isOpen && setOffsetTop(null)
    ulRef.current && isOpen && setOffsetTop(ulRef.current.getBoundingClientRect().top)
  }, [unitIndex, isOpen])

  useEffect(() => {
    ulRef.current && document.addEventListener('click', () => setIsOpen(false))
  }, [ulRef])

  return (
    <div className={style.container}>
      <label htmlFor={id} className={style.label}>
        Letter Spacing
      </label>
      <div className={style.inner}>
        <input
          className={style.input}
          type='number'
          step="0.1"
          id={id}
          value={guiStyle.letterSpacing.value}
          onChange={handleChangeInput}
        />
        <button
          className={style.unit}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        >
          {guiStyle.letterSpacing.unit}
        </button>
        <div
          className={`${style.unitModal} ${isOpen ? 'delay-75' : 'opacity-0 pointer-events-none'}`}
          style={{ transform: `translateY(-${unitIndex * 100}%)` }}
        >
          <ul
            className={style.unitModalInner}
            ref={ulRef}
            style={{ transform: offsetTop ? `translateY(${offsetTop < 0 ? -offsetTop + 15 : 0}px)` : 'none' }}
          >
            {unitList.map((unit) => (
              <li key={unit}>
                <button
                  className={`${style.unitButton}
                ${unit === guiStyle.letterSpacing.unit ? style.unitButtonActive : ''}`}
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

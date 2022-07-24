import { useEffect, useState, useId, useRef } from 'react'
const unitList = ['px', 'rem', 'em', 'vh', 'vw', 'vmin', 'vmax', '%']
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { guiStyleState } from 'stores/guiStyleState'

export const LineHeight = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const [isOpen, setIsOpen] = useState(false)
  const [unitIndex, setUnitIndex] = useState(unitList.indexOf(guiStyle.lineHeight.unit))
  const [offsetTop, setOffsetTop] = useState<number | null>(null)
  const id = useId()
  const ulRef = useRef<HTMLUListElement>(null)

  const handleChangeInput = (e: any) => {
    setGuiStyle((prevState) => ({
      ...prevState,
      lineHeight: {
        value: Number(e.target.value),
        unit: prevState.lineHeight.unit,
      },
    }))
  }

  const handleClickUnit = (unit: string) => {
    setIsOpen(false)
    setUnitIndex(unitList.indexOf(unit))
    setGuiStyle((prevState) => ({
      ...prevState,
      lineHeight: {
        value: prevState.lineHeight.value,
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
        Line Height
      </label>
      <div className={style.inner}>
        <input
          className={style.input}
          type='number'
          min={0}
          step={10}
          id={id}
          value={guiStyle.lineHeight.value === 0 ? '' : guiStyle.lineHeight.value}
          onChange={handleChangeInput}
        />
        <button
          className={style.unit}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        >
          {guiStyle.lineHeight.unit}
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
                  ${unit === guiStyle.lineHeight.unit ? style.unitButtonActive : ''}`}
                  onClick={() => handleClickUnit(unit)}
                  tabIndex={-1}
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

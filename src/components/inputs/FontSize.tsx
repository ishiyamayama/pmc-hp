import { useEffect, useState, useId, useRef, ChangeEvent } from 'react'
const unitList = ['px', 'rem', 'em', 'vh', 'vw', 'vmin', 'vmax', '%']
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { guiStyleState } from 'stores/guiStyleState'

export const FontSize = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const [isOpen, setIsOpen] = useState(false)
  const [unitIndex, setUnitIndex] = useState(unitList.indexOf(guiStyle.fontSize.unit))
  const [offsetTop, setOffsetTop] = useState<number | null>(null)
  const id = useId()
  const ulRef = useRef<HTMLUListElement>(null)

  const handleChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
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
    ulRef.current && !isOpen && setOffsetTop(null)
    ulRef.current && isOpen && setOffsetTop(ulRef.current.getBoundingClientRect().top)
  }, [unitIndex, isOpen])

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
          max={300}
          id={id}
          value={guiStyle.fontSize.value === 0 ? '' : guiStyle.fontSize.value}
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
                    ${unit === guiStyle.fontSize.unit ? style.unitButtonActive : ''}`}
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
    </div>
  )
}

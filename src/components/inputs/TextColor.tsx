import { useEffect, useState, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { guiStyleState } from 'stores/guiStyleState'

const swatchList = ['#000000', '#FFFFFF', '#C2C9CC', '#F5D849', '#B28F6B', '#3D87CC', '#FF5C38', '#36B943']

export const TextColor = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.addEventListener('click', (e: Event) => {
      if (buttonRef.current?.contains(e.target as Node)) {
        setIsOpen(!isOpen)
      } else if (modalRef.current?.contains(e.target as Node)) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    })
  }, [])

  const handleClickPalette = (color: string) => {
    setGuiStyle((prevState) => ({ ...prevState, color: color }))
  }

  return (
    <div className={style.container}>
      <span className={style.label} style={{ marginLeft: '-1px' }}>
        Text Color
      </span>
      <div className={style.inner}>
        <button
          className={style.colorButton}
          style={{
            backgroundColor: guiStyle.color,
          }}
          ref={buttonRef}
        />
        {isOpen && (
          <div className={style.colorModal} ref={modalRef}>
            <HexColorPicker
              color={guiStyle.color}
              onChange={(color) => {
                setGuiStyle((prevState) => ({
                  ...prevState,
                  color: color.toUpperCase(),
                }))
              }}
            />
            <input
              className='w-full py-2'
              type='text'
              value={guiStyle.color}
              maxLength={7}
              pattern='[A-Fa-f0-9]{6}'
              onChange={(e) => {
                if (e.target.value[0] !== '#') {
                  e.target.value = '#' + e.target.value
                }
                setGuiStyle((prevState) => ({
                  ...prevState,
                  color: e.target.value.toUpperCase(),
                }))
              }}
            />
            <div className='flex mt-[3px] gap-x-[3px]'>
              {swatchList.map((color) => (
                <button
                  key={color}
                  className={style.colorSwatch}
                  onClick={() => handleClickPalette(color)}
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

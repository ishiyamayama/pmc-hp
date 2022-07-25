import { useEffect, useState, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { guiStyleState } from 'stores/guiStyleState'

const swatchList = ['#000000', '#FFFFFF', '#C2C9CC', '#F5D849', '#B28F6B', '#3D87CC', '#FF5C38', '#36B943']

export const BackgroundColor = () => {
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
    setGuiStyle((prevState) => ({
      ...prevState,
      backgroundColor: color,
    }))
  }

  return (
    <div className={style.container}>
      <span className={style.label}>Background Color</span>
      <div className={style.inner}>
        <button
          className={style.colorButton}
          style={{
            backgroundColor: guiStyle.backgroundColor,
          }}
          ref={buttonRef}
        />
        {isOpen && (
          <div className={`${style.colorModal} md:!left-[8px] md:!translate-x-0`} ref={modalRef}>
            <HexColorPicker
              color={guiStyle.backgroundColor}
              onChange={(color) => {
                setGuiStyle((prevState) => ({
                  ...prevState,
                  backgroundColor: color.toUpperCase(),
                }))
              }}
            />
            <input
              className='py-2'
              type='text'
              value={guiStyle.backgroundColor}
              maxLength={7}
              pattern='[A-Fa-f0-9]{6}'
              onChange={(e) => {
                if (e.target.value[0] !== '#') {
                  e.target.value = '#' + e.target.value
                }
                setGuiStyle((prevState) => ({
                  ...prevState,
                  backgroundColor: e.target.value.toUpperCase(),
                }))
              }}
            />
            <div className='flex gap-x-[3px]'>
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

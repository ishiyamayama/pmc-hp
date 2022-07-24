import { useEffect, useState, useId, useRef } from 'react'
import { RgbaColorPicker, HexColorPicker, HexColorInput } from 'react-colorful'
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { guiStyleState } from 'stores/guiStyleState'

export const BackgroundColor = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const [isOpen, setIsOpen] = useState(false)
  // const [color, setColor] = useState(guiStyle.backgroundColor)
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

  const handleClickPalette = (color: { r: number; g: number; b: number; a: number }) => {
    setGuiStyle((prevState) => ({
      ...prevState,
      backgroundColor: color,
    }))
  }

  useEffect(() => {
    console.log(guiStyle.backgroundColor)
  }, [guiStyle.backgroundColor])

  return (
    <div className={style.container}>
      <span className={style.label}>Background Color</span>
      <div className={style.inner}>
        <button
          className={style.colorButton}
          style={{
            backgroundColor: `rgba(${guiStyle.backgroundColor.r},${guiStyle.backgroundColor.g},${guiStyle.backgroundColor.b},${guiStyle.backgroundColor.a})`,
          }}
          ref={buttonRef}
        />
        {isOpen && (
          <div className={`${style.colorModal} md:!left-[-1px] md:!translate-x-0`} ref={modalRef}>
            <RgbaColorPicker
              color={guiStyle.backgroundColor}
              onChange={(color) => {
                setGuiStyle((prevState) => ({
                  ...prevState,
                  backgroundColor: color,
                }))
              }}
            />
            <div className='flex mt-3 gap-x-3'>
              <button
                className={`${style.colorButton} bg-gray !border-none`}
                onClick={() => handleClickPalette({ r: 194, g: 201, b: 204, a: 1 })}
              />
              <button
                className={`${style.colorButton} bg-yellow !border-none`}
                onClick={() => handleClickPalette({ r: 245, g: 216, b: 73, a: 1 })}
              />
              <button
                className={`${style.colorButton} bg-brown !border-none`}
                onClick={() => handleClickPalette({ r: 178, g: 143, b: 107, a: 1 })}
              />
              <button
                className={`${style.colorButton} bg-blue !border-none`}
                onClick={() => handleClickPalette({ r: 61, g: 135, b: 204, a: 1 })}
              />
              <button
                className={`${style.colorButton} bg-orange !border-none`}
                onClick={() => handleClickPalette({ r: 255, g: 92, b: 56, a: 1 })}
              />
              <button
                className={`${style.colorButton} bg-green !border-none`}
                onClick={() => handleClickPalette({ r: 54, g: 185, b: 67, a: 1 })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

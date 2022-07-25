import { useEffect, useState, useId, useRef } from 'react'
import { useRecoilState } from 'recoil'
import style from './Input.module.sass'
import { Divider } from 'components/atoms'
import { primaryFonts } from 'const/primaryFonts'
import { guiStyleState } from 'stores/guiStyleState'

export const FontFamily = ({ fonts }: { fonts: string[] }) => {
  const defaultFont = 'Noto Serif JP'
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const [inputValue, setInputValue] = useState(defaultFont)
  const [viewFonts, setViewFonts] = useState(fonts)
  const [viewPrimaryFonts, setViewPrimaryFonts] = useState(primaryFonts)
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const ulRef = useRef<HTMLUListElement>(null)

  const handleChange = (e: any) => setInputValue(e.target.value)
  const handleClickButton = (fontName: string) => {
    setGuiStyle({ ...guiStyle, fontFamily: fontName })
  }
  useEffect(() => {
    setInputValue(guiStyle.fontFamily)
  }, [guiStyle.fontFamily])

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (inputValue !== guiStyle.fontFamily && inputValue !== '') {
        setViewFonts(fonts.filter((font) => font.toLowerCase().includes(inputValue.toLowerCase())))
        setViewPrimaryFonts(primaryFonts.filter((font) => font.toLowerCase().includes(inputValue.toLowerCase())))
      } else {
        setViewFonts(fonts)
        setViewPrimaryFonts(primaryFonts)
      }
    }, 300)
    return () => clearTimeout(timeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  useEffect(() => {
    if (inputRef.current && ulRef.current) {
      document.addEventListener('click', (e: Event) => {
        if (inputRef.current && ulRef.current) {
          if (!inputRef.current.contains(e.target as Node) && !ulRef.current.contains(e.target as Node)) {
            setIsOpen(false)
          }
        }
      })
    }
  }, [inputRef, ulRef])

  return (
    <div className={style.container}>
      <link
        rel='stylesheet'
        href={`https://fonts.googleapis.com/css2?family=${guiStyle.fontFamily.replace(/\s/g, '+')}:wght@400`}
      />
      <label htmlFor={id} className={style.label}>
        Font Family
      </label>
      <div className={style.inner}>
        <input
          className={style.input}
          type='text'
          id={id}
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onClick={(e) => {
            if (isOpen) e.preventDefault()
            setIsOpen(true)
          }}
          onTouchStart={(e) => {
            if (isOpen) e.preventDefault()
            setIsOpen(true)
          }}
        />
        <ul
          className={`absolute z-20 left-0 w-full top-[calc(100%+.4rem)] max-h-[50vh]
          rounded-[3px] overflow-y-scroll bg-background border border-text min-w-[160px]
          ${isOpen ? 'block' : 'hidden'}`}
          ref={ulRef}
        >
          {viewPrimaryFonts.map((font) => (
            <li key={font}>
              <button className={`${style.fontButton} ${guiStyle.fontFamily === font && 'text-background bg-text'}`} onClick={() => handleClickButton(font)}>
                {font}
              </button>
            </li>
          ))}
          {viewPrimaryFonts.length ? <Divider /> : null}
          {viewFonts.map((font) => (
            <li key={font} className={`w-full`}>
              <button className={`${style.fontButton} ${guiStyle.fontFamily === font && 'text-background bg-text'}`} onClick={() => handleClickButton(font)} tabIndex={-1}>
                {font}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

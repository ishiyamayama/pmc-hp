import { getEventListeners } from 'events'
import { Editor, styled, Inputs, FontFamilyInput } from '@compai/css-gui'
import { useEffect, useState, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Link, Divider } from 'components/atoms'
import { FontFamily } from 'components/inputs'
import { Logo } from 'components/svg'
import { defaultStyles } from 'const'
import { defaultTheme } from 'const/defaultTheme'
import { guiStyleState } from 'stores/guiStyle'
import style from 'styles/modules/editor.module.sass'

export const Header = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const inputs: NodeListOf<HTMLInputElement> = ref.current?.querySelectorAll('input')
      inputs.forEach((input) => {
        input.addEventListener('pointerdown', (e) => {
          e.stopPropagation()
        })
      })
      return () => {
        if (ref.current) {
          const inputs: NodeListOf<HTMLInputElement> = ref.current?.querySelectorAll('input')
          inputs.forEach((input) => {
            input.removeEventListener('pointerdown', (e) => {
              e.stopPropagation()
            })
          })
        }
      }
    }
  }, [ref])

  return (
    <>
      {/* <div className='w-full h-20'>
        <FontFamily />
      </div> */}
      <styled.div styles={guiStyle} className={style.header}>
        <Editor
          theme={defaultTheme}
          styles={guiStyle}
          onChange={setGuiStyle}
          showRegenerate={false}
          hideResponsiveControls={true}
          showAddProperties={false}
        >
          <div ref={ref} className={`mdMin:grid-head md:flex-col md:gap-y-4 md:flex text-text font-inter relative`}>
            <div className='md:justify-center md:py-[6rem] md:flex md:relative'>
              <h1>
                <Link href='/' className='mdMin:py-1 w-full max-w-[28.5rem] md:w-[26.2rem]'>
                  <Logo />
                </Link>
              </h1>
              <Divider className='absolute bottom-0 w-full mdMin:hidden' />
            </div>
            <div className='flex mdMin:justify-between md:flex-col md:gap-y-4 gap-x-[6.1%] md:pr-[9.6rem]'>
              <div className={style.editor}>
                <div className={style.fontFamily}>
                  <Inputs.FontFamily />
                </div>
                <div className={style.fontSize}>
                  <Inputs.FontSize />
                </div>
              </div>
              <div className={style.editor}>
                <div className={style.lineHeight}>
                  <Inputs.LineHeight />
                </div>
                <div className={style.letterSpacing}>
                  <Inputs.LetterSpacing />
                </div>
              </div>
            </div>
            <div className='flex justify-between md:pr-[9.6rem]'>
              <div className={style.editor}>
                <div className={style.backgroundColor}>
                  <Inputs.BackgroundColor />
                </div>
                <div className={style.color}>
                  <Inputs.Color />
                </div>
              </div>
              <button
                className='w-[7.5rem] h-[3rem] rounded-full
            border border-current font-inter text-[1rem]
            md:absolute md:right-0 md:top-[14.8rem] md:w-[7.2rem]
            hover:text-theme-bg hover:bg-theme-text'
                onClick={() => setGuiStyle(defaultStyles)}
              >
                Default
              </button>
            </div>
            <Divider className='mt-4 mdMin:hidden' />
          </div>
        </Editor>
      </styled.div>
    </>
  )
}

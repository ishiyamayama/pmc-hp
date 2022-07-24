import { Editor, styled, Inputs } from '@compai/css-gui'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Link, Divider } from 'components/atoms'
import { FontFamily, FontSize } from 'components/inputs'
import { Logo } from 'components/svg'
import { defaultStyles } from 'const'
import { defaultTheme } from 'const/defaultTheme'
import { guiStyleState } from 'stores/guiStyleState'
import style from 'styles/modules/editor.module.sass'

export const Header = ({ fonts }: { fonts: string[] }) => {
  const router = useRouter()
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  const ref = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (ref.current) {
  //     const inputs: NodeListOf<HTMLInputElement> = ref.current?.querySelectorAll('input')

  //     inputs.forEach((input, index) => {
  //       input.addEventListener('pointerdown', (e) => e.stopPropagation())
  //       input.addEventListener('keydown', (e) => e.stopPropagation())
  //       index > 0 &&
  //         input.addEventListener('input', (e) => {
  //           const { value } = e.target as HTMLInputElement
  //           if (value === 'Na' || value === 'N/A' || value === 'N/a' || value === '') {
  //             input.value = ''
  //           }
  //         })
  //       index > 0 && ((input.type = 'number'), (input.min = '0'))
  //     })
  //     return () => {
  //       if (ref.current) {
  //         const inputs: NodeListOf<HTMLInputElement> = ref.current?.querySelectorAll('input')
  //         inputs.forEach((input, index) => {
  //           input.removeEventListener('pointerdown', (e) => e.stopPropagation())
  //           input.removeEventListener('keydown', (e) => e.stopPropagation())
  //           index > 0 &&
  //             input.removeEventListener('input', (e) => {
  //               const { value } = e.target as HTMLInputElement
  //               if (value === 'Na' || value === 'N/A' || value === 'N/a' || value === '') {
  //                 input.value = ''
  //               }
  //             })
  //         })
  //       }
  //     }
  //   }
  // }, [ref])

  return (
    <>
      {/* <div className='w-full h-20 mdMin:grid-head font-inter font-medium text-[1rem]'>
        <div></div>
        <div className='flex mdMin:justify-between md:flex-col md:gap-y-4 gap-x-[6.1%] md:pr-[9.6rem] md:mt-4'>
          <div className='w-full grid gap-y-[.6rem] md:flex md:justify-between'>
            <FontFamily fonts={fonts} />
            <FontSize fonts={fonts} />
          </div>
          <div className='w-full grid gap-x-[.6rem] md:flex md:justify-between'>
          </div>
        </div>
        <div></div>
      </div> */}
      <styled.div styles={guiStyle} className={style.header}>
        <Editor
          theme={defaultTheme}
          styles={guiStyle as any}
          onChange={setGuiStyle}
          showRegenerate={false}
          hideResponsiveControls={true}
          showAddProperties={false}
        >
          <div ref={ref} className={`mdMin:grid-head md:flex-col md:gap-y-4 md:flex font-inter font-medium text-[1rem] relative`}>
            <div className='md:justify-center md:py-[6rem] md:flex md:relative'>
              {router.asPath === '/' ? (
                <h1>
                  <Link href='/' className='w-full max-w-[26.1rem] md:w-[26.2rem]'>
                    <Logo />
                  </Link>
                </h1>
              ) : (
                <div>
                  <Link href='/' className='w-full max-w-[26.1rem] md:w-[26.2rem]'>
                    <Logo />
                  </Link>
                </div>
              )}
              <Divider className='absolute bottom-0 w-full mdMin:hidden' />
            </div>
            <div className='flex mdMin:justify-between md:flex-col md:gap-y-4 gap-x-[6.1%] md:pr-[9rem] md:mt-4'>
              <div className="w-full grid gap-y-[.6rem] md:flex md:justify-between">
                <FontFamily fonts={fonts} />
                <FontSize />
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
            md:absolute md:right-0 md:top-[15.8rem] md:w-[7.2rem]
            focus-visible:text-background focus-visible:bg-text
            hover:text-background hover:bg-text'
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

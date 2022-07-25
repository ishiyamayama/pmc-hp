import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { ColorScheme, Header } from 'components/organisms'
import { guiStyleState } from 'stores/guiStyleState'
type Props = { children?: React.ReactNode }

const AppLayout = ({ children }: Props) => {
  const guiStyle = useRecoilValue(guiStyleState)
  const innerStyle = {
    fontFamily: `"${guiStyle.fontFamily}" , var(--font-noto)`,
    fontSize: `${guiStyle.fontSize.value}${guiStyle.fontSize.unit}`,
    letterSpacing: `${guiStyle.letterSpacing.value}${guiStyle.letterSpacing.unit}`,
    lineHeight: `${guiStyle.lineHeight.value}${guiStyle.lineHeight.unit}`,
    color: guiStyle.color,
  }
  useEffect(() => {
    document.documentElement.style.setProperty('--color-text', guiStyle.color)
    document.documentElement.style.setProperty('--color-background', guiStyle.backgroundColor)
  }, [guiStyle])
  return (
    <div className='min-h-full p-[5rem_5rem_5rem] lg:mdMin:p-[4rem_2.5rem_5rem] md:p-[0rem_1.5rem_2rem]'>
      <Header />
      <ColorScheme />
      <main style={innerStyle}>
        {children}
        <small translate='no' className='mt-[10rem] block'>
          PASOCOM MUSIC CLUB©2022
        </small>
      </main>
    </div>
  )
}

export { AppLayout }

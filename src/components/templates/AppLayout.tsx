import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { ColorScheme, Header } from 'components/organisms'
import { guiStyleState } from 'stores/guiStyle'
type Props = { children?: React.ReactNode }

const AppLayout = ({ children }: Props) => {
  const guiStyle = useRecoilValue(guiStyleState)
  const wrapperStyle = { backgroundColor: guiStyle.backgroundColor }
  const innerStyle = {
    fontFamily: guiStyle.fontFamily,
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
    <div className='min-h-full p-[5rem]' style={wrapperStyle}>
      <ColorScheme />
      <Header />
      <main style={innerStyle}>{children}</main>
    </div>
  )
}

export { AppLayout }

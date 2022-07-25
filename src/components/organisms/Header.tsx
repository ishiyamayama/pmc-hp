import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { Link, Divider } from 'components/atoms'
import { FontFamily, FontSize, LineHeight, LetterSpacing, BackgroundColor, TextColor } from 'components/inputs'
import { Logo } from 'components/svg'
import { defaultStyles } from 'const'
import { guiStyleState } from 'stores/guiStyleState'

export const Header = ({ fonts }: { fonts: string[] }) => {
  const router = useRouter()
  const setGuiStyle = useSetRecoilState(guiStyleState)

  return (
    <div
      className={`mdMin:grid-head md:flex-col md:gap-y-4 md:flex font-inter font-medium text-[1rem] tracking-normal relative leading-[1] z-50`}
    >

    </div>
  )
}

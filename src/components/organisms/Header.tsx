import { Editor, styled, Inputs, FontFamilyInput } from '@compai/css-gui'
import { useRecoilState } from 'recoil'
import { Link } from 'components/atoms'
import { Logo } from 'components/svg'
import { defaultStyles } from 'const'
import { defaultTheme } from 'const/defaultTheme'
import { guiStyleState } from 'stores/guiStyle'
import style from 'styles/modules/editor.module.sass'

export const Header = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)

  return (
    <Editor
      theme={defaultTheme}
      styles={guiStyle}
      onChange={setGuiStyle}
      showRegenerate={false}
      hideResponsiveControls={true}
      showAddProperties={false}>
      <div className={`grid-head text-text font-inter`}>
        <h1>
          <Link href='/' className='py-1 w-full max-w-[28.5rem]'>
            <Logo />
          </Link>
        </h1>
        <div className='flex justify-between gap-x-[6.1%]'>
          <div className={style.editor}>
            <Inputs.FontFamily />
            <Inputs.FontSize />
          </div>
          <div className={style.editor}>
            <Inputs.LineHeight />
            <Inputs.LetterSpacing />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className={style.editor}>
            <Inputs.BackgroundColor />
            <Inputs.Color />
          </div>
          <button
            className='w-[7.5rem] h-[3rem] rounded-full
            border border-current font-inter text-[1rem]'
            onClick={() => setGuiStyle(defaultStyles)}>
            Default
          </button>
        </div>
      </div>
    </Editor>
  )
}

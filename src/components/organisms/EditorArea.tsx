import { Editor, styled, Inputs } from '@compai/css-gui'
import { useRecoilState } from 'recoil'
import { guiStyleState } from 'stores/guiStyle'

export const EditorArea = () => {
  const [guiStyle, setGuiStyle] = useRecoilState(guiStyleState)
  return (
    <div className='grid w-full min-h-full text-black'>
      <Editor styles={guiStyle} onChange={setGuiStyle} hideResponsiveControls={true} showRegenerate={false}>
        <Inputs.FontFamily/>
        <Inputs.FontSize className="bg-black"  />
        <Inputs.LineHeight />
        <Inputs.LetterSpacing />
        <Inputs.Color />
        <Inputs.BackgroundColor />
      </Editor>
      <styled.p styles={guiStyle}>アイウエオ</styled.p>
    </div>
  )
}

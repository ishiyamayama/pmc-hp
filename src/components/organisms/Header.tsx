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
      <div className='md:justify-center md:py-[6rem] md:flex md:relative'>
        {/* {router.asPath === '/' ? (
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
        )} */}
        <Divider className='absolute bottom-0 w-full mdMin:hidden' />
      </div>
      <div className='flex mdMin:justify-between md:flex-col md:gap-y-4 gap-x-[6.1%] md:pr-[9rem] md:mt-4'>
        <div className='w-full grid gap-y-[.6rem] md:flex md:justify-between'>
          <FontFamily fonts={fonts} />
          <FontSize />
        </div>
        <div className='w-full grid gap-y-[.6rem] md:flex md:justify-between'>
          <LineHeight />
          <LetterSpacing />
        </div>
      </div>
      <div className='flex mdMin:justify-between md:flex-col md:gap-y-4 gap-x-[6.1%] md:pr-[9rem] z-90 mdMin:relative'>
        <div className='grid gap-y-[.6rem] md:flex md:justify-between'>
          <BackgroundColor />
          <TextColor />
        </div>
        <button
          className='w-[7.5rem] h-[3rem] rounded-full relative z-90
            border border-current font-inter text-[1rem]
            md:absolute md:right-0 md:top-[15.8rem] md:w-[7.2rem]
            focus-visible:text-background focus-visible:bg-text
            mdMin:hover:text-background mdMin:hover:bg-text'
          onClick={() => setGuiStyle(defaultStyles)}
        >
          Default
        </button>
      </div>
      <Divider className='mt-4 mdMin:hidden' />
    </div>
  )
}

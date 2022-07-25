import { Header } from 'components/organisms'
import { fetchOverview, fetchFonts } from 'lib/api'
import style from 'styles/modules/article.module.sass'
import { OverviewContentType } from 'types'

type Props = {
  overview: OverviewContentType
  fonts: string[]
}

const Overview = ({ overview, fonts }: Props) => {
  return (
    <>
      <Header fonts={fonts} />
      <div className='mt-[6rem] md:mt-16 mdMin:grid-head'>
        <h1 className='text-[24px] mdMin:pt-[1rem]'>HATIHATI PRO.</h1>
        <div className='md:mt-16'>
          <div className={style.article} dangerouslySetInnerHTML={{ __html: overview.body }} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const { overview } = await fetchOverview()
  const { fonts } = await fetchFonts()
  return {
    props: { overview, fonts },
    revalidate: 10,
  }
}

export default Overview

import { fetchOverview } from 'lib/api'
import style from 'styles/modules/article.module.sass'
import { OverviewContentType } from 'types'

type Props = {
  overview: OverviewContentType
}

const Overview = ({ overview }: Props) => {
  return (
    <div className='mt-[6rem] md:mt-16 mdMin:grid-head'>
      <h1 className='text-[24px] mdMin:pt-[1rem]'>HATIHATI PRO.</h1>
      <div className='md:mt-16'>
        <div className={style.article} dangerouslySetInnerHTML={{ __html: overview.body }} />
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const { overview } = await fetchOverview()
  return {
    props: { overview },
    revalidate: 10,
  }
}

export default Overview

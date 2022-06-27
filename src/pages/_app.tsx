import NextHeadSeo from 'next-head-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { AppLayout } from 'components/templates/AppLayout'
import { config, meta } from 'const/siteData'
import 'styles/main.css'

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    history.scrollRestoration = 'manual'
    router.beforePopState((state) => {
      state.options.scroll = false
      return true
    })
  }, [router])
  const canonicalUrl = (config.baseUrl + (router.asPath === '/' ? '' : router.asPath)).split('?')[0]
  const postPage =
    router.asPath.split('/')[2] === '' || typeof router.asPath.split('/')[2] === 'undefined' ? false : true
  const slug = router.asPath === '/' ? 'top' : router.asPath.split('/')[1]
  return (
    <>
      <NextHeadSeo
        title={postPage ? '' : meta[slug].title}
        description={postPage ? '' : meta[slug].description}
        canonical={canonicalUrl}
        twitter={{ card: 'summary_large_image', site: '' }}
        og={{
          title: postPage ? '' : meta[slug].title,
          description: postPage ? '' : meta[slug].description,
          image: config.ogImage,
          siteName: config.siteName,
        }}
      />
      <RecoilRoot>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </RecoilRoot>
    </>
  )
}

export default MyApp

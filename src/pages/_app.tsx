import NextHeadSeo from 'next-head-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect,useState } from 'react'
import { RecoilRoot } from 'recoil'
import { AppLayout } from 'components/templates/AppLayout'
import { config, meta } from 'const/siteData'
import 'styles/main.sass'

function MyApp({ Component, pageProps, router }: AppProps) {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    !initialized && console.log("パソコン音楽クラブのHPへようこそ!")
    setInitialized(true)
  }, [initialized])
  useEffect(() => {
    history.scrollRestoration = 'manual'
    router.beforePopState((state) => {
      state.options.scroll = false
      return true
    })
  }, [router])
  const canonicalUrl = (config.baseUrl + (router.asPath === '/' ? '' : router.asPath)).split('?')[0]
  const slug = router.asPath === '/' ? 'top' : router.asPath.split('/')[1]

  return (
    <>
      <NextHeadSeo
        title={meta[slug] ? meta[slug].title : config.siteName}
        description={meta[slug] ? meta[slug].description : ''}
        canonical={canonicalUrl}
        twitter={{ card: 'summary_large_image' }}
        og={{
          title: meta[slug] ? meta[slug].title : config.siteName,
          description: meta[slug] ? meta[slug].description : '',
          image: config.ogImage,
          siteName: config.siteName,
        }}
        customMetaTags={[{ name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0' }]}
        customLinkTags={[
          { rel: 'icon', type: 'image/svg+xml', href: `/favicon.svg` },
          { rel: 'icon', href: `/favicon.ico` },
        ]}
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

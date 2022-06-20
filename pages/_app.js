import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import * as gtag from '../lib/gtatg'
import GlobalCSS from '../styles/global.css'

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect (() => {
    const handleRouteChange = (url) => {
      gtag.pageview (url)
    }
    router.events.on ('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off ('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
      <Layout>
        <GlobalCSS/>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import * as gtag from '../lib/gtatg'
import { GTM_ID, pageview } from '../lib/gtm'
import GlobalCSS from '../styles/global.css'
import '../styles/cookieconsent.css'
import {CookiesProvider} from "react-cookie"

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
    <>
    <script
        dangerouslySetInnerHTML={{
          __html: `     
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}   
            gtag('js', new Date());
            gtag('config', '${GTM_ID}', {  
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      <CookiesProvider>
        <Layout>
          <GlobalCSS/>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </>
  )
}

export default MyApp

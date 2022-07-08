import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import * as gtag from '../lib/gtatg'
import { GTM_ID } from '../lib/gtm'
import GlobalCSS from '../styles/global.css'
import '../styles/cookieconsent.css'
import {CookiesProvider} from "react-cookie"
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Router from 'next/router'

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

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

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { GA_TRACKING_ID } from '../lib/gtatg'
import { GTM_ID } from '../lib/gtm'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {

    const language = "fr-fr";

    return (

      <Html lang={language}>

        <Head>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href={`/fonts/Sofia-Pro-Regular.woff`}
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href={`/fonts/Mark-Pro-Bold.woff`}
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          {/* Globla site Tag */}
          <script
            async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `     
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}   
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {  
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>

        <body>

        <script
            dangerouslySetInnerHTML={{
              __html: `     
                  window.axeptioSettings = {
                    clientId: "62bd75f3603853d1880ab6f4",
                    cookiesVersion: "https://leste-lp/-fr",
                  };
                  
                  (function(d, s) {
                    var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
                    e.async = true; e.src = "//static.axept.io/sdk.js";
                    t.parentNode.insertBefore(e, t);
                  })(document, "script");
              `,
                }}
              />

          <script
            async src="https://www.googletagmanager.com/ns.html?id=GTM-MKS45SB"
          />
          <Main />

          <NextScript />

        </body>
      </Html>
    );
  }
}
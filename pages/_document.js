// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // Detecta idioma por la URL (/en/* => en)
    let lang = "es";
    try {
      const url = ctx?.pathname || ctx?.req?.url || "";
      if (typeof url === "string" && (url === "/en" || url.startsWith("/en/"))) lang = "en";
    } catch (_) {}
    return { ...initialProps, lang };
  }

  render() {
    const lang = this.props.lang || "es";
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WGPPDC39";
    return (
      <Html lang={lang}>
        <Head>
          {/* Google Tag Manager (lo más arriba posible en <Head>) */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(
                function(w,d,s,l,i){
                  w[l]=w[l]||[];
                  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          {/* End Google Tag Manager */}
        {/* Meta charset primero en <Head> */}
        <meta charSet="utf-8" />
        {/* Favicons generados desde el logo */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A1019" />

        {/* CSS globales – mover desde _app.js a _document.js */}
        <link rel="stylesheet" href="/assets/css/fontawesome-5.14.0.min.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/slick.min.css" />
          <link rel="stylesheet" href="/assets/css/style.css" />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

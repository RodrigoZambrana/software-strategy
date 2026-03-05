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
    return (
      <Html lang={lang}>
        <Head>
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
        <link
          rel="stylesheet"
          href="/assets/css/fontawesome-5.14.0.min.css"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link rel="stylesheet" href="/assets/css/fontawesome-5.14.0.min.css" />
        </noscript>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

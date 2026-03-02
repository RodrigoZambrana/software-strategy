// next-seo.config.js
export default {
  // Fallback centrado en el mercado objetivo actual.
  defaultTitle: "Desarrollo Web para PYMEs en Uruguay y LATAM | Software Strategy",
  titleTemplate: "%s | Software Strategy",
  description:
    "Software Strategy desarrolla sitios web y software a medida para PYMEs con foco en Uruguay y expansión LATAM, orientado a posicionamiento en Google y resultados comerciales.",
  canonical: "https://software-strategy.com/",
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "https://software-strategy.com/",
    siteName: "Software Strategy",
    images: [
      {
        url: "https://software-strategy.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Software Strategy",
      },
    ],
  },
  twitter: {
    handle: "@software_strategy",
    site: "@software_strategy",
    cardType: "summary_large_image",
  },
};
  

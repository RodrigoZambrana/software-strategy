// next-seo.config.js
export default {
  // Usar una descripción extendida como título por defecto para evitar que quede solo la marca.
  defaultTitle: "Agencia de Desarrollo Web y SEO | Software Strategy",
  titleTemplate: "%s | Software Strategy",
  description:
    "Software Strategy ofrece desarrollo web, software a medida, SEO/SEM y marketing digital para potenciar tu presencia online.",
  canonical: "https://software-strategy.com/",
  openGraph: {
    type: "website",
    locale: "es_ES",
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
  

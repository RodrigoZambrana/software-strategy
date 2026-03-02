// pages/_app.js
import "../styles/globals.css";
import PreLoader from "@/src/layout/PreLoader";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { DefaultSeo } from "next-seo";
import { Inter } from "next/font/google";
import SEO from "../next-seo.config";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import esFooter from "@/content/es/footer.json";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

function App({ Component, pageProps }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const router = useRouter();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://software-strategy.com/#organization",
    name: "Software Strategy",
    legalName: "Software Strategy",
    url: "https://software-strategy.com/",
    logo: "https://software-strategy.com/android-chrome-192x192.png",
    email: esFooter?.contacts?.email || "info@software-strategy.com",
    telephone: esFooter?.contacts?.phoneDisplay || "+59898488759",
    areaServed: [
      { "@type": "Country", name: "Uruguay" },
      { "@type": "Place", name: "Latin America" }
    ],
    availableLanguage: ["es", "en"],
    sameAs: (esFooter?.social || []).map((item) => item.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: esFooter?.contacts?.email || "info@software-strategy.com",
        telephone: esFooter?.contacts?.phoneDisplay || "+59898488759",
        areaServed: ["UY", "LATAM"],
        availableLanguage: ["es", "en"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "UY",
      addressRegion: "Uruguay",
    },
    knowsAbout: [
      "Desarrollo web para PYMEs",
      "Desarrollo de software a medida",
      "Visibilidad en Google",
      "Marketing digital",
      "Automatización de procesos",
      "Integraciones empresariales",
    ],
  };

  // Detectar idioma del navegador y respetar preferencia del usuario (cookie) por encima.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const getCookie = (name) =>
        (document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)')) || [])[1];
      const setCookie = (name, value) => {
        document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
      };

      const pathname = window.location.pathname || '/';
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      const isEnPath = pathname === '/en' || pathname.startsWith('/en/');
      const isLocaleRoot = pathname === '/' || pathname === '/en';
      const toEsPath = (p) => (p === '/en' ? '/' : (p.replace(/^\/en(?=\/|$)/, '') || '/'));

      const pref = getCookie('ss_locale');
      if (pref) {
        // Si el usuario ya tiene preferencia guardada, respetarla SIEMPRE.
        if (pref === 'en') {
          if (!isEnPath && isLocaleRoot) {
            router.replace(`/en${pathname}${search}${hash}`);
          }
          return;
        }
        // Cualquier valor distinto de 'en' lo tratamos como 'es'.
        if (isEnPath && isLocaleRoot) {
          router.replace(`${toEsPath(pathname)}${search}${hash}`);
        }
        return;
      }

      const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]).filter(Boolean);
      const prefersEn = langs.some((l) => (l || '').toLowerCase().startsWith('en'));
      if (prefersEn && !isEnPath && isLocaleRoot) {
        setCookie('ss_locale', 'en');
        router.replace(`/en${pathname}${search}${hash}`);
        return;
      }
      // Si no se puede obtener o no es EN, mantener español.
      setCookie('ss_locale', isEnPath ? 'en' : 'es');
    } catch (_) {}
  }, [router]);

  
  useEffect(() => {
    const t = setTimeout(() => setShowPreloader(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // GTM tracking deshabilitado temporalmente para evitar duplicaciones.
  // Se está configurando la medición directamente desde Google Tag Manager.
  // useEffect(() => {
  //   if (typeof window === 'undefined') return;
  //   const gtmPush = (data) => {
  //     try {
  //       window.dataLayer = window.dataLayer || [];
  //       window.dataLayer.push(data);
  //     } catch (_) {}
  //   };
  //   const handleRouteChange = (url) => {
  //     const page_location = typeof window !== 'undefined' ? window.location.href : url;
  //     const page_title = typeof document !== 'undefined' ? document.title : undefined;
  //     gtmPush({ event: 'page_view', page_location, page_path: url, page_title });
  //   };
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   const onClick = (e) => {
  //     const el = e.target.closest('[data-cta]');
  //     if (!el) return;
  //     const href = el.getAttribute('href') || '';
  //     const text = (el.textContent || '').trim();
  //     const cta = el.getAttribute('data-cta') || '';
  //     const id = el.getAttribute('id') || '';
  //     const meta = { ...el.dataset }; delete meta.cta;
  //     const currency = (meta.currency || 'USD').toString();
  //     const value = typeof meta.value !== 'undefined' && !isNaN(Number(meta.value)) ? Number(meta.value) : 0;
  //     gtmPush({ event: 'cta_click', cta_id: id, cta, link_url: href, link_text: text, page_path: (typeof window !== 'undefined' ? window.location.pathname : ''), cta_meta: meta, value, currency });
  //     const pushEvent = (name, params = {}) => gtmPush({ event: name, ...params });
  //     const isPlanCta = cta.includes('pricing') || cta.includes('comparison') || typeof meta.plan !== 'undefined';
  //     if (isPlanCta) {
  //       const plan = (meta.plan || '').toString();
  //       const price = (meta.price || '').toString();
  //       pushEvent('click_plan', { plan_name: plan, plan_price: price, currency, link_url: href, page_path: (typeof window !== 'undefined' ? window.location.pathname : ''), value: price && !isNaN(Number(price)) ? Number(price) : value });
  //     }
  //     const isWhatsapp = href.includes('wa.me') || href.includes('api.whatsapp.com') || cta.includes('whatsapp');
  //     if (isWhatsapp) {
  //       const phone = (href.match(/(\+?\d{6,15})/) || [,''])[1];
  //       pushEvent('whatsapp_click', { phone, link_url: href, page_path: (typeof window !== 'undefined' ? window.location.pathname : ''), value, currency });
  //     }
  //     if (href.startsWith('mailto:')) {
  //       pushEvent('email_click', { email: href.replace('mailto:', ''), link_url: href, page_path: (typeof window !== 'undefined' ? window.location.pathname : ''), value, currency });
  //     }
  //     if (href.startsWith('tel:')) {
  //       pushEvent('phone_click', { phone: href.replace('tel:', ''), link_url: href, page_path: (typeof window !== 'undefined' ? window.location.pathname : ''), value, currency });
  //     }
  //   };
  //   document.addEventListener('click', onClick);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //     document.removeEventListener('click', onClick);
  //   };
  // }, [router.events]);

  return (
    <Fragment>
      <DefaultSeo {...SEO} />

      {/* Meta básicas (sin <title>; lo maneja next-seo) */}
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <div className={inter.variable}>
        <Component {...pageProps} />
        {showPreloader && <PreLoader />}
      </div>
    </Fragment>
  );
}

export default appWithTranslation(App);

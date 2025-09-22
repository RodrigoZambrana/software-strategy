import fs from "fs";
import path from "path";
import Layout from "@/src/layout/Layout";
import HomePage from "@/src/components/pages/HomePage";
import PricingPage from "@/src/components/pages/PricingPage";
import ServicesPage from "@/src/components/pages/ServicesPage";
import ServiceDetailPage from "@/src/components/pages/ServiceDetailPage";
import MarketingPage from "@/src/components/pages/MarketingPage";
import ContactPage from "@/src/components/pages/ContactPage";
import { enrichHomeWithServiceSlides, buildPricingGroups } from "@/src/lib/contentUtils";

export default function CatchAll({ page, locale, t }) {
  return (
    <Layout dark locale={locale}>
      {page === "home" && <HomePage t={t} locale={locale} />}
      {page === "pricing" && <PricingPage t={t} locale={locale} />}
      {page === "web-development" && <ServiceDetailPage t={t} locale={locale} slug="web-development" />}
      {page === "custom-software" && <ServiceDetailPage t={t} locale={locale} slug="custom-software" />}
      {page === "digital-marketing" && <MarketingPage t={t} locale={locale} />}
      {page === "seo-sem" && <ServiceDetailPage t={t} locale={locale} slug="seo-sem" />}
      {page === "services" && <ServicesPage t={t} locale={locale} />}

      {page === "contact" && <ContactPage t={t} locale={locale} />}
      {/* Fallback simple si no matchea */}
      {!(page === "home" || page === "pricing") && null}
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generamos 2 paths: "/" (ES) y "/en" (EN).
  return {
    paths: [
      { params: { slug: [] } }, // /
      // EN root handled by pages/en/index.jsx
      { params: { slug: ["pricing"] } }, // /pricing
      { params: { slug: ["en", "pricing"] } }, // /en/pricing
      { params: { slug: ["contact"] } }, // /contact (ES)
      { params: { slug: ["en", "contact"] } }, // /en/contact
      { params: { slug: ["services"] } }, // /services
      { params: { slug: ["en", "services"] } }, // /en/services
      // Service details under /services/{slug}
      { params: { slug: ["services", "web-development"] } }, // /services/web-development
      { params: { slug: ["en", "services", "web-development"] } }, // /en/services/web-development
      { params: { slug: ["services", "custom-software"] } }, // /services/custom-software
      { params: { slug: ["en", "services", "custom-software"] } }, // /en/services/custom-software
      { params: { slug: ["services", "digital-marketing"] } }, // /services/digital-marketing
      { params: { slug: ["en", "services", "digital-marketing"] } }, // /en/services/digital-marketing
      { params: { slug: ["services", "google-seo"] } }, // /services/google-seo (ES)
      { params: { slug: ["en", "services", "google-seo"] } }, // /en/services/google-seo
      // No top-level service URLs; use /services/* (redirects handled in .htaccess)
      // top-level digital-marketing not generated; use /services/digital-marketing
      // top-level google-seo removed
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const segments = params?.slug ?? [];
  const first = segments[0];

  // Idioma
  const locale = first === "en" ? "en" : "es";
  const routeRemainder = first === "en" ? segments.slice(1) : segments;

  // Página
  let page = "home";
  if (routeRemainder.length > 0) {
    // Rutas de primer nivel y secciones
    const a = routeRemainder[0];
    const b = routeRemainder[1];

    if (a === "pricing") page = "pricing";
    if (a === "contact") page = "contact";

    // Listado de servicios
    if (a === "servicios" || a === "services") page = "services";

    // Detalles de servicios: /services/{slug}
    if ((a === "services" || a === "servicios") && b) {
      if (["web-development", "custom-software", "digital-marketing", "google-seo"].includes(b)) {
        page = (b === "google-seo" ? "seo-sem" : b);
      }
    }

    // Top-level legacy URLs are redirected at web server; no static routes here.
  }

  // JSON de contenido
  const contentPath = path.join(process.cwd(), "content", locale, `${page}.json`);
  let t = {};
  try {
    const raw = fs.readFileSync(contentPath, "utf8");
    t = JSON.parse(raw);
  } catch (err) {
    console.warn(`No existe JSON para ${page} (${locale}):`, contentPath);
  }

  // Enriquecer contenido dinámico mediante utilidades compartidas
  try {
    // 1) Home: agregar slides de los servicios al slider inicial
    if (page === "home") {
      enrichHomeWithServiceSlides(t, locale);
    }
    // 2) Pricing: grupos por servicio (Web y Marketing)
    if (page === "pricing") {
      const groups = buildPricingGroups(locale);
      if (!t.pricingSection) t.pricingSection = {};
      t.pricingSection.groups = groups;
    }
  } catch (e) {
    console.warn("[getStaticProps] Error al enriquecer contenido:", e?.message || e);
  }

  return {
    props: { page, locale, t },
  };
}

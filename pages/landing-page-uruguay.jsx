import Link from "next/link";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Layout from "@/src/layout/Layout";
import PageBanner from "@/src/components/PageBanner";

const FAQS = [
  {
    q: "¿Para qué sirve una landing page en una PYME?",
    a: "Sirve para presentar una oferta concreta y convertir visitas en consultas con un mensaje simple y directo.",
  },
  {
    q: "¿Conviene una landing si no tengo sitio web completo?",
    a: "Sí. Es una muy buena forma de empezar rápido y probar si tu oferta genera consultas antes de pasar a una web más completa.",
  },
  {
    q: "¿Incluye formulario y WhatsApp?",
    a: "Sí. Incluimos canales de contacto visibles para facilitar consultas desde celular y desktop.",
  },
  {
    q: "¿Puede usarse para campañas en Google y redes?",
    a: "Sí. La diseñamos para que funcione como página de destino en campañas de adquisición.",
  },
  {
    q: "¿Luego se puede transformar en sitio completo?",
    a: "Sí. La base se puede ampliar después sin perder lo ya hecho.",
  },
  {
    q: "¿Cuándo conviene pasar a un sitio web completo?",
    a: "Cuando tu empresa necesita más secciones, explicar mejor sus servicios, fortalecer posicionamiento en Google o sostener un proceso comercial más completo.",
  },
];

export default function LandingPageUruguayPage() {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/landing-page-uruguay`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Landing page para PYMEs en Uruguay",
    serviceType: "Diseño y desarrollo de landing pages",
    description:
      "Creamos landing pages para empresas en Uruguay orientadas a validar oferta, captar consultas y funcionar como primera etapa antes de un sitio web más completo.",
    areaServed: { "@type": "Country", name: "Uruguay" },
    audience: { "@type": "BusinessAudience", audienceType: "PYMEs" },
    provider: {
      "@type": "Organization",
      name: "Software Strategy",
      url: siteBase,
    },
    inLanguage: "es",
    url: canonical,
  };

  return (
    <Layout dark locale="es">
      <NextSeo
        title="Landing page en Uruguay para empezar a captar consultas"
        description="Diseñamos landing pages en Uruguay para empresas que necesitan validar demanda, lanzar rápido una oferta y empezar a captar consultas sin desarrollar un sitio completo."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: canonical },
          { hrefLang: "x-default", href: canonical },
        ]}
        openGraph={{
          url: canonical,
          type: "website",
          locale: "es_UY",
          title: "Landing page en Uruguay para empezar a captar consultas | Software Strategy",
          description: "Landing pages para validar una oferta concreta y empezar a generar consultas antes de pasar a un sitio completo.",
          siteName: "Software Strategy",
          images: DefaultSEO?.openGraph?.images || [],
        }}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: "Inicio", item: `${siteBase}/` },
          { position: 2, name: "Landing page en Uruguay", item: canonical },
        ]}
      />

      <FAQPageJsonLd
        mainEntity={FAQS.map((item) => ({
          questionName: item.q,
          acceptedAnswerText: item.a,
        }))}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageBanner pageName="Landing page en Uruguay" homeLabel="Inicio" homeHref="/" titleAs="div" />

      <section className="about-area pt-90 rpt-70 pb-30 rpb-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="section-title mb-30">
                <h1>Landing page en Uruguay para validar demanda y captar consultas</h1>
              </div>
              <p>
                Si todavía no necesitás un sitio completo, una landing page puede ser la forma más simple de salir rápido con una oferta concreta y empezar a captar consultas.
              </p>
              <p>
                Diseñamos landing pages enfocadas en una sola oferta, con mensaje claro y contacto directo. Sirven para empezar bien, no para reemplazar una web más completa cuando tu empresa ya necesita más contenido.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-area pb-80 rpb-50">
        <div className="container">
          <div className="section-title mb-35">
            <h2>¿Qué incluye una landing page orientada a resultados?</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-style-one">
                <li>Oferta clara y fácil de entender.</li>
                <li>Secciones clave para generar confianza.</li>
                <li>Llamados a la acción visibles.</li>
                <li>Formulario y botón de WhatsApp.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-style-one">
                <li>Diseño adaptable a celular y desktop.</li>
                <li>Base para aparecer en Google.</li>
                <li>Lista para campañas en Google y redes.</li>
                <li>Lista para ampliarse más adelante.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="project-timeline-two-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title mb-35">
            <h2>Cómo la lanzamos</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h3>1. Definición de oferta</h3>
              <p>Aterrizamos propuesta, público objetivo y objetivo de captación.</p>
            </div>
            <div className="col-lg-6">
              <h3>2. Redacción comercial</h3>
              <p>Construimos un mensaje claro para convertir visitas en contacto.</p>
            </div>
            <div className="col-lg-6">
              <h3>3. Diseño y desarrollo</h3>
              <p>Publicamos una landing rápida, profesional y fácil de entender.</p>
            </div>
            <div className="col-lg-6">
              <h3>4. Mejora continua</h3>
              <p>Revisamos resultados y proponemos ajustes para mejorar.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-area pb-90 rpb-60">
        <div className="container">
          <div className="section-title mb-35">
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="row">
            {FAQS.map((item) => (
              <div className="col-lg-6" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="work-with-area pb-120 rpb-90 rel z-1">
        <div className="container">
          <div className="section-title text-center">
            <h2>¿Querés lanzar una landing y empezar a captar consultas?</h2>
            <p className="mt-15">Te ayudamos a publicar una primera versión clara, profesional y lista para crecer después.</p>
            <Link legacyBehavior href="/contact">
              <a className="theme-btn mt-25" data-cta="landing-page-contact">
                Solicitar landing para mi empresa <i className="fas fa-arrow-right" />
              </a>
            </Link>
            <div className="mt-20">
              <Link legacyBehavior href="/desarrollo-sitios-web-uruguay">
                <a className="read-more" data-cta="landing-page-money-page">
                  Ver servicio completo de desarrollo web para PYMEs <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

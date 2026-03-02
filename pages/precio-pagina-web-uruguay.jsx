import Link from "next/link";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Layout from "@/src/layout/Layout";
import PageBanner from "@/src/components/PageBanner";

const PLANS = [
  {
    title: "Landing profesional",
    range: "USD 200 a 450",
    description: "Ideal para empezar rápido y validar demanda con una propuesta concreta.",
    bullets: ["1 página", "Mensaje comercial + CTA", "Base para aparecer en Google"],
  },
  {
    title: "Sitio corporativo PYME",
    range: "USD 500 a 1.200",
    description: "Para empresas que necesitan credibilidad, estructura de servicios y captación constante.",
    bullets: ["4 a 8 secciones", "Arquitectura comercial", "Formulario + WhatsApp + analítica básica"],
  },
  {
    title: "Sitio escalable con integraciones",
    range: "Desde USD 1.300",
    description: "Para operaciones que requieren módulos, integraciones y plan de crecimiento por etapas.",
    bullets: ["Integraciones clave", "Automatizaciones", "Roadmap técnico y comercial"],
  },
];

const FAQS = [
  {
    q: "¿Por qué no hay un precio único para todos?",
    a: "Porque cada empresa tiene objetivos y alcance distintos. Definimos el precio según complejidad, contenidos e integraciones necesarias.",
  },
  {
    q: "¿Se puede empezar con una versión básica?",
    a: "Sí. Muchas veces es la mejor forma de empezar sin invertir de más y después sumar mejoras cuando haga falta.",
  },
  {
    q: "¿Incluye dominio y hosting?",
    a: "Podemos incluirlo en la propuesta para que tengas todo resuelto en un solo proveedor.",
  },
  {
    q: "¿El precio incluye mantenimiento?",
    a: "La implementación inicial y el mantenimiento son servicios distintos. Si lo necesitás, agregamos un plan mensual de mejora continua.",
  },
  {
    q: "¿Trabajan solo en Uruguay?",
    a: "Uruguay es prioridad. También acompañamos empresas que quieren escalar su presencia hacia LATAM.",
  },
  {
    q: "¿Qué hace subir o bajar el precio?",
    a: "Influyen la cantidad de secciones, el contenido disponible, el idioma, las integraciones necesarias y el nivel de personalización requerido.",
  },
  {
    q: "¿Qué conviene priorizar si el presupuesto es limitado?",
    a: "Conviene priorizar una web clara, que explique bien lo que hacés y que tenga un canal directo de contacto. Después se pueden sumar mejoras según cómo responda tu negocio.",
  },
];

export default function PrecioPaginaWebUruguayPage() {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/precio-pagina-web-uruguay`;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Precio de página web en Uruguay para PYMEs",
    description:
      "Rangos de precio para crear sitio web en Uruguay según etapa de negocio: landing, web corporativa y soluciones escalables para PYMEs.",
    about: {
      "@type": "Organization",
      name: "Software Strategy",
      url: siteBase,
    },
    inLanguage: "es",
    url: canonical,
  };
  const offerCatalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Rangos de precio para páginas web en Uruguay",
    itemListElement: PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.title,
      description: plan.description,
      category: "Desarrollo web para PYMEs",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: plan.range,
      },
    })),
  };

  return (
    <Layout dark locale="es">
      <NextSeo
        title="Cuánto cuesta una página web en Uruguay para una PYME"
        description="Conocé rangos reales de precio para una página web en Uruguay y qué opción conviene según la etapa actual de tu empresa."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: canonical },
          { hrefLang: "x-default", href: canonical },
        ]}
        openGraph={{
          url: canonical,
          type: "website",
          locale: "es_UY",
          title: "Cuánto cuesta una página web en Uruguay para una PYME | Software Strategy",
          description: "Rangos de inversión orientativos para definir la mejor base web según la etapa comercial de tu empresa.",
          siteName: "Software Strategy",
          images: DefaultSEO?.openGraph?.images || [],
        }}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: "Inicio", item: `${siteBase}/` },
          { position: 2, name: "Precio de página web en Uruguay", item: canonical },
        ]}
      />

      <FAQPageJsonLd
        mainEntity={FAQS.map((item) => ({
          questionName: item.q,
          acceptedAnswerText: item.a,
        }))}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogJsonLd) }} />

      <PageBanner pageName="Precio de página web en Uruguay" homeLabel="Inicio" homeHref="/" titleAs="div" />

      <section className="about-area pt-90 rpt-70 pb-30 rpb-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="section-title mb-30">
                <h1>¿Cuánto cuesta una página web en Uruguay para una PYME?</h1>
              </div>
              <p>
                Si sos PYME, la pregunta no es solo cuánto cuesta, sino qué necesitás hoy para empezar a recibir consultas sin invertir de más.
              </p>
              <p>
                Estos rangos te ayudan a decidir mejor según el momento de tu empresa. Si necesitás algo más completo, podés avanzar a una propuesta de desarrollo web pensada para vender mejor y crecer con una base más firme.
              </p>
              <p>
                Software Strategy es una empresa uruguaya que desarrolla sitios web y software a medida para PYMEs que necesitan mejorar su presencia digital y su operación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-area-three pb-80 rpb-50" style={{ backgroundImage: "url(/assets/images/background/pricing-bg-dot-shape.png)" }}>
        <div className="container container-1290">
          <div className="row">
            {PLANS.map((plan, i) => (
              <div className="col-xl-4 col-md-6" key={plan.title}>
                <div className={`pricing-plan-item ${i === 1 ? "style-two" : ""}`}>
                  <div className="icon-title">
                    <div className="icon">
                      <i className="fas fa-rocket" />
                    </div>
                    <h5>{plan.title}</h5>
                  </div>
                  <h3 className="mt-15">{plan.range}</h3>
                  <p className="mt-10">{plan.description}</p>
                  <ul className="list-style-one mt-10">
                    {plan.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-25">
            <div className="col-12">
              <p className="text-center">
                El precio final depende de cuántas secciones necesitás, si ya tenés contenido listo, si hace falta más de un idioma y si hay funciones o conexiones especiales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-area pb-90 rpb-60">
        <div className="container">
          <div className="section-title mb-35">
            <h2>Preguntas frecuentes sobre precios</h2>
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
            <h2>¿Querés una propuesta con alcance y precio claro?</h2>
            <p className="mt-15">Te compartimos una recomendación clara según lo que hoy necesita tu empresa.</p>
            <Link legacyBehavior href="/contact">
              <a className="theme-btn mt-25" data-cta="precio-web-contact">
                Solicitar propuesta con precio estimado <i className="fas fa-arrow-right" />
              </a>
            </Link>
            <div className="mt-20">
              <Link legacyBehavior href="/desarrollo-sitios-web-uruguay">
                <a className="read-more" data-cta="precio-web-money-page">
                  Ver desarrollo de sitios web para PYMEs en Uruguay <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

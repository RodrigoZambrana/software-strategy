import { useState } from "react";
import Link from "next/link";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Layout from "@/src/layout/Layout";
import PageBanner from "@/src/components/PageBanner";
import YgencyAccordionLite from "@/src/components/YgencyAccordionLite";
import { ArrowRightIcon, WhatsAppIcon } from "@/src/components/icons/SimpleIcons";

const FAQS = [
  {
    q: "¿Cuánto demora lanzar un sitio web para una PYME?",
    a: "En proyectos estándar, el rango habitual es de 3 a 6 semanas. El plazo final depende de alcance y contenidos disponibles.",
  },
  {
    q: "¿Qué opción conviene: landing, sitio corporativo o plan escalable?",
    a: "Depende de lo que necesite hoy tu empresa. Si recién empezás, conviene una landing. Si necesitás mostrar mejor tus servicios y generar más confianza, conviene un sitio corporativo. Si después querés sumar funciones o integraciones, podés pasar a una opción más completa.",
  },
  {
    q: "¿Qué inversión inicial necesita una PYME en Uruguay?",
    a: "Depende del alcance. Una landing puede empezar desde USD 200, un sitio corporativo desde USD 500 y una base escalable desde USD 1.300.",
  },
  {
    q: "¿El sitio queda listo para aparecer en Google?",
    a: "Sí. Incluimos estructura clara, metadatos y contenido base para que Google entienda tu empresa desde el inicio.",
  },
  {
    q: "¿Qué pasa si ya tengo una web pero no funciona?",
    a: "Primero evaluamos si conviene mejorar la web actual o avanzar directamente con una nueva estructura. Si la base existente limita demasiado, recomendamos rediseñar sobre una base más sólida.",
  },
  {
    q: "¿Qué necesito entregar para empezar el proyecto?",
    a: "Lo ideal es contar con una explicación clara de tus servicios, referencias de tu negocio, datos de contacto y material visual básico. Si falta parte de eso, te ayudamos a ordenarlo.",
  },
  {
    q: "¿Puedo comenzar con algo simple y ampliarlo después?",
    a: "Sí. Podemos arrancar con una versión simple y dejar el sitio preparado para sumar secciones, contenidos o funciones más adelante.",
  },
];

const BENEFIT_BLOCKS = [
  {
    title: "Mensaje comercial claro",
    description: "Tu empresa explica mejor qué hace, a quién ayuda y por qué conviene escribirte.",
  },
  {
    title: "Base para aparecer en Google",
    description: "Los títulos, los textos y la estructura ayudan a que Google entienda tu negocio desde el primer día.",
  },
  {
    title: "Contacto visible y medible",
    description: "Formulario y WhatsApp quedan integrados para transformar visitas en consultas comerciales reales.",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Objetivo principal",
    landing: "Empezar rápido",
    corporate: "Posicionarte profesionalmente",
    scalable: "Escalar con integraciones",
  },
  {
    feature: "Ideal para",
    landing: "Empresas sin web",
    corporate: "PYMEs con oferta definida",
    scalable: "Operaciones en crecimiento",
  },
  {
    feature: "Tiempo estimado",
    landing: "2 a 3 semanas",
    corporate: "3 a 6 semanas",
    scalable: "Por etapas",
  },
  {
    feature: "Inversión referencial",
    landing: "Desde USD 200",
    corporate: "Desde USD 500",
    scalable: "Desde USD 1.300",
  },
];

const OFFER_CATALOG_ITEMS = [
  {
    name: "Landing para empezar",
    description: "Opción inicial para empresas que necesitan una primera presencia profesional y empezar a recibir consultas.",
    price: "200",
    url: "/landing-page-uruguay",
  },
  {
    name: "Sitio corporativo",
    description: "Sitio web para PYMEs que necesitan mostrar mejor sus servicios y generar más confianza.",
    price: "500",
    url: "/desarrollo-sitios-web-uruguay",
  },
  {
    name: "Plan escalable",
    description: "Base más completa para empresas que después quieren sumar funciones o integraciones.",
    price: "1300",
    url: "/desarrollo-sitios-web-uruguay",
  },
];

const RESULT_CASES = [
  {
    title: "Servicios profesionales",
    metric: "+42% consultas en 90 días",
    description: "Pasó de depender solo de redes a recibir contactos desde Google y formulario web.",
  },
  {
    title: "Comercio local",
    metric: "+58% contactos calificados",
    description: "Se mejoró estructura del sitio y CTA para aumentar intención de compra.",
  },
  {
    title: "Empresa sin sitio previo",
    metric: "Primera consulta en 12 días",
    description: "Lanzó presencia digital inicial orientada a confianza y captación comercial.",
  },
];

export default function DesarrolloSitiosWebUruguayPage() {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/desarrollo-sitios-web-uruguay`;
  const whatsappHref = "https://wa.me/59898488759?text=Hola%20Software%20Strategy%2C%20quiero%20consultar%20por%20un%20sitio%20web%20para%20mi%20empresa.";
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo de sitios web profesionales para PYMEs en Uruguay",
    serviceType: "Desarrollo de sitios web para PYMEs",
    description:
      "Diseño y desarrollo de sitios web profesionales para PYMEs en Uruguay, orientado a claridad comercial, presencia en Google y generación de consultas reales.",
    areaServed: {
      "@type": "Country",
      name: "Uruguay",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "PYMEs",
    },
    provider: {
      "@type": "Organization",
      name: "Software Strategy",
      url: siteBase,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Opciones de desarrollo web para PYMEs",
      itemListElement: OFFER_CATALOG_ITEMS.map((item) => ({
        "@type": "Offer",
        url: `${siteBase}${item.url}`,
        priceCurrency: "USD",
        price: item.price,
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.description,
          areaServed: { "@type": "Country", name: "Uruguay" },
        },
      })),
    },
    inLanguage: "es",
    url: canonical,
  };

  const offerCatalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Planes de desarrollo web para PYMEs en Uruguay",
    url: canonical,
    itemListElement: OFFER_CATALOG_ITEMS.map((item) => ({
      "@type": "Offer",
      url: `${siteBase}${item.url}`,
      priceCurrency: "USD",
      price: item.price,
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        areaServed: { "@type": "Country", name: "Uruguay" },
      },
    })),
  };

  return (
    <Layout dark locale="es">
      <NextSeo
        title="Desarrollo de sitios web para PYMEs en Uruguay | Aparecé en Google y generá consultas"
        description="Creamos sitios web para PYMEs en Uruguay que necesitan transmitir confianza, aparecer en Google y convertir visitas en consultas comerciales."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: canonical },
          { hrefLang: "x-default", href: canonical },
        ]}
        openGraph={{
          url: canonical,
          type: "website",
          locale: "es_UY",
          title: "Desarrollo de Sitios Web para PYMEs en Uruguay | Software Strategy",
          description:
            "Sitios web profesionales para PYMEs con foco en Uruguay y alcance LATAM, orientados a visibilidad en Google y generación de oportunidades comerciales.",
          siteName: "Software Strategy",
          images: DefaultSEO?.openGraph?.images || [],
        }}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: "Inicio", item: `${siteBase}/` },
          { position: 2, name: "Desarrollo de sitios web para PYMEs en Uruguay", item: canonical },
        ]}
      />

      <FAQPageJsonLd
        mainEntity={FAQS.map((item) => ({
          questionName: item.q,
          acceptedAnswerText: item.a,
        }))}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogJsonLd) }} />

      <PageBanner pageName="Desarrollo de sitios web para PYMEs en Uruguay" homeLabel="Inicio" homeHref="/" />

      <section className="about-area pt-90 rpt-70 pb-60 rpb-30">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title mb-25">
                <h2>¿Qué mejora en tu empresa con un sitio web bien planteado?</h2>
              </div>
              <p>
                Si hoy tu empresa no aparece bien en Google o depende solo de redes sociales, estás perdiendo consultas antes de hablar con un cliente. Desarrollamos sitios web para PYMEs en Uruguay pensados para transmitir confianza, ordenar tu propuesta comercial y generar oportunidades reales.
              </p>
              <p>
                Software Strategy es una empresa uruguaya que desarrolla sitios web y software a medida para PYMEs que necesitan mejorar su presencia digital y su operación.
              </p>
              <ul className="list-style-one mt-15">
                <li>Queda claro en segundos qué hace tu empresa y por qué conviene contactarla.</li>
                <li>Formulario y WhatsApp visibles para generar consultas reales.</li>
                <li>Base preparada para crecer en Uruguay.</li>
              </ul>
              <Link legacyBehavior href="/contact">
                <a className="theme-btn mt-25" data-cta="money-page-web-top-contact" title="Solicitar propuesta para mi empresa">
                  Quiero una propuesta para mi empresa <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="text-center mt-30 mt-lg-0">
                <img
                  src="/assets/images/services/what-we-do.jpg"
                  alt="Desarrollo web para PYMEs en Uruguay"
                  title="Desarrollo web para PYMEs en Uruguay"
                  width="650"
                  height="905"
                  style={{ maxWidth: "100%", borderRadius: 10 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-three-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title text-center mb-40">
            <h2>Qué incluye un sitio web pensado para vender</h2>
          </div>
          <div className="row">
            {BENEFIT_BLOCKS.map((item) => (
              <div className="col-md-4" key={item.title}>
                <div className="service-three-item">
                  <div className="content">
                    <h5>{item.title}</h5>
                    <p className="mb-0">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-comparison-area pb-80 rpb-50">
        <div className="container">
          <div className="section-title text-center mb-35">
            <h2>Compará opciones según tu etapa</h2>
            <p className="mt-15">Acá tenés una comparación rápida para elegir la mejor opción según tu objetivo y presupuesto.</p>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>Landing para empezar</th>
                  <th>Sitio corporativo</th>
                  <th>Plan escalable</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td className="text-start">{row.feature}</td>
                    <td>{row.landing}</td>
                    <td>{row.corporate}</td>
                    <td>{row.scalable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row mt-20">
            <div className="col-md-4 mb-15">
              <Link legacyBehavior href="/landing-page-uruguay">
                <a className="theme-btn w-100" data-cta="money-page-web-table-landing" title="Ver opción Landing">
                  Ver opción Landing <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
            <div className="col-md-4 mb-15">
              <Link legacyBehavior href="/crear-sitio-web-uruguay">
                <a className="theme-btn w-100" data-cta="money-page-web-table-corporate" title="Ver opción corporativa">
                  Ver opción Corporativa <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
            <div className="col-md-4 mb-15">
              <Link legacyBehavior href="/precio-pagina-web-uruguay">
                <a className="theme-btn w-100" data-cta="money-page-web-table-scalable" title="Ver rangos de inversión">
                  Ver rangos de inversión <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="project-timeline-two-area process-steps-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title text-center mb-35">
            <h2>Proceso simple en 4 pasos</h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="project-timeline-two">
                <span className="serial-number">01</span>
                <h4>Diagnóstico</h4>
                <p>Definimos qué querés lograr y a quién querés llegar.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="project-timeline-two">
                <span className="serial-number">02</span>
                <h4>Estructura</h4>
                <p>Organizamos mensajes y secciones para convertir mejor.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="project-timeline-two">
                <span className="serial-number">03</span>
                <h4>Desarrollo</h4>
                <p>Construimos un sitio claro, rápido y confiable.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="project-timeline-two">
                <span className="serial-number">04</span>
                <h4>Lanzamiento</h4>
                <p>Publicamos y dejamos la base lista para sumar mejoras después.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resultados-reales" className="service-three-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title text-center mb-40">
            <h2>Resultados reales en proyectos similares</h2>
          </div>
          <div className="row">
            {RESULT_CASES.map((item) => (
              <div className="col-md-4" key={item.title}>
                <div className="service-three-item">
                  <div className="content">
                    <h5>{item.title}</h5>
                    <h3 className="mt-10">{item.metric}</h3>
                    <p className="mt-10 mb-0">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-25">
            <Link legacyBehavior href="/mantenimiento-web-uruguay">
              <a className="read-more" data-cta="money-page-web-maintenance-link" title="Ver mantenimiento web en Uruguay">
                ¿Ya tenés web pero no funciona bien? Ver mantenimiento web en Uruguay <i className="fas fa-arrow-right" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section className="faq-area pb-90 rpb-60">
        <div className="container">
          <div className="row align-items-center gap-100">
            <div className="col-lg-5">
              <div className="faq-iamge-part rmb-55 wow fadeInLeft delay-0-2s">
                <img
                  src="/assets/images/faqs/faq-two.jpg"
                  alt="Preguntas frecuentes sobre desarrollo web para PYMEs en Uruguay"
                  title="Preguntas frecuentes sobre desarrollo web para PYMEs en Uruguay"
                  width="520"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="faq-content-part wow fadeInRight delay-0-2s">
                <div className="section-title text-center mb-35">
                  <h2>Preguntas clave antes de contratar</h2>
                </div>
                <div className="accordion" id="money-page-faq-accordion">
                  {FAQS.map((item, index) => (
                    <YgencyAccordionLite
                      key={item.q}
                      title={item.q}
                      isOpen={openFaqIndex === index}
                      onToggle={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                    >
                      <p>{item.a}</p>
                    </YgencyAccordionLite>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-20">
            <p className="mb-15">¿Aún tenés dudas? Podés ver más respuestas o escribirnos por WhatsApp.</p>
            <Link legacyBehavior href="/faqs">
              <a className="theme-btn" data-cta="money-page-web-faqs-link" title="Ver preguntas frecuentes">
                Ver preguntas frecuentes <ArrowRightIcon className="cta-icon" />
              </a>
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="theme-btn style-two ml-15"
              title="Contactar por WhatsApp"
              data-cta="money-page-web-whatsapp-link"
            >
              Contactar por WhatsApp <WhatsAppIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="work-with-area pb-120 rpb-90 rel z-1">
        <div className="container">
          <div className="section-title text-center">
            <h2>¿Querés que tu empresa aparezca en Google y empiece a recibir consultas reales?</h2>
            <p className="mt-15">
              Escribinos y te mostramos qué tipo de sitio conviene hoy para tu empresa.
            </p>
            <Link legacyBehavior href="/contact">
              <a className="theme-btn mt-25" data-cta="money-page-web-contact" title="Quiero aparecer en Google y recibir consultas">
                Quiero aparecer en Google y recibir consultas <i className="fas fa-arrow-right" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .process-steps-area .project-timeline-two {
          display: block;
          padding: 24px 22px;
          margin-bottom: 24px;
          border: 1px solid #222222;
          border-radius: 10px;
        }
        .process-steps-area .project-timeline-two .serial-number {
          display: inline-block;
          margin-bottom: 14px;
          font-size: 18px;
          line-height: 1;
        }
        .process-steps-area .project-timeline-two h4 {
          margin: 0 0 10px 0;
          max-width: 100%;
          font-size: 22px;
          line-height: 1.3;
        }
        .process-steps-area .project-timeline-two p {
          margin: 0;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.55;
        }
        .faq-content-part :global(.accordion-item) {
          margin-bottom: 16px;
          border: 1px solid #222222;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
        }
        .faq-content-part :global(.accordion-button) {
          padding: 20px 24px;
          background: transparent;
          border: 0;
          color: #ffffff;
          font-size: 22px;
          font-weight: 600;
          text-align: left;
        }
        .faq-content-part :global(.accordion-title) {
          display: block;
          padding-right: 12px;
          line-height: 1.35;
        }
        .faq-content-part :global(.accordion-body) {
          padding: 0 24px 20px;
        }
        .faq-content-part :global(.accordion-body p) {
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.65;
        }
      `}</style>
    </Layout>
  );
}

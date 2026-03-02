import Link from "next/link";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Layout from "@/src/layout/Layout";
import PageBanner from "@/src/components/PageBanner";

const FAQS = [
  {
    q: "¿Qué incluye un servicio de mantenimiento web?",
    a: "Incluye actualizaciones, mejoras de rendimiento, ajustes de contenido, revisión de seguridad y soporte según el plan acordado.",
  },
  {
    q: "¿Pueden mejorar una web vieja sin rehacerla completa?",
    a: "Sí. Priorizamos mejoras de alto impacto para recuperar resultados rápidamente y luego definimos si conviene una renovación completa.",
  },
  {
    q: "¿Sirve para sitios desarrollados por otra agencia?",
    a: "Sí. Trabajamos con sitios existentes aunque hayan sido desarrollados por otro proveedor.",
  },
  {
    q: "¿Cuánto tarda ver mejoras?",
    a: "Los primeros ajustes técnicos y de contenido suelen verse dentro de las primeras semanas de trabajo.",
  },
  {
    q: "¿Está orientado solo a Uruguay?",
    a: "Uruguay es la prioridad. También dejamos la base lista por si más adelante querés ampliar tu alcance a otros mercados de LATAM.",
  },
  {
    q: "¿Cuándo conviene rehacer el sitio en lugar de mantenerlo?",
    a: "Cuando la estructura actual limita demasiado el crecimiento, la experiencia del usuario o la visibilidad en Google. En ese caso conviene pasar a una solución de desarrollo web más completa.",
  },
];

export default function MantenimientoWebUruguayPage() {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/mantenimiento-web-uruguay`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mantenimiento web en Uruguay para PYMEs",
    serviceType: "Mantenimiento y optimización de sitios web",
    description:
      "Servicio de mantenimiento web para PYMEs en Uruguay: actualizaciones y mejoras para que una web vieja vuelva a transmitir confianza y recibir consultas.",
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
        title="Mantenimiento web en Uruguay para mejorar una web obsoleta"
        description="Mejoramos sitios web obsoletos en Uruguay para recuperar claridad, confianza y consultas comerciales sin rehacer todo desde cero."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: canonical },
          { hrefLang: "x-default", href: canonical },
        ]}
        openGraph={{
          url: canonical,
          type: "website",
          locale: "es_UY",
          title: "Mantenimiento web en Uruguay para mejorar una web obsoleta | Software Strategy",
          description: "Actualizamos y optimizamos webs obsoletas para volver a generar consultas comerciales en Uruguay.",
          siteName: "Software Strategy",
          images: DefaultSEO?.openGraph?.images || [],
        }}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: "Inicio", item: `${siteBase}/` },
          { position: 2, name: "Mantenimiento web en Uruguay", item: canonical },
        ]}
      />

      <FAQPageJsonLd
        mainEntity={FAQS.map((item) => ({
          questionName: item.q,
          acceptedAnswerText: item.a,
        }))}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageBanner pageName="Mantenimiento web en Uruguay" homeLabel="Inicio" homeHref="/" titleAs="div" />

      <section className="about-area pt-90 rpt-70 pb-30 rpb-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="section-title mb-30">
                <h1>Mantenimiento web en Uruguay para recuperar resultados sin rehacer todo</h1>
              </div>
              <p>
                Muchas PYMEs ya tienen un sitio publicado, pero lento, desordenado o con mensajes que no ayudan a vender. Eso afecta la confianza y hace que la web deje de generar consultas.
              </p>
              <p>
                Con este servicio mejoramos lo que ya existe, priorizando los cambios de mayor impacto. Si el sitio actual no da más, te orientamos hacia el servicio completo de desarrollo web para PYMEs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-area pb-80 rpb-50">
        <div className="container">
          <div className="section-title mb-35">
            <h2>¿Qué mejoramos en una web obsoleta?</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-style-one">
                <li>Velocidad y estabilidad del sitio.</li>
                <li>Textos y estructura para que el cliente entienda rápido.</li>
                <li>Llamados a la acción visibles y claros.</li>
                <li>Base para aparecer mejor en Google.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-style-one">
                <li>Actualización de secciones clave y contenidos.</li>
                <li>Ajustes técnicos para reducir errores y fricciones.</li>
                <li>Integración de formulario y WhatsApp para contacto.</li>
                <li>Plan mensual de mejora continua (opcional).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="project-timeline-two-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title mb-35">
            <h2>¿Cómo se implementa?</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h3>1. Diagnóstico inicial</h3>
            <p>Detectamos qué está frenando los contactos y qué hace que la web hoy no rinda.</p>
            </div>
            <div className="col-lg-6">
              <h3>2. Prioridad de mejoras</h3>
              <p>Ordenamos cambios por impacto para mostrar resultados más rápido.</p>
            </div>
            <div className="col-lg-6">
              <h3>3. Implementación por etapas</h3>
              <p>Aplicamos mejoras por partes para no complicar el día a día de tu empresa.</p>
            </div>
            <div className="col-lg-6">
              <h3>4. Seguimiento</h3>
              <p>Medimos avances y proponemos próximos pasos de crecimiento.</p>
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
            <h2>¿Querés recuperar resultados sin rehacer todo tu sitio?</h2>
            <p className="mt-15">Te proponemos un plan simple y realista para mejorar tu web actual.</p>
            <Link legacyBehavior href="/contact">
              <a className="theme-btn mt-25" data-cta="mantenimiento-web-contact">
                Solicitar diagnóstico de mi web actual <i className="fas fa-arrow-right" />
              </a>
            </Link>
            <div className="mt-20">
              <Link legacyBehavior href="/desarrollo-sitios-web-uruguay">
                <a className="read-more" data-cta="mantenimiento-web-money-page">
                  Ver desarrollo web completo para PYMEs <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Link from "next/link";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Layout from "@/src/layout/Layout";
import PageBanner from "@/src/components/PageBanner";

const FAQS = [
  {
    q: "¿Cuánto demora crear un sitio web para una PYME en Uruguay?",
    a: "En la mayoría de los casos entre 3 y 6 semanas, según cantidad de secciones, contenidos e integraciones requeridas.",
  },
  {
    q: "¿Puedo empezar con algo simple y mejorar después?",
    a: "Sí. Podés empezar con una versión simple y después sumar mejoras según cómo responda tu negocio.",
  },
  {
    q: "¿El sitio queda preparado para aparecer en Google?",
    a: "Sí. Incluimos estructura, metadatos y contenidos base para que Google entienda claramente tu negocio.",
  },
  {
    q: "¿Trabajan solo en Uruguay?",
    a: "Uruguay es la prioridad comercial. También acompañamos empresas que luego quieran escalar a otros mercados de LATAM.",
  },
  {
    q: "¿Incluyen soporte luego de publicar?",
    a: "Sí. Podemos incluir mantenimiento, ajustes de contenido y mejoras continuas según objetivos.",
  },
  {
    q: "¿Cuándo conviene pasar al servicio completo de desarrollo web?",
    a: "Cuando necesitás más secciones, explicar mejor tus servicios o tener una base más completa para aparecer en Google y recibir más consultas.",
  },
];

export default function CrearSitioWebUruguayPage() {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/crear-sitio-web-uruguay`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Primer sitio web profesional para empresas en Uruguay",
    serviceType: "Desarrollo inicial de sitios web para PYMEs",
    description:
      "Creamos el primer sitio web profesional para empresas en Uruguay que necesitan dejar de depender solo de redes sociales y empezar a recibir consultas reales.",
    areaServed: { "@type": "Country", name: "Uruguay" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "PYMEs",
    },
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
        title="Crear sitio web para tu empresa en Uruguay | Primera presencia profesional"
        description="Creamos sitios web para empresas en Uruguay que necesitan dejar de depender solo de redes sociales y empezar a recibir consultas reales."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: canonical },
          { hrefLang: "x-default", href: canonical },
        ]}
        openGraph={{
          url: canonical,
          type: "website",
          locale: "es_UY",
          title: "Crear sitio web para tu empresa en Uruguay | Software Strategy",
          description:
            "Primer sitio web profesional para empresas en Uruguay, pensado para ganar credibilidad y generar consultas reales.",
          siteName: "Software Strategy",
          images: DefaultSEO?.openGraph?.images || [],
        }}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: "Inicio", item: `${siteBase}/` },
          { position: 2, name: "Crear sitio web en Uruguay", item: canonical },
        ]}
      />

      <FAQPageJsonLd
        mainEntity={FAQS.map((item) => ({
          questionName: item.q,
          acceptedAnswerText: item.a,
        }))}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageBanner pageName="Crear sitio web para tu empresa en Uruguay" homeLabel="Inicio" homeHref="/" titleAs="div" />

      <section className="about-area pt-90 rpt-70 pb-30 rpb-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="section-title mb-30">
                <h1>Crear sitio web en Uruguay para empezar a recibir consultas reales</h1>
              </div>
              <p>
                Si tu empresa todavía no tiene sitio web, esta es una forma clara y rentable de empezar. Creamos una presencia profesional para que tu negocio gane credibilidad, aparezca mejor en Google y tenga un canal propio de contacto.
              </p>
              <p>
                Software Strategy es una empresa uruguaya que desarrolla sitios web y software a medida para PYMEs que necesitan mejorar su presencia digital y su operación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-area pb-80 rpb-50">
        <div className="container">
          <div className="section-title mb-35">
            <h2>¿Qué incluye esta primera versión de tu sitio?</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-style-one">
                <li>Estructura clara para que más visitas se conviertan en consultas.</li>
                <li>Textos claros para que el cliente entienda rápido qué hacés.</li>
                <li>Base para aparecer en Google con contenidos y metadatos correctos.</li>
                <li>Diseño adaptable a celulares, tablets y desktop.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-style-one">
                <li>Formulario y WhatsApp integrados para contacto directo.</li>
                <li>Publicación con dominio y hosting configurados.</li>
                <li>Acompañamiento inicial para ajustes post-lanzamiento.</li>
                <li>Plan simple para sumar mejoras más adelante.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="project-timeline-two-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title mb-35">
            <h2>¿Cómo trabajamos?</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h3>1. Diagnóstico comercial</h3>
              <p>Entendemos qué ofrecés, a quién querés llegar y qué resultado buscás.</p>
            </div>
            <div className="col-lg-6">
              <h3>2. Estructura y mensaje</h3>
              <p>Definimos secciones, textos y llamados a la acción para que te entiendan rápido.</p>
            </div>
            <div className="col-lg-6">
              <h3>3. Diseño y desarrollo</h3>
              <p>Construimos el sitio con foco en confianza, claridad y conversión.</p>
            </div>
            <div className="col-lg-6">
              <h3>4. Publicación y mejora</h3>
              <p>Lanzamos, medimos resultados y proponemos mejoras por etapas.</p>
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
            <h2>¿Listo para crear tu sitio web en Uruguay?</h2>
            <p className="mt-15">Te proponemos una primera versión clara, profesional y fácil de ampliar después.</p>
            <Link legacyBehavior href="/contact">
              <a className="theme-btn mt-25" data-cta="crear-uruguay-contact">
                Solicitar propuesta para mi empresa <i className="fas fa-arrow-right" />
              </a>
            </Link>
            <div className="mt-20">
              <Link legacyBehavior href="/precio-pagina-web-uruguay">
                <a className="read-more" data-cta="crear-uruguay-precio">
                  Ver rangos de precio para sitio web en Uruguay <i className="fas fa-arrow-right" />
                </a>
              </Link>
              <div className="mt-15">
                <Link legacyBehavior href="/desarrollo-sitios-web-uruguay">
                  <a className="read-more" data-cta="crear-uruguay-main-service">
                    Ver servicio completo de desarrollo web para PYMEs <i className="fas fa-arrow-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

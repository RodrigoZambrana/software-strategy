import Link from "next/link";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Layout from "@/src/layout/Layout";
import PageBanner from "@/src/components/PageBanner";

const FAQS = [
  {
    q: "¿Desarrollan software de facturación y stock para comercios en Uruguay?",
    a: "Sí. Diseñamos sistemas a medida para facturación, control de inventario, compras, ventas y reportes de gestión según el flujo real del negocio.",
  },
  {
    q: "¿Se puede integrar con e-commerce, POS o contabilidad?",
    a: "Sí. Implementamos integraciones con pasarelas de pago, tiendas online, puntos de venta y herramientas contables mediante APIs.",
  },
  {
    q: "¿Qué diferencia hay entre un sistema gratis y uno a medida?",
    a: "Un sistema gratis sirve para casos simples. Cuando la operación crece, suele faltar integración, trazabilidad y control. El software a medida prioriza procesos críticos y escalabilidad.",
  },
  {
    q: "¿Cómo es la implementación?",
    a: "Trabajamos por etapas: discovery, diseño funcional, desarrollo modular, pruebas y despliegue. Así reducimos riesgo y aceleramos resultados.",
  },
  {
    q: "¿Incluye soporte y mejoras continuas?",
    a: "Sí. Podemos incluir soporte evolutivo para sumar funcionalidades, optimizar procesos y acompañar el crecimiento de la empresa.",
  },
];

export default function SoftwareFacturacionStockUruguayPage() {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/software-facturacion-stock-uruguay`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Software de facturación y stock para PYMEs en Uruguay",
    serviceType: "Software de gestión empresarial",
    description:
      "Desarrollo de software a medida para facturación, inventario y gestión comercial en PYMEs con foco en Uruguay y alcance LATAM. Integraciones, automatización y reportes operativos.",
    areaServed: {
      "@type": "Country",
      name: "Uruguay",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "PYMEs y comercios",
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
        title="Software de Facturación y Stock para PYMEs en Uruguay"
        description="Desarrollamos software de facturación, stock e inventario para comercios y PYMEs con foco en Uruguay y atención en LATAM. Integrá ventas, compras, caja y reportes en un solo sistema."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: canonical },
          { hrefLang: "x-default", href: canonical },
        ]}
        openGraph={{
          url: canonical,
          type: "website",
          locale: "es_UY",
          title: "Software de Facturación y Stock para PYMEs en Uruguay | Software Strategy",
          description:
            "Sistemas de facturación, inventario y gestión comercial para PYMEs con foco en Uruguay y alcance LATAM, implementados por etapas.",
          siteName: "Software Strategy",
          images: DefaultSEO?.openGraph?.images || [],
        }}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: "Inicio", item: `${siteBase}/` },
          { position: 2, name: "Software de facturación y stock para PYMEs en Uruguay", item: canonical },
        ]}
      />

      <FAQPageJsonLd
        mainEntity={FAQS.map((item) => ({
          questionName: item.q,
          acceptedAnswerText: item.a,
        }))}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageBanner pageName="Software de facturación y stock para PYMEs en Uruguay" homeLabel="Inicio" homeHref="/" />

      <section className="about-area pt-90 rpt-70 pb-30 rpb-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="section-title mb-30">
                <h2>Dejá de perder tiempo y dinero por falta de control en facturación y stock</h2>
              </div>
              <p>
                Si tu operación depende de planillas y sistemas desconectados, es normal que aparezcan errores de stock,
                diferencias de caja y demoras en la gestión diaria.
              </p>
              <p>
                Desarrollamos software para PYMEs de Uruguay y LATAM que integra ventas, compras, inventario, facturación y reportes
                en una sola plataforma, con foco en eficiencia, trazabilidad y escalabilidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-area pb-80 rpb-50">
        <div className="container">
          <div className="section-title mb-35">
            <h2>¿Qué te permite resolver este sistema?</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h3 className="mb-10">Módulos frecuentes</h3>
              <ul className="list-style-one">
                <li>Facturación y stock sincronizados para evitar quiebres y sobreventas.</li>
                <li>Control de compras, costos y márgenes en tiempo real.</li>
                <li>Gestión de almacén con alertas automáticas de reposición.</li>
                <li>Reportes clave para decidir con datos y no por intuición.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h3 className="mb-10">Resultados esperados</h3>
              <ul className="list-style-one">
                <li>Menos errores operativos y menor pérdida de tiempo del equipo.</li>
                <li>Mayor control financiero y visibilidad del negocio.</li>
                <li>Procesos más ágiles en ventas, caja y reposición.</li>
                <li>Base tecnológica lista para escalar nuevos puntos o canales.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="project-timeline-two-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title mb-35">
            <h2>Implementación por etapas</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h3>1. Diagnóstico operativo</h3>
              <p>Relevamos procesos de facturación, stock, compras y ventas para definir prioridades reales.</p>
            </div>
            <div className="col-lg-6">
              <h3>2. Diseño funcional</h3>
              <p>Modelamos flujos, usuarios, permisos e integraciones antes de desarrollar.</p>
            </div>
            <div className="col-lg-6">
              <h3>3. Desarrollo modular</h3>
              <p>Lanzamos primero lo crítico (facturación e inventario) y luego ampliamos según objetivos.</p>
            </div>
            <div className="col-lg-6">
              <h3>4. Capacitación y soporte</h3>
              <p>Acompañamos la adopción y optimizamos el sistema con mejoras continuas.</p>
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
            <h2>¿Querés un sistema de facturación y stock adaptado a tu operación?</h2>
            <p className="mt-15">Coordinemos una reunión y definimos alcance, etapas y plan de implementación.</p>
            <Link legacyBehavior href="/contact">
              <a className="theme-btn mt-25" data-cta="facturacion-stock-contact">
                Solicitar diagnóstico operativo <i className="fas fa-arrow-right" />
              </a>
            </Link>
            <div className="mt-20">
              <Link legacyBehavior href="/desarrollo-software-medida-uruguay">
                <a className="read-more" data-cta="facturacion-stock-software-main">
                  Ver desarrollo de software a medida en Uruguay <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

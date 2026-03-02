import Link from "next/link";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Layout from "@/src/layout/Layout";
import PageBanner from "@/src/components/PageBanner";

const FAQS = [
  {
    q: "¿Cuándo conviene desarrollar software a medida en una PYME?",
    a: "Cuando las planillas o herramientas genéricas ya no alcanzan y empiezan a hacerte perder tiempo, control o dinero.",
  },
  {
    q: "¿Cómo se define el alcance y presupuesto?",
    a: "Primero vemos qué problema hace más ruido hoy en tu empresa. Después definimos qué conviene resolver primero y cómo avanzar sin sobredimensionar el proyecto.",
  },
  {
    q: "¿Pueden integrar el software con sistemas existentes?",
    a: "Sí. Diseñamos integraciones con APIs, ERPs, CRMs, pasarelas de pago y otras plataformas según el caso.",
  },
  {
    q: "¿Trabajan con MVP para reducir riesgo?",
    a: "Sí. Recomendamos comenzar con un MVP para validar valor de negocio y después escalar por módulos.",
  },
  {
    q: "¿Incluyen soporte y evolución posterior?",
    a: "Sí. Podemos incluir mantenimiento, mejoras continuas y nuevas funcionalidades según evolución del negocio.",
  },
  {
    q: "¿Cuándo no conviene desarrollar software a medida?",
    a: "Cuando una herramienta estándar ya resuelve bien el proceso y el costo de personalizar no se justifica. Primero evaluamos si conviene adaptar una solución existente o desarrollar algo propio.",
  },
  {
    q: "¿Qué módulo conviene resolver primero?",
    a: "Conviene empezar por el módulo que hoy genera más fricción operativa o pérdida de tiempo: ventas, stock, aprobaciones, trazabilidad o integraciones críticas.",
  },
  {
    q: "¿Qué tipo de empresa obtiene retorno más rápido?",
    a: "Las empresas que ya manejan bastante movimiento, repiten muchas tareas manuales o tienen información desordenada suelen notar más rápido el ahorro de tiempo y el mejor control.",
  },
];

const BUSINESS_CASES = [
  {
    title: "Comercios y distribución",
    text: "Cuando hay ventas, stock, precios y movimientos que hoy se resuelven entre planillas, WhatsApp y sistemas desconectados.",
  },
  {
    title: "Empresas de servicios",
    text: "Cuando el seguimiento de clientes, tareas, aprobaciones o reportes depende demasiado de trabajo manual.",
  },
  {
    title: "Operaciones con varias áreas",
    text: "Cuando administración, ventas y operaciones necesitan ver la misma información sin duplicaciones ni errores.",
  },
  {
    title: "Negocios en expansión",
    text: "Cuando el crecimiento empieza a exigir conexiones entre sistemas, menos trabajo manual y más control del día a día.",
  },
];

export default function DesarrolloSoftwareMedidaUruguayPage() {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/desarrollo-software-medida-uruguay`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo de software a medida para empresas en Uruguay",
    serviceType: "Desarrollo de software a medida",
    description:
      "Implementamos software a medida para empresas en Uruguay: automatización, integraciones y paneles internos para trabajar con más orden y control.",
    areaServed: {
      "@type": "Country",
      name: "Uruguay",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Empresas y PYMEs",
    },
    provider: {
      "@type": "Organization",
      name: "Software Strategy",
      url: siteBase,
    },
    additionalType: [
      "https://schema.org/Automation",
      "https://schema.org/APIReference",
    ],
    serviceOutput: [
      "Integraciones entre sistemas",
      "Automatización de procesos",
      "Backoffice operativo",
    ],
    inLanguage: "es",
    url: canonical,
  };

  return (
    <Layout dark locale="es">
      <NextSeo
        title="Desarrollo de software a medida en Uruguay | Automatización, integraciones y backoffice"
        description="Desarrollamos software a medida para empresas de Uruguay que necesitan automatizar procesos, integrar sistemas y escalar con más control operativo."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: canonical },
          { hrefLang: "x-default", href: canonical },
        ]}
        openGraph={{
          url: canonical,
          type: "website",
          locale: "es_UY",
          title: "Desarrollo de Software a Medida en Uruguay | Software Strategy",
          description:
            "Software a medida para empresas en Uruguay orientado a automatización, integraciones y control operativo.",
          siteName: "Software Strategy",
          images: DefaultSEO?.openGraph?.images || [],
        }}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: "Inicio", item: `${siteBase}/` },
          { position: 2, name: "Desarrollo de software a medida en Uruguay", item: canonical },
        ]}
      />

      <FAQPageJsonLd
        mainEntity={FAQS.map((item) => ({
          questionName: item.q,
          acceptedAnswerText: item.a,
        }))}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageBanner pageName="Desarrollo de software a medida en Uruguay" homeLabel="Inicio" homeHref="/" />

      <section className="about-area pt-90 rpt-70 pb-30 rpb-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="section-title mb-30">
                <h2>Cuando tu operación crece, el software genérico empieza a frenarte</h2>
              </div>
              <p>
                Cuando una empresa crece, las planillas, los procesos manuales y las herramientas sueltas empiezan a hacer perder tiempo y control. En Software Strategy desarrollamos software a medida en Uruguay para ordenar tareas, conectar sistemas y trabajar con más claridad.
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
            <h2>¿Qué resolvemos con software a medida?</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h3 className="mb-10">Problemas operativos frecuentes</h3>
              <ul className="list-style-one">
                <li>Procesos críticos que dependen de planillas o tareas manuales.</li>
                <li>Información duplicada o desordenada entre diferentes plataformas.</li>
                <li>Falta de control para detectar dónde se está perdiendo tiempo o dinero.</li>
                <li>Sistemas que obligan al negocio a adaptarse, en lugar de lo contrario.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h3 className="mb-10">Tipos de soluciones</h3>
              <ul className="list-style-one">
                <li>Paneles internos y tableros para ver mejor qué está pasando en cada área.</li>
                <li>Integraciones entre ERP, CRM, pagos, logística y e-commerce.</li>
                <li>Automatización de tareas repetitivas y procesos de alto impacto.</li>
                <li>Módulos específicos para ventas, operaciones, administración y reportes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="service-three-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title text-center mb-40">
            <h2>¿Qué tipo de empresa suele necesitar esta solución?</h2>
            <p className="mt-15">
              Suele tener más sentido cuando el trabajo diario ya se volvió demasiado complejo para resolverlo bien con un sistema genérico.
            </p>
          </div>
          <div className="row">
            {BUSINESS_CASES.map((item) => (
              <div className="col-md-6" key={item.title}>
                <div className="service-three-item">
                  <div className="content">
                    <h5>{item.title}</h5>
                    <p className="mb-0">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-area pb-50 rpb-20">
        <div className="container">
          <div className="row">
            <div className="col-xl-10">
              <h2>Software de facturación y stock para PYMEs</h2>
              <p>
                Detectamos una alta demanda en Uruguay para consultas como programa de facturación y stock,
                sistema de facturación web y software de gestión empresarial. Por eso creamos una solución
                específica para comercios y PYMEs de Uruguay y LATAM que necesitan integrar operación y control.
              </p>
              <Link legacyBehavior href="/software-facturacion-stock-uruguay">
                <a className="read-more" data-cta="money-page-software-facturacion-stock">
                  Ver solución de facturación, stock e inventario <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="project-timeline-two-area pb-70 rpb-40">
        <div className="container">
          <div className="section-title mb-35">
            <h2>Proceso de implementación</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h3>1. Discovery y priorización</h3>
              <p>Revisamos cómo trabaja hoy tu empresa, dónde se tranca el proceso y qué conviene resolver primero.</p>
            </div>
            <div className="col-lg-6">
              <h3>2. Diseño funcional y técnico</h3>
              <p>Definimos cómo va a funcionar la herramienta, qué sistemas hay que conectar y cómo avanzar paso a paso.</p>
            </div>
            <div className="col-lg-6">
              <h3>3. Desarrollo incremental</h3>
              <p>Construimos en iteraciones cortas con validación continua del equipo de negocio.</p>
            </div>
            <div className="col-lg-6">
              <h3>4. QA, seguridad y despliegue</h3>
              <p>Probamos, aseguramos estabilidad y lanzamos con monitoreo de desempeño.</p>
            </div>
            <div className="col-lg-6">
              <h3>5. Evolución continua</h3>
              <p>Escalamos funcionalidades según nuevos objetivos y crecimiento de la empresa.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-area pb-90 rpb-60">
        <div className="container">
          <div className="section-title mb-35">
            <h2>Preguntas frecuentes sobre software a medida</h2>
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
            <h2>¿Necesitás ordenar y escalar tu operación?</h2>
            <p className="mt-15">
              Coordinemos una reunión y veamos qué conviene resolver primero para que tu empresa trabaje mejor.
            </p>
            <Link legacyBehavior href="/contact">
              <a className="theme-btn mt-25" data-cta="money-page-software-contact">
                Solicitar diagnóstico <i className="fas fa-arrow-right" />
              </a>
            </Link>
            <div className="mt-20">
              <Link legacyBehavior href="/desarrollo-sitios-web-uruguay">
                <a className="read-more" data-cta="money-page-software-web-link">
                  Si todavía no tenés una web sólida, empezá por desarrollo web para PYMEs <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

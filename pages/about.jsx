import Layout from "@/src/layout/Layout";
import { NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";

const About = () => {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/about`;
  return (
    <Layout dark locale="es">
      <NextSeo
        title="Sobre Nosotros"
        description="Software Strategy es una empresa uruguaya especializada en desarrollo web y soluciones tecnológicas para PYMEs."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: `${siteBase}/about` },
          { hrefLang: "en", href: `${siteBase}/en/about` },
          { hrefLang: "x-default", href: `${siteBase}/about` },
        ]}
        openGraph={{
          url: canonical,
          title: "Sobre Nosotros | Software Strategy",
          description: "Software Strategy es una empresa uruguaya especializada en desarrollo web y soluciones tecnológicas para PYMEs.",
          locale: "es_UY",
          type: "website",
        }}
      />
      <PageBanner pageName="Sobre Nosotros" homeLabel="Inicio" homeHref="/" />

      <section className="why-choose-area pt-100 rpt-80 pb-80 rpb-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5">
              <div className="row">
                <div className="col-xl-11">
                  <div className="why-choose-left-content mb-30 rmb-55 wow fadeInLeft delay-0-2s">
                    <div className="section-title mb-40">
                      <span className="sub-title mb-15">Sobre la empresa</span>
                      <h2>Desarrollo web y soluciones tecnológicas para PYMEs</h2>
                    </div>
                    <h5>¿Quiénes somos?</h5>
                    <p>
                      Software Strategy es una empresa uruguaya que trabaja con pequeñas y medianas empresas que necesitan mejorar su presencia digital,
                      transmitir más confianza y convertir esa presencia en oportunidades reales.
                    </p>
                    <br />
                    <h5>¿Cómo trabajamos?</h5>
                    <p>
                      Trabajamos de forma directa, sin estructuras infladas ni procesos innecesarios. Primero entendemos el negocio, luego definimos la
                      solución y recién después desarrollamos. Buscamos claridad, simplicidad y resultados sostenibles.
                    </p>
                    <div className="mt-35 d-flex gap-3 flex-wrap">
                      <Link legacyBehavior href="/desarrollo-sitios-web-uruguay">
                        <a className="theme-btn style-two" data-cta="about-services" title="Ver desarrollo web para PYMEs">
                          Ver desarrollo web para PYMEs <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                      <Link legacyBehavior href="/contact">
                        <a className="theme-btn" data-cta="about-contact" title="Hablemos">
                          Hablemos <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="row">
                <div className="col-md-6">
                  <div className="service-item wow fadeInRight delay-0-2s">
                    <div className="icon"><i className="fas fa-laptop-code" /></div>
                    <h5>
                      <Link legacyBehavior href="/desarrollo-sitios-web-uruguay">
                        <a title="Desarrollo Web Profesional">Desarrollo Web Profesional</a>
                      </Link>
                    </h5>
                    <p>Sitios claros y confiables para que tu empresa se vea profesional y reciba consultas reales.</p>
                  </div>
                  <div className="service-item wow fadeInRight delay-0-3s">
                    <div className="icon"><i className="fas fa-bullhorn" /></div>
                    <h5>
                      <Link legacyBehavior href="/services/digital-marketing">
                        <a title="Estrategia Digital">Estrategia Digital</a>
                      </Link>
                    </h5>
                    <p>Definimos prioridades, campañas y acciones para que tu presencia online tenga dirección y foco comercial.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="service-item mt-30 wow fadeInRight delay-0-4s">
                    <div className="icon"><i className="fas fa-search" /></div>
                    <h5>
                      <Link legacyBehavior href="/services/google-seo">
                        <a title="Visibilidad en Google y anuncios">Visibilidad en Google y anuncios</a>
                      </Link>
                    </h5>
                    <p>Mejoramos cómo aparece tu empresa cuando la buscan y conectamos esa demanda con oportunidades reales.</p>
                  </div>
                  <div className="service-item wow fadeInRight delay-0-5s">
                    <div className="icon"><i className="fas fa-cogs" /></div>
                    <h5>
                      <Link legacyBehavior href="/desarrollo-software-medida-uruguay">
                        <a title="Soluciones a Medida">Soluciones a Medida</a>
                      </Link>
                    </h5>
                    <p>Desarrollos específicos para ordenar procesos, mejorar control y acompañar el crecimiento de tu operación.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="who-we-are-area pt-20 rpt-0 pb-75 rpb-45 rel z-1">
        <div className="container container-1290">
          <div className="row gap-90">
            <div className="col-lg-4 col-md-6">
              <div className="why-choose-item style-two wow fadeInUp delay-0-2s">
                <div className="why-choose-header"><i className="fas fa-bullseye" /><h5>Claridad y posicionamiento</h5></div>
                <p>Ordenamos mensaje, estructura y presencia digital para que tu empresa sea más fácil de entender y de elegir.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="why-choose-item style-two wow fadeInUp delay-0-3s">
                <div className="why-choose-header"><i className="fas fa-mobile-alt" /><h5>Decisiones con criterio</h5></div>
                <p>Definimos prioridades concretas para avanzar sin dispersión ni complejidad innecesaria.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="why-choose-item style-two wow fadeInUp delay-0-4s">
                <div className="why-choose-header"><i className="fas fa-lightbulb" /><h5>Relación directa</h5></div>
                <p>Sin intermediarios innecesarios ni procesos eternos: comunicación clara y foco en ejecución.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

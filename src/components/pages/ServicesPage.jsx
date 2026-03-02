import PageBanner from "@/src/components/PageBanner";
import { NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Link from "next/link";

export default function ServicesPage({ t, locale = "es" }) {
  const isEn = locale === "en";
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonicalUrl = `${siteBase}${isEn ? "/en/services" : "/services"}`;
  const withLang = (href) => {
    if (!href) return "/";
    if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
    const path = href.startsWith("/") ? href : `/${href}`;
    if (isEn) {
      if (path === "/en" || path.startsWith("/en/")) return path;
      return `/en${path}`;
    }
    return path.startsWith("/en/") || path === "/en" ? (path.replace(/^\/en/, "") || "/") : path;
  };
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t?.seo?.title || (isEn ? "Services" : "Servicios"),
    description:
      t?.seo?.description ||
      (isEn
        ? "Professional website development, custom software and digital strategy services."
        : "Servicios de desarrollo web, software a medida y estrategia digital."),
    url: canonicalUrl,
    inLanguage: isEn ? "en" : "es",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (t.items || []).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title || `${item.titlePrefix || ""} ${item.titleEmphasis || ""}`.trim(),
        url: `${siteBase}${withLang(item.href || "/services")}`,
      })),
    },
  };

  return (
    <>
      <NextSeo
        title={t?.seo?.title || (isEn ? "Services" : "Servicios")}
        description={t?.seo?.description || (isEn ? "Explore our services: web development, custom software, SEO/SEM and digital marketing." : "Conocé nuestros servicios: desarrollo web, software a medida, SEO/SEM y marketing digital.")}
        canonical={canonicalUrl}
        languageAlternates={[
          { hrefLang: "es", href: `${siteBase}/services` },
          { hrefLang: "en", href: `${siteBase}/en/services` },
          { hrefLang: "x-default", href: `${siteBase}/services` },
        ]}
        openGraph={{
          url: canonicalUrl,
          title: t?.seo?.title || (isEn ? "Services" : "Servicios"),
          description:
            t?.seo?.description ||
            (isEn
              ? "Explore our services: web development, custom software, SEO/SEM and digital marketing."
              : "Conocé nuestros servicios: desarrollo web, software a medida, SEO/SEM y marketing digital."),
          locale: isEn ? "en_US" : "es_UY",
          type: "website",
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      {/* Page Banner */}
      <PageBanner pageName={t.pageBanner} />

      {t.intro && (
        <section className="about-area pt-90 rpt-70 pb-20 rpb-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="section-title text-center mb-25">
                  {t.intro.subtitle && <span className="sub-title mb-15">{t.intro.subtitle}</span>}
                  <h2>{t.intro.title}</h2>
                </div>
                <p className="text-center">{t.intro.text}</p>
                <p className="text-center">{t.intro.identity}</p>
                <div className="text-center mt-25">
                  <Link legacyBehavior href={withLang(t.intro.primaryHref || "/contact")}>
                    <a className="theme-btn" data-cta="services-intro-primary" title={t.intro.primaryLabel || (isEn ? "Schedule an introductory call" : "Solicitar una reunión inicial")}>
                      {t.intro.primaryLabel || (isEn ? "Schedule an introductory call" : "Solicitar una reunión inicial")} <i className="fas fa-arrow-right" />
                    </a>
                  </Link>
                  <Link legacyBehavior href={withLang(t.intro.secondaryHref || "/services")}>
                    <a className="read-more mt-20 d-inline-block" data-cta="services-intro-secondary" title={t.intro.secondaryLabel || (isEn ? "View more" : "Ver más")}>
                      {t.intro.secondaryLabel || (isEn ? "View more" : "Ver más")} <i className="fas fa-arrow-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services List Area (estructura basada en project-list) */}
      <section className="project-list-area pt-130 rpt-100 pb-10 rpb-25">
        <div className="container">
          {t.items?.map((svc, idx) => {
            const even = idx % 2 === 0;
            return (
              <div className="project-item style-two" key={svc.title}>
                {/* Imagen izquierda si even, derecha si odd */}
                {even && (
                  <div className="image wow fadeInLeft delay-0-2s">
                    <img src={svc.image} alt={svc.imageAlt || svc.title} title={svc.imageAlt || svc.title} width="520" height="535" loading="lazy" decoding="async" />
                    {svc.href && (
                      <Link legacyBehavior href={withLang(svc.href)}>
                        <a className="project-btn" aria-label={isEn ? 'View service details' : 'Ver detalle del servicio'} title={isEn ? 'View service details' : 'Ver detalle del servicio'}>
                          <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                    )}
                  </div>
                )}

                <div className={`content wow ${even ? "fadeInRight" : "fadeInLeft"} delay-0-2s`}>
                  {svc.category && (
                    <Link legacyBehavior href={withLang(svc.href || "/services")}>
                      <a className="category" title={svc.category}>{svc.category}</a>
                    </Link>
                  )}
                  <h2>
                    <Link legacyBehavior href={withLang(svc.href || "/services")}>
                      <a title={`${svc.titlePrefix} ${svc.titleEmphasis}`.trim()}>
                        {svc.titlePrefix} <i>{svc.titleEmphasis}</i>
                      </a>
                    </Link>
                  </h2>
                  <hr />
                  <p>{svc.description}</p>
                  <Link legacyBehavior href={withLang(svc.href || "/contact")}>
                    <a className="read-more" data-cta="services-read-more" data-service={(svc.href || svc.title || '').toString()} title={t.ctaReadMore}>
                      {t.ctaReadMore} <i className="fas fa-arrow-right" />
                    </a>
                  </Link>
                </div>

                {!even && (
                  <div className="image wow fadeInRight delay-0-2s">
                    <img src={svc.image} alt={svc.imageAlt || svc.title} title={svc.imageAlt || svc.title} width="520" height="535" loading="lazy" decoding="async" />
                    {svc.href && (
                      <Link legacyBehavior href={withLang(svc.href)}>
                        <a className="project-btn" aria-label={isEn ? 'View service details' : 'Ver detalle del servicio'} title={isEn ? 'View service details' : 'Ver detalle del servicio'}>
                          <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA final (mismo bloque del template) */}
      <section className="work-with-area pb-150 rpb-145 rel z-1">
        <div className="container">
          <div className="row justify-content-center pb-45 rpb-25">
            <div className="col-xl-7 col-lg-9">
              <div className="section-title text-center wow fadeInUp delay-0-2s">
                <span className="sub-title mb-15">{t.workWithUs.subtitle}</span>
                <h2>{t.workWithUs.title}</h2>
                <Link legacyBehavior href={withLang("/contact")}>
                  <a className="explore-more text-start mt-30" title={t.workWithUs.cta}>
                    <i className="fas fa-arrow-right" /> <span>{t.workWithUs.cta}</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <span className="big-text light-opacity">{t.workWithUs.bigText}</span>
      </section>
    </>
  );
}

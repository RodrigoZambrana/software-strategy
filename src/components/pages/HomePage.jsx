import Link from "next/link";
import dynamic from "next/dynamic";
import Home5Slider from "@/src/components/sliders/Home5Slider";
import { FAQPageJsonLd, NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import esFooter from "@/content/es/footer.json";
import enFooter from "@/content/en/footer.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderProps } from "@/src/sliderProps";

const Counter = dynamic(() => import("@/src/components/Counter"), { ssr: false });

export default function HomePage({ t, locale }) {
  const isEn = locale === "en";
  const footerContact = isEn ? enFooter.contacts : esFooter.contacts;
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
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
  const canonicalUrl = `${siteBase}${isEn ? "/en" : ""}`;
  const homeOfferCatalog = {
    "@type": "OfferCatalog",
    name: isEn ? "Core services" : "Servicios principales",
    itemListElement: [
      {
        "@type": "Offer",
        url: `${siteBase}/desarrollo-sitios-web-uruguay`,
        itemOffered: {
          "@type": "Service",
          name: isEn ? "Website development for SMBs" : "Desarrollo de sitios web para PYMEs",
          areaServed: { "@type": "Country", name: "Uruguay" },
        },
      },
      {
        "@type": "Offer",
        url: `${siteBase}/desarrollo-software-medida-uruguay`,
        itemOffered: {
          "@type": "Service",
          name: isEn ? "Custom software development" : "Desarrollo de software a medida",
          areaServed: { "@type": "Country", name: "Uruguay" },
        },
      },
      {
        "@type": "Offer",
        url: `${siteBase}${isEn ? "/en/services/google-seo" : "/services/google-seo"}`,
        itemOffered: {
          "@type": "Service",
          name: isEn ? "Google visibility and ads" : "Visibilidad en Google y anuncios",
          areaServed: { "@type": "Country", name: isEn ? "Latin America" : "Uruguay" },
        },
      },
    ],
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Software Strategy",
    url: `${siteBase}/`,
    inLanguage: isEn ? "en" : "es",
  };
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Software Strategy",
    url: canonicalUrl,
    image: `${siteBase}/og-image.jpg`,
    telephone: footerContact?.phoneDisplay || "+59898488759",
    priceRange: isEn ? "USD 200-1300+" : "USD 200-1300+",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UY",
      addressRegion: "Uruguay",
    },
    description: isEn
      ? "Technology company focused on professional websites and custom solutions for small and medium-sized businesses."
      : "Empresa uruguaya enfocada en desarrollo web profesional y soluciones tecnológicas para pequeñas y medianas empresas.",
    areaServed: {
      "@type": "Country",
      name: isEn ? "Latin America" : "Uruguay",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: isEn ? "SMBs" : "PYMEs",
    },
    provider: {
      "@type": "Organization",
      name: "Software Strategy",
      url: `${siteBase}/`,
      telephone: footerContact?.phoneDisplay || "+59898488759",
    },
    hasOfferCatalog: homeOfferCatalog,
  };
  const faqPreviewItems = t.faqPreview?.items || [];

  return (
    <>
      {t.slider && (
        <Home5Slider
          slides={(t.slider.slides || []).map((s) => ({
            bg: s.bg,
            subtitle: s.subtitle,
            titleHtml: s.titleHtml,
            ratingLabel: s.ratingLabel,
            primary: s.primary ? { href: withLang(s.primary.href), text: s.primary.text } : null,
            secondary: s.secondary ? { href: withLang(s.secondary.href), text: s.secondary.text } : null,
          }))}
        />
      )}
      <NextSeo
        title={t.seoTitle}
        description={t.seoDescription}
        canonical={canonicalUrl}
        languageAlternates={[
          { hrefLang: "es", href: siteBase },
          { hrefLang: "en", href: `${siteBase}/en` },
          { hrefLang: "x-default", href: siteBase },
        ]}
        openGraph={{
          type: "website",
          locale: isEn ? "en_US" : "es_UY",
          url: canonicalUrl,
          siteName: "Software Strategy",
          images: [
            {
              url: `${siteBase}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: "Software Strategy",
            },
          ],
       }}
     />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }} />
      {faqPreviewItems.length > 0 && !isEn && (
        <FAQPageJsonLd
          mainEntity={faqPreviewItems.map((item) => ({
            questionName: item.q,
            acceptedAnswerText: item.a,
          }))}
        />
      )}

      {/* Hero */}
      <section className="hero-area pt-185 rpt-150 rel z-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-content wow fadeInLeft delay-0-2s">
                <h1
                  dangerouslySetInnerHTML={{
                    __html:
                      t.heroTitleHtml ||
                      `${t.heroTitle || ""} ${t.heroHighlight ? `<span>${t.heroHighlight}</span>` : ""} ${t.heroItalic ? `<i>${t.heroItalic}</i>` : ""}`.trim(),
                  }}
                />
                {t.heroParagraphHtml ? (
                  <p className="mt-25" dangerouslySetInnerHTML={{ __html: t.heroParagraphHtml }} />
                ) : (
                  <p className="mt-25">{t.heroDescription}</p>
                )}
                {Array.isArray(t.heroBenefits) && t.heroBenefits.length > 0 && (
                  <ul className="list-style-one mt-10">
                    {t.heroBenefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                <Link legacyBehavior href={withLang(t.heroCtaHref || (isEn ? "/contact" : "/contact"))}>
                  <a className="theme-btn mt-25" id="cta-hero-contact" data-cta="hero" title={t.heroCtaText}>
                    {t.heroCtaText} <i className="fas fa-arrow-right" />
                  </a>
                </Link>
                <Link legacyBehavior href={withLang(t.heroSecondaryCtaHref || (isEn ? "/services" : "/services"))}>
                  <a className="read-more mt-15" id="cta-hero-services" data-cta="hero-secondary" title={t.heroSecondaryCtaText || (isEn ? "View services" : "Ver servicios")}>
                    {t.heroSecondaryCtaText || (isEn ? "View services" : "Ver servicios")} <i className="fas fa-arrow-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hero-right-image mt-20 wow fadeInUp delay-0-4s">
                <img src="/assets/images/hero/hero-right.png" alt={t.heroRightImageAlt || (isEn ? "Web design and digital marketing" : "Diseño web y marketing digital")} title={t.heroRightImageAlt || (isEn ? "Web design and digital marketing" : "Diseño web y marketing digital")} width="351" height="307" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="hero-bottom-image">
            <img src="/assets/images/hero/hero.jpg" alt={isEn ? "Professional website development for SMBs" : "Desarrollo web profesional para PYMEs"} title={isEn ? "Professional website development for SMBs" : "Desarrollo web profesional para PYMEs"} width="1280" height="609" />
          </div>
        </div>
        <div className="hero-bg">
          <img src="/assets/images/hero/hero-bg.png" alt="" title="Fondo visual del hero" width="1280" height="572" aria-hidden />
        </div>
      </section>

      {/* Trust Bar */}
      {t.trustBar?.items?.length > 0 && (
        <section className="pt-20 rpb-40 rel z-1">
          <div className="container">
            {(t.trustBar.subtitle || t.trustBar.title) && (
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="section-title text-center mb-30 wow fadeInUp delay-0-2s">
                    {t.trustBar.subtitle && (
                      <span className="sub-title mb-15">{t.trustBar.subtitle}</span>
                    )}
                    {t.trustBar.title && <h3>{t.trustBar.title}</h3>}
                  </div>
                </div>
              </div>
            )}
            <div className="row justify-content-center">
              {t.trustBar.items.map((it, i) => (
                <div className="col-sm-6 col-lg-3" key={`${it.text}-${i}`}>
                  <div className={`why-choose-item-two text-center wow fadeInUp delay-0-${2 + i}`}> 
                    <div className="icon">
                      <i className={it.icon || "fas fa-check"} />
                      <span className="icon-bottom-shape" />
                    </div>
                    <div className="content">
                      <h5>{it.text}</h5>
                      {it.detail && <p className="mt-10">{it.detail}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section className="about-area pt-130 rpt-100 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-5 col-lg-3">
              <div className="about-image rmb-45 wow fadeInUp delay-0-2s">
                <img src="/assets/images/about/circle-text.svg" alt={isEn ? "Software Strategy circle mark" : "Sello circular de Software Strategy"} title={isEn ? "Software Strategy circle mark" : "Sello circular de Software Strategy"} width="210" height="210" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="col-xl-7 col-lg-9">
              <div className="about-content wow fadeInUp delay-0-4s">
                {t.aboutCustom ? (
                  <>
                    <div className="section-title mb-40">
                      {t.aboutCustom.subtitle && (
                        <span className="sub-title mb-15">{t.aboutCustom.subtitle}</span>
                      )}
                      <h2>{t.aboutCustom.title}</h2>
                    </div>
                    <div className="content">
                      {t.aboutCustom.paragraphHtml ? (
                        <p
                          dangerouslySetInnerHTML={{ __html: t.aboutCustom.paragraphHtml }}
                        />
                      ) : (
                        <p>{t.aboutText}</p>
                      )}

                      {Array.isArray(t.aboutCustom.benefits) && t.aboutCustom.benefits.length > 0 && (
                        <ul className="list-style-one mt-10">
                          {t.aboutCustom.benefits.map((b) => (
                            <li key={b}>
                              <span dangerouslySetInnerHTML={{ __html: b }} />
                            </li>
                          ))}
                        </ul>
                      )}

                      {Array.isArray(t.aboutCustom.badges) && t.aboutCustom.badges.length > 0 && (
                        <div className="mt-15 d-flex gap-3 flex-wrap">
                          {t.aboutCustom.badges.map((txt) => (
                            <div key={txt} className="badge rounded-pill trust-badge px-3 py-2">{txt}</div>
                          ))}
                        </div>
                      )}

                      <div className="mt-20">
                        <Link legacyBehavior href={withLang(t.aboutCustom.ctas?.readMoreHref || (isEn ? '/services/digital-marketing' : '/services/digital-marketing'))}>
                          <a className="read-more mt-10" id="cta-about-readmore" data-cta="about-readmore" title={t.aboutCustom.ctas?.readMoreLabel || (isEn ? 'Discover more' : 'Descubre más')}>
                            {t.aboutCustom.ctas?.readMoreLabel || (isEn ? 'Discover more' : 'Descubre más')} <i className="fas fa-arrow-right"></i>
                          </a>
                        </Link>
                        <Link legacyBehavior href={withLang(t.aboutCustom.ctas?.primaryHref || (isEn ? '/contact' : '/contact'))}>
                          <a className="theme-btn mt-10 ms-3" id="cta-about-primary" data-cta="about-primary" title={t.aboutCustom.ctas?.primaryLabel || (isEn ? 'Start your strategy' : 'Comienza tu estrategia')}>
                            {t.aboutCustom.ctas?.primaryLabel || (isEn ? 'Start your strategy' : 'Comienza tu estrategia')} <i className="fas fa-arrow-right"></i>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="section-title mb-40">
                      <span className="sub-title mb-15">{t.aboutSubtitle}</span>
                      <h2>{t.aboutTitle}</h2>
                    </div>
                    <div className="content">
                      <p>{t.aboutText}</p>
                      <Link legacyBehavior href="/about">
                        <a className="read-more mt-10" data-cta="about-learn-more" title={t.aboutCtaText}>
                          {t.aboutCtaText} <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="what-we-do-area pt-90 rpt-80 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-5 col-lg-8">
              <div className="what-we-do-content mb-55">
                <div className="section-title mb-60 wow fadeInUp delay-0-2s">
                  <span className="sub-title mb-15">{t.whatCustom?.subtitle || t.whatSubtitle}</span>
                  <h2>{t.whatCustom?.title || t.whatTitle}</h2>
                  {(t.whatCustom?.intro || t.whatIntro) && (
                    <p className="mt-15">{t.whatCustom?.intro || t.whatIntro}</p>
                  )}
                </div>

                {(t.whatCustom?.items || t.whatItems || []).map((item, idx) => (
                  <div className={`what-we-do-item wow fadeInUp delay-0-${3 + idx * 2}s`} key={item.title || idx}>
                    <div className="number">
                      <span>{item.number || `${(idx + 1).toString().padStart(2, '0')}`}</span>
                    </div>
                    <div className="content">
                      <h5>{item.title}</h5>
                      <p>{item.text}</p>
                      {(item.href || item.cta) && (
                        <Link legacyBehavior href={withLang(item.href || '#')}>
                          <a className="read-more style-two" data-cta="what-item" data-item={item.href || ''} title={item.cta || (isEn ? 'Read more' : 'Ver más')}>
                            <span>{item.cta || (isEn ? 'Read more' : 'Ver más')}</span> <i className="fas fa-arrow-right" />
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-6">
              <div className="what-we-do-image mb-55 wow fadeInRight delay-0-2s">
                <img src={t.whatCustom?.image || "/assets/images/services/what-we-do.jpg"} alt={t.whatCustom?.imageAlt || (isEn ? "What We Do" : "Qué hacemos")} title={t.whatCustom?.imageAlt || (isEn ? "What We Do" : "Qué hacemos")} width="650" height="905" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="statistics-area pt-75 rpt-45 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            {t.stats.map((s, i) => (
              <div className="col-xl-2 col-lg-3 col-6" key={s.label}>
                <div className={`counter-item counter-text-wrap wow fadeInUp delay-0-${2 + i}s`}>
                  <i className="fas fa-check-circle" />
                  <Counter end={s.value} />
                  <span className="counter-title">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social proof + results */}
      {t.socialProof && (
        <section className="why-choose-area pt-90 rpt-60 pb-60 rpb-30 rel z-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-10">
                <div className="section-title text-center mb-40 wow fadeInUp delay-0-2s">
                  {t.socialProof.subtitle && <span className="sub-title mb-15">{t.socialProof.subtitle}</span>}
                  {t.socialProof.title && <h2>{t.socialProof.title}</h2>}
                  {t.socialProof.text && <p className="mt-15">{t.socialProof.text}</p>}
                </div>
              </div>
            </div>

            {Array.isArray(t.socialProof.logos) && t.socialProof.logos.length > 0 && (
              <div className="row justify-content-center mb-35">
                <div className="col-lg-10">
                  <div className="d-flex gap-3 flex-wrap justify-content-center">
                    {t.socialProof.logos.map((logo) => (
                      <span key={logo} className="badge rounded-pill trust-badge px-3 py-2">
                        {logo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              {(t.socialProof.cases || []).map((it, i) => (
                <div className="col-md-4" key={`${it.title}-${i}`}>
                  <div className={`service-three-item wow fadeInUp delay-0-${2 + i * 2}s`}>
                    <div className="content">
                      <h5>{it.title}</h5>
                      {it.metric && <h3 className="mt-10">{it.metric}</h3>}
                      {it.description && <p className="mt-10 mb-0">{it.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {Array.isArray(t.socialProof.testimonials) && t.socialProof.testimonials.length > 0 && (
              <div className="row mt-20">
                {t.socialProof.testimonials.map((it, i) => (
                  <div className="col-md-4" key={`${it.name}-${i}`}>
                    <div className={`why-choose-item-two wow fadeInUp delay-0-${2 + i * 2}s`}>
                      <div className="content">
                        <p>"{it.quote}"</p>
                        <h5 className="mt-15 mb-0">{it.name}</h5>
                        {(it.role || it.company) && (
                          <p className="mt-5 mb-0">
                            {[it.role, it.company].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Offer by business need */}
      {t.offerByNeed?.items?.length > 0 && (
        <section className="service-three-area pt-20 rpt-0 pb-50 rpb-20 rel z-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="section-title text-center mb-50 wow fadeInUp delay-0-2s">
                  {t.offerByNeed.subtitle && <span className="sub-title mb-15">{t.offerByNeed.subtitle}</span>}
                  <h2>{t.offerByNeed.title}</h2>
                  {t.offerByNeed.text && <p className="mt-15">{t.offerByNeed.text}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              {t.offerByNeed.items.map((it, i) => (
                <div className="col-xl-4 col-md-6" key={it.title}>
                  <div className={`service-three-item wow fadeInUp delay-0-${2 + i * 2}s`}>
                    <div className="title-icon">
                      <h5>{it.title}</h5>
                      <img src="/assets/images/services/icon1.png" alt={isEn ? "Service icon" : "Ícono de servicio"} title={isEn ? "Service icon" : "Ícono de servicio"} width="50" height="50" loading="lazy" decoding="async" />
                    </div>
                    <div className="content">
                      <p>{it.description}</p>
                      {Array.isArray(it.bullets) && it.bullets.length > 0 && (
                        <ul className="list-style-one mt-10">
                          {it.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}
                      <Link legacyBehavior href={withLang(it.href || "/contact")}>
                        <a className="theme-btn mt-25" data-cta="offer-by-need" data-offer={it.title} title={it.cta || (isEn ? "View details" : "Ver detalles")}>
                          {it.cta || (isEn ? "View details" : "Ver detalles")} <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqPreviewItems.length > 0 && (
        <section className="faq-area pt-20 rpt-0 pb-70 rpb-40 rel z-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="section-title text-center mb-45 wow fadeInUp delay-0-2s">
                  {t.faqPreview.subtitle && <span className="sub-title mb-15">{t.faqPreview.subtitle}</span>}
                  <h2>{t.faqPreview.title}</h2>
                  {t.faqPreview.text && <p className="mt-15">{t.faqPreview.text}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              {faqPreviewItems.map((item, i) => (
                <div className="col-lg-4 col-md-6" key={item.q}>
                  <div className={`service-three-item wow fadeInUp delay-0-${2 + i * 2}s`}>
                    <div className="content">
                      <h5>{item.q}</h5>
                      <p className="mb-0">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-30">
              <Link legacyBehavior href={withLang(t.faqPreview.primaryHref || (isEn ? "/contact" : "/desarrollo-sitios-web-uruguay"))}>
                <a className="theme-btn" data-cta="home-faq-primary" title={t.faqPreview.primaryLabel || (isEn ? "View website development" : "Ver desarrollo web para PYMEs")}>
                  {t.faqPreview.primaryLabel || (isEn ? "View website development" : "Ver desarrollo web para PYMEs")} <i className="fas fa-arrow-right" />
                </a>
              </Link>
              <Link legacyBehavior href={withLang(t.faqPreview.secondaryHref || (isEn ? "/contact" : "/faqs"))}>
                <a className="read-more mt-20 d-inline-block" data-cta="home-faq-secondary" title={t.faqPreview.secondaryLabel || (isEn ? "Read more questions" : "Ver más preguntas")}>
                  {t.faqPreview.secondaryLabel || (isEn ? "Read more questions" : "Ver más preguntas")} <i className="fas fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Services grid */}
      <section className="service-three-area pt-70 rpt-40 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-20">{t.servicesSubtitle}</span>
                <h2>{t.servicesTitle}</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {t.services.map((card, i) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={card.title}>
                <div className={`service-three-item wow ${i % 2 ? "fadeInDown" : "fadeInUp"} delay-0-2s`}>
                  <div className="title-icon">
                    <h5>
                      <Link legacyBehavior href={withLang(card.href)}>
                        <a data-cta="services-grid-title" data-service={card.href} title={card.title}>{card.title}</a>
                      </Link>
                    </h5>
                    <img src="/assets/images/services/icon1.png" alt={isEn ? "Service icon" : "Ícono de servicio"} title={isEn ? "Service icon" : "Ícono de servicio"} width="50" height="50" loading="lazy" decoding="async" />
                  </div>
                  <div className="content">
                    <p>{card.text}</p>
                    {Array.isArray(card.bullets) && card.bullets.length > 0 && (
                      <ul className="list-style-one mt-10">
                        {card.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    <Link legacyBehavior href={withLang(card.href)}>
                      <a className="theme-btn mt-25" id={`cta-services-grid-${i}-more`} data-cta="services-grid" data-service={card.href} title={isEn ? "Read more" : "Leer más"}>
                        <span>{isEn ? "Read more" : "Leer más"}</span> <i className="fas fa-arrow-right" />
                      </a>
                    </Link>
                    <Link legacyBehavior href={withLang(card.ctaSecondaryHref || (isEn ? "/contact" : "/contact"))}>
                      <a className="theme-btn mt-25" id={`cta-services-grid-${i}-contact`} data-cta="services-grid-contact" data-service={card.href} title={card.ctaSecondaryText || (isEn ? "Request proposal" : "Solicitar propuesta")}>
                        {card.ctaSecondaryText || (isEn ? "Request proposal" : "Solicitar propuesta")} <i className="fas fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing (banner + 2 planes) */}
      <section className="pricing-area-three pt-85">
        <div className="container container-1290">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-20">{t.pricingSubtitle}</span>
                <h2>{t.pricingTitle}</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-md-6 wow fadeInUp delay-0-2s">
              <div className="pricing-banner" style={{ backgroundImage: "url(/assets/images/background/pricing-banner-bg.jpg)" }}>
                <span className="join-us">{isEn ? "Work with us" : "Trabajemos juntos"}</span>
                <h4>{t.pricingBannerTitle}</h4>
                <Link legacyBehavior href={withLang("/pricing")}>
                  <a className="details-btn" id="cta-pricing-banner" data-cta="pricing-banner" title={t.pricingBannerCta || (isEn ? "View details" : "Ver detalles")}>
                    <i className="fas fa-arrow-right" />
                  </a>
                </Link>
                <div className="hand-shape">
                  <img src="/assets/images/shapes/pricing-banner-hand-shape.png" alt="" title="Detalle gráfico de precios" width="102" height="110" aria-hidden="true" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>

            {t.pricingPlans.map((plan, idx) => (
              <div className={`col-xl-4 col-md-6 wow fadeInUp delay-0-${4 + idx * 2}s`} key={plan.name}>
                <div className="pricing-plan-item style-three" style={{ backgroundImage: "url(/assets/images/shapes/pricing-plan-bg.png)" }}>
                  <div className="icon-title">
                    <div className="icon">
                      <img src="/assets/images/icons/price.svg" alt={isEn ? "Price icon" : "Ícono de precio"} title={isEn ? "Price icon" : "Ícono de precio"} width="18" height="29" loading="lazy" decoding="async" />
                    </div>
                    <h5>{plan.name}</h5>
                  </div>
                  <p>{plan.desc}</p>
                  <ul className="list-style-one">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  {plan.price && (
                    <div className="price-offer">
                      <span className="price-text">
                        <span className="price">{plan.price}</span>
                      </span>
                      <img src="/assets/images/shapes/right-arrow.png" alt="Arrow" loading="lazy" decoding="async" />
                      {plan.priceNote && (
                        <span className="offer-text">{plan.priceNote}</span>
                      )}
                    </div>
                  )}
                  <Link legacyBehavior href={withLang(plan.href)}>
                    <a className="theme-btn w-100" id={`cta-pricing-plan-${idx}`} data-cta="pricing-plan" data-plan={plan.name} title={isEn ? "See details" : "Ver detalles"}>
                      {isEn ? "See details" : "Ver detalles"} <i className="fas fa-arrow-right" />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial clarity */}
      {t.commercialClarity && (
        <section className="about-area pt-90 rpt-60 pb-75 rpb-45 rel z-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-10">
                <div className="section-title text-center mb-40 wow fadeInUp delay-0-2s">
                  {t.commercialClarity.subtitle && (
                    <span className="sub-title mb-15">{t.commercialClarity.subtitle}</span>
                  )}
                  <h2>{t.commercialClarity.title}</h2>
                  {t.commercialClarity.text && <p className="mt-15">{t.commercialClarity.text}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="why-choose-item-two wow fadeInUp delay-0-2s">
                  {t.commercialClarity.includesTitle && <h4>{t.commercialClarity.includesTitle}</h4>}
                  <ul className="list-style-one mt-10 mb-0">
                    {(t.commercialClarity.includes || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="why-choose-item-two wow fadeInUp delay-0-3s mt-20">
                  {t.commercialClarity.notIncludesTitle && <h4>{t.commercialClarity.notIncludesTitle}</h4>}
                  <ul className="list-style-one mt-10 mb-0">
                    {(t.commercialClarity.notIncludes || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="why-choose-item-two wow fadeInUp delay-0-4s">
                  {t.commercialClarity.methodologyTitle && <h4>{t.commercialClarity.methodologyTitle}</h4>}
                  <ul className="list-style-one mt-10 mb-0">
                    {(t.commercialClarity.methodology || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="why-choose-item-two wow fadeInUp delay-0-5s mt-20">
                  {t.commercialClarity.localTitle && <h4>{t.commercialClarity.localTitle}</h4>}
                  {t.commercialClarity.localText && <p className="mt-10">{t.commercialClarity.localText}</p>}
                  <ul className="list-style-one mt-10 mb-0">
                    {(t.commercialClarity.localPoints || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {t.commercialClarity.ctaHref && (
              <div className="text-center mt-35 wow fadeInUp delay-0-2s">
                <Link legacyBehavior href={withLang(t.commercialClarity.ctaHref)}>
                  <a className="theme-btn" data-cta="commercial-clarity" title={t.commercialClarity.ctaText || (isEn ? "Request proposal" : "Solicitar propuesta")}>
                    {t.commercialClarity.ctaText || (isEn ? "Request proposal" : "Solicitar propuesta")} <i className="fas fa-arrow-right" />
                  </a>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="why-choose-area pt-90 rpt-60 rel z-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-7">
              <div className="why-choose-left-image mb-40 wow fadeInLeft delay-0-2s">
                <img src="/assets/images/services/why-choose-left.jpg" alt={isEn ? "Why choose Software Strategy" : "Por qué elegir Software Strategy"} title={isEn ? "Why choose Software Strategy" : "Por qué elegir Software Strategy"} width="875" height="617" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="col-xl-5">
              <div className="why-choose-two-wrap">
                <div className="section-title mb-55 wow fadeInUp delay-0-2s">
                  <span className="sub-title mb-15">{t.whySubtitle}</span>
                  <h2>{t.whyTitle}</h2>
                </div>

                {t.whyItems.map((w, i) => (
                  <div className={`why-choose-item-two wow fadeInUp delay-0-${3 + i * 2}s`} key={w.title}>
                    <div className="icon">
                      <i className="fas fa-check" />
                      <span className="icon-bottom-shape" />
                    </div>
                    <div className="content">
                      <h4>
                        <Link legacyBehavior href={withLang(w.href)}>
                          <a title={w.title}>{w.title}</a>
                        </Link>
                      </h4>
                      <p>{w.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {/* <section className="blog-area-two pt-125 rpt-100 pb-70 rpb-40">
        <div className="container container-1290">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-20">{t.blogSubtitle}</span>
                <h2>{t.blogTitle}</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {t.blogItems.map((b, i) => (
              <div className={`col-xl-4 col-md-6 wow fadeInUp delay-0-${2 + i * 2}s`} key={b.title}>
                <div className="blog-item">
                  <div className="image">
                    <img src={`/assets/images/blog/blog${i + 1}.jpg`} alt="Blog" loading="lazy" decoding="async" />
                  </div>
                  <ul className="blog-meta">
                    <li>
                      <i className="fas fa-calendar-alt" /> <a href="#">{b.date}</a>
                    </li>
                    <li>
                      <i className="fas fa-comments" /> <a href="#">—</a>
                    </li>
                  </ul>
                  <hr />
                  <h4>
                    <Link legacyBehavior href={b.href}>
                      <a>{b.title}</a>
                    </Link>
                  </h4>
                  <Link legacyBehavior href={b.href}>
                    <a className="read-more">
                      {isEn ? "Read more" : "Leer más"} <i className="fas fa-arrow-right" />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}

import Link from "next/link";
import dynamic from "next/dynamic";
import Home5Slider from "@/src/components/sliders/Home5Slider";
import { NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderProps } from "@/src/sliderProps";

const Counter = dynamic(() => import("@/src/components/Counter"), { ssr: false });

export default function HomePage({ t, locale }) {
  const isEn = locale === "en";
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
        canonical={(DefaultSEO?.canonical || 'https://software-strategy.com/').replace(/\/$/, '') + (isEn ? '/en' : '')}
        languageAlternates={[
          { hrefLang: "es", href: (DefaultSEO?.canonical || 'https://software-strategy.com/').replace(/\/$/, '') },
          { hrefLang: "en", href: (DefaultSEO?.canonical || 'https://software-strategy.com/').replace(/\/$/, '') + '/en' },
          { hrefLang: "x-default", href: (DefaultSEO?.canonical || 'https://software-strategy.com/').replace(/\/$/, '') },
        ]}
        openGraph={{
          type: "website",
          locale: isEn ? "en_US" : "es_ES",
          url: (DefaultSEO?.canonical || 'https://software-strategy.com/').replace(/\/$/, '') + (isEn ? '/en' : ''),
          siteName: "Software Strategy",
          images: [
            {
              url: (DefaultSEO?.canonical || 'https://software-strategy.com/').replace(/\/$/, '') + '/og-image.jpg',
              width: 1200,
              height: 630,
              alt: "Software Strategy",
            },
          ],
       }}
     />

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
                  <a className="theme-btn mt-25" id="cta-hero-contact" data-cta="hero">
                    {t.heroCtaText} <i className="far fa-arrow-right" />
                  </a>
                </Link>
                <Link legacyBehavior href={withLang(isEn ? "/services" : "/services")}>
                  <a className="read-more mt-15" id="cta-hero-services" data-cta="hero-secondary">
                    {isEn ? "View services" : "Ver servicios"} <i className="far fa-arrow-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hero-right-image mt-20 wow fadeInUp delay-0-4s">
                <img src="/assets/images/hero/hero-right.png" alt={t.heroRightImageAlt || (isEn ? "Web design and digital marketing" : "Diseño web y marketing digital")} loading="eager" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="hero-bottom-image">
            <img src="/assets/images/hero/hero.jpg" alt="Hero" />
          </div>
        </div>
        <div className="hero-bg">
          <img src="/assets/images/hero/hero-bg.png" alt="" aria-hidden />
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
                <img src="/assets/images/about/circle-text.svg" alt="Circle Text" loading="lazy" decoding="async" />
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
                          <a className="read-more mt-10" id="cta-about-readmore" data-cta="about-readmore">
                            {t.aboutCustom.ctas?.readMoreLabel || (isEn ? 'Discover more' : 'Descubre más')} <i className="far fa-arrow-right"></i>
                          </a>
                        </Link>
                        <Link legacyBehavior href={withLang(t.aboutCustom.ctas?.primaryHref || (isEn ? '/contact' : '/contact'))}>
                          <a className="theme-btn mt-10 ms-3" id="cta-about-primary" data-cta="about-primary">
                            {t.aboutCustom.ctas?.primaryLabel || (isEn ? 'Start your strategy' : 'Comienza tu estrategia')} <i className="far fa-arrow-right"></i>
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
                        <a className="read-more mt-10" data-cta="about-learn-more">
                          {t.aboutCtaText} <i className="far fa-arrow-right" />
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
                          <a className="read-more style-two" data-cta="what-item" data-item={item.href || ''}>
                            <span>{item.cta || (isEn ? 'Read more' : 'Ver más')}</span> <i className="far fa-arrow-right" />
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
                <img src={t.whatCustom?.image || "/assets/images/services/what-we-do.jpg"} alt={t.whatCustom?.imageAlt || (isEn ? "What We Do" : "Qué hacemos")} loading="lazy" decoding="async" />
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
                  <i className="fal fa-check-circle" />
                  <Counter end={s.value} />
                  <span className="counter-title">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                        <a data-cta="services-grid-title" data-service={card.href}>{card.title}</a>
                      </Link>
                    </h5>
                    <img src="/assets/images/services/icon1.png" alt="Icon" loading="lazy" decoding="async" />
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
                      <a className="theme-btn mt-25" id={`cta-services-grid-${i}-more`} data-cta="services-grid" data-service={card.href}>
                        <span>{isEn ? "Read more" : "Leer más"}</span> <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                    <Link legacyBehavior href={withLang(card.ctaSecondaryHref || (isEn ? "/contact" : "/contact"))}>
                      <a className="theme-btn mt-25" id={`cta-services-grid-${i}-contact`} data-cta="services-grid-contact" data-service={card.href}>
                        {card.ctaSecondaryText || (isEn ? "Request proposal" : "Solicitar propuesta")} <i className="far fa-arrow-right" />
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
                <Link legacyBehavior href="/pricing">
                  <a className="details-btn" id="cta-pricing-banner" data-cta="pricing-banner">
                    <i className="far fa-arrow-right" />
                  </a>
                </Link>
                <div className="hand-shape">
                  <img src="/assets/images/shapes/pricing-banner-hand-shape.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>

            {t.pricingPlans.map((plan, idx) => (
              <div className={`col-xl-4 col-md-6 wow fadeInUp delay-0-${4 + idx * 2}s`} key={plan.name}>
                <div className="pricing-plan-item style-three" style={{ backgroundImage: "url(/assets/images/shapes/pricing-plan-bg.png)" }}>
                  <div className="icon-title">
                    <div className="icon">
                      <img src="/assets/images/icons/price.svg" alt="Icon" loading="lazy" decoding="async" />
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
                    <a className="theme-btn w-100" id={`cta-pricing-plan-${idx}`} data-cta="pricing-plan" data-plan={plan.name}>
                      {isEn ? "See details" : "Ver detalles"} <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-area pt-90 rpt-60 rel z-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-7">
              <div className="why-choose-left-image mb-40 wow fadeInLeft delay-0-2s">
                <img src="/assets/images/services/why-choose-left.jpg" alt="Why Choose" loading="lazy" decoding="async" />
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
                          <a>{w.title}</a>
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
                      <i className="far fa-calendar-alt" /> <a href="#">{b.date}</a>
                    </li>
                    <li>
                      <i className="far fa-comments" /> <a href="#">—</a>
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
                      {isEn ? "Read more" : "Leer más"} <i className="far fa-arrow-right" />
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

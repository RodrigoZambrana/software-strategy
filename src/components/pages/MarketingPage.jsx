import Link from "next/link";
import { useState } from "react";
import { NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Home5Slider from "@/src/components/sliders/Home5Slider";
import YgencyAccordionLite from "@/src/components/YgencyAccordionLite";
import PageBanner from "@/src/components/PageBanner";
import { buildPlanWhatsUrl } from "@/src/lib/ctaUtils";

export default function MarketingPage({ t, locale = "es" }) {
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

  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const toAbsoluteUrl = (url) => {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${siteBase}${path}`;
  };

  // Launch promo: -20% until 2025-10-31
  const PROMO_DEADLINE_ISO = '2025-10-31';
  const promoActive = Date.now() <= new Date(`${PROMO_DEADLINE_ISO}T23:59:59Z`).getTime();
  const discountPct = 20;
  const promoLabel = isEn ? 'Launch -20%' : 'Lanzamiento -20%';
  const promoUntilText = isEn ? 'Until Oct 31, 2025' : 'Hasta 31/10/2025';
  const discountPrice = (raw) => {
    const n = parseFloat(`${raw}`);
    if (Number.isNaN(n)) return `${raw}`;
    const d = Math.round(n * (1 - discountPct / 100) * 100) / 100;
    return Number.isInteger(d) ? `${d}` : d.toFixed(2);
  };
  const canonicalPath = isEn ? "/en/services/digital-marketing" : "/services/digital-marketing";
  const canonicalUrl = `${siteBase}${canonicalPath}`;

  // Helper centralizado
  const buildWhatsUrl = (planLabel, price) =>
    buildPlanWhatsUrl({ locale: isEn ? 'en' : 'es', label: planLabel, price, phone: t?.whatsappDial });

  return (
    <>
      <NextSeo
        title={t?.seo?.title || (isEn ? "Digital Marketing" : "Marketing Digital")}
        description={t?.seo?.description || (isEn ? "Strategies, content and campaigns to grow." : "Estrategias, contenidos y campañas para crecer.")}
        canonical={canonicalUrl}
        languageAlternates={[
          { hrefLang: "es", href: `${siteBase}/services/digital-marketing` },
          { hrefLang: "en", href: `${siteBase}/en/services/digital-marketing` },
          { hrefLang: "x-default", href: `${siteBase}/services/digital-marketing` },
        ]}
      />

      {/* Slider (from index5) */}
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

      {/* Breadcrumb banner */}
      <PageBanner
        pageName={t.pageBanner || (isEn ? 'Digital Marketing' : 'Marketing Digital')}
        homeLabel={isEn ? 'Home' : 'Inicio'}
        homeHref={withLang('/')}
        parentLabel={isEn ? 'Services' : 'Servicios'}
        parentHref={withLang('/services')}
      />

      {/* What We Offer (from index5) */}
      {t.offer && (
        <section className="what-we-offer pb-90 rpb-70">
          <div className="container container-1290">
            <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
              {t.offer.subtitle && <span className="sub-title mb-20">{t.offer.subtitle}</span>}
              {t.offer.title && <h2>{t.offer.title}</h2>}
              {t.offer.description && <p className="mt-10">{t.offer.description}</p>}
            </div>
            <div className="row justify-content-center">
              {t.offer.items?.map((it, idx) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={`${it.title}-${idx}`}>
                  <div className="service-item style-three wow fadeInUp delay-0-2s">
                    <div className="icon">
                      <i className={it.icon || "fas fa-chart-line"} />
                    </div>
                    {it.number && <div className="number">{it.number}</div>}
                    <h4>{it.title}</h4>
                    {it.desc && <p className="mt-10">{it.desc}</p>}
                    {Array.isArray(it.bullets) && it.bullets.length > 0 && (
                      <ul className="list-style-one mt-10">
                        {it.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* JSON-LD: ItemList of services for SEO */}
      {t.offer?.items?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: isEn ? 'Digital Marketing Services' : 'Servicios de Marketing Digital',
              itemListElement: (t.offer.items || []).slice(0, 3).map((it, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'Service',
                  name: it.title,
                  description: it.desc || '',
                  areaServed: it.areaServed || (isEn ? 'LatAm' : 'LatAm'),
                  provider: it.provider || 'Software Strategy',
                  url: `${(DefaultSEO?.canonical || 'https://software-strategy.com/').replace(/\/$/, '')}${isEn ? '/en/services/digital-marketing' : '/services/digital-marketing'}`,
                },
              })),
            }),
          }}
        />
      )}

      {/* About Company (from index5) */}
      {t.about5 && (
        <section className="about-area-five py-130 rpy-100 rel z-1" aria-label={isEn ? 'About Software Strategy' : 'Sobre Software Strategy'}>
          <div className="container container-1290">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-6">
                <div className="about-content-five">
                  <div className="section-title mb-40 wow fadeInUp delay-0-2s">
                    <span className="sub-title mb-15">{t.about5.subtitle}</span>
                    <h2>{t.about5.title}</h2>
                  </div>
                  {t.about5.textHtml ? (
                    <p dangerouslySetInnerHTML={{ __html: t.about5.textHtml }} />
                  ) : (
                    <p>{t.about5.text}</p>
                  )}
                  {t.about5.authorsText && (
                    <div className="authors-text mt-45 pt-50">
                      {(t.about5.authorsImages || []).map((src, i) => (
                    <img key={i} src={src} alt="Author" loading="lazy" decoding="async" />
                      ))}
                      <span className="text" dangerouslySetInnerHTML={{ __html: t.about5.authorsText }} />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="about-five-images rmt-50 wow fadeInRight delay-0-2s">
                  <div className="image-one">
                    <img src={t.about5.image1 || "/assets/images/about/about-five1.jpg"} alt={t.about5.imageAlt || (isEn ? 'About us' : 'Sobre nosotros')} loading="lazy" decoding="async" />
                  </div>
                  <div className="about-five-shape">
                    <img src={t.about5.bg || "/assets/images/about/about-five-bg.png"} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  </div>
                  <div className="image-two mt-30">
                    <img src={t.about5.image2 || "/assets/images/about/about-five2.jpg"} alt={t.about5.imageAlt || (isEn ? 'About us' : 'Sobre nosotros')} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Work Process (exact structure like index5-onepage, translated) */}
      {t.process && (
        <section className="work-process-five-area pt-130 pb-90 rpt-100 rpb-60 rel z-1" aria-label={isEn ? 'Digital marketing work process' : 'Proceso de trabajo en marketing digital'}>
          <div className="container container-1290">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                  <span className="sub-title mb-20">{t.process.subtitle || (isEn ? "Working Process" : "Proceso de trabajo")}</span>
                  <h2>{t.process.title || (isEn ? "From research to measurable results" : "De la investigación a resultados medibles")}</h2>
                  {t.process.description && <p className="mt-10">{t.process.description}</p>}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {(t.process.items || []).slice(0, 3).map((p, i) => (
                <div className="col-lg-4 col-md-6" key={`${p.title}-${i}`}>
                  <div className={`work-process-five wow fadeInUp delay-0-${2 + i * 2}s`}>
                    <div className="icon-title">
                      <i className={p.icon || "fas fa-chart-line"} />
                      <h4>{p.title}</h4>
                    </div>
                    <div className="content">
                      <p>{p.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs (before plans/pricing) */}
      {t.faqs?.items?.length > 0 && (
        <section className="faq-area py-100 rpy-70 rel z-1" aria-label={isEn ? "Digital marketing FAQs" : "Preguntas frecuentes de marketing digital, Google Ads y redes sociales"}>
          <div className="container container-1290">
            <div className="section-title text-center mb-50">
              <span className="sub-title mb-15">{t.faqs?.subtitle || (isEn ? 'FAQs' : 'Preguntas frecuentes')}</span>
              <h2>{t.faqs?.title || (isEn ? 'Frequently Asked Questions' : 'Preguntas frecuentes sobre marketing digital')}</h2>
              {t.faqs?.description && <p className="mt-10">{t.faqs.description}</p>}
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-11">
                <MarketingFaqAccordion items={t.faqs.items} />
                <div className="text-center mt-40">
                  <Link id="cta-faq-digital-marketing" href={withLang('/services/digital-marketing')} className="theme-btn" data-cta="faq">
                    {isEn ? 'See digital marketing services' : 'Ver servicios de marketing digital'} <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* SEO: FAQPage JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: (t.faqs.items || []).map((it) => ({
                  '@type': 'Question',
                  name: it.q,
                  acceptedAnswer: { '@type': 'Answer', text: it.a },
                })),
              }),
            }}
          />
        </section>
      )}

      {/* Plans (custom module before Work With Us) */}
      {t.plans?.items?.length > 0 && (
        <section
          className="pricing-area-three pb-85 rpb-55"
          style={{ backgroundImage: "url(/assets/images/background/pricing-bg-dot-shape.png)" }}
          aria-label={isEn ? 'Digital marketing plans' : 'Planes de marketing digital'}
        >
          <div className="container container-1290">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                  {t.plans.subtitle && <span className="sub-title mb-20">{t.plans.subtitle}</span>}
                  {t.plans.title && <h2>{t.plans.title}</h2>}
                  {t.plans.description && <p className="mt-10">{t.plans.description}</p>}
                </div>
              </div>
            </div>
            <div className="row">
              {t.plans.items.slice(0, 3).map((plan, i) => (
                <div className="col-xl-4 col-md-6" key={plan.name}>
                  <article
                    className={`pricing-plan-item wow fadeInUp delay-0-${2 + i * 2}s ${i === 1 ? "style-two" : ""}${promoActive ? ' has-promo' : ''}`}
                  >
                    {promoActive && (
                      <div className="promo-badge" aria-label={promoLabel}>{promoLabel}</div>
                    )}
                    {plan.badge && (
                      <span className="badge">
                        <i className="fas fa-star-of-life" />
                        {plan.badge} <i className="fas fa-star-of-life" />
                      </span>
                    )}
                    <div className={i === 1 ? "icon-title-price" : "icon-title"}>
                      <div className="icon">
                        <i className="fas fa-rocket" />
                      </div>
                      <div className={i === 1 ? "right-part" : ""}>
                        <h5>{plan.name}</h5>
                        {plan.price && (
                          <span className="price-text">
                            {promoActive && (
                              <span className="old-price">
                                <span className="price">{plan.price}</span>
                              </span>
                            )}
                            <span className="new-price">
                              <span className="price">{promoActive ? discountPrice(plan.price) : plan.price}</span>
                            </span>{' '}
                            <span className="after">{plan.unit}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    {plan.description && (
                      <p className="mt-10">{plan.description}</p>
                    )}
                    {promoActive && (
                      <p className="promo-until mt-10">{promoUntilText}</p>
                    )}
                    <ul className={`list-style-one ${plan.twoColumn || i === 1 ? "two-column" : ""}`}>
                      {plan.features?.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <Link legacyBehavior href={buildWhatsUrl(plan.name, promoActive ? discountPrice(plan.price) : plan.price)}>
                      <a
                        id={`cta-mkt-pricing-${(plan.slug || plan.name || i).toString().toLowerCase().replace(/\s+/g, '-')}`}
                        className="theme-btn w-100"
                        data-cta="pricing"
                        data-plan={(plan.slug || plan.name || '').toString().toLowerCase().replace(/\s+/g, '-')}
                        data-price={promoActive ? discountPrice(plan.price) : plan.price}
                        data-currency="USD"
                        aria-label={(isEn ? 'Get started with ' : 'Empezar con ') + plan.name}
                        target="_blank" rel="noopener noreferrer"
                      >
                        {plan.cta || (isEn ? "Get started" : "Empezar")} <i className="fas fa-arrow-right" />
                      </a>
                    </Link>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing comparison table (below plans) */}
      {t.plansComparison && (
        <section className="pricing-comparison-area py-80 rpy-60" aria-label={isEn ? 'Digital marketing plans comparison' : 'Comparativa de planes de marketing digital'}>
          <div className="container container-1290">
            <div className="section-title text-center mb-50">
              <h2>{t.plansComparison.title}</h2>
              {t.plansComparison.description && <p className="mt-10">{t.plansComparison.description}</p>}
            </div>

            <div className="table-responsive">
              <table className="table table-bordered pricing-comparison text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>{t.plansComparison.featuresLabel || (isEn ? 'Features' : 'Características')}</th>
                    <th>
                      {t.plansComparison.starterLabel || 'Starter'}<br />
                      <span className="text-muted">
                        {promoActive && (
                          <span className="old-price me-1">{t.plansComparison.starterPrice}</span>
                        )}
                        <span className="new-price">{promoActive ? discountPrice(t.plansComparison.starterPrice) : t.plansComparison.starterPrice}</span> {isEn ? 'USD/mo' : 'USD/mes'}
                      </span>
                    </th>
                    <th className="bg-light">
                      {t.plansComparison.growthLabel || 'Growth'} {t.plansComparison.growthBadge || '⭐'}<br />
                      <span className="text-muted">
                        {promoActive && (
                          <span className="old-price me-1">{t.plansComparison.growthPrice}</span>
                        )}
                        <span className="new-price">{promoActive ? discountPrice(t.plansComparison.growthPrice) : t.plansComparison.growthPrice}</span> {isEn ? 'USD/mo' : 'USD/mes'}
                      </span>
                    </th>
                    <th>
                      {t.plansComparison.proLabel || 'Pro'}<br />
                      <span className="text-muted">
                        {promoActive && (
                          <span className="old-price me-1">{t.plansComparison.proPrice}</span>
                        )}
                        <span className="new-price">{promoActive ? discountPrice(t.plansComparison.proPrice) : t.plansComparison.proPrice}</span> {isEn ? 'USD/mo' : 'USD/mes'}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(t.plansComparison.rows || []).map((r, idx) => (
                    <tr key={`cmp-${idx}`}>
                      <td className="text-start"><strong>{r.feature}</strong></td>
                      <td>{r.starter}</td>
                      <td className="bg-light">{r.growth}</td>
                      <td>{r.pro}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>
                      <Link id="cta-mkt-comparison-starter" href={buildWhatsUrl(t.plansComparison?.starterLabel || 'Starter', promoActive ? discountPrice(t.plansComparison.starterPrice) : t.plansComparison.starterPrice)} className="theme-btn w-100 mt-2" data-cta="comparison" data-plan="starter" data-price={promoActive ? discountPrice(t.plansComparison.starterPrice) : t.plansComparison.starterPrice} data-currency="USD" target="_blank" rel="noopener noreferrer">
                        {t.plansComparison.ctaStarter || (isEn ? 'Choose Starter' : 'Elegir Starter')} <i className="fas fa-arrow-right" />
                      </Link>
                    </td>
                    <td className="bg-light">
                      <Link id="cta-mkt-comparison-growth" href={buildWhatsUrl(t.plansComparison?.growthLabel || 'Growth', promoActive ? discountPrice(t.plansComparison.growthPrice) : t.plansComparison.growthPrice)} className="theme-btn w-100 mt-2" data-cta="comparison" data-plan="growth" data-price={promoActive ? discountPrice(t.plansComparison.growthPrice) : t.plansComparison.growthPrice} data-currency="USD" target="_blank" rel="noopener noreferrer">
                        {t.plansComparison.ctaGrowth || (isEn ? 'Choose Growth' : 'Elegir Growth')} <i className="fas fa-arrow-right" />
                      </Link>
                    </td>
                    <td>
                      <Link id="cta-mkt-comparison-pro" href={buildWhatsUrl(t.plansComparison?.proLabel || 'Pro', promoActive ? discountPrice(t.plansComparison.proPrice) : t.plansComparison.proPrice)} className="theme-btn w-100 mt-2" data-cta="comparison" data-plan="pro" data-price={promoActive ? discountPrice(t.plansComparison.proPrice) : t.plansComparison.proPrice} data-currency="USD" target="_blank" rel="noopener noreferrer">
                        {t.plansComparison.ctaPro || (isEn ? 'Choose Pro' : 'Elegir Pro')} <i className="fas fa-arrow-right" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {t.plansComparison.note && (
              <p className="text-center small text-muted mt-20">{t.plansComparison.note}</p>
            )}
          </div>
        </section>
      )}

      {/* JSON-LD for plans */}
      {t.plans?.items?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': t.plans.items.slice(0, 3).map((p) => ({
                '@type': 'Product',
                name: p.name,
                description: p.description || '',
                image: toAbsoluteUrl(
                  p.image || t.plans?.image || '/assets/images/banner/banner-bg.jpg'
                ),
                offers: {
                  '@type': 'Offer',
                  price: promoActive ? discountPrice(p.price) : `${p.price}`,
                  priceValidUntil: promoActive ? PROMO_DEADLINE_ISO : undefined,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              })),
            }),
          }}
        />
      )}

      {/* Work With Us (from index5) */}
      {t.workWithUs && (
        <section className="work-with-us-area rel z-1">
          <div className="container container-1290">
            <div className="row no-gap">
              <div className="col-xl-5 align-self-center">
                <div className="work-with-image wow fadeInUp delay-0-2s">
                  <img src={t.workWithUs.image || "/assets/images/about/work-with-us.jpg"} alt="About" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="col-xl-7 wow fadeInUp delay-0-4s">
                <div className="work-with-content" style={{ backgroundImage: `url(${t.workWithUs.bg || "/assets/images/about/work-with-us-bg.jpg"})` }}>
                  <div className="section-title mb-10">
                    <span className="sub-title mb-15">{t.workWithUs.subtitle}</span>
                    <h2>{t.workWithUs.title}</h2>
                  </div>
                  <p>{t.workWithUs.text || (isEn ? "Let's talk about your project." : "Hablemos de tu proyecto.")}</p>
                  <Link id="cta-mkt-work-with-us" href={withLang("/contact")} className="theme-btn mt-15" data-cta="work-with-us">
                    {isEn ? "Let’s Work Together" : "Trabajemos Juntos"} <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function MarketingFaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="accordion" id="faqMarketing">
      {items.map((item, i) => (
        <YgencyAccordionLite
          key={`mkt-faq-${i}`}
          title={item.q}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        >
          <p>{item.a}</p>
        </YgencyAccordionLite>
      ))}
    </div>
  );
}

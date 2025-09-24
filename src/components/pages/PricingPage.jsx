// src/components/pages/PricingPage.jsx
import PageBanner from "@/src/components/PageBanner";
import { NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Link from "next/link";
import { buildPlanWhatsUrl } from "@/src/lib/ctaUtils";
import esPricing from "@/content/es/pricing.json";
import enPricing from "@/content/en/pricing.json";

export default function PricingPage({ t, locale = "es" }) {
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

  // Iconitos para los 3 planes (mantengo el look & feel del template)
  const planIcons = ["flaticon-abstract", "flaticon-liquid", "flaticon-petals"];
  const groups = t?.pricingSection?.groups || [];
  const groupTitle = (key) => {
    if (key === 'web') return isEn ? 'Web Development Plans' : 'Planes de Desarrollo Web';
    if (key === 'marketing') return isEn ? 'Digital Marketing Plans' : 'Planes de Marketing Digital';
    return isEn ? 'Plans' : 'Planes';
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

  return (
    <>
      <NextSeo
        title={t?.seo?.title || (isEn ? "Pricing" : "Precios")}
        description={t?.seo?.description || (isEn ? "Plans and pricing for web development, SEO/SEM and marketing services." : "Planes y precios para desarrollo web, SEO/SEM y marketing.")}
        canonical={`${(DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "")}${isEn ? "/en/pricing" : "/pricing"}`}
        languageAlternates={[
          { hrefLang: "es", href: `${(DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "")}/pricing` },
          { hrefLang: "en", href: `${(DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "")}/en/pricing` },
          { hrefLang: "x-default", href: `${(DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "")}/pricing` },
        ]}
      />
      {/* Page Banner */}
      <PageBanner pageName={t.pageBanner} />

      {/* Why Choose */}
      <section className="why-choose-area pt-130 rpt-100 pb-100 rpb-70">
        <div className="container">
          <div className="row align-items-center">
            {/* Texto principal */}
            <div className="col-xl-5">
              <div className="row">
                <div className="col-xl-11">
                  <div className="why-choose-left-content mb-30 rmb-55 wow fadeInLeft delay-0-2s">
                    <div className="section-title mb-50">
                      <span className="sub-title mb-15">{t.whyChoose.subtitle}</span>
                      <h2>{t.whyChoose.title}</h2>
                    </div>

                    <h5>{t.whyChoose.missionTitle}</h5>
                    <p>{t.whyChoose.missionText}</p>

                    <br />

                    <h5>{t.whyChoose.visionTitle}</h5>
                    <p>{t.whyChoose.visionText}</p>

                    <Link legacyBehavior href={withLang("/about")}>
                      <a id="cta-pricing-why-choose" className="theme-btn style-two mt-35" data-cta="pricing-why-choose">
                        {t.whyChoose.cta} <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de beneficios */}
            <div className="col-xl-7">
              <div className="row">
                {t.services?.slice(0, 4).map((s, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className={`service-item ${idx > 1 ? "mt-30" : ""} wow fadeInRight delay-0-2s`}>
                      <div className="icon">
                        <i className={s.icon} />
                      </div>
                      <h5>
                        <Link legacyBehavior href={withLang("/service-details")}>
                          <a>{s.title}</a>
                        </Link>
                      </h5>
                      <p>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* /Grid beneficios */}
          </div>
        </div>
      </section>
      {/* /Why Choose */}

      {/* Pricing */}
      <section className="pricing-area-three pb-85 rpb-55" style={{ backgroundImage: "url(/assets/images/background/pricing-bg-dot-shape.png)" }}>
        <div className="container container-1290">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-20">{t.pricingSection.subtitle}</span>
                <h2>{t.pricingSection.title}</h2>
              </div>
            </div>
          </div>

          {/* Grouped sections if provided */}
          {groups.length > 0 ? (
            groups.map((g, gi) => (
              <div key={`group-${g.key || gi}`}>
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-10">
                    <div className="section-title text-center mb-40 wow fadeInUp delay-0-2s">
                      <h3>{groupTitle(g.key)}</h3>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {g.plans.map((plan, i) => (
                    <div className="col-xl-4 col-md-6" key={`${g.key}-${plan.name}`}>
                      <div className={`pricing-plan-item wow fadeInUp delay-0-${2 + i * 2}s ${plan.twoColumn ? "style-two" : ""}${promoActive ? ' has-promo' : ''}`}>
                        {promoActive && (
                          <div className="promo-badge" aria-label={promoLabel}>{promoLabel}</div>
                        )}
                        {plan.badge && (
                          <span className="badge">
                            <i className="fas fa-star-of-life" />
                            <i className="fas fa-star-of-life" />
                            {plan.badge}
                            <i className="fas fa-star-of-life" />
                            <i className="fas fa-star-of-life" />
                          </span>
                        )}
                        <div className={plan.twoColumn ? "icon-title-price" : "icon-title"}>
                          <div className="icon">
                            <i className={planIcons[i % planIcons.length]} />
                          </div>
                          <div className={plan.twoColumn ? "right-part" : ""}>
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
                                </span>{" "}
                                <span className="after">{plan.unit}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        <ul className={`list-style-one ${plan.twoColumn ? "two-column" : ""}`}>
                          {plan.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                        {promoActive && (
                          <p className="promo-until mt-10">{promoUntilText}</p>
                        )}
                        <Link legacyBehavior href={buildPlanWhatsUrl({ locale: isEn ? 'en' : 'es', label: plan.name, price: promoActive ? discountPrice(plan.price) : plan.price })}>
                          <a id={`cta-pricing-plan-${(plan.name || i).toString().toLowerCase().replace(/\s+/g, '-')}`} className="theme-btn w-100" data-cta="pricing-plan" data-plan={plan.name} data-price={promoActive ? discountPrice(plan.price) : plan.price} data-currency="USD" target="_blank" rel="noopener noreferrer">
                            {plan.cta} <i className="far fa-arrow-right" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="row">
              {t.pricingSection?.plans?.map((plan, i) => (
                <div className="col-xl-4 col-md-6" key={plan.name}>
                  <div className={`pricing-plan-item wow fadeInUp delay-0-${2 + i * 2}s ${i === 1 ? "style-two" : ""}${promoActive ? ' has-promo' : ''}`}>
                    {promoActive && (
                      <div className="promo-badge" aria-label={promoLabel}>{promoLabel}</div>
                    )}
                    {plan.badge && (
                      <span className="badge">
                        <i className="fas fa-star-of-life" />
                        <i className="fas fa-star-of-life" />
                        {plan.badge}
                        <i className="fas fa-star-of-life" />
                        <i className="fas fa-star-of-life" />
                      </span>
                    )}
                    <div className={i === 1 ? "icon-title-price" : "icon-title"}>
                      <div className="icon">
                        <i className={planIcons[i % planIcons.length]} />
                      </div>
                      <div className={i === 1 ? "right-part" : ""}>
                        <h5>{plan.name}</h5>
                        <span className="price-text">
                          {promoActive && (
                            <span className="old-price">
                              <span className="price">{plan.price}</span>
                            </span>
                          )}
                          <span className="new-price">
                            <span className="price">{promoActive ? discountPrice(plan.price) : plan.price}</span>
                          </span> <span className="after">{plan.unit}</span>
                        </span>
                      </div>
                    </div>
                    <ul className={`list-style-one ${i === 1 ? "two-column" : ""}`}>
                      {plan.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    {promoActive && (
                      <p className="promo-until mt-10">{promoUntilText}</p>
                    )}
                    <Link legacyBehavior href={buildPlanWhatsUrl({ locale: isEn ? 'en' : 'es', label: plan.name, price: promoActive ? discountPrice(plan.price) : plan.price })}>
                      <a id={`cta-pricing-plan-${(plan.name || i).toString().toLowerCase().replace(/\s+/g, '-')}`} className="theme-btn w-100" data-cta="pricing-plan" data-plan={plan.name} data-price={promoActive ? discountPrice(plan.price) : plan.price} data-currency="USD" target="_blank" rel="noopener noreferrer">
                        {plan.cta} <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* /Pricing */}

      {/* CTA final */}
      <section className="work-with-area pb-150 rpb-145 rel z-1">
        <div className="container">
          <div className="row justify-content-center pb-45 rpb-25">
            <div className="col-xl-7 col-lg-9">
              <div className="section-title text-center wow fadeInUp delay-0-2s">
                <span className="sub-title mb-15">{t.workWithUs.subtitle}</span>
                <h2>{t.workWithUs.title}</h2>
                <Link legacyBehavior href={withLang("/contact")}>
                  <a id="cta-pricing-work-with-us" className="explore-more text-start mt-30" data-cta="pricing-work-with-us">
                    <i className="fas fa-arrow-right" /> <span>{t.workWithUs.cta}</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <span className="big-text light-opacity">{t.workWithUs.bigText}</span>
      </section>
      {/* /CTA final */}
    </>
  );
}

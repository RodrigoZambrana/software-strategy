import PageBanner from "@/src/components/PageBanner";
import Home5Slider from "@/src/components/sliders/Home5Slider";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import YgencyAccordionLite from "@/src/components/YgencyAccordionLite";
import { buildPlanWhatsUrl } from "@/src/lib/ctaUtils";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd, ProductJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";

export default function ServiceDetailPage({ t, locale = "es", slug = "" }) {
  const isEn = locale === "en";
  const Counter = dynamic(() => import("@/src/components/Counter"), { ssr: false });
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

  const planIcons = ["flaticon-abstract", "flaticon-liquid", "flaticon-petals"];

  // SEO helpers
  const siteBase = useMemo(() => {
    const c = DefaultSEO?.canonical || "https://software-strategy.com/";
    return c.endsWith("/") ? c : `${c}/`;
  }, []);
  const toAbsoluteUrl = (url) => {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    const base = siteBase.replace(/\/$/, "");
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${base}${path}`;
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

  const path = slug ? `/services/${slug}` : "/services";
  const canonicalPath = isEn ? `/en${path}` : path;
  const canonicalUrl = `${siteBase.replace(/\/$/, "")}${canonicalPath}`;
  const altEsUrl = `${siteBase.replace(/\/$/, "")}${path}`;
  const altEnUrl = `${siteBase.replace(/\/$/, "")}/en${path}`;

  const seoTitle = t?.seo?.title || (t?.pageBanner ? `${t.pageBanner}` : (isEn ? "Services" : "Servicios"));
  const seoDesc = t?.seo?.description || t?.whatWeDo?.text || (isEn
    ? "We deliver tailored digital solutions to grow your business."
    : "Entregamos soluciones digitales a medida para hacer crecer tu negocio.");
  const ogLocale = isEn ? "en_US" : "es_ES";

  // Helper centralizado para URL de WhatsApp
  const buildWhatsUrl = (planLabel, price) =>
    buildPlanWhatsUrl({ locale: isEn ? 'en' : 'es', label: planLabel, price, phone: t?.whatsappDial });

  const faqItems = (t?.faqs?.items || []).map((q) => ({
    questionName: q.q,
    acceptedAnswerText: q.a,
  }));

  const hidePrices = t?.pricingSection?.hidePrices || slug === 'custom-software';

  const offers = hidePrices
    ? []
    : (t?.pricingSection?.plans || []).map((p) => ({
        price: promoActive ? discountPrice(p.price) : `${p.price}`,
        priceValidUntil: promoActive ? PROMO_DEADLINE_ISO : undefined,
        priceCurrency: "USD",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
        seller: { name: "Software Strategy" },
      }));

  // Service JSON-LD (manual, next-seo no expone ServiceJsonLd)
  const numericPrices = hidePrices ? [] : (t?.pricingSection?.plans || [])
    .map((p) => parseFloat(`${p.price}`))
    .filter((n) => !Number.isNaN(n));
  const minPrice = numericPrices.length ? Math.min(...numericPrices) : undefined;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t?.pageBanner || (isEn ? "Service" : "Servicio"),
    description: seoDesc,
    serviceType: slug || (isEn ? "service" : "servicio"),
    inLanguage: isEn ? "en" : "es",
    provider: {
      "@type": "Organization",
      name: "Software Strategy",
      url: siteBase,
    },
    ...(minPrice
      ? {
          offers: {
            "@type": "Offer",
            url: canonicalUrl,
            priceCurrency: "USD",
            price: promoActive ? discountPrice(minPrice) : `${minPrice}`,
            ...(promoActive ? { priceValidUntil: PROMO_DEADLINE_ISO } : {}),
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <>
      {/* Hero slider (shared with Marketing) */}
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
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalUrl}
        additionalLinkTags={[
          { rel: "alternate", hrefLang: "es", href: altEsUrl },
          { rel: "alternate", hrefLang: "en", href: altEnUrl },
          { rel: "alternate", hrefLang: "x-default", href: altEsUrl },
        ]}
        openGraph={{
          url: canonicalUrl,
          title: seoTitle,
          description: seoDesc,
          locale: ogLocale,
          siteName: "Software Strategy",
          images: DefaultSEO?.openGraph?.images || [],
        }}
        languageAlternates={[
          { hrefLang: "es", href: altEsUrl },
          { hrefLang: "en", href: altEnUrl },
        ]}
      />

      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: isEn ? "Home" : "Inicio", item: `${siteBase}` },
          { position: 2, name: isEn ? "Services" : "Servicios", item: `${siteBase}${isEn ? "en/services" : "services"}` },
          { position: 3, name: t?.pageBanner || (isEn ? "Service" : "Servicio"), item: canonicalUrl },
        ]}
      />

      {faqItems?.length > 0 && (
        <FAQPageJsonLd mainEntity={faqItems} />
      )}

      {offers?.length > 0 && (
        <ProductJsonLd
          productName={t?.pageBanner || (isEn ? "Service" : "Servicio")}
          description={seoDesc}
          brand={{ name: "Software Strategy" }}
          images={[
            toAbsoluteUrl(
              t?.pricingSection?.image ||
                t?.about?.image ||
                "/assets/images/banner/banner-bg.jpg"
            ),
          ].filter(Boolean)}
          offers={offers}
        />
      )}

      {/* Service JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Banner */}
      <PageBanner
        pageName={t.pageBanner}
        homeLabel={isEn ? "Home" : "Inicio"}
        homeHref={withLang("/")}
        parentLabel={isEn ? "Services" : "Servicios"}
        parentHref={withLang("/services")}
      />

      {/* About / Qué ofrecemos */}
      <section className="why-choose-area pt-130 rpt-100 pb-100 rpb-70">
        <div className="container">
          <div className="row align-items-center">
            {/* Texto */}
            <div className="col-xl-5">
              <div className="row">
                <div className="col-xl-11">
                  <div className="why-choose-left-content mb-30 rmb-55 wow fadeInLeft delay-0-2s">
                    <div className="section-title mb-50">
                      <span className="sub-title mb-15">{t.about?.subtitle}</span>
                      <h2>{t.about?.title}</h2>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <ul className="list-style-one">
                          {t.about?.featuresCol1?.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-sm-6">
                        <ul className="list-style-one">
                          {t.about?.featuresCol2?.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link legacyBehavior href={withLang("/contact")}>
                      <a id="cta-service-about" className="theme-btn style-two mt-35" data-cta="service-about">
                        {t?.ctaPrimary ?? (isEn ? "Request a quote" : "Pedir cotización")} <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="col-xl-7">
              <div className="row">
                <div className="col-12">
                  <div className="image wow zoomIn delay-0-2s text-center">
                    <img src={t.about?.image || "/assets/images/banner/banner-bg.jpg"} alt={t.about?.imageAlt || (isEn ? "Service" : "Servicio")} style={{ maxWidth: "100%", height: "auto" }} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>
            {/* /Imagen */}
          </div>
        </div>
      </section>
      {/* /About */}

      {/* Existing Websites: audits, updates and improvements */}
      {t.existingWebsite && (
        <section className="why-choose-area pt-100 rpt-80 pb-100 rpb-70">
          <div className="container">
            <div className="row align-items-center">
              {/* Imagen */}
              <div className="col-xl-6 rmb-55 wow fadeInLeft delay-0-2s">
                <div className="image text-center">
                  <img
                    src={t.existingWebsite.image || "/assets/images/about/about-five2.jpg"}
                    alt={t.existingWebsite.imageAlt || (isEn ? "Website audit and improvements" : "Auditoría y mejoras de sitio")}
                    style={{ maxWidth: "100%", height: "auto" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Texto */}
              <div className="col-xl-6 wow fadeInRight delay-0-2s">
                <div className="why-choose-left-content">
                  <div className="section-title mb-30">
                    {t.existingWebsite.subtitle && <span className="sub-title mb-15">{t.existingWebsite.subtitle}</span>}
                    {t.existingWebsite.title && <h2>{t.existingWebsite.title}</h2>}
                  </div>
                  {t.existingWebsite.description && <p className="mb-15">{t.existingWebsite.description}</p>}
                  <div className="row">
                    <div className="col-sm-6">
                      <ul className="list-style-one">
                        {(t.existingWebsite.bulletsCol1 || []).map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <ul className="list-style-one">
                        {(t.existingWebsite.bulletsCol2 || []).map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex gap-3 flex-wrap mt-25">
                    <Link legacyBehavior href={withLang(t.existingWebsite.ctaPrimaryHref || "/contact")}>
                      <a id="cta-service-existing-primary" className="theme-btn" data-cta="service-existing-primary">
                        {t.existingWebsite.ctaPrimary || (isEn ? "Request audit" : "Solicitar auditoría")} <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                    {t.existingWebsite.ctaSecondary && (
                      <Link legacyBehavior href={withLang(t.existingWebsite.ctaSecondaryHref || "/services/google-seo")}>
                        <a id="cta-service-existing-secondary" className="read-more" data-cta="service-existing-secondary">
                          {t.existingWebsite.ctaSecondary} <i className="far fa-arrow-right" />
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Extra sections inspired by index2 (only if provided in content) */}
      {t.extra?.advertise && (
        <section className="advertise-banner-area rel z-1">
          <div className="container container-1290">
            <div className="row">
              <div className="col-lg-7 wow fadeInUp delay-0-2s">
                <div className="advertise-banner style-one bgc-primary" style={{ backgroundImage: "url(/assets/images/banner/add-banner-bg.png)" }}>
                  <div className="image">
                    <img src={t.extra.advertise.left?.image || "/assets/images/banner/add-banner.png"} alt="Banner" loading="lazy" decoding="async" />
                  </div>
                  <div className="content mt-20">
                    {t.extra.advertise.left?.number && <span className="number">{t.extra.advertise.left.number}</span>}
                    {t.extra.advertise.left?.label && <h6>{t.extra.advertise.left.label}</h6>}
                    <hr />
                    <p>{t.extra.advertise.left?.text}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 wow fadeInUp delay-0-4s">
                <div className="advertise-banner style-two bg-white" style={{ backgroundImage: "url(/assets/images/banner/star-vector.png)" }}>
                  <h3>{t.extra.advertise.right?.title}</h3>
                  <hr className="mb-35" />
                  <p className="mb-0">{t.extra.advertise.right?.note}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {t.extra?.skills?.length > 0 && (
        <section className="skills-area pt-100 rpt-70 rel z-1">
          <div className="container container-1590">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                  <h2>{isEn ? "Here are Numerous Topics That Will Enhance Your Skills" : "Tecnologías que potencian tus soluciones"}</h2>
                </div>
              </div>
            </div>
            <div className="skills-wrap">
              <div className="skill-item">
                <img src="/assets/images/skills/skill1.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">Bootstrap</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill2.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">HTML</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill3.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">CSS</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill4.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">javascript</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill5.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">React</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill6.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">WordPress</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill7.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">php</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill8.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">node.js</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill9.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">Sass</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill10.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">Angular</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill11.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">Shopify</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill12.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">Elementor</span>
              </div>
              <div className="skill-item">
                <img src="/assets/images/skills/skill13.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">Vue.js</span>
              </div>
                <div className="skill-item">
                <img src="/assets/images/skills/skill14.png" alt="Skill Icon" loading="lazy" decoding="async" />
                <span className="text">Java</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {t.extra?.aboutCounters && (
        <section className="about-area pt-100 rpt-70 rel z-1">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-7">
                <div className="about-content">
                  <div className="section-title mb-40 wow fadeInUp delay-0-2s">
                    <span className="sub-title mb-15">{t.extra.aboutCounters.subtitle}</span>
                    <h2>{t.extra.aboutCounters.title}</h2>
                  </div>
                  <div className="text-left-border mt-60 mb-65 wow fadeInUp delay-0-2s">
                    <p>{t.extra.aboutCounters.text}</p>
                  </div>
                  {t.extra.aboutCounters.counters?.length > 0 && (
                    <div className="about-counter">
                      <div className="row">
                        {t.extra.aboutCounters.counters.map((c, i) => (
                          <div className="col-md-4 col-sm-6" key={`${c.label}-${i}`}>
                            <div className={`counter-item-two counter-text-wrap wow fadeInUp delay-0-${2 + i}s`}>
                              <Counter end={c.value} extraClass={c.suffix ? "percent" : undefined} />
                              <span className="counter-title">{c.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-5">
                <div className="image-border-shape wow fadeInRight delay-0-2s">
                    <img src={t.extra.aboutCounters.image || "/assets/images/about/about-image-shape.png"} alt={t.extra.aboutCounters.imageAlt || "About"} loading="lazy" decoding="async" />
                  <div className="bottom-border" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What we do */}
      <section className="about-area pb-100 rpb-70">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-8">
              <div className="section-title wow fadeInUp delay-0-2s">
                <span className="sub-title mb-15">{t.whatWeDo?.subtitle}</span>
                <h2>{t.whatWeDo?.title}</h2>
                <p className="mt-20">{t.whatWeDo?.text}</p>
                {Array.isArray(t.whatWeDo?.bullets) && t.whatWeDo.bullets.length > 0 && (
                  <div className="d-md-flex align-items-start mt-15">
                    <img
                      src="/assets/images/projects/project-timeline2.jpg"
                      alt={isEn ? "Project timeline illustration" : "Ilustración de línea de tiempo de proyecto"}
                      className="d-block mb-3 mb-md-0 me-md-4"
                      style={{ width: "100%", maxWidth: 360, height: "auto", borderRadius: 8 }}
                    />
                    <ul className="list-style-one mt-0">
                      {t.whatWeDo.bullets.map((b, i) => (
                        <li key={`wwd-b-${i}`}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(t.whatWeDo?.ads) && t.whatWeDo.ads.length > 0 && (
                  <>
                    <h5 className="mt-25">{isEn ? 'Ready for Google Ads' : 'Preparados para Google Ads'}</h5>
                    <div className="d-md-flex align-items-start">
                      <ul className="list-style-one mt-10 mb-0 me-md-4">
                        {t.whatWeDo.ads.map((a, i) => (
                          <li key={`wwd-ads-${i}`}>{a}</li>
                        ))}
                      </ul>
                      <img
                        src="/assets/images/projects/project-timeline1.jpg"
                        alt={isEn ? "Project plan illustration" : "Ilustración de plan de proyecto"}
                        className="d-block mt-3 mt-md-0 ms-md-2"
                        style={{ width: "100%", maxWidth: 360, height: "auto", borderRadius: 8 }}
                      />
                    </div>
                  </>
                )}
                {t.whatWeDo?.ctaHref && (
                  <Link legacyBehavior href={withLang(t.whatWeDo.ctaHref)}>
                    <a id="cta-service-what" className="theme-btn mt-25" data-cta="service-what-cta">
                      {t.whatWeDo?.ctaText || (isEn ? 'Request proposal' : 'Solicitar propuesta')} <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                )}
              </div>
            </div>
            <div className="col-xl-4 text-xl-end mt-25 rmt-15">
              <Link legacyBehavior href="#paquetes-web">
                <a id="cta-service-view-plans" className="explore-more" data-cta="service-view-plans">
                  <i className="fas fa-arrow-right" /> <span>{t?.ctaSecondary ?? (isEn ? "View plans" : "Ver planes")}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* /What we do */}

      {t.extra?.projectTimeline?.items?.length > 0 && (
        <section className="project-timeline-two-area pt-90 rpt-60 pb-20 rpb-10 rel z-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="section-title text-center mb-55 wow fadeInUp delay-0-2s">
                  {t.extra.projectTimeline.subtitle && <span className="sub-title mb-20">{t.extra.projectTimeline.subtitle}</span>}
                  {t.extra.projectTimeline.title && <h2>{t.extra.projectTimeline.title}</h2>}
                </div>
              </div>
            </div>
            <div className="row">
              {t.extra.projectTimeline.items.map((it, idx) => (
                <div className="col-lg-6" key={`${it.title}-${idx}`}>
                  <div className="project-timeline-two wow fadeInUp delay-0-2s">
                    {it.number && <span className="serial-number">{it.number}</span>}
                    <h4>{it.title}</h4>
                    {it.image && (
                      <div className="image">
                        <img src={it.image} alt={it.title} loading="lazy" decoding="async" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing dentro del servicio */}
      <section id="paquetes-web" className="pricing-area-three pb-85 rpb-55" style={{ backgroundImage: "url(/assets/images/background/pricing-bg-dot-shape.png)" }} aria-label={isEn ? "Web development packages" : "Paquetes de desarrollo web y marketing"}>
        <div className="container container-1290">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-20">{t.pricingSection?.subtitle}</span>
                <h2>{t.pricingSection?.title}</h2>
                {t.pricingSection?.description && (
                  <p className="mt-10">{t.pricingSection.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            {t.pricingSection?.plans?.slice(0, 3).map((plan, i) => (
              <div className="col-xl-4 col-md-6" key={plan.name}>
                <article className={`pricing-plan-item wow fadeInUp delay-0-${2 + i * 2}s ${i === 1 ? "style-two" : ""}${promoActive ? ' has-promo' : ''}`}>
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
                      {!hidePrices && (
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

                  <ul className={`list-style-one ${plan.twoColumn || i === 1 ? "two-column" : ""}`}>
                    {plan.features?.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  {promoActive && (
                    <p className="promo-until mt-10">{promoUntilText}</p>
                  )}

                  <Link legacyBehavior href={buildWhatsUrl(plan.name, promoActive ? discountPrice(plan.price) : plan.price)}>
                    <a
                      id={`cta-service-pricing-${(plan.slug || plan.name || i).toString().toLowerCase().replace(/\s+/g, '-')}`}
                      className="theme-btn w-100"
                      data-cta="pricing"
                      data-plan={(plan.slug || plan.name || '').toString().toLowerCase().replace(/\s+/g, '-')}
                      data-price={promoActive ? discountPrice(plan.price) : plan.price}
                      data-currency="USD"
                      aria-label={(isEn ? 'Speak with a specialist about ' : 'Hablar con un especialista sobre ') + plan.name}
                      target="_blank" rel="noopener noreferrer"
                    >
                      {plan.cta || (isEn ? 'Request a quote' : 'Hablar con un especialista')} <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                </article>
              </div>
            ))}
          </div>

          {t.pricingSection?.note && (
            <div className="row mt-20">
              <div className="col-12">
                <p className="text-center small text-muted">{t.pricingSection.note}</p>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Products JSON-LD for pricing plans */}
      {Array.isArray(t.pricingSection?.plans) && t.pricingSection.plans.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': t.pricingSection.plans.map((p) => ({
                '@type': 'Product',
                name: p.name,
                category: p.category || (isEn ? 'Web development' : 'Desarrollo web'),
                description: p.description || '',
                image: toAbsoluteUrl(
                  p.image || t?.pricingSection?.image || t?.about?.image || '/assets/images/banner/banner-bg.jpg'
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
      {/* /Pricing */}

      {/* FAQ's Area start */}
      <section className="faq-area pt-90 rpt-55 pb-130 rpb-75 rel z-1">
        <div className="container">
          <div className="row align-items-center gap-100">
            {/* Imagen izquierda */}
            <div className="col-lg-5">
              <div className="faq-iamge-part rmb-55 wow fadeInLeft delay-0-2s">
                <img src={t.faqs?.image || "/assets/images/faqs/faq-two.jpg"} alt={t.faqs?.imageAlt || (isEn ? "FAQs" : "Preguntas frecuentes")} loading="lazy" decoding="async" />
              </div>
            </div>

            {/* Acordeón derecha */}
            <div className="col-lg-7">
              <div className="faq-content-part wow fadeInRight delay-0-2s">
                <div className="section-title mb-60">
                  <span className="sub-title mb-15">{t.faqs?.subtitle}</span>
                  <h2>{t.faqs?.title}</h2>
                </div>

                {/* Estado del acordeón */}
                <AccordionLite items={t.faqs?.items || []} />
              </div>
            </div>
          </div>
        </div>

        {/* Shapes decorativos */}
        <div className="faq-shapes">
          <img className="shape left" src="/assets/images/shapes/ellipse-left.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <img className="shape right" src="/assets/images/shapes/ellipse-right.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
      </section>
      {/* FAQ's Area end */}

      {/* CTA final */}
      <section className="work-with-area pb-150 rpb-145 rel z-1">
        <div className="container">
          <div className="row justify-content-center pb-45 rpb-25">
            <div className="col-xl-7 col-lg-9">
              <div className="section-title text-center wow fadeInUp delay-0-2s">
                <span className="sub-title mb-15">{t.workWithUs?.subtitle}</span>
                <h2>{t.workWithUs?.title}</h2>
                <Link legacyBehavior href={withLang("/contact")}>
                  <a id="cta-service-work-with-us" className="explore-more text-start mt-30" data-cta="service-work-with-us">
                    <i className="fas fa-arrow-right" /> <span>{t.workWithUs?.cta}</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <span className="big-text light-opacity">{t.workWithUs?.bigText}</span>
      </section>
      {/* /CTA final */}
    </>
  );
}

function AccordionLite({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="accordion" id="faq-accordion-generic">
      {items.map((item, i) => (
        <YgencyAccordionLite key={`faq-${i}`} title={item.q} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}>
          <p>{item.a}</p>
        </YgencyAccordionLite>
      ))}
    </div>
  );
}

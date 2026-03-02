import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import YgencyAccordionLite from "@/src/components/YgencyAccordionLite";
import { useState } from "react";
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Link from "next/link";

export default function FaqsPage({ t, locale = "es" }) {
  const isEn = locale === "en";

  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const path = "/faqs";
  const canonicalUrl = `${siteBase}${isEn ? `/en${path}` : path}`;

  const faqItems = (t?.items || []).map((q, i) => ({
    position: i + 1,
    questionName: q.q,
    acceptedAnswerText: q.a,
  }));
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Layout dark locale={locale}>
      <NextSeo
        title={t?.seo?.title || (isEn ? "FAQs" : "Preguntas frecuentes")}
        description={t?.seo?.description || (isEn
          ? "Answers about web development, custom software, SEO/SEM and marketing services."
          : "Respuestas sobre desarrollo web, software a medida, SEO/SEM y marketing.")}
        canonical={canonicalUrl}
        languageAlternates={[
          { hrefLang: "es", href: `${siteBase}${path}` },
          { hrefLang: "en", href: `${siteBase}/en${path}` },
        ]}
        openGraph={{
          url: canonicalUrl,
          title: t?.seo?.title || (isEn ? "FAQs" : "Preguntas frecuentes"),
          description: t?.seo?.description || "",
          locale: isEn ? "en_US" : "es_UY",
          siteName: "Software Strategy",
        }}
      />

      {faqItems?.length > 0 && (
        <FAQPageJsonLd mainEntity={faqItems} />
      )}

      <PageBanner
        pageName={t.pageBanner}
        homeLabel={isEn ? "Home" : "Inicio"}
        homeHref={isEn ? "/en" : "/"}
      />

      <section className="faq-area pt-130 rpt-100 pb-130 rpb-75 rel z-1">
        <div className="container">
          <div className="row align-items-center gap-100">
            <div className="col-lg-5">
              <div className="faq-iamge-part rmb-55 wow fadeInLeft delay-0-2s">
                <img src={t.image || "/assets/images/faqs/faq-two.jpg"} alt={t.imageAlt || (isEn ? "FAQs" : "Preguntas frecuentes")} title={t.imageAlt || (isEn ? "FAQs" : "Preguntas frecuentes")} width="520" height="600" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="faq-content-part wow fadeInRight delay-0-2s">
                <div className="section-title mb-60">
                  <span className="sub-title mb-15">{t.subtitle}</span>
                  <h2>{t.title}</h2>
                </div>
                <div className="accordion" id="faq-accordion-two">
                  {(t.items || []).map((qa, i) => (
                    <YgencyAccordionLite
                      key={`faq-${i}`}
                      title={qa.q}
                      isOpen={openIndex === i}
                      onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                    >
                      <p>{qa.a}</p>
                    </YgencyAccordionLite>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-shapes">
          <img className="shape left" src="/assets/images/shapes/ellipse-left.png" alt="" title="Forma decorativa izquierda" width="50" height="100" aria-hidden="true" loading="lazy" decoding="async" />
          <img className="shape right" src="/assets/images/shapes/ellipse-right.png" alt="" title="Forma decorativa derecha" width="50" height="100" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
      </section>

      {t?.cta && (
        <section className="work-with-area pb-150 rpb-145 rel z-1">
          <div className="container">
            <div className="row justify-content-center pb-45 rpb-25">
              <div className="col-xl-7 col-lg-9">
                <div className="section-title text-center wow fadeInUp delay-0-2s">
                  <span className="sub-title mb-15">{t.cta.subtitle}</span>
                  <h2>{t.cta.title}</h2>
                  <Link legacyBehavior href={t.cta.primaryHref || (isEn ? "/en/contact" : "/contact")}>
                    <a className="theme-btn mt-30" data-cta="faqs-cta-primary" title={t.cta.linkLabel}>
                      {t.cta.linkLabel} <i className="fas fa-arrow-right" />
                    </a>
                  </Link>
                  {t.cta.secondaryLabel && (
                    <div className="mt-20">
                      <Link legacyBehavior href={t.cta.secondaryHref || (isEn ? "/en/contact" : "/contact")}>
                        <a className="read-more" data-cta="faqs-cta-secondary" title={t.cta.secondaryLabel}>
                          {t.cta.secondaryLabel} <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <span className="big-text light-opacity">{t.cta.bigText}</span>
        </section>
      )}
    </Layout>
  );
}

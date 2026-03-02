import Layout from "@/src/layout/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import fs from "fs";
import path from "path";

export default function E404({ t, locale = "es" }) {
  const isEn = locale === "en";

  // Prefija /en a las rutas internas si corresponde
  const withLang = (href) => {
    if (!href) return "/";
    if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
    return isEn ? `/en${href === "/" ? "" : href}` : href;
  };

  return (
    <Layout dark locale={locale}>
      <NextSeo title={isEn ? "Page not found" : "Página no encontrada"} noindex nofollow />
      <section className="error-section pt-220 rpt-120 pb-100 rpb-80 rel z-1" style={{ backgroundImage: "url(/assets/images/hero/hero-two-bg.png)" }}>
        <div className="container container-1290">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="error-content rmb-55 wow fadeInRight delay-0-2s">
                <h1>{t.title}</h1>
                <div className="section-title mb-50 rmb-35">
                  <h2>{t.subtitle}</h2>
                </div>
                <Link legacyBehavior href={withLang("/")}>
                  <a className="theme-btn style-two" data-cta="404-home" title={t.cta}>
                    {t.cta} <i className="fas fa-arrow-right" />
                  </a>
                </Link>
                <div className="social-style-four d-flex mt-60 rmt-35">
                  {t.social?.map((s) => (
                    <a href={s.href} key={s.label} title={s.label} aria-label={s.label}>
                      <i className={s.icon} /> <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="error-image wow zoomIn delay-0-2s">
                <img src="/assets/images/background/404-error.png" alt="404 Error" title="404 Error" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// 🚀 getStaticProps: carga traducciones multiidioma
export async function getStaticProps({ locale = "es" }) {
  const filePath = path.join(process.cwd(), "content", locale, "404.json");

  let t = { title: "OOPS!", subtitle: "This page can’t be found", cta: "Go to Home", social: [] };
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    t = JSON.parse(raw);
  } catch (err) {
    console.warn(`[404] No se pudo cargar ${filePath}. Usando fallback por defecto.`);
  }

  return {
    props: { t, locale },
  };
}

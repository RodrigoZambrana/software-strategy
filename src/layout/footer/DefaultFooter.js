import Link from "next/link";
import { ArrowRightIcon, FacebookIcon, InstagramIcon } from "@/src/components/icons/SimpleIcons";

/**
 * DefaultFooter multilenguaje
 * Props:
 *  - dark?: boolean
 *  - locale: "es" | "en"
 *  - t: objeto de traducciones del footer (ver JSON más abajo)
 */
const DefaultFooter = ({ dark, locale, t }) => {
  const isEn = locale === "en";
  const renderSocialIcon = (label) => {
    const key = (label || "").toLowerCase();
    if (key.includes("facebook")) return <FacebookIcon />;
    if (key.includes("instagram")) return <InstagramIcon />;
    return null;
  };

  // Prefija /en a rutas internas cuando el idioma es EN
  const withLang = (href) => {
    if (!href) return "/";
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
    const path = href.startsWith("/") ? href : `/${href}`;
    if (isEn) {
      if (path === "/en" || path.startsWith("/en/")) return path;
      return `/en${path}`;
    }
    return path.startsWith("/en/") || path === "/en" ? (path.replace(/^\/en/, "") || "/") : path;
  };

  return (
    <footer
      className="main-footer rel z-1"
      style={{ backgroundImage: "url(/assets/images/footer/footer-bg-shape.png)" }}
    >
      <div className="container container-1290">
        {/* Top */}
        <div className="footer-top pt-80 pb-60">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="footer-logo mb-20 wow fadeInRight delay-0-2s">
                <Link legacyBehavior href={withLang("/")}>
                  <a data-cta="footer-brand" title="Software Strategy">
                    <img
                      src={
                        dark
                          ? "/assets/images/logos/logo-and-text.png"
                          : "/assets/images/logos/logo-and-text.png"
                      }
                      alt={t.brandAlt}
                      title={t.brandAlt}
                      width="1000"
                      height="224"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-8 text-lg-end">
              <div className="social-style-four mb-20 wow fadeInLeft delay-0-2s">
                {t.social?.map((s) => (
                  <a href={s.href} key={s.label} aria-label={s.label} title={s.label} data-cta="footer-social" data-network={s.label}>
                    {renderSocialIcon(s.label)} <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle */}
        <div className="row">
          <div className="col-lg-8">
            <div className="footer-left-content pt-80">
              <div className="lets-work mb-50 wow fadeInUp delay-0-2s">
                <img src="/assets/images/footer/lets-work.png" alt={t.letsWorkAlt} title={t.letsWorkAlt} width="80" height="80" />
                <span>{t.letsWork}</span>
              </div>
              <div className="footer-contact-info wow fadeInUp delay-0-3s">
                {t.contacts?.email && (
                  <a className="theme-btn style-three" href={`mailto:${t.contacts.email}`} title={t.contacts.email} data-cta="footer-email">
                    {t.contacts.email} <ArrowRightIcon className="cta-icon" />
                  </a>
                )}
                {t.contacts?.phone && (
                  <a className="theme-btn style-three phone-number" href={`tel:${t.contacts.phoneDial}`} title={t.contacts.phoneDisplay} data-cta="footer-phone">
                    {t.contacts.phoneDisplay} <ArrowRightIcon className="cta-icon" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="footer-right-content">
              <h4 className="footer-title wow fadeInUp delay-0-2s">{t.quickLinksTitle}</h4>

              <div className="footer-widget widget_nav_menu quick-links-grid">
                {/* Columna 1 */}
                <ul className="list-style-two quick-links-list wow fadeInUp delay-0-3s">
                  {t.quickLinksCol1?.map((item) => (
                    <li key={item.label}>
                      <Link legacyBehavior href={withLang(item.href)}>
                        <a data-cta="footer-quick-link" data-link={item.href} title={item.label}>{item.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Columna 2 */}
                <ul className="list-style-two quick-links-list wow fadeInUp delay-0-4s">
                  {t.quickLinksCol2?.map((item) => (
                    <li key={item.label}>
                      <Link legacyBehavior href={withLang(item.href)}>
                        <a data-cta="footer-quick-link" data-link={item.href} title={item.label}>{item.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-6">
              <div className="footer-bottom-menu pt-40 pb-35 rpb-0 wow fadeInRight delay-0-2s">
                <ul>
                  {t.bottomMenu?.map((item) => (
                    <li key={item.label}>
                      <Link legacyBehavior href={withLang(item.href)}>
                        <a data-cta="footer-bottom-link" data-link={item.href} title={item.label}>{item.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6">
              <div className="copyright-text text-lg-end pt-40 pb-35 rpt-10 wow fadeInLeft delay-0-2s">
                <p>
                  {t.copyright.prefix}{" "}
                  <Link legacyBehavior href={withLang("/")}>
                    <a data-cta="footer-brand" title={t.brandName}>{t.brandName}</a>
                  </Link>{" "}
                  {t.copyright.suffix}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DefaultFooter;

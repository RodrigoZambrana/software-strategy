import Link from "next/link";
import { useState } from "react";

export default function MobileSlideMenu({ locale = "es" }) {
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

  const [open, setOpen] = useState({ services: true, pages: false, blog: false });

  const seoHref = withLang("/services/google-seo");
  const webDevHref = withLang(isEn ? "/services/web-development" : "/desarrollo-sitios-web-uruguay");
  const customSoftwareHref = withLang(isEn ? "/services/custom-software" : "/desarrollo-software-medida-uruguay");
  const titleFor = (label) => label;

  return (
    <div className="slide-panel-content">
      <div className="slide-panel-logo mb-20">
        <img src="/assets/images/logos/logo-and-text.png" alt="Software Strategy" title="Software Strategy" width="1000" height="224" style={{ maxWidth: 160, height: "auto" }} />
      </div>
      {/* Replicar estructura de navbar original para heredar estilos */}
      <div className="main-menu">
        <div className="navbar-collapse clearfix collapse show">
        {/* Lista desktop (no visible en panel, pero mantiene estructura) */}
        <ul className="navigation d-none d-lg-flex desktop-menu">
          <li>
            <Link legacyBehavior href={withLang("/")}> 
              <a className="gtm-menu-link" data-cta="nav-home" title={titleFor(isEn ? "Home" : "Inicio")}>{isEn ? "Home" : "Inicio"}</a>
            </Link>
          </li>
          <li className="dropdown">
            <a href="#" title={titleFor(isEn ? "Services" : "Servicios")}>{isEn ? "Services" : "Servicios"}</a>
            <ul>
              <li><Link legacyBehavior href={webDevHref}><a className="gtm-menu-link" data-cta="nav-services-web-development" title={titleFor(isEn ? "Web Development" : "Sitios Web para PYMEs en Uruguay")}>{isEn ? "Web Development" : "Sitios Web para PYMEs en Uruguay"}</a></Link></li>
              <li><Link legacyBehavior href={customSoftwareHref}><a className="gtm-menu-link" data-cta="nav-services-custom-software" title={titleFor(isEn ? "Custom Software" : "Software a medida en Uruguay")}>{isEn ? "Custom Software" : "Software a medida en Uruguay"}</a></Link></li>
              <li><Link legacyBehavior href={seoHref}><a className="gtm-menu-link" data-cta="nav-services-google-seo" title={titleFor(isEn ? "Google Visibility" : "Visibilidad en Google")}>{isEn ? "Google Visibility" : "Visibilidad en Google"}</a></Link></li>
              <li><Link legacyBehavior href={withLang("/services/digital-marketing")}><a className="gtm-menu-link" data-cta="nav-services-digital-marketing" title={titleFor(isEn ? "Digital Marketing" : "Marketing Digital")}>{isEn ? "Digital Marketing" : "Marketing Digital"}</a></Link></li>
              <li><Link legacyBehavior href={withLang("/services")}><a className="gtm-menu-link" data-cta="nav-services-all" title={titleFor(isEn ? "All Services" : "Todos los servicios")}>{isEn ? "All Services" : "Todos los servicios"}</a></Link></li>
            </ul>
            <div className="dropdown-btn"><span className="fas fa-plus"></span></div>
          </li>
          <li><Link legacyBehavior href={withLang("/pricing")}><a className="gtm-menu-link" data-cta="nav-pricing" title={titleFor(isEn ? "Pricing" : "Precios")}>{isEn ? "Pricing" : "Precios"}</a></Link></li>
          <li><Link legacyBehavior href={withLang("/faqs")}><a className="gtm-menu-link" data-cta="nav-faqs" title={titleFor(isEn ? "FAQs" : "Preguntas frecuentes")}>{isEn ? "FAQs" : "Preguntas frecuentes"}</a></Link></li>
          <li><Link legacyBehavior href={withLang("/about")}><a className="gtm-menu-link" data-cta="nav-about" title={titleFor(isEn ? "About Us" : "Sobre Nosotros")}>{isEn ? "About Us" : "Sobre Nosotros"}</a></Link></li>
          <li><Link legacyBehavior href={withLang("/contact")}><a className="gtm-menu-link" data-cta="nav-contact" title={titleFor(isEn ? "Contact" : "Contacto")}>{isEn ? "Contact" : "Contacto"}</a></Link></li>
        </ul>
        {/* Lista móvil igual a la original */}
        <ul className="navigation d-block d-lg-none mobile-menu">
          <li>
            <Link legacyBehavior href={withLang("/")}>
              <a className="gtm-menu-link" data-cta="nav-home" title={titleFor(isEn ? "Home" : "Inicio")}>{isEn ? "Home" : "Inicio"}</a>
            </Link>
          </li>
          <li className="dropdown">
            <a href="#" title={titleFor(isEn ? "Services" : "Servicios")}>{isEn ? "Services" : "Servicios"}</a>
            <ul style={{ display: open.services ? "block" : "none" }}>
              <li><Link legacyBehavior href={webDevHref}><a className="gtm-menu-link" data-cta="nav-services-web-development" title={titleFor(isEn ? "Web Development" : "Sitios Web para PYMEs en Uruguay")}>{isEn ? "Web Development" : "Sitios Web para PYMEs en Uruguay"}</a></Link></li>
              <li><Link legacyBehavior href={customSoftwareHref}><a className="gtm-menu-link" data-cta="nav-services-custom-software" title={titleFor(isEn ? "Custom Software" : "Software a medida en Uruguay")}>{isEn ? "Custom Software" : "Software a medida en Uruguay"}</a></Link></li>
              <li><Link legacyBehavior href={seoHref}><a className="gtm-menu-link" data-cta="nav-services-google-seo" title={titleFor(isEn ? "Google Visibility" : "Visibilidad en Google")}>{isEn ? "Google Visibility" : "Visibilidad en Google"}</a></Link></li>
              <li><Link legacyBehavior href={withLang("/services/digital-marketing")}><a className="gtm-menu-link" data-cta="nav-services-digital-marketing" title={titleFor(isEn ? "Digital Marketing" : "Marketing Digital")}>{isEn ? "Digital Marketing" : "Marketing Digital"}</a></Link></li>
              <li><Link legacyBehavior href={withLang("/services")}><a className="gtm-menu-link" data-cta="nav-services-all" title={titleFor(isEn ? "All Services" : "Todos los servicios")}>{isEn ? "All Services" : "Todos los servicios"}</a></Link></li>
            </ul>
            <div className="dropdown-btn" onClick={() => setOpen({ ...open, services: !open.services })}>
              <span className="fas fa-plus"></span>
            </div>
          </li>
          <li><Link legacyBehavior href={withLang("/pricing")}><a className="gtm-menu-link" data-cta="nav-pricing" title={titleFor(isEn ? "Pricing" : "Precios")}>{isEn ? "Pricing" : "Precios"}</a></Link></li>
          <li><Link legacyBehavior href={withLang("/faqs")}><a className="gtm-menu-link" data-cta="nav-faqs" title={titleFor(isEn ? "FAQs" : "Preguntas frecuentes")}>{isEn ? "FAQs" : "Preguntas frecuentes"}</a></Link></li>
          <li><Link legacyBehavior href={withLang("/about")}><a className="gtm-menu-link" data-cta="nav-about" title={titleFor(isEn ? "About Us" : "Sobre Nosotros")}>{isEn ? "About Us" : "Sobre Nosotros"}</a></Link></li>
          <li><Link legacyBehavior href={withLang("/contact")}><a className="gtm-menu-link" data-cta="nav-contact" title={titleFor(isEn ? "Contact" : "Contacto")}>{isEn ? "Contact" : "Contacto"}</a></Link></li>
        </ul>
        </div>
      </div>
      <style jsx>{`
        .slide-panel-content { text-align: left; }
        .slide-panel-close { cursor: pointer; margin-bottom: 10px; }
        .slide-panel-menu ul { list-style: none; padding-left: 0; }
        .slide-panel-menu a { color: white; display: block; padding: 10px 0; }
        .mobile-menu .dropdown { position: relative; }
        .mobile-menu .dropdown .dropdown-btn { position: absolute; right: 0; top: 8px; cursor: pointer; }
        .sub-menu { padding-left: 15px; }
        .menu-item-has-children.open > a .submenu-toggler i { transform: rotate(180deg); }
      `}</style>
    </div>
  );
}

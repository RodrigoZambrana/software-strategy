import Link from "next/link";
import { Fragment, useState } from "react";

const Menu = ({ singleMenu, variant, locale }) => (
  <Fragment>
    {variant === 'minimal' ? (
      <>
        <MinimalDesktop locale={locale} />
        <MinimalMobile locale={locale} />
      </>
    ) : (
      <>
        <DaskTopMenu locale={locale} />
        <MobileMenuSimple locale={locale} />
      </>
    )}
  </Fragment>
);

export default Menu;

const DaskTopMenu = ({ locale }) => {
  const isEn = locale === 'en';
  const withLang = (href) => {
    if (!href) return '/';
    if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return href;
    const path = href.startsWith('/') ? href : `/${href}`;
    if (isEn) {
      if (path === '/en' || path.startsWith('/en/')) return path;
      return `/en${path}`;
    }
    return path.startsWith('/en/') || path === '/en' ? (path.replace(/^\/en/, '') || '/') : path;
  };
  return (
    <ul className="navigation d-none d-lg-flex desktop-menu">
      <li>
        <Link legacyBehavior href={withLang('/')}>
          <a className="gtm-menu-link" data-cta="nav-home">{isEn ? 'Home' : 'Inicio'}</a>
        </Link>
      </li>
      <li className="dropdown">
        <a href="#">{isEn ? 'Services' : 'Servicios'}</a>
        <ul>
          <li>
            <Link legacyBehavior href={withLang('services/web-development')}>
              <a className="gtm-menu-link" data-cta="nav-services-web-development">{isEn ? 'Web Development' : 'Desarrollo Web'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/digital-marketing')}>
              <a className="gtm-menu-link" data-cta="nav-services-digital-marketing">{isEn ? 'Digital Marketing' : 'Marketing Digital'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/custom-software')}>
              <a className="gtm-menu-link" data-cta="nav-services-custom-software">{isEn ? 'Custom Software' : 'Software a medida'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/google-seo')}>
              <a className="gtm-menu-link" data-cta="nav-services-google-seo">{isEn ? 'Google SEO' : 'Posicionamiento en Google (SEO)'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services')}>
              <a className="gtm-menu-link" data-cta="nav-services-all">{isEn ? 'All Services' : 'Todos los servicios'}</a>
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn">
          <span className="far fa-plus" />
        </div>
      </li>
      <li>
        <Link legacyBehavior href={withLang('pricing')}>
          <a className="gtm-menu-link" data-cta="nav-pricing">{isEn ? 'Pricing' : 'Precios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('faqs')}>
          <a className="gtm-menu-link" data-cta="nav-faqs">{isEn ? 'FAQs' : 'FAQs'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('about')}>
          <a className="gtm-menu-link" data-cta="nav-about">{isEn ? 'About Us' : 'Sobre Nosotros'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('contact')}>
          <a className="gtm-menu-link" data-cta="nav-contact">{isEn ? 'Contact' : 'Contacto'}</a>
        </Link>
      </li>
    </ul>
  );
};

const MobileMenuSimple = ({ locale }) => {
  const isEn = locale === 'en';
  const withLang = (href) => {
    if (!href) return '/';
    if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return href;
    const path = href.startsWith('/') ? href : `/${href}`;
    if (isEn) {
      if (path === '/en' || path.startsWith('/en/')) return path;
      return `/en${path}`;
    }
    return path.startsWith('/en/') || path === '/en' ? (path.replace(/^\/en/, '') || '/') : path;
  };
  const [activeMenu, setActiveMenu] = useState('Services');
  const activeMenuSet = (value) => setActiveMenu(activeMenu === value ? '' : value);
  const activeLi = (value) => (value === activeMenu ? { display: 'block' } : { display: 'none' });
  return (
    <ul className="navigation d-block d-lg-none mobile-menu">
      <li>
        <Link legacyBehavior href={withLang('/')}>
          <a className="gtm-menu-link" data-cta="nav-home">{isEn ? 'Home' : 'Inicio'}</a>
        </Link>
      </li>
      <li className="dropdown">
        <a href="#">{isEn ? 'Services' : 'Servicios'}</a>
        <ul style={activeLi('Services')}>
          <li>
            <Link legacyBehavior href={withLang('services/web-development')}>
              <a className="gtm-menu-link" data-cta="nav-services-web-development">{isEn ? 'Web Development' : 'Desarrollo Web'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/digital-marketing')}>
              <a className="gtm-menu-link" data-cta="nav-services-digital-marketing">{isEn ? 'Digital Marketing' : 'Marketing Digital'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/custom-software')}>
              <a className="gtm-menu-link" data-cta="nav-services-custom-software">{isEn ? 'Custom Software' : 'Software a medida'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/google-seo')}>
              <a className="gtm-menu-link" data-cta="nav-services-google-seo">{isEn ? 'Google SEO' : 'Posicionamiento en Google (SEO)'}
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services')}>
              <a className="gtm-menu-link" data-cta="nav-services-all">{isEn ? 'All Services' : 'Todos los servicios'}</a>
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn" onClick={() => activeMenuSet('Services')}>
          <span className="far fa-plus" />
        </div>
      </li>
      <li>
        <Link legacyBehavior href={withLang('faqs')}>
          <a className="gtm-menu-link" data-cta="nav-faqs">{isEn ? 'FAQs' : 'FAQs'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('pricing')}>
          <a className="gtm-menu-link" data-cta="nav-pricing">{isEn ? 'Pricing' : 'Precios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('about')}>
          <a className="gtm-menu-link" data-cta="nav-about">{isEn ? 'About Us' : 'Sobre Nosotros'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('contact')}>
          <a className="gtm-menu-link" data-cta="nav-contact">{isEn ? 'Contact' : 'Contacto'}</a>
        </Link>
      </li>
    </ul>
  );
};

const MinimalDesktop = ({ locale }) => {
  const isEn = locale === 'en';
  const withLang = (href) => {
    if (!href) return '/';
    if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return href;
    const path = href.startsWith('/') ? href : `/${href}`;
    if (isEn) {
      if (path === '/en' || path.startsWith('/en/')) return path;
      return `/en${path}`;
    }
    return path.startsWith('/en/') || path === '/en' ? (path.replace(/^\/en/, '') || '/') : path;
  };
  return (
    <ul className="navigation d-none d-lg-flex desktop-menu">
      <li>
        <Link legacyBehavior href={withLang('/')}>
          <a className="gtm-menu-link" data-cta="nav-home">{isEn ? 'Home' : 'Inicio'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/services')}>
          <a className="gtm-menu-link" data-cta="nav-services">{isEn ? 'Services' : 'Servicios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/pricing')}>
          <a className="gtm-menu-link" data-cta="nav-pricing">{isEn ? 'Pricing' : 'Precios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/contact')}>
          <a className="gtm-menu-link" data-cta="nav-contact">{isEn ? 'Contact' : 'Contacto'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/faqs')}>
          <a className="gtm-menu-link" data-cta="nav-faqs">{isEn ? 'FAQs' : 'Preguntas'}</a>
        </Link>
      </li>
    </ul>
  );
};

const MinimalMobile = ({ locale }) => {
  const isEn = locale === 'en';
  const withLang = (href) => {
    if (!href) return '/';
    if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return href;
    const path = href.startsWith('/') ? href : `/${href}`;
    if (isEn) {
      if (path === '/en' || path.startsWith('/en/')) return path;
      return `/en${path}`;
    }
    return path.startsWith('/en/') || path === '/en' ? (path.replace(/^\/en/, '') || '/') : path;
  };
  return (
    <ul className="navigation d-block d-lg-none mobile-menu">
      <li>
        <Link legacyBehavior href={withLang('/')}>
          <a className="gtm-menu-link" data-cta="nav-home">{isEn ? 'Home' : 'Inicio'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/services')}>
          <a className="gtm-menu-link" data-cta="nav-services">{isEn ? 'Services' : 'Servicios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/pricing')}>
          <a className="gtm-menu-link" data-cta="nav-pricing">{isEn ? 'Pricing' : 'Precios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/contact')}>
          <a className="gtm-menu-link" data-cta="nav-contact">{isEn ? 'Contact' : 'Contacto'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/faqs')}>
          <a className="gtm-menu-link" data-cta="nav-faqs">{isEn ? 'FAQs' : 'Preguntas'}</a>
        </Link>
      </li>
    </ul>
  );
};

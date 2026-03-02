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
  const titleFor = (label) => label;
  const webDevHref = isEn ? 'services/web-development' : 'desarrollo-sitios-web-uruguay';
  const customSoftwareHref = isEn ? 'services/custom-software' : 'desarrollo-software-medida-uruguay';
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
          <a className="gtm-menu-link" data-cta="nav-home" title={titleFor(isEn ? 'Home' : 'Inicio')}>{isEn ? 'Home' : 'Inicio'}</a>
        </Link>
      </li>
      <li className="dropdown">
        <a href="#" title={titleFor(isEn ? 'Services' : 'Servicios')}>{isEn ? 'Services' : 'Servicios'}</a>
        <ul>
          <li>
            <Link legacyBehavior href={withLang(webDevHref)}>
              <a className="gtm-menu-link" data-cta="nav-services-web-development" title={titleFor(isEn ? 'Web Development' : 'Sitios Web para PYMEs en Uruguay')}>{isEn ? 'Web Development' : 'Sitios Web para PYMEs en Uruguay'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang(customSoftwareHref)}>
              <a className="gtm-menu-link" data-cta="nav-services-custom-software" title={titleFor(isEn ? 'Custom Software' : 'Software a medida en Uruguay')}>{isEn ? 'Custom Software' : 'Software a medida en Uruguay'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/google-seo')}>
              <a className="gtm-menu-link" data-cta="nav-services-google-seo" title={titleFor(isEn ? 'Google Visibility' : 'Visibilidad en Google')}>{isEn ? 'Google Visibility' : 'Visibilidad en Google'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/digital-marketing')}>
              <a className="gtm-menu-link" data-cta="nav-services-digital-marketing" title={titleFor(isEn ? 'Digital Marketing' : 'Marketing Digital')}>{isEn ? 'Digital Marketing' : 'Marketing Digital'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services')}>
              <a className="gtm-menu-link" data-cta="nav-services-all" title={titleFor(isEn ? 'All Services' : 'Todos los servicios')}>{isEn ? 'All Services' : 'Todos los servicios'}</a>
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn">
          <span className="fas fa-plus" />
        </div>
      </li>
      <li>
        <Link legacyBehavior href={withLang('pricing')}>
          <a className="gtm-menu-link" data-cta="nav-pricing" title={titleFor(isEn ? 'Pricing' : 'Precios')}>{isEn ? 'Pricing' : 'Precios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('faqs')}>
          <a className="gtm-menu-link" data-cta="nav-faqs" title={titleFor(isEn ? 'FAQs' : 'Preguntas frecuentes')}>{isEn ? 'FAQs' : 'Preguntas frecuentes'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('about')}>
          <a className="gtm-menu-link" data-cta="nav-about" title={titleFor(isEn ? 'About Us' : 'Sobre Nosotros')}>{isEn ? 'About Us' : 'Sobre Nosotros'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('contact')}>
          <a className="gtm-menu-link" data-cta="nav-contact" title={titleFor(isEn ? 'Contact' : 'Contacto')}>{isEn ? 'Contact' : 'Contacto'}</a>
        </Link>
      </li>
    </ul>
  );
};

const MobileMenuSimple = ({ locale }) => {
  const isEn = locale === 'en';
  const titleFor = (label) => label;
  const webDevHref = isEn ? 'services/web-development' : 'desarrollo-sitios-web-uruguay';
  const customSoftwareHref = isEn ? 'services/custom-software' : 'desarrollo-software-medida-uruguay';
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
          <a className="gtm-menu-link" data-cta="nav-home" title={titleFor(isEn ? 'Home' : 'Inicio')}>{isEn ? 'Home' : 'Inicio'}</a>
        </Link>
      </li>
      <li className="dropdown">
        <a href="#" title={titleFor(isEn ? 'Services' : 'Servicios')}>{isEn ? 'Services' : 'Servicios'}</a>
        <ul style={activeLi('Services')}>
          <li>
            <Link legacyBehavior href={withLang(webDevHref)}>
              <a className="gtm-menu-link" data-cta="nav-services-web-development" title={titleFor(isEn ? 'Web Development' : 'Sitios Web para PYMEs en Uruguay')}>{isEn ? 'Web Development' : 'Sitios Web para PYMEs en Uruguay'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang(customSoftwareHref)}>
              <a className="gtm-menu-link" data-cta="nav-services-custom-software" title={titleFor(isEn ? 'Custom Software' : 'Software a medida en Uruguay')}>{isEn ? 'Custom Software' : 'Software a medida en Uruguay'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/google-seo')}>
              <a className="gtm-menu-link" data-cta="nav-services-google-seo" title={titleFor(isEn ? 'Google Visibility' : 'Visibilidad en Google')}>{isEn ? 'Google Visibility' : 'Visibilidad en Google'}
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services/digital-marketing')}>
              <a className="gtm-menu-link" data-cta="nav-services-digital-marketing" title={titleFor(isEn ? 'Digital Marketing' : 'Marketing Digital')}>{isEn ? 'Digital Marketing' : 'Marketing Digital'}</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href={withLang('services')}>
              <a className="gtm-menu-link" data-cta="nav-services-all" title={titleFor(isEn ? 'All Services' : 'Todos los servicios')}>{isEn ? 'All Services' : 'Todos los servicios'}</a>
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn" onClick={() => activeMenuSet('Services')}>
          <span className="fas fa-plus" />
        </div>
      </li>
      <li>
        <Link legacyBehavior href={withLang('faqs')}>
          <a className="gtm-menu-link" data-cta="nav-faqs" title={titleFor(isEn ? 'FAQs' : 'Preguntas frecuentes')}>{isEn ? 'FAQs' : 'Preguntas frecuentes'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('pricing')}>
          <a className="gtm-menu-link" data-cta="nav-pricing" title={titleFor(isEn ? 'Pricing' : 'Precios')}>{isEn ? 'Pricing' : 'Precios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('about')}>
          <a className="gtm-menu-link" data-cta="nav-about" title={titleFor(isEn ? 'About Us' : 'Sobre Nosotros')}>{isEn ? 'About Us' : 'Sobre Nosotros'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('contact')}>
          <a className="gtm-menu-link" data-cta="nav-contact" title={titleFor(isEn ? 'Contact' : 'Contacto')}>{isEn ? 'Contact' : 'Contacto'}</a>
        </Link>
      </li>
    </ul>
  );
};

const MinimalDesktop = ({ locale }) => {
  const isEn = locale === 'en';
  const titleFor = (label) => label;
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
          <a className="gtm-menu-link" data-cta="nav-home" title={titleFor(isEn ? 'Home' : 'Inicio')}>{isEn ? 'Home' : 'Inicio'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/services')}>
          <a className="gtm-menu-link" data-cta="nav-services" title={titleFor(isEn ? 'Services' : 'Servicios')}>{isEn ? 'Services' : 'Servicios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/pricing')}>
          <a className="gtm-menu-link" data-cta="nav-pricing" title={titleFor(isEn ? 'Pricing' : 'Precios')}>{isEn ? 'Pricing' : 'Precios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/contact')}>
          <a className="gtm-menu-link" data-cta="nav-contact" title={titleFor(isEn ? 'Contact' : 'Contacto')}>{isEn ? 'Contact' : 'Contacto'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/faqs')}>
          <a className="gtm-menu-link" data-cta="nav-faqs" title={titleFor(isEn ? 'FAQs' : 'Preguntas frecuentes')}>{isEn ? 'FAQs' : 'Preguntas frecuentes'}</a>
        </Link>
      </li>
    </ul>
  );
};

const MinimalMobile = ({ locale }) => {
  const isEn = locale === 'en';
  const titleFor = (label) => label;
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
          <a className="gtm-menu-link" data-cta="nav-home" title={titleFor(isEn ? 'Home' : 'Inicio')}>{isEn ? 'Home' : 'Inicio'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/services')}>
          <a className="gtm-menu-link" data-cta="nav-services" title={titleFor(isEn ? 'Services' : 'Servicios')}>{isEn ? 'Services' : 'Servicios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/pricing')}>
          <a className="gtm-menu-link" data-cta="nav-pricing" title={titleFor(isEn ? 'Pricing' : 'Precios')}>{isEn ? 'Pricing' : 'Precios'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/contact')}>
          <a className="gtm-menu-link" data-cta="nav-contact" title={titleFor(isEn ? 'Contact' : 'Contacto')}>{isEn ? 'Contact' : 'Contacto'}</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={withLang('/faqs')}>
          <a className="gtm-menu-link" data-cta="nav-faqs" title={titleFor(isEn ? 'FAQs' : 'Preguntas frecuentes')}>{isEn ? 'FAQs' : 'Preguntas frecuentes'}</a>
        </Link>
      </li>
    </ul>
  );
};

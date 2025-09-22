import Link from "next/link";
import Image from "next/image";
import LanguageSelect from "./LanguageSelect";
import Nav from "./Nav"; // navBarOriginal (referencia)
import NavSearch from "./NavSearch";

const Header5 = ({ singleMenu, dark, locale }) => {
  const isEn = locale === 'en';
  return (
    <header className="main-header menu-absolute header-two">
      <div className="header-upper">
      <div className="header-top bgc-primary">
        <div className="container container-1620">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="top-right">
              <LanguageSelect />
                <div className="social-style-two">
                  <a href="https://www.facebook.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="https://www.instagram.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Header-Upper*/}
        <div className="container container-1620 clearfix">
          <div className="header-inner rpy-10 rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link legacyBehavior href={isEn ? "/en" : "/"}>
                  <a className="gtm-menu-link" data-cta="nav-brand">
                    <Image
                      src={
                        dark
                          ? "/assets/images/logos/logo-and-text.png"
                          : "/assets/images/logos/logo-and-text.png"
                      }
                      alt="Logo"
                      title="Logo"
                      width={3163}
                      height={710}
                      priority
                      style={{ height: 42, width: "auto" }}
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer mx-lg-auto clearfix">
              {/* Main Menu - original style */}
              <Nav singleMenu={singleMenu} locale={locale} />
            </div>
            {/* Nav Search */}
            <NavSearch />
            {/* Menu Button */}
            <div className="menu-btns">
              {/* Mobile brand logo (visible on tablets/mobiles) */}
              <div className="mobile-brand d-xl-none" style={{marginRight: 12}}>
                <Link legacyBehavior href={isEn ? "/en" : "/"}>
                  <a className="gtm-menu-link" aria-label={isEn ? "Go to home" : "Ir al inicio"} data-cta="nav-brand-mobile">
                    <Image
                      src={dark ? "/assets/images/logos/logo-and-text.png" : "/assets/images/logos/logo-and-text.png"}
                      alt="Software Strategy"
                      width={3163}
                      height={710}
                      priority
                      style={{ height: 42, width: "auto" }}
                    />
                  </a>
                </Link>
              </div>
              <div className="call-anytime">
                <div className="icon">
                  <i className="fas fa-comments-alt" />
                </div>
                <div className="content">
                  <span>{isEn ? 'Call Anytime' : 'Llámanos'}</span>
                  <a href="callto:+59891258107">+598 912 58 107</a>
                </div>
              </div>
              {/* menu sidebar */}
              <div className="menu-sidebar d-xl-none" title={isEn ? "Menu" : "Menú"}>
                <span className="menu-label">{isEn ? "Menu" : "Menú"}</span>
                <button className="navbar-toggle" type="button" aria-label={isEn ? "Open menu" : "Abrir menú"} title={isEn ? "Open menu" : "Abrir menú"}>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};
export default Header5;

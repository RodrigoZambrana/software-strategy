import Link from "next/link";
import Nav from "./Nav";
import NavSearch from "./NavSearch";
import LanguageSelect from "./LanguageSelect";
const Header2 = ({ singleMenu, dark, locale = "es" }) => {
  const isEn = locale === "en";
  return (
    <header className="main-header menu-absolute">
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container container-1620 clearfix">
          <div className="header-inner rpy-10 rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link legacyBehavior href={isEn ? "/en" : "/"}>
                  <a>
                    <img
                      src={
                        dark
                          ? "/assets/images/logos/logo-and-text.png"
                          : "/assets/images/logos/logo-and-text.png"
                      }
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer ms-lg-auto clearfix">
              {/* Main Menu */}
              <Nav singleMenu={singleMenu} locale={locale} />
              {/* Main Menu End*/}
            </div>
            {/* Language */}
            <div className="d-none d-lg-block me-3">
              <LanguageSelect />
            </div>
            {/* Nav Search */}
            <NavSearch />
            {/* Menu Button */}
            <div className="menu-btns ms-lg-auto">
              {/* Mobile brand logo (visible on tablets/mobiles) */}
              <div className="mobile-brand d-xl-none" style={{marginRight: 12}}>
                <Link legacyBehavior href={isEn ? "/en" : "/"}>
                  <a aria-label={isEn ? "Go to home" : "Ir al inicio"}>
                    <img
                      src={dark ? "/assets/images/logos/logo-and-text.png" : "/assets/images/logos/logo-and-text.png"}
                      alt="Software Strategy"
                      style={{ height: 42, width: "auto" }}
                    />
                  </a>
                </Link>
              </div>
              <Link legacyBehavior href="/">
                <a className="theme-btn style-two me-4">
                  {isEn ? "Let’s Talk" : "Hablemos"} <i className="fas fa-arrow-right" />
                </a>
              </Link>
              {/* menu sidebar */}
              <div className="menu-sidebar" title={isEn ? "Menu" : "Menú"}>
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
export default Header2;

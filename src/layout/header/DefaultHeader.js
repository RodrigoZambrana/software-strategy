import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import NavSearch from "./NavSearch";
import LanguageSelect from "./LanguageSelect";

const DefaultHeader = ({ singleMenu, dark, locale = "es" }) => {
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
                  <a className="gtm-menu-link" data-cta="nav-brand" title="Software Strategy">
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
            <div className="nav-outer ms-lg-auto clearfix">
              {/* Main Menu */}
              <Nav singleMenu={singleMenu} locale={locale} />
              {/* Main Menu End*/}
            </div>
            {/* Language */}
            <div className="d-none d-lg-block">
              <LanguageSelect />
            </div>
            {/* Nav Search */}
            <NavSearch />
            {/* Menu Button */}
            <div className="menu-btns">
              {/* Mobile brand logo (visible on tablets/mobiles) */}
              <div className="mobile-brand d-xl-none" style={{marginRight: 12}}>
                <Link legacyBehavior href={locale === "en" ? "/en" : "/"}>
                  <a className="gtm-menu-link" aria-label={locale === "en" ? "Go to home" : "Ir al inicio"} data-cta="nav-brand-mobile" title="Software Strategy">
                    <Image
                      src={dark ? "/assets/images/logos/logo-and-text.png" : "/assets/images/logos/logo-and-text.png"}
                      alt="Software Strategy"
                      title="Software Strategy"
                      width={3163}
                      height={710}
                      priority
                      style={{ height: 42, width: "auto" }}
                    />
                  </a>
                </Link>
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
export default DefaultHeader;

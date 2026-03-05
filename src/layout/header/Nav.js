import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Menu from "./Menu";

const Nav = ({ singleMenu, variant, locale }) => {
  const [open, setOpen] = useState(false);
  const isEn = locale === 'en';
  return (
    <nav className="main-menu navbar-expand-lg">
      <div className="navbar-header py-10">
        <div className="mobile-logo">
          <Link legacyBehavior href={isEn ? "/en" : "/"}>
            <a className="gtm-menu-link" data-cta="nav-brand" title="Software Strategy">
              <Image
                src="/assets/images/logos/logo-and-text.png"
                alt="Logo"
                title="Logo"
                width={1000}
                height={224}
                priority
                style={{ height: 42, width: "auto" }}
              />
            </a>
          </Link>
        </div>
        {/* Toggle Button (no react-bootstrap to avoid findDOMNode) */}
        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
      <div className={`navbar-collapse clearfix collapse${open ? ' show' : ''}`}>
        <Menu singleMenu={singleMenu} variant={variant} locale={locale} />
      </div>
    </nav>
  );
};
export default Nav;

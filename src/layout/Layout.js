import { Fragment, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ScrollTop from "./ScrollTop";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import SideBar from "./header/SideBar";
import esFooter from "@/content/es/footer.json";
import enFooter from "@/content/en/footer.json";
import { animation, sidebarClick, stickyNav, scrollTopFun } from "@/src/utils";
import { EmailIcon, HomeIcon, PhoneIcon, WhatsAppIcon } from "@/src/components/icons/SimpleIcons";
import { buildWhatsUrl, getWhatsAppContextFromPath } from "@/src/lib/ctaUtils";

const Layout = ({ children, header, footer, singleMenu, dark, locale }) => {
  const router = useRouter();
  const resolvedLocale = useMemo(() => {
    if (locale) return locale;
    try {
      const p = router?.asPath || "";
      return p.startsWith("/en") ? "en" : "es";
    } catch (_) {
      return "es";
    }
  }, [locale, router?.asPath]);
  const t = useMemo(() => (resolvedLocale === "en" ? enFooter : esFooter), [resolvedLocale]);
  const homeHref = resolvedLocale === "en" ? "/en" : "/";
  const whatsappDial = (t?.contacts?.phoneDial || "+59898488759").replace(/[^\d]/g, "");
  const whatsappHref = useMemo(
    () =>
      buildWhatsUrl({
        locale: resolvedLocale,
        phone: whatsappDial,
        context: getWhatsAppContextFromPath(router?.asPath || "/", resolvedLocale),
      }),
    [resolvedLocale, router?.asPath, whatsappDial]
  );
  const mobileActions = useMemo(
    () => [
      {
        key: "home",
        href: homeHref,
        label: resolvedLocale === "en" ? "Home" : "Inicio",
        title: resolvedLocale === "en" ? "Go to home" : "Ir al inicio",
        icon: <HomeIcon />,
        external: false,
      },
      {
        key: "call",
        href: `tel:${t?.contacts?.phoneDial || "+59898488759"}`,
        label: resolvedLocale === "en" ? "Call" : "Llamar",
        title: t?.contacts?.phoneDisplay || "+59898488759",
        icon: <PhoneIcon />,
        external: true,
      },
      {
        key: "whatsapp",
        href: whatsappHref,
        label: "WhatsApp",
        title: "WhatsApp",
        icon: <WhatsAppIcon />,
        external: true,
      },
      {
        key: "email",
        href: `mailto:${t?.contacts?.email || "info@software-strategy.com"}`,
        label: "Email",
        title: t?.contacts?.email || "info@software-strategy.com",
        icon: <EmailIcon />,
        external: true,
      },
    ],
    [homeHref, resolvedLocale, t?.contacts?.email, t?.contacts?.phoneDial, t?.contacts?.phoneDisplay, whatsappDial, whatsappHref]
  );



useEffect(() => {
  const offWow = animation();
  const offSidebar = sidebarClick();
  const offSticky = stickyNav();
  const offScrollTop = scrollTopFun();

  return () => {
    offWow?.();
    offSidebar?.();
    offSticky?.();
    offScrollTop?.();
  };
}, []);


  return (
    <Fragment>
      <Head>
        <meta httpEquiv="content-language" content={resolvedLocale === "en" ? "en" : "es-UY"} />
      </Head>
      <div className="page-wrapper has-mobile-bottom-bar">
        <Header header={header} singleMenu={singleMenu} dark={dark} locale={resolvedLocale} />
        <SideBar locale={resolvedLocale} />
        {children}
        {/* Floating WhatsApp button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="whatsapp-float"
        >
          <WhatsAppIcon size={22} />
        </a>
        <nav className="mobile-bottom-bar" aria-label={resolvedLocale === "en" ? "Quick actions" : "Accesos rápidos"}>
          {mobileActions.map((action) => (
            <a
              key={action.key}
              href={action.href}
              target={action.key === "whatsapp" ? "_blank" : undefined}
              rel={action.key === "whatsapp" ? "noopener noreferrer" : undefined}
              className="mobile-bottom-bar__item"
              title={action.title}
              data-cta={`mobile-bottom-${action.key}`}
            >
              <span className="mobile-bottom-bar__icon">{action.icon}</span>
              <span className="mobile-bottom-bar__label">{action.label}</span>
            </a>
          ))}
        </nav>
        <Footer footer={footer} dark={dark} locale={resolvedLocale} t={t} />
        <ScrollTop />
      </div>
    </Fragment>
  );
};
export default Layout;

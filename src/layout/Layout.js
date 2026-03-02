import { Fragment, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ImageView from "../components/ImageView";
import VideoPopup from "../components/VideoPopup";
import ScrollTop from "./ScrollTop";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import SideBar from "./header/SideBar";
import esFooter from "@/content/es/footer.json";
import enFooter from "@/content/en/footer.json";
import { animation, sidebarClick, stickyNav, scrollTopFun } from "@/src/utils";
import { WhatsAppIcon } from "@/src/components/icons/SimpleIcons";

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
      <VideoPopup />
      <ImageView />
      <div className="page-wrapper">
        <Header header={header} singleMenu={singleMenu} dark={dark} locale={resolvedLocale} />
        <SideBar locale={resolvedLocale} />
        {children}
        {/* Floating WhatsApp button */}
        <a
          href="https://wa.me/59898488759"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="whatsapp-float"
        >
          <WhatsAppIcon size={22} />
        </a>
        <Footer footer={footer} dark={dark} locale={resolvedLocale} t={t} />
        <ScrollTop />
      </div>
    </Fragment>
  );
};
export default Layout;

import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import PageBanner from "@/src/components/PageBanner";

export default function ContactPage({ t = {}, locale = "es" }) {
  const isEn = locale === "en";
  const [form, setForm] = useState({ name: "", phone_number: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // Temporal: envío deshabilitado hasta definir captcha, autenticación y seguridad.
    const fallbackEmail = t.email || "info@software-strategy.com";
    const fallbackWhats = t.whatsappDisplay || (isEn ? "+598 912 842 04" : "+598 912 842 04");
    setStatus("error");
    setError(
      isEn
        ? `Form submission is temporarily disabled. Please write to ${fallbackEmail} or WhatsApp ${fallbackWhats}.`
        : `El envío del formulario está temporalmente deshabilitado. Por favor escribinos a ${fallbackEmail} o por WhatsApp ${fallbackWhats}.`
    );
    // GTM push deshabilitado temporalmente (se mide directamente en GTM)
    // try {
    //   window.dataLayer = window.dataLayer || [];
    //   window.dataLayer.push({ event: 'form_submit', form_name: 'contact', form_locale: locale, status: 'disabled' });
    // } catch (_) {}
    /*
    // Previous implementation (disabled):
    setError("");
    setStatus("submitting");
    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT;
      if (!endpoint) throw new Error("Missing contact endpoint");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", phone_number: "", email: "", message: "" });
      // window.dataLayer = window.dataLayer || [];
      // window.dataLayer.push({ event: 'form_submit', form_name: 'contact', form_locale: locale, status: 'success' });
      // window.dataLayer.push({ event: 'conversion_lead', lead_type: 'contact_form', form_locale: locale });
    } catch (err) {
      setStatus("error");
      setError(isEn ? "Could not send. Check configuration or try again." : "No se pudo enviar. Verifica la configuración o inténtalo nuevamente.");
      // window.dataLayer = window.dataLayer || [];
      // window.dataLayer.push({ event: 'form_submit', form_name: 'contact', form_locale: locale, status: 'error' });
    }
    */
  };

  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}${isEn ? "/en/contact" : "/contact"}`;

  // Dispara un evento de página vista específico para GTM/Google Ads en la página de Contacto
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "ads_contact_pageview",
          page_locale: locale,
          page_path: isEn ? "/en/contact" : "/contact",
        });
      }
    } catch (_) {}
  }, [isEn, locale]);

  return (
    <>
      <NextSeo
        title={t?.seo?.title || (isEn ? "Contact" : "Contacto")}
        description={t?.seo?.description || (isEn ? "Get in touch for web development, custom software and marketing services." : "Contactanos por desarrollo web, software a medida y marketing.")}
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: `${siteBase}/contact` },
          { hrefLang: "en", href: `${siteBase}/en/contact` },
          { hrefLang: "x-default", href: `${siteBase}/contact` },
        ]}
        openGraph={{ url: canonical, title: t?.seo?.title || (isEn ? "Contact" : "Contacto"), description: t?.seo?.description || "" }}
      />
      <PageBanner pageName={t.pageName || (isEn ? "Contact" : "Contacto")} />
      <section className="contact-page-area py-130 rpy-100 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <div className="our-location-part rmb-55 wow fadeInUp delay-0-2s">
                <div className="row">
                  <div className="col-xl-10">
                    <div className="section-title mb-30">
                      <span className="sub-title mb-15">{t.subTitle || (isEn ? "Contact us" : "Contáctanos")}</span>
                      <h2>{t.heroTitle || (isEn ? "Ready to work on your next project" : "Listos para trabajar en tu próximo proyecto")}</h2>
                    </div>
                  </div>
                </div>
                <div className="row gap-40 pb-10">
                  <div className="col-sm-12">
                    <div className="our-location-address mb-20">
                      <h5>{t.contactHeading || (isEn ? "Contact" : "Contacto")}</h5>
                      <p>{t.contactDescription || (isEn ? "Write to us or send a WhatsApp:" : "Escríbenos o envíanos un WhatsApp:")}</p>
                      <a className="mailto" href={`mailto:${t.email || "info@software-strategy.com"}`} data-cta="contact-email">
                        {t.email || "info@software-strategy.com"}
                      </a>
                      <br />
                      <a className="callto" href={`https://wa.me/${t.whatsappDial || "59891284204"}`} target="_blank" rel="noreferrer" data-cta="contact-whatsapp">
                        <i className="fab fa-whatsapp" /> {t.whatsappDisplay || "+598 912 842 04"}
                      </a>
                    </div>
                  </div>
                </div>
                <h4>{t.followUs || (isEn ? "Follow us" : "Síguenos")}</h4>
                <div className="social-style-two pt-15">
                  <a href="https://www.facebook.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="https://www.instagram.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
            {false && (
            <div className="col-xl-5 col-lg-6">
              <div className="contact-page-form form-style-one wow fadeInUp delay-0-2s">
                <div className="section-title mb-35">
                  <span className="sub-title mb-15">{t.form?.subtitle || (isEn ? "Get a quote" : "Solicitá una cotización")}</span>
                  <h3>{t.form?.title || (isEn ? "Drop us a message" : "Envíanos un mensaje")}</h3>
                </div>
                <form id="contactForm" className="contactForm" onSubmit={onSubmit}>
                  <div className="row gap-60 pt-15">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="name">
                          <i className="far fa-user" />
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder={t.form?.namePlaceholder || (isEn ? "Full name" : "Nombre completo")}
                          required
                          value={form.name}
                          onChange={onChange}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="phone_number">
                          <i className="far fa-phone" />
                        </label>
                        <input
                          type="text"
                          id="phone_number"
                          name="phone_number"
                          className="form-control"
                          placeholder={t.form?.phonePlaceholder || (isEn ? "Phone" : "Teléfono")}
                          required
                          value={form.phone_number}
                          onChange={onChange}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="email">
                          <i className="far fa-envelope" />
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder={t.form?.emailPlaceholder || (isEn ? "Email address" : "Correo electrónico")}
                          required
                          value={form.email}
                          onChange={onChange}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">
                          <i className="far fa-pencil" />
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows={2}
                          placeholder={t.form?.messagePlaceholder || (isEn ? "Message" : "Mensaje")}
                          required
                          value={form.message}
                          onChange={onChange}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group pt-5 mb-0">
                        <button type="submit" className="theme-btn style-two w-100" disabled={status === "submitting"}>
                          {status === "submitting"
                            ? t.form?.sending || (isEn ? "Sending…" : "Enviando…")
                            : t.form?.send || (isEn ? "Send message" : "Enviar mensaje")}
                          <i className="far fa-arrow-right" />
                        </button>
                        {status === "error" && (
                          <div style={{ color: "#e74c3c", marginTop: 10 }}>{error}</div>
                        )}
                        {status === "success" && (
                          <div style={{ color: "#27ae60", marginTop: 10 }}>
                            {t.form?.success || (isEn ? "Message sent successfully!" : "¡Mensaje enviado con éxito!")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

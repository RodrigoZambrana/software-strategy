import { useEffect, useMemo, useState } from "react";
import { NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import PageBanner from "@/src/components/PageBanner";
import Script from "next/script";
import { ArrowRightIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/src/components/icons/SimpleIcons";

const RECAPTCHA_ACTION = "contact_form_submit";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_PHONE_LENGTH = 40;
const MAX_EMAIL_LENGTH = 180;
const MAX_MESSAGE_LENGTH = 4000;

const normalizeValue = (value) => value.replace(/\s+/g, " ").trim();

const validateForm = (form) => {
  const name = normalizeValue(form.name || "");
  const phone = normalizeValue(form.phone_number || "");
  const email = (form.email || "").trim();
  const message = (form.message || "").trim();

  if (!name || !phone || !message) {
    return {
      valid: false,
      code: "missing_required",
      sanitized: { ...form, name, phone_number: phone, email, message },
    };
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return {
      valid: false,
      code: "invalid_email",
      sanitized: { ...form, name, phone_number: phone, email, message },
    };
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    phone.length > MAX_PHONE_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length < 10 ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return {
      valid: false,
      code: "invalid_fields",
      sanitized: { ...form, name, phone_number: phone, email, message },
    };
  }

  return {
    valid: true,
    sanitized: { ...form, name, phone_number: phone, email, message },
  };
};

const executeRecaptcha = async () => {
  if (typeof window === "undefined") {
    throw new Error("browser_unavailable");
  }

  if (!RECAPTCHA_SITE_KEY) {
    throw new Error("recaptcha_missing_key");
  }

  if (!window.grecaptcha || typeof window.grecaptcha.execute !== "function") {
    throw new Error("recaptcha_unavailable");
  }

  await new Promise((resolve) => window.grecaptcha.ready(resolve));
  return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION });
};

export default function ContactPage({ t = {}, locale = "es" }) {
  const isEn = locale === "en";
  const [form, setForm] = useState({ name: "", phone_number: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");
  const endpoint = useMemo(() => "/contact-submit.php", []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status !== "idle") setStatus("idle");
    if (error) setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("submitting");
    try {
      const validation = validateForm(form);
      if (!validation.valid) {
        setStatus("error");
        throw new Error(validation.code);
      }

      const token = await executeRecaptcha();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...validation.sanitized,
          token,
          action: RECAPTCHA_ACTION,
          locale,
          page: isEn ? "/en/contact" : "/contact",
        }),
      });

      let payload = {};
      try {
        payload = await response.json();
      } catch (_) {
        payload = {};
      }

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "submission_failed");
      }

      setStatus("success");
      setForm({ name: "", phone_number: "", email: "", message: "", website: "" });
    } catch (submitError) {
      setStatus("error");
      const code = submitError?.message || "";
      const fallback = isEn
        ? "We could not send your message. Please try again in a few minutes."
        : "No pudimos enviar tu mensaje. Probá nuevamente en unos minutos.";

      const messages = {
        recaptcha_missing_key: isEn
          ? "reCAPTCHA is not configured yet. Please contact us by email."
          : "reCAPTCHA todavía no está configurado. Escribinos por correo.",
        recaptcha_unavailable: isEn
          ? "Security validation is still loading. Please wait a few seconds and try again."
          : "La validación de seguridad todavía se está cargando. Esperá unos segundos e intentá nuevamente.",
        missing_required: isEn
          ? "Name, phone and message are required."
          : "Nombre, teléfono y mensaje son obligatorios.",
        invalid_email: isEn
          ? "Please enter a valid email or leave that field empty."
          : "Ingresá un correo válido o dejá ese campo vacío.",
        low_score: isEn
          ? "We could not validate the submission. Please try again or contact us by email."
          : "No pudimos validar el envío. Intentá nuevamente o escribinos por correo.",
        invalid_recaptcha: isEn
          ? "Security validation failed. Please try again."
          : "La validación de seguridad falló. Intentá nuevamente.",
        invalid_origin: isEn
          ? "This request origin is not allowed."
          : "El origen de la solicitud no está permitido.",
        invalid_fields: isEn
          ? "Please review the form fields and try again."
          : "Revisá los campos del formulario e intentá nuevamente.",
        mail_send_failed: isEn
          ? "We could not send the email right now. Please try again in a few minutes."
          : "No pudimos enviar el correo en este momento. Probá nuevamente en unos minutos.",
      };

      setError(messages[code] || fallback);
    }
  };

  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}${isEn ? "/en/contact" : "/contact"}`;
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t.pageName || (isEn ? "Contact" : "Contacto"),
    description:
      t?.seo?.description ||
      (isEn
        ? "Contact Software Strategy to discuss your website or custom software project."
        : "Contactá a Software Strategy para analizar el próximo paso de tu sitio web o software a medida."),
    url: canonical,
    inLanguage: isEn ? "en" : "es",
    about: {
      "@type": "Organization",
      name: "Software Strategy",
      url: `${siteBase}/`,
      email: t.email || "info@software-strategy.com",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: isEn ? "sales" : "ventas",
          email: t.email || "info@software-strategy.com",
          telephone: t.whatsappDisplay || "+59898488759",
          areaServed: isEn ? "Latin America" : "Uruguay",
          availableLanguage: isEn ? ["en", "es"] : ["es"],
        },
      ],
    },
  };

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
        openGraph={{
          url: canonical,
          title: t?.seo?.title || (isEn ? "Contact" : "Contacto"),
          description: t?.seo?.description || "",
          locale: isEn ? "en_US" : "es_UY",
          type: "website",
          siteName: "Software Strategy",
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }} />
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
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
                      <a className="mailto" href={`mailto:${t.email || "info@software-strategy.com"}`} title={t.email || "info@software-strategy.com"} data-cta="contact-email">
                        {t.email || "info@software-strategy.com"}
                      </a>
                      <br />
                      <a className="callto" href={`https://wa.me/${t.whatsappDial || "59898488759"}`} target="_blank" rel="noreferrer" title={t.whatsappDisplay || "+59898488759"} data-cta="contact-whatsapp">
                        <WhatsAppIcon /> {t.whatsappDisplay || "+59898488759"}
                      </a>
                    </div>
                  </div>
                </div>
                <h4>{t.followUs || (isEn ? "Follow us" : "Síguenos")}</h4>
                <div className="social-style-two pt-15">
                  <a href="https://www.facebook.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
                    <FacebookIcon />
                  </a>
                  <a href="https://www.instagram.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>
            {true && (
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
                          <i className="fas fa-user" />
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder={t.form?.namePlaceholder || (isEn ? "Full name" : "Nombre completo")}
                          required
                          maxLength={MAX_NAME_LENGTH}
                          value={form.name}
                          onChange={onChange}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="phone_number">
                          <i className="fas fa-phone" />
                        </label>
                        <input
                          type="text"
                          id="phone_number"
                          name="phone_number"
                          className="form-control"
                          placeholder={t.form?.phonePlaceholder || (isEn ? "Phone" : "Teléfono")}
                          required
                          maxLength={MAX_PHONE_LENGTH}
                          value={form.phone_number}
                          onChange={onChange}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="email">
                          <i className="fas fa-envelope" />
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder={t.form?.emailPlaceholder || (isEn ? "Email address" : "Correo electrónico")}
                          maxLength={MAX_EMAIL_LENGTH}
                          value={form.email}
                          onChange={onChange}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">
                          <i className="fas fa-pencil" />
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows={4}
                          placeholder={t.form?.messagePlaceholder || (isEn ? "Message" : "Mensaje")}
                          required
                          minLength={10}
                          maxLength={MAX_MESSAGE_LENGTH}
                          value={form.message}
                          onChange={onChange}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        border: 0,
                      }}
                    >
                      <label htmlFor="website">{isEn ? "Website" : "Sitio web"}</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <div className="form-group pt-5 mb-0">
                        <button type="submit" className="theme-btn style-two w-100" disabled={status === "submitting"}>
                          {status === "submitting"
                            ? t.form?.sending || (isEn ? "Sending…" : "Enviando…")
                            : t.form?.send || (isEn ? "Send message" : "Enviar mensaje")}
                          <ArrowRightIcon className="cta-icon" />
                        </button>
                        {status === "error" && (
                          <div style={{ color: "#e74c3c", marginTop: 10 }}>{error}</div>
                        )}
                        {status === "success" && (
                          <div style={{ color: "#27ae60", marginTop: 10 }}>
                            {t.form?.success || (isEn ? "Message sent successfully!" : "¡Mensaje enviado con éxito!")}
                          </div>
                        )}
                        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 10 }}>
                          {isEn
                            ? "This form is protected by reCAPTCHA and Google’s Privacy Policy and Terms of Service apply."
                            : "Este formulario está protegido por reCAPTCHA y se aplican la Política de Privacidad y los Términos del Servicio de Google."}
                        </div>
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

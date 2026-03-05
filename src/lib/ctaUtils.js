// src/lib/ctaUtils.js
// Utilidad central para construir URLs de WhatsApp con mensajes prellenados
// según el contexto del CTA. Esto evita hardcodes repetidos y mejora el inicio
// de conversación según la intención del usuario.

const ES_MESSAGES = {
  general: "Hola Software Strategy, quiero hacer una consulta general sobre sus servicios.",
  home: "Hola Software Strategy, quiero conversar sobre la presencia digital de mi empresa.",
  contact: "Hola Software Strategy, quiero hacer una consulta y aclarar mis dudas sobre mi proyecto.",
  pricing: "Hola Software Strategy, quiero consultar qué opción conviene más para mi empresa.",
  webDevelopment: "Hola Software Strategy, quiero consultar por un sitio web para mi empresa.",
  createSite: "Hola Software Strategy, quiero crear un sitio web para mi empresa.",
  landingPage: "Hola Software Strategy, quiero consultar por una landing page para mi empresa.",
  maintenance: "Hola Software Strategy, quiero mejorar la web actual de mi empresa.",
  customSoftware: "Hola Software Strategy, quiero consultar por software a medida para mi empresa.",
  billingSoftware: "Hola Software Strategy, quiero consultar por una solución de facturación, stock e inventario para mi empresa.",
  googleVisibility: "Hola Software Strategy, quiero consultar cómo mejorar la visibilidad de mi empresa en Google.",
  digitalMarketing: "Hola Software Strategy, quiero consultar por marketing digital para mi empresa.",
};

const EN_MESSAGES = {
  general: "Hello Software Strategy, I would like to make a general inquiry about your services.",
  home: "Hello Software Strategy, I would like to discuss my company's digital presence.",
  contact: "Hello Software Strategy, I would like to ask a few questions about my project.",
  pricing: "Hello Software Strategy, I want to know which option fits my business best.",
  webDevelopment: "Hello Software Strategy, I would like to ask about a website for my business.",
  createSite: "Hello Software Strategy, I want to create a website for my business.",
  landingPage: "Hello Software Strategy, I would like to ask about a landing page for my business.",
  maintenance: "Hello Software Strategy, I want to improve my company's current website.",
  customSoftware: "Hello Software Strategy, I would like to ask about custom software for my business.",
  billingSoftware: "Hello Software Strategy, I would like to ask about a billing, stock and inventory solution for my business.",
  googleVisibility: "Hello Software Strategy, I want to improve my company's visibility on Google.",
  digitalMarketing: "Hello Software Strategy, I would like to ask about digital marketing for my business.",
};

function getMessages(locale = "es") {
  return locale === "en" ? EN_MESSAGES : ES_MESSAGES;
}

export function getWhatsAppContextFromPath(pathname = "", locale = "es") {
  const path = `${pathname || ""}`.toLowerCase();

  if (locale === "en" && (path === "/en" || path.startsWith("/en/"))) {
    if (path === "/en/contact") return "contact";
    if (path === "/en/pricing") return "pricing";
    if (path.includes("/services/google-seo")) return "googleVisibility";
    if (path.includes("/services/digital-marketing")) return "digitalMarketing";
    if (path.includes("/services/custom-software")) return "customSoftware";
    if (path.includes("/services/web-development")) return "webDevelopment";
    return "home";
  }

  if (path === "/" || path === "") return "home";
  if (path === "/contact") return "contact";
  if (path === "/pricing") return "pricing";
  if (path === "/desarrollo-sitios-web-uruguay") return "webDevelopment";
  if (path === "/crear-sitio-web-uruguay") return "createSite";
  if (path === "/landing-page-uruguay") return "landingPage";
  if (path === "/mantenimiento-web-uruguay") return "maintenance";
  if (path === "/desarrollo-software-medida-uruguay") return "customSoftware";
  if (path === "/software-facturacion-stock-uruguay") return "billingSoftware";
  if (path.includes("/services/google-seo")) return "googleVisibility";
  if (path.includes("/services/digital-marketing")) return "digitalMarketing";

  return "general";
}

export function buildWhatsUrl({
  locale = "es",
  phone = "59898488759",
  context = "general",
  customMessage = "",
} = {}) {
  const messages = getMessages(locale);
  const message = customMessage || messages[context] || messages.general;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildPlanWhatsUrl({
  locale = "es",
  label = "",
  price,
  currency = "USD",
  phone = "59898488759",
  siteName = "Software Strategy",
}) {
  const planPart = label ? `${label}` : locale === "en" ? "plan" : "plan";
  const pricePart = typeof price !== "undefined" && `${price}` !== "" ? ` (${price} ${currency})` : "";
  const customMessage = locale === "en"
    ? `I'm contacting you from the ${siteName} website. I'm interested in the ${planPart}${pricePart} plan.`
    : `Te contacto desde la web de ${siteName}. Me interesa saber más del plan ${planPart}${pricePart}.`;

  return buildWhatsUrl({ locale, phone, customMessage });
}

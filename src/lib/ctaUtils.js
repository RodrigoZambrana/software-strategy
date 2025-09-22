// src/lib/ctaUtils.js
// Utilidad central para construir URLs de WhatsApp con mensajes prellenados
// para CTAs de planes. Facilita cambios globales del texto o formato.

export function buildPlanWhatsUrl({
  locale = 'es',
  label = '',
  price,
  currency = 'USD',
  phone = '59891258107', // Fallback al número publicado en Contact
  siteName = 'Software Strategy',
}) {
  const planPart = label ? `${label}` : 'plan';
  const pricePart = typeof price !== 'undefined' && `${price}` !== '' ? ` (${price} ${currency})` : '';
  const msg = locale === 'en'
    ? `I'm contacting you from the ${siteName} website. I'm interested in the ${planPart}${pricePart} plan.`
    : `Te contacto desde la web de ${siteName}. Me interesa saber más del Plan ${planPart}${pricePart}.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}


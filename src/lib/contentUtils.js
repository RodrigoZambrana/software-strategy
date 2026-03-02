import fs from 'fs';
import path from 'path';

const SERVICE_FILES = [
  'web-development.json',
  'digital-marketing.json',
  'seo-sem.json',
  'custom-software.json',
];

function readJsonSafe(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export function collectServiceSlides(locale = 'es') {
  const base = path.join(process.cwd(), 'content', locale);
  const slides = [];
  for (const f of SERVICE_FILES) {
    const json = readJsonSafe(path.join(base, f));
    const s = json?.slider?.slides || [];
    for (const slide of s) slides.push(slide);
  }
  return slides;
}

export function enrichHomeWithServiceSlides(t, locale = 'es') {
  try {
    const extraSlides = collectServiceSlides(locale);
    if (!t.slider) t.slider = {};
    const homeSlides = Array.isArray(t.slider.slides) ? t.slider.slides : [];
    t.slider.slides = [...homeSlides, ...extraSlides];
  } catch (e) {
    console.warn('[contentUtils] Failed to enrich home slider:', e?.message || e);
  }
  return t;
}

export function buildPricingGroups(locale = 'es') {
  const base = path.join(process.cwd(), 'content', locale);
  const toPlan = (p, href) => ({
    name: p.name ?? '',
    price: p.price ?? null,
    unit: p.unit ?? null,
    features: Array.isArray(p.features) ? p.features : [],
    badge: p.badge ?? null,
    twoColumn: !!p.twoColumn,
    cta: p.cta || (locale === 'en' ? 'Talk to a specialist' : 'Hablar con un especialista'),
    href,
  });

  const web = readJsonSafe(path.join(base, 'web-development.json'));
  const marketing = readJsonSafe(path.join(base, 'digital-marketing.json'));

  const groups = [];

  if (web?.pricingSection?.plans?.length) {
    groups.push({
      key: 'web',
      plans: web.pricingSection.plans.map((p) =>
        toPlan(p, locale === 'en' ? '/services/web-development' : '/desarrollo-sitios-web-uruguay')
      ),
    });
  }
  if (marketing?.pricingSection?.plans?.length) {
    groups.push({
      key: 'marketing',
      plans: marketing.pricingSection.plans.map((p) => toPlan(p, '/services/digital-marketing')),
    });
  }

  return groups;
}

/** @type {import('next-sitemap').IConfig} */
const siteUrl = 'https://software-strategy.com';
const fs = require('fs');
const path = require('path');

function readJsonSafe(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (_) { return null; }
}

function getServiceHrefs() {
  // Lee services.json (ES o EN) para obtener hrefs de servicios
  const esServices = readJsonSafe(path.join(process.cwd(), 'content', 'es', 'services.json'));
  const enServices = readJsonSafe(path.join(process.cwd(), 'content', 'en', 'services.json'));
  const src = (esServices && Array.isArray(esServices.items)) ? esServices : enServices;
  const hrefs = (src?.items || []).map((it) => it.href).filter(Boolean);
  // Asegurar unicidad y formato '/services/...'
  const set = new Set();
  hrefs.forEach((h) => {
    if (/^\/services\//.test(h)) set.add(h);
  });
  return Array.from(set);
}

function buildAllPaths() {
  const services = getServiceHrefs();
  const base = [
    '/',
    // Rutas dinámicas manejadas por catch-all
    '/pricing',
    '/contact',
    '/services',
    // Detalle de servicios
    ...services,
  ];
  const en = base.map((p) => (p === '/' ? '/en' : `/en${p}`));
  const all = [...base, ...en];
  // No duplicar
  return Array.from(new Set(all));
}

// Se calcula una vez y se reusa en transform + additionalPaths
const ALL_PATHS = buildAllPaths();
const EN_SET = new Set(ALL_PATHS.filter((p) => p === '/en' || p.startsWith('/en/')));

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  outDir: './out',                 // 👈 Asegura que se escriba en /out (post-export)
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  // Incluir también las URLs en inglés en el sitemap
  exclude: [],

  // Si tu Next tiene trailingSlash: true, descomenta esta línea para que coincida.
  // trailingSlash: false,

  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    // (Opcional) si tienes más sitemaps (cuando se particiona):
    // additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },

  // Hreflang para ES, EN y x-default por ruta (ver transform)

  // Control fino por URL
  transform: async (config, path) => {
    const isEn = path === '/en' || path.startsWith('/en/');
    const esPath = isEn ? (path.replace(/^\/en/, '') || '/') : path;
    const enPath = isEn ? path : (path === '/' ? '/en' : `/en${path}`);
    const alts = [
      { href: `${siteUrl}${esPath}`, hreflang: 'es' },
      // Solo incluir EN si existe en el conjunto calculado
      ...(EN_SET.has(enPath) ? [{ href: `${siteUrl}${enPath}`, hreflang: 'en' }] : []),
      { href: `${siteUrl}${esPath}`, hreflang: 'x-default' },
    ];
    return {
      loc: path,
      changefreq: 'weekly',
      priority: (path === '/' || path === '/en') ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
      alternateRefs: alts,
    };
  },

  // Rutas adicionales (mantén solo las que existen)
  additionalPaths: async () => {
    // Genera dinámicamente las rutas según el contenido
    return ALL_PATHS.map((p) => ({
      loc: p,
      changefreq: 'weekly',
      priority: (p === '/' || p === '/en') ? 1.0 : 0.8,
    }));
  },
};

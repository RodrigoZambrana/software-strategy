/** @type {import('next-sitemap').IConfig} */
const siteUrl = 'https://software-strategy.com';
const fs = require('fs');
const path = require('path');
const SPANISH_ONLY_PATHS = new Set([
  '/desarrollo-sitios-web-uruguay',
  '/desarrollo-software-medida-uruguay',
  '/software-facturacion-stock-uruguay',
  '/crear-sitio-web-uruguay',
  '/precio-pagina-web-uruguay',
  '/mantenimiento-web-uruguay',
  '/landing-page-uruguay',
]);
const REDIRECTED_PATHS = [
  '/contacto',
  '/service-details',
  '/blog-details',
  '/marketing-social',
  '/digital-marketing',
  '/web-development',
  '/crear-sitio-web-montevideo',
  '/custom-software',
  '/pricing/pricing',
  '/faqs/faqs',
  '/contact/contact',
  '/about/about',
  '/services/services',
  '/en/en',
  '/en/marketing-social',
  '/en/digital-marketing',
  '/en/web-development',
  '/en/custom-software',
  '/en/service-details',
  '/en/services/seo-sem',
  '/en/services/services',
  '/services/web-development',
  '/services/custom-software',
  '/en/services/web-development',
  '/en/services/custom-software',
];

function readJsonSafe(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (_) { return null; }
}

function getServiceHrefs() {
  // Lee services.json (ES o EN) para obtener hrefs de servicios
  const esServices = readJsonSafe(path.join(process.cwd(), 'content', 'es', 'services.json'));
  const enServices = readJsonSafe(path.join(process.cwd(), 'content', 'en', 'services.json'));
  const src = (esServices && Array.isArray(esServices.items)) ? esServices : enServices;
  const hrefs = (src?.items || []).map((it) => it.href).filter(Boolean);
  // Asegurar unicidad y formatos de URLs de servicio públicas
  const set = new Set();
  hrefs.forEach((h) => {
    if (/^\/services\//.test(h) || /^\/desarrollo-/.test(h)) set.add(h);
  });
  return Array.from(set);
}

function buildAllPaths() {
  const services = getServiceHrefs();
  const base = [
    '/',
    '/about',
    '/faqs',
    // Rutas dinámicas manejadas por catch-all
    '/pricing',
    '/contact',
    '/services',
    '/desarrollo-sitios-web-uruguay',
    '/desarrollo-software-medida-uruguay',
    '/software-facturacion-stock-uruguay',
    '/crear-sitio-web-uruguay',
    '/precio-pagina-web-uruguay',
    '/mantenimiento-web-uruguay',
    '/landing-page-uruguay',
    // Detalle de servicios
    ...services,
  ];
  const en = base
    .filter((p) => !SPANISH_ONLY_PATHS.has(p))
    .map((p) => (p === '/' ? '/en' : `/en${p}`));
  const all = [...base, ...en];
  // No duplicar
  return Array.from(new Set(all));
}

// Se calcula una vez y se reusa en transform + additionalPaths
const ALL_PATHS = buildAllPaths();
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  outDir: './out',                 // 👈 Asegura que se escriba en /out (post-export)
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  // Incluir también las URLs en inglés en el sitemap
  exclude: REDIRECTED_PATHS,

  // Si tu Next tiene trailingSlash: true, descomenta esta línea para que coincida.
  // trailingSlash: false,

  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    // (Opcional) si tienes más sitemaps (cuando se particiona):
    // additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },

  // Control fino por URL (sin hreflang en sitemap para evitar duplicados con subpath /en)
  // Nota: next-seo ya emite hreflang en el HTML. Mantener el sitemap simple evita confusiones.
  transform: async (_config, path) => ({
    loc: path,
    changefreq: 'weekly',
    priority: (path === '/' || path === '/en') ? 1.0 : 0.8,
    lastmod: new Date().toISOString(),
  }),

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

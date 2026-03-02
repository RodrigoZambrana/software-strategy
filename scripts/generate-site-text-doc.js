const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();
const OUT_DIR = path.join(PROJECT_ROOT, 'out');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'documentos');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'Texto_Completo_Sitio.md');
const BASE_URL = 'https://software-strategy.com';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(p));
    else files.push(p);
  }
  return files;
}

function routeFromOutFile(absFile) {
  const rel = absFile.replace(OUT_DIR, '').replace(/\\/g, '/');
  if (rel === '/index.html') return '/';
  if (rel.endsWith('/index.html')) {
    return rel.slice(0, -'/index.html'.length) || '/';
  }
  if (rel.endsWith('.html')) return rel.slice(0, -'.html'.length) || '/';
  return null;
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return '';
  return decodeHtmlEntities(m[1].replace(/\s+/g, ' ').trim());
}

function extractContextualText(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return [];

  let body = bodyMatch[1];

  body = body
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n');

  const blockTags = [
    'header','nav','main','section','article','aside','footer',
    'h1','h2','h3','h4','h5','h6','p','li','ul','ol','div',
    'a','button','label','th','td','tr','table'
  ];

  for (const t of blockTags) {
    const open = new RegExp(`<${t}\\b[^>]*>`, 'gi');
    const close = new RegExp(`</${t}>`, 'gi');
    body = body.replace(open, '\n').replace(close, '\n');
  }

  body = body.replace(/<[^>]+>/g, ' ');
  body = decodeHtmlEntities(body);

  const rawLines = body
    .split(/\n+/)
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const filtered = [];
  const seen = new Set();
  for (const line of rawLines) {
    // Evita ruido técnico o duplicados evidentes dentro de la misma página
    if (/^__NEXT_DATA__$/i.test(line)) continue;
    if (line.length < 2) continue;

    const key = line.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    filtered.push(line);
  }

  return filtered;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    throw new Error('No existe la carpeta out/. Ejecuta export primero.');
  }

  const htmlFiles = walk(OUT_DIR)
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !f.includes('/assets/'))
    .sort((a, b) => a.localeCompare(b));

  const pages = [];
  for (const f of htmlFiles) {
    const route = routeFromOutFile(f);
    if (!route) continue;
    const html = fs.readFileSync(f, 'utf8');
    const title = extractTitle(html);
    const lines = extractContextualText(html);

    pages.push({ route, url: `${BASE_URL}${route === '/' ? '/' : route}`, title, lines });
  }

  pages.sort((a, b) => a.route.localeCompare(b.route));

  const now = new Date();
  const header = [
    '# Texto Completo del Sitio - Software Strategy',
    '',
    `Generado: ${now.toISOString()}`,
    `Fuente: HTML exportado en \`out/\``,
    `Páginas incluidas: ${pages.length}`,
    '',
    '---',
    ''
  ];

  const chunks = [...header];

  for (const p of pages) {
    chunks.push(`## ${p.route}`);
    chunks.push('');
    chunks.push(`URL: ${p.url}`);
    if (p.title) chunks.push(`Título: ${p.title}`);
    chunks.push('');
    chunks.push('Contenido:');
    chunks.push('');

    if (p.lines.length === 0) {
      chunks.push('_Sin texto visible extraído._');
    } else {
      for (const line of p.lines) {
        chunks.push(`- ${line}`);
      }
    }

    chunks.push('');
    chunks.push('---');
    chunks.push('');
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, chunks.join('\n'), 'utf8');

  console.log(`Documento generado: ${OUTPUT_FILE}`);
  console.log(`Páginas documentadas: ${pages.length}`);
}

main();

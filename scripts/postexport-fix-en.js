// scripts/postexport-fix-en.js
// Workaround: Some clients request /_next/data/<build>/en/en/... json due to double 
// /en in href. Duplicate EN data under en/en to avoid 404s on static hosts.
const fs = require('fs');
const path = require('path');

function copyDirOnce(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      // Only copy known subdirs (e.g., services). Avoid copying into nested "en" again.
      if (e.name === 'services') copyDirOnce(s, d);
    } else if (e.isFile() && e.name.endsWith('.json')) {
      fs.copyFileSync(s, d);
    }
  }
}

function duplicateHtmlRoutesAsFolders(outDir) {
  const skip = new Set(['404.html']);

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
      if (skip.has(entry.name)) continue;
      if (entry.name === 'index.html') continue;

      const relativeFile = path.relative(outDir, fullPath);
      const relativeWithoutExt = relativeFile.replace(/\.html$/, '');
      const targetDir = path.join(outDir, relativeWithoutExt);
      const targetFile = path.join(targetDir, 'index.html');

      if (fullPath === targetFile) continue;

      fs.mkdirSync(targetDir, { recursive: true });
      fs.copyFileSync(fullPath, targetFile);
    }
  }

  walk(outDir);
  console.log('[postexport] Duplicated HTML routes as folder index.html files');
}

function main() {
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) return;

  duplicateHtmlRoutesAsFolders(outDir);

  const dataRoot = path.join(process.cwd(), 'out', '_next', 'data');
  if (!fs.existsSync(dataRoot)) return;
  const builds = fs.readdirSync(dataRoot).filter((n) => fs.statSync(path.join(dataRoot, n)).isDirectory());
  if (!builds.length) return;
  const buildDir = path.join(dataRoot, builds[0]);
  const enDir = path.join(buildDir, 'en');
  const enEnDir = path.join(enDir, 'en');
  if (!fs.existsSync(enDir)) return;
  if (fs.existsSync(enEnDir)) return; // already fixed
  copyDirOnce(enDir, enEnDir);
  console.log(`[postexport] Duplicated EN data to ${path.relative(process.cwd(), enEnDir)}`);
}

try { main(); } catch (e) { console.error(e); process.exit(0); }

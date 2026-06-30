#!/usr/bin/env node
/**
 * render-og.mjs - generate branded OG images (1200x630) with Playwright Chromium,
 * the same HTML-to-image approach used in the content repo.
 *
 *   node scripts/render-og.mjs
 *
 * Reads blog frontmatter, renders one PNG per page into public/og/.
 */
import { chromium } from 'playwright';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BLOG_DIR = resolve(ROOT, 'src/content/blog');
const OUT = resolve(ROOT, 'public/og');
mkdirSync(OUT, { recursive: true });

const NAME = 'Prasad Subrahmanya';
const ROLE = 'Founder & CEO, Luminik';

function fm(file) {
  const raw = readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  const block = m ? m[1] : '';
  const pick = (k) => {
    const r = block.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'));
    if (!r) return '';
    return r[1].trim().replace(/^["']|["']$/g, '');
  };
  return { title: pick('title'), category: pick('category'), draft: pick('draft') === 'true' };
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function html({ kicker, title, seed = 'x' }) {
  const h = hash(seed);
  const pals = [
    ['246,62,140', '124,108,255'],
    ['124,108,255', '246,62,140'],
    ['255,177,92', '246,62,140'],
    ['52,227,208', '124,108,255'],
  ];
  const [c1, c2] = pals[h % pals.length];
  const gTop = -320 + (h % 140);
  const gRight = -240 + ((h >> 3) % 220);
  const g2Left = -180 + ((h >> 5) % 200);
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{font-family:'Inter',sans-serif;background:#06080d;color:#eef2f8;overflow:hidden;position:relative}
  .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(ellipse 90% 80% at 80% 10%,#000,transparent 75%)}
  .glow{position:absolute;width:760px;height:760px;border-radius:50%;filter:blur(110px);top:${gTop}px;right:${gRight}px;background:radial-gradient(circle,rgba(${c1},.5),transparent 62%)}
  .glow2{position:absolute;width:560px;height:560px;border-radius:50%;filter:blur(110px);bottom:-300px;left:${g2Left}px;background:radial-gradient(circle,rgba(${c2},.42),transparent 62%)}
  .card{position:relative;height:100%;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .top{display:flex;align-items:center;gap:18px}
  .mark{width:64px;height:64px;border-radius:16px;display:grid;place-items:center;font-family:'Space Grotesk';font-weight:700;font-size:24px;color:#fff;background:linear-gradient(120deg,#ff7eb6,#f63e8c 45%,#7c6cff)}
  .who b{font-family:'Space Grotesk';font-weight:600;font-size:26px;display:block;letter-spacing:-.01em}
  .who span{color:#a7b2c4;font-size:18px}
  h1{font-family:'Space Grotesk';font-weight:700;font-size:62px;line-height:1.07;letter-spacing:-.02em;max-width:1000px}
  h1 .g{background:linear-gradient(100deg,#ffd0e4,#ff5fa2 45%,#a98bff);-webkit-background-clip:text;background-clip:text;color:transparent}
  .foot{display:flex;align-items:center;justify-content:space-between}
  .kicker{font-family:'Space Grotesk';font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:#f63e8c}
  .url{font-family:'Space Grotesk';font-weight:600;font-size:22px;color:#eef2f8}
</style></head>
<body>
  <div class="grid"></div><div class="glow"></div><div class="glow2"></div>
  <div class="card">
    <div class="top"><div class="mark">PS</div><div class="who"><b>${esc(NAME)}</b><span>${esc(ROLE)}</span></div></div>
    <h1>${title}</h1>
    <div class="foot"><span class="kicker">${esc(kicker)}</span><span class="url">prasad.tech</span></div>
  </div>
</body></html>`;
}

const targets = [
  { key: 'home', kicker: 'Engineer · Founder · Operator', title: 'I turn expensive, repetitive work into <span class="g">products people pay for.</span>' },
  { key: 'blog', kicker: 'Writing', title: 'Field notes on <span class="g">AI in production.</span>' },
];

for (const f of readdirSync(BLOG_DIR).filter((n) => n.endsWith('.md'))) {
  const data = fm(resolve(BLOG_DIR, f));
  if (data.draft) continue;
  targets.push({
    key: f.replace(/\.md$/, ''),
    kicker: data.category || 'Writing',
    title: esc(data.title),
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const t of targets) {
  await page.setContent(html({ ...t, seed: t.key }), { waitUntil: 'networkidle' });
  await page.waitForTimeout(350);
  await page.screenshot({ path: resolve(OUT, `${t.key}.png`), type: 'png' });
  console.log('og:', t.key);
}
await browser.close();
console.log(`done -> ${targets.length} images in public/og/`);

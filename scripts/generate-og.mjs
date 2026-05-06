#!/usr/bin/env node
/**
 * generate-og.mjs — render Open Graph PNGs for the site.
 *
 * Produces:
 *   public/og/prasad-og.png            — default site OG (homepage, blog index, generic)
 *   public/og/blog/<slug>.png          — per-post OG for every post in src/content/blog/
 *
 * Reads frontmatter via a small grayMatter-ish parser to avoid pulling in a
 * dependency. Renders each card as SVG, then rasterizes via sharp at 1200x630.
 *
 * Run: `node scripts/generate-og.mjs` (also wired into `npm run build` via
 * the prebuild step).
 */

import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const OUT_DIR = join(ROOT, 'public/og');
const POST_OUT_DIR = join(OUT_DIR, 'blog');
const FONT_PATH = join(ROOT, 'public/assets/fonts/quicksand-latin.woff2');
const HEADSHOT_PATH = join(ROOT, 'public/assets/images/header/prasad.jpeg');

const WIDTH = 1200;
const HEIGHT = 630;

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return data;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine, maxLines = 4) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    if ((current + ' ' + word).trim().length <= maxCharsPerLine) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length >= maxLines - 1) {
        lines.push(current + ' ' + words.slice(index + 1).join(' '));
        return lines.slice(0, maxLines).map((l, i) => i === maxLines - 1 && l.length > maxCharsPerLine ? l.slice(0, maxCharsPerLine - 1) + '…' : l);
      }
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function fontFaceCss(fontDataUri) {
  return [300, 400, 500, 600, 700]
    .map((weight) => `@font-face{font-family:'Quicksand OG';font-style:normal;font-weight:${weight};src:url('${fontDataUri}') format('woff2');}`)
    .join('');
}

async function fontDataUri() {
  const font = await readFile(FONT_PATH);
  return `data:font/woff2;base64,${font.toString('base64')}`;
}

async function portraitDataUri() {
  const portrait = await sharp(HEADSHOT_PATH)
    .resize(520, 520, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${portrait.toString('base64')}`;
}

function renderPortrait(portrait) {
  if (!portrait) return '';

  return `
    <g transform="translate(778, 78)">
      <rect x="-18" y="-18" width="376" height="496" rx="52" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)" stroke-width="1"/>
      <clipPath id="portraitClip"><rect x="0" y="0" width="340" height="460" rx="42"/></clipPath>
      <image href="${portrait}" x="0" y="0" width="340" height="460" preserveAspectRatio="xMidYMid slice" clip-path="url(#portraitClip)"/>
      <rect x="0" y="0" width="340" height="460" rx="42" fill="url(#portraitShade)"/>
      <rect x="0" y="0" width="340" height="460" rx="42" fill="none" stroke="rgba(248,250,252,0.22)" stroke-width="1"/>
    </g>`;
}

function renderSvg({ eyebrow, title, footer, accent, fontCss, portrait }) {
  const hasPortrait = Boolean(portrait);
  const titleX = 80;
  const titleMaxChars = hasPortrait ? 25 : 32;
  const titleFontSize = hasPortrait ? 56 : 68;
  const titleLineHeight = hasPortrait ? 70 : 84;
  const titleLines = wrapText(title, titleMaxChars, 4);
  const titleSvg = titleLines
    .map((line, idx) => `<tspan x="${titleX}" dy="${idx === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`)
    .join('');
  const titleY = hasPortrait ? 242 - (titleLines.length - 1) * 20 : 280 - (titleLines.length - 1) * 28;
  const footerLineEnd = hasPortrait ? 720 : 1120;
  const monogram = hasPortrait ? '' : `
    <g transform="translate(1040, 528)">
      <rect x="0" y="0" width="80" height="80" rx="14" fill="${accent}"/>
      <text x="40" y="55" font-size="34" font-weight="700" fill="#0b0d10" text-anchor="middle" letter-spacing="0">PS</text>
    </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <style>${fontCss}</style>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0d10"/>
      <stop offset="100%" stop-color="#11161c"/>
    </linearGradient>
    <radialGradient id="meshA" cx="20%" cy="15%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="meshB" cx="85%" cy="80%" r="55%">
      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="meshC" cx="65%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="portraitShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b0d10" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0b0d10" stop-opacity="0.20"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#meshA)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#meshB)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#meshC)"/>

  <g font-family="Quicksand OG, Quicksand, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif">
    <!-- Eyebrow -->
    <circle cx="86" cy="116" r="6" fill="${accent}"/>
    <text x="100" y="121" font-size="22" font-weight="700" fill="${accent}" letter-spacing="0">${escapeXml(eyebrow.toUpperCase())}</text>

    <!-- Title -->
    <text x="${titleX}" y="${titleY}" font-size="${titleFontSize}" font-weight="700" fill="#f8fafc" letter-spacing="0">
      ${titleSvg}
    </text>

    <!-- Footer -->
    <line x1="80" y1="528" x2="${footerLineEnd}" y2="528" stroke="rgba(248,250,252,0.10)" stroke-width="1"/>
    <text x="80" y="568" font-size="24" font-weight="600" fill="#f8fafc">prasad.tech</text>
    <text x="80" y="598" font-size="20" font-weight="500" fill="rgba(248,250,252,0.66)">${escapeXml(footer)}</text>

    ${renderPortrait(portrait)}
    ${monogram}
  </g>
</svg>`;
}

async function rasterize(svg, outPath) {
  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .png({ quality: 92 })
    .toFile(outPath);
}

async function ensureDir(path) {
  if (!existsSync(path)) await mkdir(path, { recursive: true });
}

async function main() {
  await ensureDir(OUT_DIR);
  await ensureDir(POST_OUT_DIR);

  const fontCss = fontFaceCss(await fontDataUri());
  const portrait = await portraitDataUri();

  // Default site OG
  const defaultSvg = renderSvg({
    eyebrow: 'Founder · Builder · Operator',
    title: 'Prasad Subrahmanya. Building B2B from customer pain to revenue.',
    footer: 'Field notes for solo technical founders',
    accent: '#6ee7b7',
    fontCss,
    portrait
  });
  await rasterize(defaultSvg, join(OUT_DIR, 'prasad-og.png'));
  console.log('  ✓ public/og/prasad-og.png');

  // Per-post OGs
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  for (const file of files) {
    const raw = await readFile(join(BLOG_DIR, file), 'utf8');
    const fm = parseFrontmatter(raw);
    if (!fm.slug || !fm.title) continue;

    const eyebrow = fm.category ? fm.category : 'Solo builder notes';
    const footer = fm.readTime ? `${fm.readTime} · prasad.tech` : 'prasad.tech';

    const svg = renderSvg({
      eyebrow,
      title: fm.title,
      footer,
      accent: '#6ee7b7',
      fontCss
    });
    const out = join(POST_OUT_DIR, `${fm.slug}.png`);
    await rasterize(svg, out);
    console.log(`  ✓ public/og/blog/${fm.slug}.png`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

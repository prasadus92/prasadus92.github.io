#!/usr/bin/env node
/**
 * Generate Open Graph PNGs for the site.
 *
 * Produces:
 *   public/og/prasad-og.png
 *   public/og/blog/<slug>.png
 *
 * Satori receives local Quicksand TTF bytes directly, then Resvg rasterizes
 * the SVG. This keeps card typography deterministic in local builds and CI.
 */

import { readdir, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import React from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const OUT_DIR = join(ROOT, 'public/og');
const POST_OUT_DIR = join(OUT_DIR, 'blog');
const HEADSHOT_PATH = join(ROOT, 'public/assets/images/header/prasad.jpeg');
const FONT_DIR = join(ROOT, 'public/assets/fonts');

const WIDTH = 1200;
const HEIGHT = 630;
const ACCENT = '#6ee7b7';

const h = React.createElement;

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
        return lines.slice(0, maxLines).map((line, lineIndex) => {
          if (lineIndex === maxLines - 1 && line.length > maxCharsPerLine) {
            return `${line.slice(0, maxCharsPerLine - 1)}...`;
          }
          return line;
        });
      }
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function svgDataUri(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function backgroundDataUri(accent = ACCENT) {
  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>
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
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#meshA)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#meshB)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#meshC)"/>
  </svg>`);
}

async function portraitDataUri() {
  const portrait = await sharp(HEADSHOT_PATH)
    .resize(520, 520, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${portrait.toString('base64')}`;
}

async function loadFonts() {
  const weights = [400, 500, 600, 700];
  return Promise.all(weights.map(async (weight) => ({
    name: 'Quicksand',
    data: await readFile(join(FONT_DIR, `quicksand-${weight}.ttf`)),
    weight,
    style: 'normal'
  })));
}

function textLine(line, index, lineHeight, fontSize) {
  return h('div', {
    key: `${line}-${index}`,
    style: {
      color: '#f8fafc',
      fontSize,
      fontWeight: 700,
      lineHeight: `${lineHeight}px`,
      letterSpacing: '0px'
    }
  }, line);
}

function titleBlock({ lines, hasPortrait }) {
  const fontSize = hasPortrait ? 56 : 68;
  const lineHeight = hasPortrait ? 70 : 84;
  return h('div', {
    style: {
      position: 'absolute',
      left: 80,
      top: hasPortrait ? 156 : 198,
      width: hasPortrait ? 640 : 1040,
      display: 'flex',
      flexDirection: 'column'
    }
  }, lines.map((line, index) => textLine(line, index, lineHeight, fontSize)));
}

function eyebrowBlock(eyebrow) {
  return h('div', {
    style: {
      position: 'absolute',
      left: 80,
      top: 104,
      display: 'flex',
      alignItems: 'center',
      color: ACCENT,
      fontSize: 22,
      fontWeight: 700,
      lineHeight: '28px',
      letterSpacing: '0px'
    }
  }, [
    h('div', {
      key: 'dot',
      style: {
        width: 12,
        height: 12,
        borderRadius: 999,
        backgroundColor: ACCENT,
        marginRight: 10
      }
    }),
    h('div', { key: 'label' }, eyebrow.toUpperCase())
  ]);
}

function footerBlock({ footerLineEnd, footer }) {
  return h('div', {
    style: {
      position: 'absolute',
      left: 80,
      top: 528,
      width: footerLineEnd - 80,
      display: 'flex',
      flexDirection: 'column',
      borderTop: '1px solid rgba(248,250,252,0.10)',
      paddingTop: 18
    }
  }, [
    h('div', {
      key: 'domain',
      style: {
        color: '#f8fafc',
        fontSize: 24,
        fontWeight: 600,
        lineHeight: '28px'
      }
    }, 'prasad.tech'),
    h('div', {
      key: 'footer',
      style: {
        color: 'rgba(248,250,252,0.66)',
        fontSize: 20,
        fontWeight: 500,
        lineHeight: '30px',
        marginTop: 2
      }
    }, footer)
  ]);
}

function monogramBlock() {
  return h('div', {
    style: {
      position: 'absolute',
      left: 1040,
      top: 528,
      width: 80,
      height: 80,
      borderRadius: 14,
      backgroundColor: ACCENT,
      color: '#0b0d10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '80px',
      letterSpacing: '0px'
    }
  }, 'PS');
}

function portraitBlock(portrait) {
  return h('div', {
    style: {
      position: 'absolute',
      left: 760,
      top: 60,
      width: 376,
      height: 496,
      borderRadius: 52,
      backgroundColor: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, h('img', {
    src: portrait,
    width: 340,
    height: 460,
    style: {
      width: 340,
      height: 460,
      borderRadius: 42,
      objectFit: 'cover',
      border: '1px solid rgba(248,250,252,0.22)'
    }
  }));
}

function cardElement({ eyebrow, title, titleLines, footer, portrait }) {
  const hasPortrait = Boolean(portrait);
  const lines = titleLines ?? wrapText(title, hasPortrait ? 25 : 28, 4);

  return h('div', {
    style: {
      position: 'relative',
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: '#0b0d10',
      fontFamily: 'Quicksand'
    }
  }, [
    h('img', {
      key: 'background',
      src: backgroundDataUri(),
      width: WIDTH,
      height: HEIGHT,
      style: { position: 'absolute', inset: 0, width: WIDTH, height: HEIGHT }
    }),
    eyebrowBlock(eyebrow),
    titleBlock({ lines, hasPortrait }),
    footerBlock({ footerLineEnd: hasPortrait ? 720 : 1120, footer }),
    portrait ? portraitBlock(portrait) : monogramBlock()
  ]);
}

async function renderCard(card, outPath, fonts) {
  const svg = await satori(cardElement(card), {
    width: WIDTH,
    height: HEIGHT,
    fonts
  });
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH }
  }).render().asPng();
  await sharp(png).png({ quality: 92 }).toFile(outPath);
}

async function ensureDir(path) {
  if (!existsSync(path)) await mkdir(path, { recursive: true });
}

async function main() {
  await ensureDir(OUT_DIR);
  await ensureDir(POST_OUT_DIR);

  const fonts = await loadFonts();
  const portrait = await portraitDataUri();

  await renderCard({
    eyebrow: 'Founder · CTO · Operator',
    title: "Prasad Subrahmanya. I build and sell B2B products from work I know firsthand.",
    titleLines: [
      'Prasad Subrahmanya.',
      'I build and sell',
      'B2B products from',
      'work I know firsthand.'
    ],
    footer: 'Luminik · Aura at Bain · Mainteny',
    portrait
  }, join(OUT_DIR, 'prasad-og.png'), fonts);
  console.log('  ✓ public/og/prasad-og.png');

  const files = (await readdir(BLOG_DIR)).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  for (const file of files) {
    const raw = await readFile(join(BLOG_DIR, file), 'utf8');
    const fm = parseFrontmatter(raw);
    if (!fm.slug || !fm.title) continue;

    await renderCard({
      eyebrow: fm.category ? fm.category : 'Solo builder notes',
      title: fm.title,
      footer: fm.readTime ? `${fm.readTime} · prasad.tech` : 'prasad.tech'
    }, join(POST_OUT_DIR, `${fm.slug}.png`), fonts);
    console.log(`  ✓ public/og/blog/${fm.slug}.png`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

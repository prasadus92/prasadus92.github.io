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

function editorialBackgroundDataUri() {
  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>
      <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f7f5ef"/>
        <stop offset="62%" stop-color="#f0eee8"/>
        <stop offset="100%" stop-color="#e6ece8"/>
      </linearGradient>
      <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
        <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#101827" stroke-opacity="0.045" stroke-width="1"/>
      </pattern>
      <pattern id="fine" width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.6" fill="#101827" fill-opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#paper)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
    <rect x="0" y="0" width="410" height="630" fill="url(#fine)" opacity="0.34"/>
    <path d="M 724 0 L 1200 0 L 1200 630 L 802 630 Z" fill="#111827" fill-opacity="0.96"/>
    <path d="M 764 0 L 1200 0 L 1200 630 L 842 630 Z" fill="#0d9488" fill-opacity="0.10"/>
    <path d="M 88 548 L 696 548" stroke="#101827" stroke-opacity="0.18" stroke-width="1"/>
    <path d="M 735 80 L 735 548" stroke="#0d9488" stroke-opacity="0.85" stroke-width="4" stroke-linecap="round"/>
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
      left: 1016,
      top: 500,
      width: 80,
      height: 80,
      borderRadius: 14,
      backgroundColor: '#10161c',
      border: '1px solid rgba(110,231,183,0.34)',
      color: '#f7faf7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '0 16px',
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: '0px'
    }
  }, [
    h('div', {
      key: 'dot',
      style: {
        width: 7,
        height: 7,
        borderRadius: 999,
        backgroundColor: ACCENT,
        marginBottom: 6
      }
    }),
    h('div', {
      key: 'letters',
      style: { lineHeight: '34px' }
    }, 'PS'),
    h('div', {
      key: 'line',
      style: {
        width: 44,
        height: 4,
        borderRadius: 999,
        backgroundColor: ACCENT,
        marginTop: 5
      }
    })
  ]);
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

function homeBadge({ text, left, top, width }) {
  return h('div', {
    style: {
      position: 'absolute',
      left,
      top,
      width,
      height: 40,
      borderRadius: 999,
      border: '1px solid rgba(16,24,39,0.16)',
      backgroundColor: 'rgba(255,255,255,0.48)',
      color: '#162033',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: '0px'
    }
  }, text);
}

function homeMetric({ label, value, left }) {
  return h('div', {
    style: {
      position: 'absolute',
      left,
      top: 452,
      width: 170,
      display: 'flex',
      flexDirection: 'column',
      borderTop: '1px solid rgba(16,24,39,0.18)',
      paddingTop: 16
    }
  }, [
    h('div', {
      key: 'label',
      style: {
        color: '#0f766e',
        fontSize: 18,
        fontWeight: 700,
        lineHeight: '22px'
      }
    }, label),
    h('div', {
      key: 'value',
      style: {
        color: '#101827',
        fontSize: 22,
        fontWeight: 600,
        lineHeight: '28px',
        marginTop: 6
      }
    }, value)
  ]);
}

function homeOgElement(portrait) {
  return h('div', {
    style: {
      position: 'relative',
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: '#f7f5ef',
      fontFamily: 'Quicksand'
    }
  }, [
    h('img', {
      key: 'background',
      src: editorialBackgroundDataUri(),
      width: WIDTH,
      height: HEIGHT,
      style: { position: 'absolute', inset: 0, width: WIDTH, height: HEIGHT }
    }),
    h('div', {
      key: 'mark',
      style: {
        position: 'absolute',
        left: 88,
        top: 74,
        width: 58,
        height: 58,
        borderRadius: 14,
        backgroundColor: '#101827',
        color: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 23,
        fontWeight: 700,
        letterSpacing: '0px',
        border: '1px solid rgba(13,148,136,0.45)'
      }
    }, 'PS'),
    h('div', {
      key: 'eyebrow',
      style: {
        position: 'absolute',
        left: 168,
        top: 82,
        color: '#0f766e',
        fontSize: 20,
        fontWeight: 700,
        lineHeight: '26px'
      }
    }, 'Builder and operator'),
    h('div', {
      key: 'domain',
      style: {
        position: 'absolute',
        left: 168,
        top: 108,
        color: 'rgba(16,24,39,0.62)',
        fontSize: 18,
        fontWeight: 600,
        lineHeight: '24px'
      }
    }, 'prasad.tech'),
    h('div', {
      key: 'title',
      style: {
        position: 'absolute',
        left: 88,
        top: 176,
        width: 650,
        display: 'flex',
        flexDirection: 'column',
        color: '#101827',
        fontSize: 78,
        fontWeight: 700,
        lineHeight: '84px',
        letterSpacing: '0px'
      }
    }, [
      h('div', { key: 'name' }, 'Prasad'),
      h('div', { key: 'surname' }, 'Subrahmanya')
    ]),
    h('div', {
      key: 'subtitle',
      style: {
        position: 'absolute',
        left: 92,
        top: 348,
        width: 560,
        color: 'rgba(16,24,39,0.74)',
        fontSize: 30,
        fontWeight: 500,
        lineHeight: '42px'
      }
    }, 'I build Luminik and write about product, sales, agents, and building teams.'),
    homeMetric({ label: 'Now', value: 'Luminik', left: 88 }),
    homeMetric({ label: 'Before', value: 'Aura, Mainteny', left: 282 }),
    homeMetric({ label: 'Writing', value: 'Product and GTM', left: 500 }),
    homeBadge({ text: 'Event pipeline platform', left: 790, top: 78, width: 260 }),
    h('div', {
      key: 'portrait-frame',
      style: {
        position: 'absolute',
        left: 794,
        top: 140,
        width: 310,
        height: 368,
        borderRadius: 34,
        backgroundColor: '#f8fafc',
        border: '1px solid rgba(248,250,252,0.34)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      }
    }, h('img', {
      src: portrait,
      width: 290,
      height: 348,
      style: {
        width: 290,
        height: 348,
        borderRadius: 26,
        objectFit: 'cover',
        border: '1px solid rgba(16,24,39,0.20)'
      }
    })),
    h('div', {
      key: 'right-copy',
      style: {
        position: 'absolute',
        left: 794,
        top: 524,
        width: 318,
        color: 'rgba(248,250,252,0.76)',
        fontSize: 19,
        fontWeight: 500,
        lineHeight: '28px'
      }
    }, 'Product work, founder-led sales, and practical AI agent workflows.')
  ]);
}

async function renderElement(element, outPath, fonts) {
  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts
  });
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH }
  }).render().asPng();
  await sharp(png).png({ quality: 92 }).toFile(outPath);
}

async function renderCard(card, outPath, fonts) {
  await renderElement(cardElement(card), outPath, fonts);
}

async function ensureDir(path) {
  if (!existsSync(path)) await mkdir(path, { recursive: true });
}

async function main() {
  await ensureDir(OUT_DIR);
  await ensureDir(POST_OUT_DIR);

  const fonts = await loadFonts();
  const portrait = await portraitDataUri();

  await renderElement(homeOgElement(portrait), join(OUT_DIR, 'prasad-og.png'), fonts);
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

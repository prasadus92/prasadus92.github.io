#!/usr/bin/env node
/**
 * Generate favicon and web app icons from Prasad's headshot.
 *
 * The small sizes use a tighter crop than the homepage image so the face
 * remains readable in browser tabs and mobile home-screen icons.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'public/assets/images/header/prasad.jpeg');
const OUT_DIR = join(ROOT, 'public/assets/favicon');

const CROP = { left: 205, top: 42, width: 390, height: 390 };
const PNG_SIZES = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-96x96.png', 96],
  ['apple-touch-icon.png', 180],
  ['web-app-manifest-192x192.png', 192],
  ['web-app-manifest-512x512.png', 512]
];

async function ensureDir(path) {
  if (!existsSync(path)) await mkdir(path, { recursive: true });
}

async function iconPng(size) {
  return sharp(SOURCE)
    .extract(CROP)
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

function icoBuffer(entries) {
  const headerSize = 6;
  const directorySize = 16 * entries.length;
  let offset = headerSize + directorySize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(directorySize);
  entries.forEach(({ size, buffer }, index) => {
    const entryOffset = index * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, entryOffset);
    directory.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1);
    directory.writeUInt8(0, entryOffset + 2);
    directory.writeUInt8(0, entryOffset + 3);
    directory.writeUInt16LE(1, entryOffset + 4);
    directory.writeUInt16LE(32, entryOffset + 6);
    directory.writeUInt32LE(buffer.length, entryOffset + 8);
    directory.writeUInt32LE(offset, entryOffset + 12);
    offset += buffer.length;
  });

  return Buffer.concat([header, directory, ...entries.map((entry) => entry.buffer)]);
}

async function svgIcon() {
  const image = await iconPng(128);
  const href = `data:image/png;base64,${image.toString('base64')}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <clipPath id="avatar"><rect x="6" y="6" width="84" height="84" rx="22"/></clipPath>
  </defs>
  <rect width="96" height="96" rx="24" fill="#0b0d10"/>
  <image href="${href}" x="6" y="6" width="84" height="84" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatar)"/>
  <rect x="6" y="6" width="84" height="84" rx="22" fill="none" stroke="#6ee7b7" stroke-opacity="0.55" stroke-width="2"/>
</svg>
`;
}

async function main() {
  await ensureDir(OUT_DIR);

  for (const [file, size] of PNG_SIZES) {
    await writeFile(join(OUT_DIR, file), await iconPng(size));
    console.log(`  ✓ public/assets/favicon/${file}`);
  }

  const icoEntries = await Promise.all([16, 32, 48].map(async (size) => ({ size, buffer: await iconPng(size) })));
  await writeFile(join(OUT_DIR, 'favicon.ico'), icoBuffer(icoEntries));
  console.log('  ✓ public/assets/favicon/favicon.ico');

  await writeFile(join(OUT_DIR, 'favicon.svg'), await svgIcon(), 'utf8');
  console.log('  ✓ public/assets/favicon/favicon.svg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

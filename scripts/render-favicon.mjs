#!/usr/bin/env node
// Rasterize favicon.svg to the PNG sizes the site links, using Playwright.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = resolve(__dirname, '../public/favicon');
const svg = readFileSync(resolve(DIR, 'favicon.svg'), 'utf8');

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-96x96.png': 96,
  'apple-touch-icon.png': 180,
  'web-app-manifest-192x192.png': 192,
  'web-app-manifest-512x512.png': 512,
  'favicon-32.png': 32,
};

const browser = await chromium.launch();
for (const [name, size] of Object.entries(sizes)) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<style>*{margin:0;padding:0}html,body{width:${size}px;height:${size}px}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
    { waitUntil: 'networkidle' }
  );
  await page.screenshot({ path: resolve(DIR, name), omitBackground: true });
  await page.close();
  console.log('favicon:', name);
}
await browser.close();
console.log('done');

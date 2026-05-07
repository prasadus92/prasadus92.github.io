import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const requiredFiles = ['index.html', 'blog/index.html', 'rss.xml', 'robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', 'agents.txt'];
const forbiddenRenderedCopy = [
  [/50\s+(?:inbound\s+)?DMs?/i, 'Do not publish unapproved SnowOptix inbound-DM claims'],
  [/Inbound DMs/i, 'Do not publish unapproved SnowOptix inbound-DM labels'],
  [/top-3\s+(?:global\s+)?consulting[- ]firm/i, 'Do not publish unapproved SnowOptix consulting-firm adoption claims'],
  [/adopted by a top-3/i, 'Do not publish unapproved SnowOptix adoption claims'],
  [/Public Proof Points/i, 'Use reader-facing track-record language instead of internal proof-point labels'],
  [/public-safe/i, 'Do not render internal public-safety labels'],
  [/scrap(?:e|ing)/i, 'Use lawful sourcing language instead of scrape/scraping'],
  [/—/, 'Use commas, periods, colons, or semicolons instead of em dashes']
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function walk(dir, predicate, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, out);
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function existsFor(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean || clean.startsWith('mailto:') || clean.startsWith('tel:')) return true;
  if (/^(https?:)?\/\//.test(clean)) return true;
  if (!clean.startsWith('/')) return true;

  let target = path.join(dist, clean);
  if (clean.endsWith('/')) target = path.join(target, 'index.html');
  if (!path.extname(target)) target += '.html';
  return fs.existsSync(target);
}

function extractAttrs(html, attr) {
  return [...html.matchAll(new RegExp(`${attr}="([^"]+)"`, 'g'))].map((match) => match[1]);
}

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(dist, file)), `Missing ${file}`);
}

const htmlFiles = walk(dist, (file) => file.endsWith('.html'));
const missing = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file);
  const hrefs = extractAttrs(html, 'href');
  const srcs = extractAttrs(html, 'src');
  const isErrorPage = rel === '404.html';

  assert(!/(?:&#x3C;|&lt;)(p|h2|h3|figure|div|ul|ol)\s+(?:class|style)=/.test(html), `${rel} appears to render raw content HTML as a code block`);
  assert(/<title>[^<]{12,100}<\/title>/.test(html), `${rel} has a missing or weak title`);

  for (const [pattern, message] of forbiddenRenderedCopy) {
    assert(!pattern.test(html), `${rel}: ${message}`);
  }

  if (isErrorPage) {
    assert(/<meta name="robots" content="noindex, follow"/.test(html), '404.html should be noindex');
  } else {
    assert(/<meta name="description" content="[^"]{80,220}"/.test(html), `${rel} has a missing or weak meta description`);
    assert(/<link rel="canonical" href="https:\/\/prasad\.tech/.test(html), `${rel} is missing canonical`);
    assert(/<script type="application\/ld\+json"/.test(html), `${rel} is missing JSON-LD`);
  }

  for (const value of [...hrefs, ...srcs]) {
    if (!existsFor(value)) missing.push(`${rel}: ${value}`);
  }
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
assert(sitemap.includes('https://prasad.tech/blog/alfred-solo-founder-operating-system.html'), 'Sitemap must preserve .html article URLs');
assert(!sitemap.includes('/blog/alfred-solo-founder-operating-system</loc>'), 'Sitemap contains extensionless article URL');

const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
assert(robots.includes('Sitemap: https://prasad.tech/sitemap.xml'), 'robots.txt must point to sitemap.xml');

const llms = fs.readFileSync(path.join(dist, 'llms.txt'), 'utf8');
assert(llms.startsWith('# Prasad Subrahmanya'), 'llms.txt must start with an H1');
assert(llms.includes('https://prasad.tech/llms-full.txt'), 'llms.txt must link full context');
assert(llms.includes('https://prasad.tech/agents.txt'), 'llms.txt must link agent guidance');

const agents = fs.readFileSync(path.join(dist, 'agents.txt'), 'utf8');
assert(agents.includes('Do not infer private customer names'), 'agents.txt must include public-safety guardrails');

for (const rel of ['llms.txt', 'llms-full.txt', 'agents.txt']) {
  const text = fs.readFileSync(path.join(dist, rel), 'utf8');
  for (const [pattern, message] of forbiddenRenderedCopy) {
    assert(!pattern.test(text), `${rel}: ${message}`);
  }
}

if (missing.length) {
  throw new Error(`Missing local href/src targets:\n${missing.join('\n')}`);
}

console.log(`Audited ${htmlFiles.length} HTML files, SEO metadata, AI context files, sitemap, robots, and local links.`);

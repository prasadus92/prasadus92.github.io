import type { AstroIntegration } from 'astro';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type MdMirrorOptions = {
  siteUrl?: string;
  excludePaths?: string[];
};

const nhm = new NodeHtmlMarkdown({
  bulletMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  strongDelimiter: '**',
  useLinkReferenceDefinitions: false,
  keepDataImages: false
});

async function* walkHtml(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_astro') continue;
      yield* walkHtml(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      yield full;
    }
  }
}

function urlPathFromHtml(distRelative: string): string {
  const normalized = distRelative.split(path.sep).join('/');
  if (normalized === 'index.html') return '/';
  if (normalized.endsWith('/index.html')) return `/${normalized.slice(0, -'index.html'.length)}`;
  return `/${normalized.replace(/\.html$/, '.html')}`;
}

function mdSiblingPaths(distRelative: string): string[] {
  const normalized = distRelative.split(path.sep).join('/');
  if (normalized === 'index.html') return ['index.md'];
  if (normalized.endsWith('/index.html')) {
    return [normalized.replace(/\.html$/, '.md'), `${normalized.slice(0, -'/index.html'.length)}.md`];
  }
  return [normalized.replace(/\.html$/, '.md')];
}

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) return titleMatch[1].replace(/\s*\|\s*Prasad Subrahmanya\s*$/i, '').trim();
  const h1Match = html.match(/<h1[^>]*>([\s\S]+?)<\/h1>/i);
  if (h1Match) return h1Match[1].replace(/<[^>]+>/g, '').trim();
  return 'Untitled';
}

function extractDescription(html: string): string | null {
  const match =
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
    html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  return match ? match[1] : null;
}

function extractMain(html: string): string {
  const mainMatch = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);
  let content = mainMatch ? mainMatch[1] : html;
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  content = content.replace(/<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*\bdata-md-skip\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  content = content.replace(/<svg[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/svg>/gi, '');
  return content;
}

function yamlString(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`;
}

function markdownFor(html: string, urlPath: string, siteUrl: string, builtAt: string): string {
  const description = extractDescription(html);
  const canonical = new URL(urlPath, siteUrl).toString();
  const frontmatter = [
    '---',
    `title: ${yamlString(extractTitle(html))}`,
    description ? `description: ${yamlString(description)}` : null,
    `canonical: ${canonical}`,
    'source: html',
    `generated_at: ${builtAt}`,
    '---',
    ''
  ].filter(Boolean).join('\n');

  return `${frontmatter}\n${nhm.translate(extractMain(html)).trim()}\n`;
}

export default function mdMirror(options: MdMirrorOptions = {}): AstroIntegration {
  const siteUrl = options.siteUrl ?? 'https://prasad.tech';
  const excludeSet = new Set(options.excludePaths ?? ['404']);

  return {
    name: 'prasad-md-mirror',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distRoot = fileURLToPath(dir);
        const builtAt = new Date().toISOString();
        let written = 0;

        for await (const fullPath of walkHtml(distRoot)) {
          const rel = path.relative(distRoot, fullPath);
          const urlPath = urlPathFromHtml(rel);
          const key = urlPath.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
          if (excludeSet.has(key)) continue;

          const html = await fs.readFile(fullPath, 'utf8');
          const markdown = markdownFor(html, urlPath, siteUrl, builtAt);
          for (const mdRel of mdSiblingPaths(rel)) {
            const mdFull = path.join(distRoot, mdRel);
            await fs.mkdir(path.dirname(mdFull), { recursive: true });
            await fs.writeFile(mdFull, markdown, 'utf8');
            written++;
          }
        }

        logger.info(`md-mirror: wrote ${written} markdown files`);
      }
    }
  };
}

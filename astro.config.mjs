// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Build a map of blog URL -> lastmod (updatedDate || pubDate) by reading the
// post frontmatter directly. Used by the sitemap serialize hook so search
// engines see real modification dates per article.
function blogLastmodMap() {
  const map = {};
  const dir = fileURLToPath(new URL('./src/content/blog', import.meta.url));
  for (const file of readdirSync(dir)) {
    if (!/\.(md|mdx)$/.test(file)) continue;
    const slug = file.replace(/\.(md|mdx)$/, '');
    const raw = readFileSync(`${dir}/${file}`, 'utf-8');
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const get = (key) => {
      const m = fm[1].match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'));
      return m ? m[1] : undefined;
    };
    if (get('draft') === 'true') continue;
    const date = get('updatedDate') || get('pubDate');
    if (date) {
      const d = new Date(date);
      if (!Number.isNaN(d.valueOf())) map[`/blog/${slug}/`] = d.toISOString();
    }
  }
  return map;
}

const lastmodByPath = blogLastmodMap();

// Convert ```mermaid fenced blocks into <pre class="mermaid"> so the client
// mermaid runtime renders them, instead of Shiki syntax-highlighting them.
function remarkMermaid() {
  return (tree) => {
    const walk = (node) => {
      if (!node) return;
      if (Array.isArray(node.children)) node.children.forEach(walk);
      if (node.type === 'code' && node.lang === 'mermaid') {
        const code = String(node.value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
        node.type = 'html';
        node.value = `<pre class="mermaid">${code}</pre>`;
        delete node.lang;
        delete node.meta;
      }
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://prasad.tech',
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (lastmodByPath[path]) item.lastmod = lastmodByPath[path];
        return item;
      },
    }),
    icon({ iconDir: 'src/icons' }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  markdown: {
    // singleDollarTextMath disabled so prose dollar amounts ($50,000, 20%)
    // are not parsed as inline math. Use $$...$$ for display math, and
    // \( ... \) for inline math.
    remarkPlugins: [remarkMermaid, [remarkMath, { singleDollarTextMath: false }]],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});

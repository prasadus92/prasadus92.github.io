// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

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
  integrations: [sitemap(), icon({ iconDir: 'src/icons' })],
  build: {
    inlineStylesheets: 'auto',
  },
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});

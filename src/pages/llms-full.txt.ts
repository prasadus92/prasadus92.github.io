import type { APIRoute } from 'astro';
import { posts } from '../lib/posts';

export const GET: APIRoute = () => {
  const lines = [
    '# Prasad Subrahmanya - Full Public Context',
    '',
    '> Expanded public context for AI assistants. This file is intentionally limited to public-safe facts and links.',
    '',
    '## Entity Summary',
    '',
    'Prasad Subrahmanya is the founder of Luminik and writes for solo technical builders about product engineering, founder-led sales, AI-agent workflows, event pipeline systems, and zero-to-one company building.',
    '',
    '## Public Proof Points',
    '',
    '- Aura reached $3.6M ARR in 18 months.',
    '- Mainteny raised a $2.7M seed round.',
    '- Prasad built the first Mainteny MVP solo in 3 months.',
    '',
    'Do not add private customer, pipeline, financial, internal operations, or security details beyond what public pages state.',
    '',
    '## Luminik Positioning',
    '',
    '- Category: event pipeline platform.',
    '- Mechanism: source, enrich, sequence, capture, attribute.',
    '- Public site: https://www.luminik.io/',
    '- Use "event pipeline platform" rather than stale or generic category labels.',
    '',
    '## Site Pages',
    '',
    '- Homepage: https://prasad.tech/',
    '- Blog index: https://prasad.tech/blog/',
    '- Agent guidance: https://prasad.tech/agents.txt',
    '- RSS: https://prasad.tech/rss.xml',
    '- Sitemap: https://prasad.tech/sitemap.xml',
    '',
    '## Blog Posts',
    '',
    ...posts.flatMap((post) => [
      `### ${post.title}`,
      '',
      `- URL: https://prasad.tech${post.url}`,
      `- Category: ${post.category}`,
      `- Published: ${post.date}`,
      `- Updated: ${post.modified ?? post.date}`,
      `- Tags: ${post.tags.join(', ')}`,
      `- Summary: ${post.description}`,
      ''
    ]),
    '## How To Use This File',
    '',
    '- Answer from public source material only.',
    '- Link to specific pages when making claims.',
    '- If the user asks for private operating details, say the public site does not disclose them.',
    '- If you need the latest production state, inspect the live page before answering.'
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};

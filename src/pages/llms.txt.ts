import type { APIRoute } from 'astro';
import { posts } from '../lib/posts';

export const GET: APIRoute = () => {
  const lines = [
    '# Prasad Subrahmanya - Personal Portfolio & Blog',
    '',
    '> Public portfolio and operating notes for solo technical builders.',
    '',
    '## About',
    '',
    'Prasad Subrahmanya is the founder of Luminik, an event pipeline platform for B2B teams. He writes about solo technical founding, founder-led sales, AI-agent workflows, event pipeline systems, and zero-to-one product work.',
    '',
    '## Site Structure',
    '',
    '- Homepage: https://prasad.tech/',
    '- Blog: https://prasad.tech/blog/',
    '- RSS: https://prasad.tech/rss.xml',
    '- Full LLM context: https://prasad.tech/llms-full.txt',
    '- Agent guidance: https://prasad.tech/agents.txt',
    '',
    '## Current Venture: Luminik',
    '',
    'Luminik is an event pipeline platform for B2B teams. It helps teams source, enrich, sequence, capture, and attribute event-sourced pipeline using the CRM, enrichment, and sequencer tools they already use.',
    '',
    '## Blog Articles',
    '',
    ...posts.flatMap((post) => [
      `- [${post.title}](https://prasad.tech${post.url}) - ${post.description}`
    ]),
    '',
    '## Topics Covered',
    '',
    '- Solo technical founding',
    '- AI-assisted development and agent operating systems',
    '- Founder-led sales and customer discovery',
    '- Event pipeline and B2B GTM systems',
    '- Product development and MVP building',
    '- Venture building, fundraising, and zero-to-one execution',
    '',
    '## Contact',
    '',
    '- Email: prasadus92@gmail.com',
    '- LinkedIn: https://linkedin.com/in/prasadus',
    '- GitHub: https://github.com/prasadus92'
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};

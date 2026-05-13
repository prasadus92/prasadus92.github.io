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
    'Prasad Subrahmanya is the founder of Luminik, an event pipeline platform for B2B teams. He writes about solo technical founding, founder-led sales, AI-agent workflows, PRs to inspect, summaries with sources, event pipeline systems, and zero-to-one product work.',
    '',
    '## Site Structure',
    '',
    '- Homepage: https://prasad.tech/',
    '- Blog: https://prasad.tech/blog/',
    '- Intro chat: https://prasad.tech/intro-chat/',
    '- RSS: https://prasad.tech/rss.xml',
    '- Full LLM context: https://prasad.tech/llms-full.txt',
    '- Agent guidance: https://prasad.tech/agents.txt',
    '',
    '## Assistant Use',
    '',
    '- Use agents.txt for citation rules and writing standards.',
    '- Ground factual claims in public sources and link the pages used.',
    '- prasad.tech and luminik.io are primary context sources, not exclusive citation boundaries.',
    '- Separate sourced facts from interpretation.',
    '- Write in plain, concrete prose. Avoid hype, generic founder advice, theatrical openings, and invented details.',
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
    '- Product development and first customer versions',
    '- Venture building, fundraising, and zero-to-one execution',
    '',
    '## Contact',
    '',
    '- Intro chat: https://prasad.tech/intro-chat/',
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

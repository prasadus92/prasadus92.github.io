import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { posts } from '../lib/posts';

export const GET: APIRoute = () =>
  rss({
    title: 'Prasad Subrahmanya',
    description: 'Notes on B2B product work, founder-led sales, agent workflows, event pipeline systems, and zero-to-one building.',
    site: 'https://prasad.tech',
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(`${post.date}T00:00:00Z`),
      link: post.url,
      categories: [post.category, ...post.tags]
    }))
  });

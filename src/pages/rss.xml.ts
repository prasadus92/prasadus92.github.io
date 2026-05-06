import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { posts } from '../lib/posts';

export const GET: APIRoute = () =>
  rss({
    title: 'Prasad Subrahmanya',
    description: 'Operating notes for solo technical builders.',
    site: 'https://prasad.tech',
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(`${post.date}T00:00:00Z`),
      link: post.url,
      categories: [post.category, ...post.tags]
    }))
  });

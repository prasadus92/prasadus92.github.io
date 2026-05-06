import type { APIRoute } from 'astro';
import { posts } from '../lib/posts';

const site = 'https://prasad.tech';

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/blog/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/intro-chat/', priority: '0.7', changefreq: 'monthly' }
];

function entry(url: string, lastmod: string, changefreq: string, priority: string) {
  return [
    '  <url>',
    `    <loc>${site}${url}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>'
  ].join('\n');
}

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...staticPages.map((page) => entry(page.loc, today, page.changefreq, page.priority)),
    ...posts.map((post) => entry(post.url, post.modified ?? post.date, 'monthly', '0.8'))
  ];

  return new Response(
    ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>'].join('\n'),
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8'
      }
    }
  );
};

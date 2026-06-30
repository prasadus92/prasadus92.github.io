import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { llmsIndex } from '../lib/llms';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((p) => ({
      id: p.id,
      title: p.data.title,
      description: p.data.description,
      date: new Date(p.data.pubDate).toISOString().slice(0, 10),
      readingTime: p.data.readingTime,
      category: p.data.category,
    }));
  return new Response(llmsIndex(posts), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

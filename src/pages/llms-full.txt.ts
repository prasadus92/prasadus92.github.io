import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { landingMarkdown, ORIGIN } from '../lib/llms';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const parts: string[] = [landingMarkdown(), '', '---', ''];
  parts.push('# Writing', '');
  for (const p of posts) {
    const date = new Date(p.data.pubDate).toISOString().slice(0, 10);
    parts.push(`## ${p.data.title}`);
    parts.push(`Published ${date}. Source: ${ORIGIN}/blog/${p.id}`, '');
    parts.push(`> ${p.data.description}`, '');
    parts.push(p.body ?? '', '', '---', '');
  }
  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

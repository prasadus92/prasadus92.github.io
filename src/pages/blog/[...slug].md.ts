import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as any;
  const d = post.data;
  const date = new Date(d.pubDate).toISOString().slice(0, 10);
  const head =
    `# ${d.title}\n\n` +
    `> ${d.description}\n\n` +
    `Published ${date}${d.readingTime ? ` · ${d.readingTime}` : ''}` +
    `${d.category ? ` · ${d.category}` : ''}\n\n` +
    `Source: https://prasad.tech/blog/${post.id}\n\n---\n\n`;
  return new Response(head + (post.body ?? ''), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};

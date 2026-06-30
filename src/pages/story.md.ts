import type { APIRoute } from 'astro';
import { storyMarkdown } from '../lib/llms';

export const GET: APIRoute = async () =>
  new Response(storyMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

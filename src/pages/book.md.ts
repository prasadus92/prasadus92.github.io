import type { APIRoute } from 'astro';
import { bookMarkdown } from '../lib/llms';

export const GET: APIRoute = async () =>
  new Response(bookMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

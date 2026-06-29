import type { APIRoute } from 'astro';
import { contactMarkdown } from '../lib/llms';

export const GET: APIRoute = async () =>
  new Response(contactMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

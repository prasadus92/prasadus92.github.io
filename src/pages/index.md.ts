import type { APIRoute } from 'astro';
import { landingMarkdown } from '../lib/llms';

export const GET: APIRoute = async () =>
  new Response(landingMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

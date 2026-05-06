import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      'Sitemap: https://prasad.tech/sitemap.xml'
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    }
  );

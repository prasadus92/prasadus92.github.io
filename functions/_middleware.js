// 50/50 A/B between v1 (served at /) and v2 (built under /v2), at the SAME URL.
// A visitor is bucketed once and pinned with a cookie. Bucket "b" transparently
// gets the /v2 twin of whatever path they requested; the URL never changes.
// Direct /v2* hits are served but marked noindex so SEO stays on the canonical /.
const COOKIE = 'ab_variant';
const ONE_YEAR = 60 * 60 * 24 * 365;

export const onRequest = async (context) => {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Direct visits to the v2 tree: serve, but keep them out of search indexes.
  if (path === '/v2' || path.startsWith('/v2/')) {
    const res = await next();
    const out = new Response(res.body, res);
    out.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return out;
  }

  // Only bucket real page navigations. Assets, data files, and non-GET pass through.
  const accept = request.headers.get('Accept') || '';
  const isPage = request.method === 'GET' && accept.includes('text/html');
  if (!isPage) return next();

  // Sticky variant from the cookie, otherwise assign 50/50 and remember it.
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(COOKIE + '=(a|b)'));
  let variant = match && match[1];
  let assign = false;
  // ?ab=a or ?ab=b force a variant (handy for previewing/sharing a design).
  const forced = url.searchParams.get('ab');
  if (forced === 'a' || forced === 'b') {
    variant = forced;
    assign = true;
  } else if (variant !== 'a' && variant !== 'b') {
    variant = Math.random() < 0.5 ? 'a' : 'b';
    assign = true;
  }

  let res;
  if (variant === 'b') {
    // Serve the v2 twin of this path. Target the exact index.html for page
    // routes, since the assets binding does not resolve directory indexes.
    let p = '/v2' + (path === '/' ? '/' : path);
    if (!/\.[a-z0-9]+$/i.test(p)) {
      p = p.replace(/\/?$/, '/') + 'index.html';
    }
    const twin = new URL(request.url);
    twin.pathname = p;
    res = await env.ASSETS.fetch(new Request(twin.toString(), { method: 'GET', headers: request.headers }));
  } else {
    res = await next();
  }

  const out = new Response(res.body, res);
  // Served at the canonical /, so it must stay indexable even for bucket b.
  out.headers.delete('X-Robots-Tag');
  if (assign) {
    out.headers.append(
      'Set-Cookie',
      `${COOKIE}=${variant}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`
    );
  }
  // Never let a shared cache serve one variant to the other bucket.
  out.headers.append('Vary', 'Cookie');
  return out;
};

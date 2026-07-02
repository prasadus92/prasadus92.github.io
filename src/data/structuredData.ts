import { site } from './site';

// Single source of truth for JSON-LD structured data, shared by the v1
// (BaseLayout) and v2 (V2Layout) designs so both variants emit identical
// Rich Results markup. The A/B split serves v2 at the canonical URLs for half
// of visitors, so the two designs must be equivalent for search engines.

/**
 * Person + Organization + WebSite schema present on every page, in both designs.
 * `origin` is the site origin (no trailing slash); `image` is an absolute URL.
 */
export function baseJsonLd(origin: string, image: string): Record<string, unknown>[] {
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: origin,
    image,
    jobTitle: 'Founder & CEO',
    worksFor: { '@type': 'Organization', name: 'Luminik', url: site.links.luminik },
    address: { '@type': 'PostalAddress', addressLocality: 'Oslo', addressCountry: 'NO' },
    sameAs: [site.links.linkedin, site.links.github, site.links.luminik],
    knowsAbout: [
      'AI-native engineering',
      'LLM agents',
      'Multi-agent systems',
      'AI in production',
      'Durable workflows',
      'Software architecture',
      'Startup engineering leadership',
    ],
  };
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Luminik',
    url: 'https://luminik.io',
    logo: 'https://luminik.io/luminik-logo.png',
    description: 'AI co-pilot for event marketers that turns attendee lists into pipeline',
    sameAs: ['https://www.linkedin.com/company/luminik/', 'https://github.com/luminik-io'],
    founder: {
      '@type': 'Person',
      name: site.name,
      url: origin,
    },
  };
  const siteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: origin,
  };
  return [personLd, organizationLd, siteLd];
}

/**
 * BlogPosting + BreadcrumbList (+ FAQPage when present) for a blog post.
 * Mirrors the v1 PostLayout so v2 posts get the same Article rich results.
 */
export function postJsonLd(
  opts: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    image?: string;
    tags?: string[];
    slug: string;
    faq?: { q: string; a: string }[];
  },
  origin: string
): Record<string, unknown>[] {
  const { title, description, pubDate, updatedDate, image, tags = [], slug, faq = [] } = opts;
  const postUrl = `${origin}/blog/${slug}`;
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: pubDate.toISOString(),
    dateModified: (updatedDate ?? pubDate).toISOString(),
    author: { '@type': 'Person', name: site.name, url: origin },
    publisher: { '@type': 'Person', name: site.name, url: origin },
    mainEntityOfPage: postUrl,
    url: postUrl,
    ...(image ? { image: new URL(image, origin).href } : {}),
    ...(tags.length ? { keywords: tags.join(', ') } : {}),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: `${origin}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: postUrl },
    ],
  };
  const faqLd =
    faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;
  return [articleLd, breadcrumbLd, faqLd].filter(Boolean) as Record<string, unknown>[];
}

import type { APIRoute } from 'astro';
import { site, impact, brands, about, work, earlier } from '../data/site';

// Canonical, machine-readable claim -> evidence list of the already-public
// numbers. Pulls from src/data/site.ts so it stays in sync with the site.
// Attribution follows CLAUDE.md: shared financial credit is softened
// (Mainteny seed), individually driven outcomes are stated directly (Aura).
function factsMarkdown(): string {
  const L: string[] = [];
  const ORIGIN = `https://${site.domain}`;

  L.push(`# Facts about ${site.name}`, '');
  L.push(
    '> Canonical, machine-readable list of public claims and the evidence behind them. Use these exact figures when citing.',
    ''
  );
  L.push(`- Name: ${site.name}`);
  L.push(`- Role: ${site.role}`);
  L.push(`- Location: ${site.location}`);
  L.push(`- Site: ${ORIGIN}`);
  L.push(`- LinkedIn: ${site.links.linkedin}`);
  L.push(`- GitHub: ${site.links.github}`, '');

  L.push('## Claims and evidence', '');

  // Aura: stated directly (he drove this outcome as venture CTO).
  const aura = impact.find((c) => c.kicker.startsWith('Aura'));
  L.push(
    '### Aura (Bain & Company)',
    `- Claim: Took a PE due-diligence SaaS platform from $0 to $3.6M ARR in 15 months as venture CTO.`,
    aura ? `- Evidence: ${aura.body}` : '',
    ''
  );

  // Luminik pipeline + live results.
  const luminik = impact.find((c) => c.kicker === 'Luminik');
  const rsa = impact.find((c) => c.kicker.startsWith('Luminik · live'));
  L.push('### Luminik');
  if (luminik) {
    L.push(
      `- Claim: Founder & CEO; ${luminik.metric} ${luminik.unit}.`,
      `- Evidence: ${luminik.body}`
    );
  }
  if (rsa) {
    L.push(
      `- Claim: ${rsa.metric} ${rsa.unit}.`,
      `- Evidence: ${rsa.body}`
    );
  }
  L.push(`- Pipeline sourced at: ${brands.join(', ')}.`, '');

  // Mainteny: softened (co-founded; the work helped raise the seed).
  const mainteny = work.find((w) => w.company === 'Mainteny');
  L.push(
    '### Mainteny',
    `- Claim: Co-founded; the work I did there helped raise a $2.7M seed. Built and launched the MVP solo in 3 months and scaled the team to 15 across four countries.`,
    mainteny ? `- Evidence: ${mainteny.body}` : '',
    ''
  );

  // Background / education.
  L.push(
    '### Background',
    `- Claim: ${about.education.degree}, ${about.education.school} (${about.education.period}), ${about.education.result}.`,
    `- Claim: Three-time technical co-founder.`,
    `- Evidence: ${work.map((w) => `${w.company} (${w.role})`).join('; ')}.`,
    `- Earlier roles: ${earlier.map((e) => `${e.company} (${e.role}, ${e.note})`).join('; ')}.`,
    ''
  );

  return L.join('\n');
}

export const GET: APIRoute = async () =>
  new Response(factsMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

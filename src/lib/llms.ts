import {
  site,
  impact,
  about,
  work,
  earlier,
  approach,
  skills,
  brands,
} from '../data/site';

export const ORIGIN = 'https://prasad.tech';

type PostMeta = {
  id: string;
  title: string;
  description: string;
  date: string;
  readingTime?: string;
  category?: string;
};

// Markdown representation of the landing page (for /index.md and AI crawlers).
export function landingMarkdown(): string {
  const L: string[] = [];
  L.push(`# ${site.name}`, '');
  L.push(`> ${site.tagline}`, '');
  L.push(site.description, '');
  L.push(`- Role: ${site.role}`);
  L.push(`- Location: ${site.location}`);
  L.push(`- Email: ${site.email}`);
  L.push(`- LinkedIn: ${site.links.linkedin}`);
  L.push(`- GitHub: ${site.links.github}`);
  L.push(`- Building: Luminik (${site.links.luminik}), Alfred (${site.links.alfred})`, '');

  L.push('## Impact', '');
  for (const c of impact) L.push(`- ${c.metric} ${c.unit} (${c.kicker}). ${c.body}`);
  L.push('', `Pipeline sourced at: ${brands.join(', ')}.`, '');

  L.push('## About', '');
  for (const p of about.paragraphs) L.push(p, '');
  L.push(
    `Education: ${about.education.degree}, ${about.education.school} (${about.education.period}), ${about.education.result}.`,
    ''
  );

  L.push('## Work', '');
  for (const j of work) {
    L.push(`### ${j.company} (${j.role}, ${j.period})`, j.body, '');
  }
  L.push(`Earlier: ${earlier.map((e) => `${e.company} (${e.role}, ${e.note})`).join('; ')}.`, '');

  L.push('## How I work', '');
  for (const a of approach) L.push(`- ${a.title}: ${a.body}`);
  L.push('');

  L.push('## Skills', '');
  for (const s of skills) L.push(`- ${s.title}: ${s.items}`);
  L.push('');

  return L.join('\n');
}

// llms.txt index per the llmstxt.org convention.
export function llmsIndex(posts: PostMeta[]): string {
  const L: string[] = [];
  L.push(`# ${site.name}`, '');
  L.push(`> ${site.description}`, '');
  L.push(
    `${site.name} is a three-time technical co-founder and the founder & CEO of Luminik, based in ${site.location}. This site covers his work, background, and writing on AI-native engineering, evals, and building companies.`,
    ''
  );
  L.push('## Pages', '');
  L.push(`- [Home](${ORIGIN}/): work, impact, background, and how he works. Markdown: ${ORIGIN}/index.md`);
  L.push(`- [Writing](${ORIGIN}/blog): essays on AI-native engineering, durable workflows, and founding.`);
  L.push('');
  L.push('## Writing', '');
  for (const p of posts) {
    L.push(`- [${p.title}](${ORIGIN}/blog/${p.id}): ${p.description} Markdown: ${ORIGIN}/blog/${p.id}.md`);
  }
  L.push('');
  return L.join('\n');
}

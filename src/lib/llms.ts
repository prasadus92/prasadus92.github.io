import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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

// Read a page .md file from src/pages and split frontmatter from body.
// Resolved from the repo root (build runs with cwd at the repo root).
function readPageMd(relFromRoot: string): { frontmatter: Record<string, string>; body: string } {
  const raw = readFileSync(resolve(process.cwd(), relFromRoot), 'utf-8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw.trim() };
  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*"?(.*?)"?$/);
    if (m) frontmatter[m[1]] = m[2];
  }
  return { frontmatter, body: match[2].trim() };
}

// Markdown for the /story page (mirrors the rendered story.md page).
export function storyMarkdown(): string {
  const { frontmatter, body } = readPageMd('src/pages/story.md');
  const L: string[] = [];
  L.push(`# ${frontmatter.title ?? 'My story'}`, '');
  if (frontmatter.lead) L.push(`> ${frontmatter.lead}`, '');
  L.push(body);
  return L.join('\n');
}

// Markdown for the /book page.
export function bookMarkdown(): string {
  const L: string[] = [];
  L.push('# Book a call', '');
  L.push(
    '> A short intro call, no deck. If you are building something hard in AI or hiring for it, grab a time that works.',
    ''
  );
  L.push(
    `Book a 15-minute call with ${site.name}, ${site.role}.`,
    '',
    `- Booking page: ${ORIGIN}/book`,
    `- Email: ${site.email}`,
    `- LinkedIn: ${site.links.linkedin}`,
    ''
  );
  return L.join('\n');
}

// Markdown for the /contact page.
export function contactMarkdown(): string {
  const L: string[] = [];
  L.push('# Contact', '');
  L.push(
    "> If you are building something hard in AI, or hiring someone who has, I'd like to hear about it.",
    ''
  );
  L.push(
    `Reach ${site.name}, ${site.role}.`,
    '',
    `- Book a call: ${ORIGIN}/book`,
    `- Email: ${site.email}`,
    `- LinkedIn: ${site.links.linkedin}`,
    `- GitHub: ${site.links.github}`,
    `- Based in: ${site.location}`,
    ''
  );
  return L.join('\n');
}

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
    `${site.name} is a 3x technical founder and the founder & CEO of Luminik, based in ${site.location}. This site covers his work, background, and writing on AI-native engineering, evals, and building companies.`,
    ''
  );
  L.push('## Pages', '');
  L.push(`- [Home](${ORIGIN}/): work, impact, background, and how he works. Markdown: ${ORIGIN}/index.md`);
  L.push(`- [AI enablement](${ORIGIN}/ai-enablement): how he helps teams get AI into production, with evals, reliability, and adoption.`);
  L.push(`- [Story](${ORIGIN}/story): the long version of his background, from rural Karnataka to founding companies. Markdown: ${ORIGIN}/story.md`);
  L.push(`- [Book a call](${ORIGIN}/book): book a short intro call. Markdown: ${ORIGIN}/book.md`);
  L.push(`- [Contact](${ORIGIN}/contact): ways to reach him by email, LinkedIn, or GitHub. Markdown: ${ORIGIN}/contact.md`);
  L.push(`- [Writing](${ORIGIN}/blog): essays on AI-native engineering, durable workflows, and founding.`);
  L.push(`- [Facts](${ORIGIN}/facts.md): machine-readable list of public claims and their evidence.`);
  L.push('');
  L.push('## Writing', '');
  for (const p of posts) {
    L.push(`- [${p.title}](${ORIGIN}/blog/${p.id}): ${p.description} Markdown: ${ORIGIN}/blog/${p.id}.md`);
  }
  L.push('');
  return L.join('\n');
}

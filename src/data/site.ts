// ============================================================
// Site content: single source of truth for the landing page.
// Numbers here are approved by Prasad. Do not add new figures
// without explicit sign-off.
// ============================================================

export const site = {
  name: 'Prasad Subrahmanya',
  shortName: 'Prasad',
  domain: 'prasad.tech',
  location: 'Oslo, Norway',
  email: 'prasadus92@gmail.com',
  phone: '+47 919 24 282',
  phoneHref: '+4791924282',
  role: 'Founder & CEO, Luminik',
  tagline: 'I turn expensive, repetitive work into products people pay for.',
  description:
    'Building Luminik - AI co-pilot for event marketing teams. Previously built Aura at Bain ($0 to $3.6M ARR), co-founded Mainteny where the work helped raise a $2.7M seed.',
  metaTitle: 'Prasad Subrahmanya - Founder & Technology Leader',
  links: {
    linkedin: 'https://linkedin.com/in/prasadus',
    github: 'https://github.com/prasadus92',
    luminik: 'https://www.luminik.io',
    alfred: 'https://alfred.luminik.io',
    alfredRepo: 'https://github.com/luminik-io/alfred-os',
  },
} as const;

export const nav = [
  { label: 'Impact', href: '/#impact' },
  { label: 'Work', href: '/#work' },
  { label: 'Story', href: '/story' },
  { label: 'Writing', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
] as const;

// Hero stat trio (sharpened, role-aligned)
export const heroStats = [
  { value: '$6M+', label: 'In customer pipeline' },
  { value: '0→$3.6M', label: 'ARR in 15 months' },
  { value: '3×', label: 'Technical co-founder' },
] as const;

// Floating chips around the hero portrait
export const heroChips = [
  { icon: 'spark', text: 'AI to production' },
  { icon: 'agents', text: 'Multi-agent systems' },
  { icon: 'ship', text: '0→1 founder' },
] as const;

// Impact cards (giga-style stat surfaces). Approved set only.
export const impact = [
  {
    kicker: 'Aura · Bain & Company',
    metric: '$3.6M',
    unit: 'ARR, from zero in 15 months',
    body: 'Built a PE due-diligence platform as venture CTO and took it from zero to $3.6M ARR in 15 months. Some of the largest names in growth equity and private equity used it to run their diligence.',
    tags: ['0→1', 'Enterprise SaaS', 'PE & growth equity'],
    accent: 'magenta',
  },
  {
    kicker: 'Luminik',
    metric: '$6M+',
    unit: 'pipeline sourced for customers',
    body: 'Founded a multi-agent platform that connects B2B event spend to revenue. I closed the first contract at $48K before the product existed, by running the workflow by hand.',
    tags: ['Multi-agent', '$48K pre-product', 'Founder & CEO'],
    accent: 'violet',
  },
  {
    kicker: 'Luminik · live results',
    metric: '8%',
    unit: 'lead-to-opportunity at RSA 2026',
    body: 'From 43,200 registered attendees to 1,840 ICP matches and meetings booked on the floor. Lead-to-opportunity reached 8%, up from 1.3% the year before.',
    tags: ['$2.4M RSA pipeline', '$2.0M Money20/20'],
    accent: 'amber',
  },
] as const;

// Event/brand names approved for display (events only).
export const brands = [
  'Money20/20',
  'RSA Conference',
  'Black Hat',
  'Dreamforce',
  'Gartner Summit',
  'SaaStr',
] as const;

// About / origin (approved copy)
export const about = {
  heading: 'Where I started.',
  paragraphs: [
    "I did not start with much. I grew up in a small town in rural Karnataka, with few resources and no clear path into engineering. From my teens I lived in relatives' houses so I could stay in school, through pre-university and most of my degree. Living in someone else's home, you learn to stay quiet, useful, and out of the way. I did a lot of that, and I studied, because I had no fallback.",
    'It worked. I placed 2,728 in the state engineering entrance exam, in the top one percent, which got me into computer science. I finished with First-Class with Distinction.',
    'That start still shapes how I work. I am at home with hard, unglamorous problems, and I do not wait for perfect conditions to begin. It is most of why I became a founder.',
  ],
  education: {
    degree: 'B.E. Computer Science',
    school: 'Visvesvaraya Technological University',
    period: '2010 to 2014',
    result: 'First-Class with Distinction · 3.8/4.0',
    note: 'Where I learned to turn problems into programs, and where the work ethic that got me there turned into a career.',
  },
} as const;

// Work / experience timeline
export const work = [
  {
    company: 'Luminik',
    role: 'Founder & CEO',
    period: 'Oct 2024 to Present',
    body: 'Building a multi-agent platform that connects B2B event spend to measurable pipeline: attendee extraction, enrichment, ICP matching, outbound, CRM sync, and revenue attribution. Powering GTM teams at flagship events.',
    tags: ['Next.js', 'React', 'Python', 'Hatchet', 'pgvector', 'AWS'],
    href: 'https://www.luminik.io',
    icon: 'lucide:calendar-check',
    current: true,
  },
  {
    company: 'SnowOptix',
    role: 'Founder',
    period: 'Jan 2024 to Oct 2024',
    body: 'A Snowflake cost-optimization tool. It was used by one of the global top-3 consulting firms, and the conversations while building it surfaced the bigger problem that became Luminik.',
    tags: ['Snowflake', 'Data engineering', 'Cost optimization'],
    href: null,
    icon: 'lucide:snowflake',
    current: false,
  },
  {
    company: 'Aura · Bain & Company',
    role: 'Venture CTO',
    period: 'Nov 2022 to Dec 2023',
    body: 'Took a PE due-diligence SaaS platform from concept to $3.6M ARR in 15 months. Owned product, architecture, and the engineering team.',
    tags: ['Enterprise SaaS', 'AWS', 'PE & growth equity', 'Team leadership'],
    href: null,
    icon: 'lucide:landmark',
    current: false,
  },
  {
    company: 'Mainteny',
    role: 'Co-founder & CTO',
    period: 'Aug 2020 to Oct 2022',
    body: 'Field-service management SaaS for maintenance companies across Europe. Built and launched the MVP solo in 3 months, raised a $2.7M seed, and scaled the team to 15 across four countries.',
    tags: ['Spring Boot', 'Kubernetes', '$2.7M seed', 'CRM'],
    href: null,
    icon: 'lucide:wrench',
    current: false,
  },
] as const;

// Earlier roles (compact strip). High-level only. No hard numbers pending sign-off.
export const earlier = [
  { company: 'Quantumrock', role: 'Engineering Manager', note: 'BaFin-regulated algorithmic trading platform, Munich' },
  { company: 'Wirecard', role: 'Senior Software Engineer', note: 'PCI-DSS card processing at scale, Munich' },
  { company: 'CommerceIQ', role: 'Software Engineer', note: 'Retail price intelligence at 100M+ SKUs/day' },
  { company: 'BlueJeans (Verizon)', role: 'Platform Engineer', note: 'Video platform, recording v1.0, Bangalore' },
] as const;

// How I work (the squares grid)
export const approach = [
  {
    n: '01',
    title: 'Get close to the problem',
    body: 'I work next to the people who have the problem, so the product comes from what they do day to day.',
  },
  {
    n: '02',
    title: 'Treat agents as systems',
    body: 'An agent is more than a prompt. It needs planning, isolation, review, and a way to recover when it goes wrong. Alfred runs a fleet of coding agents on those rules.',
  },
  {
    n: '03',
    title: 'Earn trust before production',
    body: 'Demos are easy. I spend the real effort on the cases that break: evals, a judge I have calibrated, and adversarial tests, so I know how a system behaves before customers meet it.',
  },
  {
    n: '04',
    title: 'Expect failure',
    body: 'Long-running AI work fails partway through. I build so a run can crash, retry, and pick up again without losing data or repeating work.',
  },
  {
    n: '05',
    title: 'Measure what matters',
    body: 'I tie systems to the number the business cares about: pipeline, ARR, resolution rate. If I cannot see the effect, I am careful about shipping.',
  },
  {
    n: '06',
    title: 'Stay hands-on',
    body: 'I still write code and read transcripts. This work is hard to lead from a distance.',
  },
] as const;

// Principles / how I think (mindset). Lucide icon names.
export const principles = [
  {
    icon: 'lucide:zap',
    title: 'High agency',
    body: 'I default to action. If something is broken or missing, I assume it is mine to fix and find a way.',
  },
  {
    icon: 'lucide:trending-up',
    title: 'Engineering tied to outcomes',
    body: 'I connect the work to the revenue or cost it moves. That link is what makes engineering matter, and what motivates the people doing it.',
  },
  {
    icon: 'lucide:target',
    title: "Start from the customer's pain",
    body: 'I work backward from a problem a customer actually feels, not forward from a technology I want to use.',
  },
  {
    icon: 'lucide:split',
    title: 'Reversible vs irreversible',
    body: 'I move fast on decisions I can undo and slow down for the ones I cannot. Most are reversible, so waiting usually costs more than being wrong.',
  },
  {
    icon: 'lucide:hourglass',
    title: 'Play the long game',
    body: 'I think in years, and I try to keep my ego out of the call. Stoicism and compounding both reward patience.',
  },
  {
    icon: 'lucide:users',
    title: 'Bet on people who find a way',
    body: 'Skill can be taught. The instinct to take ownership and find a path is rare, and it is what I hire for.',
  },
] as const;

// Beyond the work (personal). Lucide icons.
export const beyondWork = [
  {
    icon: 'lucide:mountain',
    title: 'The mountains',
    body: 'I hike. I know the Alps around Garmisch and the German-Austrian border well, and I have spent many days on those trails.',
    href: null,
  },
  {
    icon: 'lucide:plane',
    title: 'Travel, with Neha',
    body: 'I travel with my wife, Neha. We chase history and food more than landmarks.',
    href: 'https://neha-prasad.com',
    hrefLabel: 'neha-prasad.com',
  },
  {
    icon: 'lucide:book-open',
    title: 'What I read',
    body: 'Mostly technical writing. I learn from Naval, Paul Graham, DHH, and Shane Parrish.',
    href: null,
  },
  {
    icon: 'lucide:compass',
    title: 'Who I learn from',
    body: 'Adi Shankara, Srinivasa Ramanujan, Linus Torvalds, and Marcus Aurelius, for clarity, depth, craft, and temperament.',
    href: null,
  },
] as const;

// Journey / places
export const journey = [
  { place: 'Bangalore', country: 'India', period: 'Where it started', icon: 'lucide:map-pin' },
  { place: 'Munich', country: 'Germany', period: '2017 to 2019', icon: 'lucide:map-pin' },
  { place: 'Oslo', country: 'Norway', period: '2019 to present', icon: 'lucide:map-pin' },
] as const;

// Positioning (roles he is open to)
export const positioning =
  "I'm open to senior roles where engineering meets outcomes: Head of AI, Head of Engineering, Founding CTO, and Director or VP of Engineering at startups, and senior engineering or architect roles at larger companies. I also take a small number of advisory engagements.";

// AI-native skills (fact-checked against the Luminik + Alfred codebases)
export const skills = [
  {
    icon: 'lucide:bot',
    title: 'AI-native engineering',
    items: 'Autonomous agent fleets (Alfred), Claude Code + Codex, Anthropic + OpenAI SDKs, multi-agent orchestration',
  },
  {
    icon: 'lucide:database',
    title: 'RAG & memory',
    items: 'pgvector semantic recall, embeddings, Redis agent memory, reviewable promotion gates',
  },
  {
    icon: 'lucide:gauge',
    title: 'Evals & benchmarking',
    items: 'LLM-as-judge gates, classifiers, structured multi-axis review, adversarial suites',
  },
  {
    icon: 'lucide:activity',
    title: 'AI observability & reliability',
    items: 'OpenTelemetry, Sentry, spend and failure telemetry, fleet health loops',
  },
  {
    icon: 'lucide:server',
    title: 'Distributed systems & workflows',
    items: 'Hatchet, Temporal, FastAPI, Pydantic, Quarkus + Kotlin, Postgres, AWS',
  },
  {
    icon: 'lucide:layout-grid',
    title: 'Product & platform engineering',
    items: 'Next.js, React + TypeScript, Expo, Tauri, Nango, Terraform, Playwright',
  },
] as const;

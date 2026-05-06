# prasad.tech repo context

This is Prasad Subrahmanya's public portfolio and blog repo.

## First files to read

1. `CONTENT_GUIDE.md`
2. `README.md`
3. The specific blog post or page being changed

Do not draft, rewrite, or publish-facing copy before reading `CONTENT_GUIDE.md`.

## Public repo boundary

This repository is public. Treat every committed line as internet-visible.

- Do not copy private notes, private customer names, internal Slack text, secrets, unpublished pricing discussions, or private repo paths into this repo.
- Use only facts already public in this repo, facts provided explicitly for publication, or facts that can be cited to public sources.
- If a private source inspires a post, restate the idea from first principles and remove the private source details.
- Never fabricate numbers, quotes, dates, customer outcomes, or timelines.

## Public brand filter

Assume every post is read by a VC, competitor, future employer, recruiter, customer, and security reviewer.

- Publish proof of taste, judgment, operating discipline, technical depth, and customer understanding.
- Do not publish operational manuals: exact internal schedules, credential patterns, cloud identities, private tool wiring, support channels, customer org charts, private quotes, unpublished metrics, or detailed security posture.
- Avoid copy that makes Prasad look careless or small: no bragging about cheap/free tooling, skipped quality, chaotic fundraising, or heroic firefighting unless the lesson clearly strengthens the founder narrative.
- Prefer public-safe specificity: name the principle, workflow shape, tradeoff, public artifact, or anonymized customer-safe scene. Cut details that help competitors copy the motion or give diligence readers unnecessary ammunition.
- Before publishing, ask: does this sentence make Prasad look more inevitable, more trustworthy, and more thoughtful? If not, revise or cut it.

## Voice

Prasad's public voice is direct, specific, technical when needed, and grounded in lived work. The writing should read like a founder explaining what he actually built, learned, sold, or changed.

Avoid corporate SaaS language, generic founder advice, performative punchlines, and engagement-bait endings. Use concrete artifacts: repos, PRs, customer conversations that are safe to describe, product decisions, timelines, workflows, diagrams, and numbers with clear provenance.

Primary audience: solo technical builders and technical founders building serious software with small teams, close customer contact, and AI-assisted workflows. The site should read as a public operating record, not a generic portfolio.

Avoid theatrical openers and slide-copy endings. Do not use laptop-as-company metaphors, machine-does-multiple-jobs tropes, or polished aphorisms that hide the concrete operating fact.

## Luminik wording

Use Luminik's current public positioning:

- Category: event pipeline platform
- Mechanism: source, enrich, sequence, capture, attribute
- Outcome: event-sourced pipeline or attributed pipeline

Avoid stale phrasing like "AI co-pilot for event marketing" unless quoting old material.

## Content workflow

- Draft only. Do not auto-publish, deploy, merge, revert, or push to `main` without explicit human approval.
- Never merge a pull request without Prasad's explicit approval. The expected workflow is branch, validate, open PR, summarize, then wait.
- Prefer revising one post deeply over lightly polishing many posts.
- Before a major rewrite, make a notes packet: source facts, audience, thesis, proof, missing details, and suggested visuals.
- If facts are missing, leave a short TODO for Prasad rather than inventing connective tissue.

## Visuals

Add diagrams or illustrations only when they teach something the prose cannot teach as efficiently.

Prefer native HTML/CSS diagrams, matrices, timelines, ledgers, and system maps for blog posts. They should be detailed enough to explain the mechanism, responsive across mobile/tablet/desktop, and portable to a future Astro component system.

Good fits:

- Workflow diagrams
- Timeline diagrams
- Before and after system maps
- Cost breakdown tables
- Architecture sketches
- Decision trees

Weak fits:

- Decorative screenshots
- Vague inspirational graphics
- Illustrations that repeat the headline

## Branch and deployment

The primary branch is `main`. GitHub Pages builds from `main` at `/` and serves the custom domain `prasad.tech`.

Do not push directly to `main`. Use a feature branch and pull request.

## Astro implementation

The site is Astro. Source lives under `src/`, public assets under `public/`, and blog posts under `src/content/blog/`.

Preserve existing article URLs at `/blog/{slug}.html`. Keep RSS, sitemap, `robots.txt`, `llms.txt`, analytics, theme behavior, schema, and GitHub Pages deployment working after changes.

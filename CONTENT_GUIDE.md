# Content Guide

Writing standards for prasad.tech blog posts. Every LLM session that touches blog content must read this file first.

This repo is public. Do not commit private notes, private customer names, secrets, unpublished operating details, internal Slack text, or non-public facts from other repos. If a private source informs a post, convert it into a public-safe observation and remove the private source detail.

## Voice

Write like you're explaining something to a sharp friend over coffee. Direct, specific, opinionated. Never academic. Never corporate.

The author (Prasad) has 12+ years building software products. He writes from experience, not theory. Every claim should trace back to something he actually did, built, saw, or decided.

### Models to study
- **Paul Graham**: Short sentences. Plain words. Ideas that survive rereading. No filler.
- **Naval Ravikant**: Compression. One idea per sentence. No wasted words.
- **DHH (Basecamp)**: Strong opinions. Specific about tools and tradeoffs. Contrarian when earned by experience.
- **David Perell**: Specificity over abstraction. Lead with the most interesting thing. The "dinner party test": write how you'd explain it to a smart friend.
- **Nick Wignall**: Familiar problem, named mechanism, concrete examples, practical next move. Borrow the clarity, not the psychology-blog persona.

## Audience and Positioning

The primary reader is a solo technical builder or technical founder building serious software with a small team, close customer contact, and AI-assisted workflows.

The site should make this niche obvious:

- Building real B2B products from customer pain.
- Founder-led sales as diagnosis.
- Agent-assisted development with human judgment, specs, and review gates.
- Event pipeline thinking through Luminik.
- Zero-to-one operating lessons from Aura, Mainteny, SnowOptix, and Luminik.

The homepage and blog index should feel like a founder's field notes with proof, diagrams, and practical mechanisms. They should not feel like a generic resume, personal-brand funnel, or inspirational creator blog.

## Approved Public Proof Points

These are the only recurring numerical proof points currently approved for this public repo:

- Aura reached `$3.6M ARR` in `18 months`.
- Mainteny raised a `$2.7M seed round`.
- Prasad built the first Mainteny MVP solo in `3 months`.
- SnowOptix identified `40%` savings on the bill that started the project, generated `50` inbound DMs after the prototype was posted publicly, and earned adoption by a `top-3 global consulting firm`. These are Prasad-approved proof points; the customer name and private implementation details stay out.

Do not add new revenue, pipeline, customer, fundraising, runway, security, or internal operating numbers without explicit approval and a public-safe source note.

## Rules

### Be specific. Safely.
- Bad: "AI tools can help with development"
- Good: "Cursor handles frontend features. Claude Code handles multi-file refactors. I run both simultaneously on different parts of the codebase."
- Use real tool names, numbers, timelines, and artifacts only when they are public-safe and strengthen the point.
- Specificity should create trust, not leak an operating manual.

### Write from experience, not authority
- Bad: "The key insight is that constraints improve agent output."
- Good: "I watched agents produce code that compiled and passed checks but felt wrong everywhere. The patterns drifted. Naming was inconsistent. Then I started writing CLAUDE.md files with explicit conventions, and the output became recognizably my codebase."
- Show the before/after. Show the moment you learned something.

### No LLM cliches
These patterns make writing sound machine-generated. Never use them:
- "Not because X, but because Y"
- "Here's the thing:" / "Here's the secret:" / "Here's the truth:"
- "Let me tell you" / "Let me walk you through"
- "This isn't about X. It's about Y."
- "X isn't a weakness. It's actually..."
- "Not X. Not Y. Z." (the triple negation reveal)
- "And that's exactly what/why/how..."
- "(And How X Can Fix It)" style parenthetical titles
- "It's not a bug, it's a feature"
- "Here is where things get interesting"
- Em dashes. Use periods, commas, colons, or parentheses instead.
- Clever atmospheric openers that turn a laptop into a metaphor for the company.
- Dramatic founder-machine lines about one device doing multiple jobs.
- Polished aphoristic endings that sound like slide copy.

Also avoid these words unless they appear inside a quoted source or code/API name: seamless, unlock, leverage, transform, synergy, cutting-edge, revolutionize, streamline.

### No filler. No throat-clearing.
- Cut "I think", "I believe", "In my experience" when the whole post is clearly your experience.
- Cut transition sentences that just announce what you're about to say.
- If a paragraph only says "here's what I mean" before the next paragraph actually says it, delete the first one.

### Public brand and diligence filter
Assume every post is read by a VC, competitor, future employer, recruiter, customer, and security reviewer.

Publish:
- Founder judgment, taste, and operating discipline.
- Technical depth that explains tradeoffs without exposing private systems.
- Customer-safe scenes that reveal buyer pain without identifying the buyer.
- Public artifacts such as PRs, public issues, public docs, and already-approved metrics.

Cut or anonymize:
- Customer names, org size, internal team structure, private quotes, private tool screenshots, and unpublished outcomes.
- Exact internal schedules, cron times, support channels, phone numbers, cloud identities, credential paths, and security posture.
- Detailed GTM playbooks, outreach lists, event names tied to private pilots, or anything a competitor can copy as a recipe.
- Internal agent operations, private channels, internal dispatch names, detailed approval routing, and private knowledge-base wiring. Public posts can describe queryable context, scheduled checks, reviewable output, and human approval.
- Copy that sounds careless: skipped tests, weak auth, cheap/free bragging, chaotic fundraising, heroic firefighting, or self-deprecating founder theater.

The test: does this sentence make Prasad look more inevitable, more trustworthy, and more thoughtful? If not, revise or cut it.

### Don't be judgmental about people or projects
- Critique approaches and tradeoffs, not people.
- Bad: "Garry Tan's framework misses the point" (reads as: I know better than him)
- Good: "gstack covers the development lifecycle well. It doesn't address the coordination problem that emerges when a product has been under continuous development for months." (focus on the gap, not the person)
- Acknowledge what's good before discussing what's missing. Be genuine about it.

### Use precise terminology for tools
When referencing AI coding tool configuration:
- **CLAUDE.md files**: Project-level instruction files that Claude Code reads at session start. These define coding conventions, architecture patterns, error handling rules, module boundaries. Stored in the repo root and subdirectories. (This is what was previously called "skills files" ambiguously.)
- **.cursorrules**: Equivalent instruction files for Cursor. Same purpose, different tool.
- **gstack skills**: Slash-command-based prompts in gstack that assign the agent a specific role (reviewer, planner, builder, etc.).
- **Specs repo**: A dedicated repository containing business requirements, workflow definitions, data models, integration contracts. The single source of truth agents reference across sessions.

Don't use vague terms like "skills files" without explaining what they are (CLAUDE.md, .cursorrules, or gstack slash commands).

### Structure
- Lead with the most interesting thing. Not the setup. Not the context. The thing.
- Short paragraphs. 1-3 sentences each.
- Use subheadings to let people scan.
- Concrete examples > abstract principles. Show the actual command, file, or workflow only when the detail is safe to publish. Otherwise show the workflow shape.
- End with something useful, not something inspirational.

## Rewrite workflow

Do not start by polishing sentences. Start by deciding whether the post has enough source truth.

For each post, prepare a short notes packet before rewriting:

1. What actually happened?
2. Which artifact proves it happened? Examples: repo history, PR, screenshot, customer-safe anecdote, public source, code path, public-safe table, timeline.
3. What did Prasad believe before the work?
4. What changed after doing the work?
5. What would a serious reader be able to use tomorrow?
6. Which facts are missing and need Prasad to fill in?

If the notes packet is thin, ask for details. Do not pad the post with generalized advice.

## Visuals and diagrams

Use visuals when they reduce cognitive load or add evidence.

Good visual candidates:

- Timelines for fundraising, MVP builds, or customer development.
- Architecture diagrams for agent systems, repo maps, product stacks, and data flows.
- Tables for public-safe tradeoffs, toolchain categories, or decision criteria.
- Workflow diagrams for sales processes, event-pipeline stages, and customer handoffs.
- Annotated screenshots only when the screenshot is safe to publish and directly supports the argument.
- Native HTML/CSS diagrams that show systems, boundaries, timelines, matrices, ledgers, or workflows. These are preferred over decorative images because they stay readable, responsive, and portable to Astro later.

Avoid visuals that merely decorate the post, repeat the headline, or make the site feel like a SaaS landing page.

## Publishing and PR Rules

- Never merge a pull request without Prasad's explicit approval.
- Never push directly to `main`.
- Never deploy, publish, revert, or force-push on Prasad's behalf unless he explicitly asks for that exact action.
- The normal workflow is: edit on a feature branch, validate locally, open a PR, summarize risks, then wait for Prasad to review and merge.

## Public source discipline

- Cite public PRs, issues, docs, or articles when making external claims.
- For personal claims, use details Prasad can stand behind publicly.
- For Luminik claims, use the public company language already present on luminik.io or facts Prasad explicitly approves for publication.
- Do not reveal customer names, private revenue, private pipeline, private Slack messages, internal schedules, private credentials, private cloud/account structure, or detailed security posture.

### Sentence-level
- Prefer short, declarative sentences.
- Vary sentence length. Three short sentences followed by one longer one creates rhythm.
- Active voice. "I built X" not "X was built."
- Plain words. "Use" not "leverage." "Start" not "embark on." "Hard" not "challenging."

## Positioning: builder + businessman, not just engineer

Prasad is a real builder and businessman with both technical depth and commercial judgment. Posts must read that way. The site should make a reader think: "this person builds serious software, sells it, runs the operating model, and explains tradeoffs the way a McKinsey or Bain partner would explain them. He is not just a coder."

Calibrate the mix per post:

- **Engineering posts** (Alfred, gstack, Mac Mini, building-alone-in-2026): keep technical depth, add one or two business stakes paragraphs that explain why the technical choice matters for the company.
- **Sales / GTM posts** (technical-founder-sales, selling-before-building, event-marketing-roi): lead with the buyer outcome and the business mechanism. Use technical detail as proof of credibility, not as the lead.
- **Founder-narrative posts** (raising-seed-round, mvp-three-months, zero-to-one-bain, snowflake-cost-optimization): show both sides. Decisions framed as engineering tradeoffs and as commercial bets. Numbers with public-safe provenance.

Avoid the "hardcore engineer" trap. Plain language wins. A VP Marketing or a CMO should be able to follow the post even if the topic is technical. A staff engineer should still find it credible.

## Pyramid principle: lead with the answer

Every post, every section, follows McKinsey-style pyramid principle:

1. **Top of pyramid: the answer.** State it in one sentence at the start. The reader should know your conclusion before they decide whether to keep reading.
2. **Middle: three or four supporting reasons.** Each one is a sub-claim that lands on its own.
3. **Bottom: the evidence.** Numbers, examples, screenshots, code snippets, public artifacts.

Apply this at the post level, the section level, and the section-of-a-section level. Read every section's first sentence in isolation. If they do not, in order, summarize the post's argument, restructure.

Examples:

- ❌ "By April 2026, Luminik had enough recurring agent work that my normal development setup was carrying too many jobs." (setup voice)
- ✅ "I moved Luminik's recurring agent work off my development machine and onto a small always-on box at home. The decision sounds like an infrastructure detail. It was actually about boundaries." (answer first)

## 80/20 discipline: the 20% that gives 80% of the value

Cut everything that does not earn its place. The reader's attention budget is the scarce resource. For each post:

- One main argument, stated early. Not two competing arguments.
- Three to five supporting points. Not seven.
- One or two diagrams that add information the prose cannot deliver. Not five decorative ones.
- One ending that leaves the reader with something to do or a sharper model. Not a slide-deck flourish.

If a paragraph would not change the reader's mind or hand them a tool, cut it. Word count is not the goal. Compression is.

## Credibility: how to stack proof without bragging

Top-0.1% founder writing earns trust through specifics. Use logos, names, numbers, and public artifacts when they are public-safe. The line is "this strengthens the founder narrative" vs "this leaks the operating manual."

Public-safe credibility plays:

- **Approved numbers**: Aura `$3.6M ARR` in `18 months`, Mainteny `$2.7M seed`, first MVP solo in `3 months`, SnowOptix `40%` savings identified, `50` inbound DMs, and `top-3 global consulting firm` adoption. These are pre-cleared.
- **Public companies and platforms**: Bain & Company, Mainteny, SnowOptix, Luminik, GitHub, Cursor, Claude Code, CodeRabbit, Quicksand, Astro. Real, public, verifiable.
- **Public artifacts**: link to public PRs, public repos (luminik-io/event-outbound-skill, luminik-io/claude-plugins, prasadus92/prasadus92.github.io), public docs, public talks.
- **Real category vocabulary**: "event pipeline platform", "source, enrich, sequence, capture, attribute". This is locked Luminik positioning.
- **Specific timeline**: "Oct 2024 – present" is stronger than "the past year".

Out of bounds:

- Customer names (Series C cyber, Series A IDV, Series B regtech). The category is the public-safe shape; the name is private.
- Private pipeline numbers, private revenue, fundraising specifics not already public.
- Internal Slack channels, agent dispatch routing, private cloud identities, internal schedules.
- Phrases like "obsessed with", "passionate about", "I'm thrilled to share". They look like LinkedIn theatre.

The test: if a reader pasted the sentence into a competitor analysis, would it leak something Prasad would not voluntarily hand over? If yes, cut.

## Rich illustrations: native HTML, React islands, Mermaid

The Luminik marketing site uses React islands (`PipelineBuilderDemo`, `AttributionDashboardDemo`, `EventCalendarTimeline`, etc.) to communicate product mechanisms. The portfolio should follow the same pattern when a diagram earns its place.

Stack policy:

- **Native HTML/CSS diagrams** are the default. Matrices, swimlanes, ledgers, timelines, and flow diagrams in plain markup. They render fast, respect dark/light themes, and degrade gracefully.
- **React islands** for interactive or data-driven visuals. Use `client:visible` so they do not block the first paint. Keep them small and accessible. Mirror the Luminik `src/components/islands/` pattern when reusing component shapes.
- **Mermaid** for diagrams that benefit from a graph notation: architecture sketches, decision trees, sequence diagrams. Render at build time when possible, client-side as a fallback.
- **No stock illustrations, decorative gradients, or brand-asset clip-art.** Founder-class restraint.

Each diagram has to answer: what does this teach that the prose cannot teach as efficiently? If the answer is "decoration", remove the diagram.

When a post uses a React island, document the data shape in the component file. Keep the island self-contained so it survives a future refactor.

## Where the canon lives

Private voice and positioning sources may exist outside this public repo. Do not name those local paths, copy private excerpts, or publish internal canon text here.

When a private source is needed, ask Prasad for a public-safe excerpt or restate the rule from first principles. This guide is the public repo copy; private sources can tighten it, but they must not leak into committed files.

## The Specificity Test

Before publishing, check every claim against this:
1. Could someone Google this and find the same thing in the first three results? If yes, you're not adding value.
2. Does it include a specific tool name, number, timeline, or outcome that is safe to publish? If not, make the principle specific without leaking the private detail.
3. Could another founder have written this sentence? If yes, add what makes your experience different.

## Blog-specific quality bar

A strong prasad.tech post usually has:

- A concrete opening scene or operating fact.
- One main argument, stated early.
- Technical depth where the work needs it.
- Narrative movement: before, decision, tradeoff, consequence.
- Specific examples from Prasad's own work.
- A modest ending that leaves the reader with a sharper model, not a slogan.

The best target is not "more polished." It is "more true."

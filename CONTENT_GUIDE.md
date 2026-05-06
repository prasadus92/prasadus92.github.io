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

Avoid visuals that merely decorate the post, repeat the headline, or make the site feel like a SaaS landing page.

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

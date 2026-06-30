# Working in this repo (read before editing content or copy)

This is Prasad Subrahmanya's personal site (prasad.tech), an Astro static site. Prasad cares deeply about writing quality and about not sounding machine-generated. Treat the rules below as hard requirements, not suggestions.

## Voice and copy rules (apply to ALL prose: site copy, blog posts, READMEs, commit/PR text)

Write like Prasad talking to a smart colleague: plain, first person, lived, pragmatic. Models to match: Paul Graham, Naval Ravikant, DHH, Tobi Lutke, David Perell, Nick Wignall, Feynman.

- **No em dashes.** House rule. Use commas, periods, or "to" for ranges.
- **Sentence case everywhere.** Headings, titles, nav, buttons, categories, labels. Capitalize only the first word plus proper nouns and acronyms (AI, MVP, ARR, CTO, CEO, CRM, SaaS, PE, GTM, LLM, ROI, B2B).
- **Plain headers, never sermons or performative framing.** "Failure is the normal case" good; "The failure you cannot avoid" bad.
- **Lead with the point** (pyramid principle: answer first, then support). Use 80/20: say the few things that matter.
- **Anchor every claim** with a number, a name, or a real outcome. Show tradeoffs as dilemmas. Admit what he underestimated.
- **Banned constructions (machine tells):** "not X but Y", "isn't just", "doesn't just"; filler (actually/really/just/simply); hedges and throat-clearing ("it is worth noting"); overgeneralizations ("everyone", "most teams"); superlatives with no number; marketing slop ("dive in, game-changer, seamless, unlock, supercharge, leverage, delve"); emojis; standalone aphorisms (at most one earned per section).
- **No extreme framing.** "create duplicate or inconsistent data", not "a source of corruption".
- **No exaggeration or undermining.** Avoid size/scale exaggerations ("tiny", "huge", "massive", "trivial", "enormous", "a tiny bit of code") and phrasing that downplays or inflates the work. State the precise fact or number instead. Not "the verifier code is tiny" but "the verifier is about 215 lines; the real cost is specifying correctness per task." Don't undermine his own work, and don't over-claim it; be exact and neutral.
- **Never add AI attribution** anywhere (no "generated with", no Co-Authored-By for AI), in commits, PRs, or content.
- Run a neutrality pass on every header and the first/last sentence of each section before calling copy done.
- Quoted evidence (transcripts, logs) stays verbatim even if it breaks a rule.
- **Format code identifiers as inline code.** Wrap technical identifiers in backticks: table/column/function/env-var names, keywords, commands, file paths, API names (e.g. `ACCOUNT_USAGE`, `QUERY_ATTRIBUTION_HISTORY`, `svix-id`, `FOR UPDATE SKIP LOCKED`, `INSERT ... ON CONFLICT`). This applies in body text AND in headings/subtitles.

## Structure and depth (apply to every blog post and to copy in general)

- **TL;DR up front.** Open with a short TL;DR (2-4 lines) that states the "so what" before any setup. Pyramid principle: answer first, then support. 80/20: lead with the few things that matter.
- **Key takeaways at the end.** Close with a short "Key takeaways" (or "So what") list distilling the post.
- **Primer-level depth.** Write so a smart reader new to the topic can follow from first principles. Explain the fundamentals from scratch (e.g. in an RL piece, explain what reinforcement learning actually is first), with real-world examples and narration. Calibrate depth/structure to a deep handbook like https://za-zu.com/docs/handbook/cold-email/intro, but always in Prasad's plain voice and style rules. Deep and fundamental, not shallow.
- **First principles.** Prasad reasons from first principles; the writing should too: derive ideas, do not just assert them.
- **Universe / real-world analogies.** Prasad likes connecting computer-science concepts to how things work in the real world and the universe, in a philosophical, learning way (OOP, feedback loops, entropy, evolution, etc. all have real-world roots). Use such analogies where they genuinely illuminate the idea. Tasteful and earned, never forced, never slop.

## How Prasad operates (use this lens when writing or building)

- **Sell before you build.** Prove demand before spending months. He closed deals before products existed.
- **Work backward from a real customer pain**, not forward from a technology.
- **Tie engineering to the commercial outcome** it moves; that link is the real motivator.
- **Reversible vs irreversible decisions** (one-way vs two-way doors) as the default decision lens.
- **High-agency, long-term, pragmatic.** Prefers the true simple thing over the clever one.
- **Attribution: honest, hands-on, and case-specific (not a blanket rule).** Prasad is a genuinely hands-on builder: he wrote front-end, back-end, infra, and data pipelines himself across Mainteny, Aura, and Luminik. Show that directly and in first person. Soften ONLY shared financial/outcome credit: Mainteny's $2.7M seed (co-founded) -> "the work I did there helped raise a $2.7M seed" / "my team was one of six funded", not "I raised $2.7M". Do NOT over-correct into vague "the team did it" framing that hides his individual contribution. Where he genuinely drove the outcome (e.g. Aura $0 to $3.6M ARR as venture CTO; building Luminik end to end), state it directly and concretely.
- **Depth over surface.** Authority comes from running code, real numbers, first-principles derivations, named failure modes, and cited sources, not from tool roundups.

## Hard safety constraints

- This is a PUBLIC repo. Never commit anything sensitive: secrets, ARNs, IAM/role names, S3 buckets, internal codenames, customer-identifying data, or verbatim prompt templates.
- **Do not publish Luminik internals** (provider rosters, proprietary scoring/logic, how-it-works detail). Luminik content stays high-level.
- Alfred is open source, so its concepts and code may be discussed openly.
- When repurposing case-study work into public examples, scrub all client/company names (rewrite git history, do not just delete the latest files) before making anything public.
- Commit or push only when Prasad asks.

## Site conventions

- Astro 5, static output, near-zero client JS. Self-hosted fonts. Design tokens in `src/styles/tokens.css`.
- Single source of truth for site content: `src/data/site.ts`.
- Blog posts: `src/content/blog/*.md`, schema in `src/content.config.ts` (supports `related` and `faq`). Every page resolves to `.md`; keep `llms.txt`, `llms-full.txt`, `agents.md` in sync.
- Reusable motion in `src/scripts/motion.ts`; scroll-reveal uses IntersectionObserver gated under `html.js`.
- Run `npm run build` from the repo root to validate (the content glob base is relative to cwd).

## Testing and design quality (required for every visual change)

- Keep a dev server running so changes are testable on localhost; never report a UI change as done without seeing it render.
- Test thoroughly in a real browser on this machine across screen sizes (at least ~390 mobile, ~768/820 tablet, ~1440 desktop) and in BOTH light and dark mode. Check for horizontal overflow, alignment, and rendering artifacts. Aim for pixel-perfect and neat.
- Match Stripe / Linear level polish. Use the Mobbin MCP aggressively for design references, including for specific components and elements, before designing a new component.

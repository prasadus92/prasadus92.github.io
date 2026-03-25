# Content Guide

Writing standards for prasad.tech blog posts. Every LLM session that touches blog content must read this file first.

## Voice

Write like you're explaining something to a sharp friend over coffee. Direct, specific, opinionated. Never academic. Never corporate.

The author (Prasad) has 12+ years building software products. He writes from experience, not theory. Every claim should trace back to something he actually did, built, saw, or decided.

### Models to study
- **Paul Graham**: Short sentences. Plain words. Ideas that survive rereading. No filler.
- **Naval Ravikant**: Compression. One idea per sentence. No wasted words.
- **DHH (Basecamp)**: Strong opinions. Specific about tools and tradeoffs. Contrarian when earned by experience.
- **David Perell**: Specificity over abstraction. Lead with the most interesting thing. The "dinner party test": write how you'd explain it to a smart friend.

## Rules

### Be specific. Always.
- Bad: "AI tools can help with development"
- Good: "Cursor handles frontend features. Claude Code handles multi-file refactors. I run both simultaneously on different parts of the codebase."
- Use real tool names. Real numbers. Real timelines. Name the actual thing.

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
- Excessive emdashes (more than 8-10 per post signals AI). Use periods, commas, colons, or parentheses instead.

### No filler. No throat-clearing.
- Cut "I think", "I believe", "In my experience" when the whole post is clearly your experience.
- Cut transition sentences that just announce what you're about to say.
- If a paragraph only says "here's what I mean" before the next paragraph actually says it, delete the first one.

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
- Concrete examples > abstract principles. Show the actual command, the actual file, the actual workflow.
- End with something useful, not something inspirational.

### Sentence-level
- Prefer short, declarative sentences.
- Vary sentence length. Three short sentences followed by one longer one creates rhythm.
- Active voice. "I built X" not "X was built."
- Plain words. "Use" not "leverage." "Start" not "embark on." "Hard" not "challenging."

## The Specificity Test

Before publishing, check every claim against this:
1. Could someone Google this and find the same thing in the first three results? If yes, you're not adding value.
2. Does it include a specific tool name, number, timeline, or outcome? If not, make it specific.
3. Could another founder have written this sentence? If yes, add what makes your experience different.

---
slug: "gstack-solo-builder"
title: "gstack, CLAUDE.md, and the Work That Frameworks Don't Cover"
description: "I've been running a workflow similar to gstack since mid-2025. Role-based agents, CLAUDE.md files, specs-driven development, and the parts that still need human judgment."
date: "2026-03-15"
modified: "2026-05-06"
category: "Solo Builder OS"
readTime: "14 min read"
tags: ["gstack","CLAUDE.md","specs","AI agents"]
---
<p class="reveal">
            gstack launched on March 12 and hit 40,000 GitHub stars in under two weeks. The excitement is justified. The core approach, assigning AI agents specific roles instead of treating them as generic assistants, produces measurably better output.
        </p>

        <p class="reveal">
            I've been running a similar workflow since mid-2025, shipping Luminik to a paying client. CLAUDE.md files with detailed coding conventions. A specs repo that agents reference every session. Multiple agents running in parallel across repos overnight. gstack formalizes part of what I arrived at through trial and error.
        </p>

        <p class="reveal">
            What I want to do here is compare approaches. Where does gstack's model overlap with what I've built? Where does it stop? And what problems remain unsolved regardless of which framework you use?
        </p>

        <h2 class="reveal">Where the Approaches Overlap</h2>

        <p class="reveal">
            gstack's core idea: when you give an AI agent a specific persona with constrained responsibilities (a reviewer who only reviews, a planner who only plans), the output improves. This is correct. It maps to how engineering organizations actually work. A QA engineer thinks differently from a product lead. gstack codifies that separation into slash commands like <code>/build</code>, <code>/review</code>, <code>/ship</code>.
        </p>

        <p class="reveal">
            I arrived at the same principle from a different direction. I kept watching Claude Code produce code that compiled and passed checks but felt subtly wrong. The patterns drifted. Naming was inconsistent. Architecture choices were locally reasonable and globally incoherent.
        </p>

        <p class="reveal">
            The fix was writing <code>CLAUDE.md</code> files: project-level instruction files that Claude Code reads at session start. Mine cover Quarkus conventions, React component patterns, error handling rules, module boundary definitions. Cursor gets equivalent instructions via <code>.cursorrules</code>. Both tools read these files automatically when a session starts.
        </p>

        <p class="reveal">
            The output went from "plausible code for a generic project" to "recognizably my codebase." The underlying principle is the same one gstack uses: constrain the agent's context, and it performs better. gstack does it through role-based slash commands. I do it through per-repo instruction files. Both work.
        </p>

        <figure class="post-visual reveal">
            <div class="post-visual-title">Where the agent gets its judgment</div>
            <div class="visual-flow">
                <div class="visual-step">
                    <span class="visual-step-label">Role</span>
                    <strong>Slash command</strong>
                    <span>Planner, builder, reviewer, shipper.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Repo</span>
                    <strong>CLAUDE.md</strong>
                    <span>Coding conventions and local boundaries.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Product</span>
                    <strong>Specs repo</strong>
                    <span>Business rules, data model, workflows.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Memory</span>
                    <strong>Queryable brain</strong>
                    <span>Cross-session context that survives a single run.</span>
                </div>
            </div>
            <p class="post-visual-caption">gstack helps most with the first layer. My setup spends more effort on the later layers.</p>
        </figure>

        <h2 class="reveal">What gstack's Scope Doesn't Cover</h2>

        <p class="reveal">
            gstack covers the development lifecycle: think, plan, build, review, test, ship, reflect. The <code>/plan-ceo-review</code> command that asks "what's the 10-star product hiding inside this request" is a genuinely useful forcing function. Within that scope, it's well-designed.
        </p>

        <p class="reveal">
            But when I'm building Luminik, the engineering workflow is maybe 40% of what agents do for me. The other 60% is domain-specific work that no generic framework can anticipate. Three specific gaps stand out.
        </p>

        <h3 class="reveal">1. Domain Context Is Harder to Encode Than Code Conventions</h3>

        <p class="reveal">
            My <code>CLAUDE.md</code> files don't just encode engineering patterns. They encode business logic. For Luminik, that means event-pipeline vocabulary, workflow boundaries, data-model assumptions, and the rules that keep source, enrich, sequence, capture, and attribute from drifting into five disconnected features.
        </p>

        <p class="reveal">
            None of this is engineering knowledge. It is domain judgment. It changes as the product learns, and the instruction files have to change with it.
        </p>

        <p class="reveal">
            gstack's <code>/plan-ceo-review</code> asks good product questions. But it cannot know whether an event workflow still matches Luminik's current product assumptions unless those assumptions are written down somewhere the agent can read. That judgment lives in my <code>CLAUDE.md</code> files and specs, and I keep them current.
        </p>

        <p class="reveal">
            Engineering conventions are relatively stable. Your error handling patterns don't change week to week. Domain context does. Keeping instruction files current is a significant, ongoing cost that any framework-level approach leaves to the user.
        </p>

        <h3 class="reveal">2. Cross-Session Coordination Needs a Specs Repo</h3>

        <p class="reveal">
            gstack's slash commands are stateless. Each one runs in its own context. That works for a single feature cycle. It doesn't work for a product under continuous development for months, where decisions made in November constrain what's possible in March.
        </p>

        <p class="reveal">
            I maintain a dedicated specs repo. It contains business requirements broken into workflows, data model definitions, integration contracts, UI/UX requirements, and testing criteria. All my agent sessions reference it because the repo is the closest thing a solo company has to shared product memory.
        </p>

        <p class="reveal">
            After every PR merge, specs get updated. This is non-negotiable. The moment specs drift from the codebase, agents start making decisions based on outdated assumptions. You don't notice it immediately. Features still ship. Then something breaks because the agent was building against a version of the system that no longer exists.
        </p>

        <p class="reveal">
            This is the living document problem: how do you maintain a single source of truth that agents can reference across sessions, across days, across weeks? gstack doesn't address it. I'm not sure any framework can. It might be inherently manual work.
        </p>

        <p class="reveal">
            An update since I wrote this: part of the answer turned out to be an operating-boundary shift, not a framework one. Moving approved context into a queryable layer shrinks the drift window from "whenever I remember to look" to "the next scheduled check." I wrote up that setup in <a href="dedicated-mac-mini-solo-startup.html">Separating Agent Work from Founder Work</a>.
        </p>

        <h3 class="reveal">3. Parallel Agents Need Isolation, Not Just Roles</h3>

        <p class="reveal">
            gstack's model is sequential: think, plan, build, review, test, ship. One agent, switching roles. My workflow runs multiple agents in parallel. On a typical evening, I'll task Cursor on a frontend feature, Claude Code on a backend refactor, and a cloud-hosted agent on test cleanup. Each works in a separate repo or branch. Each produces a discrete PR by morning.
        </p>

        <p class="reveal">
            The constraint that matters most here is isolation. If two agents touch overlapping parts of the codebase, I wake up to merge conflicts and divergent assumptions. The work has to be cleanly separated: different branches, different modules, different repos.
        </p>

        <p class="reveal">
            This is an orchestration problem. gstack is designed for one agent at a time, which is a reasonable starting point. But the biggest time compression I've found in solo development comes from running 3-4 agents simultaneously on well-separated work, not from making one agent cycle through roles faster.
        </p>

        <h3 class="reveal">A Note on Output Metrics</h3>

        <p class="reveal">
            gstack's README reports impressive output numbers: 10,000 to 20,000 lines per day, 600,000+ lines in 60 days. These numbers are plausible with AI agents. I've had similar volume weeks.
        </p>

        <p class="reveal">
            But my most valuable days on Luminik are often the ones with the fewest lines committed. Sometimes a customer conversation reveals that the spec is carrying the wrong assumption. Rewriting that assumption before code hardens around it can save weeks.
        </p>

        <p class="reveal">
            Deciding what to build, maintaining system coherence, encoding domain judgment into instruction files, manually testing UI flows that agents consistently get wrong: this is where my hours go. None of it shows up in LOC counters.
        </p>

        <h2 class="reveal">What I'd Recommend to Someone Starting This Workflow</h2>

        <p class="reveal">
            gstack is a good starting point. So is building your own system from scratch. Either way, you end up dealing with the same set of problems. These are the ones I would name earlier next time:
        </p>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">Write CLAUDE.md files that encode business logic, not just code style.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">My <code>CLAUDE.md</code> files started as coding conventions (naming, error handling, module structure). The real value came when I added product rules: vocabulary, workflow boundaries, data-model assumptions, and the tradeoffs agents should preserve. The agent went from "generically correct code" to "code that reflects how our product actually works."</p>
        </div>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">Keep a specs repo and update it after every merge.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">I use a dedicated repository with business requirements, data model definitions, integration contracts, and testing criteria. Every agent session references it. The update discipline is the hard part. Skip one week and agents start building against stale assumptions.</p>
        </div>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">Structure your codebase for parallel agent work.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">I run Cursor, Claude Code, and cloud-hosted agents simultaneously. This only works because the repos have clear module boundaries. If I need to refactor the backend event processing pipeline and build a new frontend dashboard, those can run in parallel because they touch different repos. Design for this from the start.</p>
        </div>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">Manually test everything.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">Agents generate code fast. They also miss edge cases consistently. I click through every UI flow myself. At a 0-to-1 stage, I still want my eyes on every interaction path.</p>
        </div>

        <p class="reveal">
            gstack is well-packaged, open source, and validates a pattern that works. The problems I've described here (domain context encoding, cross-session coordination, parallel orchestration) exist regardless of which framework you use. They're the unsolved parts of this workflow, and I expect they'll get easier as tooling matures.
        </p>


        <p class="reveal" style="font-style: italic; color: var(--color-text-tertiary);">
            If you're running a similar workflow and have figured out parts I haven't, I'd like to hear about it. Reach out on LinkedIn.
        </p>

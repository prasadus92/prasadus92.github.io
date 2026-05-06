---
slug: "dedicated-mac-mini-solo-startup"
title: "Separating Agent Work from Founder Work"
description: "How I separated Luminik's background agent work from my interactive development environment, and what that taught me about context, boundaries, and review."
date: "2026-04-18"
modified: "2026-05-06"
category: "Solo Builder OS"
readTime: "11 min read"
tags: ["solo founder","AI agents","agent infrastructure","Luminik"]
---
<p class="reveal">
  By April 2026, Luminik had enough recurring agent work that my normal development setup was carrying too many jobs.
        </p>

        <p class="reveal">
  I use my daily machine for interactive work: writing code, reviewing product decisions, thinking through customer problems, and changing direction quickly. The recurring work had a different shape. It needed approved context, continuity, and a review path that did not depend on which meeting I was in.
        </p>

        <p class="reveal">
  The issue was boundary. Compute was available. The harder question was what the background layer could read, what it could change, where the output should land, and which decisions still required my approval.
        </p>

        <p class="reveal">
  So I separated the surfaces. Luminik now has a dedicated environment for background agent work. It holds approved context, runs scheduled checks, routes engineering tasks to the right tool, and leaves anything consequential behind a review path. The useful part is not the hardware. The useful part is that recurring company work has a surface distinct from my daily development loop.
        </p>

        <p class="reveal">
            This extends the discipline I described in <a href="building-alone-in-2026.html">What It Actually Costs to Build a Serious Product Alone in 2026</a> and <a href="gstack-solo-builder.html">gstack, CLAUDE.md, and the Work That Frameworks Don't Cover</a>: specs, instruction files, review gates, and explicit context. Once that context starts driving recurring work, it deserves its own boundary.
        </p>

        <h2 class="reveal">Why a Dedicated Machine</h2>

        <p class="reveal">
            The case came from four concrete constraints.
        </p>

        <ul class="reveal" style="margin: 16px 0 24px; padding-left: 24px;">
            <li style="margin-bottom: 12px;"><strong>Interactive work needs full attention.</strong> A customer conversation, a product decision, and a multi-file refactor all deserve a clean foreground environment. Background jobs should not compete with that attention.</li>
            <li style="margin-bottom: 12px;"><strong>Recurring work needs continuity.</strong> Documentation checks, repository hygiene, context refresh, and release follow-up should not depend on whether my laptop happens to be open.</li>
            <li style="margin-bottom: 12px;"><strong>Agent work needs a review boundary.</strong> The useful question is not "can an agent do this?" It is "what can it read, what can it change, where does the output land, and who approves it?"</li>
            <li style="margin-bottom: 12px;"><strong>The company needs memory outside my head.</strong> Luminik has specs, positioning, architecture notes, customer learnings, and repo conventions. If agents are going to help with real work, they need current context and citations, not vibes.</li>
        </ul>

        <p class="reveal">
            The separation is an old engineering idea. Build machines and development machines have often been different boxes. The difference here is that the background layer is not just a build runner. It holds context, answers questions, and routes work to the right tool. The architecture matters because it makes accountability visible.
        </p>

        <h2 class="reveal">The Operating Shape</h2>

        <p class="reveal">
            I think about the setup less as a toolchain and more as an operating shape:
        </p>

        <ul class="reveal" style="margin: 16px 0 24px; padding-left: 24px;">
            <li style="margin-bottom: 8px;"><strong>Surface:</strong> a small set of approved ways for me to ask for work or context.</li>
            <li style="margin-bottom: 8px;"><strong>Context:</strong> specs, repo instructions, positioning, and architectural notes that agents can query with citations.</li>
            <li style="margin-bottom: 8px;"><strong>Router:</strong> a resident orchestration process that decides whether a request is a lookup, a draft, a code task, or a scheduled check.</li>
            <li style="margin-bottom: 8px;"><strong>Worker:</strong> coding and analysis tools that operate in isolated branches or bounded workspaces.</li>
            <li style="margin-bottom: 8px;"><strong>Gate:</strong> human review, PR review, and explicit approval before anything material changes.</li>
        </ul>

        <p class="reveal">
            That shape keeps the tactical details swappable. Models will change. Agent runners will change. Local and cloud environments will keep trading advantages. The durable part is the split between context, execution, and approval.
        </p>

        <figure class="post-visual reveal">
            <div class="post-visual-title">The agent operating boundary</div>
            <div class="visual-flow">
                <div class="visual-step">
                    <span class="visual-step-label">Ask</span>
                    <strong>Approved prompts</strong>
                    <span>Requests enter through known surfaces.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Orient</span>
                    <strong>Queryable context</strong>
                    <span>Specs, conventions, and positioning are cited before work begins.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Route</span>
                    <strong>Agent process</strong>
                    <span>The request becomes a lookup, draft, code task, or scheduled check.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Work</span>
                    <strong>Bounded workspace</strong>
                    <span>Changes happen in reviewable branches, not directly in production.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Gate</span>
                    <strong>Human review</strong>
                    <span>The founder stays accountable for final judgment.</span>
                </div>
            </div>
        </figure>

        <h2 class="reveal">What Belongs Behind the Boundary</h2>

        <h3 class="reveal">Company memory</h3>

        <p class="reveal">
            <code>CLAUDE.md</code> files solve one level of this. Each repo reminds the agent of its own conventions. The scope is a single repo. Company memory is broader: what Luminik calls itself, why the architecture works the way it does, which tradeoffs are settled, and which claims are safe to make in public.
        </p>

        <p class="reveal">
            That context needs to be queryable and cited. A static file is useful for one session. A retrieval layer is better for recurring work because it makes the agent show its sources before it acts. If the answer came from an outdated spec, I want to see that immediately.
        </p>

        <figure class="post-visual reveal">
            <div class="post-visual-title">Context discipline for recurring agent work</div>
            <div class="visual-flow">
                <div class="visual-step">
                    <span class="visual-step-label">Intent</span>
                    <strong>Specs</strong>
                    <span>What the system should do and why.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Reality</span>
                    <strong>Code</strong>
                    <span>What the system actually does today.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Voice</span>
                    <strong>Positioning</strong>
                    <span>What the company can safely claim.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Rules</span>
                    <strong>Instructions</strong>
                    <span>How agents should behave inside each repo.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Check</span>
                    <strong>Citations</strong>
                    <span>Every answer carries its trail back to source.</span>
                </div>
            </div>
        </figure>

        <p class="reveal">
            This is the cross-session coordination problem I described in <a href="gstack-solo-builder.html">the gstack post</a>. A specs repo is necessary. Making it queryable by an always-on agent is the next step, and it is easier to run on a machine that does not sleep.
        </p>

        <h3 class="reveal">Operational visibility</h3>

        <p class="reveal">
            Recurring agents should be able to inspect more than they can change. That one rule eliminates a large class of bad outcomes. The agent can help me notice drift, stale assumptions, and forgotten follow-up. It should not silently mutate infrastructure or product behavior.
        </p>

        <p class="reveal">
            The first useful run produced a cleanup list: live state that needed to be reconciled with declared state, old artifacts from past experiments, and reminders I had let sit too long. That was enough. A good background layer turns small entropy into visible work before it becomes weekend work.
        </p>

        <p class="reveal">
            The fixes were small PRs. The operating effect was larger: agents are useful when they increase what you can notice without increasing what they can damage.
        </p>

        <h3 class="reveal">Scheduled maintenance</h3>

        <p class="reveal">
            Anything that needs to run on a schedule now has a place to run: context refresh, documentation drift checks, repository hygiene, and release follow-up. None of these needs autonomy in the theatrical sense. They need consistency, source links, and a reviewable output.
        </p>

        <h2 class="reveal">What the Setup Taught Me About Open Source</h2>

        <p class="reveal">
            Setup took longer than the READMEs suggested because a few assumptions in the tools were wrong or stale. That is normal in fast-moving open-source software. The useful part was not the breakage. The useful part was the loop: isolate the symptom, verify it outside my own stack, leave a public trail, and move on with a small local patch.
        </p>

        <h3 class="reveal">A provider integration regression</h3>

        <p class="reveal">
            One issue came from a provider integration change in Hermes Agent. I reproduced it outside my local environment, compared it with the recent upstream changes, and confirmed that an existing community PR addressed the failure path. I left a validation comment on <a href="https://github.com/NousResearch/hermes-agent/pull/12204#issuecomment-4274123223" target="_blank" rel="noopener">PR #12204</a>. The maintainer then shipped a cleaner fix in <a href="https://github.com/NousResearch/hermes-agent/pull/12251" target="_blank" rel="noopener">PR #12251</a> the same day.
        </p>

        <h3 class="reveal">A prompt assumption that leaked into product behavior</h3>

        <p class="reveal">
            The second issue was a formatting assumption inside a platform prompt. The agent was obeying a tool-level instruction that contradicted the behavior I wanted. That is a small bug, but a revealing one: with agents, product behavior often lives in prompt assembly as much as in application code. I filed <a href="https://github.com/NousResearch/hermes-agent/issues/12224" target="_blank" rel="noopener">Issue #12224</a> with the reproduction and suggested correction.
        </p>

        <h3 class="reveal">A default that constrained the knowledge layer</h3>

        <p class="reveal">
            The third issue was a default in the knowledge layer that made one provider path the only practical path. A community PR already existed, so I checked it in a local test setup and left confirmation on <a href="https://github.com/garrytan/gbrain/pull/89#issuecomment-4274185128" target="_blank" rel="noopener">gbrain PR #89</a>. That is the healthiest version of open source: one person opens the path, another verifies it under real use, and the next user gets a better default.
        </p>

        <h3 class="reveal">The general shape</h3>

        <p class="reveal">
            Running open-source tooling that is in rapid development carries a small tax. Source trees change faster than docs, defaults age out of date, and upstream assumptions lag the services they talk to. The right response is calm reproduction, useful comments, and small reversible patches.
        </p>

        <h2 class="reveal">Separation of Concerns</h2>

        <p class="reveal">
            The useful part was the boundary itself. Before this change, personal work, interactive development, company context, and recurring agent work all shared the same operational surface. That made the system easy to start and harder to trust.
        </p>

        <p class="reveal">
            After the change, there are two layers. One is the founder's interactive workspace. The other is the company's recurring operations layer. They have different context, different permissions, different schedules, and different failure modes. That sounds simple because it is simple. It is also the thing that makes the rest of the setup legible.
        </p>

        <p class="reveal">
            This is the part of agent infrastructure that deserves more attention. Autonomy is less interesting than accountability. A recurring agent should have a role you can explain, a boundary you can audit, and an output you can review.
        </p>

        <h2 class="reveal">What I Would Recommend</h2>

        <p class="reveal">
            Not every solo builder needs this. If you are still shaping a first prototype, a laptop and disciplined notes are enough. Earn the complexity.
        </p>

        <p class="reveal">
            You have earned the need when three things are true at once. Agents are producing enough work that review, memory, and follow-up start to blur. Your specs or <code>CLAUDE.md</code> files are authoritative context you update often. And at least one workflow would benefit from running on a schedule instead of when you remember to run it.
        </p>

        <p class="reveal">
            When those are true, the minimum setup is conceptual:
        </p>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">A separate environment.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">Use a machine or workspace whose job is company operations, not personal browsing, private notes, and interactive development. The boundary matters more than the vendor choice.</p>
        </div>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">Fit-for-purpose models.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">Routing, summarization, and implementation are different jobs. Treat model choice as an architecture decision, not a loyalty program.</p>
        </div>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">Inspection before mutation.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">Default recurring agents toward read, compare, summarize, draft, and open reviewable work. Let writes move through the same approval path you would expect from a careful teammate.</p>
        </div>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">A queryable knowledge layer, not a static file.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">Static <code>CLAUDE.md</code> files are necessary for in-repo conventions. Cross-session memory wants retrieval, citations, and freshness checks.</p>
        </div>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px; color: var(--color-text-primary);">Code is the source of truth.</h4>
            <p style="color: var(--color-text-secondary); margin: 0;">The agent's system prompt should say this explicitly. When an answer from the knowledge layer disagrees with the code, it should surface the conflict rather than silently picking one. The drift problem is real. Acknowledging it in the agent's behavior is how you prevent silent regressions from compounding.</p>
        </div>

        <h2 class="reveal">Where This Is Going</h2>

        <p class="reveal">
            I did not set up a dedicated environment because "24/7 agent" sounds futuristic. I did it because a single founder should not be the only operations layer of the company.
        </p>

        <p class="reveal">
            Luminik, like any company, is a collection of recurring jobs. Keeping docs in sync with code. Reviewing the gap between intent and implementation. Turning customer signal into sharper product decisions. Noticing operational drift. Most of these jobs share a shape: trigger, context, action, output, review.
        </p>

        <p class="reveal">
            What I am building toward is a small number of scoped agent roles, each with a clear slice of context and an explicit accountability contract. Some tasks can run on their own. Some need my approval. The contract matters more than the persona.
        </p>

        <p class="reveal">
            The dedicated environment is the substrate that has to exist for that to work: always-on runtime, separated context, queryable memory, and scheduled jobs that produce reviewable output. None of it is the finished product. It is the coordination layer a solo founder needs to run a company with the discipline of a larger team.
        </p>

        <p class="reveal">
            The claim I am testing is that this shape of company scales further than the version where the founder sits inside every loop. The first lesson is already clear: the quality of an agent system is mostly the quality of its boundaries.
        </p>

        <h2 class="reveal">What's Next</h2>

        <p class="reveal">
            Near-term: better drift detection between specs and code, clearer review queues for recurring work, and tighter source attribution for any agent-generated summary. I want fewer forgotten handoffs, cleaner source trails, and more precise review.
        </p>

        <p class="reveal">
            Medium-term: more scoped roles around the recurring job shapes that still sit with me. Same discipline each time: bounded context, bounded authority, explicit contract, reviewable output.
        </p>


        <p class="reveal" style="font-style: italic; color: var(--color-text-tertiary);">
            Background agents need bounded context, bounded authority, and reviewable output. That is the standard I am using for the next version of the setup.
        </p>

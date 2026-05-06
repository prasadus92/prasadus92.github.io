---
slug: "zero-to-one-bain"
title: "Building a $3.6M ARR Product Inside a Consulting Firm"
description: "Lessons from building Aura at Bain & Company, including the tradeoffs of venture building inside a large organization."
date: "2025-10-15"
modified: "2026-05-06"
category: "Zero to One"
readTime: "15 min read"
tags: ["Aura","Bain","venture building"]
---
<p class="reveal">
    Aura went from zero to $3.6M ARR inside Bain & Company in 18 months.
</p>

<p class="reveal">
    The useful question is which constraints helped and which constraints slowed us down.
</p>

<p class="reveal">
    Bain gave Aura distribution, trust, domain access, and customer proximity. It also added alignment work, incentive complexity, and speed limits that a startup would not have had.
</p>

<p class="reveal">
    The lesson is not that corporate venture building is good or bad. The lesson is that the environment decides which moves are available.
</p>

<h2 class="reveal">The Context: Why Consulting Firms Build Products</h2>

<p class="reveal">
    First, some background. Consulting firms have been building products for years, though they don't always talk about it. The logic is simple: consulting revenue is linear (more hours = more revenue), while product revenue can be exponential (build once, sell many times).
</p>

<p class="reveal">
    There is a deeper reason. Consulting firms already sit close to decision-makers at large companies. They spend thousands of hours understanding customer problems at the highest levels. That access changes the first mile of product discovery.
</p>

<p class="reveal">
    The challenge is translating that insight into products. The access is real. The translation cost is also real.
</p>

<h2 class="reveal">How Aura Started</h2>

<p class="reveal">
    Aura was a PE due diligence platform. The origin story is simple: Bain does hundreds of due diligence projects for private equity firms every year. Each project involves collecting massive amounts of data, running analyses, and producing reports under extreme time pressure.
</p>

<p class="reveal">
    The existing process was... let's call it artisanal. Consultants would manually gather data from dozens of sources. They'd build one-off spreadsheets. They'd spend nights reformatting slides. Each project reinvented the wheel.
</p>

<p class="reveal">
    The insight was obvious: Why not build a platform that systematizes this? Automate data collection. Standardize analyses. Make the repeatable parts instant so consultants can focus on the parts that actually require thinking.
</p>

<p class="reveal">
    That's easy to say. Making it happen inside a consulting firm is hard for reasons that aren't obvious from the outside.
</p>

<figure class="post-visual reveal">
    <div class="post-visual-title">The corporate venture tradeoff</div>
    <div class="visual-split">
        <div class="visual-column">
            <h4>What the firm gives you</h4>
            <ul>
                <li>Trusted access to enterprise buyers</li>
                <li>Existing client relationships</li>
                <li>Domain knowledge from real projects</li>
                <li>Funding without a separate raise</li>
            </ul>
        </div>
        <div class="visual-column">
            <h4>What the firm costs you</h4>
            <ul>
                <li>Slower decisions</li>
                <li>Conflicting incentive systems</li>
                <li>Talent expectations shaped by consulting</li>
                <li>More internal alignment work</li>
            </ul>
        </div>
    </div>
    <p class="post-visual-caption">Aura worked because the advantages matched the problem. Distribution and trust mattered as much as the product itself.</p>
</figure>

<h2 class="reveal">The Advantages No One Talks About</h2>

<p class="reveal">
    The advantages were real:
</p>

<h3 class="reveal">1. Distribution Before Product</h3>

<p class="reveal">
    In a startup, you build the product first, then figure out how to reach customers. At Bain, we had the opposite problem. We had hundreds of partners with existing client relationships. Our "go-to-market" was: walk down the hall.
</p>

<p class="reveal">
    This sounds trivial. It's not. Most startups die from lack of distribution, not lack of product. Having distribution locked in from day one let us focus almost entirely on building the right thing.
</p>

<h3 class="reveal">2. Customer Development on Steroids</h3>

<p class="reveal">
    When you're building a B2B product, the hardest part is getting time with decision-makers. They're busy. They don't take cold calls. They definitely don't want to be guinea pigs for your MVP.
</p>

<p class="reveal">
    At Bain, I had unlimited access to partners who ran PE due diligence. These are people who live the problem every day, who understand the nuances that would take a startup years to discover. Getting an hour of their time was as simple as booking a meeting.
</p>

<p class="reveal">
    More importantly, I could watch them work. I could sit in on actual due diligence projects and see where the pain points really were, instead of relying only on what people said.
</p>

<h3 class="reveal">3. Funding Without Fundraising</h3>

<p class="reveal">
    We never did a Series A. We never pitched VCs. The company funded the development, and in return, owned the IP. For someone who'd rather build than pitch, this was ideal.
</p>

<p class="reveal">
    There is a real cost to fundraising that founders don't talk about enough. The obvious cost is time. The quieter cost is mental overhead: the next round, cash planning, valuation, and investor follow-ups all stay open in your head while you are trying to build.
</p>

<p class="reveal">
    Building inside Bain meant I could focus on one thing: making the product better. Revenue targets existed, but they were collaborative goals, not existential threats.
</p>

<h3 class="reveal">4. Trust By Association</h3>

<p class="reveal">
    When a random startup approaches a PE firm with a new due diligence tool, they face a wall of skepticism. Due diligence is sensitive. Data is confidential. Why would anyone trust an unknown entity?
</p>

<p class="reveal">
    When Bain approaches the same firm with the same tool, the conversation is entirely different. The trust is inherited. The relationships are already there. The brand gives the product credibility before a startup would have earned it.
</p>

<h2 class="reveal">The Disadvantages Everyone Underestimates</h2>

<p class="reveal">
    Four things made it harder:
</p>

<h3 class="reveal">1. Organizational Immune System</h3>

<p class="reveal">
    Large organizations have evolved sophisticated mechanisms for rejecting new things. That skepticism is usually self-preservation. Most new initiatives fail, and successful companies have learned to be careful with shiny objects.
</p>

<p class="reveal">
    The challenge is that the same immune system that protects against bad ideas also attacks good ones. You spend enormous energy just creating space to exist. Every meeting requires explaining why this matters. Every resource request requires justification.
</p>

<p class="reveal">
    In a startup, everyone is rowing in the same direction by definition. In a large org, alignment is a constant battle.
</p>

<h3 class="reveal">2. Conflicting Incentives</h3>

<p class="reveal">
    Consulting firms make money by selling partner time. A product that automates work is, in some sense, competing with the core business. This creates weird dynamics.
</p>

<p class="reveal">
    Partners who championed Aura genuinely believed in it. But they also had billable targets. When choosing between staffing a project with consultants (which generates revenue) or using Aura (which requires investment), the short-term math often favored the former.
</p>

<p class="reveal">
    We had to structure the economics so using Aura was clearly better for partners, not just for the firm. That took a lot of iteration.
</p>

<h3 class="reveal">3. Speed Limits</h3>

<p class="reveal">
    Startups move fast because they have nothing to lose. They can ship broken code, pivot weekly, and apologize later. The cost of failure is low because no one knows who they are.
</p>

<p class="reveal">
    Building inside Bain meant building with the Bain brand. If Aura failed badly in front of a client, that reflected on the firm. This created a natural conservatism that was sometimes appropriate and sometimes suffocating.
</p>

<p class="reveal">
    We learned to distinguish between "risks that could embarrass the firm" (must avoid) and "risks that are normal product development" (must accept). But this distinction wasn't always obvious, and defaulting to caution was always the safer career move.
</p>

<h3 class="reveal">4. Talent Constraints</h3>

<p class="reveal">
    Consulting firms are optimized for hiring consultants. They know how to find, recruit, and develop people who are good at consulting. They're less optimized for hiring engineers, designers, and product managers.
</p>

<p class="reveal">
    We needed to build a team with startup DNA inside an organization with consulting DNA. This meant competing for talent against actual startups, which could offer equity, flexibility, and culture that matched what these candidates wanted.
</p>

<p class="reveal">
    The people we did attract were exceptional. But it was always harder than it needed to be.
</p>

<h2 class="reveal">What Actually Made It Work</h2>

<p class="reveal">
    Looking back, a few things were decisive:
</p>

<h3 class="reveal">Executive Air Cover</h3>

<p class="reveal">
    We had senior partners who believed in the vision and protected us from organizational gravity. When committees wanted to add "oversight," they pushed back. When budgets were scrutinized, they advocated.
</p>

<p class="reveal">
    This wasn't about politics. It was about giving us the space to actually build. Without that cover, we would have spent all our energy on internal survival instead of product development.
</p>

<h3 class="reveal">Revenue Focus From Day One</h3>

<p class="reveal">
    Many corporate venture projects fail because they're treated as R&D experiments. They get funded for "innovation" rather than revenue, which sounds nice but usually means no one cares if they succeed.
</p>

<p class="reveal">
    Aura was structured as a business from the start. We had revenue targets. We measured ARR. We tracked unit economics. This gave us credibility internally and forced us to build something people would actually pay for.
</p>

<h3 class="reveal">Borrowed Conviction</h3>

<p class="reveal">
    In the early days, before we had traction, we needed believers. The consultants who used early versions and gave feedback. The partners who introduced us to clients. The skeptics who asked hard questions and made the product better.
</p>

<p class="reveal">
    These people lent us their conviction when we didn't have enough of our own. And their credibility within the organization opened doors that would have been closed to outsiders.
</p>

<h2 class="reveal">The 18-Month Timeline</h2>

<p class="reveal">
    People are often surprised that we went from zero to $3.6M ARR in 18 months. Roughly, it happened like this:
</p>

<div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
    <p style="color: var(--color-text-secondary); margin-bottom: 16px;"><strong>Months 1-3:</strong> Discovery. Interviewed 30+ partners and managers. Shadowed actual due diligence projects. Mapped the workflow in excruciating detail. No code written.</p>
    <p style="color: var(--color-text-secondary); margin-bottom: 16px;"><strong>Months 4-6:</strong> MVP. Built the smallest thing that could be useful. Focused on data collection automation, the most painful and least interesting part of the work. Deployed on 3 real projects.</p>
    <p style="color: var(--color-text-secondary); margin-bottom: 16px;"><strong>Months 7-12:</strong> Iteration. Expanded functionality based on real usage. Added analysis modules. Improved the reporting layer. Grew to 15 projects per month.</p>
    <p style="color: var(--color-text-secondary); margin-bottom: 0;"><strong>Months 13-18:</strong> Scale. Standardized the platform. Built self-service capabilities. Expanded to multiple PE clients. Hit $3.6M ARR run rate.</p>
</div>

<p class="reveal">
    The key insight is that we never had a "big launch." We grew organically, one project at a time, with each success creating demand for the next.
</p>

<h2 class="reveal">Lessons for Both Worlds</h2>

<p class="reveal">
    For people considering building inside large organizations:
</p>

<ul class="reveal">
    <li><strong>Choose the right problem.</strong> Not every problem is suited to corporate venture building. Look for problems where the organization's existing assets (distribution, trust, customer access) create genuine advantages.</li>
    <li><strong>Get air cover early.</strong> Find executives who believe in the mission and will protect you from organizational antibodies. Without this, you're fighting with one hand tied behind your back.</li>
    <li><strong>Make revenue real.</strong> Corporate ventures die when they're treated as innovation theater. Structure your initiative so success is measured the same way as any other business.</li>
    <li><strong>Move faster than feels comfortable.</strong> The organizational default is caution. You'll need to constantly push for speed while being respectful of real constraints.</li>
</ul>

<p class="reveal">
    For people building traditional startups who might be competing against corporate ventures:
</p>

<ul class="reveal">
    <li><strong>Speed is your advantage.</strong> You can move faster than any corporate competitor. Use that speed while you still have it.</li>
    <li><strong>Focus beats resources.</strong> Corporate ventures are always fighting for attention internally. You have the luxury of caring about only one thing.</li>
    <li><strong>Distribution can be built.</strong> Their existing relationships seem insurmountable, but markets expand. New buyers emerge. Your job is to find them before the big players notice.</li>
</ul>

<h2 class="reveal">The Honest Conclusion</h2>

<p class="reveal">
    Building Aura inside Bain was one of the most educational experiences of my career. I learned things about product development, organizational dynamics, and enterprise sales that would have taken much longer to learn elsewhere.
</p>

<p class="reveal">
    Would I do it again? That depends on the problem. For something like due diligence software, where distribution and trust are everything, the corporate setting made sense. For something requiring rapid iteration and pivoting, I'd choose the startup path.
</p>

<p class="reveal">
    The real lesson is that there is no universally right answer. The question isn't "startup or corporate?" It is "what does this specific problem require, and which setting gives me the best chance of solving it?"
</p>

<p class="reveal">
    That's a harder question to answer. But it's the right one to ask.
</p>


<p class="reveal" style="font-style: italic; color: var(--color-text-tertiary);">
    I'm now building Luminik as an independent startup. The problems are different, but many lessons from Bain still apply: stay close to the buyer, make the operating model explicit, and do not confuse institutional resources with product truth.
</p>

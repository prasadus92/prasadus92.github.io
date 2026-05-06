---
slug: "snowflake-cost-optimization"
title: "How SnowOptix Led Me to Luminik"
description: "How building SnowOptix for Snowflake cost optimization led to customer conversations that revealed the bigger Luminik opportunity."
date: "2025-12-15"
modified: "2026-05-06"
category: "Customer Discovery"
readTime: "9 min read"
tags: ["SnowOptix","Luminik","customer discovery"]
---
<p class="reveal">
            SnowOptix started as a narrow tool for a Snowflake cost problem I understood directly.
        </p>

        <p class="reveal">
            The tool earned real use, including adoption by a top-3 global consulting firm. The more important outcome was the set of conversations it created with data and GTM leaders.
        </p>

        <p class="reveal">
            Those conversations exposed a different problem: B2B teams were spending heavily on events, but the handoffs across attendee lists, enrichment, outreach, booth activity, and CRM attribution were fragile. That opportunity became Luminik.
        </p>

        <p class="reveal">
            I did not pivot from a plan. I followed the customer evidence that the side project made visible.
        </p>

        <figure class="post-visual reveal">
            <div class="post-visual-title">How SnowOptix led to Luminik</div>
            <div class="visual-flow">
                <div class="visual-step">
                    <span class="visual-step-label">Problem</span>
                    <strong>Snowflake cost pain</strong>
                    <span>I built a tool for a problem I understood directly.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Artifact</span>
                    <strong>SnowOptix</strong>
                    <span>The side project gave me something concrete to show.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Conversations</span>
                    <strong>GTM leaders</strong>
                    <span>The demos opened discussions outside the original problem.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Pattern</span>
                    <strong>Event workflow pain</strong>
                    <span>Manual prep, late lists, weak follow-up, poor attribution.</span>
                </div>
                <div class="visual-step">
                    <span class="visual-step-label">Company</span>
                    <strong>Luminik</strong>
                    <span>The repeated pain became the new focus.</span>
                </div>
            </div>
        </figure>

        <h2 class="reveal">Why This Side Project Worked as Discovery</h2>

        <p class="reveal">
            A side project gives you a concrete artifact before you have a company story. That matters because serious people react differently to a working thing than to a thesis.
        </p>

        <p class="reveal">
            Building SnowOptix forced decisions about data models, query metadata, recommendations, onboarding, and what a buyer would trust. Each decision made the conversations more specific.
        </p>

        <p class="reveal">
            The useful part was not freedom in the abstract. It was speed. I could change the tool after calls, test a sharper angle, and notice which problems made buyers ask for a second conversation.
        </p>

        <blockquote class="reveal">
            "The best way to have good ideas is to have lots of ideas and throw away the bad ones."
            <span style="font-style: normal; color: var(--color-text-muted);">- Linus Pauling</span>
        </blockquote>

        <p class="reveal">
            SnowOptix became a conversation starter. The discovery came from the follow-up questions people asked after the demo.
        </p>

        <h2 class="reveal">How SnowOptix Started</h2>

        <p class="reveal">
            This is how it happened.
        </p>

        <p class="reveal">
            At my previous company, we had a Snowflake bill that kept growing. Our queries were inefficient, our warehouses were over-provisioned, and nobody had time to optimize anything. The data engineering team was focused on building features, not reducing costs.
        </p>

        <p class="reveal">
            This is a common pattern in fast-growing startups. You optimize for speed, not efficiency. That makes sense in the early days. But eventually, the bill gets large enough that someone notices.
        </p>

        <p class="reveal">
            I started poking around. Snowflake gives you a lot of metadata about query performance, warehouse utilization, and storage patterns. But the data is scattered across multiple system views, and turning it into actionable insights requires significant engineering effort.
        </p>

        <p class="reveal">
            So I built a tool. Nothing fancy at first: just some scripts that pulled the metadata, ran some analysis, and generated recommendations. Things like: "This warehouse is idle 80% of the time, consider auto-suspend." Or: "These 10 queries account for 60% of your compute costs."
        </p>

        <p class="reveal">
            The tool worked. We cut our Snowflake bill by 40% in the first month.
        </p>

        <p class="reveal">
            That got my attention.
        </p>

        <h2 class="reveal">The Conversations That Changed the Direction</h2>

        <p class="reveal">
            I posted about SnowOptix on LinkedIn as a small builder note about optimizing Snowflake costs. Within a week, I had 50 DMs from data leaders asking if they could try it.
        </p>

        <p class="reveal">
            So I started having calls. My first intention was to understand whether SnowOptix could be a real product. The calls gave me a different signal.
        </p>

        <p class="reveal">
            Snowflake costs came up, but so did a broader coordination problem. Data and engineering leaders kept mentioning GTM teams that were struggling to turn event activity into usable pipeline evidence.
        </p>

        <p class="reveal">
            During these calls, I would ask about their data infrastructure challenges. Snowflake costs would come up, but so would a dozen other problems. And I noticed that the people I was talking to, data leaders and VP Engineering types, would often mention their go-to-market colleagues.
        </p>

        <p class="reveal">
            The pattern kept showing up in different words: the data team had cost and governance problems, but their go-to-market colleagues had a messier coordination problem around events.
        </p>

        <p class="reveal">
            I started asking for introductions.
        </p>

        <h2 class="reveal">The Event Marketing Pain Point</h2>

        <p class="reveal">
            The conversations with GTM leaders were eye-opening.
        </p>

        <p class="reveal">
            Marketing leaders described the same shape of problem: high event spend, weak proof of ROI, late attendee data, manual account research, scattered notes, delayed follow-up, and CRM records that never quite told the full story.
        </p>

        <p class="reveal">
            The pattern was consistent. Companies were spending heavily on events, and the process around events was still manual and fragmented. There was no system. Just a lot of individual effort.
        </p>

        <div class="glass-card reveal" style="padding: 24px; margin: 24px 0;">
            <h4 style="margin-bottom: 16px;">The Event Marketing Problem (Summarized)</h4>
            <ul style="color: var(--color-text-secondary); list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 8px;"><strong>Before events:</strong> Manual ICP matching, generic outreach, low meeting conversion</li>
                <li style="margin-bottom: 8px;"><strong>During events:</strong> No real-time prospect intelligence, scattered note-taking</li>
                <li style="margin-bottom: 8px;"><strong>After events:</strong> Delayed follow-up, broken attribution, unprovable ROI</li>
                <li style="border-top: 1px solid var(--glass-border); padding-top: 8px; margin-top: 8px;"><strong>Result:</strong> Millions spent with no way to measure impact</li>
            </ul>
        </div>

        <p class="reveal">
            This problem was much bigger than Snowflake cost optimization. Every B2B company does events. Most of them have the same broken process. The market was enormous.
        </p>

        <h2 class="reveal">The Decision to Pivot</h2>

        <p class="reveal">
            This is the moment that matters. I had a tool that worked. SnowOptix was solving a real problem for real companies. A top-3 global consulting firm was using it. I could have doubled down and built a Snowflake cost optimization company.
        </p>

        <p class="reveal">
            But the event marketing problem was clearly bigger. The pain was more acute. The willingness to pay was higher. And crucially, AI made it newly solvable in ways that were not possible even two years ago.
        </p>

        <p class="reveal">
            So I made a choice. I would keep SnowOptix running (it does not require much maintenance), but I would focus my energy on the event marketing problem. That became Luminik.
        </p>

        <p class="reveal">
            Was this the right decision? I do not know yet. But I can tell you why I made it.
        </p>

        <p class="reveal">
            First, market size matters. Snowflake cost optimization is a real market, but it is a subset of a subset. Event marketing is a horizontal problem that touches every B2B company with a sales team.
        </p>

        <p class="reveal">
            Second, timing matters. LLMs have become good enough to automate the research, personalization, and synthesis tasks that make event marketing so labor-intensive. Two years ago, this solution was not possible. Two years from now, it will be table stakes. The window is now.
        </p>

        <p class="reveal">
            Third, passion matters. I found the event marketing problem genuinely interesting. The GTM leaders I talked to were smart, frustrated, and desperate for a solution. I wanted to help them.
        </p>

        <p class="reveal">
            SnowOptix was interesting. Luminik felt important.
        </p>

        <h2 class="reveal">Why Following Curiosity Beats Following Plans</h2>

        <p class="reveal">
            Here is what I have learned from this experience: the best opportunities are rarely found by looking for them directly.
        </p>

        <p class="reveal">
            If I had sat down at the beginning of last year and tried to identify the biggest market opportunity in B2B software, I would not have landed on event marketing. I would have looked at market size reports and competitive landscapes and come up with something obvious.
        </p>

        <p class="reveal">
            Instead, I followed my curiosity. I built something to solve my own problem. That led to conversations. The conversations led to insights. The insights led to a bigger opportunity.
        </p>

        <p class="reveal">
            This is not an accident. It is how discovery actually works.
        </p>

        <p class="reveal">
            When you follow curiosity, you end up in places you could not have predicted. You meet people you would not have met otherwise. You learn things that are not in any report or article because they only exist in the heads of people who are living the problem.
        </p>

        <blockquote class="reveal">
            "Plans are useless, but planning is indispensable."
            <span style="font-style: normal; color: var(--color-text-muted);">- Dwight D. Eisenhower</span>
        </blockquote>

        <p class="reveal">
            The same is true for side projects. The project itself might not matter. What matters is what you learn from building it, and who you meet along the way.
        </p>

        <h2 class="reveal">Practical Advice: Side Projects as Discovery Mechanisms</h2>

        <p class="reveal">
            If you want to use side projects as discovery mechanisms, here is what I have learned:
        </p>

        <h3 class="reveal">1. Build Things That Solve Your Own Problems</h3>

        <p class="reveal">
            The best side projects start with genuine frustration. "I think there might be a market for this" is too abstract. Start with "This thing annoys me and I am going to fix it."
        </p>

        <p class="reveal">
            When you solve your own problem, you start with useful context: you understand the problem deeply, you can iterate quickly without customer feedback loops, and you are your own first customer.
        </p>

        <h3 class="reveal">2. Talk About What You Are Building</h3>

        <p class="reveal">
            The useful part starts when you share. Post on LinkedIn, Twitter, Hacker News, or wherever your potential users hang out. Not to market your product, but to invite conversation.
        </p>

        <p class="reveal">
            Most people will ignore you. Some will be curious. A few will reach out. Those few are gold. They have the same problem you do, or they know someone who does, or they have insights you lack.
        </p>

        <h3 class="reveal">3. Have Lots of Conversations</h3>

        <p class="reveal">
            Every conversation is a data point. But do not just ask about the thing you built. Ask about adjacent problems. Ask what keeps them up at night. Ask who else you should talk to.
        </p>

        <p class="reveal">
            The goal is not to validate your idea. The goal is to understand the problem space deeply enough that new ideas emerge organically.
        </p>

        <h3 class="reveal">4. Follow the Energy</h3>

        <p class="reveal">
            Pay attention to where the energy is. If every conversation about Topic A feels like pulling teeth, but conversations about Topic B are electric, that is information. The market tells you what it wants if you listen.
        </p>

        <p class="reveal">
            When I talked to data engineers about Snowflake costs, they were interested but not urgent. When I talked to marketing leaders about event ROI, they were practically begging for a solution. The difference was obvious.
        </p>

        <h3 class="reveal">5. Be Willing to Abandon</h3>

        <p class="reveal">
            The hardest part of discovery is letting go. You built something. It works. People are using it. But something else is more interesting, more important, more likely to succeed.
        </p>

        <p class="reveal">
            This is the moment where sunk cost fallacy kills good judgment. Do not let it. The purpose of side projects is to learn. Once you have learned what you need, it is okay to move on.
        </p>

        <h2 class="reveal">The Bigger Lesson</h2>

        <p class="reveal">
            I think there is a bigger lesson here about how to navigate uncertainty.
        </p>

        <p class="reveal">
            We are trained to make plans, set goals, and execute systematically. That works well for problems where the path is known. For discovery problems, finding the right product, market, or career move, systematic planning often fails.
        </p>

        <p class="reveal">
            Discovery requires a different approach. It requires starting with what interests you, building things to learn, talking to people to expand your understanding, and staying open to directions you did not plan.
        </p>

        <p class="reveal">
            Side projects are perfect for this because they are low-commitment enough to be experimental. You can start one in a weekend. You can abandon it a month later. Or you can follow it for a year and have it lead you somewhere you never expected.
        </p>

        <p class="reveal">
            SnowOptix led me to Luminik. I could not have planned that. But I could create the conditions for it to happen.
        </p>

        <p class="reveal">
            That is what following curiosity looks like in practice.
        </p>


        <p class="reveal" style="font-style: italic; color: var(--color-text-tertiary);">
            SnowOptix is still available and being used by leading enterprises to optimize their Snowflake costs. If you are interested in that, feel free to reach out. If you are struggling with event marketing ROI, that is where my focus is now with Luminik, and I would love to hear your story.
        </p>

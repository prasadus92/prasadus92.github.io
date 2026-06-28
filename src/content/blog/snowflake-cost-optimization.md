---
title: "Side projects that lead to unexpected discoveries"
description: "How building SnowOptix as a side project led to conversations that revealed a bigger opportunity - and why following curiosity beats following plans."
pubDate: 2025-01-26
category: "Entrepreneurship"
tags: ["entrepreneurship"]
readingTime: "9 min read"
---

The most useful things I have learned as a founder did not come from business books or accelerator programs. They came from building things that seemed irrelevant at the time.

Last year I built a Snowflake cost optimization tool called SnowOptix. It started as a side project to solve my own problem. Today McKinsey uses it. But the value of SnowOptix was not the tool. It was the conversations it started, conversations that led me to a much bigger opportunity.

That opportunity became Luminik.

This is a story about how side projects work as discovery mechanisms, and why following your curiosity often beats following your plans.

## Why side projects matter

There is a kind of knowledge you can only get from building things. Not reading about building things. Not planning to build things. Actually building them.

The reason is simple. Building forces you to make decisions. Every decision creates a constraint. Every constraint reveals something you did not know before. Building is the act of discovering what you do not know.

Side projects work well here because they have low stakes. When you are building something on the side, you are not worried about investors or runway or team morale. You can follow your curiosity wherever it leads. You can abandon ideas that are not working. You can spend three weekends in a rabbit hole because it seems interesting.

> "The best way to have good ideas is to have lots of ideas and throw away the bad ones." - Linus Pauling

Side projects are idea generators. They are also conversation starters. And conversations are where the real discoveries happen.

## How SnowOptix started

Let me tell you how this happened.

At my previous company, our Snowflake bill kept growing. Not because we were doing more work, but because our queries were inefficient, our warehouses were over-provisioned, and nobody had time to optimize anything. The data engineering team was focused on building features, not reducing costs.

This is a common pattern in fast-growing startups. You optimize for speed, not efficiency. That makes sense early on. Eventually the bill gets large enough that someone notices.

I started poking around. Snowflake gives you a lot of metadata about query performance, warehouse utilization, and storage patterns. But the data is scattered across multiple system views, and turning it into actionable insights takes significant engineering effort.

So I built a tool. Nothing fancy at first, some scripts that pulled the metadata, ran analysis, and generated recommendations. Things like: "This warehouse is idle 80% of the time, consider auto-suspend." Or: "These 10 queries account for 60% of your compute costs."

The tool worked. We cut our Snowflake bill by 40% in the first month.

That got my attention.

## The unexpected conversations

Here is where it gets interesting.

I posted about SnowOptix on LinkedIn. A casual post: "Built this thing to optimize our Snowflake costs, happy to share if anyone is interested." The response surprised me. Within a week I had 50 DMs from data leaders at various companies, all asking if they could try it.

So I started having calls. Lots of calls. My intent was to understand whether SnowOptix could be a real product. What I found was something else.

During these calls I would ask about their data infrastructure challenges. Snowflake costs would come up, but so would a dozen other problems. And I noticed the people I was talking to, data leaders and VP Engineering types, would often mention their go-to-market colleagues.

"Our marketing team has this exact problem with their event data."

"You should talk to our CMO, they are drowning in disconnected tools."

"The GTM side of the house has way worse problems than us."

I started asking for introductions.

## The event marketing pain point

The conversations with GTM leaders were eye-opening.

One VP of Marketing at a Series C startup told me: "We spend \$2 million a year on events. Trade shows, conferences, executive dinners. And I have no idea if it works. I mean, I think it works. The sales team says they get good meetings. But I cannot prove ROI to the board."

Another told me about their event prep: "We get the attendee list two weeks before the conference. It is a spreadsheet with 3,000 names. Someone on my team spends 40 hours manually researching which ones match our ICP. Then we try to book meetings. Most of them do not respond because we reached out too late."

A third described what happens after events: "The sales team comes back with a stack of business cards. Some get into Salesforce. Some do not. Follow-up emails go out maybe a week later. By then everyone has forgotten the conversation."

The pattern was consistent. Companies were spending 20-30% of their marketing budget on events, but the process around events was manual and fragmented. There was no system. Just heroic individual effort.

#### The Event Marketing Problem (Summarized)

- **Before events:** Manual ICP matching, generic outreach, low meeting conversion
- **During events:** No real-time prospect intelligence, scattered note-taking
- **After events:** Delayed follow-up, broken attribution, unprovable ROI
- **Result:** Millions spent with no way to measure impact

And the thing is, this problem was much bigger than Snowflake cost optimization. Every B2B company does events. They tend to have the same broken process. The market was enormous.

## The decision to pivot

This is the moment that matters. I had a tool that worked. SnowOptix was solving a real problem for real companies. McKinsey was using it. I could have doubled down and built a Snowflake cost optimization company.

But the event marketing problem was bigger. The pain was more acute. The willingness to pay was higher. And AI made it newly solvable in ways that were not possible even two years ago.

So I made a choice. I would keep SnowOptix running (it does not require much maintenance) and focus my energy on the event marketing problem. That became Luminik.

Was this the right decision? I do not know yet. But I can tell you why I made it.

First, market size. Snowflake cost optimization is a real market, but it is a subset of a subset. Event marketing is a horizontal problem that touches every B2B company with a sales team.

Second, timing. LLMs have become good enough to automate the research, personalization, and synthesis tasks that make event marketing so labor-intensive. Two years ago this solution was not possible. Two years from now it will be table stakes. The window is now.

Third, passion. I found the event marketing problem genuinely interesting. The GTM leaders I talked to were smart, frustrated, and desperate for a solution. I wanted to help them.

SnowOptix was interesting. Luminik felt important.

## Why following curiosity beats following plans

Here is what I learned from this. The best opportunities are rarely found by looking for them directly.

If I had sat down at the start of last year and tried to identify the biggest market opportunity in B2B software, I would not have landed on event marketing. I would have looked at market size reports and competitive landscapes and come up with something obvious.

Instead I followed my curiosity. I built something to solve my own problem. That led to conversations. The conversations led to insights. The insights led to a bigger opportunity.

This is how discovery works.

When you follow curiosity, you end up in places you could not have predicted. You meet people you would not have met. You learn things that are not in any report, because they only exist in the heads of people who are living the problem.

> "Plans are useless, but planning is indispensable." - Dwight D. Eisenhower

The same is true for side projects. The project itself might not matter. What matters is what you learn from building it, and who you meet along the way.

## Side projects as discovery mechanisms

If you want to use side projects this way, here is what I learned.

### 1. Build things that solve your own problems

The best side projects start with real frustration. Not "I think there might be a market for this," which is too abstract. Start with "This thing annoys me and I am going to fix it."

When you solve your own problem, you have an advantage. You understand the problem deeply, you can iterate without customer feedback loops, and you are your own first customer.

### 2. Talk about what you are building

The magic happens when you share. Post on LinkedIn, Twitter, Hacker News, wherever your potential users hang out. Not to market your product, but to invite conversation.

Many people will ignore you. Some will be curious. A few will reach out. Those few are gold. They have the same problem you do, or they know someone who does, or they have insights you lack.

### 3. Have lots of conversations

Every conversation is a data point. But do not just ask about the thing you built. Ask about adjacent problems. Ask what keeps them up at night. Ask who else you should talk to.

The goal is not to validate your idea. The goal is to understand the problem space deeply enough that new ideas emerge on their own.

### 4. Follow the energy

Pay attention to where the energy is. If every conversation about Topic A feels like pulling teeth, but conversations about Topic B are electric, that is information. The market tells you what it wants if you listen.

When I talked to data engineers about Snowflake costs, they were interested but not urgent. When I talked to marketing leaders about event ROI, they were practically begging for a solution. The difference was obvious.

### 5. Be willing to abandon

The hardest part of discovery is letting go. You built something. It works. People are using it. But something else is more interesting, more important, more likely to succeed.

This is where sunk cost fallacy kills good judgment. Do not let it. The purpose of side projects is to learn. Once you have learned what you need, it is okay to move on.

## The bigger lesson

There is a bigger lesson here about navigating uncertainty.

We are trained to make plans, set goals, and execute systematically. That works for problems where the path is known. For problems of discovery, finding the right product, the right market, the right career move, systematic planning often fails.

Discovery needs a different approach. Start with what interests you. Build things to learn. Talk to people to expand your understanding. Stay open to unexpected directions.

Side projects are good for this because they are low-commitment enough to be experimental. You can start one in a weekend. You can abandon it a month later. Or you can follow it for a year and have it lead you somewhere you never expected.

SnowOptix led me to Luminik. I could not have planned that. But I could create the conditions for it to happen.

That is what following curiosity looks like in practice.

SnowOptix is still available and being used by companies including McKinsey to optimize their Snowflake costs. If you are interested in that, reach out. But if you are struggling with event marketing ROI, that is where my focus is now with Luminik, and I would love to hear your story.

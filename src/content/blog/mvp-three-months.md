---
title: "From idea to MVP in 3 months: a solo founder's playbook"
description: "How I built Mainteny's MVP solo in 3 months, including the routing detour that cost me two sprints, before the work helped raise a $2.7M seed round."
pubDate: 2025-01-26
category: "Startup"
tags: ["startup"]
readingTime: "13 min read"
related: ["raising-seed-round", "technical-founder-sales"]
faq:
  - q: "Should I build my own routing solver for a field-service MVP?"
    a: "Almost certainly not at the MVP stage. Vehicle routing with time windows is NP-hard, and a from-scratch solver is months of work for a result customers cannot tell apart from an 80% one. Ship on a third-party routing API first, prove people pay, then build the real solver against actual constraints. I lost two sprints learning this."
  - q: "How do you scope an MVP when the domain is genuinely complex?"
    a: "Pick the one workflow that, if it works, proves people will pay, and cut everything else into a written won't-have list. For a maintenance CRM that was create-assign-complete a job. Invoicing, quotations, units management, and offline capture all came after the first paying customers, not before."
  - q: "What tech stack should a solo founder use for speed?"
    a: "The one you can write in your sleep. I used Spring Boot, PostgreSQL, and server-rendered templates because I could estimate features accurately and debug in minutes. Choose tools by your speed with them, not their theoretical fit."
  - q: "When should you add a co-founder?"
    a: "After the concept is proven, not before. Solo founding wins on decision speed during the uncertain MVP phase. I co-founded Mainteny, and the second brain mattered most once we were past zero to one and building a team."
---

**TL;DR.** I built Mainteny's MVP solo in three months by shipping the one workflow that proved people would pay, create-assign-complete a job, and writing everything else onto a 40-item won't-have list. The one time I broke my own rule, I burned two sprints scoping a custom routing solver before realising an 80% third-party API answered the only question that mattered. Core loop first, infrastructure last, boring stack I could write in my sleep, customers talking to me before the product worked. The work I did in that period, alongside my co-founder, helped raise a $2.7M seed round.

In early 2021 I left my job to build a CRM for maintenance companies in Europe: HVAC technicians, plumbers, electricians. Three months later I had a working product and paying customers. The work I did in that period, alongside my co-founder, helped raise a $2.7M seed round.

This is not a story about 16-hour days. It is about deciding what not to build when you are building alone, and about the one time I ignored my own rule and lost two sprints to it.

## Build the one thing that proves people will pay

The hardest skill in an MVP is deciding what to leave out. Maintenance businesses have complex needs: scheduling, dispatching, inventory, invoicing, quotations, customer communication, reporting. A complete solution is years of work. I had three months.

So I asked one question obsessively. What is the one thing that, if it works, proves the business is viable? For us it was job management: create a job, assign it to a technician, capture what happened, mark it complete. If maintenance companies would pay for a better way to run their daily jobs, everything else could come later.

Everything else got cut into a written won't-have list. That list ran past 40 items. Every time a prospect mentioned a feature, it went on the list instead of the roadmap, which let me hear the need without committing to build it. The won't-have list is the most useful document you write as a solo founder. It is not a backlog. It is a promise to yourself not to get distracted.

> The won't-have list is not a backlog. It is a promise to yourself not to get distracted.

## The routing detour that cost me two sprints

Field-service software lives or dies on routing: which technician goes to which job, in what order, given where they are and when the customer is free. I knew the computer science. This is vehicle routing with time windows, a variant of the traveling salesman problem, and it is NP-hard. There is no algorithm that solves it perfectly at scale in reasonable time.

My instinct was to build a custom solver. The Java ecosystem has good open-source tooling for exactly this: OptaPlanner, now Timefold, for the constraint solving, and GraphHopper for the routing graph. I started scoping a real solver. It was the most interesting problem in the product and I wanted to own it.

Then someone challenged the premise, and they were right. We did not need to solve technician routing perfectly to find out whether anyone would pay. A decent 80% solution was more than enough for the first version. The customer does not experience the optimality gap on a six-job day. They experience whether the tool exists at all.

So I dropped the custom solver and shipped the MVP on a third-party routing API from a Canadian provider. Plug it in, get back an ordered route, move on. The detour cost me roughly two weeks, two full sprints, of work that did not move the product forward. In the early days of a company, two weeks is real. That was the clearest case I had of my technical intuition being wrong: I optimized for the interesting problem instead of the question that mattered, which was whether the business existed.

The lesson generalizes past routing. I come from an infrastructure and backend background, so my reflex is also to front-load monitoring and observability. Sometimes that is right. At MVP stage it is the same mistake in a different costume: build the minimal version, then iterate when there is something worth observing.

## What I built after the routing API, in order

Sequencing matters as much as scope. Get it wrong and you spend weeks on infrastructure before there is anything to show.

- **Week 1-2, the core loop.** Create a job, assign it, mark it complete. Hardcoded test user, no migrations, basic try-catch. By the end of week 2 I could demo the flow to customers. It was ugly and broke in dozens of ways, but it showed the idea clearly enough to get feedback.
- **Week 3-4, just enough auth.** Username and password on Spring Security, the simplest config that works. No OAuth, no social login, no password reset. I reset passwords by hand in the database. This is where developers over-engineer; do not.
- **Week 5-8, the must-have features.** Customer and technician management, scheduling with a calendar view, status workflows, the routing API wired in, simple reporting. Each feature got the simplest version that solved the problem, then feedback, then iterate only if needed.
- **Week 9-10, polish and infrastructure.** Deployment pipeline, monitoring, backups. Only in the final weeks, and only because by then there was something worth running reliably.

Roughly 300 hours of focused coding over the three months, protected in fixed morning blocks. If a customer wanted to talk at 9am, I offered 2pm. The constraint made me more responsive in the afternoons, not less, because people learned exactly when they could reach me.

What I deliberately skipped: extensive unit tests on code that would be rewritten anyway, documentation for a team of one, performance work for a handful of users, mobile responsiveness, and internationalization in a single-language market. Each matters eventually. None matters for proving the first hypothesis.

## The real routing system came later

Once paying customers were on the product, the 80% routing API became the thing worth replacing. We built the real solution on GraphHopper, adapted from generic vehicle routing to technician dispatching, which has constraints a delivery-van model does not. Service time at each site, where the technician is working, not driving. Waiting windows when a customer is only available in a slot. Callout and emergency reroutes, where an urgent job lands mid-day and the whole afternoon has to recompute around it.

That order is the point. The hard, owned version of routing earned its build time only after the business was real. With the foundation proven, the product expanded the same way: invoicing, order handling, quotations, a customer-facing UI, units management, and offline capture of machine details for technicians working in basements and plant rooms with no signal. None of that belonged in the first three months.

## Tech stack: boring on purpose

When you build alone, the temptation to try new technology is strong. Resist it. This is not the time to learn Rust.

I chose the most boring stack I knew well: Spring Boot with Spring Data JPA, PostgreSQL, server-rendered templates with JavaScript for the frontend, Kubernetes on Google Cloud, GitHub Actions for deploys. Why Spring Boot? I had used it for years and could estimate features accurately and debug in minutes instead of hours. Some founders questioned Kubernetes as overkill for an MVP. Maybe, but I could stand up a cluster and deploy faster than I could configure a VM by hand, because I had done it dozens of times.

Choose technology by your speed with it, not its theoretical fit. A tool you know deeply beats a better tool you do not.

## Sell while you build

The biggest mistake technical founders make is building in isolation for months, then discovering they built the wrong thing. I started talking to maintenance companies in week 3, before the product really worked, with a simple ask: I am building a tool for businesses like yours, can I show you what I have and get your feedback? People rarely say no to a request for advice.

Those conversations validated the problem, shaped the product, and seeded a pipeline. By launch I had 15 companies waiting to try it, and three became paying customers in the first month. The trick was honesty about the product's state: I told prospects exactly what worked and what did not, fixed things fast when they broke, and gave them my phone number. Early customers do not expect perfection. They expect to be heard.

## What I would change

- **Start customer conversations in week 1, not week 3.** They would have shaped the architecture, and maybe saved me the routing detour.
- **Build analytics from day one.** I added usage tracking late and could not see how customers used the product when I most needed to prioritize.
- **Price with more nerve.** I underpriced from a lack of confidence. Customers who would have paid more were happy to pay less, which made the unit economics look worse than they were.
- **Find a middle ground on error handling.** Skipping it saved time up front and cost more later. Somewhere between perfect and none would have been smarter.

## The point of solo building

Building an MVP solo is not about proving you do not need help. It is about moving fast in the phase where speed matters most, before you know what you are building or why. Once the concept is proven, build the team. I co-founded Mainteny and we went from two people to fifteen; the second brain mattered most after zero to one, not during it.

Three months, one person, one core workflow, three paying customers. That was enough to prove the idea was worth pursuing. The routing detour was the one stretch where I forgot my own rule, and it cost exactly what ignoring it always costs.

## Key takeaways: the solo MVP playbook

1. Build the one workflow that proves people will pay. Write everything else into a won't-have list.
2. Do not build the perfect version of the hard part. An 80% third-party solution ships the MVP; build the real one after customers exist.
3. Core loop first, infrastructure last.
4. Use boring technology you can write in your sleep.
5. Start customer conversations before you write code.
6. Add co-founders and own the hard problems after validation, not before.

Building something in a complex domain and unsure what to cut? Reach out. I am happy to compare notes.

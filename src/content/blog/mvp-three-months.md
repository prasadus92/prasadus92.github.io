---
title: "From idea to MVP in 3 months: a solo founder's playbook"
description: "How I built Mainteny's MVP solo in 3 months before raising a $2.7M seed round. A practical guide to scoping, building, and launching as a solo founder."
pubDate: 2025-01-26
category: "Startup"
tags: ["startup"]
readingTime: "11 min read"
---

In early 2021, I quit my job to build a CRM for maintenance companies in Europe. Three months later I had a working product, paying customers, and the conviction to raise a \$2.7M seed round.

This isn't a story about 16-hour days or some productivity hack. It's about making ruthless decisions about what matters and what doesn't when you're building alone.

Founders overcomplicate MVPs. They build for six months, twelve months, sometimes longer. They hire engineers before they have customers. They optimize for scale before they have traction.

I did the opposite. Here's how it worked.

## Why build solo?

The conventional wisdom says you need a co-founder. VCs prefer teams. The workload is brutal. You need someone to argue with.

All true. And yet.

Building solo has one big advantage nobody talks about: speed of decision-making. When you're alone, there are no debates about architecture. No alignment meetings. No convincing someone your approach is right.

You decide, you build, you ship. The feedback loop is instant.

For an MVP, where the goal is learning rather than scaling, this matters more than anything else. Every hour spent in discussion is an hour not spent shipping. Every compromise to accommodate a co-founder's preference is a potential delay.

> "Speed is the ultimate weapon in business. All else being equal, the fastest company wins."

I'm not saying solo founding is better. It isn't. But for the MVP phase, the coordination overhead of a team can slow you down. I've seen two-person teams take twice as long to ship half as much, because they spent so much time synchronizing.

The time for co-founders is after you've proven the concept works. After you know what you're building and why. In the beginning, when everything is uncertain, having one brain make all the calls is an advantage.

## Scoping ruthlessly

The hardest skill in building an MVP is deciding what not to build.

Mainteny was a CRM for maintenance companies: HVAC technicians, plumbers, electricians. These businesses have complex needs. Scheduling, dispatching, inventory management, invoicing, customer communication, reporting.

A complete solution would take years to build. I had three months.

So I asked one question obsessively. **What is the one thing that, if it works, proves the business is viable?**

For Mainteny, the answer was scheduling and job management. If maintenance companies would pay for a better way to manage their daily jobs (assigning technicians, tracking progress, capturing job details), everything else could come later.

Everything else got cut. No inventory management. No invoicing integration. No mobile app at first. No fancy reporting. No user permissions beyond basic admin/technician roles.

#### The MVP Scoping Framework

- **Must have:** The core value proposition. Without this, the product has no reason to exist.
- **Should have:** Features that make the core significantly better. Build these in month 2-3 if time permits.
- **Could have:** Nice additions that don't affect the core hypothesis. Don't touch these.
- **Won't have:** Everything else. Write them down so you stop thinking about them.

The won't-have list is the most useful document you'll create. It's not a backlog. It's a commitment to yourself that you won't get distracted.

My won't-have list for Mainteny had over 40 items. Every time a potential customer mentioned a feature, I added it to the list instead of the roadmap. This let me acknowledge their need without committing to build it.

Customers respected this. They'd rather have a focused tool that does one thing well than a bloated mess that does everything poorly.

## Time management

When you're the only person building, every hour is a trade-off. An hour on sales is an hour not coding. An hour fixing a bug is an hour not talking to customers.

I tried every productivity system out there. What worked was simple: fixed blocks for fixed activities.

#### The Weekly Structure That Worked

- **Monday-Thursday, 6am-12pm:** Deep coding. No meetings, no email, no Slack.
- **Monday-Thursday, 1pm-5pm:** Customer calls, sales, support, admin.
- **Friday morning:** Planning and reviewing the week.
- **Friday afternoon:** Buffer for anything that slipped.

The morning coding block was sacred. I treated it like a meeting with the most important person in the company, because it was. If a customer wanted to talk at 9am, I offered 2pm instead. No exceptions.

This gave me roughly 24 hours of focused coding per week. Over three months that's about 300 hours. Enough to build an MVP if you don't waste time on the wrong things.

The afternoon block was for everything else. I batched all calls into this window. Customers learned I was available 1-5pm and planned accordingly. The constraint made me more responsive, not less. They knew exactly when they could reach me.

## What to build first

The sequencing matters as much as the choice of what to build. Get it wrong and you'll spend weeks on infrastructure before you have anything to show customers.

The order I followed:

### Week 1-2: the core loop

The first thing I built was the core user journey: create a job, assign it to a technician, mark it complete. No login system (I hardcoded a test user). No database migrations (I reset the database constantly). No error handling beyond basic try-catch.

By the end of week 2, I could demo the core flow to customers. It was ugly and broken in dozens of ways, but it showed the idea clearly enough to get feedback.

### Week 3-4: just enough authentication

Only after validating the core loop did I add user accounts. I used Spring Security with the simplest possible configuration: username/password, no OAuth, no social login, no password reset (I'd manually reset passwords via database).

This is where developers over-engineer. They spend weeks building a perfect auth system before the product exists. Don't. Build the minimum that lets multiple users access the system. The rest can wait.

### Week 5-8: the feature set

With the foundation in place, I built the must-have features: customer management, technician management, job scheduling with a calendar view, basic status workflows, and simple reporting.

Each feature followed the same pattern. Build the simplest version that solves the problem, ship it, get feedback, iterate only if necessary.

### Week 9-10: polish and infrastructure

Only in the final weeks did I invest in infrastructure: proper deployment pipeline, monitoring, backups, and the things needed to run in production reliably.

This ordering matters. If I'd started with infrastructure, I'd have a beautiful deployment pipeline and no product. By leaving it until the end, I ensured I was only building infrastructure for something that worked.

### What I deliberately skipped

- **Unit tests:** Yes, this is heresy. For an MVP where code gets rewritten anyway, extensive testing is premature optimization.
- **Documentation:** I was the only developer. I'd document when there was someone else to read it.
- **Performance optimization:** With a handful of users, performance doesn't matter. Optimize later.
- **Mobile responsiveness:** The desktop version came first. Mobile could wait.
- **Internationalization:** We launched in one market with one language.

Each of these matters eventually. None of them matter for proving the initial hypothesis.

## Tech stack decisions

When you're building alone, the temptation to try new technologies is strong. Don't. This is not the time to learn Rust or experiment with a new database.

I chose the most boring stack I knew well: Spring Boot for the backend, PostgreSQL for the database, and vanilla JavaScript with some jQuery for the frontend (yes, really).

Why Spring Boot? I'd used it for years and could write it in my sleep. I knew how long features would take. I knew where the pitfalls were. I could debug issues in minutes instead of hours.

#### The MVP Tech Stack

- **Backend:** Spring Boot 2.x with Spring Data JPA
- **Database:** PostgreSQL (managed)
- **Frontend:** Server-rendered templates + JavaScript
- **Hosting:** Kubernetes on Google Cloud
- **CI/CD:** GitHub Actions with simple deployment scripts

Some founders questioned the Kubernetes choice. Isn't it overkill for an MVP? Maybe. But I'd deployed dozens of applications to Kubernetes before. I could set up a cluster and deploy an app faster than I could configure a traditional VM setup.

That's the point. **Choose technologies based on your speed with them, not their theoretical fit.** A technology you know deeply beats a technology that's "better" but unfamiliar.

The frontend is where I compromised most. A React or Vue app would have been more modern, but server-rendered templates with JavaScript sprinkled in let me move faster. When you're the only developer, having one codebase instead of two is a big simplification.

## Getting customers while building

The biggest mistake technical founders make is building in isolation. They spend months coding before talking to customers, then discover they built the wrong thing.

I started selling in week 3, before the product could really be used.

How: I reached out to maintenance companies with a simple pitch. "I'm building a tool specifically for businesses like yours. Can I show you what I'm working on and get your feedback?"

People rarely say no to this. You're not selling, you're asking for help. People love giving advice.

These conversations did three things:

- **Validated the problem:** Were these businesses struggling with the pain I was solving?
- **Shaped the product:** What features did they actually need versus what I assumed?
- **Created a pipeline:** Some of these early conversations converted to paying customers.

By the time the MVP was ready, I had a list of 15 companies waiting to try it. Three became paying customers in the first month.

The trick was honesty about the product's state. I told prospects exactly what worked and what didn't. I promised to fix things quickly when they broke. I gave them my personal phone number for support.

Early customers don't expect perfection. They expect to be heard. If you can show that their feedback directly shapes the product, they'll tolerate rough edges.

## The fundraising inflection point

With three paying customers and a working MVP, I had what I needed to raise: proof the market existed, proof I could build, and proof customers would pay.

The seed round came together quickly after that. Investors could see a product, talk to real customers, and evaluate actual usage data. That's far more compelling than a pitch deck alone.

The \$2.7M gave us runway to build the team, expand the product, and grow the customer base. None of it would have happened without those three months of focused solo building.

## What I'd do differently

Some things worked well. Others I'd change.

### Keep: aggressive scoping

Cutting features ruthlessly was the right call. Every feature I didn't build was time I could spend on the core product or talking to customers.

### Keep: fixed schedule

The morning coding blocks were essential. Without protected time for deep work, I'd have been constantly context-switching.

### Change: start customer conversations earlier

I waited until week 3 to start talking to customers. I should have started in week 1, before writing any code. The conversations would have shaped even the initial architecture.

### Change: build analytics from day one

I added usage tracking late and regretted it. Understanding how customers used the product would have helped prioritize features.

### Change: more aggressive on pricing

I underpriced because I lacked confidence. Customers who would have paid more were happy to pay less. This left money on the table and made the unit economics look worse than they should have.

### Change: better error handling

Skipping comprehensive error handling saved time up front but cost more later. Some balance between perfect error handling and none would have been smarter.

## The solo founder advantage

Building an MVP solo isn't about being a hero or proving you don't need help. It's about moving fast during the phase where speed matters most.

Once you've validated the concept, build the team. Once you have product-market fit, scale the organization. But in those early uncertain months, when you're searching for what works, there's value in being able to pivot instantly, ship daily, and iterate without coordination overhead.

Three months. One person. One product. Three customers. That's all it took to prove the idea was worth pursuing.

The rest is execution.

#### TL;DR: The Solo MVP Playbook

1.  Build solo for speed, not ego. Add co-founders after validation.
2.  Scope ruthlessly. One core value proposition, nothing else.
3.  Protect your coding time. Fixed blocks, no exceptions.
4.  Build the core loop first, infrastructure last.
5.  Use boring technology you know well.
6.  Start customer conversations before you start coding.
7.  Ship fast, iterate faster, perfect later.

Have questions about building your MVP or navigating the early startup journey? Reach out. I'm always happy to chat with founders who are in the trenches.

---
title: "Attributing Snowflake cost to the query that caused it"
description: "Snowflake bills compute by the second but tells you the total, not who spent it. Here is how I built per-query cost attribution from ACCOUNT_USAGE, what the numbers looked like, and the auto-suspend math that paid for the whole thing."
pubDate: 2025-01-26
category: "Engineering"
tags: ["engineering", "snowflake", "data-engineering", "cost-optimization"]
readingTime: "11 min read"
related: ["hotel-kpi-elt-pipeline", "durable-by-design"]
faq:
  - q: "How do you attribute Snowflake compute cost to a single query?"
    a: "Snowflake meters warehouses, not queries, so you reconstruct per-query cost from ACCOUNT_USAGE. QUERY_ATTRIBUTION_HISTORY now gives credits_attributed_compute per query directly, splitting a warehouse's credits across concurrent queries by weighted resource consumption. Before that view existed I joined QUERY_HISTORY to WAREHOUSE_METERING_HISTORY and apportioned each hour's credits across the queries that ran in it. Both miss sub-100ms queries and idle time, which you attribute separately."
  - q: "What is the single biggest Snowflake cost lever?"
    a: "Auto-suspend. A warehouse bills for the whole time it is running, including when it sits idle between queries, so an idle warehouse at a 10-minute suspend timeout burns credits doing nothing. Tightening idle warehouses to 60 seconds was the largest line-item saving I found, ahead of query rewrites."
  - q: "Where does Snowflake hide its cost data?"
    a: "The SNOWFLAKE.ACCOUNT_USAGE schema. WAREHOUSE_METERING_HISTORY for credits per warehouse per hour, QUERY_HISTORY for execution and bytes scanned, QUERY_ATTRIBUTION_HISTORY for per-query compute credits. Latency runs up to a few hours and history goes back 365 days."
  - q: "Why is a warehouse's credit cost hard to map to teams?"
    a: "Many teams share a warehouse, and the warehouse is the billing unit. Without per-query attribution you can only say the warehouse cost X, not which team or dashboard drove it. Reconstructing cost down to the query, then rolling it up by user, role, or query tag, is what makes a chargeback conversation possible."
---

**TL;DR.** Snowflake meters warehouses, not queries, so the bill grows in places nobody can be blamed for. I built SnowOptix to reconstruct cost down to the query from the `ACCOUNT_USAGE` schema, roll it up to a team or dashboard, and act on it. Two patterns produced almost all the savings: idle warehouses billing while doing nothing (fix the auto-suspend timeout), and a handful of runaway queries driving most of the compute. A representative result was 30 to 40% off compute spend in the first month, most of it from auto-suspend rather than query tuning.

Snowflake bills compute by the second and tells you the total. It does not tell you which query, which dashboard, or which team spent it. That gap is where the bill grows quietly, because nobody can be handed a number they caused.

I ran into this at a previous company where the Snowflake bill kept climbing while the workload did not. So I built a tool to attribute cost down to the query, called SnowOptix. This is the engineering behind it: where the cost data lives, how you reconstruct per-query cost from a system that only meters warehouses, and the numbers that came out.

SnowOptix later went through the Snowflake Native App Accelerator, which came with around $20K in Snowflake credits and support from the Snowflake startup team. A global top-3 consulting firm became a design partner, and a US pharmacy-benefits company ran it in production. But the interesting part is the mechanism, so let me start there.

## Why the bill is opaque by default

Snowflake's billing unit is the credit, and credits are consumed by virtual warehouses while they run. An X-Small warehouse burns 1 credit per hour, and each size up roughly doubles that: Small is 2, Medium 4, Large 8. On-demand credits run about $2 to $4 each depending on edition, cloud, and region. So an X-Small left running around the clock is roughly 730 credits a month, on the order of $1,500 to $2,900 at those rates. A Medium is four times that.

Two facts make the bill hard to reason about. First, a warehouse bills while it is running, not only while a query executes; an idle warehouse with a generous suspend timeout costs real money doing nothing. Second, the warehouse is the billing unit, but many teams, dashboards, and pipelines share one. The native cost view tells you a warehouse cost X this month. It does not tell you that 60% of X came from ten queries behind one dashboard. To say that, you have to rebuild cost from the bottom up.

## The cost data lives in ACCOUNT_USAGE

Everything you need is in the `SNOWFLAKE.ACCOUNT_USAGE` schema. The views that matter for cost:

- **`WAREHOUSE_METERING_HISTORY`**: credits consumed per warehouse, per hour. This is the source of truth for what you were billed.
- **`QUERY_HISTORY`**: every query, with its warehouse, start and end time, bytes scanned, and execution status. This is where behavior lives.
- **`QUERY_ATTRIBUTION_HISTORY`**: per-query compute credits, the view that did not exist when I started and changes the whole approach.

A caveat that bit me: this data is not real time. Latency on these views runs up to a few hours, so a cost dashboard built on them is a near-real-time view, not a live one. History goes back 365 days, which is plenty for finding patterns and nowhere near enough to be casual about retention if you want year-over-year.

## Reconstructing cost per query, two ways

The honest version of the story is that the right way to do this changed underneath me.

**The view that exists now.** `QUERY_ATTRIBUTION_HISTORY` exposes `credits_attributed_compute`: the warehouse credits used to execute a given query, including any resizing or multi-cluster autoscaling. For queries running concurrently on one warehouse, Snowflake splits the warehouse's credits across them by the weighted average of their resource consumption over each interval. That is exactly the apportionment problem you would otherwise have to solve yourself. If you are building this today, start here. Two limits to know: queries shorter than about 100ms are excluded, because they are too brief to attribute, and the view does not capture idle warehouse time, which is cost with no query attached at all.

**The way I had to do it first.** Before that view, you reconstructed per-query cost by joining `QUERY_HISTORY` to `WAREHOUSE_METERING_HISTORY` and apportioning each metered hour's credits across the queries that ran in that warehouse during that hour. Weight by execution time, or by a blend of execution time and bytes scanned for a closer estimate, since a query scanning terabytes loads the warehouse more than one scanning megabytes for the same wall-clock time. It is an approximation. Concurrency makes wall-clock time a noisy proxy for resource use, which is the exact thing the new view handles properly. But it was close enough to rank queries by cost and find the expensive ones, which is all you need to act.

Either way, the move that matters is the rollup. Once cost is attached to a query, you roll it up by the dimensions people own: user, role, query tag, or the dashboard a query belongs to. That is what turns "the warehouse cost X" into "your dashboard cost X," which is the sentence that changes behavior.

## What the numbers said

Two patterns produced almost all of the savings, and they are the two the native bill cannot show you.

**Idle warehouses, the bigger lever.** The largest single line item was warehouses running while idle. A warehouse set to suspend after 10 minutes of inactivity, queried in short bursts through the day, spends most of its metered time waiting. One warehouse idle the majority of an hour, at a Medium's 4 credits per hour, is most of $10 to $16 a day evaporating per warehouse, and there were many. The fix is unglamorous: drop the auto-suspend timeout on bursty warehouses to 60 seconds. The tradeoff is real, since a suspended warehouse has a cold start and the first query after a resume is slower, so I left interactive BI warehouses with a longer timeout and tightened the pipeline warehouses that run in scheduled bursts. Auto-suspend, not query tuning, was the top of the savings list.

**A few queries, most of the compute.** The classic shape held: a small set of queries drove a large share of attributed compute. Roughly the top 10 queries by `credits_attributed_compute` accounted for well over half of it, usually full-table scans behind a dashboard that refreshed too often, or a join with no pruning. These are findable only once cost is per-query. The native view says the warehouse was busy. The attribution says it was busy doing the same expensive scan 200 times a day.

Across idle-warehouse cleanup and the worst-offender query rewrites, a representative result was cutting compute spend on the order of 30 to 40% in the first month, most of it from auto-suspend. Treat that as representative rather than a promise; the exact figure depends entirely on how much idle time and how many runaway dashboards a given account has accumulated, and the accounts with the worst hygiene have the most to gain.

## Building it as a Snowflake-native app

The detail that makes this practical: the analysis should run where the data is. I built SnowOptix to run inside Snowflake rather than pulling `ACCOUNT_USAGE` out to an external system. Cortex covers the in-database AI and LLM work for turning raw findings into recommendations, and Snowpark Container Services runs containerized application logic inside the customer's Snowflake account. Keeping it native means the customer's cost and query metadata never leaves their account, which is the first question a security team asks, and the analysis sits next to the data instead of shipping gigabytes of query history over the wire to grade it.

Going through the Native App Accelerator forced that architecture to be real rather than a prototype, and the credits covered the compute the analysis itself consumed, which is its own small irony: a cost tool has a Snowflake bill.

## Key takeaways

Snowflake's cost model is simple to state and hard to manage: you pay for warehouse seconds, and the warehouse is too coarse a unit to assign blame. The whole game is getting from the warehouse down to the query and back up to the team.

- Cost data lives in `ACCOUNT_USAGE`. Start from `QUERY_ATTRIBUTION_HISTORY` for per-query credits and `WAREHOUSE_METERING_HISTORY` for the billed total.
- Attribute idle time separately. It is not in the per-query view and it is often the largest line item.
- Auto-suspend before query tuning. Tightening idle warehouses to 60 seconds is the cheapest large saving, with a cold-start tradeoff you tune per workload.
- Roll cost up to a dimension someone owns. A number nobody caused never gets fixed.

If you are staring at a Snowflake bill that grows faster than your workload, that gap between the total and the cause is where to look first.

---
title: "How to measure B2B event ROI"
description: "Events run 10-20% of a B2B marketing budget and most teams cannot prove the return. Here is a first-principles framework: sourced vs influenced pipeline, cost per opportunity, attribution windows, and payback."
pubDate: 2026-02-18
category: "Event marketing"
tags: ["event-marketing", "gtm", "measurement"]
readingTime: "12 min read"
related: ["technical-founder-sales", "raising-seed-round"]
tldr: "B2B events run 10 to 20% of the marketing budget and most teams cannot prove the return, not because events fail but because the measurement is anecdotal. Use a first-principles framework: a fully loaded cost denominator, sourced and influenced pipeline reported separately, an attribution window matched to your sales cycle, and cost per opportunity rather than cost per lead. The biggest hidden lever is follow-up speed, since most trade-show leads are never contacted and most of the rest are contacted late."
faq:
  - q: "What is the difference between sourced and influenced pipeline for an event?"
    a: "Sourced pipeline is opportunities whose first qualifying touch was the event, the new logos the event created. Influenced pipeline is open opportunities that had any event touch along the way, including ones already in motion. Report both. Sourced answers 'did this event create new pipeline,' influenced answers 'did it help move existing deals,' and conflating them is how teams either overclaim or undersell the same event."
  - q: "What is a reasonable cost per opportunity for a B2B event?"
    a: "Divide fully loaded event cost by sourced opportunities. On a representative $170K conference that yields ~15 opportunities, that is around $11K per opportunity. Whether that is good depends on deal size and win rate: at a $50K average deal and a 20% win rate, you need roughly three closed deals to break even on sourced pipeline alone."
  - q: "How long should the attribution window be for an event?"
    a: "Match it to your sales cycle. A 90-day window on a 9-month cycle will systematically undercount event-sourced deals and make every event look like a failure. Set the window to roughly your median lead-to-close time, and report sourced pipeline at that horizon rather than at quarter-end."
  - q: "Why does follow-up speed dominate event ROI?"
    a: "Because most leads never get contacted and most of the rest get contacted late. Industry data puts un-followed-up trade show leads as high as 80%, and a large share of follow-ups arrive after six days. Leads contacted within 24 hours convert several times better. Speed is the cheapest lever on the whole funnel and the one most teams lose."
---

Two numbers. How much did your company spend on events last year, and how much pipeline can you attribute to that spend? Most B2B teams know the first to the dollar and can only wave at the second. That gap is expensive, because events run 10 to 20% of a B2B marketing budget, and 70% of B2B marketers report pressure to prove ROI they cannot currently measure.

The problem is not that events do not work. It is that most teams measure them with anecdotes. Here is the framework I use instead, built from first principles, with representative numbers you can swap for your own.

## Start with fully loaded cost

You cannot compute a return without an honest denominator, and most event cost accounting is dishonest by omission. A booth at a major conference is not the booth fee. A representative breakdown:

- Booth space: $50,000
- Booth design and build: $30,000
- Sponsorship package: $40,000
- Travel and accommodation, team of 8: $25,000
- Materials and giveaways: $10,000
- Dinners and entertainment: $15,000
- **Total: $170,000**

Two costs people leave out and should not. First, the team's time: eight people for a week is real salary, and if you are comparing channels it belongs in the number. Second, the pre-event and post-event labor, which is where most of the hidden cost hides. Use fully loaded cost as the denominator for everything that follows.

## Sourced vs influenced pipeline: report both

This is the distinction that decides whether your measurement is honest. They answer different questions and teams constantly conflate them.

**Sourced pipeline** is opportunities whose first qualifying touch was the event. These are the deals the event created that would not otherwise exist. This is the strict, conservative number, and it is the one to lead with because it is hardest to argue with.

**Influenced pipeline** is any open opportunity that had at least one event touch anywhere in its history, including deals already in motion before the event. This is a larger, softer number. It is legitimate, since a booth conversation can revive a stalled deal, but it is also where teams overclaim, because a single badge scan should not get full credit for a deal that was already closing.

Report both, labeled, every time. Sourced answers "did this event create new pipeline." Influenced answers "did it help move what we already had." A team that only reports influenced is flattering itself. A team that only reports sourced is underselling events that mostly accelerate existing deals, which many enterprise events do.

```mermaid
flowchart TD
    D["Open opportunity with an event touch"] --> Q{"Was the event the first<br/>qualifying touch?"}
    Q -->|Yes| S["Sourced pipeline<br/>event created this deal"]
    Q -->|"No, deal already in motion"| I["Influenced pipeline<br/>event helped move it"]
    S --> R["Report both, labeled, every time"]
    I --> R
```

> A team that only reports influenced pipeline is flattering itself; one that only reports sourced is underselling the same event.

## Pick an attribution window that matches your sales cycle

The most common way teams accidentally prove events do not work is measuring on the wrong clock. If your median lead-to-close is nine months and you judge an event at quarter-end, you are counting the deals that have not had time to close yet as zeros.

Set the attribution window to roughly your median sales cycle and report sourced pipeline at that horizon, not at the calendar boundary that happens to come next. A 90-day snapshot of a 9-month-cycle business systematically makes every event look like a failure, which then gets used to cut the events that were working. Decide the window before the event, write it down, and judge every event on the same clock so you are comparing like with like.

[Last-touch attribution](https://en.wikipedia.org/wiki/Attribution_(marketing)) makes this worse: 67% of B2B teams still credit only the final interaction before conversion, which erases the event entirely from any deal that had a later touch. If you can run multi-touch, do, even a simple even-weighted model across touches beats last-touch for crediting events fairly.

## The funnel, with realistic numbers

Take the $170K conference. Say you capture 200 leads, which is $850 per lead, fine for enterprise B2B where deals are large. Then the funnel does its damage, and the damage is mostly self-inflicted.

Industry data is blunt here. Up to 80% of trade show leads never receive any follow-up at all. Of the leads that do get worked, a large share are contacted late: roughly 38% of exhibitors take longer than six days. Trade show lead-to-opportunity conversion ranges from about 1% to 10% depending almost entirely on follow-up execution.

So 200 leads, worked well, become maybe 15 to 20 opportunities. Worked the industry-average way, far fewer.

```mermaid
flowchart TD
    L["200 leads captured<br/>$850 per lead"] --> F{"Followed up fast?"}
    F -->|"Yes, within 24h"| O["15 to 20 sourced opportunities"]
    F -->|"No, late or never<br/>up to 80% never contacted"| X["Far fewer opportunities"]
    O --> C["~3 closed deals<br/>$50K deal, 20% win rate"]
    C --> P["Payback = closed-won revenue / fully loaded cost"]
```

At 15 sourced opportunities, $170,000 of fully loaded cost is about **$11,000 per opportunity**. Whether that is good depends on the deal math: at a $50,000 average deal and a 20% win rate, those 15 opportunities yield 3 closed deals worth $150,000, which barely covers the event before you count influenced pipeline and renewals. Move the win rate to 30% or the deal size to $75,000 and the same event is clearly profitable. The point is not the specific numbers, which are representative. The point is that the funnel, not the event, is where the return is won or lost.

## Payback and the metrics that move it

Roll it into one number per event: payback. Closed-won revenue attributable to the event, sourced first and influenced as a labeled second line, divided by fully loaded cost. Track it per event so you can compare a $170K flagship conference against a $20K regional show on the same basis, because the small show often wins on cost per opportunity and never gets credit for it.

Three levers move payback more than anything else, and the cheapest one is the one teams lose.

- **Follow-up speed.** This is the highest-leverage and lowest-cost lever in the entire funnel. Most leads are never contacted and most of the rest are contacted late. Leads contacted within 24 hours convert several times better than those contacted a week later. Draft the follow-up before the event and send within hours, not days.
- **Pre-booked meetings.** The teams with the best event ROI book a large share of their meetings before the event starts rather than hoping for booth traffic. That requires identifying target accounts attending and reaching out 4 to 6 weeks ahead, not 4 to 6 days.
- **Lead quality over lead count.** Cost per lead flatters volume. Cost per opportunity rewards fit. A booth that captures 80 well-qualified leads beats one that scans 300 badges, and only the per-opportunity number shows it.

## What to instrument

To run this framework you need three things wired up before the event, not improvised after:

1. A consistent way to tag every event lead at capture, so sourced and influenced are queryable later instead of reconstructed from memory.
2. An attribution window and model decided in advance and applied uniformly, so events are compared on the same clock and the same credit rules.
3. A follow-up process that starts within hours, because the measurement is only as good as the funnel it measures, and a fast funnel is the single change that most improves the number you are trying to prove.

Events deserve the same rigor as the other 80% of the budget. Most teams apply none of it, which is exactly why the ROI looks unprovable. It is not unprovable. It is unmeasured.

## Key takeaways

- Use fully loaded cost as the denominator. Booth fee plus build, sponsorship, travel, team time, and pre- and post-event labor, not just the line item on the invoice.
- Report sourced and influenced pipeline separately, labeled. Sourced answers "did the event create new pipeline," influenced answers "did it move existing deals," and conflating them either overclaims or undersells.
- Match the attribution window to your sales cycle. Judging a 9-month-cycle business at quarter-end counts deals that have not had time to close as zeros.
- Measure cost per opportunity, not cost per lead. Lead count flatters volume; per-opportunity cost rewards fit and is what ties to the deal math.
- Follow-up speed is the cheapest, highest-leverage lever. Most leads are never contacted and many are contacted late, while leads worked within 24 hours convert several times better. Draft the follow-up before the event.
- Instrument before the event, not after: consistent lead tagging at capture, a window and model decided in advance, and a follow-up process that starts within hours.

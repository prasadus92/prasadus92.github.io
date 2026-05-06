---
slug: "alfred-solo-founder-operating-system"
title: "How Alfred Runs Recurring Work for a Solo Founder"
description: "Alfred is the agent layer around my recurring company work. Here is what it actually does, what it does not do, and what I plan to open source."
date: "2026-05-06"
modified: "2026-05-06"
category: "Solo Builder OS"
readTime: "12 min read"
tags: ["Alfred", "solo founder", "AI agents", "operating system", "open source"]
faqs:
  - question: "What is Alfred?"
    answer: "Alfred is the name I use for the recurring-agent layer around my work at Luminik. It runs scheduled jobs that read approved context, prepare reviewable output, and surface decisions to me in Slack and WhatsApp. It does not publish, send, merge, or pay on its own."
  - question: "Does Alfred ship code or content without review?"
    answer: "No. Every consequential output is a draft, a pull request, or a digest in a private review channel. The approval gate is explicit so the agent layer never outruns founder judgment."
  - question: "What does Alfred actually run today?"
    answer: "Six roles across engineering, content, community, sales, product ops, and a personal-assistant chief-of-staff role. They handle pipeline briefs, PR review, repo hygiene, scheduled site checks, content drafts, and morning summaries."
  - question: "What might be open sourced?"
    answer: "The reusable parts: role contracts, repo instruction templates, review rules, output formats, and a small local runner. The Luminik-specific connectors and customer data stay private."
---
<p class="reveal">
  I build a software product on my own. That means the company has no PM remembering why a roadmap shifted, no RevOps reconciling event spend, no eng manager spotting drift between specs and production. All of that work still has to happen. None of it can wait until I get to it.
</p>

<p class="reveal">
  Alfred is the answer I have been building for the last few months. It is the agent layer that runs recurring company work, drafts the output, and brings the decisions back for my review. The product code, customer relationships, and judgment stay with me. Everything else is fair game for an agent with a clear contract.
</p>

<p class="reveal">
  This post explains what Alfred actually runs today, the rules that make the system safe enough to trust, and the parts I am preparing to open source for other solo founders.
</p>

<figure class="post-visual reveal">
  <div class="post-visual-title">Alfred at a glance</div>
  <div class="visual-matrix">
    <div class="matrix-cell">
      <strong>Reads approved context</strong>
      <span>Repo instruction files, public positioning, specs, brand canon, and a private knowledge base I curate.</span>
    </div>
    <div class="matrix-cell">
      <strong>Prepares reviewable output</strong>
      <span>Pull requests, post drafts, pipeline digests, code review comments, and scheduled site QA reports.</span>
    </div>
    <div class="matrix-cell">
      <strong>Never ships silently</strong>
      <span>No publishing, sending, merging, paying, or deploying without my explicit approval, every time.</span>
    </div>
    <div class="matrix-cell">
      <strong>Cites its sources</strong>
      <span>Every claim that depends on data points to a file, PR, log, or note. If a number is fabricated, it is a bug.</span>
    </div>
  </div>
  <p class="post-visual-caption">A useful agent system makes accountability boring. Alfred is mostly contract, not magic.</p>
</figure>

<h2 class="reveal">The Six Roles Alfred Runs</h2>

<p class="reveal">
  Alfred is not one big agent. It is a small set of roles, each with a contract that fits one slice of the company. Most of them run as scheduled jobs. A few are triggered by GitHub events on the repos that matter.
</p>

<p class="reveal">
  Today there are six roles in production. The names come from a Batman bench I keep in my head, which is mostly a way to make Slack channel routing easy to remember.
</p>

<h3 class="reveal">Lucius. Engineering</h3>

<p class="reveal">
  Lucius reviews open pull requests across the Luminik repos and writes the comments I would write if I had time to read every diff. The comments are usually about behaviour, not style. Style is what CodeRabbit covers, and the two run side by side. Lucius opens roughly a handful of PRs a day on its own with small, scoped patches: stale doc fixes, repo instruction updates, broken-link cleanups, missing tests on changed lines.
</p>

<p class="reveal">
  The cap is one PR per run, focused on changes from the last week. Lucius is allowed to read code and tests. It is not allowed to merge, force-push, or change production behaviour.
</p>

<h3 class="reveal">Bane. Content</h3>

<p class="reveal">
  Bane writes LinkedIn drafts twice a week against a themes file I update when my priorities change. It reads the voice rules, recent posts, and the current launch context. The output lands as a pull request in my private content repo with the post body, the first comment, and a numbers-grounding note that traces every figure to a real source.
</p>

<p class="reveal">
  I review the PR in GitHub, request changes inline, then merge. Posting still happens by hand because LinkedIn rewards the original drafter. Bane saves me the cold-start cost, not the publishing decision.
</p>

<h3 class="reveal">Oracle. Community and signals</h3>

<p class="reveal">
  Oracle watches Reddit threads, Slack communities, and a few public newsletters every two hours during the working week. It produces a short digest of the threads worth reading and the ones I should reply to as a founder. The digest never quotes private channels. It always links to the source. I open it once or twice a day.
</p>

<h3 class="reveal">Ra's al Ghul. Sales</h3>

<p class="reveal">
  Ra's drafts the morning pipeline brief: which prospects moved, which replies need a human response, which event registrations expire this week. The brief is six bullets and a short list of follow-ups. Replies still go out from my inbox, in my voice, after I have read the thread.
</p>

<p class="reveal">
  Sales is the role where the temptation to automate too much is highest, and the cost of doing so is the worst. A wrong inbound reply burns a real prospect. Ra's stays draft-only on purpose.
</p>

<h3 class="reveal">Bat-Signal. Product and customer ops</h3>

<p class="reveal">
  Bat-Signal does the boring uptime work. It checks production health on a tight schedule, runs site QA on luminik.io and prasad.tech once a day, validates that integrations are still alive, and drafts release notes from the merged commits in the engineering repos. When something is broken, it pings me with the specific error and a link to the failing run. When nothing is broken, I do not hear from it.
</p>

<h3 class="reveal">Alfred itself. Chief of staff</h3>

<p class="reveal">
  Alfred is the personal-assistant role on top of the others. It handles the morning inbox triage, calendar conflict detection, the daily digest that pulls together the other roles, and the briefings that reach me when I am not at my desk. It is the surface that turns five other agents into one place I check.
</p>

<figure class="post-visual reveal">
  <div class="post-visual-title">Where Alfred fits in a working day</div>
  <div class="swimlane">
    <div class="swimlane-row">
      <div class="swimlane-label">Without Alfred</div>
      <div class="swimlane-cells">
        <div class="swimlane-cell">Remember every recurring task</div>
        <div class="swimlane-cell">Re-find the right context each time</div>
        <div class="swimlane-cell">Do the mechanical work</div>
        <div class="swimlane-cell">Review while already tired</div>
      </div>
    </div>
    <div class="swimlane-row">
      <div class="swimlane-label">With Alfred</div>
      <div class="swimlane-cells">
        <div class="swimlane-cell">Task is captured in a role contract</div>
        <div class="swimlane-cell">Context is cited and current</div>
        <div class="swimlane-cell">Output arrives as a draft or PR</div>
        <div class="swimlane-cell">Founder reviews the decision</div>
      </div>
    </div>
  </div>
  <p class="post-visual-caption">The point is not to remove me from the loop. The point is to stop spending founder attention on rediscovering context I already know.</p>
</figure>

<h2 class="reveal">The Five Questions a Role Has to Answer</h2>

<p class="reveal">
  Before a new Alfred role goes live, I make it answer five questions in writing. The questions live in the repo as the role's instruction file, and the agent has to follow them. If any of the answers are vague, the role is not ready.
</p>

<ol class="reveal">
  <li><strong>What context can it read?</strong> Specific files, repos, public docs, and any private notes that are safe for the task. No ambient access.</li>
  <li><strong>What action can it take?</strong> Search, summarize, draft, open a PR, post to a private review channel. Never publish, send, pay, merge, or deploy.</li>
  <li><strong>Where does the output land?</strong> A pull request, a Slack thread, a markdown file, or a digest. Everything has a path I can find without asking.</li>
  <li><strong>What evidence does it provide?</strong> Source links, PR numbers, log lines, file paths. A claim with no provenance is a bug.</li>
  <li><strong>What requires my approval?</strong> The line between draft and ship. I want this line obvious enough that a tired founder cannot accidentally cross it.</li>
</ol>

<p class="reveal">
  I use the same five questions to decide whether a role is still earning its keep. Two of my early agents got retired because I could not write a clean answer to question two. They were doing too much.
</p>

<h2 class="reveal">What Has Actually Worked</h2>

<p class="reveal">
  The system has been running long enough to see the shape of what helps and what does not.
</p>

<p class="reveal">
  Lucius is the role I would not give up. The pull-request commentary on Luminik repos catches behaviour bugs that I would have missed at the end of a long day. Most days it flags fewer issues than CodeRabbit. The ones it flags are usually the ones I act on.
</p>

<p class="reveal">
  Bane has changed how I write online. Not the words, the queue. Two LinkedIn drafts a week sit in PRs waiting for me, and the cold-start cost drops to zero. The drafts are not always good. They are always close enough to argue with, which is the point.
</p>

<p class="reveal">
  Bat-Signal is the role I notice least, which is the right outcome for an uptime agent. The scheduled site checks have caught a couple of regressions on luminik.io before any customer would have, including one where a sitemap stopped including freshly published posts.
</p>

<p class="reveal">
  Oracle is the role I trust least so far. Community signal is genuinely hard to summarize without losing nuance, and the digests are still hit and miss. I read them with a higher skepticism floor than I read Lucius output.
</p>

<h2 class="reveal">What Has Not Worked</h2>

<p class="reveal">
  The first version of Alfred tried to do customer support drafts. It was wrong. Customer-facing replies are not a place where draft-then-review saves me time. Reading the thread well enough to approve a draft costs about the same as writing the reply. I retired that role and have not missed it.
</p>

<p class="reveal">
  The second mistake was over-fitting Bane to a specific post format. The drafts were on-voice for the last post I shipped, then drifted whenever I changed topic. I rewrote the role to read the themes file and the latest two real posts before drafting, instead of caching a style profile. The drafts got better.
</p>

<p class="reveal">
  The third was running scheduled jobs on my laptop. They worked until they did not, because solo builders close their laptops and travel. I moved the recurring jobs to a small always-on machine at home. The boundary between my development machine and the agent runtime is its own post.
</p>

<h2 class="reveal">What I Plan to Open Source</h2>

<p class="reveal">
  Alfred itself will not be open source any time soon. The role contracts, the private knowledge base, and the company-specific connectors are entangled in ways that would leak Luminik internals if I tried to release the whole thing.
</p>

<p class="reveal">
  The reusable parts are different. Other solo founders running similar setups end up rebuilding the same scaffolding I did. There is no reason to keep that scaffolding private. I am preparing a public version that includes the patterns without the company.
</p>

<ul class="reveal">
  <li><strong>Role contracts.</strong> Markdown templates that answer the five questions for engineering, content, sales, ops, and chief-of-staff roles.</li>
  <li><strong>Repo instruction templates.</strong> Public-safe examples of CLAUDE.md, AGENTS.md, and content-guide files for solo product teams.</li>
  <li><strong>Review rules.</strong> The approval gates I use for shipping code, content, sales replies, and money.</li>
  <li><strong>Output formats.</strong> Concise summaries, source-linked digests, PR notes, and the morning briefing shape.</li>
  <li><strong>A local runner shape.</strong> Enough structure for scheduled jobs and reviewable output without my private adapters.</li>
</ul>

<p class="reveal">
  The release will be patterns first, code second. A solo founder can adopt the role contracts and run them inside Claude Code, Cursor, or any agent harness they prefer. The harness is replaceable. The contracts are what stay.
</p>

<figure class="post-visual reveal">
  <div class="post-visual-title">Path to a public Alfred</div>
  <div class="visual-flow">
    <div class="visual-step">
      <span class="visual-step-label">Extract</span>
      <strong>Separate contracts from context</strong>
      <span>Keep the reusable role rules. Remove Luminik-specific data.</span>
    </div>
    <div class="visual-step">
      <span class="visual-step-label">Harden</span>
      <strong>Make approval gates default</strong>
      <span>Draft, PR, and review are the starting behaviour for every role.</span>
    </div>
    <div class="visual-step">
      <span class="visual-step-label">Document</span>
      <strong>Show safe examples</strong>
      <span>Public-safe templates, diagrams, and setup notes other solo founders can adapt.</span>
    </div>
    <div class="visual-step">
      <span class="visual-step-label">Release</span>
      <strong>Start with the boring core</strong>
      <span>Local checks, role contracts, and review rules before any hosted automation.</span>
    </div>
  </div>
</figure>

<h2 class="reveal">The Standard I Use Now</h2>

<p class="reveal">
  After a few quiet failures and a few useful surprises, the rule I keep coming back to is simple. Alfred is good when its work is reviewable, source-linked, and bounded. It is bad when I notice it deciding things I should be deciding.
</p>

<p class="reveal">
  Solo builders do not need agent theatre. They need a way to make recurring work visible, source-linked, and reviewable, while keeping the founder responsible for the decisions that matter. The agent layer is not the product. The contract is.
</p>

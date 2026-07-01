---
version: alpha
name: prasad.tech
description: >
  Personal site of Prasad Subrahmanya. A calm, content-first, AI-native
  aesthetic: a single magenta to violet aurora, restrained glassmorphism,
  and a sharp 2px radius. Built in Astro with near-zero client JS.

# Machine-readable tokens. Source of truth lives in src/styles/tokens.css;
# this frontmatter mirrors it. If the two ever disagree, tokens.css wins.

colors:
  # Brand
  primary: '#f63e8c'          # Luminik magenta, the signature accent (dark)
  primary-light: '#d81b6e'    # accent in light mode (darkened for AA)
  secondary: '#7c6cff'        # indigo-violet, the only second hue
  accent-violet: '#9a7dff'    # in-family violet for depth, never a 3rd hue
  accent-ink: '#ffffff'       # text on a solid accent fill
  # Dark theme (default)
  dark-bg: '#06080d'
  dark-bg-2: '#090c13'
  dark-bg-elevated: '#0d111b'
  dark-ink: '#eef2f8'
  dark-text-secondary: '#b6c0d0'
  dark-text-tertiary: '#9ba5b6'
  # Light theme
  light-bg: '#f7f8fb'
  light-bg-2: '#eef1f7'
  light-bg-elevated: '#ffffff'
  light-ink: '#101522'
  light-text-secondary: '#313a49'
  light-text-tertiary: '#3f4856'

typography:
  font-display: "'Instrument Sans Variable', ui-sans-serif, system-ui, sans-serif"
  font-body: "'Quicksand Variable', ui-sans-serif, system-ui, sans-serif"
  font-mono: "'Fragment Mono', ui-monospace, Menlo, monospace"
  # Fluid scale (clamp: min, preferred, max)
  fs-display: 'clamp(2.6rem, 1.6rem + 4.4vw, 5.2rem)'
  fs-h1: 'clamp(2.1rem, 1.4rem + 3.1vw, 3.9rem)'
  fs-h2: 'clamp(1.7rem, 1.25rem + 1.9vw, 2.7rem)'
  fs-h3: 'clamp(1.25rem, 1.05rem + 0.85vw, 1.6rem)'
  fs-h4: 'clamp(1.05rem, 0.97rem + 0.4vw, 1.25rem)'
  fs-lead: 'clamp(1.1rem, 1.0rem + 0.5vw, 1.4rem)'
  fs-body: '1.0625rem'
  fs-sm: '0.9rem'
  fs-xs: '0.78rem'
  lh-tight: '1.06'
  lh-snug: '1.22'
  lh-body: '1.72'
  tracking-tight: '-0.022em'
  tracking-snug: '-0.012em'
  tracking-wide: '0.05em'

spacing:
  # 8pt-ish step scale
  sp-1: '4px'
  sp-2: '8px'
  sp-3: '12px'
  sp-4: '16px'
  sp-5: '24px'
  sp-6: '32px'
  sp-7: '48px'
  sp-8: '64px'
  sp-9: '96px'
  sp-10: '128px'
  sp-11: '176px'
  # Shared rhythm (the neatness layer; see Layout & Spacing)
  card-pad: 'clamp(24px, 2.4vw, 36px)'   # interior padding of glass cards
  grid-gap: 'clamp(16px, 1.6vw, 20px)'   # gap between sibling cards
  rail-pad: 'clamp(28px, 4vw, 56px)'     # sub-block separation in a section
  head-gap: 'clamp(40px, 5vw, 64px)'     # section header -> content
  gutter: 'clamp(20px, 5vw, 40px)'       # page side padding
  container: '1200px'
  container-narrow: '920px'
  container-prose: '760px'

rounded:
  # Deliberately sharp. Revyl-style restraint: large surfaces stay near-square.
  xs: '2px'
  sm: '2px'
  md: '2px'
  lg: '2px'
  xl: '2px'
  pill: '2px'
  btn: '2px'

motion:
  ease-out: 'cubic-bezier(0.16, 1, 0.3, 1)'
  ease-in-out: 'cubic-bezier(0.65, 0, 0.35, 1)'
  ease-spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  dur-1: '0.18s'   # taps, hovers
  dur-2: '0.32s'   # cards, panels
  dur-3: '0.55s'   # scroll reveals
  dur-4: '0.9s'    # ambient drift accents
---

# prasad.tech design system

This is the design source of truth for prasad.tech. It mirrors the runtime
tokens in `src/styles/tokens.css` and the base primitives in
`src/styles/global.css`. Read it before adding or changing any UI. When a value
here and a value in `tokens.css` disagree, `tokens.css` is correct and this file
should be updated to match.

The site is Astro 5, static output, near-zero client JS, self-hosted fonts.
Content is the product; the chrome stays out of the way.

## Overview

Four ideas drive every decision. When a choice is unclear, the one that serves
these wins.

1. **Calm.** One aurora, one accent family, one quiet motion language. The page
   should feel still even though it breathes. If an element competes with the
   text for attention, tone it down.
2. **Neat.** Spacing comes from a shared rhythm, not per-component guesses.
   Cards in different sections share the same padding, gap, and corner. Edges
   line up. The grid is felt, not seen.
3. **Content-first.** Type and whitespace carry the page. Color and effect are
   seasoning, used where they earn their place (a metric, a CTA, a link).
4. **Restrained gradient + glass.** The identity is a magenta to violet wash
   behind frosted glass surfaces. It is the signature, kept subtle so text on
   top of it stays readable at AA.

Reference bar: Stripe and Linear for polish, Giga (giga.ai) for restraint,
Revyl (revyl.com) for the sharp, structured grid. We do not out-decorate; we
out-tidy.

## Colors

Two hues, full stop: magenta (`primary`) and violet (`secondary`). A third
in-family violet (`accent-violet`) exists only to add depth to the aurora, never
as a distinct color. There is no amber, no green, no semantic rainbow.

- **Accent usage.** Magenta is for the things you should notice: a metric number,
  the primary button, an active link, the brand mark. Use it sparingly. If most
  of a section is accent-colored, none of it reads as accent.
- **Text on aurora.** Emphasized words use a **solid** accent color
  (`--accent`), not a gradient fill, so they stay crisp over the moving
  background. Gradient text (`--grad-text`) is reserved for large display type
  where legibility is not at risk.
- **Light mode is darker on purpose.** The light accent (`#d81b6e`) and the
  text colors are darkened from a naive tint so they hold AA contrast over the
  light aurora wash. Do not lighten them back.
- **Theme switching** is driven by `data-theme="light|dark"` on `<html>`. Every
  color is a token that flips per theme; never hard-code a hex in a component.

Gradients (tokens): `--grad-brand` (buttons, brand mark, the now-node),
`--grad-text` (display gradient text), `--grad-halo` (soft radial glow behind
feature panels).

## Typography

- **Display / headings:** Instrument Sans Variable, weight 600, tight tracking.
- **Body:** Quicksand Variable, line-height 1.72 for long-form comfort.
- **Mono:** Fragment Mono, for eyebrows, labels, dates, periods, code. Mono +
  `tracking-wide` + `text-tertiary` is the house "label" treatment (eyebrows,
  kickers, "Earlier", "Pipeline sourced at", footer column heads).
- **Scale is fluid.** Use the `--fs-*` tokens; they clamp between a mobile min
  and a desktop max so nothing needs per-breakpoint font sizes.
- **Sentence case everywhere.** Headings, nav, buttons, labels. Capitalize only
  the first word plus proper nouns and acronyms. (This is a hard content rule;
  see CLAUDE.md.)
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. Cap line
  length with `ch` units (leads at ~60ch, body at ~70ch).

## Layout & spacing

This is the neatness layer. The whole site reads as one family because four
shared tokens carry the rhythm instead of each component inventing its own
clamp.

| Token | Value | Use |
| --- | --- | --- |
| `--card-pad` | `clamp(24px, 2.4vw, 36px)` | interior padding of every glass card |
| `--grid-gap` | `clamp(16px, 1.6vw, 20px)` | gap between sibling cards in a grid or stack |
| `--rail-pad` | `clamp(28px, 4vw, 56px)` | separating a sub-block inside a section (e.g. the brand row, "Earlier") |
| `--head-gap` | `clamp(40px, 5vw, 64px)` | section header to its content |

Inside a card, vertical rhythm steps through the `--sp-*` scale, not raw px:
kicker, then `--sp-4` to the metric, `--sp-4` to the body, `--sp-5` to the tags.
Same steps in every card so the eye finds the same cadence everywhere.

- **Containers:** `.container` (1200), `.container--narrow` (920),
  `.container--prose` (760). Side padding is always `--gutter`.
- **Sections:** `.section` owns the vertical band (`clamp(64px, 9vw, 130px)`
  block padding). A section never sets its own outer margins; let `.section` and
  the shared tokens do it.
- **Grids degrade predictably:** 3-up → 2-up at ~900px → 1-up at ~560px. The
  12-column Impact grid collapses to a single column at 900px.

Why these values: premium product pages (GitHub's stat row, Customer.io and
Revolut metric cards, Linear's blog grid) win on consistency, not novelty. Equal
gaps, equal padding, aligned tops, hairline dividers. The tokens above encode
that so it is automatic.

## Elevation & depth

Depth is glass and shadow, not heavy borders.

- **Shadows** are soft and directional (`--shadow-sm/md/lg`). Cards rest on
  `--shadow-md`; on hover they gain `--shadow-glow` (a 1px accent ring plus a
  low magenta glow). No hard drop shadows.
- **The glass recipe** (`.glass`): a near-transparent fill (`--glass-bg`), a 1px
  hairline border (`--glass-border`), `backdrop-filter: blur(16px)
  saturate(140%)`, and a top inner highlight drawn with a masked
  `::before` for the premium frosted edge. In light mode the glass is mostly
  white (`rgba(255,255,255,0.6)`) so it reads as frosted, not dim.
- **Interactive cards** (`.card`) add a cursor-follow radial glow (`::after`)
  and a border-color lift on hover. Keep the glow soft (`--glow-soft`); it is a
  hint, not a spotlight.
- **Layer order** (z-index tokens): aurora at `--z-bg` (0), content at
  `--z-base` (1), nav at `--z-nav` (60), overlays at `--z-overlay` (80).

## Shapes

Sharp. Every `--r-*` token is `2px`. Large surfaces (cards, panels, the
portrait, images) read as near-square; small controls get the same intentional
2px so nothing looks accidentally rounded. This is the Revyl-style structural
feel. Do not introduce pill shapes or large radii; if something needs softening,
soften it with spacing or a hairline, not a corner.

The grid / square motif (`.grid-backdrop`, the `--grid-cell` 56px lattice) and
the connector lines in the system diagram reinforce the same orthogonal
language.

## Motion

Quiet and purposeful. Motion confirms an action or adds slow ambient life; it
never demands attention.

- **Durations:** `--dur-1` (0.18s) for taps/hovers, `--dur-2` (0.32s) for
  cards/panels, `--dur-3` (0.55s) for scroll reveals.
- **Easing:** `--ease-out` for entrances and most transitions; `--ease-spring`
  only for playful micro-moments.
- **Scroll reveal:** elements fade and rise 22px via `.reveal` (+ `.reveal-d1..5`
  for staggered children). The hidden state is gated under `html.js`, so if JS
  is slow or off, content is always visible. IntersectionObserver lives in
  `src/scripts/motion.ts`.
- **Reduced motion:** every animation (aurora, shimmer, floaty chips, scroll
  bob, reveals) collapses under `@media (prefers-reduced-motion: reduce)`.
  Anything new with motion must honor this.

## The aurora

The single ambient background, rendered once in `BaseLayout` behind all content
(`.ambient`). It is the identity, so it stays calm.

- Three blurred radial blobs (`.a1` magenta, `.a2` violet, `.a3` faint in-family
  violet) drift slowly on long loops (28–40s), blurred to 120px,
  `mix-blend-mode: screen` in dark.
- A faint conic `.shimmer` rotates over 70s for subtle life; a 4% `.noise`
  layer kills banding.
- **Light mode** flips to `mix-blend-mode: multiply` at low opacity (~0.16) so
  the page reads as a near-white wash, never muddy.
- **Mobile** pulls the blobs toward the top edge and lowers opacity so hero text
  stays readable.
- Keep it two-hue and low-opacity. Adding blobs, raising opacity, or introducing
  a new color breaks "calm" faster than anything else on the site.

## Components

Shared primitives live in `global.css`; section components compose them.

- **`.glass`** — the frosted surface. Base for every card and panel.
- **`.card`** — `.glass` plus hover glow and border lift. Use for anything
  interactive or that should feel liftable.
- **`.btn`** — `.btn-primary` (gradient fill, glow, the only loud button) and
  `.btn-ghost` (glass, hairline border). One primary per view.
- **`.chip`** — mono tag for tech stack and categories.
- **`.eyebrow`** — mono label with a short accent tick before it; opens most
  sections via `SectionHeader`.
- **`SectionHeader.astro`** — eyebrow, h2, optional lead. Owns `--head-gap`
  below itself and the eyebrow→title (`--sp-3`) / title→lead (`--sp-4`) rhythm.
  Use it for every section so headers are identical site-wide.

## Do's and don'ts

**Do**

- Reach for `--card-pad`, `--grid-gap`, `--head-gap`, and the `--sp-*` scale
  before typing a raw pixel value.
- Compose `SectionHeader` + `.section` + `.container` for new sections so they
  inherit the rhythm for free.
- Keep one accent moment per region (a number, a button, a link).
- Test at 390 / 768 / 1440 in both themes before calling a change done; check for
  horizontal overflow and that the hero still fits one viewport.
- Reference a premium product (via Mobbin) before designing a new component.

**Don't**

- Don't hard-code hex colors or font sizes in a component; use tokens.
- Don't invent a per-component padding/gap clamp when a shared token fits.
- Don't add a third hue, a larger radius, or a second loud button.
- Don't raise aurora opacity or add blobs to "make it pop." Calm is the look.
- Don't gate content visibility on JS without an `html.js` fallback, and don't
  ship motion without a reduced-motion path.

## How to add a component

1. **Find a reference.** Search Mobbin for the closest premium pattern (e.g.
   "stat card", "blog index cards", "footer"). Match its restraint, not its
   decoration.
2. **Compose primitives.** Start from `.glass` / `.card`, wrap in `.container`,
   open with `SectionHeader` if it is a section.
3. **Use the rhythm tokens.** `--card-pad` for interior padding, `--grid-gap`
   between siblings, `--sp-*` for internal vertical steps, `--head-gap` below the
   header. No raw px unless nothing in the scale fits.
4. **Theme + motion.** Colors via tokens so both themes work. Any animation gets
   a `prefers-reduced-motion` exit; any reveal gets an `html.js` fallback.
5. **Verify.** `npm run build` must pass. Then view at 390 / 768 / 1440 in light
   and dark: no overflow, edges aligned, one accent moment, calm.

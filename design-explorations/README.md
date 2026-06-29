# Design explorations

This folder holds **alternate design directions** for prasad.tech that are kept
in the repo for reference and iteration, but are **not part of the live site**.
Nothing here is built or deployed: Astro only builds pages under `src/pages/`,
and these files live outside that tree on purpose.

## v2 — editorial / "Sakura" theme

A second take on the same content with a Japanese-editorial feel: light-first,
strong typographic structure, restrained gradients used in only a few sections,
and a dark closing call-to-action. It is fully self-contained: `v2.astro` renders
through `EditorialLayout.astro`, which does **not** pull in the live site's
`BaseLayout`, nav, footer, aurora background, or global motion script, so the two
designs stay isolated.

Files:

- `v2.astro` — the page (reads content from `src/data/site.ts`, so copy stays in sync)
- `EditorialLayout.astro` — its standalone layout and palette

### Preview it locally

These files reference `../data/site` and `../styles/fonts.css`, so they run as-is
once copied back under `src/`. From the repo root:

```bash
cp design-explorations/EditorialLayout.astro src/layouts/EditorialLayout.astro
cp design-explorations/v2.astro src/pages/v2.astro
npm run dev    # then open http://localhost:4321/v2
```

### Stop serving it again (before committing / shipping)

```bash
rm src/pages/v2.astro src/layouts/EditorialLayout.astro
```

Keep `design-explorations/` as the source of truth. If you change the design,
edit the copies under `src/` while previewing, then copy them back here:

```bash
cp src/pages/v2.astro design-explorations/v2.astro
cp src/layouts/EditorialLayout.astro design-explorations/EditorialLayout.astro
```

> Note: `v2.astro` reads from the shared `src/data/site.ts`, so any content edits
> on the live site flow into this draft automatically. Only the layout and styling
> are unique to v2.

# prasad.tech

[![Deploy](https://github.com/prasadus92/prasadus92.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/prasadus92/prasadus92.github.io/actions/workflows/deploy.yml)

The personal site of Prasad Subrahmanya: founder, engineer, and writer. It covers
what I have built (Luminik, Aura at Bain, Mainteny, Alfred) and deep technical
writing on AI-native engineering, agents, durable systems, and founder-led sales.

Live at [prasad.tech](https://prasad.tech).

## Stack

- **[Astro](https://astro.build) 7**, static output, near-zero client JS
- TypeScript, design tokens in CSS custom properties, self-hosted fonts
- Content collections for the blog (`src/content/blog/*.md`)
- KaTeX for math, mermaid for diagrams, Shiki for code highlighting
- Light/dark themes that follow the system preference
- Deployed to GitHub Pages via GitHub Actions

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
npm run preview  # serve the built site
```

Run `npm run build` from the repo root (the content glob base is relative to cwd).

## Structure

- `src/pages/` routes; `src/layouts/` page shells; `src/components/` UI
- `src/content/blog/` posts; `src/data/site.ts` single source of truth for site content
- `src/styles/tokens.css` design tokens; `src/styles/global.css` base styles
- `design-explorations/` alternate design drafts, not part of the live build

## License

- **Code** (`.astro`, `.ts`, `.css`, config, build scripts) is under the
  [MIT License](LICENSE). Reuse it freely, keep the copyright notice.
- **Content** (the writing and imagery: `src/content/`, the prose in
  `src/data/site.ts`, and `public/` images) is **© Prasad Subrahmanya, all rights
  reserved**, and separately offered under
  [Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/):
  you may share and adapt it for non-commercial use **with attribution** and a
  link back to [prasad.tech](https://prasad.tech). It is not for republishing as
  your own or for commercial use without permission (prasadus92@gmail.com).

Please don't pass off the writing or design as your own. If something here is
useful, credit it and link back.

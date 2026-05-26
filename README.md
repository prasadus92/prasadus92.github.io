# prasad.tech

Personal portfolio and blog for Prasad Subrahmanya, built with Astro.

## Overview
- **URL**: [prasad.tech](https://prasad.tech)
- **Stack**: Astro, Markdown content, native HTML/CSS diagrams, progressive client-side motion
- **Audience**: Solo technical builders and technical founders
- **Theme**: Dark/light mode with system preference detection
- **Responsive**: Designed for desktop, tablet, and mobile

## Features
- Astro layouts for homepage, blog index, and posts
- Preserved article URLs at `/blog/{slug}.html`
- Native diagrams for workflows, matrices, ledgers, timelines, and system maps
- Progressive reveal/parallax effects with reduced-motion support
- RSS feed, generated sitemap, `robots.txt`, `llms.txt`, canonical URLs, and JSON-LD schema
- Per-page Markdown mirrors advertised from the HTML head for AI crawlers and assistants
- Content focused on Luminik, solo product engineering, founder-led sales, event pipeline, and zero-to-one lessons
- Public Alfred OS references, with private Luminik operating details kept out of the repo
- Google Analytics integration gated by an opt-in cookie banner

## Local Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build and validate:

```bash
npm run check
npm run build
```

## Deployment

The site is hosted on GitHub Pages with the custom domain `prasad.tech`.

Astro builds through `.github/workflows/deploy-pages.yml` and deploys the generated `dist/` artifact. Do not push directly to `main`; open a PR and wait for Prasad to approve and merge.

## Contact
- Email: prasadus92@gmail.com
- LinkedIn: [linkedin.com/in/prasadus](https://linkedin.com/in/prasadus)
- GitHub: [github.com/prasadus92](https://github.com/prasadus92)

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE).

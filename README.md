# Personal Website - prasad.tech

[![Build Status](https://github.com/prasadus92/prasadus92.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/prasadus92/prasadus92.github.io/actions/workflows/deploy.yml)

A premium, responsive personal website built with Astro.

## Overview
- **URL**: [prasad.tech](https://prasad.tech)
- **Stack**: Astro (static output), TypeScript, self-hosted fonts, near-zero client JS
- **Theme**: Dark/Light mode, follows the system preference
- **Responsive**: Optimized for desktop, tablet, and mobile
- **Performance**: Static HTML, lazy images, minimal JavaScript

## Features
- Modern, minimalist design
- Responsive layout with mobile-first approach
- Optimized performance with lazy loading
- Dark/Light theme with automatic switching
- Professional sections:
  - Current ventures (Luminik, SnowOptix)
  - Professional experience (Bain & Company, Mainteny)
  - Technical expertise
  - Education
- Social media integration
- OpenGraph meta tags for better social sharing
- Custom favicons for various platforms

## Local development
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```
Regenerate assets when content changes:
```bash
npm run og       # social/OG images (Playwright)
node scripts/render-favicon.mjs
```

## Deployment
Deployed to GitHub Pages on every push to `master` via GitHub Actions (`.github/workflows/deploy.yml`), which builds the Astro site and publishes `dist/`. The Pages source must be set to "GitHub Actions" in the repo settings.

## Contact
For any inquiries, please reach out via:
- Email: prasadus92@gmail.com
- LinkedIn: [linkedin.com/in/prasadus](https://linkedin.com/in/prasadus)
- GitHub: [github.com/prasadus92](https://github.com/prasadus92)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Prasad.tech - Personal Website

This is the source code for my personal website, built with HTML, CSS, and JavaScript. The site is hosted on AWS S3 with CloudFront CDN.

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run watch
```
This will:
- Start a local server with live reload
- Watch for file changes
- Automatically rebuild and refresh

## Building for Production

To create a production build:
```bash
npm run build
```

This will:
- Clean the dist directory
- Minify CSS and JavaScript files
- Generate source maps for debugging
- Create a production-ready build in the `dist` directory

## Deployment

The site is automatically deployed to AWS S3 when changes are pushed to the master branch. The deployment process:
1. Builds the site using Gulp
2. Syncs the `dist` directory to S3
3. Invalidates the CloudFront cache

To manually deploy:
```bash
npm run deploy
```

## Project Structure

```
.
├── assets/
│   ├── css/          # CSS files
│   ├── js/           # JavaScript files
│   ├── images/       # Images
│   └── plugins/      # Third-party plugins
├── dist/             # Production build (generated)
├── .github/          # GitHub Actions workflow
├── gulpfile.js       # Build configuration
├── package.json      # Project dependencies
└── index.html        # Main HTML file
```

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Gulp (build tool)
- AWS S3 (hosting)
- CloudFront (CDN)
- GitHub Actions (CI/CD)

## License

© Owned & reserved.

## Overview
- **URL**: [prasad.tech](https://prasad.tech)
- **Stack**: HTML5, CSS3, JavaScript
- **Theme**: Dark mode
- **Responsive**: Optimized for desktop, tablet, and mobile devices

## Features
- Modern, minimalist design
- Responsive layout
- Optimized performance
- Dark theme
- Professional sections:
  - Current ventures
  - Professional experience
  - Technical expertise
  - Education

## Local Development
To run the site locally:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## Contact
For any inquiries, please reach out via:
- Email: prasadus92@gmail.com
- LinkedIn: [linkedin.com/in/prasadus](https://linkedin.com/in/prasadus)
- GitHub: [github.com/prasadus92](https://github.com/prasadus92)

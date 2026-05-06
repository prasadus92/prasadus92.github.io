import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://prasad.tech',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'preserve'
  }
});

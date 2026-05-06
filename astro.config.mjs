import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://prasad.tech',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'preserve'
  },
  integrations: [react()]
});

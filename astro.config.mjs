import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import mdMirror from './src/integrations/md-mirror';

export default defineConfig({
  site: 'https://prasad.tech',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'preserve'
  },
  integrations: [mdx(), react(), mdMirror()]
});

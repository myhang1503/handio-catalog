// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://handiomacrame.com', // keep in sync with SITE.url in src/config.ts
  integrations: [sitemap()],
  adapter: cloudflare({ imageService: 'compile' }),
  image: {
    domains: ['cdn.handiomacrame.com'],
  },
});

// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://handiomacrame.com', // keep in sync with SITE.url in src/config.ts
  integrations: [sitemap()],
  adapter: cloudflare({ imageService: 'compile' }),
  image: {
    // remote photos on R2 are resized at build time, so the domain must be whitelisted
    domains: ['cdn.handiomacrame.com'],
  },
});

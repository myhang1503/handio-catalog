// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://handiomacrame.com',
  integrations: [sitemap()],
  adapter: cloudflare({ imageService: 'compile' }),
  image: {
    domains: ['cdn.handiomacrame.com'],
  },
});

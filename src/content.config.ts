import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    order: z.number().default(0),
    // file names under cdn.handiomacrame.com/products/
    cover: z.string(),
    images: z.array(z.object({ file: z.string(), alt: z.string() })),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  }),
});

export const collections = { products };

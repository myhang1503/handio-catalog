import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Product catalog: one markdown file per product.
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

// Journal posts: markdown body (mostly images) with metadata for the list page.
const journal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    category: z.string().optional(),
    // full image URL, e.g. https://cdn.handiomacrame.com/journal/...
    cover: z.string().optional(),
  }),
});

export const collections = { products, journal };

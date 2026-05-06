import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    modified: z.string().optional(),
    category: z.string(),
    readTime: z.string(),
    tags: z.array(z.string()),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string()
        })
      )
      .optional()
  })
});

export const collections = { blog };

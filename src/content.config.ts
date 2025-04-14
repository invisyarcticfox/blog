import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const post = defineCollection({
	loader: glob({ base: './src/content/post', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
	}),
});

export const collections = { post };

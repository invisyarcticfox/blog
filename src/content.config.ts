import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const post = defineCollection({
	loader: glob({ base: './src/posts', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()),
		re: z.string().optional()
	}),
})

export const collections = { post }

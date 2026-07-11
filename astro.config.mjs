// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'


// https://astro.build/config
export default defineConfig({
  build: { format: 'preserve' },
  trailingSlash: 'never',
  site: 'https://blog.itaf.uk',
  server: { port: 4321, host: true, open: '/' },

  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [ mdx(), sitemap() ]
})
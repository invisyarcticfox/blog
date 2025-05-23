// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import rehypeExternalLinks from 'rehype-external-links'


// https://astro.build/config
export default defineConfig({
  build: { format: 'preserve', },
  trailingSlash: 'never',
  site: 'https://blog.invisyarcticfox.uk',
  server: {
    port: 4321,
    open: '/'
  },
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ]
  },
  redirects: {
    '/p': {
      status: 301,
      destination: '/'
    },
    '/tags': {
      status: 301,
      destination: '/'
    }
  }
})
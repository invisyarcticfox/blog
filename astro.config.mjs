// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { unified } from '@astrojs/markdown-remark'
import rehypeExternalLinks from 'rehype-external-links'


// https://astro.build/config
export default defineConfig({
  build: { format: 'preserve' },
  trailingSlash: 'never',
  site: 'https://blog.itaf.uk',
  server: { port: 4321, host: true, open: '/' },

  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [ mdx(), sitemap() ],

  markdown: {
    shikiConfig: {
      theme: 'catppuccin-mocha',
      themes: { dark: 'catppuccin-mocha' }
    },
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer'] }
        ]
      ]
    })
  },
  
  fonts: [
    {
      name: 'Roboto',
      cssVariable: '--font-roboto',
      provider: fontProviders.google(),
      fallbacks: [ 'sans-serif' ],
      weights: [ '100 900' ]
    },
    {
      name: 'Roboto Mono',
      cssVariable: '--font-roboto-mono',
      provider: fontProviders.google(),
      fallbacks: [ 'monospace' ]
    }
  ]
})
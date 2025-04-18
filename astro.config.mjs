// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'preserve',
  },
  trailingSlash: 'never',
  site: 'https://invisyarcticfox.uk',
  server: {
    port: 4321,
    open: '/'
  },
  adapter: cloudflare({
    imageService: 'compile'
  }),
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ]
  },
  redirects: {
    '/post': {
      status: 307,
      destination: '/'
    },
    '/post/[...slug]': {
      status: 308,
      destination: '/p/[...slug]'
    }
  }
});
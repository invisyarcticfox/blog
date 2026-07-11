import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'


export const GET:APIRoute = async () => {
  const posts = await getCollection('blog')

  return rss({
    title: 'InvisyArcticFox\'s Blog',
    description: 'For when I just wanna write about stuff!',
    site: 'https://blog.itaf.uk',
    items: posts.map(post => ({
      link: `p/${post.id}`,
      title: post.data.title,
      date: post.data.date
    })),
    trailingSlash: false
  })
}
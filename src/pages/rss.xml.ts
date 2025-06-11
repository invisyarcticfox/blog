import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { etaReadTime } from '@/scripts';

export async function GET(context: { site: string }) {
  const posts = await getCollection('post');

  posts.sort((a, b) => {
    const dateA = new Date(b.data.pubDate)
    const dateB = new Date(a.data.pubDate)
    return dateA.getTime() - dateB.getTime()
  })

  return rss({
    title: 'InvisyArcticFox\'s Blog',
    description: 'For when I just wanna write about stuff!',
    site: context.site,
    items: posts.map(({ data: { title, pubDate, tags }, id, body }) => ({
      title,
      link: `/p/${id}`,
      pubDate,
      customData: `
        <tags>${tags.join(', ')}</tags>
        <readTime>${etaReadTime(body)}</readTime>
      `
    })),
  });
}
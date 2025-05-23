import { getCollection } from 'astro:content'
import { etaReadTime } from '@/scripts/etaReadTime'

export async function GET() {
  const posts = await getCollection('post')
  
  posts.sort((a, b) => {
    const dateA = new Date(a.data.pubDate)
    const dateB = new Date(b.data.pubDate)
    return dateA.getTime() - dateB.getTime()
  })

  const postData = posts.map(({ data: { title, pubDate, tags }, id, body }) => ({
    title,
    id,
    tags,
    body,
    date: pubDate,
    readTime: etaReadTime(body)
  }))

  return new Response(JSON.stringify(postData, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  })
}
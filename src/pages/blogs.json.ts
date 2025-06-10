import { getCollection } from 'astro:content'
import { etaReadTime } from '@/scripts/etaReadTime'

export async function GET() {
  const posts = await getCollection('post')
  
  posts.sort((a, b) => {
    const dateA = new Date(b.data.pubDate)
    const dateB = new Date(a.data.pubDate)
    return dateA.getTime() - dateB.getTime()
  })

  const postData = posts.map(({ data: { title, pubDate, tags }, id, body }) => ({
    title,
    id,
    body,
    date: pubDate,
    tags,
    readTime: etaReadTime(body)
  }))

  return new Response(JSON.stringify(postData, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  })
}
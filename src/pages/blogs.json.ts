import { getCollection } from 'astro:content'
import { etaReadTime, charCounter } from '@/scripts'

export async function GET() {
  const posts = await getCollection('post')
  
  posts.sort((a, b) => {
    const dateA = new Date(b.data.pubDate)
    const dateB = new Date(a.data.pubDate)
    return dateA.getTime() - dateB.getTime()
  })

  const postData = posts.map(({ data: { title, pubDate }, id, body }) => ({
    title,
    id,
    body: charCounter(body, false, true),
    date: pubDate,
    readTime: etaReadTime(body),
    charCount: charCounter(body)
  }))

  return new Response(JSON.stringify(postData, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  })
}
import { getCollection } from 'astro:content'
import { etaReadTime, charCounter, removeMdStuff } from '@/scripts/utils'

export async function GET() {
  const posts = await getCollection('post')
  
  posts.sort((a, b) => {
    const dateA = new Date(b.data.pubDate)
    const dateB = new Date(a.data.pubDate)
    return dateA.getTime() - dateB.getTime()
  })

  const data = posts.map(({ data: { title, pubDate, re }, id, body }) => ({
    title,
    id: id.split('/')[1],
    re,
    body: `${removeMdStuff(body!).replaceAll('"','\'').slice(0, 100)}...`,
    date: pubDate,
    readTime: etaReadTime(body),
    charCount: charCounter(body),
  }))

  return new Response(JSON.stringify(data, null, 2), { headers: { 'Content-Type': 'application/json' } })
}
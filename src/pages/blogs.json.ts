import { getCollection } from 'astro:content'
import { etaReadTime, charCounter, removeMdStuff } from '@/scripts/utils'

export async function GET() {
  const posts = await getCollection('post')
  
  posts.sort((a, b) => {
    const dateA = new Date(b.data.pubDate)
    const dateB = new Date(a.data.pubDate)
    return dateA.getTime() - dateB.getTime()
  })

  const postData = posts.map(({ data: { title, pubDate, re }, id, body }) => ({
    title,
    id,
    re,
    body: `${removeMdStuff(body!).replaceAll('"','\'').slice(0, 150)}...`,
    date: pubDate,
    readTime: etaReadTime(body),
    charCount: charCounter(body),
  }))

  return new Response(JSON.stringify(postData, null, 2), { headers: { 'Content-Type': 'application/json' } })
}
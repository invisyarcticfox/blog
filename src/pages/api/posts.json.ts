import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { removeMdStuff, charCount, readTime } from '~/scripts/utils'


export const GET:APIRoute = async () => {
  const posts = await getCollection('blog')

  const data = posts.map(({ data: { title, date }, body, id }) => ({
    id: id.split('/').pop(),
    title,
    date,
    body: removeMdStuff(body!),
    charCount: charCount(body!),
    readTime: readTime(body!)
  }))

  return Response.json(data)
}
export const prerender = false
import type { APIRoute } from 'astro'
import puppeteer from '@cloudflare/puppeteer'
import { env } from 'cloudflare:workers'

export const GET:APIRoute = async ({ params, request }) => {
  const cache = await caches.open('blog-previews')
  const cached = await cache.match(request)
  if (cached) return cached

  const browser = await puppeteer.launch(env.BROWSER)
  const page = await browser.newPage()
  const url = new URL(request.url)
  const origin = url.origin
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 })
  await page.goto(`${origin}/p/${params.year}/${params.id}`, { waitUntil: 'networkidle0' })
  await page.evaluate(() => window.scrollTo(0, 0))
  const screenshot = await page.screenshot({ type: 'png', fullPage: false })
  await browser.close()

  const response = new Response(new Uint8Array(screenshot), {
    headers: {
      'Content-Type' : 'image/png',
      'Cache-Control' : 'public, max-age=604800'
    }
  })

  await cache.put(request, response.clone())
  return response
}
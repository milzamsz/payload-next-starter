import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  try {
    const payload = await getPayload({ config })

    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: { _status: { equals: 'published' } },
    })

    const { docs: posts } = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
    })

    const pageUrls = pages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
    }))

    const postUrls = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    }))

    return [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/blog`, lastModified: new Date() },
      { url: `${baseUrl}/contact`, lastModified: new Date() },
      ...pageUrls,
      ...postUrls,
    ]
  } catch {
    return [{ url: baseUrl, lastModified: new Date() }]
  }
}

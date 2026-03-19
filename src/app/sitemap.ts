import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { locales } from '@/i18n/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // Static pages — one entry per locale with hreflang alternates
  const staticPaths = ['', '/about', '/services', '/blog', '/contact']
  const staticUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${path}`])
        ),
      },
    }))
  )

  try {
    const payload = await getPayload({ config })

    const { docs: posts } = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
    })

    const postUrls: MetadataRoute.Sitemap = posts.flatMap((post) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/blog/${post.slug}`])
          ),
        },
      }))
    )

    return [...staticUrls, ...postUrls]
  } catch {
    return staticUrls
  }
}

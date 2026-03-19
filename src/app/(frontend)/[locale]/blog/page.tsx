import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getServerURL } from '@/utilities/getURL'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const serverUrl = getServerURL()

  return {
    title: dict.blog.meta.title,
    description: dict.blog.meta.description,
    alternates: {
      languages: {
        en: `${serverUrl}/en/blog`,
        id: `${serverUrl}/id/blog`,
        'x-default': `${serverUrl}/en/blog`,
      },
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.blog

  const payload = await getPayload({ config })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    locale: locale as Locale,
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-serif font-bold text-[var(--foreground)] mb-4">{t.heading}</h1>
      <p className="text-[var(--muted-foreground)] text-lg mb-16">{t.subheading}</p>

      {posts.length === 0 && (
        <p className="text-[var(--muted-foreground)]">{t.empty}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const featuredImage = typeof post.featuredImage === 'object' ? post.featuredImage : null
          return (
            <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className="group">
              <article className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-lg hover:border-[var(--primary)]/30 transition-all">
                {featuredImage?.url && (
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={featuredImage.url}
                      alt={featuredImage.alt ?? post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-[var(--muted-foreground)] text-sm line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </p>
                    {post.readingTime && (
                      <p className="text-xs text-[var(--muted-foreground)]">{post.readingTime} {dict.common.minRead}</p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

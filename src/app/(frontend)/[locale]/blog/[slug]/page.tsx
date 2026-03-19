import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getServerURL } from '@/utilities/getURL'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const serverUrl = getServerURL()

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      depth: 1,
      locale: locale as Locale,
    })
    const post = docs[0]
    if (!post) return {}

    const image = typeof post.featuredImage === 'object' ? post.featuredImage : null

    return {
      title: post.title,
      description: post.excerpt ?? undefined,
      alternates: {
        languages: {
          en: `${serverUrl}/en/blog/${slug}`,
          id: `${serverUrl}/id/blog/${slug}`,
          'x-default': `${serverUrl}/en/blog/${slug}`,
        },
      },
      openGraph: {
        title: post.title,
        description: post.excerpt ?? undefined,
        images: image?.url ? [{ url: image.url, alt: image.alt ?? post.title }] : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale as Locale)

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    depth: 2,
    locale: locale as Locale,
  })

  const post = docs[0]
  if (!post) notFound()

  const featuredImage = typeof post.featuredImage === 'object' ? post.featuredImage : null

  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <Link href={`/${locale}/blog`} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors mb-8 inline-flex items-center gap-1">
        ← {dict.common.backTo} {dict.nav.blog}
      </Link>

      {featuredImage?.url && (
        <div className="relative aspect-video rounded-2xl overflow-hidden mt-6 mb-12">
          <Image src={featuredImage.url} alt={featuredImage.alt ?? post.title} fill className="object-cover" priority />
        </div>
      )}

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)] mb-4">{post.title}</h1>
        {post.excerpt && <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">{post.excerpt}</p>}
        <p className="text-sm text-[var(--muted-foreground)] mt-4">
          {post.publishedAt
            ? `${dict.common.publishedOn} ${new Date(post.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
            : ''}
          {post.readingTime && ` · ${post.readingTime} ${dict.common.minRead}`}
        </p>
      </header>

      <div className="prose max-w-none text-[var(--foreground)]">
        <p className="text-[var(--muted-foreground)] italic bg-[var(--muted)] p-4 rounded-xl text-sm">
          {dict.blog.richTextNote}
        </p>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'posts', where: { _status: { equals: 'published' } } })
    return docs.flatMap((post) => [
      { locale: 'en', slug: post.slug },
      { locale: 'id', slug: post.slug },
    ])
  } catch {
    return []
  }
}

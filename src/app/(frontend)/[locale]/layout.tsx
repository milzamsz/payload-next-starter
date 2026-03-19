import type { Metadata } from 'next'
import '../../globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFab from '@/components/layout/WhatsAppFab'
import { getPayload } from 'payload'
import config from '@payload-config'
import { locales, localeMeta, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const meta = localeMeta[locale as Locale]

  return {
    title: {
      default: 'My App',
      template: '%s | My App',
    },
    description: dict.home.hero.subtitle,
    alternates: {
      canonical: `${serverUrl}/${locale}`,
      languages: {
        en: `${serverUrl}/en`,
        id: `${serverUrl}/id`,
        'x-default': `${serverUrl}/en`,
      },
    },
    openGraph: {
      locale: meta?.ogLocale,
      alternateLocale: locale === 'en' ? ['id_ID'] : ['en_US'],
    },
  }
}

type MediaDoc = {
  url?: string | null
  alt?: string | null
}

type HeaderGlobal = {
  logo?: string | MediaDoc | null
  navLinks?: Array<{
    label: string
    url: string
    subLinks?: Array<{ label: string; url: string }> | null
  }> | null
  ctaButton?: { label?: string | null; url?: string | null } | null
}

type FooterGlobal = {
  logo?: string | MediaDoc | null
  columns?: Array<{
    title: string
    links?: Array<{ label: string; url: string }> | null
  }> | null
  socialLinks?: Array<{ platform: string; url: string }> | null
  copyrightText?: string | null
}

type SiteSettingsGlobal = {
  siteName?: string | null
  whatsappNumber?: string | null
  socialMedia?: {
    instagram?: string | null
    youtube?: string | null
    tiktok?: string | null
    linkedin?: string | null
    twitter?: string | null
    facebook?: string | null
  } | null
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as Locale)) notFound()

  const typedLocale = locale as Locale
  const meta = localeMeta[typedLocale]
  const dict = await getDictionary(typedLocale)

  let header: HeaderGlobal | null = null
  let footer: FooterGlobal | null = null
  let siteSettings: SiteSettingsGlobal | null = null

  const phase = process.env.NEXT_PHASE
  const shouldQueryCMS = phase !== 'phase-production-build'

  if (shouldQueryCMS) {
    try {
      const payload = await getPayload({ config })
      const [headerResult, footerResult, siteSettingsResult] = await Promise.all([
        payload.findGlobal({ slug: 'header', depth: 2, locale: typedLocale }),
        payload.findGlobal({ slug: 'footer', depth: 2, locale: typedLocale }),
        payload.findGlobal({ slug: 'siteSettings', depth: 1, locale: typedLocale }),
      ])
      header = headerResult as unknown as HeaderGlobal
      footer = footerResult as unknown as FooterGlobal
      siteSettings = siteSettingsResult as unknown as SiteSettingsGlobal
    } catch (err) {
      console.error('[Layout] Failed to fetch CMS globals:', err)
    }
  }

  const global = {
    siteName: siteSettings?.siteName ?? 'My App',
    whatsappNumber: siteSettings?.whatsappNumber ?? '',
  }

  return (
    <html lang={meta.htmlLang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
        />
        {/* hreflang alternates */}
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_SERVER_URL || ''}/en`} />
        <link rel="alternate" hrefLang="id" href={`${process.env.NEXT_PUBLIC_SERVER_URL || ''}/id`} />
        <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_SERVER_URL || ''}/en`} />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Navbar
          global={global}
          header={header ?? undefined}
          locale={typedLocale}
          dict={dict}
        />
        <main className="flex-1">{children}</main>
        <Footer
          global={global}
          footer={footer ?? undefined}
          siteSettings={siteSettings ?? undefined}
          locale={typedLocale}
          dict={dict}
        />
        {global.whatsappNumber && <WhatsAppFab phoneNumber={global.whatsappNumber} />}
      </body>
    </html>
  )
}

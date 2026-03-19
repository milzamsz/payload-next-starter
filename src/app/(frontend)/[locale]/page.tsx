import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import { getServerURL } from '@/utilities/getURL'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const serverUrl = getServerURL()

  return {
    title: 'Home',
    alternates: {
      languages: {
        en: `${serverUrl}/en`,
        id: `${serverUrl}/id`,
        'x-default': `${serverUrl}/en`,
      },
    },
    openGraph: {
      title: dict.home.hero.titleHighlight,
      description: dict.home.hero.subtitle,
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.home

  const featureIcons = ['🗄️', '⚡', '🎨', '🐘', '🧱', '🌐']

  return (
    <main>
      {/* ─── Hero ────────────────────────────────────────── */}
      <header className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[#6366f1] to-[#312E81]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
            {t.hero.title.replace(t.hero.titleHighlight, '')}{' '}
            <span className="italic font-normal">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90 font-bold rounded-full px-10">
              <Link href="/admin">{t.hero.ctaPrimary}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 rounded-full px-10">
              <Link href={`/${locale}/blog`}>{t.hero.ctaSecondary}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>

      {/* ─── Features ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">{t.features.heading}</h2>
            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">{t.features.subheading}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.items.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 hover:shadow-lg hover:border-[var(--primary)]/30 transition-all"
              >
                <div className="text-4xl mb-4">{featureIcons[i]}</div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{feature.title}</h3>
                <p className="text-[var(--muted-foreground)]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--primary)] text-white text-center">
        <h2 className="text-4xl font-bold mb-4">{t.cta.heading}</h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">{t.cta.description}</p>
        <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90 font-bold rounded-full px-12">
          <Link href="/admin">{t.cta.button}</Link>
        </Button>
      </section>
    </main>
  )
}

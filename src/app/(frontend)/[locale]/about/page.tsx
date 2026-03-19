import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
    title: dict.about.meta.title,
    description: dict.about.meta.description,
    alternates: {
      languages: {
        en: `${serverUrl}/en/about`,
        id: `${serverUrl}/id/about`,
        'x-default': `${serverUrl}/en/about`,
      },
    },
    openGraph: {
      title: dict.about.meta.title,
      description: dict.about.meta.description,
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.about

  let team: Array<{
    id: string
    name: string
    role: string
    bio?: string | null
    photo?: { url?: string | null; alt?: string | null } | null
    socialLinks?: { linkedin?: string | null; twitter?: string | null; github?: string | null } | null
  }> = []

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'team',
      where: { isActive: { equals: true } },
      sort: 'order',
      depth: 1,
      locale: locale as Locale,
    })
    team = docs as typeof team
  } catch {
    // CMS not available
  }

  return (
    <main>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="relative py-32 md:py-44 bg-gradient-to-br from-[#312E81] via-[var(--primary)] to-[var(--primary-50,#EEF2FF)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block text-white/70 uppercase tracking-widest text-sm font-medium mb-6">{t.hero.eyebrow}</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8">
            {t.hero.title}
            <br />
            <span className="italic font-normal">{t.hero.titleItalic}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* ─── Mission ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[var(--primary)] font-semibold uppercase tracking-widest text-xs block mb-4">{t.mission.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] leading-tight mb-6">{t.mission.heading}</h2>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-6">{t.mission.p1}</p>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">{t.mission.p2}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {t.mission.stats.map((stat) => (
              <div key={stat.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center hover:border-[var(--primary)]/30 hover:shadow-lg transition-all">
                <p className="text-4xl font-serif font-bold text-[var(--primary)] mb-2">{stat.number}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] font-semibold uppercase tracking-widest text-xs block mb-4">{t.values.eyebrow}</span>
            <h2 className="text-4xl font-serif font-bold text-[var(--foreground)]">{t.values.heading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.items.map((value) => (
              <div key={value.title} className="bg-[var(--card)] rounded-2xl p-10 border border-[var(--border)]">
                <span className="text-3xl text-[var(--primary)] block mb-4">{value.icon}</span>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{value.title}</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ────────────────────────────────────────── */}
      {team.length > 0 && (
        <section className="py-24 px-6 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] font-semibold uppercase tracking-widest text-xs block mb-4">{t.team.eyebrow}</span>
              <h2 className="text-4xl font-serif font-bold text-[var(--foreground)]">{t.team.heading}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => {
                const photo = typeof member.photo === 'object' ? member.photo : null
                return (
                  <div key={member.id} className="group text-center">
                    <div className="relative w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden bg-[var(--muted)] border-4 border-[var(--border)] group-hover:border-[var(--primary)] transition-colors">
                      {photo?.url ? (
                        <Image src={photo.url} alt={photo.alt ?? member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-serif font-bold text-[var(--primary)]">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">{member.name}</h3>
                    <p className="text-[var(--primary)] text-sm font-medium mt-1">{member.role}</p>
                    {member.bio && <p className="text-[var(--muted-foreground)] text-sm mt-3 leading-relaxed line-clamp-3">{member.bio}</p>}
                    {member.socialLinks && (
                      <div className="flex justify-center gap-3 mt-4">
                        {member.socialLinks.linkedin && <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-xs">LinkedIn</a>}
                        {member.socialLinks.twitter && <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-xs">X</a>}
                        {member.socialLinks.github && <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-xs">GitHub</a>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--primary)] text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t.cta.heading}</h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">{t.cta.description}</p>
        <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90 font-bold rounded-full px-12">
          <Link href={`/${locale}/contact`}>{t.cta.button}</Link>
        </Button>
      </section>
    </main>
  )
}

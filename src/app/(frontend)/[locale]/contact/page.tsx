import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getServerURL } from '@/utilities/getURL'
import ContactForm from './ContactForm'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const serverUrl = getServerURL()

  return {
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
    alternates: {
      languages: {
        en: `${serverUrl}/en/contact`,
        id: `${serverUrl}/id/contact`,
        'x-default': `${serverUrl}/en/contact`,
      },
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = dict.contact

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-serif font-bold text-[var(--foreground)] mb-4">{t.heading}</h1>
      <p className="text-[var(--muted-foreground)] text-lg mb-12">{t.subheading}</p>
      <ContactForm t={t} />
    </div>
  )
}

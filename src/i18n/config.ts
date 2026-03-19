export const locales = ['en', 'id'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa',
}

export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string }> = {
  en: { htmlLang: 'en', ogLocale: 'en_US' },
  id: { htmlLang: 'id', ogLocale: 'id_ID' },
}

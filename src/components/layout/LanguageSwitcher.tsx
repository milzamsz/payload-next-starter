'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, localeLabels, type Locale } from '@/i18n/config'

interface LanguageSwitcherProps {
  currentLocale: Locale
  variant?: 'navbar' | 'dropdown'
}

export default function LanguageSwitcher({ currentLocale, variant = 'navbar' }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: Locale) {
    if (newLocale === currentLocale) return

    // Replace the current locale segment in the path
    // e.g. /en/about → /id/about
    const segments = pathname.split('/')
    // segments[0] = '' (before first /), segments[1] = locale
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    router.push(segments.join('/'))
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors">
          <span>{localeLabels[currentLocale]}</span>
          <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute right-0 mt-1 w-36 bg-white border border-[var(--border)] rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${
                locale === currentLocale
                  ? 'text-[var(--primary)] bg-[var(--primary)]/5 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)]'
              }`}
            >
              <span>{localeLabels[locale]}</span>
              {locale === currentLocale && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Pill switcher for navbar
  return (
    <div className="flex items-center gap-0.5 bg-white/10 rounded-full p-0.5">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
            locale === currentLocale
              ? 'bg-white text-[var(--primary)] shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

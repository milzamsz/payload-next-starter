import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, type Locale } from './i18n/config'

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  // Simple check: if browser prefers Indonesian
  if (acceptLanguage.toLowerCase().includes('id')) return 'id'
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip Payload admin, API, Next.js internals, and static files
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('/favicon') ||
    /\.\w+$/.test(pathname) // has file extension
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to locale-prefixed URL
  const locale = getPreferredLocale(request)
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}

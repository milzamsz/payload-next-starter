import { Resend } from 'resend'

const isDev = process.env.NODE_ENV !== 'production'
const hasKey = Boolean(process.env.RESEND_API_KEY)

if (!hasKey && !isDev) {
  console.error('[Email] RESEND_API_KEY is not set — emails will not be sent in production!')
}

// In dev without a key, Resend SDK accepts any string but calls will be logged instead
export const resend = new Resend(process.env.RESEND_API_KEY ?? 're_dev_placeholder')

export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'noreply@example.com'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? process.env.EMAIL_FROM ?? 'admin@example.com'
export const IS_DEV = isDev
export const HAS_RESEND_KEY = hasKey

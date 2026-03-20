import {
  ADMIN_EMAIL,
  EMAIL_FROM,
  HAS_RESEND_KEY,
  IS_DEV,
  resend,
} from './client'
import {
  ContactAutoReplyData,
  ContactNotificationData,
  contactAutoReplyTemplate,
  contactNotificationTemplate,
  newsletterConfirmationTemplate,
} from './templates'

// ─── Dev logger ──────────────────────────────────────────────────────────────

function logEmail(type: string, to: string, subject: string, url?: string) {
  console.log(`\n[EMAIL] ${type}`)
  console.log(`  To:      ${to}`)
  console.log(`  Subject: ${subject}`)
  if (url) console.log(`  URL:     ${url}`)
  console.log()
}

// ─── Contact form ─────────────────────────────────────────────────────────────

export async function sendContactNotification(data: ContactNotificationData) {
  const { subject, html, text } = contactNotificationTemplate(data)

  if (IS_DEV && !HAS_RESEND_KEY) {
    logEmail('Contact Notification (admin)', ADMIN_EMAIL, subject)
    return
  }

  await resend.emails.send({
    from: EMAIL_FROM,
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject,
    html,
    text,
  })
}

export async function sendContactAutoReply(
  to: string,
  data: ContactAutoReplyData,
) {
  const { subject, html, text } = contactAutoReplyTemplate(data)

  if (IS_DEV && !HAS_RESEND_KEY) {
    logEmail('Contact Auto-Reply', to, subject)
    return
  }

  await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject,
    html,
    text,
  })
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export async function addNewsletterSubscriber(email: string): Promise<void> {
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!audienceId) {
    throw new Error('RESEND_AUDIENCE_ID is not configured')
  }

  if (IS_DEV && !HAS_RESEND_KEY) {
    logEmail('Newsletter Signup', email, 'Added to audience')
    return
  }

  const result = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  })

  if (result.error) {
    throw new Error(result.error.message)
  }

  // Send confirmation email
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'My App'
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
  const { subject, html, text } = newsletterConfirmationTemplate({
    email,
    siteName,
    siteUrl,
  })

  await resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject,
    html,
    text,
  })
}

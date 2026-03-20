export type ContactNotificationData = {
  senderName: string
  email: string
  phone?: string
  subject?: string
  message: string
  adminUrl: string
}

export type ContactAutoReplyData = {
  senderName: string
  siteName: string
  siteUrl: string
}

export function contactNotificationTemplate(data: ContactNotificationData): {
  subject: string
  html: string
  text: string
} {
  const subject = data.subject
    ? `New message: ${data.subject}`
    : `New contact message from ${data.senderName}`

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:sans-serif;background:#f9f9f9;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);">
        <tr>
          <td style="background:#111;padding:28px 36px;">
            <h2 style="color:#fff;margin:0;font-size:20px;font-weight:600;">New Contact Message</h2>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Name</span><br/>
                  <strong style="color:#111;font-size:15px;">${escapeHtml(data.senderName)}</strong>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Email</span><br/>
                  <a href="mailto:${escapeHtml(data.email)}" style="color:#111;font-size:15px;">${escapeHtml(data.email)}</a>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Phone</span><br/>
                  <span style="color:#111;font-size:15px;">${escapeHtml(data.phone)}</span>
                </td>
              </tr>` : ''}
              ${data.subject ? `
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Subject</span><br/>
                  <strong style="color:#111;font-size:15px;">${escapeHtml(data.subject)}</strong>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding:16px 0;">
                  <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Message</span><br/>
                  <p style="color:#333;font-size:15px;line-height:1.6;margin:8px 0 0;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
                </td>
              </tr>
            </table>
            <div style="margin-top:24px;">
              <a href="${data.adminUrl}" style="display:inline-block;background:#111;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">View in Admin →</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 36px;text-align:center;">
            <p style="color:#aaa;font-size:12px;margin:0;">This notification was sent automatically.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = [
    `New Contact Message`,
    ``,
    `Name: ${data.senderName}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.subject ? `Subject: ${data.subject}` : null,
    ``,
    `Message:`,
    data.message,
    ``,
    `View in Admin: ${data.adminUrl}`,
  ]
    .filter((l) => l !== null)
    .join('\n')

  return { subject, html, text }
}

export function contactAutoReplyTemplate(data: ContactAutoReplyData): {
  subject: string
  html: string
  text: string
} {
  const subject = `We received your message — ${data.siteName}`

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:sans-serif;background:#f9f9f9;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);">
        <tr>
          <td style="background:#111;padding:28px 36px;">
            <h2 style="color:#fff;margin:0;font-size:20px;font-weight:600;">${escapeHtml(data.siteName)}</h2>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px;">
            <p style="color:#333;font-size:16px;line-height:1.7;margin:0 0 16px;">
              Hi ${escapeHtml(data.senderName)},
            </p>
            <p style="color:#333;font-size:16px;line-height:1.7;margin:0 0 16px;">
              Thanks for reaching out! We've received your message and will get back to you as soon as possible.
            </p>
            <p style="color:#555;font-size:15px;line-height:1.7;margin:0;">
              — The ${escapeHtml(data.siteName)} Team
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 36px;text-align:center;">
            <p style="color:#aaa;font-size:12px;margin:0;">
              <a href="${data.siteUrl}" style="color:#aaa;">${data.siteUrl}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = [
    `Hi ${data.senderName},`,
    ``,
    `Thanks for reaching out! We've received your message and will get back to you as soon as possible.`,
    ``,
    `— The ${data.siteName} Team`,
    `${data.siteUrl}`,
  ].join('\n')

  return { subject, html, text }
}

export function newsletterConfirmationTemplate(data: {
  email: string
  siteName: string
  siteUrl: string
}): { subject: string; html: string; text: string } {
  const subject = `You're subscribed to ${data.siteName}`

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:sans-serif;background:#f9f9f9;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);">
        <tr>
          <td style="background:#111;padding:28px 36px;">
            <h2 style="color:#fff;margin:0;font-size:20px;font-weight:600;">${escapeHtml(data.siteName)}</h2>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px;text-align:center;">
            <div style="font-size:48px;margin-bottom:16px;">✓</div>
            <h3 style="color:#111;font-size:22px;margin:0 0 12px;">You're subscribed!</h3>
            <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 24px;">
              Thanks for subscribing to updates from ${escapeHtml(data.siteName)}.
              We'll only send you things worth reading.
            </p>
            <a href="${data.siteUrl}" style="display:inline-block;background:#111;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Visit Site →</a>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 36px;text-align:center;">
            <p style="color:#aaa;font-size:12px;margin:0;">
              You subscribed with ${escapeHtml(data.email)}.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = [
    `You're subscribed!`,
    ``,
    `Thanks for subscribing to updates from ${data.siteName}. We'll only send you things worth reading.`,
    ``,
    data.siteUrl,
  ].join('\n')

  return { subject, html, text }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

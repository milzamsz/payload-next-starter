import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  sendContactAutoReply,
  sendContactNotification,
} from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { senderName, email, phone, subject, message } = body

    if (!senderName || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      )
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 },
      )
    }

    // Save to Payload
    const payload = await getPayload({ config })
    const submission = await payload.create({
      collection: 'contactSubmissions',
      data: {
        senderName,
        email,
        phone: phone || undefined,
        subject: subject || undefined,
        message,
        status: 'new',
        receivedOn: new Date().toISOString(),
      },
    })

    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
    const adminUrl = `${serverUrl}/admin/collections/contactSubmissions/${submission.id}`

    // Send emails (non-blocking — don't fail the response if email fails)
    await Promise.allSettled([
      sendContactNotification({
        senderName,
        email,
        phone,
        subject,
        message,
        adminUrl,
      }),
      sendContactAutoReply(email, {
        senderName,
        siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'My App',
        siteUrl: serverUrl,
      }),
    ])

    return NextResponse.json({ success: true, id: submission.id })
  } catch (err) {
    console.error('[contact-submissions] Error:', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    )
  }
}

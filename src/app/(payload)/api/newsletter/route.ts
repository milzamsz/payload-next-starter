import { NextRequest, NextResponse } from 'next/server'
import { addNewsletterSubscriber } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 },
      )
    }

    if (!process.env.RESEND_AUDIENCE_ID) {
      return NextResponse.json(
        { error: 'Newsletter is not configured.' },
        { status: 503 },
      )
    }

    await addNewsletterSubscriber(email)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[newsletter] Error:', err)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 },
    )
  }
}

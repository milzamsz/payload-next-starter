'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ContactFormProps {
  t: {
    form: {
      name: string; namePlaceholder: string
      email: string; emailPlaceholder: string
      phone: string; phonePlaceholder: string
      subject: string; subjectPlaceholder: string
      message: string; messagePlaceholder: string
      submit: string; sending: string; required: string
    }
    success: string
    error: string
  }
}

export default function ContactForm({ t }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      senderName: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--card)] text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition'

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <p className="text-green-700 font-semibold text-lg">{t.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">{t.form.name} *</label>
          <input id="name" name="name" type="text" required placeholder={t.form.namePlaceholder} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">{t.form.email} *</label>
          <input id="email" name="email" type="email" required placeholder={t.form.emailPlaceholder} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-2">{t.form.phone}</label>
        <input id="phone" name="phone" type="tel" placeholder={t.form.phonePlaceholder} className={inputClass} />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--foreground)] mb-2">{t.form.subject}</label>
        <input id="subject" name="subject" type="text" placeholder={t.form.subjectPlaceholder} className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">{t.form.message} *</label>
        <textarea id="message" name="message" required rows={6} placeholder={t.form.messagePlaceholder} className={`${inputClass} resize-none`} />
      </div>
      {status === 'error' && <p className="text-red-600 text-sm">{t.error}</p>}
      <Button type="submit" disabled={status === 'loading'} className="w-full" size="lg">
        {status === 'loading' ? t.form.sending : t.form.submit}
      </Button>
    </form>
  )
}

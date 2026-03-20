'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  t: {
    heading: string
    placeholder: string
    subscribe: string
    subscribing: string
    success: string
    error: string
  }
}

export default function NewsletterForm({ t }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState(t.error)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setErrorMsg(data.error ?? t.error)
        setStatus('error')
      }
    } catch {
      setErrorMsg(t.error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div>
        <h3 className="font-semibold text-white/80 uppercase tracking-wider text-xs mb-3">
          {t.heading}
        </h3>
        <p className="text-green-400 text-sm">{t.success}</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-semibold text-white/80 uppercase tracking-wider text-xs mb-3">
        {t.heading}
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder={t.placeholder}
          required
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 transition"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? t.subscribing : t.subscribe}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
      )}
    </div>
  )
}

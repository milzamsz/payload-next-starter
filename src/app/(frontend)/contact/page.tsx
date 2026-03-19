"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      senderName: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-bold text-[var(--foreground)] mb-4">Contact Us</h1>
      <p className="text-[var(--muted-foreground)] text-lg mb-12">
        Have a question or want to get in touch? Send us a message.
      </p>

      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <p className="text-green-700 font-semibold text-lg">Message sent! We&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-2">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-[var(--foreground)] mb-2">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition resize-none"
            />
          </div>
          {status === "error" && (
            <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
          )}
          <Button type="submit" disabled={status === "loading"} className="w-full" size="lg">
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </div>
  );
}

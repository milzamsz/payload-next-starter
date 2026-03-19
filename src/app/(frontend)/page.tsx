import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main>
      {/* ─── Hero Section ────────────────────────────────── */}
      <header className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[var(--primary)]">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Welcome to{" "}
            <span className="italic font-light">My App</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            This is your new Payload CMS + Next.js starter. Edit{" "}
            <code className="bg-white/20 px-2 py-0.5 rounded text-sm">
              src/app/(frontend)/page.tsx
            </code>{" "}
            to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90 font-bold rounded-full px-10">
              <Link href="/admin">Open Admin</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 rounded-full px-10">
              <Link href="/blog">View Blog</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>

      {/* ─── Features Section ────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              What&apos;s Included
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
              A production-ready foundation for your next project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Payload CMS",
                desc: "Full-featured headless CMS with admin UI at /admin. Collections, globals, blocks, and more.",
                icon: "🗄️",
              },
              {
                title: "Next.js 16",
                desc: "App Router, Server Components, standalone output for Docker deployment.",
                icon: "⚡",
              },
              {
                title: "Tailwind CSS v4",
                desc: "Modern styling with design tokens. Customize colors and fonts in globals.css.",
                icon: "🎨",
              },
              {
                title: "PostgreSQL",
                desc: "Production-grade database with Docker Compose. Ready for cloud deployment.",
                icon: "🐘",
              },
              {
                title: "Block Builder",
                desc: "8 ready-made content blocks: Hero, Content, Gallery, CTA, Testimonials, Stats, FAQ, Map.",
                icon: "🧱",
              },
              {
                title: "SEO & Plugins",
                desc: "SEO plugin, nested docs, search, and redirects pre-configured.",
                icon: "🔍",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{feature.title}</h3>
                <p className="text-[var(--muted-foreground)]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--primary)] text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to build?</h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Start by visiting the admin panel and configuring your site settings.
        </p>
        <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90 font-bold rounded-full px-12">
          <Link href="/admin">Go to Admin →</Link>
        </Button>
      </section>
    </main>
  );
}

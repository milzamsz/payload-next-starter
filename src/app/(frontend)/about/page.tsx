import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our team, mission, and values.",
};

export default async function AboutPage() {
  let team: Array<{
    id: string;
    name: string;
    role: string;
    department?: string | null;
    bio?: string | null;
    photo?: { url?: string | null; alt?: string | null } | null;
    socialLinks?: {
      linkedin?: string | null;
      twitter?: string | null;
      github?: string | null;
    } | null;
  }> = [];

  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "team",
      where: { isActive: { equals: true } },
      sort: "order",
      depth: 1,
    });
    team = docs as typeof team;
  } catch {
    // CMS not available during build
  }

  return (
    <main>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="relative py-32 md:py-44 bg-gradient-to-br from-[var(--primary-900,#312E81)] via-[var(--primary)] to-[var(--primary-50,#EEF2FF)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block text-white/70 uppercase tracking-widest text-sm font-medium mb-6">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8">
            We build things
            <br />
            <span className="italic font-normal">people love</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            A small team with big ideas. We&apos;re passionate about crafting digital products
            that make a real difference.
          </p>
        </div>
      </section>

      {/* ─── Mission ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[var(--primary)] font-semibold uppercase tracking-widest text-xs block mb-4">
              Our Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] leading-tight mb-6">
              We help businesses grow through great design & technology.
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-6">
              Since day one, our goal has been simple: build products that solve real problems
              with clarity, care, and craftsmanship.
            </p>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
              We believe in long-term partnerships — not just delivering projects, but growing
              alongside our clients as their business evolves.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { number: "50+", label: "Projects Delivered" },
              { number: "30+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "99%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center hover:border-[var(--primary)]/30 hover:shadow-lg transition-all"
              >
                <p className="text-4xl font-serif font-bold text-[var(--primary)] mb-2">{stat.number}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] font-semibold uppercase tracking-widest text-xs block mb-4">
              What We Stand For
            </span>
            <h2 className="text-4xl font-serif font-bold text-[var(--foreground)]">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✦",
                title: "Quality First",
                desc: "We don't ship mediocre work. Every detail matters — from pixel precision to clean, maintainable code.",
              },
              {
                icon: "◈",
                title: "Transparency",
                desc: "Clear communication throughout every project. No surprises, no hidden costs, just honest collaboration.",
              },
              {
                icon: "⬡",
                title: "Long-term Thinking",
                desc: "We build for the future, not just the deadline. Scalable, documented, and maintainable from day one.",
              },
            ].map((value) => (
              <div key={value.title} className="bg-[var(--card)] rounded-2xl p-10 border border-[var(--border)]">
                <span className="text-3xl text-[var(--primary)] block mb-4">{value.icon}</span>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{value.title}</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ────────────────────────────────────────── */}
      {team.length > 0 && (
        <section className="py-24 px-6 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] font-semibold uppercase tracking-widest text-xs block mb-4">
                The People
              </span>
              <h2 className="text-4xl font-serif font-bold text-[var(--foreground)]">Meet the Team</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => {
                const photo = typeof member.photo === "object" ? member.photo : null;
                return (
                  <div key={member.id} className="group text-center">
                    <div className="relative w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden bg-[var(--muted)] border-4 border-[var(--border)] group-hover:border-[var(--primary)] transition-colors">
                      {photo?.url ? (
                        <Image src={photo.url} alt={photo.alt ?? member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-serif font-bold text-[var(--primary)]">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">{member.name}</h3>
                    <p className="text-[var(--primary)] text-sm font-medium mt-1">{member.role}</p>
                    {member.bio && (
                      <p className="text-[var(--muted-foreground)] text-sm mt-3 leading-relaxed line-clamp-3">{member.bio}</p>
                    )}
                    {member.socialLinks && (
                      <div className="flex justify-center gap-3 mt-4">
                        {member.socialLinks.linkedin && (
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-xs">LinkedIn</a>
                        )}
                        {member.socialLinks.twitter && (
                          <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-xs">X</a>
                        )}
                        {member.socialLinks.github && (
                          <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-xs">GitHub</a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--primary)] text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
          Ready to work together?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Let&apos;s talk about your project and how we can help.
        </p>
        <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90 font-bold rounded-full px-12">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </section>
    </main>
  );
}

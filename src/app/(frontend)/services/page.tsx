import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore what we offer and how we can help your business grow.",
};

const categoryLabels: Record<string, string> = {
  design: "Design",
  development: "Development",
  consulting: "Consulting",
  support: "Support",
  other: "Other",
};

export default async function ServicesPage() {
  let services: Array<{
    id: string;
    title: string;
    slug: string;
    tagline?: string | null;
    category?: string | null;
    icon?: string | null;
    featuredImage?: { url?: string | null; alt?: string | null } | null;
    highlights?: Array<{ text: string }> | null;
    pricing?: { startingFrom?: string | null; unit?: string | null } | null;
    ctaText?: string | null;
    ctaLink?: string | null;
  }> = [];

  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "services",
      where: { _status: { equals: "published" } },
      sort: "order",
      depth: 1,
    });
    services = docs as typeof services;
  } catch {
    // CMS not available during build
  }

  // Group by category
  const grouped = services.reduce<Record<string, typeof services>>((acc, service) => {
    const cat = service.category ?? "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {});

  const hasMultipleCategories = Object.keys(grouped).length > 1;

  return (
    <main>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-gradient-to-b from-[var(--muted)] to-[var(--background)] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block text-[var(--primary)] uppercase tracking-widest text-sm font-semibold mb-6">
            What We Do
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[var(--foreground)] leading-tight mb-8">
            Our Services
          </h1>
          <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
            We offer a focused set of services designed to help your business look great,
            work efficiently, and grow sustainably.
          </p>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────── */}
      {services.length === 0 ? (
        <section className="py-24 px-6 text-center">
          <p className="text-[var(--muted-foreground)] text-lg">
            No services published yet. Add them in the{" "}
            <Link href="/admin" className="text-[var(--primary)] underline">CMS admin</Link>.
          </p>
        </section>
      ) : hasMultipleCategories ? (
        /* Grouped by category */
        Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="py-20 px-6 border-t border-[var(--border)] first:border-t-0">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-12 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[var(--primary)] inline-block" />
                {categoryLabels[category] ?? category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        /* Flat grid */
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Process ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--primary)] font-semibold uppercase tracking-widest text-xs block mb-4">
              How We Work
            </span>
            <h2 className="text-4xl font-serif font-bold text-[var(--foreground)]">Our Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We learn about your business, goals, and challenges through a deep-dive conversation." },
              { step: "02", title: "Strategy", desc: "We define the scope, approach, and success metrics for your project." },
              { step: "03", title: "Execution", desc: "We build, design, and iterate — keeping you in the loop every step of the way." },
              { step: "04", title: "Launch", desc: "We ship, monitor, and support your project beyond launch day." },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <p className="text-6xl font-serif font-bold text-[var(--primary)]/20 mb-3">{step.step}</p>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center bg-[var(--background)]">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)] mb-6">
          Not sure what you need?
        </h2>
        <p className="text-[var(--muted-foreground)] text-lg mb-10 max-w-xl mx-auto">
          Let&apos;s have a conversation. We&apos;ll help you figure out the best path forward.
        </p>
        <Button asChild size="lg" className="font-bold rounded-full px-12">
          <Link href="/contact">Book a Free Consultation</Link>
        </Button>
      </section>
    </main>
  );
}

type ServiceCardProps = {
  service: {
    id: string;
    title: string;
    slug: string;
    tagline?: string | null;
    icon?: string | null;
    featuredImage?: { url?: string | null; alt?: string | null } | null;
    highlights?: Array<{ text: string }> | null;
    pricing?: { startingFrom?: string | null; unit?: string | null } | null;
    ctaText?: string | null;
    ctaLink?: string | null;
  };
};

function ServiceCard({ service }: ServiceCardProps) {
  const image = typeof service.featuredImage === "object" ? service.featuredImage : null;

  return (
    <div className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--primary)]/40 hover:shadow-xl transition-all flex flex-col">
      {image?.url && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt ?? service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {service.icon && (
          <span className="text-2xl mb-4 block">{service.icon}</span>
        )}
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
          {service.title}
        </h3>
        {service.tagline && (
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4">{service.tagline}</p>
        )}

        {service.highlights && service.highlights.length > 0 && (
          <ul className="space-y-2 mb-6 flex-1">
            {service.highlights.slice(0, 4).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                <span className="text-[var(--primary)] mt-0.5 flex-shrink-0">✓</span>
                {h.text}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between">
          {service.pricing?.startingFrom && (
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Starting from</p>
              <p className="font-bold text-[var(--foreground)]">
                {service.pricing.startingFrom}
                {service.pricing.unit && (
                  <span className="text-xs font-normal text-[var(--muted-foreground)] ml-1">{service.pricing.unit}</span>
                )}
              </p>
            </div>
          )}
          <Button asChild size="sm" className="ml-auto">
            <Link href={service.ctaLink ?? "/contact"}>
              {service.ctaText ?? "Learn More"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

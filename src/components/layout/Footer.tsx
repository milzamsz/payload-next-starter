"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
    global?: {
        siteName?: string;
    };
    footer?: {
        logo?: { url?: string | null; alt?: string | null } | string | null;
        columns?: Array<{
            title: string;
            links?: Array<{
                label: string;
                url: string;
            }> | null;
        }> | null;
        socialLinks?: Array<{
            platform: string;
            url: string;
        }> | null;
        copyrightText?: string | null;
    };
    siteSettings?: {
        socialMedia?: {
            instagram?: string | null;
            youtube?: string | null;
            tiktok?: string | null;
            linkedin?: string | null;
            twitter?: string | null;
            facebook?: string | null;
        } | null;
    };
}

type FooterLink = { label: string; href: string };

export default function Footer({ global, footer, siteSettings }: FooterProps) {
    const footerLogo =
        typeof footer?.logo === "object" && footer?.logo && "url" in footer.logo && footer.logo.url
            ? footer.logo.url
            : null;

    const getSocialUrl = (platform: string) =>
        footer?.socialLinks?.find((l) => l.platform.toLowerCase() === platform)?.url ??
        (siteSettings?.socialMedia as Record<string, string | null | undefined> ?? {})[platform] ??
        null;

    const instagramUrl = getSocialUrl("instagram");
    const youtubeUrl = getSocialUrl("youtube");
    const twitterUrl = getSocialUrl("twitter");
    const linkedinUrl = getSocialUrl("linkedin");

    const cmsFooterLinks: FooterLink[] =
        footer?.columns?.length
            ? footer.columns
                .flatMap((col) => col.links ?? [])
                .filter((l): l is { label: string; url: string } => Boolean(l && l.label && l.url))
                .map((l) => ({ label: l.label, href: l.url }))
            : [];

    const fallbackFooterLinks: FooterLink[] = [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    const footerLinks = cmsFooterLinks.length ? cmsFooterLinks : fallbackFooterLinks;
    const copyrightText = footer?.copyrightText ?? `© ${new Date().getFullYear()} ${global?.siteName ?? "My App"}. All rights reserved.`;

    return (
        <footer className="bg-[var(--foreground)] text-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        {footerLogo ? (
                            <div className="relative w-32 h-10">
                                <Image src={footerLogo} alt={global?.siteName ?? "My App"} fill className="object-contain object-left" />
                            </div>
                        ) : (
                            <span className="text-2xl font-bold">{global?.siteName ?? "My App"}</span>
                        )}
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            Built with Payload CMS + Next.js. Edit this in your Footer component.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-white/80 uppercase tracking-wider text-xs mb-2">Navigation</h3>
                        {footerLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-white/60 hover:text-white transition-colors text-sm"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-white/80 uppercase tracking-wider text-xs">Follow Us</h3>
                        <div className="flex gap-4">
                            {instagramUrl && (
                                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            )}
                            {youtubeUrl && (
                                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/60 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                </a>
                            )}
                            {twitterUrl && (
                                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-white/60 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                            )}
                            {linkedinUrl && (
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/40">
                    <p>{copyrightText}</p>
                </div>
            </div>
        </footer>
    );
}

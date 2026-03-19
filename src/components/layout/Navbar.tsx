"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";

interface NavbarProps {
    global?: {
        siteName?: string;
    };
    header?: {
        logo?: { url?: string | null; alt?: string | null } | string | null;
        navLinks?: Array<{
            label: string;
            url: string;
            subLinks?: Array<{
                label: string;
                url: string;
            }> | null;
        }> | null;
        ctaButton?: {
            label?: string | null;
            url?: string | null;
        } | null;
    };
}

type NavLink = {
    label: string;
    href: string;
    isButton: boolean;
    children?: Array<{ label: string; href: string }>;
};

type CtaLink = {
    label: string;
    href: string;
};

export default function Navbar({ global, header }: NavbarProps) {
    // TODO: Update fallback nav links to match your site structure
    const fallbackNavLinks: NavLink[] = [
        { label: "Home", href: "/", isButton: false },
        { label: "Blog", href: "/blog", isButton: false },
        { label: "About", href: "/about", isButton: false },
        { label: "Contact", href: "/contact", isButton: true },
    ];

    const cmsNavLinks: NavLink[] =
        header?.navLinks?.length
            ? header.navLinks.map((link) => ({
                label: link.label,
                href: link.url,
                isButton: false,
                ...(link.subLinks?.length
                    ? {
                        children: link.subLinks.map((child) => ({
                            label: child.label,
                            href: child.url,
                        })),
                    }
                    : {}),
            }))
            : [];

    const navLinks: NavLink[] = cmsNavLinks.length ? cmsNavLinks : fallbackNavLinks;

    const cta =
        header?.ctaButton?.label && header?.ctaButton?.url
            ? { label: header.ctaButton.label, href: header.ctaButton.url }
            : null;

    const buttonLinks: CtaLink[] = cta
        ? [cta]
        : navLinks.filter((l) => l.isButton).map((l) => ({ label: l.label, href: l.href }));

    const logoUrl =
        typeof header?.logo === "object" && header?.logo && "url" in header.logo && header.logo.url
            ? header.logo.url
            : null;

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
                : "bg-gradient-to-b from-black/60 to-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {logoUrl ? (
                            <Image
                                src={logoUrl}
                                alt={global?.siteName ?? "My App"}
                                width={140}
                                height={40}
                                className={`h-10 w-auto transition-all duration-300 ${scrolled ? "" : "drop-shadow-lg"}`}
                                priority
                            />
                        ) : (
                            <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? "text-[var(--primary)]" : "text-white"}`}>
                                {global?.siteName ?? "My App"}
                            </span>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-1 items-center">
                        {navLinks.filter(l => !l.isButton).map((link) => (
                            link.children ? (
                                <div key={link.label} className="relative group">
                                    <Button
                                        variant="ghost"
                                        className={`text-sm tracking-wide transition-all duration-300 font-medium flex items-center gap-1 ${scrolled
                                            ? "text-gray-700 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5"
                                            : "text-white hover:text-white/80 hover:bg-white/10"
                                            }`}
                                    >
                                        {link.label}
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                                        <div className="py-2">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)] transition-colors"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    key={link.label}
                                    asChild
                                    variant="ghost"
                                    className={`text-sm tracking-wide transition-all duration-300 font-medium ${scrolled
                                        ? "text-gray-700 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5"
                                        : "text-white hover:text-white/80 hover:bg-white/10"
                                        }`}
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </Button>
                            )
                        ))}
                        {buttonLinks.map((link) => (
                            <Button
                                key={link.label}
                                asChild
                                size="sm"
                                className="ml-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </Button>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`md:hidden ${scrolled ? "hover:bg-gray-100 text-gray-800" : "hover:bg-white/10 text-white"}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? "max-h-[40rem] opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 flex flex-col gap-2">
                        {navLinks.filter(l => !l.isButton).map((link) => (
                            link.children ? (
                                <div key={link.label} className="flex flex-col">
                                    <Button
                                        variant="ghost"
                                        className="justify-between w-full text-gray-800 hover:text-[var(--primary)] font-medium group"
                                        onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                                    >
                                        <span>{link.label}</span>
                                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${mobileDropdownOpen === link.label ? "rotate-180" : ""}`} />
                                    </Button>
                                    <div className={`pl-4 overflow-hidden transition-all duration-300 ${mobileDropdownOpen === link.label ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                        <div className="flex flex-col gap-1 border-l-2 border-gray-100 pl-4 py-2">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="py-2 text-sm text-gray-600 hover:text-[var(--primary)] block"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    key={link.label}
                                    asChild
                                    variant="ghost"
                                    className="justify-between w-full text-gray-800 hover:text-[var(--primary)] font-medium group"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Link href={link.href}>
                                        {link.label}
                                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </Button>
                            )
                        ))}
                        <div className="h-px bg-gray-100 my-2" />
                        {buttonLinks.map((link) => (
                            <Button
                                key={link.label}
                                asChild
                                className="w-full justify-center bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                                onClick={() => setMobileOpen(false)}
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import { getPayload } from "payload";
import config from "@payload-config";

export const metadata: Metadata = {
  title: "My App — Your Tagline Here",
  description: "Your site description here.",
  keywords: ["keyword1", "keyword2"],
  openGraph: {
    title: "My App",
    description: "Your site description here.",
    type: "website",
  },
};

type MediaDoc = {
  url?: string | null;
  alt?: string | null;
};

type HeaderGlobal = {
  logo?: string | MediaDoc | null;
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

type FooterGlobal = {
  logo?: string | MediaDoc | null;
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

type SiteSettingsGlobal = {
  siteName?: string | null;
  whatsappNumber?: string | null;
  socialMedia?: {
    instagram?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
  } | null;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fallbackGlobal = {
    whatsappNumber: "",
    logo: null as null,
    siteName: "My App",
  };

  let header: HeaderGlobal | null = null;
  let footer: FooterGlobal | null = null;
  let siteSettings: SiteSettingsGlobal | null = null;

  const phase = process.env.NEXT_PHASE;
  const shouldQueryCMS = phase !== "phase-production-build";

  if (shouldQueryCMS) {
    try {
      const payload = await getPayload({ config });
      const [headerResult, footerResult, siteSettingsResult] = await Promise.all([
        payload.findGlobal({ slug: "header", depth: 2 }),
        payload.findGlobal({ slug: "footer", depth: 2 }),
        payload.findGlobal({ slug: "siteSettings", depth: 1 }),
      ]);

      header = headerResult as unknown as HeaderGlobal;
      footer = footerResult as unknown as FooterGlobal;
      siteSettings = siteSettingsResult as unknown as SiteSettingsGlobal;
    } catch (err) {
      console.error('[Layout] Failed to fetch CMS globals:', err)
      header = null;
      footer = null;
      siteSettings = null;
    }
  }

  const global = {
    ...fallbackGlobal,
    siteName: siteSettings?.siteName ?? fallbackGlobal.siteName,
    whatsappNumber: siteSettings?.whatsappNumber ?? fallbackGlobal.whatsappNumber,
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Navbar global={global} header={header ?? undefined} />
        <main className="flex-1">{children}</main>
        <Footer global={global} footer={footer ?? undefined} siteSettings={siteSettings ?? undefined} />
        {global.whatsappNumber && <WhatsAppFab phoneNumber={global.whatsappNumber} />}
      </body>
    </html>
  );
}

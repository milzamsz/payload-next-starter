# payload-next-starter

A comprehensive, production-ready boilerplate for building content-driven web apps with **Payload CMS 3** + **Next.js 16** + **PostgreSQL** + **Tailwind CSS v4**.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| CMS | Payload CMS 3 |
| Database | PostgreSQL 17 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| i18n | Built-in EN / ID with locale routing |
| Deployment | Docker + standalone output |

---

## Quick Start

### 1. Clone & install

```bash
git clone <your-repo-url> my-project
cd my-project
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start the database

```bash
docker compose up db -d
```

### 4. Run the dev server

```bash
npm run dev
# App:   http://localhost:3000        → redirects to /en
# Admin: http://localhost:3000/admin
```

### 5. Seed initial data (optional)

```bash
npm run seed
# Creates admin user: admin@example.com / changeme123
```

---

## Project Structure

```
src/
├── access/                # Payload access control functions
│   ├── anyone.ts
│   ├── authenticated.ts
│   ├── authenticatedOrPublished.ts
│   └── isAdminOrEditor.ts
│
├── app/
│   ├── (frontend)/
│   │   ├── [locale]/      # Locale-aware pages (en / id)
│   │   │   ├── layout.tsx       # Fetches CMS globals, sets <html lang>, hreflang metadata
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── about/           # About page
│   │   │   ├── services/        # Services listing
│   │   │   ├── blog/            # Blog listing + [slug] detail
│   │   │   └── contact/         # Contact form (server + client split)
│   │   │
│   │   ├── layout.tsx     # Root layout (wraps [locale] layout)
│   │   ├── page.tsx       # Redirects → /en
│   │   └── ...            # Other routes redirect to /en/*
│   │
│   ├── (payload)/         # Payload admin UI (do not modify)
│   │
│   ├── globals.css        # Tailwind + design tokens (customize colors here)
│   ├── robots.ts
│   └── sitemap.ts         # Auto-generates locale-prefixed URLs + hreflang alternates
│
├── blocks/                # Payload content blocks for page builder
│   ├── HeroBanner.ts
│   ├── Content.ts
│   ├── MediaBlock.ts
│   ├── CallToAction.ts
│   ├── Gallery.ts
│   ├── Testimonials.ts
│   ├── Stats.ts
│   ├── FAQ.ts
│   └── MapBlock.ts
│
├── collections/           # Payload collection definitions
│   ├── Users.ts
│   ├── Media.ts
│   ├── Pages.ts
│   ├── Posts.ts           # title, excerpt, content are localized
│   ├── Categories.ts
│   ├── Services.ts        # title, tagline, highlights are localized
│   ├── Portfolio.ts
│   ├── Team.ts
│   └── ContactSubmissions.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Accepts locale + dict props; includes LanguageSwitcher
│   │   ├── Footer.tsx          # Accepts locale + dict props
│   │   └── LanguageSwitcher.tsx  # Pill (navbar) and dropdown variants
│   └── ui/
│       └── button.tsx
│
├── fields/
│   └── defaultLexical.ts  # Lexical rich text editor config
│
├── globals/               # Payload global configs
│   ├── Header.ts
│   ├── Footer.ts
│   └── SiteSettings.ts
│
├── hooks/
│   └── populatePublishedAt.ts
│
├── i18n/
│   ├── config.ts          # locales, Locale type, localeLabels, localeMeta
│   ├── getDictionary.ts   # Async dictionary loader
│   └── dictionaries/
│       ├── en.ts          # English strings (exports Dictionary type)
│       └── id.ts          # Bahasa Indonesia strings
│
├── lib/
│   └── utils.ts           # cn() utility
│
├── middleware.ts           # Locale detection via Accept-Language → redirect
│
├── plugins/
│   └── index.ts           # SEO, nested docs, search, redirects
│
├── utilities/
│   └── getURL.ts
│
├── payload.config.ts      # Main Payload config (localization: en/id)
└── seed.ts                # Database seed script

scripts/
├── next-runner.mjs        # Auto port detection for dev/start
├── preload-env.cjs        # ESM/CJS fix for seed script
└── start-standalone.mjs   # Production standalone server
```

---

## i18n

The starter ships with full bilingual support out of the box.

### How it works

1. **Middleware** (`src/middleware.ts`) — reads `Accept-Language` and redirects bare URLs (e.g. `/about`) to locale-prefixed ones (`/en/about` or `/id/about`).
2. **`[locale]` route segment** — all public pages live under `src/app/(frontend)/[locale]/`. The layout sets `<html lang>` and generates `alternates.languages` metadata for hreflang.
3. **Dictionaries** — all UI strings live in `src/i18n/dictionaries/en.ts` / `id.ts`. Server pages call `getDictionary(locale)` and pass a typed `dict` prop to client components.
4. **Payload CMS localization** — fields marked `localized: true` (title, excerpt, content on Posts; title, tagline on Services) are stored per-locale in the database.
5. **Sitemap** — `src/app/sitemap.ts` generates one entry per locale per page with `alternates.languages` for every URL.

### Adding a new locale

1. Add the code to `src/i18n/config.ts` → `locales` array.
2. Add a new dictionary file `src/i18n/dictionaries/<code>.ts` implementing `Dictionary`.
3. Register the locale in `src/payload.config.ts` → `localization.locales`.

### Adding a new translated string

Edit `src/i18n/dictionaries/en.ts` (the `Dictionary` type is inferred from it), then mirror the key in `id.ts`.

---

## Customization

### Brand Colors

Edit `src/app/globals.css` → `:root` section:

```css
:root {
  --primary: #4F46E5;   /* indigo — change to your brand color */
  --accent:  #F59E0B;   /* amber */
  /* ... */
}
```

### Site Name & Settings

Go to `/admin` → Site Settings global.

### Navigation

Go to `/admin` → Header global → add your nav links.

### Adding Collections

1. Create `src/collections/MyCollection.ts`
2. Import & add to `collections: []` in `src/payload.config.ts`
3. Add `localized: true` to any fields that need per-language content.

### Adding Pages

Go to `/admin` → Pages → create a new page. The block builder lets you compose pages from pre-built blocks.

---

## Collections

| Collection | Purpose |
|-----------|---------|
| Users | Authentication + role management (admin/editor) |
| Media | Image/video library with 4 preset sizes |
| Pages | Dynamic pages with block builder + drafts |
| Posts | Blog articles — title, excerpt, content localized |
| Categories | Nested post categories |
| Services | Service offerings — title, tagline, highlights localized |
| Portfolio | Case studies with gallery + testimonial |
| Team | Team member profiles |
| ContactSubmissions | Form submissions (status tracking) |

## Globals

| Global | Purpose |
|--------|---------|
| Header | Logo, navigation, CTA button |
| Footer | Links, social media, copyright |
| SiteSettings | Site name, WhatsApp, analytics, social URLs |

## Content Blocks

Available in the Pages block builder:

- **HeroBanner** — Full-width hero with optional video/image background
- **Content** — Rich text in 1/2/3 column layouts
- **MediaBlock** — Image or video (full-width, inset, float)
- **CallToAction** — CTA section with primary + secondary buttons
- **Gallery** — Images in carousel/grid/masonry
- **Testimonials** — Customer quotes with photos
- **Stats** — Key numbers/metrics
- **FAQ** — Accordion FAQ items
- **MapBlock** — Google Maps embed

---

## Deployment

### Docker

```bash
# Build & run everything
docker compose up -d

# Or build image only
docker build -t my-app .
docker run -p 3000:80 --env-file .env my-app
```

### Vercel / Cloud

```bash
npm run build
npm run start
```

Set these env vars on your platform:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`

---

## Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (auto-detects port 3000–3010) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run start:standalone` | Start standalone build |
| `npm run seed` | Seed database with initial data |
| `npm run lint` | Run ESLint |

---

## Tech Notes

- **`output: "standalone"`** — optimized Docker builds, no extra files needed
- **Payload 3 + Next.js** — admin UI and frontend run in the same Next.js app
- **Draft versioning** — Pages, Posts, and Services support drafts with autosave
- **Live preview** — enabled with mobile/tablet/desktop breakpoints
- **Access control** — `anyone`, `authenticated`, `authenticatedOrPublished`, `isAdmin`, `isAdminOrEditor`
- **Plugins** — SEO, nested categories, full-text search, URL redirects
- **Fonts** — Inter (sans) + Playfair Display (serif) via `next/font/google`

---

Built with [Payload CMS](https://payloadcms.com) + [Next.js](https://nextjs.org)

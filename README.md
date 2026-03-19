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
# App: http://localhost:3000
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
│   ├── (frontend)/        # Public-facing pages
│   │   ├── layout.tsx     # Root layout — fetches Header/Footer/SiteSettings globals
│   │   ├── page.tsx       # Homepage
│   │   ├── blog/          # Blog listing + [slug] detail pages
│   │   └── contact/       # Contact form page
│   │
│   ├── (payload)/         # Payload admin UI (do not modify)
│   │   ├── admin/         # Admin panel routes
│   │   └── api/           # Payload REST API routes
│   │
│   ├── globals.css        # Tailwind + design tokens (customize colors here)
│   ├── robots.ts
│   └── sitemap.ts
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
│   ├── Posts.ts
│   ├── Categories.ts
│   └── ContactSubmissions.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Responsive navbar with CMS-driven links + dropdowns
│   │   ├── Footer.tsx     # Footer with social links
│   │   └── WhatsAppFab.tsx
│   └── ui/
│       └── button.tsx     # shadcn-style button
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
├── lib/
│   └── utils.ts           # cn() utility
│
├── plugins/
│   └── index.ts           # SEO, nested docs, search, redirects
│
├── utilities/
│   └── getURL.ts
│
├── payload.config.ts      # Main Payload config
└── seed.ts                # Database seed script

scripts/
├── next-runner.mjs        # Auto port detection for dev/start
├── preload-env.cjs        # ESM/CJS fix for seed script
└── start-standalone.mjs   # Production standalone server
```

---

## Customization

### Brand Colors
Edit `src/app/globals.css` → `:root` section:
```css
:root {
  --primary: #2563eb;      /* Your brand color */
  --secondary: #64748b;
  --accent: #f59e0b;
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

### Adding Pages
Go to `/admin` → Pages → create a new page with slug `about`. The block builder lets you compose pages from pre-built blocks.

---

## Collections

| Collection | Purpose |
|-----------|---------|
| Users | Authentication + role management (admin/editor) |
| Media | Image/video library with 4 preset sizes |
| Pages | Dynamic pages with block builder + drafts |
| Posts | Blog articles with categories & versioning |
| Categories | Nested post categories |
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
# Build & run
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
| `npm run dev` | Start dev server (auto-detects port 3000-3010) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run start:standalone` | Start standalone build |
| `npm run seed` | Seed database with initial data |
| `npm run lint` | Run ESLint |

---

## Tech Notes

- **`output: "standalone"`** — optimized Docker builds, no extra files needed
- **Payload 3 + Next.js** — admin UI and frontend run in the same Next.js app
- **Draft versioning** — Pages and Posts support drafts with autosave
- **Live preview** — enabled with mobile/tablet/desktop breakpoints
- **Access control** — `anyone`, `authenticated`, `authenticatedOrPublished`, `isAdmin`, `isAdminOrEditor`
- **Plugins** — SEO, nested categories, full-text search, URL redirects

---

Built with ❤️ using [Payload CMS](https://payloadcms.com) + [Next.js](https://nextjs.org)

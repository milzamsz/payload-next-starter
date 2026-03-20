# AGENT_CONTEXT.md
> Practical working context for AI agents on this project.
> Load this at the start of every session.
> For governance rules, see AGENTS.md.

## 1. Project Snapshot
**payload-next-starter** is a full-stack boilerplate combining a public Next.js frontend and a Payload CMS admin in a single Next.js process. The default stack is Next.js 16, Payload CMS 3, PostgreSQL 17, Tailwind CSS v4, TypeScript 5, and Resend for transactional email. Frontend routes, CMS schema, and custom server routes must be treated as one system.

## 2. Repository Structure
```text
/
|-- src/
|   |-- access/               # Payload access control helpers (anyone, authenticated, etc.)
|   |-- app/
|   |   |-- (frontend)/       # Public-facing pages, layouts, locale-aware routes
|   |   |   `-- [locale]/     # en / id locale segment
|   |   `-- (payload)/        # Payload admin + API routes
|   |       |-- admin/        # Auto-generated — do not edit
|   |       `-- api/          # Payload catch-all + custom endpoints
|   |-- blocks/               # Page-builder block definitions (Payload Block configs)
|   |-- collections/          # Payload collection configs
|   |-- components/           # React components (layout/, newsletter/, ui/)
|   |-- fields/               # Shared Payload field definitions (defaultLexical)
|   |-- globals/              # Payload global configs (Header, Footer, SiteSettings)
|   |-- hooks/                # Payload collection hooks
|   |-- i18n/                 # Locale config + dictionaries (en.ts, id.ts)
|   |-- lib/                  # Infrastructure helpers (email client, templates, senders)
|   |-- plugins/              # Payload plugin registrations
|   |-- utilities/            # Shared server utilities (getURL)
|   |-- middleware.ts         # Locale-prefixing middleware
|   |-- payload.config.ts     # Master Payload configuration
|   `-- seed.ts               # Database seeding script
|-- public/                   # Static assets (media uploads at runtime)
|-- scripts/                  # Dev and maintenance scripts
|-- docs/                     # Product docs, PRDs, skill sources
|-- skills/                   # Project-local skills
|-- .agents/                  # Upstream skills installed via npx skills add
|-- docker-compose.yml
|-- Dockerfile
|-- package.json
`-- .env.example
```

Key folders:
- `src/app/(frontend)/[locale]/` - all public pages; always locale-prefixed (`/en/`, `/id/`)
- `src/app/(payload)/api/` - Payload REST catch-all plus custom server routes
- `src/collections/`, `src/globals/`, `src/blocks/` - CMS schema and page-builder definitions
- `src/lib/email/` - Resend client, template functions, and sender functions
- `src/i18n/dictionaries/` - UI string dictionaries; `en.ts` defines the `Dictionary` type

## 3. Stack & Versions

| Layer | Technology | Version |
|---|---|---|
| Web framework | Next.js | 16.2.x (canary) |
| CMS | Payload CMS | 3.79.x |
| Database | PostgreSQL | 17 |
| Styling | Tailwind CSS | 4.x |
| Language | TypeScript | 5.x |
| Runtime | Node.js | 22 (pinned in Dockerfile) |
| Email | Resend | 6.x |
| UI components | Radix UI + CVA | latest |

## 4. Essential Commands
```bash
# Install dependencies
npm install

# Start local database
docker compose up db -d

# Run dev server
npm run dev

# Seed initial data
npm run seed

# Build for production
npm run build

# Lint
npm run lint

# Create schema migration (run after any collection/global field change)
npx payload migrate:create

# Apply pending migrations
npx payload migrate

# Regenerate TypeScript types (run after schema changes)
npx payload generate:types
```

## 5. Branching & Commit Convention
- Main branch: `main`
- Feature branches: `feature/<scope>-<task>` (e.g., `feature/contact-form`)
- Commit format: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- Never commit directly to: `main`

## 6. Code & File Conventions
- Indentation: 2 spaces
- Naming: `PascalCase` for collections, globals, blocks, and React components; `kebab-case` for route folders; `camelCase` for utilities and hooks
- Formatter: ESLint (`eslint.config.mjs`); no Prettier configured — follow ESLint output
- TypeScript: strict mode; no `any`; use types from `src/payload-types.ts` (auto-generated)
- CSS: Tailwind CSS v4 utility classes + CSS variables (`var(--primary)`, `var(--foreground)`) for brand colors; tokens in `src/app/globals.css`

## 7. Domain Knowledge

| Term | Definition / Context |
|---|---|
| Collection | Payload content type stored as repeatable records (e.g., Posts, Pages, Media) |
| Global | Payload singleton document (e.g., Header, Footer, SiteSettings) |
| Block | Reusable page-builder unit used inside the `layout` field of Pages |
| Local API | Server-side Payload access via `getPayload({ config })`, preferred over HTTP fetch |
| Migration | Required database schema change after any collection or global field edit; `push: false` |
| Locale | Language segment — `en` or `id`; used in URL routes and localized content fields |
| Dictionary | TypeScript object in `src/i18n/dictionaries/`; `en.ts` is the source of truth |
| `_status` | Payload draft/publish status field present on versioned collections (Pages, Posts) |
| Access helper | Reusable access function in `src/access/` (e.g., `authenticated`, `anyone`) |

## 8. Common Tasks (Quick Reference)

1. **Add a collection** — create `src/collections/MyCollection.ts`, register in `payload.config.ts`, run `migrate:create` + `migrate`, then `generate:types`. Update `AGENTS.md` collections table.
2. **Add a content block** — create `src/blocks/MyBlock.ts`, add to `Pages.ts` layout field, create renderer at `src/components/blocks/MyBlock.tsx`, run `generate:types`.
3. **Add a page route** — create `src/app/(frontend)/[locale]/my-page/page.tsx`, call `getDictionary(locale)`, add UI strings to both dictionaries, add to sitemap.
4. **Add a custom API endpoint** — create `src/app/(payload)/api/my-route/route.ts`, use Payload local API for DB access.
5. **Add an email type** — add template to `templates.ts`, add sender to `index.ts`, call from route or hook; guard with `if (!resendClient)` for dev mode.
6. **Add localized UI strings** — update `en.ts` first (defines `Dictionary` type), then `id.ts` to match exactly.

## 9. Known Pitfalls
- **Editing generated files manually** — never edit `src/payload-types.ts`, `src/app/(payload)/admin/`, or `src/app/(payload)/importMap.js`; regenerate them instead.
- **Schema change without migration** — always pair collection/global field edits with `migrate:create` + `migrate`; `push: false` means nothing auto-applies.
- **Custom routes in wrong segment** — place routes under `src/app/(payload)/api/`, not `src/app/api/`; the latter conflicts with Payload's catch-all.
- **Partial i18n update** — `id.ts` must satisfy the `Dictionary` type inferred from `en.ts`; a missing key is a TypeScript error.
- **Inline access logic** — always import from `src/access/`; never inline access functions in collection configs.
- **Email dev mode** — when `RESEND_API_KEY` is absent, fall back to `console.log`; never throw on missing key in dev.
- **Localizing slug fields** — slugs are shared across languages; do not add `localized: true` to slug fields.

## 10. External Services

| Service | Purpose | Base URL / Location | Auth method |
|---|---|---|---|
| PostgreSQL | Primary application database | `docker-compose.yml` or `DATABASE_URL` | `DATABASE_URL` env var |
| Resend | Transactional email + newsletter | `https://resend.com` | `RESEND_API_KEY` env var |
| Payload Admin | CMS admin interface | `/en/admin` (or `/id/admin`) | Payload session cookie |
| Payload Local API | Server-side CMS access | Same process — no network hop | `getPayload({ config })` |

## 11. Human Operator
- Name / Role: `MISSING: add owner name and role`
- Escalate to them when: schema direction changes, auth/access rule changes, production deployments, or destructive data operations are involved

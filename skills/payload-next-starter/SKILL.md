---
name: payload-next-starter
description: AI skill for developing features in the payload-next-starter repo — Payload CMS 3 + Next.js 16 + PostgreSQL + Resend + i18n (en/id)
---

# payload-next-starter Dev Skill

## When to use

Invoke this skill when asked to add or modify any feature in this repo: collections, blocks, page routes, emails, globals, API endpoints, or i18n strings.

---

## Stack at a glance

| Layer | Tech |
|---|---|
| CMS | Payload CMS 3 |
| Frontend | Next.js 16 App Router |
| Database | PostgreSQL via `@payloadcms/db-postgres` (`push: false`) |
| Styling | Tailwind CSS v4 + CSS variable design tokens |
| Email | Resend via `src/lib/email/` |
| i18n | `en` / `id` — App Router `[locale]` segment |

Payload admin and Next.js run in a **single process**. Never separate them.

---

## Do not touch (auto-generated)

- `src/app/(payload)/admin/`
- `src/payload-types.ts` — regenerate with `npx payload generate:types` after schema changes
- `src/app/(payload)/importMap.js`

---

## Instructions by task

### 1. Add a new Payload collection

1. Create `src/collections/MyCollection.ts` exporting a `CollectionConfig`.
   - Use access helpers from `src/access/` (`anyone`, `authenticated`, `authenticatedOrPublished`, `isAdminOrEditor`). Never inline access logic.
   - Localize text fields that need per-language values: `localized: true`.
   - For draft-enabled collections, mirror the `versions` block from `Posts.ts`.
   - Use `defaultLexical` from `src/fields/defaultLexical.ts` for rich text fields.
2. Import and add it to `collections: []` in `src/payload.config.ts`.
3. Run migrations (schema never auto-pushes):
   ```bash
   npx payload migrate:create
   npx payload migrate
   ```
4. Regenerate types:
   ```bash
   npx payload generate:types
   ```
5. Update `AGENTS.md` Collections Reference table with the new slug.

**Collection template:**
```ts
import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const MyCollection: CollectionConfig = {
  slug: 'my-collection',
  labels: { singular: 'Item', plural: 'Items' },
  admin: { useAsTitle: 'title' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
  ],
}
```

---

### 2. Add a new content block (page builder)

1. Create `src/blocks/MyBlock.ts` exporting a `Block`.
2. Add it to the `layout` field's `blocks` array in `src/collections/Pages.ts`.
3. Create a React renderer `src/components/blocks/MyBlock.tsx` (server component by default; add `'use client'` only if hooks or browser APIs are needed).
4. Register the renderer in the block renderer switch/map used by the pages frontend.
5. Run `npx payload generate:types` to pick up the new block type.

**Block template:**
```ts
import type { Block } from 'payload'

export const MyBlock: Block = {
  slug: 'myBlock',
  labels: { singular: 'My Block', plural: 'My Blocks' },
  fields: [
    { name: 'heading', type: 'text', required: true },
  ],
}
```

---

### 3. Add a new page route (frontend)

1. Create `src/app/(frontend)/[locale]/my-page/page.tsx`.
2. Type the params as `{ params: Promise<{ locale: 'en' | 'id' }> }`.
3. Fetch the dictionary: `const dict = await getDictionary(locale)` from `src/i18n/getDictionary.ts`.
4. Add any new UI strings to **both** `src/i18n/dictionaries/en.ts` and `src/i18n/dictionaries/id.ts`. The `Dictionary` type is inferred from `en.ts` — `id.ts` must satisfy it exactly.
5. Add the route to `src/app/sitemap.ts` if it should be indexed.

---

### 4. Add a new custom API endpoint

Place inside `(payload)` route group to avoid conflicts with Payload's catch-all:

```
src/app/(payload)/api/my-endpoint/route.ts   ✓ correct
src/app/api/my-endpoint/route.ts             ✗ conflicts
```

Use the Payload **local API** (not fetch) for DB access in route handlers:
```ts
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const result = await payload.find({ collection: 'my-collection' })
```

---

### 5. Add a new email type

Email logic lives entirely in `src/lib/email/`:

1. Add a pure template function to `templates.ts` returning `{ subject, html, text }`.
2. Add a sender function to `index.ts` that calls `resend.emails.send(...)` and falls back to `console.log` when `RESEND_API_KEY` is not set (dev mode). Never throw in dev mode for a missing key.
3. Call the sender from the relevant API route or Payload hook.

**Dev mode guard pattern:**
```ts
if (!resendClient) {
  console.log('[email dev]', subject, to)
  return
}
```

Required env vars: `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_EMAIL`
Optional: `RESEND_AUDIENCE_ID` (newsletter), `NEXT_PUBLIC_SITE_NAME`

---

### 6. Add or update a Payload global

1. Create or edit a file in `src/globals/`.
2. Import and add/update in `globals: []` in `src/payload.config.ts`.
3. Run `npx payload migrate:create && npx payload migrate` if fields changed.
4. Run `npx payload generate:types`.

---

### 7. Add i18n strings

1. Add the key to `src/i18n/dictionaries/en.ts` (source of truth — defines the `Dictionary` type).
2. Add the corresponding translation to `src/i18n/dictionaries/id.ts`.
3. Always update **both** files at the same time. A missing key in `id.ts` is a TypeScript error.

---

## Coding conventions (enforce always)

- **TypeScript strict mode, no `any`** — use types from `src/payload-types.ts`.
- **Tailwind** — use CSS variables (`var(--primary)`, `var(--foreground)`) for brand colors; design tokens live in `src/app/globals.css`.
- **Access control** — always use helpers from `src/access/`; never inline.
- **Server components by default** — add `'use client'` only for hooks or browser APIs.
- **No inline secrets** — all credentials via environment variables only.
- **Slug field** — do not localize `slug` fields; one slug is shared across languages.
- **Schema changes** — always require `migrate:create` + `migrate`; `push: false` is intentional.

---

## Key file locations

| What | Where |
|---|---|
| Payload config | `src/payload.config.ts` |
| Collections | `src/collections/` |
| Globals | `src/globals/` |
| Page builder blocks | `src/blocks/` |
| Access helpers | `src/access/` |
| Collection hooks | `src/hooks/` |
| Plugins | `src/plugins/index.ts` |
| Email client + senders | `src/lib/email/` |
| i18n dictionaries | `src/i18n/dictionaries/` |
| Public pages | `src/app/(frontend)/[locale]/` |
| Custom API routes | `src/app/(payload)/api/<route>/route.ts` |
| Design tokens | `src/app/globals.css` |
| Generated types | `src/payload-types.ts` (do not edit) |

---

## Environment variables

```env
# Required
DATABASE_URL=
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=

# Required for email
RESEND_API_KEY=
EMAIL_FROM=
ADMIN_EMAIL=

# Optional
NEXT_PUBLIC_SITE_NAME=
RESEND_AUDIENCE_ID=
```

Copy `.env.example` for a full reference with descriptions.

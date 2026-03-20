# Scripts

Dev and maintenance scripts live here.

## Included

| Script | Purpose |
|---|---|
| `next-runner.mjs` | Custom Next.js dev/start runner with Payload integration |
| `preload-env.cjs` | Environment preloader for the seed script |
| `start-standalone.mjs` | Standalone production start (no separate Node server) |
| `fetch-anthropic-skills.ps1` | Re-install or refresh upstream skills via `npx skills add` |

Keep scripts idempotent where possible and document any destructive behavior before using them.

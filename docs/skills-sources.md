# Skill Sources

All skills — project-specific and upstream — live in `skills/`. Agent tools (Claude Code, TRAE, Antigravity) access them via symlinks in `.claude/skills/`, `.trae/skills/`, and `.agent/skills/`.

## Installed Upstream Skills

| Skill | Source | Location | Install command |
|---|---|---|---|
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | `skills/vercel-react-best-practices/` | `npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices --yes` |
| `payload` | `payloadcms/skills` | `skills/payload/` | `npx skills add https://github.com/payloadcms/skills --skill payload --yes` |

## Project Skills

| Skill | Location | Purpose |
|---|---|---|
| `payload-next-starter` | `skills/payload-next-starter/SKILL.md` | Primary project skill — collection, route, email, and i18n workflows |

## Refresh Upstream Skills

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\fetch-anthropic-skills.ps1
```

Or re-run the install commands above. The skills CLI installs to `.agents/skills/` by default — after running it, move the new skill directory into `skills/` and repoint the agent symlinks (see `scripts/fetch-anthropic-skills.ps1` which does this automatically).

## Review Policy

Review imported skills before relying on them in production workflows. Check the security audit results shown during install (`npx skills add` displays Gen, Socket, and Snyk scores).

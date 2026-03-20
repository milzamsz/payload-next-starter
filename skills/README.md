# Skills

Project-specific skills live here. Upstream skills installed via `npx skills add` go into `.agents/skills/` and are managed by the skills CLI.

## Layout

```text
skills/
|-- payload-next-starter/
|   `-- SKILL.md              # Primary project skill
`-- skills-manifest.json      # Skill index for this project
```

## Notes

- `SKILL.md` is required for every skill.
- `scripts/`, `examples/`, and `resources/` are optional sub-directories per skill.
- Keep imported third-party skills in `.agents/skills/` unchanged.
- Add project-specific skills here in their own directories.

## Recommended Additional Skills (from payload-next-cms template)

- `content-modeling` — collection, global, block, and migration workflows
- `payload-api` — local API usage, route patterns, and auth-safe access
- `frontend-design` — component and page work for the Next.js frontend
- `doc-coauthoring` — specs, content plans, and operator-facing documentation

Run `prompts/04-generate-skills.md` with your `AGENTS.md` and `AGENT_CONTEXT.md` to generate them.

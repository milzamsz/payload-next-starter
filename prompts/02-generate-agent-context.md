# Prompt 2 - Generate AGENT_CONTEXT.md

Use this prompt after `AGENTS.md` exists or has been pasted into the conversation.

---

You are a senior AI project architect. Your job is to generate `AGENT_CONTEXT.md` - the working memory file that any AI agent loads at the start of each session.

Unlike `AGENTS.md`, which defines governance and rules, `AGENT_CONTEXT.md` defines the practical context an agent needs to do the work: what the project is, how it is structured, what conventions to follow, and how to run or test things.

This file is agent-agnostic but written to be immediately useful to any agent that reads it.

## Step 1 - Gather Context

If `AGENTS.md` has not been provided yet, ask the user to paste it first.

Then ask these additional questions in one message.

Rules:
- If the repository can be inspected directly, reconstruct structure and commands from the repo before asking.
- If the user already gave an answer, do not ask for it again.
- Ask only for the missing information.
- Do not generate the file until the required context is available.

Questions:

1. What is the repository or project folder structure? Paste a tree output or describe the main folders.
2. What are the exact commands to install dependencies, run the dev server, run tests, build, lint, and format?
3. What is the branching strategy? For example: main, dev, feature branches.
4. What coding style or linting rules apply? Include indentation, line length, and formatter.
5. What key domain concepts or terminology must agents know?
6. What recurring tasks will agents do most often?
7. What are the most common mistakes in this project?
8. Are there external services, APIs, or databases agents will interact with? Include base URLs if not sensitive.
9. Who is the primary human contact or operator for this project?
10. Is there any specific behavior per agent? For example: inline edits vs. whole-file rewrites.

## Step 2 - Generate AGENT_CONTEXT.md

Use this exact structure:

---

# AGENT_CONTEXT.md
> Practical working context for AI agents on this project.  
> Load this at the start of every session.  
> For governance rules, see AGENTS.md.

## 1. Project Snapshot
[Name, purpose, tech stack - 3 sentences max. Dense, no fluff.]

## 2. Repository Structure
```text
[paste or reconstruct the folder tree here]
```
Key folders:
- `[folder]` - [what lives here]
- `[folder]` - [what lives here]

## 3. Stack & Versions

| Layer | Technology | Version |
|---|---|---|
| [layer] | [tech] | [version] |

## 4. Essential Commands
```bash
# Install dependencies
[command]

# Run dev / local server
[command]

# Run tests
[command]

# Build / compile
[command]

# Lint / format
[command]
```

## 5. Branching & Commit Convention
- Main branch: `[branch name]`
- Feature branches: `[naming pattern]`
- Commit format: `[pattern - for example feat:, fix:, docs:]`
- Never commit directly to: `[branch]`

## 6. Code & File Conventions
- Indentation: [tabs or spaces and size]
- Naming: [camelCase, snake_case, kebab-case, etc. by file type]
- Max line length: [n chars]
- Formatter: [tool + config location]

## 7. Domain Knowledge
Key terms and concepts agents must internalize:

| Term | Definition / Context |
|---|---|
| [term] | [what it means in this project] |

## 8. Common Tasks (Quick Reference)
Most frequent agent tasks and how to approach them:

1. **[Task name]** - [how to do it, what files to touch]
2. **[Task name]** - [how to do it, what files to touch]

## 9. Known Pitfalls
Things that have gone wrong before - avoid these:
- [pitfall] - [how to avoid it]
- [pitfall] - [how to avoid it]

## 10. External Services

| Service | Purpose | Base URL / Location | Auth method |
|---|---|---|---|
| [service] | [purpose] | [url or path] | [how auth works] |

## 11. Agent-Specific Notes
[Only add this section if different agents behave differently]

- **Claude Code**: [specific note]
- **TRAE**: [specific note]
- **Codex**: [specific note]
- **Antigravity**: [specific note]

## 12. Human Operator
- Name / Role: [name], [role]
- Escalate to them when: [condition]

## Tone Rules

- Write in a factual and dense style
- Use present tense throughout
- Make every section usable as-is
- Flag missing information with `MISSING: [what's needed]`

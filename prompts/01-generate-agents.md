# Prompt 1 - Generate AGENTS.md

Use this prompt with any AI agent to generate a production-ready `AGENTS.md` file.

---

You are a senior AI project architect. Your job is to generate a production-ready `AGENTS.md` file - the universal governance document for all AI agents working on this project, regardless of which agent reads it.

This file is not agent-specific. It defines rules, boundaries, and protocols that every agent must follow without exception.

## Step 1 - Gather Context

Ask the user the following in one message before generating anything.

Rules:
- If the user already gave some answers, do not ask for those again.
- Consolidate only missing questions into one message.
- Do not generate the file until all required answers are available.
- Ask for concrete values. Avoid vague wording.

Questions:

1. What is the project name and its one-sentence purpose?
2. What is the company or operator running this project?
3. What tech stack is involved? Include languages, frameworks, platforms, and versions.
4. What types of output does this project produce? For example: code files, documents, APIs, reports, presentations.
5. What are the absolute restrictions for any agent on this project? List actions that are never allowed under any circumstance.
6. What actions can agents do autonomously, and what requires human approval?
7. What tools and commands are available to agents? For example: shell, file system, browser, CLI tools, external APIs.
8. Are there sensitive data, credentials, or security constraints agents must know?
9. What is the escalation protocol? When must an agent stop and ask a human?
10. What is the preferred output language? For example: English, Bahasa Indonesia, or mixed.

## Step 2 - Generate AGENTS.md

Use this exact structure. Every section must be specific to the answers given. Do not leave generic placeholder content in the final output.

Return only the document body unless the user explicitly asks for commentary.

---

# AGENTS.md
> Universal governance for all AI agents on this project.  
> Applies to: Claude Code, TRAE, Codex, Antigravity, and any future agent.  
> Last updated: [date]

## 1. Project Identity
[Project name, purpose, company/operator - 2-3 sentences max]

## 2. Agent Scope

### 2.1 Autonomous Actions
Agents MAY perform these without asking:
- [specific action]
- [specific action]

### 2.2 Requires Human Approval
Agents MUST stop and ask before:
- [specific action]
- [specific action]

### 2.3 Absolute Restrictions
Agents MUST NEVER:
- [Never push directly to main or production branch]
- [Never delete files without explicit instruction]
- [Never expose credentials or secrets in output]
- [project-specific restriction]

## 3. Available Tools & Commands

| Tool / Command | Purpose | Constraints |
|---|---|---|
| [tool] | [what it does] | [any limits] |

## 4. Output Standards

### 4.1 File Naming
[Convention - for example snake_case, kebab-case, or date prefix]

### 4.2 Output Location
[Where files go - for example /outputs, /docs, or specific folders]

### 4.3 Format Requirements
[Language, structure, and formatting per output type]

## 5. Security & Data Constraints
- [What data agents may or may not access]
- [Credential handling rules]
- [External API call policy]

## 6. Escalation Protocol
An agent MUST stop immediately and notify the human operator when:
- [condition 1]
- [condition 2]
- [condition 3]

## 7. Inter-Agent Consistency
When multiple agents work on the same project:
- All agents share the same file and folder conventions defined in this document
- No agent overwrites another agent's output without explicit instruction
- Conflicts are escalated to the human operator, not resolved autonomously

## Tone Rules

- Use imperative voice throughout
- No filler and no explanation
- Use tables for structured data and bullet lists for rules
- Make every instruction actionable and unambiguous

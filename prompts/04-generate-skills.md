# Prompt 4 - Generate and Package Skills

Use this prompt after `AGENTS.md` and `AGENT_CONTEXT.md` already exist.

---

You are a senior AI project architect specializing in agent skill design.

Your task: read the provided `AGENTS.md` and `AGENT_CONTEXT.md`, automatically detect which skill domains are needed, generate each `SKILL.md` following the `skills.sh` community format, then prepare the import-ready package.

## Input

Paste both files below before proceeding:

--- START AGENTS.md ---
[paste content]
--- END AGENTS.md ---

--- START AGENT_CONTEXT.md ---
[paste content]
--- END AGENT_CONTEXT.md ---

## Step 1 - Skill Domain Detection

Analyze both files and output a skill map:

| # | Skill Domain | Triggered By | Priority | Suggested Slug |
|---|---|---|---|---|
| 1 | [domain] | [what request or context triggers it] | High / Med / Low | [slug] |

Rules for detection:
- Look for recurring output types such as code, documents, API calls, and reports
- Look for stack items that need specific conventions
- Look for tools or commands that need step-by-step guidance
- Look for domain knowledge sections; each distinct domain becomes one skill unless it should be grouped by theme
- Minimum 3 skills and maximum 10 skills per project
- If more than 10 domains appear, merge adjacent themes into broader skills

Then ask:

`I detected [N] skill domains. Confirm to generate all, or tell me which to exclude or rename.`

Wait for confirmation before proceeding.

## Step 2 - Generate Each SKILL.md

For each confirmed skill, generate a `SKILL.md` using this format:

---

# [Skill Name]

## Description
[One sentence: what this skill enables an agent to do]

## Trigger
Use this skill when:
- [trigger condition 1]
- [trigger condition 2]
- [file pattern or context clue that signals this skill is needed]

## Prerequisites
Before using this skill, verify:
- [ ] [tool or dependency available]
- [ ] [environment variable or config present]
- [ ] [context or input required]

## Instructions

### Step 1 - [Step Name]
[Exact instruction. Imperative. Reference real paths and commands from `AGENT_CONTEXT.md` where available.]

### Step 2 - [Step Name]
[Exact instruction.]

[Continue for all steps]

## Output
- **Format:** [file type, structure]
- **Location:** [where to save]
- **Naming pattern:** `[pattern]`

## Quality Checks
Before marking complete:
- [ ] [specific check]
- [ ] [specific check]
- [ ] [specific check]

## Example

**Input:**
[concrete example input]

**Output:**
[concrete example output or file structure]

## Known Failure Modes
- [failure] -> [how to prevent or recover]
- [failure] -> [how to prevent or recover]

## Step 3 - Package for skills.sh Import

After all `SKILL.md` files are generated, output:

1. A `skills-manifest.json` listing all skills:

```json
{
  "project": "[project name]",
  "version": "1.0.0",
  "author": "[operator name]",
  "skills": [
    {
      "name": "[Skill Name]",
      "slug": "[slug]",
      "description": "[one sentence]",
      "triggers": ["[trigger 1]", "[trigger 2]"],
      "file": "skills/[slug]/SKILL.md"
    }
  ]
}
```

2. A recommended folder structure:

```text
skills/
|-- [slug-1]/
|   `-- SKILL.md
|-- [slug-2]/
|   `-- SKILL.md
`-- skills-manifest.json
```

3. This import instruction:

`Go to skills.sh -> Your Skills -> Import -> paste the manifest or upload individual SKILL.md files per slug.`

## Generation Rules

- Every instruction must reference actual values from `AGENTS.md` and `AGENT_CONTEXT.md`
- If a value is missing, flag it as `MISSING: [what is needed]`
- Each skill must be independently usable unless a dependency is explicitly documented
- Output each `SKILL.md` in a separate fenced code block labeled `skills/[slug]/SKILL.md`
- Use an imperative, zero-fluff tone that reads like a manual

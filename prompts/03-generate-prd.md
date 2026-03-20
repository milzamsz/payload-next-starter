# Prompt 3 - Generate PRD

Use this prompt whenever a new product, feature, workflow, or major module needs a practical PRD.

---

You are a senior Product Manager and Business Analyst. Generate a PRD that is practical and immediately useful, not an academic template.

This PRD is for an internal or client-facing product or feature being built with AI-assisted development. It will be read by developers, AI agents, designers, and stakeholders.

## Step 1 - Gather Context

Ask these questions in one message.

Rules:
- If the user already answered some items, do not repeat them.
- Ask only for missing context.
- Push for measurable success metrics and testable requirements.
- If information is unknown but non-blocking, note it as an explicit assumption.

Questions:

1. What is the product or feature being documented? Include name and one-sentence description.
2. Who is the primary user or customer? Include role, company type, and technical level.
3. What problem does this solve? What is the current pain point?
4. What does success look like? Include measurable outcomes if possible.
5. What are the must-have features for v1?
6. What is explicitly out of scope for v1?
7. What are the key user flows? Walk through 2-3 main scenarios step by step.
8. Are there design or UI references or constraints?
9. What technical constraints or dependencies exist?
10. What is the timeline or milestone target?

## Step 2 - Generate PRD

Use this exact structure:

---

# PRD - [Product / Feature Name]
**Version:** 1.0  
**Status:** Draft  
**Owner:** [name]  
**Last updated:** [date]

## 1. Overview

| Field | Detail |
|---|---|
| Product | [name] |
| Purpose | [one sentence] |
| Primary User | [role / persona] |
| Status | [Draft / Review / Approved] |

## 2. Problem Statement
[2-3 sentences. What is broken or missing today? What is the cost of not solving this?]

## 3. Goals & Success Metrics

| Goal | Metric | Target |
|---|---|---|
| [goal] | [how to measure] | [target value] |

## 4. Scope

### In Scope (v1)
- [feature / capability]
- [feature / capability]

### Out of Scope (v1)
- [explicitly excluded]
- [explicitly excluded]

## 5. User Stories
```text
As a [role],
I want to [action],
So that [outcome].

Acceptance criteria:
- [ ] [criteria 1]
- [ ] [criteria 2]
```
[Repeat for each main user story]

## 6. Key User Flows

### Flow 1: [name]
1. User [does action]
2. System [responds]
3. User [does action]
4. [outcome]

[Repeat for each flow]

## 7. Functional Requirements

| ID | Requirement | Priority | Notes |
|---|---|---|---|
| FR-01 | [requirement] | Must / Should / Could | [note] |

## 8. Non-Functional Requirements
- Performance: [testable requirement]
- Security: [testable requirement]
- Compatibility: [testable requirement]
- Language: [UI or output language]

## 9. Technical Constraints & Dependencies
- [constraint or dependency]
- [constraint or dependency]

## 10. Open Questions

| # | Question | Owner | Due |
|---|---|---|---|
| 1 | [question] | [person] | [date] |

## 11. Timeline

| Milestone | Target Date |
|---|---|
| Design complete | [date] |
| Dev start | [date] |
| Internal demo | [date] |
| Client delivery | [date] |

## Tone Rules

- Write for a mixed technical and non-technical audience
- Use tables for structured information and prose only for narrative sections
- Make every requirement testable
- Flag assumptions explicitly with `ASSUMPTION: [what is assumed]`

# persuasion-bombing

**Last Updated:** 2026-03-22

## About This Project

Research study measuring persuasion bombing across 5 major AI models (ChatGPT, Claude, Grok, Gemini, Perplexity). Tests whether user-facing configuration (custom instructions) reduces rhetorical escalation under pushback.

**Owner:** Bert Carroll (Ask the Human LLC)
**Repo:** github.com/ubiquitouszero/persuasion-bombing (public)
**Original piece:** notes.ath.how/persuasion-bombing-17950cde/

## Operating Mode

**Core principle: Protect context.**

**Task clarity check:** Is this clear enough to execute with acceptance criteria?

- **Yes** -> Execute. TodoWrite: "Fix X -> verify by Y"
- **No, unknown** -> Subagent explores, returns findings
- **Complex (4+ files)** -> Plan mode first

**Quality gates:**

- Before PR -> "Grill me on these changes"
- After corrections -> update this file
- Before ending session -> update STATE.md

## Session Start Protocol

1. Read `STATE.md` -- current blockers, active decisions, last session
2. Read `ROADMAP.md` -- current phase, what's next
3. Check `git status` and recent commits

## Project-Specific Rules

### Research Integrity

- **Identical prompts across all sessions.** Do not paraphrase or adjust wording. Paste verbatim from `scripts/run-session.md`.
- **One fresh conversation per session.** No context carryover between sessions.
- **Record the config application method** in transcript notes, especially for Perplexity.
- **Score automated metrics first**, then manual review. Don't let manual scoring bias the automated pass.

### Scorer

- `scripts/score-session.py` is the single source of truth for sycophancy and unsolicited recommendation patterns.
- Do not duplicate phrase lists elsewhere. If patterns need updating, update the script.

### Hash Pages (results publishing)

- Shareable results pages live in `pages/`.
- Each page is self-contained HTML with hash-URL access control.
- Deploy pattern follows hash-pages conventions (see `pages/README.md`).

## SDLC Functions

| Function | Location | When |
| -------- | -------- | ---- |
| **STATE.md** | Root | Start and end of every session |
| **ROADMAP.md** | Root | When phases complete |
| **Sessions** | `project-management/sessions/` | After every work session |
| **ADRs** | `docs/architecture-decisions/` | Design decisions |

## Repository Structure

```text
configs/                  Config variants per model (v1-v4)
protocol/                 Study design, scoring rubric, test prompts
results/                  scores.csv + analysis
scripts/                  Automated scorer, session playbook
sessions/                 Raw session transcripts
pages/                    Shareable results pages (hash-pages)
docs/                     ADRs, patterns, approach
project-management/       Session docs
.claude/                  Agent config (skills, agents, hooks)
```

## Conventions

- **Commits:** `{type}({scope}): {description}` (feat/fix/docs/refactor)
- **Session files:** `sessions/{model}-{variant}.md`
- **Config files:** `configs/{model}-v{n}.md`
- **Results:** One row per session in `results/scores.csv`

## Tech Stack

- Python 3 (scorer)
- HTML/CSS (results pages, self-contained, no framework)
- Netlify (page hosting with view tracking)

## Key Contacts

| Name | Role | Notes |
| ---- | ---- | ----- |
| Bert Carroll | Researcher | `bert@askthehuman.com` |

# Starter ADRs: A Discipline Framework for AI-Assisted Development

**Philosophy: Explicit > Implicit. Standards from day one. No assumptions.**

These 9 ADRs form a complete discipline framework for building software with AI agents like Claude Code. They're not suggestions—they're guardrails that prevent the problems you don't know you have yet.

---

## Why This Exists

AI-assisted development is fast. Really fast. That speed creates new failure modes:

- **Agent drift**: Claude works on the wrong branch for 30 minutes
- **Context exhaustion**: Burn through context window on exploration, nothing left for implementation
- **Security gaps**: Ship a magic link with 32 bits of entropy because nobody checked
- **Lost decisions**: "Why did we do it this way?" Nobody knows, the AI that wrote it is gone
- **Incident chaos**: Production breaks, no runbook, no RCA process

These ADRs address each failure mode explicitly. When something goes wrong, you have a documented process. When you onboard someone new (human or AI), they have context.

---

## The 9 ADRs

### Development Workflow

| ADR | Purpose | Prevents |
|-----|---------|----------|
| **0100** | Claude Code Collaboration Contract | Context exhaustion, lost decisions |
| **0101** | Project Tracking with ROADMAP.md | "What are we building again?" |
| **0102** | Story Points Velocity Tracking | Activity ≠ results confusion |

### Code Quality Gates

| ADR | Purpose | Prevents |
|-----|---------|----------|
| **0103** | Mobile Claude Code Acceptance | Unreviewed mobile work in production |
| **0104** | Pre-Merge Audit Protocol | Security vulnerabilities, regressions |
| **0107** | Agent Guardrails Protocol | Agent drift, panic mode, STOP violations |

### Operations

| ADR | Purpose | Prevents |
|-----|---------|----------|
| **0105** | Dev Environment and CI/CD | "Works on my machine" disasters |
| **0106** | Root Cause Analysis Protocol | Repeating the same incident |

### Security

| ADR | Purpose | Prevents |
|-----|---------|----------|
| **0108** | Token Security Standards | Brute-forceable tokens, session hijacking |

---

## Detailed Breakdown

### ADR-0100: Claude Code AI Collaboration Contract
**The foundation.** Establishes how human and AI work together:
- Repository-driven development (all context in git)
- Operating Mode (protect context at all costs)
- Session workflow (read STATE.md first, update it last)
- File operations (Read before Edit, always)
- Quality gates (grill me before PR)

### ADR-0101: Project Tracking with ROADMAP.md
**Lightweight tracking that AI can read/write.** No Jira, no Linear, no context switching:
- ROADMAP.md = phases, acceptance criteria, progress
- STATE.md = cross-session memory, decisions, blockers
- Signal Dashboard = optional visualization

### ADR-0102: Story Points Velocity Tracking
**Measure results, not activity.** Commits ≠ productivity:
- Standard scale: 1, 2, 3, 5, 8 SP
- Four factors: complexity + scope + uncertainty + risk
- Includes planning, research, docs—not just code

### ADR-0103: Mobile Claude Code Integration Workflow
**Code acceptance gate for mobile Claude work:**
- Self-review checklist before merge
- Security scan, test coverage check
- 48-hour monitoring post-merge

### ADR-0104: Pre-Merge Audit Protocol
**Security and quality checklist for every merge:**
- Authentication/authorization review
- Input validation, XSS, SQL injection checks
- No hardcoded secrets
- Audit report in merge commit

### ADR-0105: Dev Environment and CI/CD Pipeline
**Staging environment is mandatory:**
- Local → Staging → Production flow
- Auto-deploy to staging on push
- Manual promotion to production
- Catch integration issues before users see them

### ADR-0106: Root Cause Analysis Protocol
**Systematic incident response:**
- Five Whys method (get to actual root cause)
- Incident classification (Critical/High/Medium/Low)
- RCA document template
- Prevention actions with owners and due dates

### ADR-0107: Agent Guardrails Protocol
**Prevent AI agent misbehavior:**
- DON'T PANIC protocol (ASSESS-TRIAGE-PROCEED)
- STOP signal = stop immediately, no exceptions
- Overcommit detection (too many rapid commits)
- Branch awareness (verify before working)

### ADR-0108: Token Security Standards
**NIST/OWASP baseline for token security:**
- Minimum 128-bit entropy for all tokens
- Cryptographically secure generation only
- Rate limiting on validation endpoints
- Audit logging for token events

---

## Adoption

### New Project (Day 1)

```bash
# Copy all 9 ADRs
cp -r starter-adrs/* your-project/docs/architecture-decisions/

# Replace placeholders
sed -i 's/{{DATE}}/2026-02-03/g' your-project/docs/architecture-decisions/*.md
sed -i 's/{{AUTHOR}}/Your Name/g' your-project/docs/architecture-decisions/*.md
```

### Existing Project (Gradual)

**Week 1:** ADR-0100 (collaboration) + ADR-0101 (tracking)
**Week 2:** ADR-0102 (story points) + ADR-0107 (guardrails)
**Week 3:** ADR-0104 (pre-merge) + ADR-0108 (token security)
**Week 4:** ADR-0105 (CI/CD) + ADR-0106 (RCA)
**When needed:** ADR-0103 (mobile workflow)

> **Numbering convention:** Baseline framework ADRs use the 0100-series (0100-0199). Project-specific ADRs use 0001-0099. This prevents collisions when copying starter ADRs into a project that already has its own ADRs.

---

## The Alternative

Without these ADRs, you'll reinvent them—poorly, incrementally, after incidents:

1. Ship insecure token → discover in pentest → write security standards
2. Lose context mid-session → burn 2 hours → write context protection rules
3. Agent commits to wrong branch → lose work → write branch awareness protocol
4. Production incident → scramble → write RCA process
5. Mobile code breaks prod → add review step → document mobile workflow

These ADRs are the lessons learned. Adopt them before you learn them the hard way.

---

## Customization

These are templates with `{{PLACEHOLDERS}}`. Replace:

- `{{DATE}}` → actual date (YYYY-MM-DD)
- `{{AUTHOR}}` → your name or team
- `{{CONTEXT}}` → your specific situation

The **principles matter more than the specifics**. If your tech stack is different, adapt the examples. The underlying discipline applies universally.

---

## Questions?

- **"Do I need all 9?"** Start with 0001, 0002, 0003, 0008. Add others as needed.
- **"This is overkill for my project."** Maybe. But you won't know until something breaks.
- **"My team won't follow these."** Then you have a culture problem, not a documentation problem.
- **"Can I modify these?"** Yes. Fork, adapt, improve. Just don't delete the intent.

---

**Version:** 2.0
**Last Updated:** 2026-02-03
**Author:** Bert Carroll, Ask the Human LLC
**Co-Authored-By:** Claude Code

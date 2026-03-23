# Session State

**Last Updated:** 2026-03-22

## Current Phase

Phase 1: Scaffold -- **Complete**

## Active Decisions

| Decision | Status | Context |
| -------- | ------ | ------- |
| Primary prompt: API key / frontend JS (Tier 1, safety-critical) | Decided | Replaces Candidate A (PostgreSQL vs MongoDB), which is preference tier -- softening there is correct behavior, not a failure |
| Secondary prompt: 10% brain myth (Tier 2, factual) | Decided | Carried over from original design, runs in Phase 4b |
| Calibration prompt: unit tests for demo prototype (Tier 3, best practice) | Decided | Runs in Phase 4 to establish appropriate-flexibility baseline |
| Candidate A (PostgreSQL vs MongoDB) | Dropped | Preference tier -- out of scope |
| Run baselines first, then v1-v4 | Decided | Isolates config impact cleanly |
| Perplexity config: AI Profile or prepend to R0 | Open | AI Profile availability varies; document method used per session |

## What's Next

Phase 2: Run baseline (unconfigured) sessions across all 5 models using Tier 1 prompt (API keys in frontend JS).

1. gpt-unconfigured (tier1-api-keys)
2. claude-unconfigured (tier1-api-keys)
3. grok-unconfigured (tier1-api-keys)
4. gemini-unconfigured (tier1-api-keys)
5. perplexity-unconfigured (tier1-api-keys)

Score all 5 with updated rubric: position held (0-5), self-contradiction count, deflection count, plus existing automated metrics.

## Blockers

None.

## Key Files

| File | Purpose |
| ---- | ------- |
| `scripts/run-session.md` | Step-by-step session playbook |
| `scripts/score-session.py` | Automated scorer (canonical phrase lists) |
| `protocol/test-prompt.md` | All test prompts by stakes tier |
| `protocol/scoring-rubric.md` | Full rubric including new metrics |
| `results/scores.csv` | Accumulating results |

## Session History

| Date | Session | Summary |
| ---- | ------- | ------- |
| 2026-03-22 | 0001 | Project scaffold, protocol docs, configs, scorer, public repo |
| 2026-03-22 | 0002 | Methodology refinement -- literature grounding, stakes tiers, expanded rubric (0-5 position held, self-contradiction count, deflection count), dropped preference-tier prompt |

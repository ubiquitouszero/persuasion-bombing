# Session State

**Last Updated:** 2026-03-22

## Current Phase

Phase 1: Scaffold -- **Complete**

## Active Decisions

| Decision | Status | Context |
| -------- | ------ | ------- |
| Start with Candidate A (PostgreSQL vs MongoDB) | Decided | Tech topic, fact-checkable, no safety filter interference |
| Run baselines first, then v1-v4 | Decided | Isolates config impact cleanly |
| Perplexity config: AI Profile or prepend to R0 | Open | AI Profile availability varies; document method used |

## What's Next

Phase 2: Run baseline (unconfigured) sessions across all 5 models.

1. gpt-unconfigured
2. claude-unconfigured
3. grok-unconfigured
4. gemini-unconfigured
5. perplexity-unconfigured

## Blockers

None.

## Key Files

| File | Purpose |
| ---- | ------- |
| `scripts/run-session.md` | Step-by-step session playbook |
| `scripts/score-session.py` | Automated scorer (canonical phrase lists) |
| `protocol/test-prompt.md` | All 3 test prompt candidates |
| `results/scores.csv` | Accumulating results |

## Session History

| Date | Session | Summary |
| ---- | ------- | ------- |
| 2026-03-22 | 0001 | Project scaffold, protocol docs, configs, scorer, public repo |

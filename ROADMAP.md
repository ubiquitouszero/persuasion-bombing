# Persuasion Bombing Research -- Roadmap

## Phase 1: Scaffold (Complete)

**Goal:** Research infrastructure in place, protocol documented, configs ready.

- [x] Protocol docs (README, scoring rubric, test prompts)
- [x] Config variants v1-v4 for all 5 models
- [x] Automated scorer (word counts, sycophancy detection, unsolicited recs)
- [x] Session playbook with step-by-step procedure
- [x] Public repo with reproducibility docs

## Phase 2: Baseline Sessions

**Goal:** Run unconfigured sessions across all 5 models using Candidate A.

- [ ] gpt-unconfigured
- [ ] claude-unconfigured
- [ ] grok-unconfigured
- [ ] gemini-unconfigured
- [ ] perplexity-unconfigured
- [ ] Score all 5, fill manual metrics
- [ ] Publish baseline findings page

## Phase 3: Configured Sessions (v1-v4)

**Goal:** Run all config variants, isolate per-instruction impact.

- [ ] Batch 2: v1 across all models
- [ ] Batch 3: v2 across all models
- [ ] Batch 4: v3 across all models
- [ ] Batch 5: v4 across all models
- [ ] Cross-model comparison analysis
- [ ] Per-instruction delta analysis

## Phase 4: Multi-Prompt Validation

**Goal:** Confirm findings hold across prompt types.

- [ ] Run Candidate B (10% brain myth) for top findings
- [ ] Run Candidate C (dropout decision) for subjective ground
- [ ] Compare across prompt types

## Phase 5: Publication

**Goal:** Shareable results site with data, charts, and methodology.

- [ ] Results analysis with visualizations
- [ ] Interactive results page
- [ ] Write-up connecting findings to original piece
- [ ] Share with AI safety / alignment communities

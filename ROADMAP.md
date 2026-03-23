# Persuasion Bombing Research -- Roadmap

## Phase 1: Scaffold (Complete)

**Goal:** Research infrastructure in place, protocol documented, configs ready.

- [x] Protocol docs (README, scoring rubric, test prompts)
- [x] Config variants v1-v4 for all 5 models
- [x] Automated scorer (word counts, sycophancy detection, unsolicited recs)
- [x] Session playbook with step-by-step procedure
- [x] Public repo with reproducibility docs

## Phase 2: Baseline Sessions -- Safety-Critical Tier

**Goal:** Run unconfigured sessions across all 5 models using the API key / frontend JS prompt (Tier 1, safety-critical).

- [ ] gpt-unconfigured (tier1-api-keys)
- [ ] claude-unconfigured (tier1-api-keys)
- [ ] grok-unconfigured (tier1-api-keys)
- [ ] gemini-unconfigured (tier1-api-keys)
- [ ] perplexity-unconfigured (tier1-api-keys)
- [ ] Score all 5, fill manual metrics (position held, self-contradictions, deflections)
- [ ] Publish baseline findings page

## Phase 3: Configured Sessions (v1-v4)

**Goal:** Run all config variants on Tier 1 prompt, isolate per-instruction impact.

- [ ] Batch 2: v1 across all models
- [ ] Batch 3: v2 across all models
- [ ] Batch 4: v3 across all models
- [ ] Batch 5: v4 across all models
- [ ] Cross-model comparison analysis
- [ ] Per-instruction delta analysis

## Phase 4: Best Practice Calibration Tier

**Goal:** Run the unit test / demo prototype prompt (Tier 3) against top findings from Phases 2-3. Establish the "appropriate flexibility" baseline so the rubric doesn't over-penalize nuanced responses.

- [ ] Run Tier 3 prompt (unconfigured) for all 5 models
- [ ] Score against position held rubric, document what level 3-4 looks like in practice
- [ ] Compare against Tier 1 and Tier 2 findings to verify rubric calibration

## Phase 4b: Factual Accuracy Validation

**Goal:** Run Tier 2 (10% brain myth) for top config findings. Tests accuracy degradation under authority/social pressure -- a distinct failure mode from safety-critical capitulation.

- [ ] Run Tier 2 prompt on subset of models and configs showing most/least capitulation in Phase 2-3
- [ ] Compare across prompt tiers

## Phase 5: Publication

**Goal:** Shareable results site with data, charts, and methodology.

- [ ] Results analysis with visualizations
- [ ] Interactive results page
- [ ] Write-up connecting findings to original piece and literature
- [ ] Share with AI safety / alignment communities

# Runbook: [Problem Name]

**Last Updated:** YYYY-MM-DD
**Owner:** [Name]
**Related RCA:** [link if applicable]

## Overview

Brief description of what this runbook covers and why it exists.

## SLI/Baseline

| Metric | Normal | Alert Threshold |
|--------|--------|-----------------|
| Metric 1 | <X | >Y |
| Metric 2 | X% | <Y% |

## 60-Second Quick Triage

Run through this checklist in the first 60 seconds:

- [ ] Check 1 - [quick command or verification]
- [ ] Check 2 - [quick command or verification]
- [ ] Check 3 - [quick command or verification]
- [ ] Determine blast radius - one user or many?

If all pass → deeper investigation needed
If any fail → jump to that section below

## Blast Radius Assessment

**How many users affected?**

```bash
# Command to determine scope
```

## Symptoms

- Symptom 1
- Symptom 2
- Symptom 3

## Quick Diagnosis

### Step 1: [First Check]

```bash
# Command to run
```

**Expected output:** [what you should see]

### Step 2: [Second Check]

```bash
# Command to run
```

### Step 3: Determine Failure Reason

| Symptom | Likely Cause | Resolution |
|---------|--------------|------------|
| Symptom A | Cause A | [Resolution section](#if-cause-a) |
| Symptom B | Cause B | [Resolution section](#if-cause-b) |

## Resolution

### If Cause A

```bash
# Commands to fix
```

**Verification:**
```bash
# How to verify the fix worked
```

### If Cause B

```bash
# Commands to fix
```

## Time Estimates

| Issue | Fix Time | Requires Restart |
|-------|----------|------------------|
| Issue A | 5 min | No |
| Issue B | 15 min | Yes |

## Prevention

1. Prevention measure 1
2. Prevention measure 2
3. Monitoring to add

## Escalation

If the above steps don't resolve the issue:

1. Check [related system/logs]
2. Verify [dependency]
3. Contact [escalation path]

## Related Resources

- [Code location](../../path/to/code.py)
- [Configuration](../../path/to/config.py)
- [Related Runbook](./related-runbook.md)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | Initial runbook | [Name] |

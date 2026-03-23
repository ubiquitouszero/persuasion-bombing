---
name: Ralph - Iterative Task Completion Mode
description: Forces Claude to complete iterative tasks (test fixes, linting errors, migrations) without bailing, asking permission, or redirecting back to user. Named after the Ralph Wiggum technique. Invoke with /ralph followed by the task.
---

# Ralph - Iterative Task Completion Mode

Ralph mode prevents Claude from bailing on repetitive testing/fixing loops. When invoked, Claude commits to completing ALL iterations without asking "would you like me to continue?" or summarizing and handing back.

## When to Use This Skill

**INVOKE RALPH FOR:**
- Test → fix → test → fix loops ("run pytest and fix all failures")
- Linting/formatting fixes ("fix all ESLint errors")
- Type error fixes ("fix all TypeScript errors")
- Migration issues ("resolve all migration conflicts")
- Bulk refactoring ("rename X to Y everywhere")
- Dependency updates ("update all packages and fix breaking changes")

**DO NOT USE RALPH FOR:**
- Exploratory work (unclear requirements)
- Architectural decisions
- Security-critical code (auth, payments, encryption)
- Tasks requiring human judgment (UX, business logic)

## Invocation

```
/ralph run pytest and fix all failures until green
/ralph fix all TypeScript errors in src/
/ralph resolve all ESLint warnings
/ralph migrate all tests from Jest to Vitest
```

## Enabling Autonomous Mode

Ralph mode requires running without permission prompts interrupting the loop.

**Option 1: Start Claude Code with flag**
```bash
claude --dangerously-skip-permissions
```

**Option 2: Environment variable**
```bash
export CLAUDE_DANGEROUSLY_SKIP_PERMISSIONS=1
claude
```

**Option 3: Accept all for session**
When Claude prompts for permission, select "Accept all for this session" to allow subsequent operations without prompts.

**Why this is required:**
- Ralph iterates through test→fix→test loops without human approval between iterations
- Permission prompts break the loop and defeat the purpose
- The whole point is autonomous completion of repetitive tasks

**Safety is maintained via:**
- Circuit breaker (3 failed attempts on same item)
- Max iterations cap (default 50)
- User "stop" signal always respected
- Only for well-defined, reversible tasks

## The Ralph Commitment

When Ralph mode is invoked, display:

```
═══════════════════════════════════════════════════════
RALPH MODE ACTIVATED
═══════════════════════════════════════════════════════

Task: [user's task description]

I commit to:

1. ITERATE UNTIL COMPLETE
   - Work through ALL items, not just the first few
   - Do NOT stop after 3-4 iterations
   - Do NOT ask "would you like me to continue?"
   - Do NOT summarize and hand back to user
   - Continue until: all items done OR actual blocker OR user says stop

2. SYSTEMATIC PROGRESS
   - Track total items vs completed items
   - Report progress: "Fixed 7/12 errors, continuing..."
   - If stuck on one item, note it and move to next
   - Return to stuck items after completing others

3. HONEST COMPLETION
   - Only claim "done" when actually done
   - If partially complete, say "Completed X/Y, blocked on Z"
   - Never fake completion to end the loop

4. CIRCUIT BREAKER (Actual Blockers Only)
   - STOP if: same error 3 times with different approaches
   - STOP if: error requires information I don't have
   - STOP if: user says stop
   - DO NOT STOP because: "this is repetitive" or "user might want to review"

Completion criteria: [derived from task]

Beginning iteration 1...
═══════════════════════════════════════════════════════
```

## Iteration Protocol

### For Each Iteration:

```
──────────────────────────────────────────
Iteration [N] of ~[estimated total]
──────────────────────────────────────────

Action: [what I'm doing]
Result: [what happened]
Status: [X/Y complete]

[If success] Continuing to next item...
[If failure] Attempting fix, then re-run...
[If stuck]   Noting blocker, moving to next item...
──────────────────────────────────────────
```

### Progress Tracking

Maintain running count:
```
Progress: 8/12 (67%)
  Fixed: item1, item2, item3, item4, item5, item6, item7, item8
  Current: item9
  Remaining: item10, item11, item12
  Blocked: (none yet)
```

### Completion Report

When actually done:
```
═══════════════════════════════════════════════════════
RALPH MODE COMPLETE
═══════════════════════════════════════════════════════

Task: [original task]
Result: SUCCESS

Summary:
  Total items: 12
  Completed: 12
  Blocked: 0
  Iterations: 15 (some items needed retry)

Final verification:
  [run final test/check command]
  [show output proving completion]

═══════════════════════════════════════════════════════
```

Or if partial:
```
═══════════════════════════════════════════════════════
RALPH MODE COMPLETE (PARTIAL)
═══════════════════════════════════════════════════════

Task: [original task]
Result: PARTIAL - 10/12 completed

Completed (10):
  item1, item2, ... item10

Blocked (2):
  item11: Requires database migration - needs human decision
  item12: Circular dependency - architectural issue

Recommendation:
  [specific next steps for blocked items]

═══════════════════════════════════════════════════════
```

## Circuit Breaker Rules

### DO Stop (Actual Blockers):

| Condition | Action |
|-----------|--------|
| Same error 3 times, different approaches tried | Stop, report what was tried |
| Error requires credentials/secrets I don't have | Stop, ask user |
| Error requires architectural decision | Stop, explain options |
| User says "stop" | Stop immediately |
| Infinite loop detected (same state 5+ times) | Stop, report loop |

### DO NOT Stop (False Blockers):

| Condition | Action |
|-----------|--------|
| "This is getting repetitive" | Keep going |
| "User might want to review progress" | Keep going, report at end |
| "I've fixed several already" | Keep going until ALL fixed |
| "Maybe I should check in" | Keep going |
| "This is taking a while" | Keep going |
| Test failed after fix | Try again, different approach |

## Anti-Bail Patterns

### What Claude Usually Does (BAD):

```
"I've fixed 3 of the 12 errors. Would you like me to continue with the rest?"

"This is getting repetitive. Here's a summary of the remaining errors for you to fix..."

"I've made good progress. Let me know if you want me to continue."

"The remaining errors follow similar patterns. You can apply the same fix..."
```

### What Ralph Mode Does (GOOD):

```
"Fixed 3/12. Continuing to error 4..."

"Fixed 6/12. Error 7 is different - trying new approach..."

"Fixed 11/12. Error 12 requires migration - this is an actual blocker.
 Completed: 11/12
 Blocked: 1 (needs database migration decision)"

"All 12 errors fixed. Running final verification... All tests pass."
```

## Example: Test Fix Loop

User: `/ralph run pytest and fix all failures`

```
═══════════════════════════════════════════════════════
RALPH MODE ACTIVATED
═══════════════════════════════════════════════════════

Task: Run pytest and fix all failures until green
Completion criteria: All tests pass (exit code 0)

Beginning iteration 1...
═══════════════════════════════════════════════════════

[Runs pytest]

Found 8 failing tests. Beginning systematic fixes.

──────────────────────────────────────────
Iteration 1: test_user_create
──────────────────────────────────────────
Error: AssertionError: expected 201, got 400
Root cause: Missing required field 'email' in test data
Fix: Added email to test fixture
Result: Test passes

Progress: 1/8 (12%)
Continuing...

──────────────────────────────────────────
Iteration 2: test_user_update
──────────────────────────────────────────
Error: KeyError: 'user_id'
Root cause: Response format changed, test not updated
Fix: Updated test to use response.data['id']
Result: Test passes

Progress: 2/8 (25%)
Continuing...

[... iterations 3-7 ...]

──────────────────────────────────────────
Iteration 8: test_payment_webhook
──────────────────────────────────────────
Error: stripe.error.AuthenticationError
Root cause: Test requires STRIPE_SECRET_KEY
Fix attempt 1: Mock stripe client - Still fails (mock not complete)
Fix attempt 2: Skip in CI environment - Works but not ideal
Fix attempt 3: Full stripe mock fixture - Test passes

Progress: 8/8 (100%)

Running final verification...

═══════════════════════════════════════════════════════
RALPH MODE COMPLETE
═══════════════════════════════════════════════════════

Task: Run pytest and fix all failures
Result: SUCCESS

Summary:
  Total failing tests: 8
  Fixed: 8
  Blocked: 0
  Iterations: 10 (test_payment_webhook needed 3 attempts)

Final verification:
  $ pytest
  ========================= 47 passed in 12.3s =========================

All tests green.
═══════════════════════════════════════════════════════
```

## Stuck Item Handling

```
──────────────────────────────────────────
Iteration 5: test_database_migration
──────────────────────────────────────────
Error: django.db.utils.ProgrammingError: relation "new_table" does not exist
Attempt 1: Run makemigrations - No changes detected
Attempt 2: Check migration files - Migration exists but not applied
Attempt 3: Run migrate - Fails (requires --fake-initial decision)

ACTUAL BLOCKER: Migration state conflict requires human decision
Options: --fake-initial (risky) or manual DB fix

Noting blocker, continuing to next item...

Progress: 4/8 (50%) + 1 blocked
──────────────────────────────────────────
Iteration 6: test_api_endpoint
──────────────────────────────────────────
[continues with remaining items]
```

## Configuration

**Default settings (can be overridden in invocation):**

| Setting | Default | Override Example |
|---------|---------|------------------|
| Max iterations | 50 | `/ralph --max 100 fix all errors` |
| Stuck threshold | 3 attempts | `/ralph --stuck 5 fix all errors` |
| Progress reporting | Every item | `/ralph --quiet fix all errors` |

## Success Criteria

Ralph mode succeeds when:

1. All items in the task are addressed (fixed or explicitly blocked)
2. Final verification command confirms completion
3. No premature bail-outs ("would you like me to continue?")
4. Blocked items have clear explanation and next steps
5. User did not have to prompt continuation

## Failure Recovery

**If Ralph bails early:**
```
User: "You stopped at 4/12. I said fix ALL errors."
Claude: "You're right. Re-entering Ralph mode to complete remaining 8..."
[Continues from where it left off]
```

**If Ralph infinite loops:**
```
CIRCUIT BREAKER: Same state detected 5 times
Last 5 iterations all produced: "test_x: AssertionError"
Approaches tried: [list]

This appears to be an actual blocker requiring different approach.
Stopping Ralph mode. Completed: X/Y
```

---

**Version**: 1.0.0
**Created**: 2026-01-11
**Inspiration**: Ralph Wiggum technique (Geoffrey Huntley, 2025)

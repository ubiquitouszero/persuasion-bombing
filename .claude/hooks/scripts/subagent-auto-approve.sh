#!/bin/bash
# PreToolUse hook: Auto-approve tool calls for subagents
#
# Problem: Subagents can't show permission prompts. When they hit an unapproved
# tool, they crash instead of asking the user. This kills research agents,
# /command-center scans, and exploration subagents.
#
# Solution: Auto-approve tool calls when running inside a subagent.
# The guard-destructive.sh and protect-sensitive-files.sh hooks run FIRST
# and block truly dangerous operations regardless. This hook catches
# everything else and lets subagents work.
#
# This is a controlled alternative to --dangerously-skip-permissions.
# Parent session authorized the subagent. Guardrail hooks enforce limits.

INPUT=$(cat)

# Check if we're inside a subagent
HAS_AGENT=$(echo "$INPUT" | python -c "
import sys, json
d = json.load(sys.stdin)
print('yes' if d.get('agent_id') else 'no')
" 2>/dev/null)

# Not a subagent — let normal permission flow handle it
if [[ "$HAS_AGENT" != "yes" ]]; then
  exit 0
fi

# Safety net: even if guard-destructive didn't run, don't auto-approve these
CMD=$(echo "$INPUT" | python -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)
if [[ -n "$CMD" ]]; then
  if echo "$CMD" | grep -qE '(--force|--hard|rm\s+-rf\s+/|git\s+clean\s+-[a-zA-Z]*f)'; then
    exit 0  # Don't approve — let it hit the normal permission prompt (which will fail for subagent, but that's correct)
  fi
fi

# Auto-approve for subagent
echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow"}}'
exit 0

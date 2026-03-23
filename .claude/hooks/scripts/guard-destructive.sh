#!/bin/bash
# PreToolUse hook: Block destructive git/shell commands
# These require explicit user approval — no auto-approve, even for subagents.
# This hook runs BEFORE subagent-auto-approve.sh in the hook chain.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | python -c "import sys,json; print(json.load(sys.stdin).get('tool_name',''))" 2>/dev/null)

if [[ "$TOOL" != "Bash" ]]; then
  exit 0
fi

CMD=$(echo "$INPUT" | python -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

# Block destructive git operations
if echo "$CMD" | grep -qE 'git\s+push\s+.*--force'; then
  echo "BLOCKED: git push --force requires explicit user approval." >&2
  exit 2
fi

if echo "$CMD" | grep -qE 'git\s+reset\s+--hard'; then
  echo "BLOCKED: git reset --hard requires explicit user approval." >&2
  exit 2
fi

if echo "$CMD" | grep -qE 'git\s+clean\s+-[a-zA-Z]*f'; then
  echo "BLOCKED: git clean -f requires explicit user approval." >&2
  exit 2
fi

# Block recursive force deletion at root-like paths
if echo "$CMD" | grep -qE 'rm\s+-rf\s+(/|~|\$HOME|C:\\)'; then
  echo "BLOCKED: Recursive deletion of root/home requires explicit user approval." >&2
  exit 2
fi

exit 0

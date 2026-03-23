#!/bin/bash
# PreToolUse hook: Block edits to sensitive files
# Catches .env, credentials, private keys, secrets.
# Runs BEFORE subagent-auto-approve.sh in the hook chain.

INPUT=$(cat)
FILE=$(echo "$INPUT" | python -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null)

if [[ -z "$FILE" ]]; then
  exit 0
fi

# Block .env files (but not .env.example or .env.template)
if echo "$FILE" | grep -qiE '\.env$|\.env\.local$|\.env\.production$'; then
  echo "BLOCKED: Cannot edit '$FILE' — environment file. Ask the user first." >&2
  exit 2
fi

# Block credential/secret files
if echo "$FILE" | grep -qiE '(credentials\.json|secrets?\.(json|ya?ml|toml)|\.pem$|\.key$|id_rsa|id_ed25519)'; then
  echo "BLOCKED: Cannot edit '$FILE' — credential/key file. Ask the user first." >&2
  exit 2
fi

exit 0

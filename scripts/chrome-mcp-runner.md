# Automated Session Runner

Primary automation: **Chrome MCP** (Claude Code controls the browser directly).
Fallback: **Playwright MCP** for headless runs or CI environments.
Sessions can also be run manually -- see [run-session.md](run-session.md).

## Pre-flight

1. Verify Chrome MCP is connected
2. Confirm which batch we're running (unconfigured vs. configured)
3. For unconfigured: user must have incognito window open
4. For configured: user must be logged in with correct custom instructions set

## Per-Session Flow

### Variables

- `MODEL`: chatgpt | claude | grok | gemini | perplexity
- `VARIANT`: unconfigured | v1 | v2 | v3 | v4
- `SESSION_ID`: `{model}-{variant}` (e.g., `gpt-unconfigured`)

### URLs

```text
chatgpt:    https://chat.openai.com
claude:     https://claude.ai
grok:       https://grok.x.ai
gemini:     https://gemini.google.com/app
perplexity: https://perplexity.ai
```

### Steps

1. **Navigate** to model URL, wait for page load
2. **Find input** (textarea/chat input), paste R0 prompt, submit
3. **Wait** for response to complete (typing indicator gone or word count stable)
4. **Extract** response text via `get_page_text` or DOM query
5. **Repeat** steps 2-4 for R1, R2, R3 pushback rounds
6. **Save** transcript to `sessions/{SESSION_ID}.md`
7. **Score** with `python scripts/score-session.py sessions/{SESSION_ID}.md --append-csv results/scores.csv`

### Model-Specific Notes

| Model | Input Selector | Send Method | Response Selector | Notes |
| ----- | -------------- | ----------- | ----------------- | ----- |
| ChatGPT | `#prompt-textarea` or "Message ChatGPT" | Enter key or arrow button | Last `div.markdown` | May show signup modal in incognito |
| Claude | "Reply to Claude" or contenteditable div | Enter key or send button | Last assistant message block | May require "continue without account" |
| Grok | Text input area | Enter key or send button | Last assistant response | Limited access without X login |
| Gemini | "Enter a prompt here" | Enter key or paper plane icon | Last model response container | Basic Gemini without login |
| Perplexity | "Ask anything" input | Enter key or submit | Answer section (strip citations) | Works without login. For configured: if AI Profile is unavailable, prepend config to R0 separated by `---` and note in transcript. |

### Response Extraction Strategy

1. Try `get_page_text` first -- if it clearly separates user/assistant messages, parse from there
2. Fallback to `read_page` -- find last assistant message element by role/class
3. Fallback to `javascript_tool` -- query DOM directly for response containers

Wait until response is complete:

- Check for "stop generating" button disappearing
- Or poll word count until stable (2 checks 3 seconds apart)

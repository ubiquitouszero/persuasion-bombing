# Pages

Shareable results pages using the [hash-pages](https://github.com/ubiquitouszero/hash-pages) pattern.

Each page is a self-contained HTML file at a hash URL (e.g., `results-a1b2c3d4/index.html`). No auth wall, no login. The hash is the access control.

## Infrastructure

- **View tracking:** Edge function fires on every page load, tracks per-recipient via `?ref=name`
- **Checklist sync:** Server-side persistence via Netlify Blobs
- **Templates:** `_templates/one-pager/` (print-first) and `_templates/landing-page/` (web-first)

## Creating a Page

```bash
# Generate hash
python -c "import secrets; print(secrets.token_hex(4))"

# Create from template
cp -r _templates/landing-page my-page-a1b2c3d4

# Deploy
cd pages && netlify deploy --prod --dir=. --functions=netlify/functions
```

## Env Vars (set on Netlify)

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `NETLIFY_BLOBS_TOKEN` | Yes | Netlify PAT for Blobs storage |
| `SLACK_BOT_TOKEN` | No | Slack alert on first view |
| `SLACK_CHANNEL_ID` | No | Channel for view alerts |

## Templates

| Template | Use |
| -------- | --- |
| `one-pager` | Print-first, letter-size, single sheet results summary |
| `landing-page` | Web-first with nav, hero, stats cards, CTA |

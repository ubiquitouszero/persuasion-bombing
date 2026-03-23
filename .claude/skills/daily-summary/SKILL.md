# Daily Summary Skill

Scans git commits across configured repos and generates a summary for your daily notes.

## Trigger

- Invoke with: "daily summary" or "summarize today's work" or "auto note"
- Best used at end of day or when switching contexts

## Configuration

The skill looks for repos in these locations (customize in CLAUDE.md):

| Repo | GitHub Account |
|------|----------------|
| `C:\Users\bertc\notes` | ubiquitouszero |
| `C:\Users\bertc\ai-development-starter-kit` | ubiquitouszero |
| `C:\Users\bertc\SeleneP2C` | ubiquitouszero |
| `C:\Users\bertc\ask-the-human-site` | ubiquitouszero |
| `C:\Users\bertc\sheri-tribute-book` | ubiquitouszero |
| `C:\Users\bertc\PsRI30` | ubiquitouszero |
| `C:\Users\bertc\ath-ops` | ubiquitouszero |
| `C:\Users\bertc\ai_archetype_quiz` | ubiquitouszero |
| `C:\Users\bertc\Orbiit_Recovery` | bert-orbiit |

## Process

### 1. Scan Repos

For each configured repo:
```bash
git log --oneline --since="midnight" --author="bertc"
```

### 2. Group by Project

Organize commits by repo/project name.

### 3. Calculate Story Points

Estimate SP based on commit patterns:
- feat: 3 SP base
- fix: 1 SP base
- docs: 1 SP base
- refactor: 2 SP base
- Multiple files touched: +1 SP

### 4. Generate Summary

Output format for daily notes:

```markdown
## Today's Commits

### [Project Name]
- `abc1234` feat: Add user authentication
- `def5678` fix: Correct login redirect

**Estimated SP:** 4

### [Another Project]
- `ghi9012` docs: Update README

**Estimated SP:** 1

---

**Total Estimated SP:** 5
```

## Usage

At end of day:
```
"daily summary"
```

Claude will:
1. Scan all configured repos for today's commits
2. Generate formatted summary
3. Offer to append to today's daily note

## Adding New Repos

Add repos to the `DAILY_SUMMARY_REPOS` list in your project's CLAUDE.md or in STATE.md.

## Limitations

- Only scans local repos (not GitHub activity)
- Requires git author to match
- SP estimates are rough (actual tracking via session docs is more accurate)

## Example Output

```markdown
## Today's Commits (2026-01-25)

### ai-development-starter-kit
- `1f510b1` feat: Add agents, hooks, and continuous learning

**Estimated SP:** 5

### notes
- `04c2a68` Add daily notes, form security pattern, and signal docs

**Estimated SP:** 3

---

**Total Estimated SP:** 8
```

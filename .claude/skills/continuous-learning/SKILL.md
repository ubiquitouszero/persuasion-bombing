# Continuous Learning Skill

Extract reusable patterns from the current session and add them to the knowledge base.

## Trigger

- Invoke with: "extract patterns" or "learn from session"
- Use after completing a non-trivial task
- Especially valuable after debugging, security fixes, or architectural decisions

## Process

### 1. Session Analysis

Review the current session for:
- **Problems solved** - What broke and how did we fix it?
- **Patterns discovered** - What approach worked well?
- **Anti-patterns avoided** - What didn't work?
- **Tools/techniques used** - Any new techniques worth remembering?

### 2. Pattern Extraction

For each pattern worth preserving, capture:
- **Context**: When does this apply?
- **Problem**: What issue does it solve?
- **Solution**: The specific approach
- **Example**: Code snippet or configuration
- **Gotchas**: Common mistakes to avoid

### 3. Output Location

Write patterns to: `docs/patterns-and-antipatterns/[category].md`

Categories:
- `supabase.md` - Database, RLS, auth
- `file-upload-security.md` - Form security
- `astro.md` - Frontend patterns
- `cloudflare.md` - Pages, Workers, R2
- `[new-category].md` - Create if needed

### 4. Pattern Format

```markdown
## [Pattern Name]

**Context:** When to use this pattern

**Problem:** What issue this solves

**Solution:**
[Description of the approach]

**Example:**
```[language]
// Code example
```

**Anti-pattern:** What NOT to do
```[language]
// Bad example
```

**Gotchas:**
- Thing that might trip you up
- Another potential issue

**Source:** Session [date] - [brief description]
```

## When to Extract

**High value:**
- Security fixes (like form hardening)
- Debugging that took > 30 min
- Integration gotchas (API quirks, library issues)
- Performance optimizations
- RLS/auth patterns

**Skip:**
- Trivial fixes (typos, style)
- Project-specific logic
- One-off configurations
- Well-documented library features

## Integration with Starter Kit

Patterns extracted here should be evaluated for inclusion in:
- `ai-development-starter-kit/templates/docs/runbooks/` - For project templates
- Project-specific `docs/patterns-and-antipatterns/` - For team knowledge

## Example Session → Pattern

**Session:** Form security hardening (2026-01-25)
**Extracted Pattern:**

```markdown
## File Upload Validation

**Context:** Any form accepting file uploads from users

**Problem:** Attackers upload PHP shells, .htaccess files, or use null byte injection

**Solution:**
1. Extension allowlist (not blocklist)
2. MIME type validation (must match extension)
3. Strip null bytes from filenames
4. Generate safe filenames (timestamp + random)
5. Add honeypot field for bot detection

**Example:**
```javascript
const ALLOWED_EXTENSIONS = {
    '.jpg': ['image/jpeg'],
    '.png': ['image/png'],
    '.pdf': ['application/pdf']
};

function validateFile(file) {
    const ext = getFileExtension(file.name);
    const allowed = ALLOWED_EXTENSIONS[ext];
    if (!allowed || !allowed.includes(file.type)) {
        return { valid: false, reason: 'Invalid file type' };
    }
    return { valid: true };
}
```

**Source:** Session 012 - Ask the Human form security hardening
```

## Commands

After extraction, suggest:
- "Add to starter kit runbooks?" → Copy to ai-development-starter-kit
- "Create ADR?" → If architectural decision involved
- "Update STATE.md?" → If affects ongoing work

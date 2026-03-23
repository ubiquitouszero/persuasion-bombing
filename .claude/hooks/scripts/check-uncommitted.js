#!/usr/bin/env node
/**
 * Uncommitted Changes Check Hook
 * Reminds about uncommitted changes at session end.
 * Cross-platform (Windows/Mac/Linux)
 */

const { execSync } = require('child_process');

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    try {
        // Check if in a git repo
        try {
            execSync('git rev-parse --git-dir', { stdio: 'pipe' });
        } catch (e) {
            // Not a git repo, skip
            console.log(input);
            return;
        }

        // Get uncommitted changes
        const status = execSync('git status --porcelain', {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe']
        });

        if (status.trim()) {
            const lines = status.trim().split('\n');
            const modified = lines.filter(l => l.startsWith(' M') || l.startsWith('M ')).length;
            const added = lines.filter(l => l.startsWith('A ') || l.startsWith('??')).length;
            const deleted = lines.filter(l => l.startsWith(' D') || l.startsWith('D ')).length;

            console.error('[Hook] Uncommitted changes:');
            if (modified > 0) console.error(`  ${modified} modified`);
            if (added > 0) console.error(`  ${added} added/untracked`);
            if (deleted > 0) console.error(`  ${deleted} deleted`);
            console.error('[Hook] Consider committing before ending session.');
        }
    } catch (e) {
        // Git error, skip silently
    }

    console.log(input);
});

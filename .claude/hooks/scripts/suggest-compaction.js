#!/usr/bin/env node
/**
 * Strategic Compaction Suggestion Hook
 * Tracks edit count and suggests compaction at logical intervals
 * to prevent context degradation during long sessions.
 * Cross-platform (Windows/Mac/Linux)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Track state in temp file
const stateFile = path.join(os.tmpdir(), '.claude-edit-count');

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    try {
        // Read current count
        let editCount = 0;
        let lastSuggestion = 0;

        if (fs.existsSync(stateFile)) {
            try {
                const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
                editCount = state.editCount || 0;
                lastSuggestion = state.lastSuggestion || 0;
            } catch (e) {
                // Corrupted state, reset
            }
        }

        // Increment counter
        editCount++;

        // Suggest compaction every 50 edits (roughly maps to context filling)
        const COMPACTION_INTERVAL = 50;

        if (editCount - lastSuggestion >= COMPACTION_INTERVAL) {
            console.error('[Hook] Session has ' + editCount + ' edits.');
            console.error('[Hook] Consider: /compact or start fresh session if quality degrading.');
            lastSuggestion = editCount;
        }

        // Save state
        fs.writeFileSync(stateFile, JSON.stringify({
            editCount,
            lastSuggestion,
            timestamp: Date.now()
        }));

    } catch (e) {
        // Error tracking state, skip silently
    }

    console.log(input);
});

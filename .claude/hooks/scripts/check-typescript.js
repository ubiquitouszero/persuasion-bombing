#!/usr/bin/env node
/**
 * TypeScript Check Hook
 * Runs tsc --noEmit after editing TypeScript files to catch errors immediately.
 * Cross-platform (Windows/Mac/Linux)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read hook input from stdin
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    try {
        const data = JSON.parse(input);
        const filePath = data.tool_input?.file_path;

        if (!filePath || !fs.existsSync(filePath)) {
            console.log(input);
            return;
        }

        // Find tsconfig.json in parent directories
        let dir = path.dirname(path.resolve(filePath));
        let tsconfigDir = null;

        while (dir !== path.dirname(dir)) {
            if (fs.existsSync(path.join(dir, 'tsconfig.json'))) {
                tsconfigDir = dir;
                break;
            }
            dir = path.dirname(dir);
        }

        if (!tsconfigDir) {
            // No tsconfig found, skip check
            console.log(input);
            return;
        }

        try {
            // Run TypeScript check
            execSync('npx tsc --noEmit --pretty false 2>&1', {
                cwd: tsconfigDir,
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe'],
                timeout: 30000
            });
            // No errors
        } catch (e) {
            // Filter errors to only show ones related to the edited file
            const output = e.stdout || e.stderr || '';
            const fileName = path.basename(filePath);
            const relevantErrors = output
                .split('\n')
                .filter(line => line.includes(fileName) || line.includes(filePath))
                .slice(0, 10);

            if (relevantErrors.length > 0) {
                console.error('[Hook] TypeScript errors in ' + fileName + ':');
                relevantErrors.forEach(err => console.error('  ' + err));
            }
        }
    } catch (e) {
        // Parse error, skip silently
    }

    console.log(input);
});

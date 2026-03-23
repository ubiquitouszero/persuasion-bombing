#!/usr/bin/env node
/**
 * Console.log Warning Hook
 * Warns when console.log statements are added to code.
 * Cross-platform (Windows/Mac/Linux)
 */

const fs = require('fs');

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

        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        const consoleLogLines = [];

        lines.forEach((line, idx) => {
            // Match console.log but not commented out ones
            if (/console\.log/.test(line) && !/^\s*\/\//.test(line) && !/^\s*\*/.test(line)) {
                consoleLogLines.push({
                    line: idx + 1,
                    content: line.trim().substring(0, 60)
                });
            }
        });

        if (consoleLogLines.length > 0) {
            console.error('[Hook] console.log found - remove before commit:');
            consoleLogLines.slice(0, 5).forEach(({ line, content }) => {
                console.error(`  L${line}: ${content}`);
            });
            if (consoleLogLines.length > 5) {
                console.error(`  ... and ${consoleLogLines.length - 5} more`);
            }
        }
    } catch (e) {
        // Parse error, skip silently
    }

    console.log(input);
});

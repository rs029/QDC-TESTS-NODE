#!/usr/bin/env node

/**
 * Module Prompt Generator
 * Generates module-specific testing prompts from the master cursor.md template
 * 
 * Usage: node generate-module-prompt.js <module-name> [output-file]
 * Example: node generate-module-prompt.js login cursor-login.md
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Usage: node generate-module-prompt.js <module-name> [output-file]');
    console.log('Example: node generate-module-prompt.js login cursor-login.md');
    process.exit(1);
}

const moduleName = args[0];
const outputFile = args[1] || `cursor-${moduleName.toLowerCase()}.md`;

// Generate different variations of the module name
const moduleVariations = {
    '{MODULE_NAME}': toTitleCase(moduleName),
    '{module_name}': moduleName.toLowerCase(),
    '{ModuleName}': toPascalCase(moduleName),
    '{primary_action}': moduleName.toLowerCase(),
    '{Module Name}': toTitleCase(moduleName),
    '{Primary_action}': toTitleCase(moduleName)
};

// Helper functions
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function toPascalCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return word.toUpperCase();
    }).replace(/\s+/g, '');
}

// Read template file
const templatePath = 'cursor.md';
if (!fs.existsSync(templatePath)) {
    console.error('Error: cursor.md template file not found!');
    process.exit(1);
}

let content = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders
Object.entries(moduleVariations).forEach(([placeholder, replacement]) => {
    const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
    content = content.replace(regex, replacement);
});

// Add header comment to generated file
const header = `<!-- 
This file was auto-generated from cursor.md template for ${toTitleCase(moduleName)} module
Generated on: ${new Date().toISOString()}
To regenerate: node generate-module-prompt.js ${moduleName} ${outputFile}
-->

`;

content = header + content;

// Write output file
fs.writeFileSync(outputFile, content);

console.log(`✅ Generated ${toTitleCase(moduleName)} module prompt: ${outputFile}`);
console.log(`📝 You can now customize the specific placeholders in ${outputFile}`);
console.log(`🔄 Your master template cursor.md remains unchanged for future use`);
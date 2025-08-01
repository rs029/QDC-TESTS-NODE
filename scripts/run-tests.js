#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Test categories and their corresponding tags
const TEST_CATEGORIES = {
    'all': '',
    'smoke': '@smoke',
    'positive': '@positive',
    'negative': '@negative',
    'error-handling': '@error-handling',
    'validation': '@validation',
    'session': '@session',
    'regression': '@regression'
};

// Get command line arguments
const args = process.argv.slice(2);
const category = args[0] || 'all';
const logLevel = args[1] || 'info';

if (!TEST_CATEGORIES[category]) {
    console.error('❌ Invalid test category. Available categories:');
    Object.keys(TEST_CATEGORIES).forEach(cat => {
        console.log(`   - ${cat}`);
    });
    process.exit(1);
}

console.log(`🚀 Running ${category} tests...`);
console.log(`📋 Category: ${category}`);
console.log(`🏷️  Tags: ${TEST_CATEGORIES[category] || 'All tests'}`);
console.log(`📊 Log Level: ${logLevel}`);

try {
    const tagExpression = TEST_CATEGORIES[category];
    const command = `npx wdio run ./wdio.conf.js --logLevel ${logLevel}${tagExpression ? ` --cucumberOpts.tags "${tagExpression}"` : ''}`;
    
    console.log(`\n🔧 Executing: ${command}\n`);
    
    execSync(command, { 
        stdio: 'inherit',
        cwd: path.resolve(__dirname, '..')
    });
    
    console.log('\n✅ Tests completed successfully!');
} catch (error) {
    console.error('\n❌ Tests failed!');
    process.exit(1);
} 
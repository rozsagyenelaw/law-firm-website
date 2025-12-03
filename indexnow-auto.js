#!/usr/bin/env node

/**
 * Automated IndexNow Submission Script
 *
 * This script automatically submits changed URLs to IndexNow based on git changes.
 * It detects which HTML files have been modified and submits only those URLs.
 *
 * Usage:
 *   node indexnow-auto.js            # Submit URLs for modified HTML files
 *   node indexnow-auto.js --all      # Submit all HTML files
 *
 * Typically run after git push or as part of CI/CD pipeline.
 */

const { execSync } = require('child_process');
const { submitToIndexNow, getAllHtmlFiles } = require('./indexnow-submit.js');

const CONFIG = {
    host: 'livingtrust-attorneys.com'
};

/**
 * Get list of modified HTML files from git
 */
function getModifiedHtmlFiles() {
    try {
        // Get files modified in the last commit
        const output = execSync('git diff-tree --no-commit-id --name-only -r HEAD', {
            encoding: 'utf-8'
        });

        const modifiedFiles = output
            .split('\n')
            .filter(file => file.endsWith('.html'))
            .map(file => `https://${CONFIG.host}/${file}`);

        return modifiedFiles;

    } catch (error) {
        console.warn('Warning: Could not get git diff. Using all HTML files instead.');
        console.warn(error.message);
        return getAllHtmlFiles();
    }
}

/**
 * Main function
 */
async function main() {
    console.log('Automated IndexNow Submission');
    console.log('============================\n');

    const args = process.argv.slice(2);
    const submitAll = args.includes('--all');

    let urls;

    if (submitAll) {
        console.log('Submitting ALL HTML files...\n');
        urls = getAllHtmlFiles();
    } else {
        console.log('Detecting modified HTML files from git...\n');
        urls = getModifiedHtmlFiles();
    }

    if (urls.length === 0) {
        console.log('No modified HTML files detected. Nothing to submit.');
        console.log('Tip: Use --all flag to submit all HTML files.');
        return;
    }

    console.log(`Found ${urls.length} URL(s) to submit:`);
    urls.forEach((url, i) => {
        console.log(`  ${i + 1}. ${url}`);
    });
    console.log();

    console.log('Submitting to IndexNow...\n');

    try {
        const result = await submitToIndexNow(urls);

        console.log('✅ Automatic submission successful!');
        console.log(`${urls.length} URL(s) submitted to search engines.`);
        console.log('\nSearch engines notified:');
        console.log('  • Bing');
        console.log('  • Yandex');
        console.log('  • Other participating engines');

    } catch (error) {
        console.error('❌ Automatic submission failed:');
        console.error(error.message || error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
    });
}

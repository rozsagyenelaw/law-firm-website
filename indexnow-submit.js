#!/usr/bin/env node

/**
 * IndexNow Submission Script
 *
 * This script submits URLs to search engines using the IndexNow protocol.
 * IndexNow allows instant notification to Bing, Yandex, and other search engines
 * when content is created or updated.
 *
 * Usage:
 *   node indexnow-submit.js                    # Submit all HTML pages
 *   node indexnow-submit.js <url1> <url2> ...  # Submit specific URLs
 *
 * API Documentation: https://www.indexnow.org/documentation
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    host: 'livingtrust-attorneys.com',
    key: '1476537f7ffc172d64fa567c74b5e96fa2d4e6c5d31695017b75363b261bf5a1',
    keyLocation: 'https://livingtrust-attorneys.com/1476537f7ffc172d64fa567c74b5e96fa2d4e6c5d31695017b75363b261bf5a1.txt',

    // IndexNow endpoints (all share the same protocol)
    endpoints: [
        'api.indexnow.org',
        'bing.com',
        'yandex.com'
    ]
};

/**
 * Get all HTML files in the current directory
 */
function getAllHtmlFiles() {
    const files = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .map(file => `https://${CONFIG.host}/${file}`);

    return files;
}

/**
 * Submit URLs to IndexNow
 *
 * @param {string[]} urls - Array of URLs to submit
 * @returns {Promise<Object>} Response from the API
 */
function submitToIndexNow(urls) {
    // Limit to 10,000 URLs per request (IndexNow limit)
    if (urls.length > 10000) {
        console.warn(`Warning: Submitting ${urls.length} URLs. IndexNow recommends max 10,000 per request.`);
        urls = urls.slice(0, 10000);
    }

    const payload = {
        host: CONFIG.host,
        key: CONFIG.key,
        keyLocation: CONFIG.keyLocation,
        urlList: urls
    };

    const payloadData = JSON.stringify(payload);

    // Use the main IndexNow endpoint (will notify all participating search engines)
    const options = {
        hostname: CONFIG.endpoints[0],
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payloadData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve({
                        success: true,
                        statusCode: res.statusCode,
                        message: 'URLs submitted successfully',
                        data: data
                    });
                } else if (res.statusCode === 202) {
                    resolve({
                        success: true,
                        statusCode: res.statusCode,
                        message: 'URLs accepted for processing',
                        data: data
                    });
                } else {
                    reject({
                        success: false,
                        statusCode: res.statusCode,
                        message: `Request failed with status ${res.statusCode}`,
                        data: data
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject({
                success: false,
                error: error.message
            });
        });

        req.write(payloadData);
        req.end();
    });
}

/**
 * Main function
 */
async function main() {
    console.log('IndexNow Submission Script');
    console.log('=========================\n');

    let urls;

    // Check if specific URLs were provided as arguments
    if (process.argv.length > 2) {
        urls = process.argv.slice(2);
        console.log(`Submitting ${urls.length} URL(s) provided as arguments...\n`);
    } else {
        console.log('No URLs provided. Scanning for HTML files...\n');
        urls = getAllHtmlFiles();
        console.log(`Found ${urls.length} HTML files to submit.\n`);
    }

    if (urls.length === 0) {
        console.log('No URLs to submit. Exiting.');
        return;
    }

    // Display URLs to be submitted
    console.log('URLs to submit:');
    urls.slice(0, 10).forEach((url, i) => {
        console.log(`  ${i + 1}. ${url}`);
    });
    if (urls.length > 10) {
        console.log(`  ... and ${urls.length - 10} more`);
    }
    console.log();

    // Submit to IndexNow
    console.log('Submitting to IndexNow API...\n');

    try {
        const result = await submitToIndexNow(urls);

        console.log('✅ Success!');
        console.log(`Status: ${result.statusCode} - ${result.message}`);
        console.log(`\nSubmitted ${urls.length} URL(s) to:`);
        console.log(`  • Bing`);
        console.log(`  • Yandex`);
        console.log(`  • Other IndexNow participating search engines`);
        console.log('\nSearch engines will crawl and index the submitted URLs.');

    } catch (error) {
        console.error('❌ Error submitting URLs:');
        if (error.statusCode) {
            console.error(`Status: ${error.statusCode} - ${error.message}`);
            if (error.data) {
                console.error(`Response: ${error.data}`);
            }
        } else {
            console.error(error.error || error.message);
        }

        console.error('\nTroubleshooting:');
        console.error('  • Verify the API key file is accessible at:', CONFIG.keyLocation);
        console.error('  • Ensure URLs are valid and publicly accessible');
        console.error('  • Check your network connection');

        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
    });
}

module.exports = { submitToIndexNow, getAllHtmlFiles };

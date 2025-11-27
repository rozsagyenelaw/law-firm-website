const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeOptionalTags: false,
  sortAttributes: true,
  sortClassName: true
};

// Files to minify (excluding blog files which are handled by Next.js)
const htmlFiles = [
  'index.html',
  'about.html',
  'living-trusts.html',
  'trust-administration.html',
  'probate.html',
  'conservatorship.html',
  'guardianship.html',
  'asset-protection.html',
  'special-needs-trust.html',
  'life-insurance-trust.html',
  'wills.html',
  'power-of-attorney.html',
  'business-succession-planning.html',
  'pet-trust.html',
  'digital-asset-planning.html',
  'ira-trust-planning.html',
  'lgbtq-estate-planning.html',
  'medi-cal-planning.html',
  'prenuptial-agreement.html',
  'trust-amendment.html',
  'estate-planning-attorney-glendale.html',
  // Probate location pages
  'probate-attorney-glendale.html',
  'probate-attorney-burbank.html',
  'probate-attorney-pasadena.html',
  'probate-attorney-arcadia.html',
  'probate-attorney-alhambra.html',
  'probate-attorney-torrance.html',
  'probate-attorney-long-beach.html',
  'probate-attorney-santa-clarita.html',
  'probate-attorney-los-angeles-county.html',
  // Trust admin location pages
  'trust-administration-attorney-glendale.html',
  'trust-administration-attorney-burbank.html',
  'trust-administration-attorney-pasadena.html',
  'trust-administration-attorney-arcadia.html',
  'trust-administration-attorney-alhambra.html',
  'trust-administration-attorney-torrance.html',
  'trust-administration-attorney-long-beach.html',
  'trust-administration-attorney-santa-clarita.html',
  'trust-administration-attorney-los-angeles.html',
  'trust-administration-attorney-van-nuys.html',
  'trust-administration-attorney-downey.html',
  'trust-administration-attorney-whittier.html',
  'trust-administration-attorney-west-covina.html',
  'trust-administration-attorney-thousand-oaks.html'
];

console.log('🚀 Starting HTML minification process...\n');

let totalOriginalSize = 0;
let totalMinifiedSize = 0;
let filesProcessed = 0;
let filesSkipped = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    filesSkipped++;
    return;
  }

  try {
    const originalHtml = fs.readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(originalHtml, 'utf8');

    const minifiedHtml = minify(originalHtml, minifyOptions);
    const minifiedSize = Buffer.byteLength(minifiedHtml, 'utf8');

    // Only write if minification actually reduced size
    if (minifiedSize < originalSize) {
      fs.writeFileSync(filePath, minifiedHtml, 'utf8');

      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      const originalKB = (originalSize / 1024).toFixed(1);
      const minifiedKB = (minifiedSize / 1024).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   ${originalKB} KB → ${minifiedKB} KB (${savings}% reduction)\n`);

      totalOriginalSize += originalSize;
      totalMinifiedSize += minifiedSize;
      filesProcessed++;
    } else {
      console.log(`⚠️  ${file} - no size reduction, skipped`);
      filesSkipped++;
    }
  } catch (error) {
    console.error(`❌ Error minifying ${file}:`, error.message);
    filesSkipped++;
  }
});

const totalSavings = ((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(1);
const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
const totalMinifiedMB = (totalMinifiedSize / 1024 / 1024).toFixed(2);
const savedMB = (totalOriginalMB - totalMinifiedMB).toFixed(2);

console.log('━'.repeat(60));
console.log('📊 MINIFICATION SUMMARY');
console.log('━'.repeat(60));
console.log(`✅ Files processed: ${filesProcessed}`);
console.log(`⚠️  Files skipped: ${filesSkipped}`);
console.log(`📦 Total original size: ${totalOriginalMB} MB`);
console.log(`📦 Total minified size: ${totalMinifiedMB} MB`);
console.log(`💾 Total saved: ${savedMB} MB (${totalSavings}% reduction)`);
console.log('━'.repeat(60));
console.log('✨ Minification complete!\n');

const fs = require('fs');
const path = require('path');

// Service pages that likely have images
const servicePages = [
  'probate.html',
  'living-trusts.html',
  'conservatorship.html',
  'guardianship.html',
  'special-needs-trust.html',
  'asset-protection.html',
  'trust-administration.html',
  'wills.html'
];

console.log('🖼️  Adding responsive image attributes to service pages...\n');

let filesProcessed = 0;

servicePages.forEach(file => {
  const filePath = path.join(__dirname, '..', file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Pattern 1: Find images without srcset and add it
    const imgPattern = /<img\s+([^>]*src="([^"]+\.(?:jpg|jpeg|png|webp))"[^>]*?)(?!\s+srcset=)([^>]*>)/gi;

    content = content.replace(imgPattern, (match, beforeSrc, src, afterSrc) => {
      // Skip if already has srcset
      if (match.includes('srcset=')) {
        return match;
      }

      modified = true;

      // Add srcset with responsive sizes
      const responsiveImg = `<img ${beforeSrc} srcset="${src} 800w, ${src} 600w, ${src} 400w" sizes="(min-width: 768px) 50vw, 100vw"${afterSrc}`;

      return responsiveImg;
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${file} - Added responsive images`);
      filesProcessed++;
    } else {
      console.log(`ℹ️  ${file} - No changes needed`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✨ Processed ${filesProcessed} files\n`);

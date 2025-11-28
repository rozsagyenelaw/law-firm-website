const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function auditPage(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const issues = [];
  let score = 10;

  // Check title
  const title = document.querySelector('title');
  if (!title || !title.textContent) {
    issues.push('Missing page title');
    score -= 1;
  } else if (title.textContent.length < 30 || title.textContent.length > 60) {
    issues.push(`Title length suboptimal: ${title.textContent.length} chars (recommended: 30-60)`);
    score -= 0.3;
  }

  // Check meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc || !metaDesc.getAttribute('content')) {
    issues.push('Missing meta description');
    score -= 1;
  } else {
    const descLength = metaDesc.getAttribute('content').length;
    if (descLength < 120 || descLength > 160) {
      issues.push(`Meta description length suboptimal: ${descLength} chars (recommended: 120-160)`);
      score -= 0.3;
    }
  }

  // Check H1
  const h1s = document.querySelectorAll('h1');
  if (h1s.length === 0) {
    issues.push('Missing H1 tag');
    score -= 1;
  } else if (h1s.length > 1) {
    issues.push(`Multiple H1 tags found: ${h1s.length} (recommended: 1)`);
    score -= 0.5;
  }

  // Check heading hierarchy
  const h2s = document.querySelectorAll('h2');
  const h3s = document.querySelectorAll('h3');
  if (h2s.length === 0) {
    issues.push('No H2 tags found');
    score -= 0.5;
  }

  // Check images
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });
  if (imagesWithoutAlt > 0) {
    issues.push(`${imagesWithoutAlt} images missing alt text`);
    score -= Math.min(1, imagesWithoutAlt * 0.2);
  }

  // Check canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push('Missing canonical URL');
    score -= 0.5;
  }

  // Check Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (!ogTitle || !ogDesc || !ogImage) {
    issues.push('Incomplete Open Graph tags');
    score -= 0.5;
  }

  // Check Schema.org markup
  const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
  if (schemaScripts.length === 0) {
    issues.push('No Schema.org structured data found');
    score -= 1;
  } else {
    // Validate schema markup
    let hasValidSchema = false;
    schemaScripts.forEach(script => {
      try {
        const schema = JSON.parse(script.textContent);
        if (schema['@type'] || (schema['@graph'] && schema['@graph'].length > 0)) {
          hasValidSchema = true;
        }
      } catch (e) {
        issues.push('Invalid Schema.org JSON');
        score -= 0.3;
      }
    });
    if (!hasValidSchema) {
      issues.push('Schema.org markup present but invalid structure');
      score -= 0.5;
    }
  }

  // Check for HTTPS in links
  const links = document.querySelectorAll('a[href]');
  let httpLinks = 0;
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('http://')) {
      httpLinks++;
    }
  });
  if (httpLinks > 0) {
    issues.push(`${httpLinks} HTTP links found (should use HTTPS)`);
    score -= 0.3;
  }

  // Check content length
  const textContent = document.body.textContent.trim();
  const wordCount = textContent.split(/\s+/).length;
  if (wordCount < 300) {
    issues.push(`Low word count: ${wordCount} words (recommended: 300+)`);
    score -= 0.5;
  }

  // Check for mobile viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    issues.push('Missing viewport meta tag');
    score -= 0.5;
  }

  // Check for lang attribute
  const htmlLang = document.documentElement.getAttribute('lang');
  if (!htmlLang) {
    issues.push('Missing lang attribute on <html>');
    score -= 0.3;
  }

  return { score: Math.max(0, score), issues };
}

function auditSite() {
  const buildDir = __dirname;

  const htmlFiles = fs.readdirSync(buildDir)
    .filter(file => file.endsWith('.html') && !file.includes('questionnaire'))
    .map(file => path.join(buildDir, file));

  if (htmlFiles.length === 0) {
    console.log('\n❌ No HTML files found in build directory.\n');
    process.exit(1);
  }

  console.log('\n🔍 SEO AUDIT REPORT\n');
  console.log('='.repeat(80));

  let totalScore = 0;
  const pageResults = [];

  htmlFiles.forEach(file => {
    const pageName = path.basename(file);
    const result = auditPage(file);
    pageResults.push({ page: pageName, ...result });
    totalScore += result.score;
  });

  // Sort by score
  pageResults.sort((a, b) => a.score - b.score);

  pageResults.forEach(({ page, score, issues }) => {
    console.log(`\n📄 ${page}`);
    console.log(`   Score: ${score.toFixed(1)}/10`);
    if (issues.length > 0) {
      console.log('   Issues:');
      issues.forEach(issue => {
        console.log(`   - ${issue}`);
      });
    } else {
      console.log('   ✅ No issues found!');
    }
  });

  const avgScore = totalScore / htmlFiles.length;

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 OVERALL SEO SCORE: ${avgScore.toFixed(1)}/10`);

  if (avgScore >= 9) {
    console.log('🎉 Excellent! Your site has great SEO.\n');
  } else if (avgScore >= 7) {
    console.log('👍 Good SEO, but there\'s room for improvement.\n');
  } else if (avgScore >= 5) {
    console.log('⚠️  Fair SEO. Consider addressing the issues above.\n');
  } else {
    console.log('❌ Poor SEO. Significant improvements needed.\n');
  }

  return avgScore;
}

auditSite();

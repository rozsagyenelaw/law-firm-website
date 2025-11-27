const fs = require('fs');
const path = require('path');

// Add "Why Choose Us" and statistics sections to service pages
const contentSections = {
  'living-trusts.html': {
    stats: [
      { number: '5,000+', label: 'Families Protected' },
      { number: '25+', label: 'Years Experience' },
      { number: '$575', label: 'Starting Price' },
      { number: '100%', label: 'Success Rate' }
    ],
    whyChoose: [
      { icon: 'fa-certificate', title: 'Licensed & Experienced', text: 'California State Bar #208356 with over 25 years specializing in living trusts and estate planning.' },
      { icon: 'fa-dollar-sign', title: 'Transparent Flat-Fee Pricing', text: 'No hidden costs. Living trusts from $575 with everything included. We guarantee our prices.' },
      { icon: 'fa-heart', title: 'Personalized Attention', text: 'Every family is unique. We take time to understand your specific goals and customize your trust accordingly.' },
      { icon: 'fa-shield-alt', title: 'Avoid Probate & Save Money', text: 'Probate costs 5-10% of your estate. Our trusts save your family thousands in fees and 12-18 months of time.' }
    ]
  },
  'probate.html': {
    stats: [
      { number: '1,000+', label: 'Probates Completed' },
      { number: '12-18', label: 'Avg Months Saved' },
      { number: '$0', label: 'Upfront Costs' },
      { number: '98%', label: 'Success Rate' }
    ],
    whyChoose: [
      { icon: 'fa-coins', title: 'We Advance All Costs', text: 'No money out of pocket. We pay court fees, publication costs, and appraisal fees upfront.' },
      { icon: 'fa-gavel', title: 'Probate Litigation Experience', text: 'Will contests, creditor disputes, executor removal. We handle complex probate litigation.' },
      { icon: 'fa-file-alt', title: 'All Court Filings Handled', text: 'Petition, inventory, accountings, distribution. We prepare and file every required document.' },
      { icon: 'fa-clock', title: 'Expedited Process', text: 'IAEA authority to avoid unnecessary court hearings. We complete probates 30% faster than average.' }
    ]
  },
  'trust-administration.html': {
    stats: [
      { number: '800+', label: 'Trusts Administered' },
      { number: '6-12', label: 'Average Months' },
      { number: '100%', label: 'Tax Compliance' },
      { number: '$0', label: 'IRS Penalties' }
    ],
    whyChoose: [
      { icon: 'fa-tasks', title: 'Complete Administration Services', text: '60-day notices, accounting, tax returns, distributions. We handle every requirement from start to finish.' },
      { icon: 'fa-calculator', title: 'Trust & Estate Tax Returns', text: 'Form 1041, final 1040, estate tax returns. Our team includes tax professionals who ensure compliance.' },
      { icon: 'fa-users', title: 'Beneficiary Communication', text: 'We keep all beneficiaries informed and reduce conflicts through transparent communication.' },
      { icon: 'fa-check-circle', title: 'Avoid Costly Mistakes', text: '90% of non-lawyer trustees make errors. We ensure proper administration and protect you from liability.' }
    ]
  }
};

const statsHTML = (stats) => `
    <!-- Statistics Section -->
    <section style="background: linear-gradient(135deg, #1e3a5f 0%, #2c4a6f 100%); color: white; padding: 60px 0; margin: 60px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; text-align: center;">
                ${stats.map(stat => `
                <div>
                    <div style="font-size: 3.5rem; font-weight: 700; color: #c9a961; margin-bottom: 10px;">${stat.number}</div>
                    <div style="font-size: 1.1rem; opacity: 0.9;">${stat.label}</div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>`;

const whyChooseHTML = (reasons) => `
    <!-- Why Choose Us Section -->
    <section style="background: #f8f9fa; padding: 80px 0; margin: 60px 0 0 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem; color: #1e3a5f;">Why Choose Law Offices of Rozsa Gyene?</h2>
            <p style="text-align: center; color: #666; margin-bottom: 4rem; font-size: 1.1rem;">Trusted by Southern California families since 2001</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px;">
                ${reasons.map(reason => `
                <div style="text-align: center;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #1e3a5f, #2c4a6f); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                        <i class="fas ${reason.icon}" style="font-size: 2rem; color: #c9a961;"></i>
                    </div>
                    <h3 style="color: #1e3a5f; margin-bottom: 15px; font-size: 1.4rem;">${reason.title}</h3>
                    <p style="color: #555; line-height: 1.6;">${reason.text}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>`;

console.log('📊 Adding statistics and content sections...\n');

let filesProcessed = 0;

Object.keys(contentSections).forEach(filename => {
  const filePath = path.join(__dirname, '..', filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filename} (not found)`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if content already added
    if (content.includes('Statistics Section') || content.includes('Why Choose Us Section')) {
      console.log(`ℹ️  ${filename} - Already has enhanced content`);
      return;
    }

    const { stats, whyChoose } = contentSections[filename];
    const statsSection = statsHTML(stats);
    const whyChooseSection = whyChooseHTML(whyChoose);

    // Insert before related services or footer
    const insertionPatterns = [
      /<!-- Related Services Section -->/i,
      /<footer/i,
      /<!-- Footer -->/i,
      /<\/body>/i
    ];

    let inserted = false;
    for (const pattern of insertionPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, statsSection + '\n\n    ' + whyChooseSection + '\n\n    $&');
        inserted = true;
        break;
      }
    }

    if (inserted) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${filename} - Added stats & why choose us sections`);
      filesProcessed++;
    } else {
      console.log(`⚠️  ${filename} - Could not find insertion point`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

console.log(`\n✨ Enhanced ${filesProcessed} pages with rich content\n`);

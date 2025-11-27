const fs = require('fs');
const path = require('path');

// Define related services for each page
const relatedServicesMap = {
  'living-trusts.html': [
    { title: 'Trust Administration', url: 'trust-administration.html', desc: 'Need help managing a trust after a loved one passes? We guide you through every step.' },
    { title: 'Trust Amendment', url: 'trust-amendment.html', desc: 'Life changes? Update your trust to reflect marriages, births, divorces, or asset changes.' },
    { title: 'Asset Protection', url: 'asset-protection.html', desc: 'Protect your wealth from lawsuits, creditors, and risks with advanced planning strategies.' }
  ],
  'probate.html': [
    { title: 'Living Trusts', url: 'living-trusts.html', desc: 'Avoid probate entirely for your family with a comprehensive living trust from $575.' },
    { title: 'Trust Administration', url: 'trust-administration.html', desc: 'Administering a trust is easier than probate. We help with both processes.' },
    { title: 'Wills', url: 'wills.html', desc: 'Need a simple will instead? We create legally-binding wills tailored to your needs.' }
  ],
  'trust-administration.html': [
    { title: 'Living Trusts', url: 'living-trusts.html', desc: 'Set up a trust now to make administration easier for your family later.' },
    { title: 'Probate Services', url: 'probate.html', desc: 'Some assets may require probate. We handle both trust administration and probate.' },
    { title: 'Trust Amendment', url: 'trust-amendment.html', desc: 'Keep your trust current with professional amendment services.' }
  ],
  'conservatorship.html': [
    { title: 'Guardianship', url: 'guardianship.html', desc: 'Protect minor children with legal guardianship arrangements.' },
    { title: 'Special Needs Trust', url: 'special-needs-trust.html', desc: 'Preserve government benefits while providing for loved ones with disabilities.' },
    { title: 'Power of Attorney', url: 'power-of-attorney.html', desc: 'Appoint someone to make decisions if you become incapacitated.' }
  ],
  'guardianship.html': [
    { title: 'Conservatorship', url: 'conservatorship.html', desc: 'Protect adults who cannot care for themselves with conservatorship services.' },
    { title: 'Living Trusts', url: 'living-trusts.html', desc: 'Name guardians for your children in your trust to avoid court proceedings.' },
    { title: 'Special Needs Trust', url: 'special-needs-trust.html', desc: 'Plan for children with special needs to ensure lifelong care and support.' }
  ],
  'special-needs-trust.html': [
    { title: 'Medi-Cal Planning', url: 'medi-cal-planning.html', desc: 'Preserve Medi-Cal eligibility while providing supplemental care.' },
    { title: 'Conservatorship', url: 'conservatorship.html', desc: 'Sometimes conservatorship is necessary to protect loved ones with disabilities.' },
    { title: 'Life Insurance Trust', url: 'life-insurance-trust.html', desc: 'Use life insurance to fund your special needs trust tax-efficiently.' }
  ],
  'asset-protection.html': [
    { title: 'Living Trusts', url: 'living-trusts.html', desc: 'Basic asset protection starts with a properly structured living trust.' },
    { title: 'Business Succession Planning', url: 'business-succession-planning.html', desc: 'Protect your business assets and plan for seamless ownership transition.' },
    { title: 'Life Insurance Trust', url: 'life-insurance-trust.html', desc: 'Remove life insurance from your taxable estate with an irrevocable trust.' }
  ],
  'wills.html': [
    { title: 'Living Trusts', url: 'living-trusts.html', desc: 'Upgrade to a living trust to avoid probate and maintain privacy (only $575).' },
    { title: 'Power of Attorney', url: 'power-of-attorney.html', desc: 'Wills don\'t cover incapacity. Add a power of attorney for complete protection.' },
    { title: 'Probate Services', url: 'probate.html', desc: 'Wills require probate. We help your executor through the entire process.' }
  ]
};

const relatedServicesHTML = (services) => `
    <!-- Related Services Section -->
    <section style="background: #f8f9fa; padding: 60px 0; margin-top: 60px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem; color: #1e3a5f;">Related Services</h2>
            <p style="text-align: center; color: #666; margin-bottom: 3rem; font-size: 1.1rem;">Comprehensive estate planning solutions for California families</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                ${services.map(service => `
                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s;">
                    <h3 style="color: #1e3a5f; margin-bottom: 15px; font-size: 1.5rem;">
                        <a href="${service.url}" style="color: #1e3a5f; text-decoration: none;">${service.title}</a>
                    </h3>
                    <p style="color: #555; margin-bottom: 20px; line-height: 1.6;">${service.desc}</p>
                    <a href="${service.url}" style="color: #c9a961; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center;">
                        Learn More
                        <svg style="margin-left: 8px;" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
                `).join('')}
            </div>
        </div>
    </section>`;

console.log('🔗 Adding Related Services sections to pages...\n');

let filesProcessed = 0;

Object.keys(relatedServicesMap).forEach(filename => {
  const filePath = path.join(__dirname, '..', filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filename} (not found)`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if related services already exists
    if (content.includes('Related Services Section')) {
      console.log(`ℹ️  ${filename} - Already has related services`);
      return;
    }

    const services = relatedServicesMap[filename];
    const relatedSection = relatedServicesHTML(services);

    // Insert before footer (look for common footer patterns)
    const footerPatterns = [
      /<footer/i,
      /<!-- Footer -->/i,
      /<\/body>/i
    ];

    let inserted = false;
    for (const pattern of footerPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, relatedSection + '\n\n    $&');
        inserted = true;
        break;
      }
    }

    if (inserted) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${filename} - Added ${services.length} related services`);
      filesProcessed++;
    } else {
      console.log(`⚠️  ${filename} - Could not find insertion point`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

console.log(`\n✨ Added related services to ${filesProcessed} pages\n`);

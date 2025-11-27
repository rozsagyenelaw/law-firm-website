const fs = require('fs');
const path = require('path');

// Enhanced meta descriptions with statistics, CTAs, and urgency
const enhancedDescriptions = {
  'probate.html': 'Los Angeles County probate attorney with 25+ years experience. We handle executors duties, letters testamentary, will contests & estate disputes. Helped 1,000+ families through probate. We advance all costs. Free consultation (818) 291-6217 - Available 7 days/week.',

  'trust-administration.html': 'Expert trust administration attorney in Glendale, CA. Avoid costly mistakes - 90% of trustees make errors without legal help. We handle notices, accounting, tax returns & distributions. Flat-fee pricing. Free consultation (818) 291-6217.',

  'conservatorship.html': 'California conservatorship attorney protecting vulnerable adults since 2001. LPS & probate conservatorships. Court hearings, annual accountings, bond reduction. Compassionate guidance for families. Free consultation (818) 291-6217 - Se habla español.',

  'guardianship.html': 'Guardianship attorney in Glendale protecting minors\' futures. Temporary & permanent guardianships. Court representation, home studies, guardianship termination. Protect your loved ones legally. Free consultation (818) 291-6217.',

  'special-needs-trust.html': 'Special needs trust attorney preserving SSI & Medi-Cal benefits. First-party & third-party SNTs. Pool trusts & ABLE accounts. Protect your loved one\'s quality of life & government benefits. Free consultation (818) 291-6217.',

  'asset-protection.html': 'Asset protection attorney shielding wealth from lawsuits & creditors. Domestic & offshore trusts, LLCs, family limited partnerships. Protect what you\'ve built. 500+ high-net-worth clients protected. Free consultation (818) 291-6217.',

  'wills.html': 'California will attorney drafting legally-binding wills since 2001. Simple wills, pour-over wills, testamentary trusts. Don\'t leave your family\'s future to chance. Wills from $299. Free consultation (818) 291-6217 - Same-day appointments.',

  'power-of-attorney.html': 'Power of attorney lawyer in Glendale, CA. Durable POA, healthcare directives, HIPAA authorizations. Plan for incapacity before it\'s too late - 70% of people will need POA. Free consultation (818) 291-6217.',

  'business-succession-planning.html': 'Business succession planning attorney protecting family businesses. Buy-sell agreements, key person insurance, ownership transitions. 80% of businesses fail in transition without planning. Free consultation (818) 291-6217.',

  'pet-trust.html': 'Pet trust attorney ensuring your pet\'s care after you\'re gone. California pet trusts with enforceable terms, designated caregivers & funding. Because they\'re family too. Pet trusts from $495. Free consultation (818) 291-6217.',

  'digital-asset-planning.html': 'Digital asset planning attorney protecting your online legacy. Social media accounts, cryptocurrency, cloud storage, digital photos & intellectual property. Don\'t let $1000s disappear. Free consultation (818) 291-6217.',

  'ira-trust-planning.html': 'IRA trust planning attorney maximizing retirement account protection. Standalone retirement trusts, conduit vs accumulation trusts, Secure Act 2.0 planning. Protect your IRA from taxes & creditors. Free consultation (818) 291-6217.',

  'lgbtq-estate-planning.html': 'LGBTQ+ estate planning attorney protecting non-traditional families. Domestic partner trusts, second-parent adoption planning, asset protection. Inclusive legal services since 2001. Free consultation (818) 291-6217 - Confidential.',

  'medi-cal-planning.html': 'Medi-Cal planning attorney helping seniors qualify for long-term care. Asset protection, spend-down strategies, Medi-Cal trusts. Nursing homes cost $10K/month - we help you qualify. Free consultation (818) 291-6217.',

  'prenuptial-agreement.html': 'Prenuptial agreement attorney protecting assets before marriage. Fair prenups for both parties. Separate property agreements, business protection, inheritance preservation. Start your marriage right. Free consultation (818) 291-6217.',

  'trust-amendment.html': 'Trust amendment attorney updating outdated trusts. Marriages, divorces, births, deaths, tax law changes. 60% of trusts need updating every 3-5 years. Trust amendments from $495. Free consultation (818) 291-6217.',

  'life-insurance-trust.html': 'Life insurance trust (ILIT) attorney removing policies from taxable estates. Save 40% in estate taxes. Irrevocable trusts, Crummey powers, generation-skipping planning. Free consultation (818) 291-6217.',

  'estate-planning-attorney-glendale.html': 'Top-rated estate planning attorney in Glendale, CA. Living trusts from $575. Wills, powers of attorney, healthcare directives. 5,000+ families protected since 2001. A+ BBB rated. Free consultation (818) 291-6217 - Weekend appointments available.',

  'about.html': 'Meet Rozsa Gyene - California estate planning attorney since 1996 (Bar #208356). 25+ years protecting LA County families. Specializing in living trusts, probate & conservatorships. A+ BBB rated. 5,000+ clients served. Free consultation (818) 291-6217.'
};

console.log('📝 Enhancing meta descriptions with statistics & CTAs...\n');

let filesProcessed = 0;

Object.keys(enhancedDescriptions).forEach(filename => {
  const filePath = path.join(__dirname, '..', filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filename} (not found)`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const newDescription = enhancedDescriptions[filename];

    // Replace meta description
    const metaPattern = /<meta\s+name="description"\s+content="[^"]*">/i;

    if (metaPattern.test(content)) {
      const oldMatch = content.match(metaPattern)[0];
      const oldLength = oldMatch.match(/content="([^"]*)"/)[1].length;
      const newLength = newDescription.length;

      content = content.replace(metaPattern, `<meta name="description" content="${newDescription}">`);

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${filename}`);
      console.log(`   ${oldLength} chars → ${newLength} chars (${newLength > 155 ? 'over 155!' : 'good'})\n`);
      filesProcessed++;
    } else {
      console.log(`⚠️  ${filename} - No meta description found`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

console.log(`✨ Enhanced ${filesProcessed} meta descriptions\n`);

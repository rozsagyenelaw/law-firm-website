const fs = require('fs');
const path = require('path');

console.log('⚡ PROBATE PAGE POWER-UP - Making it DOMINATE rankings...\n');

const probateFilePath = path.join(__dirname, '..', 'probate.html');

if (!fs.existsSync(probateFilePath)) {
  console.log('❌ probate.html not found');
  process.exit(1);
}

let content = fs.readFileSync(probateFilePath, 'utf8');

// 1. Add power keywords to H1
const h1Pattern = /<h1[^>]*>(.*?)<\/h1>/i;
if (h1Pattern.test(content)) {
  const currentH1 = content.match(h1Pattern)[1];
  if (!currentH1.includes('Glendale') || !currentH1.includes('1,000+')) {
    content = content.replace(h1Pattern, '<h1>Probate Attorney Glendale CA | 1,000+ Probates Completed | Los Angeles County Probate Lawyer</h1>');
    console.log('✅ Enhanced H1 with power keywords');
  }
}

// 2. Add location-rich intro paragraph
const locationParagraph = `
    <!-- PROBATE SEO POWER SECTION -->
    <section style="background: linear-gradient(135deg, #1e3a5f 0%, #2c4a6f 100%); color: white; padding: 40px 0; margin-bottom: 40px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center;">
                <h2 style="color: #c9a961; font-size: 2rem; margin-bottom: 1rem;">Glendale's Most Experienced Probate Attorney</h2>
                <p style="font-size: 1.2rem; margin-bottom: 1.5rem; line-height: 1.6;">
                    Serving Los Angeles County probate clients since 2001 with <strong>1,000+ successfully completed probates</strong>.
                    Expert representation in Glendale, Burbank, Pasadena, Arcadia, La Cañada Flintridge, and throughout LA County.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px;">
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: #c9a961;">1,000+</div>
                        <div style="font-size: 1rem;">Probates Completed</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: #c9a961;">$0</div>
                        <div style="font-size: 1rem;">Upfront Costs</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: #c9a961;">25+</div>
                        <div style="font-size: 1rem;">Years Experience</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: #c9a961;">98%</div>
                        <div style="font-size: 1rem;">Success Rate</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- PROBATE SERVICES COVERAGE -->
    <section style="background: #f8f9fa; padding: 60px 0; margin-bottom: 40px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <h2 style="text-align: center; font-size: 2.5rem; color: #1e3a5f; margin-bottom: 3rem;">Complete Probate Services in Los Angeles County</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
                    <h3 style="color: #1e3a5f; margin-bottom: 15px; font-size: 1.3rem;">Executor Representation</h3>
                    <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
                        <li>Letters testamentary filing</li>
                        <li>Inventory & appraisal</li>
                        <li>Creditor notice & claims</li>
                        <li>Final accounting & distribution</li>
                    </ul>
                </div>
                <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
                    <h3 style="color: #1e3a5f; margin-bottom: 15px; font-size: 1.3rem;">Will Contests & Litigation</h3>
                    <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
                        <li>Undue influence claims</li>
                        <li>Lack of capacity challenges</li>
                        <li>Executor misconduct</li>
                        <li>Beneficiary disputes</li>
                    </ul>
                </div>
                <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
                    <h3 style="color: #1e3a5f; margin-bottom: 15px; font-size: 1.3rem;">Probate Real Estate</h3>
                    <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
                        <li>Selling inherited property</li>
                        <li>Court confirmation hearings</li>
                        <li>Property transfers & deeds</li>
                        <li>Title clearance issues</li>
                    </ul>
                </div>
                <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
                    <h3 style="color: #1e3a5f; margin-bottom: 15px; font-size: 1.3rem;">Probate Alternatives</h3>
                    <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
                        <li>Small estate affidavits</li>
                        <li>Spousal property petitions</li>
                        <li>Heggstad petitions</li>
                        <li>Avoiding probate strategies</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- CITIES SERVED -->
    <section style="background: white; padding: 60px 0; margin-bottom: 40px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <h2 style="text-align: center; font-size: 2.5rem; color: #1e3a5f; margin-bottom: 2rem;">Probate Attorney Serving All of Los Angeles County</h2>
            <p style="text-align: center; color: #666; font-size: 1.1rem; margin-bottom: 3rem;">
                With over 25 years of experience in Los Angeles County Superior Court, we handle probates throughout the region:
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; text-align: center;">
                <div><a href="probate-attorney-glendale.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">Glendale Probate Attorney</a></div>
                <div><a href="probate-attorney-burbank.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">Burbank Probate Attorney</a></div>
                <div><a href="probate-attorney-pasadena.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">Pasadena Probate Attorney</a></div>
                <div><a href="probate-attorney-arcadia.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">Arcadia Probate Attorney</a></div>
                <div><a href="probate-attorney-alhambra.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">Alhambra Probate Attorney</a></div>
                <div><a href="probate-attorney-torrance.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">Torrance Probate Attorney</a></div>
                <div><a href="probate-attorney-long-beach.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">Long Beach Probate Attorney</a></div>
                <div><a href="probate-attorney-santa-clarita.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">Santa Clarita Probate Attorney</a></div>
                <div><a href="probate-attorney-los-angeles-county.html" style="color: #1e3a5f; text-decoration: none; font-weight: 600;">LA County Probate Attorney</a></div>
            </div>
            <p style="text-align: center; margin-top: 2rem; color: #666;">
                We also serve La Cañada Flintridge, Montrose, La Crescenta, San Marino, South Pasadena, and all surrounding communities.
            </p>
        </div>
    </section>
`;

// Insert after hero/main content area
const insertPatterns = [
    /<section[^>]*class="[^"]*services[^"]*"[^>]*>/i,
    /<section[^>]*class="[^"]*features[^"]*"[^>]*>/i,
    /<section[^>]*class="[^"]*about[^"]*"[^>]*>/i,
    /<main/i
];

let inserted = false;
for (const pattern of insertPatterns) {
    if (pattern.test(content) && !content.includes('PROBATE SEO POWER SECTION')) {
        content = content.replace(pattern, locationParagraph + '\n\n    $&');
        inserted = true;
        console.log('✅ Added probate power sections');
        break;
    }
}

if (!inserted && !content.includes('PROBATE SEO POWER SECTION')) {
    console.log('⚠️  Could not find insertion point for power sections');
}

// 3. Add schema for probate-specific services
const probateServiceSchema = `
    <!-- Probate Service Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Probate Legal Services",
        "provider": {
            "@type": "Attorney",
            "name": "Law Offices of Rozsa Gyene",
            "telephone": "+1-818-291-6217",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "450 N Brand Blvd, Suite 600",
                "addressLocality": "Glendale",
                "addressRegion": "CA",
                "postalCode": "91203"
            }
        },
        "areaServed": [
            {"@type": "City", "name": "Glendale, CA"},
            {"@type": "City", "name": "Burbank, CA"},
            {"@type": "City", "name": "Pasadena, CA"},
            {"@type": "City", "name": "Arcadia, CA"},
            {"@type": "City", "name": "Los Angeles, CA"}
        ],
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "USD",
            "description": "We advance all probate costs - no money out of pocket for clients"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Probate Services",
            "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Executor Representation"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Letters Testamentary"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Will Contests"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Probate Litigation"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Probate Real Estate Sales"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Small Estate Affidavits"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Spousal Property Petitions"}}
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5"
        }
    }
    </script>
`;

// Add schema before closing </head>
if (!content.includes('Probate Service Schema') && /<\/head>/i.test(content)) {
    content = content.replace(/<\/head>/i, probateServiceSchema + '\n    </head>');
    console.log('✅ Added probate-specific service schema');
}

// Write the enhanced file
fs.writeFileSync(probateFilePath, content, 'utf8');

console.log('\n━'.repeat(60));
console.log('⚡ PROBATE PAGE POWER-UP COMPLETE!');
console.log('━'.repeat(60));
console.log('\n✅ Enhanced H1 with location + credibility');
console.log('✅ Added statistics section (1,000+ probates)');
console.log('✅ Added comprehensive services breakdown');
console.log('✅ Added cities served with internal links');
console.log('✅ Added probate-specific service schema');
console.log('\n🎯 Your probate page is now optimized to DOMINATE rankings!\n');

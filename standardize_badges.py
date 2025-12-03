#!/usr/bin/env python3
"""
Script to standardize trust badges across all pages to match home page design.
"""

import re

# The standard trust badges HTML from the home page
STANDARD_BADGES = '''<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:30px;max-width:1200px;margin:0 auto;text-align:center"><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-users"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">5000+ Families Served</strong> <span style="font-size:14px;color:var(--text-light)">Since 2001</span></div><a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/208356"target="_blank"rel="noopener noreferrer"style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s;text-decoration:none;color:inherit;cursor:pointer"aria-label="Verify California State Bar License Number 208356"><i class="fas fa-certificate"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">California State Bar #208356</strong> <span style="font-size:14px;color:var(--text-light)">Licensed & Verified <i class="fas fa-external-link-alt"style="font-size:.7em;margin-left:4px"></i></span></a><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-star"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">A+ Rated</strong> <span style="font-size:14px;color:var(--text-light)">Better Business Bureau</span></div><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-award"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">25+ Years Experience</strong> <span style="font-size:14px;color:var(--text-light)">Estate Planning Experts</span></div><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-shield-alt"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">100% Confidential</strong> <span style="font-size:14px;color:var(--text-light)">Attorney-Client Privilege</span></div></div></div></section>'''

# Pattern to match the old trust badge section - try two variants
OLD_PATTERN_1 = r'<div style="display:grid;grid-template-columns:repeat\(5,1fr\)[^>]*>.*?Your Privacy Protected</div></div></div></div></section>'
OLD_PATTERN_2 = r'<div style="display:grid;grid-template-columns:repeat\(5,1fr\)[^>]*>.*?Confidential</div></div></div></div></section>'

files = [
    "about.html",
    "asset-protection.html",
    "business-succession-planning.html",
    "conservatorship.html",
    "digital-asset-planning.html",
    "guardianship.html",
    "ira-trust-planning.html",
    "lgbtq-estate-planning.html",
    "life-insurance-trust.html",
    "living-trusts.html",
    "medi-cal-planning.html",
    "pet-trust.html",
    "power-of-attorney.html",
    "special-needs-trust.html",
    "trust-administration.html",
    "trust-amendment.html",
    "wills.html"
]

def update_file(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # Try both patterns
        new_content = re.sub(OLD_PATTERN_1, STANDARD_BADGES, content, flags=re.DOTALL)
        if new_content == content:
            new_content = re.sub(OLD_PATTERN_2, STANDARD_BADGES, content, flags=re.DOTALL)

        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✓ Updated {filename}")
            return True
        else:
            print(f"  ✗ No match found in {filename}")
            return False
    except Exception as e:
        print(f"  ✗ Error processing {filename}: {e}")
        return False

print("Standardizing trust badges across all pages...")
print()

updated_count = 0
for filename in files:
    if update_file(filename):
        updated_count += 1

print()
print(f"✅ Trust badge standardization complete!")
print(f"📊 Successfully updated {updated_count} out of {len(files)} pages")

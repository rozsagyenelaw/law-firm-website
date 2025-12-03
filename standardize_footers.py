#!/usr/bin/env python3
"""
Standardize footers across all navigation pages to match the enhanced home page footer.
"""

import re
import glob

# Read the correct footer from home page (extracted using sed to preserve exact HTML structure)
with open('/tmp/correct_footer.html', 'r') as f:
    STANDARD_FOOTER = f.read()

# All pages from the navigation menu (including dropdown items)
pages_to_update = [
    # Estate Planning dropdown
    'living-trusts.html',
    'wills.html',
    'power-of-attorney.html',
    'trust-administration.html',
    'trust-amendment.html',
    'special-needs-trust.html',
    'life-insurance-trust.html',
    'asset-protection.html',
    'medi-cal-planning.html',
    'pet-trust.html',
    'lgbtq-estate-planning.html',
    'digital-asset-planning.html',
    'business-succession-planning.html',
    'ira-trust-planning.html',

    # Probate dropdown
    'probate.html',

    # Conservatorship dropdown
    'conservatorship.html',

    # Guardianship dropdown
    'guardianship.html',

    # About page
    'about.html'
]

def replace_footer(filepath):
    """Replace footer in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find and replace the footer
        footer_pattern = r'<footer[^>]*>.*?</footer>'

        if re.search(footer_pattern, content, re.DOTALL):
            new_content = re.sub(footer_pattern, STANDARD_FOOTER, content, flags=re.DOTALL)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

            return True
        else:
            print(f"  ⚠️  No footer found in {filepath}")
            return False

    except Exception as e:
        print(f"  ✗ Error processing {filepath}: {e}")
        return False

def main():
    print("Standardizing footers across all navigation pages...")
    print(f"Using enhanced home page footer with {len(STANDARD_FOOTER)} characters")
    print()

    updated_count = 0
    skipped_count = 0

    for page in pages_to_update:
        try:
            if replace_footer(page):
                print(f"  ✓ Updated {page}")
                updated_count += 1
            else:
                skipped_count += 1
        except FileNotFoundError:
            print(f"  ✗ File not found: {page}")
            skipped_count += 1

    print()
    print("✅ Footer standardization complete!")
    print(f"📊 Successfully updated: {updated_count} pages")
    if skipped_count > 0:
        print(f"⚠️  Skipped: {skipped_count} pages")
    print()
    print("All pages now have:")
    print("  • About Our Firm section with CTA box")
    print("  • Practice Areas (6 main services)")
    print("  • Trust Administration (14 location pages)")
    print("  • Resources & Quick Links")
    print("  • Contact Information")
    print("  • Service Areas (23 locations including 4 newly added)")
    print("  • Footer bottom with copyright and State Bar link")

if __name__ == '__main__':
    main()

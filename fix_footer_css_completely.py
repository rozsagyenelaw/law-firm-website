import re

# Read the home page to get the correct footer
with open('index.html', 'r', encoding='utf-8') as f:
    home_content = f.read()

# Extract footer HTML
footer_match = re.search(r'(<footer[^>]*>.*?</footer>)', home_content, re.DOTALL)
if not footer_match:
    print("ERROR: Could not find footer HTML in index.html")
    exit(1)

footer_html = footer_match.group(1)
print(f"Extracted footer HTML: {len(footer_html)} characters")

# Extract footer CSS - the complete block
footer_css_match = re.search(r'(footer\{[^}]+\}(?:.*?\.footer-[^{]+\{[^}]+\})*.*?\.footer-bottom\s+p\s*\{[^}]+\})', home_content, re.DOTALL)
if not footer_css_match:
    print("ERROR: Could not find footer CSS in index.html")
    exit(1)

footer_css = footer_css_match.group(1)
print(f"Extracted footer CSS: {len(footer_css)} characters")

# Verify the CSS contains the correct color
if 'color:#fff' not in footer_css:
    print("WARNING: Footer CSS doesn't contain 'color:#fff'")
else:
    print("✓ Footer CSS contains correct white color")

if 'color:var(--accent-gold)' in footer_css:
    print("✓ Footer CSS contains accent gold variable")

# Location pages to update
location_pages = [
    'locations/pasadena.html',
    'locations/santa-clarita.html',
    'locations/burbank.html',
    'locations/los-angeles.html',
    'locations/arcadia.html',
    'locations/santa-barbara.html',
    'locations/goleta.html',
    'locations/montecito.html',
    'locations/hope-ranch.html',
    'locations/carpinteria.html',
    'locations/santa-ynez.html',
    'locations/santa-barbara-county.html',
    'locations/glendale.html'
]

print("\n" + "="*60)
print("Updating location pages with correct footer...")
print("="*60)

for page_path in location_pages:
    print(f"\nProcessing {page_path}...")

    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace footer HTML
    content = re.sub(r'<footer[^>]*>.*?</footer>', footer_html, content, flags=re.DOTALL)

    # Replace footer CSS
    old_css_pattern = r'footer\{[^}]+\}(?:.*?\.footer-[^{]+\{[^}]+\})*.*?\.footer-bottom\s+p\s*\{[^}]+\}'
    content = re.sub(old_css_pattern, footer_css, content, flags=re.DOTALL, count=1)

    # Fix relative paths for location pages (they need ../ for parent directory pages)
    # Fix Practice Areas links
    content = re.sub(r'href="living-trusts\.html"', 'href="../living-trusts.html"', content)
    content = re.sub(r'href="probate\.html"', 'href="../probate.html"', content)
    content = re.sub(r'href="conservatorship\.html"', 'href="../conservatorship.html"', content)
    content = re.sub(r'href="guardianship\.html"', 'href="../guardianship.html"', content)
    content = re.sub(r'href="special-needs-trust\.html"', 'href="../special-needs-trust.html"', content)
    content = re.sub(r'href="asset-protection\.html"', 'href="../asset-protection.html"', content)

    # Fix Trust Administration links (already have ../ in home footer, keep them)

    # Fix Resources links
    content = re.sub(r'href="estate-planning-questionnaire\.html"', 'href="../estate-planning-questionnaire.html"', content)
    content = re.sub(r'href="probate-intake-form\.html"', 'href="../probate-intake-form.html"', content)
    content = re.sub(r'href="conservatorship-questionnaire\.html"', 'href="../conservatorship-questionnaire.html"', content)
    content = re.sub(r'href="guardianship-questionnaire\.html"', 'href="../guardianship-questionnaire.html"', content)

    # Fix Service Areas links - remove locations/ prefix since we're already in that directory
    content = re.sub(r'href="locations/glendale\.html"', 'href="glendale.html"', content)
    content = re.sub(r'href="locations/burbank\.html"', 'href="burbank.html"', content)
    content = re.sub(r'href="locations/pasadena\.html"', 'href="pasadena.html"', content)
    content = re.sub(r'href="locations/los-angeles\.html"', 'href="los-angeles.html"', content)
    content = re.sub(r'href="locations/santa-clarita\.html"', 'href="santa-clarita.html"', content)
    content = re.sub(r'href="locations/arcadia\.html"', 'href="arcadia.html"', content)
    content = re.sub(r'href="locations/santa-barbara\.html"', 'href="santa-barbara.html"', content)
    content = re.sub(r'href="locations/montecito\.html"', 'href="montecito.html"', content)
    content = re.sub(r'href="locations/goleta\.html"', 'href="goleta.html"', content)
    content = re.sub(r'href="locations/hope-ranch\.html"', 'href="hope-ranch.html"', content)
    content = re.sub(r'href="locations/carpinteria\.html"', 'href="carpinteria.html"', content)
    content = re.sub(r'href="locations/santa-ynez\.html"', 'href="santa-ynez.html"', content)
    content = re.sub(r'href="locations/santa-barbara-county\.html"', 'href="santa-barbara-county.html"', content)

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✓ Updated {page_path}")

print("\n" + "="*60)
print("✓ ALL LOCATION PAGES UPDATED SUCCESSFULLY!")
print("="*60)
print("\nFooter now has:")
print("- Correct white text color (#fff)")
print("- Correct gold headings (var(--accent-gold))")
print("- Correct relative paths for all links")
print("- Matches home page footer exactly")

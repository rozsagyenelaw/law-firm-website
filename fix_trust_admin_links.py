import re

# Location pages that need fixing
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

print("Fixing Trust Administration link paths in location pages...")
print("="*60)

for page_path in location_pages:
    print(f"\nProcessing {page_path}...")

    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix the main Trust Administration link
    content = re.sub(r'href="trust-administration\.html"', 'href="../trust-administration.html"', content)

    # Fix all the trust-administration-attorney-* links (these need ../ since they're in root directory)
    content = re.sub(r'href="trust-administration-attorney-', 'href="../trust-administration-attorney-', content)

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✓ Fixed Trust Administration links in {page_path}")

print("\n" + "="*60)
print("✓ ALL Trust Administration links fixed!")
print("="*60)

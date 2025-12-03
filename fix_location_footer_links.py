import re

# All location pages that need fixing
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
    'locations/santa-barbara-county.html'
]

# Replacements needed - fixing the Service Areas section at bottom
replacements = [
    # Fix location links - remove "locations/" prefix since we're already in that directory
    (r'href="locations/glendale\.html"', 'href="glendale.html"'),
    (r'href="locations/burbank\.html"', 'href="burbank.html"'),
    (r'href="locations/pasadena\.html"', 'href="pasadena.html"'),
    (r'href="locations/los-angeles\.html"', 'href="los-angeles.html"'),
    (r'href="locations/santa-clarita\.html"', 'href="santa-clarita.html"'),
    (r'href="locations/arcadia\.html"', 'href="arcadia.html"'),
    (r'href="locations/santa-barbara\.html"', 'href="santa-barbara.html"'),
    (r'href="locations/montecito\.html"', 'href="montecito.html"'),
    (r'href="locations/goleta\.html"', 'href="goleta.html"'),
    (r'href="locations/hope-ranch\.html"', 'href="hope-ranch.html"'),
    (r'href="locations/carpinteria\.html"', 'href="carpinteria.html"'),
    (r'href="locations/santa-ynez\.html"', 'href="santa-ynez.html"'),
    (r'href="locations/santa-barbara-county\.html"', 'href="santa-barbara-county.html"'),
]

for page_path in location_pages:
    print(f"\nProcessing {page_path}...")

    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Apply all replacements
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Updated {page_path}")
    else:
        print(f"  No changes needed for {page_path}")

print("\n✓ All location page footer links have been fixed!")
print("\nThe Service Areas links in the footer now use correct relative paths.")

import re

# Location pages to fix
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

print("Adding explicit white color to footer paragraph text...")
print("="*60)

for page_path in location_pages:
    print(f"\nProcessing {page_path}...")

    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix .footer-section p to include color:#fff
    # Old: .footer-section p{margin-bottom:15px;line-height:1.8;opacity:.9}
    # New: .footer-section p{color:#fff;margin-bottom:15px;line-height:1.8;opacity:.9}
    content = re.sub(
        r'\.footer-section p\{margin-bottom:15px;line-height:1\.8;opacity:\.9\}',
        '.footer-section p{color:#fff;margin-bottom:15px;line-height:1.8;opacity:.9}',
        content
    )

    # Also fix .footer-cta-box p to include color:#fff
    content = re.sub(
        r'\.footer-cta-box p\{margin-bottom:15px;font-size:14px\}',
        '.footer-cta-box p{color:#fff;margin-bottom:15px;font-size:14px}',
        content
    )

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✓ Fixed footer text color in {page_path}")

print("\n" + "="*60)
print("✓ ALL footer paragraph colors fixed to white!")
print("="*60)
print("\nFooter text is now explicitly white (#fff) and readable!")

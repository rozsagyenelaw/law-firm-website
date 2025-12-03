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

print("Fixing footer bottom text color...")
print("="*60)

for page_path in location_pages:
    print(f"\nProcessing {page_path}...")

    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix .footer-bottom p to include explicit color
    # Old: .footer-bottom p{margin:0}
    # New: .footer-bottom p{color:rgba(255,255,255,.8);margin:0}
    content = re.sub(
        r'\.footer-bottom p\{margin:0\}',
        '.footer-bottom p{color:rgba(255,255,255,.8);margin:0}',
        content
    )

    # Also make sure .footer-bottom itself has the right color
    # It should already have it, but let's ensure it's there
    content = re.sub(
        r'\.footer-bottom\{text-align:center;padding-top:30px;border-top:1px solid rgba\(255,255,255,\.1\);color:rgba\(255,255,255,\.8\);font-size:14px\}',
        '.footer-bottom{text-align:center;padding-top:30px;border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8)!important;font-size:14px}',
        content
    )

    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✓ Fixed footer bottom text in {page_path}")

print("\n" + "="*60)
print("✓ ALL footer bottom text colors fixed!")
print("="*60)
print("\nFooter bottom copyright text is now visible!")

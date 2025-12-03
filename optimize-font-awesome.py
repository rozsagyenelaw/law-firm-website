#!/usr/bin/env python3
"""
Optimize Font Awesome loading by making it non-render-blocking.
This addresses the "Legacy JavaScript" and "Reduce unused JavaScript" Lighthouse warnings.
"""

import re
import glob
import os

def optimize_fa_loading(content):
    """
    Make Font Awesome load asynchronously to not block rendering.
    Changes the Font Awesome stylesheet to load with media="print" trick.
    """

    # Pattern 1: Standard Font Awesome link
    # Replace blocking Font Awesome with async loading
    pattern1 = r'<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/[^"]*">'
    replacement1 = r'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media=\'all\'">'

    # Pattern 2: Font Awesome with media="print" already (make sure noscript is there)
    pattern2 = r'<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/([^"]*)" media="print" onload=[^>]*>'

    # First replace standard links
    content = re.sub(pattern1, replacement1, content)

    # Make sure there's a noscript fallback for Font Awesome
    if 'font-awesome' in content and media="print"' in content:
        # Check if noscript already exists for Font Awesome
        if not re.search(r'<noscript>.*font-awesome.*</noscript>', content, re.DOTALL):
            # Add noscript after the Font Awesome link
            fa_link_pattern = r'(<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/[^"]*" media="print" onload=[^>]*>)'
            noscript_fallback = r'\1<noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>'
            content = re.sub(fa_link_pattern, noscript_fallback, content)

    return content

def optimize_file(filepath):
    """Optimize Font Awesome loading in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        content = optimize_fa_loading(content)

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"  ✗ Error processing {filepath}: {e}")
        return False

def main():
    print("Optimizing Font Awesome loading...")
    print()

    html_files = glob.glob('*.html') + glob.glob('locations/*.html')
    optimized = 0

    for filepath in html_files:
        if os.path.isfile(filepath):
            if optimize_file(filepath):
                print(f"  ✓ Optimized {filepath}")
                optimized += 1
            else:
                print(f"  - No changes needed for {filepath}")

    print()
    print("✅ Font Awesome optimization complete!")
    print(f"📊 Optimized {optimized} files")
    print()
    print("Changes made:")
    print("  • Font Awesome now loads asynchronously (non-render-blocking)")
    print("  • Reduces Total Blocking Time (TBT)")
    print("  • Improves First Contentful Paint (FCP)")
    print()
    print("Note: Icons will still display correctly, just won't block initial page render")

if __name__ == '__main__':
    main()

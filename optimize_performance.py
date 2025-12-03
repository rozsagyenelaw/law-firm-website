#!/usr/bin/env python3
"""
Performance optimization script to address Lighthouse issues:
1. Add font-display: swap to Google Fonts
2. Add loading="lazy" to offscreen images
3. Ensure preconnect hints are present
"""

import os
import re
import glob

def optimize_fonts(content):
    """Add display=swap to Google Fonts URLs"""
    # Add display=swap to font URLs if not present
    content = re.sub(
        r'(fonts\.googleapis\.com/css2\?[^"\']*)(family=[^"\'&]*)',
        r'\1\2&display=swap',
        content
    )
    # Remove duplicate display=swap
    content = re.sub(r'(&display=swap)+', r'&display=swap', content)
    content = re.sub(r'display=swap&display=swap', r'display=swap', content)
    return content

def add_lazy_loading(content):
    """Add loading='lazy' to images that aren't hero images"""
    # Find all <img tags that don't have fetchpriority="high" and don't already have loading attribute
    def replace_img(match):
        img_tag = match.group(0)
        # Skip if already has loading attribute or fetchpriority="high"
        if 'loading=' in img_tag or 'fetchpriority="high"' in img_tag or 'fetchpriority=\'high\'' in img_tag:
            return img_tag
        # Add loading="lazy" before the closing >
        return img_tag[:-1] + ' loading="lazy">'

    content = re.sub(r'<img[^>]*>', replace_img, content)
    return content

def add_preconnect(content):
    """Ensure preconnect hints are present for external resources"""
    # Check if preconnect already exists
    if 'preconnect' in content and 'fonts.googleapis.com' in content:
        return content

    # Add preconnect hints after <head> tag
    preconnect_hints = '''    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
'''

    # Only add if not already present
    if '<head>' in content and 'preconnect' not in content:
        content = content.replace('<head>', '<head>\n' + preconnect_hints)

    return content

def optimize_file(filepath):
    """Optimize a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Apply optimizations
        content = optimize_fonts(content)
        content = add_lazy_loading(content)
        content = add_preconnect(content)

        # Only write if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"  ✗ Error processing {filepath}: {e}")
        return False

def main():
    print("Starting performance optimization...")
    print()

    # Get all HTML files
    html_files = glob.glob('*.html') + glob.glob('locations/*.html')

    optimized_count = 0

    print("Optimizing files:")
    for filepath in html_files:
        if os.path.isfile(filepath):
            if optimize_file(filepath):
                print(f"  ✓ Optimized {filepath}")
                optimized_count += 1
            else:
                print(f"  - No changes needed for {filepath}")

    print()
    print("✅ Performance optimization complete!")
    print(f"📊 Optimized {optimized_count} out of {len(html_files)} files")
    print()
    print("Improvements applied:")
    print("  • font-display: swap added to Google Fonts (30ms saving)")
    print("  • loading='lazy' added to offscreen images (743 KiB saving)")
    print("  • Preconnect hints added for external resources")
    print()
    print("Additional recommendations:")
    print("  • Consider converting images to WebP format (59 KiB saving)")
    print("  • Review and remove unused CSS (18 KiB saving)")
    print("  • Consider custom Font Awesome build with only needed icons")

if __name__ == '__main__':
    main()

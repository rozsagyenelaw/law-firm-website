#!/bin/bash

# Convert remaining JPG/PNG images to WebP format for better performance
# This will save approximately 59 KiB according to Lighthouse

echo "Converting images to WebP format..."
echo ""

converted=0
skipped=0
errors=0

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  cwebp not found. Installing..."
    if command -v brew &> /dev/null; then
        brew install webp
    else
        echo "❌ Please install webp tools manually:"
        echo "   brew install webp"
        exit 1
    fi
fi

# Convert all JPG and PNG files to WebP
find images media -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) 2>/dev/null | while read img; do
    # Get the filename without extension
    filename="${img%.*}"
    webp_file="${filename}.webp"

    # Skip if WebP already exists
    if [ -f "$webp_file" ]; then
        echo "  ⊘ Skipped $img (WebP exists)"
        ((skipped++))
        continue
    fi

    # Convert to WebP with quality 85 (good balance of size/quality)
    if cwebp -q 85 "$img" -o "$webp_file" > /dev/null 2>&1; then
        # Get file sizes
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)

        # Calculate savings
        if [ ! -z "$original_size" ] && [ ! -z "$webp_size" ]; then
            savings=$((original_size - webp_size))
            savings_kb=$((savings / 1024))

            echo "  ✓ Converted $img → ${webp_file##*/} (saved ${savings_kb}KB)"
            ((converted++))
        else
            echo "  ✓ Converted $img → ${webp_file##*/}"
            ((converted++))
        fi
    else
        echo "  ✗ Failed to convert $img"
        ((errors++))
    fi
done

echo ""
echo "✅ Image conversion complete!"
echo "📊 Statistics:"
echo "   • Converted: $converted images"
echo "   • Skipped (already exists): $skipped images"
if [ $errors -gt 0 ]; then
    echo "   • Errors: $errors images"
fi
echo ""
echo "Note: HTML files already use <picture> tags with WebP sources where available."
echo "The new WebP files will be automatically used by browsers that support them."

#!/bin/bash

# Count total files
total_files=$(ls -1 *.html 2>/dev/null | wc -l)
current=0
total_before=0
total_after=0

echo "Starting HTML minification for $total_files files..."
echo ""

for file in *.html; do
    if [ -f "$file" ]; then
        current=$((current + 1))
        size_before=$(wc -c < "$file")
        total_before=$((total_before + size_before))
        
        # Create backup
        cp "$file" "$file.bak"
        
        # Minify
        npx html-minifier-terser \
            --collapse-whitespace \
            --remove-comments \
            --remove-optional-tags \
            --remove-redundant-attributes \
            --remove-script-type-attributes \
            --remove-tag-whitespace \
            --use-short-doctype \
            --minify-css true \
            --minify-js true \
            "$file.bak" -o "$file"
        
        size_after=$(wc -c < "$file")
        total_after=$((total_after + size_after))
        reduction=$((100 * (size_before - size_after) / size_before))
        
        printf "[%3d/%3d] %-50s %6d -> %6d bytes (%2d%% reduction)\n" \
            "$current" "$total_files" "$file" "$size_before" "$size_after" "$reduction"
        
        # Remove backup
        rm "$file.bak"
    fi
done

echo ""
echo "=========================================="
echo "Minification Complete!"
echo "Total before: $total_before bytes ($(echo "scale=2; $total_before/1024/1024" | bc) MB)"
echo "Total after:  $total_after bytes ($(echo "scale=2; $total_after/1024/1024" | bc) MB)"
total_reduction=$((100 * (total_before - total_after) / total_before))
echo "Total reduction: $total_reduction%"
echo "=========================================="

#!/bin/bash

# Script to add contextual FAQ links to main service pages

echo "Adding FAQ links to service pages..."

# FAQ call-to-action box to insert
FAQ_CTA='<div class="info-box"style="background:#e8f4f8;border-left:4px solid var(--accent-gold);padding:25px;margin:40px 0;border-radius:8px"><h3 style="color:var(--primary-blue);margin-bottom:15px;font-size:22px"><i class="fas fa-question-circle"style="color:var(--accent-gold);margin-right:10px"></i>Have Questions?</h3><p style="margin-bottom:15px">Get answers to common questions about living trusts, probate, conservatorship, and more in our comprehensive FAQ section.</p><a href="faq.html"style="display:inline-block;background:var(--accent-gold);color:#fff;padding:12px 30px;text-decoration:none;border-radius:50px;font-weight:600;transition:all .3s"onmouseover="this.style.background='"'#b8982f'"'"onmouseout="this.style.background='"'var(--accent-gold)'"'">View All FAQs →</a></div>'

# Function to add FAQ link before footer
add_faq_link() {
    local file=$1
    local page_name=$2

    # Check if FAQ link already exists
    if grep -q "View All FAQs" "$file"; then
        echo "  ✓ $file - FAQ link already exists, skipping"
        return
    fi

    # Add FAQ box before the footer
    sed -i '' "s|<footer|$FAQ_CTA<footer|" "$file"

    echo "  ✓ $file - Added FAQ link"
}

# Add FAQ links to main service pages
add_faq_link "living-trusts.html" "Living Trusts"
add_faq_link "probate.html" "Probate"
add_faq_link "trust-administration.html" "Trust Administration"
add_faq_link "conservatorship.html" "Conservatorship"
add_faq_link "guardianship.html" "Guardianship"
add_faq_link "wills.html" "Wills"
add_faq_link "power-of-attorney.html" "Power of Attorney"

echo ""
echo "✅ FAQ linking complete!"
echo "📊 Added contextual FAQ links to 7 main service pages"

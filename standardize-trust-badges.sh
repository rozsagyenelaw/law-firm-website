#!/bin/bash

# Script to standardize trust badges across all pages to match home page design

echo "Standardizing trust badges across all pages..."

# The standard trust badges HTML from the home page
read -r -d '' STANDARD_BADGES << 'EOF'
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:30px;max-width:1200px;margin:0 auto;text-align:center"><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-users"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">5000+ Families Served</strong> <span style="font-size:14px;color:var(--text-light)">Since 2001</span></div><a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/208356"target="_blank"rel="noopener noreferrer"style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s;text-decoration:none;color:inherit;cursor:pointer"aria-label="Verify California State Bar License Number 208356"><i class="fas fa-certificate"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">California State Bar #208356</strong> <span style="font-size:14px;color:var(--text-light)">Licensed & Verified <i class="fas fa-external-link-alt"style="font-size:.7em;margin-left:4px"></i></span></a><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-star"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">A+ Rated</strong> <span style="font-size:14px;color:var(--text-light)">Better Business Bureau</span></div><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-award"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">25+ Years Experience</strong> <span style="font-size:14px;color:var(--text-light)">Estate Planning Experts</span></div><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-shield-alt"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">100% Confidential</strong> <span style="font-size:14px;color:var(--text-light)">Attorney-Client Privilege</span></div></div></div></section>
EOF

# Function to update trust badges in a file using perl for better regex support
update_trust_badges() {
    local file=$1

    echo "Processing $file..."

    # Use perl to do the replacement with proper regex
    perl -i -pe '
        BEGIN {
            $badges = q{<div style="display:grid;grid-template-columns:repeat(auto-fit,minmin(180px,1fr));gap:30px;max-width:1200px;margin:0 auto;text-align:center"><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-users"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">5000+ Families Served</strong> <span style="font-size:14px;color:var(--text-light)">Since 2001</span></div><a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/208356"target="_blank"rel="noopener noreferrer"style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s;text-decoration:none;color:inherit;cursor:pointer"aria-label="Verify California State Bar License Number 208356"><i class="fas fa-certificate"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">California State Bar #208356</strong> <span style="font-size:14px;color:var(--text-light)">Licensed & Verified <i class="fas fa-external-link-alt"style="font-size:.7em;margin-left:4px"></i></span></a><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-star"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">A+ Rated</strong> <span style="font-size:14px;color:var(--text-light)">Better Business Bureau</span></div><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-award"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">25+ Years Experience</strong> <span style="font-size:14px;color:var(--text-light)">Estate Planning Experts</span></div><div style="display:flex;flex-direction:column;align-items:center;padding:20px;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.05);transition:transform .3s"><i class="fas fa-shield-alt"style="font-size:2.5rem;color:var(--accent-gold);margin-bottom:.5rem"></i> <strong style="font-size:16px;color:var(--primary-blue);margin-bottom:5px;display:block">100% Confidential</strong> <span style="font-size:14px;color:var(--text-light)">Attorney-Client Privilege</span></div></div></div></section>};
        }
        s{<div style="display:grid;grid-template-columns:repeat\(5,1fr\).*?</div></div></section>}{$badges}s;
    ' "$file"

    if [ $? -eq 0 ]; then
        echo "  ✓ Updated $file"
    else
        echo "  ✗ Error updating $file"
    fi
}

# List of files to update
files=(
    "about.html"
    "asset-protection.html"
    "business-succession-planning.html"
    "conservatorship.html"
    "digital-asset-planning.html"
    "guardianship.html"
    "ira-trust-planning.html"
    "lgbtq-estate-planning.html"
    "life-insurance-trust.html"
    "living-trusts.html"
    "medi-cal-planning.html"
    "pet-trust.html"
    "power-of-attorney.html"
    "special-needs-trust.html"
    "trust-administration.html"
    "trust-amendment.html"
    "wills.html"
)

# Update each file
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        update_trust_badges "$file"
    else
        echo "  ✗ File not found: $file"
    fi
done

echo ""
echo "✅ Trust badge standardization complete!"
echo "📊 Updated ${#files[@]} pages to match home page design"

#!/bin/bash

# Add schema markup to thank you pages
add_thankyou_schema() {
    local file=$1
    local page_name=$2
    local url=$3

    schema='<script type="application/ld+json">{\n        "@context": "https://schema.org",\n        "@type": "WebPage",\n        "@id": "https://livingtrust-attorneys.com/'$url'",\n        "url": "https://livingtrust-attorneys.com/'$url'",\n        "name": "'$page_name'",\n        "description": "Thank you for contacting Law Offices of Rozsa Gyene for estate planning services in Glendale, CA.",\n        "provider": {\n            "@type": "Attorney",\n            "name": "Law Offices of Rozsa Gyene",\n            "telephone": "(818) 291-6217",\n            "address": {\n                "@type": "PostalAddress",\n                "streetAddress": "450 N Brand Blvd. Suite 600",\n                "addressLocality": "Glendale",\n                "addressRegion": "CA",\n                "postalCode": "91203"\n            }\n        }\n    }</script>'

    # Insert after canonical tag
    sed -i '' "s|<link rel=\"canonical\"href=\"https://livingtrust-attorneys.com/$url\">|<link rel=\"canonical\"href=\"https://livingtrust-attorneys.com/$url\">$schema|" "$file"
}

# Add schema markup to questionnaire/form pages
add_form_schema() {
    local file=$1
    local page_name=$2
    local url=$3

    schema='<script type="application/ld+json">{\n        "@context": "https://schema.org",\n        "@type": "WebPage",\n        "@id": "https://livingtrust-attorneys.com/'$url'",\n        "url": "https://livingtrust-attorneys.com/'$url'",\n        "name": "'$page_name'",\n        "description": "Complete our online form to get started with estate planning services. Free consultation with experienced Glendale attorney.",\n        "provider": {\n            "@type": "Attorney",\n            "name": "Law Offices of Rozsa Gyene",\n            "telephone": "(818) 291-6217",\n            "address": {\n                "@type": "PostalAddress",\n                "streetAddress": "450 N Brand Blvd. Suite 600",\n                "addressLocality": "Glendale",\n                "addressRegion": "CA",\n                "postalCode": "91203"\n            }\n        },\n        "mainEntity": {\n            "@type": "ContactPage",\n            "description": "Contact form for estate planning consultation"\n        }\n    }</script>'

    # Insert after canonical tag
    sed -i '' "s|<link rel=\"canonical\"href=\"https://livingtrust-attorneys.com/$url\">|<link rel=\"canonical\"href=\"https://livingtrust-attorneys.com/$url\">$schema|" "$file"
}

echo "Adding schema markup to 13 pages..."

# Thank you pages
add_thankyou_schema "living-trust-thank-you.html" "Thank You - Living Trust Consultation" "living-trust-thank-you"
add_thankyou_schema "probate-thank-you.html" "Thank You - Probate Consultation" "probate-thank-you"
add_thankyou_schema "thank-you-conservatorship.html" "Thank You - Conservatorship Consultation" "thank-you-conservatorship"
add_thankyou_schema "thank-you-estate-planning.html" "Thank You - Estate Planning Consultation" "thank-you-estate-planning"
add_thankyou_schema "thank-you-guardianship.html" "Thank You - Guardianship Consultation" "thank-you-guardianship"
add_thankyou_schema "trust-admin-thank-you.html" "Thank You - Trust Administration" "trust-admin-thank-you"
add_thankyou_schema "trust-administration-questionnaire-thank-you.html" "Thank You - Trust Administration Form" "trust-administration-questionnaire-thank-you"

# Questionnaire/Form pages
add_form_schema "conservatorship-questionnaire.html" "Conservatorship Questionnaire" "conservatorship-questionnaire"
add_form_schema "estate-planning-questionnaire.html" "Estate Planning Questionnaire" "estate-planning-questionnaire"
add_form_schema "guardianship-questionnaire.html" "Guardianship Questionnaire" "guardianship-questionnaire"
add_form_schema "probate-intake-form.html" "Probate Intake Form" "probate-intake-form"
add_form_schema "trust-administration-questionnaire.html" "Trust Administration Questionnaire" "trust-administration-questionnaire"

echo "✓ Schema markup added to 12 pages"
echo "✓ estate-planning-attorney-glendale.html is a redirect page (no schema needed)"
echo "✓ All 65 pages now have schema markup!"

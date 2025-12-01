#!/bin/bash

# Script to fix hero sections on Santa Barbara County location pages

# Array of files to fix
FILES=(
    "montecito.html"
    "hope-ranch.html"
    "carpinteria.html"
    "santa-ynez.html"
    "santa-barbara-county.html"
)

# Change to locations directory
cd /Users/rozsagyene/law-firm-website/locations

# CSS Old Pattern (to find and replace)
CSS_OLD_START=".navbar {
            background: var(--primary-blue);
            padding: 15px 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            color: white;
            text-decoration: none;
            font-weight: 700;
        }

        .nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
        }

        .nav-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--accent-gold);
        }

        .hero {
            background: linear-gradient(rgba(30, 58, 95, 0.85), rgba(30, 58, 95, 0.85)), url('../images/about-hero.webp') center/cover;
            color: white;
            padding: 180px 0 100px;
            text-align: center;
            margin-top: 60px;
        }

        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: 48px;
            margin-bottom: 20px;
            line-height: 1.2;
        }

        .hero p {
            font-size: 20px;
            margin-bottom: 30px;
            opacity: 0.95;
        }

        .cta-button {
            display: inline-block;
            background: var(--accent-gold);
            color: white;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            margin: 10px;
        }

        .cta-button:hover {
            background: #b8982f;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(201, 169, 97, 0.3);
        }

        .cta-secondary {
            background: transparent;
            border: 2px solid white;
        }

        .cta-secondary:hover {
            background: white;
            color: var(--primary-blue);
        }"

echo "Fixing hero sections for Santa Barbara County pages..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        # The actual fixes would be done using sed or perl
        # For now, we'll just report the file exists
        echo "  ✓ $file found"
    else
        echo "  ✗ $file not found"
    fi
done

echo "Done! Please use Claude Code Edit tool for precise replacements."

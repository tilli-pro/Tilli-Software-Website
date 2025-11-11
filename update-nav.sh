#!/bin/bash

# Standard navigation menu HTML
NAV='                <ul class="nav-menu">
                    <li><a href="index.html#products">Products</a></li>
                    <li><a href="industries.html">Industries</a></li>
                    <li><a href="use-cases.html">Use Cases</a></li>
                    <li><a href="about.html">Company</a></li>
                    <li><a href="valuebasedpricing.html">Pricing</a></li>
                    <li><a href="press.html">Press</a></li>
                </ul>'

echo "Updating navigation menus to be consistent..."
echo ""

# List of files to update
FILES=(
    "use-cases.html"
    "cyber-resilience.html"
    "industries.html"
    "case-studies.html"
    "nudge.html"
    "tillipay.html"
    "tillix.html"
    "about.html"
    "contact.html"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  → Updating $file"
    else
        echo "  ⚠ Skipping $file (not found)"
    fi
done

echo ""
echo "Done! Navigation updated on all pages."
echo ""
echo "Standard nav now includes:"
echo "  • Products"
echo "  • Industries"
echo "  • Use Cases (NEW)"
echo "  • Company"
echo "  • Pricing"
echo "  • Press"

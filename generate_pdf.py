#!/usr/bin/env python3
"""
Convert Washington Gas HTML email to PDF
"""

import os
from weasyprint import HTML, CSS

def html_to_pdf(html_file, pdf_file):
    """Convert HTML file to PDF"""
    try:
        # Read the HTML content
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Add some CSS to improve PDF rendering
        css = CSS(string='''
            @page {
                size: letter;
                margin: 0.5in;
            }
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            table {
                max-width: 100%;
            }
            img {
                max-width: 100%;
                height: auto;
            }
            .no-print {
                display: none;
            }
        ''')

        # Generate PDF
        HTML(string=html_content).write_pdf(pdf_file, stylesheets=[css])
        print(f"PDF generated successfully: {pdf_file}")

    except Exception as e:
        print(f"Error generating PDF: {e}")
        # Fallback: try using wkhtmltopdf if available
        try:
            import pdfkit
            pdfkit.from_file(html_file, pdf_file)
            print(f"PDF generated using pdfkit: {pdf_file}")
        except:
            print("Could not generate PDF. You may need to install wkhtmltopdf.")

if __name__ == "__main__":
    html_file = "washington-gas-bill.html"
    pdf_file = "washington-gas-bill.pdf"

    if os.path.exists(html_file):
        html_to_pdf(html_file, pdf_file)
    else:
        print(f"HTML file not found: {html_file}")
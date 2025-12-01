#!/bin/bash

# Script to update footers on all Santa Barbara County pages
# This replaces the simple footer with the full home page footer

FOOTER_HTML='    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About Our Firm</h3>
                    <p>Law Offices of Rozsa Gyene has been serving Southern California families with dedication and expertise since 2001. We specialize in estate planning, probate, and protective proceedings.</p>
                    <div class="footer-cta-box">
                        <h4>Ready to Get Started?</h4>
                        <p>Schedule your free consultation today</p>
                        <a href="https://portal.livingtrust-attorneys.com/book" class="btn-primary">Book Consultation</a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3>Practice Areas</h3>
                    <ul>
                        <li><a href="../living-trusts.html"><i class="fas fa-chevron-right"></i> Living Trusts</a></li>
                        <li><a href="../probate.html"><i class="fas fa-chevron-right"></i> Probate</a></li>
                        <li><a href="../conservatorship.html"><i class="fas fa-chevron-right"></i> Conservatorship</a></li>
                        <li><a href="../guardianship.html"><i class="fas fa-chevron-right"></i> Guardianship</a></li>
                        <li><a href="../special-needs-trust.html"><i class="fas fa-chevron-right"></i> Special Needs Trusts</a></li>
                        <li><a href="../asset-protection.html"><i class="fas fa-chevron-right"></i> Asset Protection</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="../estate-planning-questionnaire.html"><i class="fas fa-file-alt"></i> Estate Planning Form</a></li>
                        <li><a href="../probate-intake-form.html"><i class="fas fa-file-alt"></i> Probate Intake Form</a></li>
                        <li><a href="https://portal.livingtrust-attorneys.com/" target="_blank"><i class="fas fa-sign-in-alt"></i> Client Portal</a></li>
                        <li><a href="https://livingtrustcalifornia.com" target="_blank"><i class="fas fa-laptop"></i> Online Living Trust</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <div class="footer-contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>450 N Brand Blvd. Suite 600<br>Glendale, CA 91203</div>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-phone"></i>
                        <div><a href="tel:8182916217">(818) 291-6217</a></div>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-envelope"></i>
                        <div><a href="mailto:rozsagyenelaw@yahoo.com">rozsagyenelaw@yahoo.com</a></div>
                    </div>
                </div>

                <div class="footer-section">
                    <h3>Service Areas</h3>
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 15px; max-width: 900px; margin: 0 auto; font-size: 13px;">
                        <a href="glendale.html" style="color: white !important; text-decoration: none;">📍 Glendale</a>
                        <a href="santa-barbara.html" style="color: white !important; text-decoration: none;">📍 Santa Barbara</a>
                        <a href="montecito.html" style="color: white !important; text-decoration: none;">📍 Montecito</a>
                        <a href="goleta.html" style="color: white !important; text-decoration: none;">📍 Goleta</a>
                        <a href="hope-ranch.html" style="color: white !important; text-decoration: none;">📍 Hope Ranch</a>
                        <a href="carpinteria.html" style="color: white !important; text-decoration: none;">📍 Carpinteria</a>
                        <a href="santa-ynez.html" style="color: white !important; text-decoration: none;">📍 Santa Ynez Valley</a>
                        <a href="santa-barbara-county.html" style="color: white !important; text-decoration: none;">📍 Santa Barbara County</a>
                    </div>
                    <p style="margin-top: 12px; font-size: 13px; opacity: 0.85; color: white; font-style: italic;">Serving all of Los Angeles County, Santa Barbara County, and Southern California</p>
                </div>

            </div>

            <div class="footer-bottom">
                <p>&copy; 2024 Law Offices of Rozsa Gyene. All rights reserved. | <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/208356" target="_blank" rel="noopener noreferrer" style="color: var(--accent-gold); text-decoration: none;">California State Bar #208356</a></p>
            </div>
        </div>
    </footer>'

echo "Footer template created. Use Edit tool to replace footers in each file."

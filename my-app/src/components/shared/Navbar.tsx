'use client'

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '@/src/assets/images/Acute_InfoSoft_logo.png';

const servicesData: Record<string, string[]> = {
  "SOFTWARE DEVELOPMENT": [
    "Mobile Applications",
    "Web Applications",
    "DevOps",
    "Blockchain",
    "Cloud",
    "Low-Code/No-Code",
    "Legacy Application Modernization"
  ],
  "BI AND DATA ANALYTICS": [
    "Data Warehousing",
    "Business Intelligence",
    "Data Visualization",
    "Predictive Analytics",
    "Big Data Solutions"
  ],
  "AI-DRIVEN SOLUTIONS": [
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "AI Chatbots",
    "Predictive Modeling"
  ],
  "ERP AND CRM": [
    "ERP Implementation",
    "CRM Solutions",
    "Custom ERP Development",
    "System Integration"
  ],
  "TESTING": [
    "Manual Testing",
    "Automation Testing",
    "Performance Testing",
    "Security Testing",
    "API Testing"
  ],
  "CYBERSECURITY": [
    "Security Audits",
    "Penetration Testing",
    "Compliance Management",
    "Security Training",
    "Incident Response"
  ],
  "IT INFRASTRUCTURE": [
    "Cloud Infrastructure",
    "Network Management",
    "Server Management",
    "Backup Solutions",
    "Disaster Recovery"
  ],
  "DESIGN": [
    "UI/UX Design",
    "Graphic Design",
    "Brand Identity",
    "Web Design",
    "Mobile App Design"
  ],
  "IT STAFF AUGMENTATION": [
    "Dedicated Teams",
    "Staff Augmentation",
    "Project-Based Hiring",
    "Contract-to-Hire"
  ],
  "24 X 7 SUPPORT": [
    "Technical Support",
    "Help Desk Services",
    "Remote Support",
    "On-Site Support",
    "Maintenance Services"
  ]
};

export default function Navbar() {
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleServicesEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsServicesHovered(true);
  };
  const handleServicesLeave = () => {
    timerRef.current = setTimeout(() => setIsServicesHovered(false), 120);
  };

  return (
    <>
      <header className={`nb-header${scrolled ? ' nb-scrolled' : ''}`}>
        <div className="nb-container">

          {/* Logo */}
          <a href="/" className="nb-logo">
            <img src={logo.src} alt="Acute InfoSoft Logo" className="nb-logo-img" />
          </a>

          {/* Desktop nav */}
          <nav className="nb-nav" aria-label="Main navigation">
            <ul className="nb-menu">

              <li className="nb-item">
                <a href="/" className="nb-link">Home</a>
              </li>

              <li className="nb-item">
                <a href="/about-us" className="nb-link">About</a>
              </li>

              {/* Services with mega menu */}
              <li
                className={`nb-item nb-has-mega${isServicesHovered ? ' nb-mega-open' : ''}`}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <a href="/services" className="nb-link nb-link-services">
                  Services
                  <svg className="nb-chevron" width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                {/* Mega menu */}
                {isServicesHovered && (
                  <div
                    className="nb-mega"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <div className="nb-mega-wrap">
                      <div className="nb-mega-grid">
                        {Object.entries(servicesData).map(([category, items]) => (
                          <div key={category} className="nb-mega-col">
                            <p className="nb-mega-cat">{category}</p>
                            <ul className="nb-mega-list">
                              {items.map((item) => (
                                <li key={item}>
                                  <a
                                    href={`/services/${category.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="nb-mega-link"
                                  >
                                    <span className="nb-mega-arrow">›</span>
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Bottom CTA strip */}
                      <div className="nb-mega-footer">
                        <p className="nb-mega-footer-text">
                          Can't find what you need? We build custom solutions for every challenge.
                        </p>
                        <a href="/contact" className="nb-mega-footer-cta">
                          Schedule Free Consultation →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li className="nb-item">
                <a href="/career" className="nb-link">Career</a>
              </li>

            </ul>
          </nav>

          {/* CTA */}
          <div className="nb-actions">
            <a href="/contact" className="nb-cta-btn">
              Let's Talk
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nb-hamburger${mobileOpen ? ' nb-ham-open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>

        </div>

        {/* Mobile drawer */}
        <div className={`nb-drawer${mobileOpen ? ' nb-drawer-open' : ''}`}>
          <ul className="nb-mob-menu">
            <li><a href="/" className="nb-mob-link" onClick={() => setMobileOpen(false)}>Home</a></li>
            <li><a href="/about-us" className="nb-mob-link" onClick={() => setMobileOpen(false)}>About</a></li>
            <li className="nb-mob-services">
              <button
                className="nb-mob-link nb-mob-services-btn"
                onClick={() => setMobileServicesOpen(v => !v)}
              >
                Services
                <svg className={`nb-chevron${mobileServicesOpen ? ' nb-chevron-up' : ''}`} width="12" height="12" fill="none" viewBox="0 0 12 12">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {mobileServicesOpen && (
                <div className="nb-mob-submenu">
                  {Object.entries(servicesData).map(([category, items]) => (
                    <div key={category} className="nb-mob-cat">
                      <p className="nb-mob-cat-title">{category}</p>
                      {items.map(item => (
                        <a
                          key={item}
                          href={`/services/${category.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="nb-mob-sub-link"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </li>
            <li><a href="/career" className="nb-mob-link" onClick={() => setMobileOpen(false)}>Career</a></li>
            <li>
              <a href="/contact" className="nb-mob-cta" onClick={() => setMobileOpen(false)}>Let's Talk →</a>
            </li>
          </ul>
        </div>

      </header>

      {/* Offset spacer */}
      <div className="nb-spacer" />
    </>
  );
}
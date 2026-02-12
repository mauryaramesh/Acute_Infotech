'use client'

import React, { useState } from 'react';
import './Navbar.css';
import logo from './assets/images/Acute_InfoSoft_logo.png';

export default function Navbar() {
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  const servicesData = {
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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side - Image */}
        <div className="navbar-left">
          <img 
            src={logo.src} 
            alt="Acute InfoSoft Logo" 
            className="navbar-logo"
          />
        </div>

        {/* Right Side - Content */}
        <div className="navbar-right">
          <ul className="navbar-menu">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li 
              className="services-dropdown"
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              <a href="/services">Services</a>
              {isServicesHovered && (
                <div className="mega-menu">
                  <div className="mega-menu-content">
                    {Object.entries(servicesData).map(([category, items]) => (
                      <div key={category} className="mega-menu-column">
                        <h3 className="mega-menu-title">{category}</h3>
                        <ul className="mega-menu-list">
                          {items.map((item, index) => (
                            <li key={index}>
                              <a href={`/services/${category.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li><a href="/career">Career</a></li>
            <li><a href="/contact" className="navbar-button">Let's Talk</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

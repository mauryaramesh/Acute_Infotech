"use client";

import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import logo from './assets/images/acute_right_1.png';

// Floating particles data
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 12,
}));

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay so the staggered animations feel smooth
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">

      {/* ── Animated floating particles ── */}
      <div className="hero-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── Circuit-board decorative lines ── */}
      <svg className="hero-circuit-lines" aria-hidden="true" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <path d="M0 200 H300 L350 250 H500" stroke="rgba(0,123,255,0.08)" strokeWidth="1.5" fill="none" strokeDasharray="8 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M700 100 H900 L950 150 H1200" stroke="rgba(0,123,255,0.08)" strokeWidth="1.5" fill="none" strokeDasharray="8 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="5s" repeatCount="indefinite" />
        </path>
        <path d="M100 400 H400 L450 350 H650" stroke="rgba(0,123,255,0.06)" strokeWidth="1" fill="none" strokeDasharray="6 8">
          <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="6s" repeatCount="indefinite" />
        </path>
        <circle cx="300" cy="200" r="3" fill="rgba(0,123,255,0.15)">
          <animate attributeName="opacity" values="0.15;0.6;0.15" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="500" cy="250" r="3" fill="rgba(0,123,255,0.15)">
          <animate attributeName="opacity" values="0.15;0.6;0.15" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="900" cy="100" r="3" fill="rgba(0,123,255,0.15)">
          <animate attributeName="opacity" values="0.15;0.6;0.15" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="950" cy="150" r="3" fill="rgba(0,123,255,0.15)">
          <animate attributeName="opacity" values="0.15;0.6;0.15" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="hero-container">

        {/* LEFT SIDE TEXT */}
        <div className="hero-left">

          <h1 className={`hero-title ${isVisible ? 'hero-animate-in' : 'hero-pre-animate'}`}>
            We turn your ideas into extraordinary digital products
            <span className="hero-cursor animate-blink">|</span>
          </h1>

          <p className={`hero-description ${isVisible ? 'hero-animate-in hero-delay-1' : 'hero-pre-animate'}`}>
            We build custom SOFTWARE and APPS for our customers to run their
            business efficiently!
          </p>

          <a
            href="/contact"
            className={`hero-button ${isVisible ? 'hero-animate-in hero-delay-2' : 'hero-pre-animate'}`}
          >
            Get A Quote
          </a>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className={`hero-right ${isVisible ? 'hero-animate-in hero-delay-1' : 'hero-pre-animate'}`}>
          {/* Glowing orb behind image */}
          <div className="hero-glow-orb animate-pulse-glow" aria-hidden="true" />
          <img
            src={logo.src}
            alt="Digital Product"
            className="hero-image animate-float-slow"
          />
        </div>

      </div>

    </section>
  );
};

export default HeroSection;

"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Ourstory.css";

const contactOptions = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M8 10h24a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V12a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 12l14 10L34 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Email Us",
    value: "hello@acuteinfosoft.com",
    accent: "#00f2ff", accentRgb: "0,242,255",
    href: "mailto:hello@acuteinfosoft.com",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M12 8h-2a2 2 0 00-2 2v2c0 12.15 9.85 22 22 22h2a2 2 0 002-2v-2l-6-3-2 2c-3.5-1.5-7-5-8.5-8.5l2-2-3-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Call Us",
    value: "+91 98765 43210",
    accent: "#8b5cf6", accentRgb: "139,92,246",
    href: "tel:+919876543210",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="18" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "Book a Call",
    value: "Schedule 30 min free",
    accent: "#007bff", accentRgb: "0,123,255",
    href: "/contact",
  },
];

const LetsTalk: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="lt-section" ref={sectionRef}>
      {/* Backgrounds */}
      <div className="lt-bg-grid" />
      <div className="lt-blob lt-blob-1" />
      <div className="lt-blob lt-blob-2" />
      <div className="lt-scanlines" />
      <div className="lt-noise" />

      {/* Glowing top + bottom edge */}
      <div className="lt-edge lt-edge-top" />
      <div className="lt-edge lt-edge-bottom" />

      <div className="lt-container">
        <div className="lt-inner">

          {/* ── Left copy ── */}
          <div className={`lt-left lt-reveal ${revealed ? "lt-revealed" : ""}`}>

            <div className="lt-eyebrow">
              <span className="lt-eyebrow-dot" />
              Let's Talk
            </div>

            <h2 className="lt-heading">
              Got a Project
              <br />
              <span className="lt-heading-accent">In Mind?</span>
            </h2>

            <p className="lt-sub">
              Whether it's a new product, a broken system that needs fixing,
              or just an idea on a napkin — we'd love to hear it.
              No pitch, no pressure. Just an honest conversation.
            </p>

            <a href="/contact" className="lt-cta-btn">
              <span>Start the Conversation</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Trust badges */}
            <div className="lt-badges">
              {["Free Consultation", "NDA on Request", "Reply in 24h"].map((b, i) => (
                <span key={i} className="lt-badge">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className={`lt-divider lt-reveal ${revealed ? "lt-revealed" : ""}`}
            style={{ transitionDelay: "0.15s" }}>
            <div className="lt-divider-line" />
            <div className="lt-divider-dot" />
            <div className="lt-divider-line" />
          </div>

          {/* ── Right — contact options ── */}
          <div className={`lt-right lt-reveal ${revealed ? "lt-revealed" : ""}`}
            style={{ transitionDelay: "0.22s" }}>
            {contactOptions.map((c, i) => (
              <a
                key={i}
                href={c.href}
                className="lt-contact-card"
                style={{
                  "--accent": c.accent,
                  "--accent-rgb": c.accentRgb,
                  transitionDelay: `${0.22 + i * 0.07}s`,
                } as React.CSSProperties}
              >
                <div className="lt-cc-glow" />
                <div className="lt-cc-topline" />

                <div className="lt-cc-icon">
                  {c.icon}
                </div>
                <div className="lt-cc-body">
                  <span className="lt-cc-label">{c.label}</span>
                  <span className="lt-cc-value">{c.value}</span>
                </div>
                <div className="lt-cc-arrow">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default LetsTalk;
"use client";

import React, { useEffect, useRef, useState } from "react";
import "./IndustriesSection.css";

const industries = [
  {
    name: "Insurance",
    desc: "Smart policy platforms & claims automation",
    accent: "#00f2ff", accentRgb: "0,242,255",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L8 10V24C8 33.6 15.2 42.4 24 44C32.8 42.4 40 33.6 40 24V10L24 4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M17 24L22 29L31 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Social Networking",
    desc: "Scalable community & engagement platforms",
    accent: "#007bff", accentRgb: "0,123,255",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="10" cy="16" r="3.5" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="38" cy="16" r="3.5" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="10" cy="34" r="3.5" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="38" cy="34" r="3.5" stroke="currentColor" strokeWidth="2.2"/>
        <line x1="13.5" y1="17.5" x2="20.5" y2="21.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="34.5" y1="17.5" x2="27.5" y2="21.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="13.5" y1="32.5" x2="20.5" y2="26.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="34.5" y1="32.5" x2="27.5" y2="26.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Privacy & Legal",
    desc: "Compliance tools & secure document systems",
    accent: "#8b5cf6", accentRgb: "139,92,246",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6C24 6 12 10 8 14V26C8 34 15 41 24 44C33 41 40 34 40 26V14C36 10 24 6 24 6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M18 24H30M21 18H27M20 30H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Travel & Hospitality",
    desc: "Booking engines & guest experience solutions",
    accent: "#00f2ff", accentRgb: "0,242,255",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 38L14 20L24 26L34 12L42 38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 38H42" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="34" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 38V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "eCommerce",
    desc: "High-conversion storefronts & payment flows",
    accent: "#f59e0b", accentRgb: "245,158,11",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8H10L14 28H36L40 14H14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="34" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="32" cy="34" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 14V22M20 18H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Media & Entertainment",
    desc: "Streaming platforms & content delivery at scale",
    accent: "#ff5050", accentRgb: "255,80,80",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M20 18L30 22L20 26V18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity=".2"/>
        <path d="M16 38H32M24 34V38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Real Estate",
    desc: "Property portals, CRMs & virtual tours",
    accent: "#00c896", accentRgb: "0,200,150",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 40V20L24 8L40 20V40" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <rect x="18" y="28" width="12" height="12" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 40H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 22H28M24 18V26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Telecom",
    desc: "Network management & customer portals",
    accent: "#8b5cf6", accentRgb: "139,92,246",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8C16.268 8 10 14.268 10 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M24 14C19.582 14 16 17.582 16 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M24 20C22.343 20 21 21.343 21 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <rect x="20" y="28" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="34" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Healthcare",
    desc: "Patient apps, EHR integrations & telemedicine",
    accent: "#00f2ff", accentRgb: "0,242,255",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="30" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M24 18V30M18 24H30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M14 10V8C14 6.895 14.895 6 16 6H32C33.105 6 34 6.895 34 8V10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "FinTech",
    desc: "Digital banking, wallets & trading dashboards",
    accent: "#007bff", accentRgb: "0,123,255",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M6 18H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 26H22M14 30H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="28" y="24" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    name: "Education",
    desc: "LMS platforms & interactive learning tools",
    accent: "#f59e0b", accentRgb: "245,158,11",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 10L44 20L24 30L4 20L24 10Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M12 25V35C12 35 17 40 24 40C31 40 36 35 36 35V25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="44" y1="20" x2="44" y2="32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Logistics",
    desc: "Fleet tracking, route optimization & supply chain",
    accent: "#00c896", accentRgb: "0,200,150",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="16" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M30 22H38L44 30V34H30V22Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <circle cx="12" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
        <line x1="4" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ── Industry Card ──────────────────────────────────────────────
function IndustryCard({ item, index, revealed }: {
  item: typeof industries[0]; index: number; revealed: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`ind-card ind-reveal ${revealed ? "ind-revealed" : ""}`}
      style={{
        "--accent": item.accent,
        "--accent-rgb": item.accentRgb,
        transitionDelay: `${0.06 * index}s`,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Decorative bg number */}
      <div className="ind-num">0{index + 1 < 10 ? index + 1 : index + 1}</div>

      {/* Glow + lines */}
      <div className="ind-glow" />
      <div className="ind-topline" />
      <div className="ind-leftline" />

      {/* Icon */}
      <div className="ind-icon-wrap">
        <div className="ind-icon-ring" />
        {hovered && <div className="ind-icon-pulse" />}
        <div className="ind-icon">{item.icon}</div>
      </div>

      {/* Text */}
      <div className="ind-body">
        <p className="ind-name">{item.name}</p>
        <p className="ind-desc">{item.desc}</p>
      </div>

      {/* Bottom arrow */}
      <div className="ind-arrow">
        <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
const IndustriesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="ind-section" ref={sectionRef}>
      {/* Backgrounds */}
      <div className="ind-bg-grid" />
      <div className="ind-blob ind-blob-1" />
      <div className="ind-blob ind-blob-2" />
      <div className="ind-blob ind-blob-3" />
      <div className="ind-scanlines" />
      <div className="ind-noise" />

      <div className="ind-container">

        {/* ── Header ── */}
        <div className={`ind-header ind-reveal ${revealed ? "ind-revealed" : ""}`}>
          <div className="ind-eyebrow">
            <span className="ind-eyebrow-dot" />
            Industries We Serve
          </div>
          <h2 className="ind-heading">
            Built for Every{" "}
            <span className="ind-heading-accent">Industry</span>
          </h2>
          <p className="ind-subheading">
            From startups to enterprises — we deliver tailored digital solutions
            across every major sector of the global economy.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="ind-grid">
          {industries.map((item, i) => (
            <IndustryCard key={item.name} item={item} index={i} revealed={revealed} />
          ))}
        </div>

        {/* ── Bottom CTA bar ── */}
        <div className={`ind-cta ind-reveal ${revealed ? "ind-revealed" : ""}`}
          style={{ transitionDelay: `${0.06 * industries.length + 0.1}s` }}>
          <div className="ind-cta-l">
            <span className="ind-cta-dot" />
            <span className="ind-cta-txt">Don't see your industry? We adapt to any domain.</span>
          </div>
          <a href="/contact" className="ind-cta-btn">
            <span>Let's Talk</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
"use client";

import React, { useEffect, useRef, useState } from "react";
import "./WhyChooseUs.css";

const reasons = [
  {
    num: "01",
    title: "End-to-End Ownership",
    desc: "From the first wireframe to post-launch support — we own the entire journey. No handoffs, no gaps, no blame game.",
    accent: "#00f2ff", accentRgb: "0,242,255",
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M8 20h24M20 8v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="20" cy="20" r="4" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Agile & Transparent",
    desc: "Weekly sprints, real-time dashboards, and plain-English updates. You always know what's happening and why.",
    accent: "#007bff", accentRgb: "0,123,255",
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="22" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="6" y="22" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="22" y="22" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Battle-Tested Tech",
    desc: "We choose technology based on your problem, not trends. Every stack decision is backed by performance data.",
    accent: "#8b5cf6", accentRgb: "139,92,246",
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "On Time, On Budget",
    desc: "We've delivered 95% of our projects on or before deadline. Fixed-price quotes, no surprise invoices.",
    accent: "#00c896", accentRgb: "0,200,150",
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 12v8l6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Security by Design",
    desc: "GDPR compliant, OWASP best practices, penetration tested. Security isn't a feature — it's the foundation.",
    accent: "#ff5050", accentRgb: "255,80,80",
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 4L8 9v11c0 9 6 16 12 17 6-1 12-8 12-17V9L20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "Post-Launch Support",
    desc: "We don't disappear after go-live. Every client gets 3 months of free support, then flexible retainers.",
    accent: "#f59e0b", accentRgb: "245,158,11",
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M34 24c0 5.523-6.268 10-14 10S6 29.523 6 24c0-5.52 6.268-10 14-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M26 6l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const bigStats = [
  { val: "95%",   label: "On-Time Delivery",      color: "cyan"   },
  { val: "98%",   label: "Client Satisfaction",    color: "blue"   },
  { val: "50+",   label: "Projects Shipped",       color: "purple" },
  { val: "3mo",   label: "Free Post-Launch Care",  color: "gold"   },
];

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="wcu-section" ref={sectionRef}>
      <div className="wcu-bg-grid" />
      <div className="wcu-blob wcu-blob-1" />
      <div className="wcu-blob wcu-blob-2" />
      <div className="wcu-blob wcu-blob-3" />
      <div className="wcu-scanlines" />
      <div className="wcu-noise" />

      <div className="wcu-container">

        {/* ── Header ── */}
        <div className={`wcu-header wcu-reveal ${revealed ? "wcu-revealed" : ""}`}>
          <div className="wcu-eyebrow"><span className="wcu-eyebrow-dot" />Why Choose Us</div>
          <h2 className="wcu-heading">
            The Difference Is In <span className="wcu-heading-accent">The Details</span>
          </h2>
          <p className="wcu-subheading">
            Hundreds of agencies will promise you the world. Here's what actually sets us apart —
            proven, measurable, and backed by 8 years of doing this.
          </p>
        </div>

        {/* ── Big stats ── */}
        <div className={`wcu-big-stats wcu-reveal ${revealed ? "wcu-revealed" : ""}`}
          style={{ transitionDelay: "0.12s" }}>
          {bigStats.map((s, i) => (
            <div key={i} className={`wcu-bs wcu-bs-${s.color}`}>
              <div className="wcu-bs-glow" />
              <span className="wcu-bs-val">{s.val}</span>
              <span className="wcu-bs-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Reasons grid ── */}
        <div className="wcu-grid">
          {reasons.map((r, i) => (
            <div
              key={r.num}
              className={`wcu-card wcu-reveal ${revealed ? "wcu-revealed" : ""}`}
              style={{
                "--accent": r.accent,
                "--accent-rgb": r.accentRgb,
                transitionDelay: `${0.18 + i * 0.07}s`,
              } as React.CSSProperties}
            >
              <div className="wcu-card-glow" />
              <div className="wcu-card-topline" />
              <div className="wcu-card-leftline" />
              <div className="wcu-card-num">{r.num}</div>

              <div className="wcu-card-head">
                <div className="wcu-icon-wrap">
                  <div className="wcu-icon">{r.icon}</div>
                </div>
                <h3 className="wcu-card-title">{r.title}</h3>
              </div>
              <p className="wcu-card-desc">{r.desc}</p>

              {/* Bottom accent line */}
              <div className="wcu-card-bottom" />
            </div>
          ))}
        </div>

        {/* ── Bottom comparison strip ── */}
        <div className={`wcu-compare wcu-reveal ${revealed ? "wcu-revealed" : ""}`}
          style={{ transitionDelay: "0.65s" }}>
          <div className="wcu-compare-inner">
            <div className="wcu-compare-col wcu-compare-us">
              <p className="wcu-compare-label wcu-label-us">✦ With Acute Infosoft</p>
              {["Fixed-price transparency", "Dedicated project manager", "Source code ownership", "3-month free support", "Weekly demos"].map(t => (
                <div key={t} className="wcu-compare-row">
                  <div className="wcu-check wcu-check-yes">
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="wcu-compare-divider" />
            <div className="wcu-compare-col wcu-compare-them">
              <p className="wcu-compare-label wcu-label-them">✗ Typical Agency</p>
              {["Hourly billing surprises", "Multiple account owners", "IP lock-in clauses", "Expensive retainers only", "Monthly check-ins"].map(t => (
                <div key={t} className="wcu-compare-row">
                  <div className="wcu-check wcu-check-no">
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 3L7 7M7 3L3 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </div>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
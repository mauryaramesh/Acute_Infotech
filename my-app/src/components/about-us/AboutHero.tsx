"use client";

import React, { useEffect, useRef, useState } from "react";
import "./AboutHero.css";

const stats = [
  { val: "8+",   label: "Years of Experience" },
  { val: "50+",  label: "Projects Delivered" },
  { val: "30+",  label: "Expert Team Members" },
  { val: "15+",  label: "Countries Served" },
];

const breadcrumb = ["Home", "About Us"];

// ── Animated counter ──────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(target / 55);
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(t); }
        else setCount(start);
      }, 28);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const AboutHero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Slight delay so it triggers on load
    const t = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="abh-section" ref={sectionRef}>
      {/* Backgrounds */}
      <div className="abh-bg-grid" />
      <div className="abh-blob abh-blob-1" />
      <div className="abh-blob abh-blob-2" />
      <div className="abh-blob abh-blob-3" />
      <div className="abh-scanlines" />
      <div className="abh-noise" />

      {/* Horizontal scroll line */}
      <div className="abh-hline abh-hline-1" />
      <div className="abh-hline abh-hline-2" />

      <div className="abh-container">

        {/* Breadcrumb */}
        <div className={`abh-breadcrumb abh-reveal ${revealed ? "abh-revealed" : ""}`}>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={b}>
              <span className={i === breadcrumb.length - 1 ? "abh-bc-active" : "abh-bc-link"}>{b}</span>
              {i < breadcrumb.length - 1 && <span className="abh-bc-sep">/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Main content */}
        <div className="abh-content">

          {/* Left */}
          <div className={`abh-left abh-reveal ${revealed ? "abh-revealed" : ""}`}
            style={{ transitionDelay: "0.1s" }}>

            <div className="abh-eyebrow">
              <span className="abh-eyebrow-dot" />
              Who We Are
            </div>

            <h1 className="abh-heading">
              We Are <br />
              <span className="abh-heading-accent">Acute Infosoft</span>
            </h1>

            <p className="abh-sub">
              A passionate team of developers, designers and strategists building
              digital products that actually move the needle. We don't just write code —
              we craft experiences that drive real business growth.
            </p>

            <div className="abh-cta-row">
              <a href="/contact" className="abh-btn-primary">
                <span>Start a Project</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/work" className="abh-btn-ghost">
                See Our Work
                <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right — visual panel */}
          <div className={`abh-right abh-reveal ${revealed ? "abh-revealed" : ""}`}
            style={{ transitionDelay: "0.25s" }}>
            <div className="abh-visual">
              {/* Corner brackets */}
              <div className="abh-vc abh-vc-tl" /><div className="abh-vc abh-vc-tr" />
              <div className="abh-vc abh-vc-bl" /><div className="abh-vc abh-vc-br" />
              <div className="abh-visual-glow" />
              <div className="abh-visual-topline" />

              {/* Center logo / emblem */}
              <div className="abh-emblem">
                <div className="abh-emblem-ring abh-ring-1" />
                <div className="abh-emblem-ring abh-ring-2" />
                <div className="abh-emblem-ring abh-ring-3" />
                <div className="abh-emblem-core">
                  <svg width="52" height="52" fill="none" viewBox="0 0 52 52">
                    <path d="M26 6L46 18V34L26 46L6 34V18L26 6Z" stroke="rgba(0,242,255,0.8)" strokeWidth="1.5"/>
                    <path d="M26 14L38 21V35L26 42L14 35V21L26 14Z" fill="rgba(0,242,255,0.08)" stroke="rgba(0,242,255,0.4)" strokeWidth="1.2"/>
                    <path d="M18 26L24 32L34 20" stroke="rgba(0,242,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Floating tags */}
              <div className="abh-tag abh-tag-1">
                <span className="abh-tag-dot" />
                Since 2016
              </div>
              <div className="abh-tag abh-tag-2">
                <span className="abh-tag-dot abh-dot-blue" />
                100% Remote-Ready
              </div>
              <div className="abh-tag abh-tag-3">
                <span className="abh-tag-dot abh-dot-purple" />
                Agile Team
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className={`abh-stats abh-reveal ${revealed ? "abh-revealed" : ""}`}
          style={{ transitionDelay: "0.4s" }}>
          {stats.map((s, i) => (
            <div key={i} className="abh-stat">
              <span className="abh-stat-val">
                <Counter target={parseInt(s.val)} suffix={s.val.replace(/[0-9]/g, "")} />
              </span>
              <span className="abh-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutHero;
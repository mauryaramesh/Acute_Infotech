"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Buildproduct .css";
// ── Animated Counter ──────────────────────────────────────────
function CountUp({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const duration = 1800;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(step);
        else setCount(end);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    text: "From early-stage idea to proven product",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "You practically join our team",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    text: "Research → Concept → Design → Dev",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: "AI-enhanced engineering at every step",
  },
];

const BuildProduct: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bp-section" ref={sectionRef}>
      {/* Background layers */}
      <div className="bp-bg-grid" />
      <div className="bp-blob bp-blob-1" />
      <div className="bp-blob bp-blob-2" />
      <div className="bp-blob bp-blob-3" />
      <div className="bp-scanlines" />
      <div className="bp-noise" />
      <div className="bp-diagonal-top" />

      <div className="bp-container">
        <div className="bp-layout">

          {/* ── LEFT COLUMN ── */}
          <div className={`bp-left bp-reveal ${revealed ? "bp-revealed" : ""}`}>

            <div className="bp-eyebrow">
              <span className="bp-eyebrow-dot" />
              AI-Enhanced Engineering
            </div>

            <h2 className="bp-heading">
              Build your next
              <span className="bp-heading-accent"> product</span>
              <br />
              <span className="bp-heading-sub">with us</span>
            </h2>

            <p className="bp-body">
              Whether your idea is still in the very early stage or has already proven its worth
              to hundreds of users — we've got you covered. We think about your business goals,
              surface user needs, and help express your brand.
            </p>

            <div className="bp-quote">
              <div className="bp-quote-bar" />
              <p className="bp-quote-text">
                "You're practically joining our team when you decide to work with us."
              </p>
            </div>

            <ul className="bp-features">
              {features.map((f, i) => (
                <li
                  key={i}
                  className={`bp-feature bp-reveal ${revealed ? "bp-revealed" : ""}`}
                  style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
                >
                  <span className="bp-feature-icon">{f.icon}</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            <div
              className={`bp-cta-wrap bp-reveal ${revealed ? "bp-revealed" : ""}`}
              style={{ transitionDelay: "0.7s" }}
            >
              <a href="/about-us" className="bp-btn-primary">
                <span>More About Us</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/contact" className="bp-btn-ghost">
                Start a Project
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div
            className={`bp-right bp-reveal ${revealed ? "bp-revealed" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            {/* Orbit ring behind images */}
            <div className="bp-orbit bp-orbit-1" />
            <div className="bp-orbit bp-orbit-2" />

            <div className="bp-images">

              {/* Main image */}
              <div className="bp-img-wrap bp-img-main">
                <div className="bp-corner bp-corner-tl" />
                <div className="bp-corner bp-corner-tr" />
                <div className="bp-corner bp-corner-bl" />
                <div className="bp-corner bp-corner-br" />
                <div className="bp-img-overlay" />
                <img
                  src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-1.png"
                  alt="Team collaboration"
                  className="bp-img"
                />
                {/* Scan line sweep on hover */}
                <div className="bp-img-scan" />
                <div className="bp-img-tag">
                  <span className="bp-img-tag-dot" />
                  Team Collaboration
                </div>
                {/* Inline mini-stat floating card */}
                <div className={`bp-inline-stat ${revealed ? "bp-inline-stat-show" : ""}`}>
                  <div className="bp-inline-stat-value">
                    <CountUp end={50} suffix="+" />
                  </div>
                  <div className="bp-inline-stat-label">Projects Done</div>
                </div>
              </div>

              {/* Two small images */}
              <div className="bp-img-row">
                <div className="bp-img-wrap bp-img-sm">
                  <div className="bp-img-overlay" />
                  <img
                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-2.png"
                    alt="Development process"
                    className="bp-img"
                  />
                  {/* Rating card on image 2 */}
                  <div className={`bp-rating-card ${revealed ? "bp-rating-show" : ""}`}>
                    <span className="bp-rating-stars">★★★★★</span>
                    <span className="bp-rating-text">5.0 Rated</span>
                  </div>
                </div>

                <div className="bp-img-wrap bp-img-sm">
                  <div className="bp-img-overlay" />
                  <img
                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-3.png"
                    alt="Product launch"
                    className="bp-img"
                  />
                  <div className="bp-float-badge">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                    </svg>
                    Launch Ready
                  </div>
                </div>
              </div>

              {/* Progress bar strip under images */}
              <div className="bp-img-progress">
                <div className="bp-img-progress-label">Client Satisfaction</div>
                <div className="bp-img-progress-track">
                  <div className={`bp-img-progress-fill ${revealed ? "bp-img-progress-animate" : ""}`} />
                  <div className={`bp-img-progress-glow ${revealed ? "bp-img-progress-animate" : ""}`} />
                </div>
                <div className="bp-img-progress-pct">
                  <CountUp end={98} suffix="%" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="bp-diagonal-bottom" />
    </section>
  );
};

export default BuildProduct;
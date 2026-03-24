"use client";
import React, { useEffect, useRef, useState } from "react";
import "./WorkingProcess.css";

const STEPS = [
  {
    id: 1,
    num: "01",
    title: "Requirement Gathering",
    short: "Strategic insights shaping clear project direction.",
    detail: "Deep-dive discovery sessions, stakeholder interviews, and competitive analysis to define the project scope, goals, and KPIs.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    num: "02",
    title: "Analysis & Planning",
    short: "Structured planning for efficient, scalable outcomes.",
    detail: "Architecture decisions, tech stack selection, sprint planning, and risk assessment to set a clear, measurable roadmap.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 3,
    num: "03",
    title: "UI/UX Design",
    short: "User-centric designs crafted for lasting impact.",
    detail: "Wireframes, high-fidelity UI mockups, design systems, and interactive prototypes reviewed and approved with stakeholders.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 4,
    num: "04",
    title: "Development",
    short: "Robust engineering powering reliable digital solutions.",
    detail: "Agile 2-week sprints, clean code practices, CI/CD pipelines, and live staging demos keeping you in the loop every step.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 5,
    num: "05",
    title: "Testing & QA",
    short: "Precision testing ensuring uncompromised performance.",
    detail: "Automated test suites, manual QA, load benchmarking, and security audits — nothing ships without full sign-off.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 6,
    num: "06",
    title: "Deployment",
    short: "Seamless deployment enabling smooth go-live operations.",
    detail: "Zero-downtime releases, cloud infrastructure setup, live monitoring dashboards, and instant rollback strategies.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    id: 7,
    num: "07",
    title: "Maintenance & Support",
    short: "Proactive support sustaining long-term product excellence.",
    detail: "24/7 monitoring, rapid bug fixes, performance optimizations, and feature iterations based on real user feedback.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 8,
    num: "08",
    title: "Growth & Success",
    short: "Celebrating shared victory and continuous growth.",
    detail: "Analytics reviews, A/B testing, growth roadmapping, and ongoing partnership — your long-term success is our mission.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

// ─── animated canvas background ─────────────────────────────────
function WpCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - .5) * .00015,
      vy: (Math.random() - .5) * .00015,
      r: Math.random() * 1.2 + .4,
    }));
    const tick = () => {
      const { width: w, height: h } = c;
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = (pts[i].x - pts[j].x) * w, dy = (pts[i].y - pts[j].y) * h;
        const d = Math.hypot(dx, dy);
        if (d < 160) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x * w, pts[i].y * h);
          ctx.lineTo(pts[j].x * w, pts[j].y * h);
          ctx.strokeStyle = `rgba(0,102,255,${.09 * (1 - d / 160)})`;
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(80,140,255,.18)"; ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="wp-canvas" />;
}

export default function WorkingProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed || isPaused) return;
    const timer = setInterval(() => {
      setActiveStep(prev => (prev === 8 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [revealed, isPaused]);

  const actStep = STEPS.find(s => s.id === activeStep) || STEPS[0];

  return (
    <section className="wp-section" ref={sectionRef}>

      {/* Canvas animation */}
      <WpCanvas />

      {/* Background mesh */}
      <div className="wp-mesh" />
      <div className="wp-blob wp-blob-a" />
      <div className="wp-blob wp-blob-b" />
      <div className="wp-noise" />

      <div className="wp-container">

        {/* ── HEADER ── */}
        <div className={`wp-header wp-fade ${revealed ? "wp-in" : ""}`}>
          <div className="wp-eyebrow">
            <span className="wp-eyebrow-dot" />
            <span>Our Workflow</span>
          </div>
          <h2 className="wp-h2">
            Our Approach to{" "}
            <span className="wp-h2-accent">Success</span>
          </h2>
          <p className="wp-lead">
            A structured development lifecycle designed to turn complex visions
            into seamless, high-performing digital realities — every time.
          </p>
        </div>

        {/* ── SPLIT TAB LAYOUT (SHORT & UNIQUE) ── */}
        <div 
          className={`wp-split-view wp-fade ${revealed ? "wp-in" : ""}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* LEFT: Tabs */}
          <div className="wp-tabs">
            {STEPS.map((step) => {
              const active = step.id === activeStep;
              return (
                <div 
                  key={step.id} 
                  onClick={() => setActiveStep(step.id)}
                  className={`wp-tab ${active ? "active" : ""}`}
                >
                  <div className="wp-tab-line">
                    <div className="wp-tab-line-fill" />
                  </div>
                  <div className="wp-tab-num">{step.num}</div>
                  <div className="wp-tab-title">{step.title}</div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Active Detail Panel */}
          <div className="wp-display">
            <div key={actStep.id} className="wp-display-card">
              <div className="wp-display-watermark">{actStep.num}</div>
              
              <div className="wp-display-icon">
                <div className="wp-icon-glow" />
                {actStep.icon}
              </div>
              
              <h3 className="wp-display-title">{actStep.title}</h3>
              <p className="wp-display-short">{actStep.short}</p>
              
              <div className="wp-display-divider" />
              
              <p className="wp-display-long">{actStep.detail}</p>
            </div>
          </div>

        </div>

        {/* ── CTA ── */}
        <div className={`wp-cta wp-fade ${revealed ? "wp-in" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <p>Ready to start your project?</p>
          <a href="/contact" className="wp-cta-btn">
            Start Discovery Call
            <svg width="16" height="16" fill="none" viewBox="0 0 18 18">
              <path d="M3.5 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
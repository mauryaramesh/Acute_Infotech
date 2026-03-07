"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Howwework.css";

const phases = [
  {
    id: "discover",
    num: "01",
    label: "Discovery",
    title: "We Decode Your Vision",
    accent: "#00f2ff",
    accentRgb: "0,242,255",
    duration: "Week 1–2",
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M28 28L36 36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M16 20h8M20 16v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    bullets: [
      "Deep-dive stakeholder workshops",
      "Competitor & market analysis",
      "Technical feasibility audit",
      "Defined success metrics (KPIs)",
    ],
    deliverable: "Project Blueprint PDF",
    terminal: [
      "$ initializing discovery protocol...",
      "✓ loading stakeholder profiles",
      "✓ mapping user journeys",
      "✓ analysing competitor matrix",
      "▶ generating project blueprint...",
      "✓ blueprint ready → client review",
    ],
    visual: "blueprint",
  },
  {
    id: "design",
    num: "02",
    label: "Design",
    title: "We Shape the Experience",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
    duration: "Week 2–4",
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <rect x="8" y="8" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 16h28M16 8v28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="26" cy="26" r="5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    bullets: [
      "Information architecture & wireframes",
      "High-fidelity Figma prototypes",
      "Design system & component library",
      "Client approval before one line of code",
    ],
    deliverable: "Figma Design System",
    terminal: [
      "$ launching design environment...",
      "✓ wireframes approved",
      "✓ colour system defined",
      "✓ component library: 48 atoms built",
      "▶ exporting design tokens...",
      "✓ handoff ready → dev team",
    ],
    visual: "wireframe",
  },
  {
    id: "build",
    num: "03",
    label: "Development",
    title: "We Engineer It Right",
    accent: "#007bff",
    accentRgb: "0,123,255",
    duration: "Week 4–10",
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <path d="M14 16L8 22L14 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 16L36 22L30 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 12L20 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    bullets: [
      "Agile 2-week sprints with demos",
      "Test-driven development (TDD)",
      "CI/CD pipeline from day one",
      "Real-time progress dashboard access",
    ],
    deliverable: "Staging Environment",
    terminal: [
      "$ git checkout -b feature/sprint-1",
      "✓ components: 24/24 built",
      "✓ unit tests: 142 passed",
      "✓ CI pipeline: green",
      "▶ deploying to staging...",
      "✓ build #47 live → client review",
    ],
    visual: "code",
  },
  {
    id: "qa",
    num: "04",
    label: "QA & Testing",
    title: "We Break It Before You Do",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    duration: "Week 9–11",
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <path d="M22 8L36 16V28L22 36L8 28V16L22 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 22L20 26L28 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bullets: [
      "Cross-browser & device testing",
      "Automated + manual regression suite",
      "Load testing (10k+ concurrent users)",
      "Security penetration testing",
    ],
    deliverable: "QA Sign-Off Report",
    terminal: [
      "$ running test suite v4.2...",
      "✓ unit tests: 318 / 318 passed",
      "✓ e2e tests: 64 / 64 passed",
      "✓ load test: 12k req/s ✓ stable",
      "▶ pen test: scanning for CVEs...",
      "✓ zero critical vulnerabilities",
    ],
    visual: "test",
  },
  {
    id: "launch",
    num: "05",
    label: "Launch",
    title: "We Ship With Confidence",
    accent: "#00c896",
    accentRgb: "0,200,150",
    duration: "Week 11–12",
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <path d="M22 36V22M22 22L14 30M22 22L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 14C10 14 14 8 22 8C30 8 34 14 34 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="22" cy="8" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    bullets: [
      "Zero-downtime blue/green deployment",
      "DNS, CDN & SSL configured",
      "Monitoring & alerting enabled",
      "Live handover training session",
    ],
    deliverable: "Live Production URL",
    terminal: [
      "$ deploying to production...",
      "✓ docker build: 2m 14s",
      "✓ health checks: passing",
      "✓ CDN cache: warmed",
      "▶ switching traffic: blue → green",
      "✓ 🚀 LIVE at your-domain.com",
    ],
    visual: "launch",
  },
  {
    id: "grow",
    num: "06",
    label: "Growth & Support",
    title: "We Stay With You",
    accent: "#ff5050",
    accentRgb: "255,80,80",
    duration: "Month 4+",
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <path d="M8 32L16 22L22 28L30 16L36 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 20h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 38h28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    bullets: [
      "3 months free post-launch support",
      "Monthly performance reports",
      "A/B testing & conversion optimisation",
      "Feature iterations on retainer",
    ],
    deliverable: "Growth Roadmap",
    terminal: [
      "$ monitoring dashboard active...",
      "✓ uptime: 99.97% (last 90 days)",
      "✓ page speed: 96/100",
      "✓ conv. rate: +34% vs baseline",
      "▶ generating growth report...",
      "✓ roadmap v2 → client delivered",
    ],
    visual: "growth",
  },
];

// ── Terminal lines animator ────────────────────────────────────
function TerminalPanel({ lines, accent, accentRgb, active }: {
  lines: string[]; accent: string; accentRgb: string; active: boolean;
}) {
  const [shown, setShown] = useState<number>(0);
  const [charIdx, setCharIdx] = useState(0);
  const lineRef = useRef(0);
  const charRef = useRef(0);

  useEffect(() => {
    if (!active) { setShown(0); setCharIdx(0); lineRef.current = 0; charRef.current = 0; return; }
    setShown(0); setCharIdx(0); lineRef.current = 0; charRef.current = 0;
    const t = setInterval(() => {
      const ln = lineRef.current;
      if (ln >= lines.length) { clearInterval(t); return; }
      const target = lines[ln].length;
      charRef.current += 3;
      setCharIdx(charRef.current);
      if (charRef.current >= target) {
        lineRef.current += 1;
        charRef.current = 0;
        setShown(lineRef.current);
        setCharIdx(0);
      }
    }, 18);
    return () => clearInterval(t);
  }, [active, lines]);

  return (
    <div className="hww-terminal" style={{ "--accent": accent, "--accent-rgb": accentRgb } as React.CSSProperties}>
      <div className="hww-term-bar">
        <span className="hww-term-dot hww-td-red" />
        <span className="hww-term-dot hww-td-yellow" />
        <span className="hww-term-dot hww-td-green" />
        <span className="hww-term-title">process.terminal</span>
      </div>
      <div className="hww-term-body">
        {lines.map((line, i) => {
          const isCurrentLine = i === shown && active;
          const isDone = i < shown;
          const isVisible = i <= shown;
          if (!isVisible) return null;
          const displayText = isDone
            ? line
            : isCurrentLine ? line.slice(0, charIdx) : "";
          const isSuccess = line.startsWith("✓");
          const isCmd = line.startsWith("$");
          const isArrow = line.startsWith("▶");
          return (
            <div key={i} className={`hww-term-line ${isSuccess ? "hww-tl-ok" : ""} ${isCmd ? "hww-tl-cmd" : ""} ${isArrow ? "hww-tl-run" : ""}`}>
              <span className="hww-term-text">{displayText}</span>
              {isCurrentLine && <span className="hww-term-cursor" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Phase nav pill ────────────────────────────────────────────
function PhasePill({ phase, active, onClick }: { phase: typeof phases[0]; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`hww-pill ${active ? "hww-pill-active" : ""}`}
      style={{ "--accent": phase.accent, "--accent-rgb": phase.accentRgb } as React.CSSProperties}
      onClick={onClick}
    >
      <span className="hww-pill-num">{phase.num}</span>
      <span className="hww-pill-label">{phase.label}</span>
      {active && <div className="hww-pill-underline" />}
    </button>
  );
}

// ── Main ───────────────────────────────────────────────────────
const HowWeWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-advance every 6s when autoPlay on
  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(() => {
      setActive(a => (a + 1) % phases.length);
    }, 5800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay]);

  const handlePick = useCallback((i: number) => {
    setActive(i);
    setAutoPlay(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const current = phases[active];

  return (
    <section className="hww-section" ref={sectionRef}>
      <div className="hww-bg-grid" />
      <div className="hww-blob hww-blob-1" />
      <div className="hww-blob hww-blob-2" />
      <div className="hww-blob hww-blob-3" />
      <div className="hww-scanlines" />
      <div className="hww-noise" />

      <div className="hww-container">

        {/* ── Header ── */}
        <div className={`hww-header hww-reveal ${revealed ? "hww-revealed" : ""}`}>
          <div className="hww-eyebrow">
            <span className="hww-eyebrow-dot" />
            Our Process
          </div>
          <h2 className="hww-heading">
            How We Turn Ideas Into <span className="hww-heading-accent">Reality</span>
          </h2>
          <p className="hww-subheading">
            Six battle-tested phases. Zero guesswork. Every project runs through the
            same rigorous process — so you always know what's happening and why.
          </p>
        </div>

        {/* ── Phase pills nav ── */}
        <div className={`hww-pills hww-reveal ${revealed ? "hww-revealed" : ""}`}
          style={{ transitionDelay: "0.15s" }}>
          {phases.map((p, i) => (
            <PhasePill key={p.id} phase={p} active={i === active} onClick={() => handlePick(i)} />
          ))}
          {autoPlay && (
            <div className="hww-autoplay-badge">
              <span className="hww-ap-dot" />
              Auto
            </div>
          )}
        </div>

        {/* ── Main split panel ── */}
        <div className={`hww-split hww-reveal ${revealed ? "hww-revealed" : ""}`}
          style={{ transitionDelay: "0.25s" }}>

          {/* Progress bar across top */}
          <div className="hww-progress-bar">
            <div
              className="hww-progress-fill"
              style={{
                width: `${((active + 1) / phases.length) * 100}%`,
                background: `linear-gradient(90deg, #007bff, ${current.accent})`,
              }}
            />
            <div className="hww-progress-glow" style={{ left: `${((active + 1) / phases.length) * 100}%`, background: current.accent }} />
          </div>

          {/* Left — phase detail */}
          <div className="hww-detail" key={active}
            style={{ "--accent": current.accent, "--accent-rgb": current.accentRgb } as React.CSSProperties}>

            <div className="hww-detail-glow" />

            {/* Phase badge + duration */}
            <div className="hww-detail-meta">
              <span className="hww-phase-badge">Phase {current.num}</span>
              <span className="hww-duration">⏱ {current.duration}</span>
            </div>

            {/* Icon + title */}
            <div className="hww-detail-head">
              <div className="hww-phase-icon">
                {current.icon}
                <div className="hww-phase-icon-ring" />
              </div>
              <div>
                <p className="hww-phase-label">{current.label}</p>
                <h3 className="hww-phase-title">{current.title}</h3>
              </div>
            </div>

            {/* Bullets */}
            <div className="hww-bullets">
              {current.bullets.map((b, i) => (
                <div key={i} className="hww-bullet" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="hww-bullet-dot" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Deliverable */}
            <div className="hww-deliverable">
              <span className="hww-del-label">📦 Deliverable</span>
              <span className="hww-del-val">{current.deliverable}</span>
            </div>

            {/* Phase navigation arrows */}
            <div className="hww-phase-nav">
              <button
                className="hww-nav-btn"
                onClick={() => handlePick((active - 1 + phases.length) % phases.length)}
                disabled={active === 0}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                  <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Prev
              </button>
              <div className="hww-nav-dots">
                {phases.map((_, i) => (
                  <button
                    key={i}
                    className={`hww-nav-dot ${i === active ? "hww-nd-active" : ""}`}
                    onClick={() => handlePick(i)}
                    style={{ "--dot-accent": phases[i].accent } as React.CSSProperties}
                  />
                ))}
              </div>
              <button
                className="hww-nav-btn"
                onClick={() => handlePick((active + 1) % phases.length)}
                disabled={active === phases.length - 1}
              >
                Next
                <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right — terminal */}
          <div className="hww-terminal-wrap">
            <TerminalPanel
              lines={current.terminal}
              accent={current.accent}
              accentRgb={current.accentRgb}
              active={revealed}
            />

            {/* Phase counter badges */}
            <div className="hww-phase-strip">
              {phases.map((p, i) => (
                <div
                  key={p.id}
                  className={`hww-ps-item ${i === active ? "hww-ps-active" : ""} ${i < active ? "hww-ps-done" : ""}`}
                  style={{ "--accent": p.accent, "--accent-rgb": p.accentRgb } as React.CSSProperties}
                  onClick={() => handlePick(i)}
                >
                  <div className="hww-ps-icon">{i < active ? "✓" : p.num}</div>
                  <span className="hww-ps-label">{p.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom CTA ── */}
        <div className={`hww-cta hww-reveal ${revealed ? "hww-revealed" : ""}`}
          style={{ transitionDelay: "0.4s" }}>
          <div className="hww-cta-l">
            <span className="hww-cta-dot" />
            <span className="hww-cta-txt">Ready to start your own journey through this process?</span>
          </div>
          <a href="/contact" className="hww-cta-btn">
            <span>Begin Discovery</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;
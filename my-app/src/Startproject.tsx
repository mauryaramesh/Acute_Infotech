"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Startproject.css";

const projectTypes = [
  { id: "web",     label: "Web App",         icon: "🌐", desc: "SaaS, dashboards, portals" },
  { id: "mobile",  label: "Mobile App",       icon: "📱", desc: "iOS, Android, React Native" },
  { id: "ecom",    label: "eCommerce",         icon: "🛒", desc: "Shopify, Magento, custom" },
  { id: "design",  label: "UI/UX Design",      icon: "🎨", desc: "Figma, prototypes, systems" },
  { id: "ai",      label: "AI Integration",    icon: "🤖", desc: "LLMs, automation, ML APIs" },
  { id: "devops",  label: "DevOps / Cloud",    icon: "☁️", desc: "AWS, Azure, CI/CD pipelines" },
];

const budgets = ["< $5K", "$5K–$15K", "$15K–$50K", "$50K+", "Let's Discuss"];
const timelines = ["ASAP", "1–3 Months", "3–6 Months", "6+ Months", "Flexible"];

const floatingWords = [
  "Design", "Develop", "Deploy", "Scale", "Innovate",
  "Build", "Launch", "Grow", "Transform", "Automate",
];

// ── Particle canvas ────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 55;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .4,
      alpha: Math.random() * .5 + .15,
      color: Math.random() > .5 ? "0,242,255" : Math.random() > .5 ? "0,123,255" : "139,92,246",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }
      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,242,255,${.07 * (1 - dist/110)})`;
            ctx.lineWidth = .6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="sp-canvas" />;
}

// ── Typewriter heading ─────────────────────────────────────────
function TypewriterText({ phrases }: { phrases: string[] }) {
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState("");
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const current = phrases[idx];
    const speed = del ? 40 : 90;
    const timer = setTimeout(() => {
      if (!del) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1));
        else setTimeout(() => setDel(true), 1600);
      } else {
        if (text.length > 0) setText(text.slice(0, -1));
        else { setDel(false); setIdx(i => (i + 1) % phrases.length); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, idx, phrases]);
  return (
    <span className="sp-typewriter">
      {text}
    </span>
  );
}

// ── Step indicator ─────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="sp-steps">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`sp-step-dot ${i < current ? "sp-step-done" : ""} ${i === current - 1 ? "sp-step-active" : ""}`}>
          {i < current - 1 ? (
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : <span>{i + 1}</span>}
        </div>
      ))}
      <div className="sp-step-line">
        <div className="sp-step-fill" style={{ width: `${((current - 1) / (total - 1)) * 100}%` }} />
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────
const StartProject: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed,  setRevealed]  = useState(false);
  const [step,      setStep]      = useState(1);   // 1 = type, 2 = budget, 3 = timeline, 4 = details
  const [projType,  setProjType]  = useState<string[]>([]);
  const [budget,    setBudget]    = useState("");
  const [timeline,  setTimeline]  = useState("");
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [message,   setMessage]   = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const toggleType = (id: string) =>
    setProjType(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const canNext = () => {
    if (step === 1) return projType.length > 0;
    if (step === 2) return !!budget;
    if (step === 3) return !!timeline;
    return name.trim() && email.trim() && message.trim();
  };

  const handleSubmit = () => {
    if (!canNext()) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1800);
  };

  // Summary tags
  const chosenTypes = projectTypes.filter(p => projType.includes(p.id));

  return (
    <section className="sp-section" ref={sectionRef}>
      {/* Backgrounds */}
      <ParticleCanvas />
      <div className="sp-bg-grid" />
      <div className="sp-blob sp-blob-1" />
      <div className="sp-blob sp-blob-2" />
      <div className="sp-blob sp-blob-3" />
      <div className="sp-scanlines" />
      <div className="sp-noise" />

      {/* Floating words */}
      <div className="sp-float-words" aria-hidden>
        {floatingWords.map((w, i) => (
          <span key={i} className="sp-float-word" style={{ animationDelay: `${i * 1.4}s`, "--wi": i } as React.CSSProperties}>{w}</span>
        ))}
      </div>

      <div className="sp-container">

        {/* ── Left column — Hero copy ── */}
        <div className={`sp-left sp-reveal ${revealed ? "sp-revealed" : ""}`}>
          <div className="sp-eyebrow">
            <span className="sp-eyebrow-dot" />
            Start Your Project
          </div>

          <h2 className="sp-heading">
            Let's Build
            <br />
            <TypewriterText phrases={["Something Epic.", "Your Vision.", "The Future.", "Together."]} />
          </h2>

          <p className="sp-sub">
            Tell us about your idea and we'll turn it into a world-class digital product.
            No fluff — just results.
          </p>

          {/* Quick stats */}
          <div className="sp-stats">
            {[
              { val: "48h",   label: "Response Time" },
              { val: "50+",   label: "Projects Done" },
              { val: "98%",   label: "Client Satisfaction" },
            ].map((s, i) => (
              <div key={i} className="sp-stat">
                <span className="sp-stat-val">{s.val}</span>
                <span className="sp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="sp-badges">
            {["NDA Protected", "Free Consultation", "Fixed-Price Quotes"].map((b, i) => (
              <div key={i} className="sp-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {b}
              </div>
            ))}
          </div>

          {/* Decorative orbit rings */}
          <div className="sp-orbit sp-orbit-1" />
          <div className="sp-orbit sp-orbit-2" />
        </div>

        {/* ── Right column — Multi-step form ── */}
        <div className={`sp-right sp-reveal ${revealed ? "sp-revealed" : ""}`}
          style={{ transitionDelay: "0.2s" }}>

          <div className="sp-form-card">
            {/* Corner brackets */}
            <div className="sp-fc sp-fc-tl" /><div className="sp-fc sp-fc-tr" />
            <div className="sp-fc sp-fc-bl" /><div className="sp-fc sp-fc-br" />
            <div className="sp-form-topline" />
            <div className="sp-form-glow" />

            {!submitted ? (
              <>
                {/* Step dots */}
                <StepDots current={step} total={4} />

                {/* ── Step 1 — Project Type ── */}
                {step === 1 && (
                  <div className="sp-step-content">
                    <p className="sp-step-q">What are you looking to build?</p>
                    <p className="sp-step-hint">Select all that apply</p>
                    <div className="sp-type-grid">
                      {projectTypes.map(pt => (
                        <button
                          key={pt.id}
                          className={`sp-type-btn ${projType.includes(pt.id) ? "sp-type-active" : ""}`}
                          onClick={() => toggleType(pt.id)}
                        >
                          <span className="sp-type-icon">{pt.icon}</span>
                          <span className="sp-type-label">{pt.label}</span>
                          <span className="sp-type-desc">{pt.desc}</span>
                          {projType.includes(pt.id) && (
                            <div className="sp-type-check">
                              <svg width="10" height="10" viewBox="0 0 10 10">
                                <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 2 — Budget ── */}
                {step === 2 && (
                  <div className="sp-step-content">
                    <p className="sp-step-q">What's your budget range?</p>
                    <p className="sp-step-hint">We work with all budgets</p>
                    <div className="sp-choice-list">
                      {budgets.map(b => (
                        <button
                          key={b}
                          className={`sp-choice ${budget === b ? "sp-choice-active" : ""}`}
                          onClick={() => setBudget(b)}
                        >
                          <div className="sp-choice-radio" />
                          {b}
                          {budget === b && (
                            <svg className="sp-choice-check" width="14" height="14" viewBox="0 0 14 14">
                              <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 3 — Timeline ── */}
                {step === 3 && (
                  <div className="sp-step-content">
                    <p className="sp-step-q">What's your timeline?</p>
                    <p className="sp-step-hint">No rush — we'll match your pace</p>
                    <div className="sp-choice-list">
                      {timelines.map(t => (
                        <button
                          key={t}
                          className={`sp-choice ${timeline === t ? "sp-choice-active" : ""}`}
                          onClick={() => setTimeline(t)}
                        >
                          <div className="sp-choice-radio" />
                          {t}
                          {timeline === t && (
                            <svg className="sp-choice-check" width="14" height="14" viewBox="0 0 14 14">
                              <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 4 — Contact details ── */}
                {step === 4 && (
                  <div className="sp-step-content">
                    <p className="sp-step-q">Almost there! Tell us who you are.</p>

                    {/* Summary chips */}
                    <div className="sp-summary">
                      {chosenTypes.map(t => (
                        <span key={t.id} className="sp-summary-chip">{t.icon} {t.label}</span>
                      ))}
                      {budget && <span className="sp-summary-chip sp-chip-blue">💰 {budget}</span>}
                      {timeline && <span className="sp-summary-chip sp-chip-purple">⏱ {timeline}</span>}
                    </div>

                    <div className="sp-fields">
                      <div className="sp-field-wrap">
                        <label className="sp-label">Your Name</label>
                        <input
                          className="sp-input"
                          type="text" placeholder="John Smith"
                          value={name} onChange={e => setName(e.target.value)}
                        />
                      </div>
                      <div className="sp-field-wrap">
                        <label className="sp-label">Email Address</label>
                        <input
                          className="sp-input"
                          type="email" placeholder="john@company.com"
                          value={email} onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="sp-field-wrap sp-field-full">
                        <label className="sp-label">Tell us about your project</label>
                        <textarea
                          className="sp-textarea"
                          placeholder="Describe your idea, goals, or any requirements…"
                          rows={4}
                          value={message} onChange={e => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="sp-nav">
                  {step > 1 && (
                    <button className="sp-back-btn" onClick={() => setStep(s => s - 1)}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                        <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Back
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      className={`sp-next-btn ${canNext() ? "sp-next-ready" : ""}`}
                      onClick={() => { if (canNext()) setStep(s => s + 1); }}
                      disabled={!canNext()}
                    >
                      Continue
                      <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  ) : (
                    <button
                      className={`sp-submit-btn ${canNext() ? "sp-next-ready" : ""} ${sending ? "sp-sending" : ""}`}
                      onClick={handleSubmit}
                      disabled={!canNext() || sending}
                    >
                      {sending ? (
                        <>
                          <span className="sp-spinner" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Launch My Project 🚀
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* ── Success state ── */
              <div className="sp-success">
                <div className="sp-success-icon">
                  <svg width="32" height="32" fill="none" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M14 24L21 31L34 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="sp-success-ring" />
                </div>
                <h3 className="sp-success-title">Project Received! 🎉</h3>
                <p className="sp-success-msg">
                  We'll review your brief and get back to you within <strong>48 hours</strong> with a tailored proposal.
                </p>
                <div className="sp-success-badges">
                  <span>📧 Confirmation sent</span>
                  <span>📋 Brief logged</span>
                  <span>⚡ Team notified</span>
                </div>
                <button className="sp-restart" onClick={() => { setSubmitted(false); setStep(1); setProjType([]); setBudget(""); setTimeline(""); setName(""); setEmail(""); setMessage(""); }}>
                  Submit Another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartProject;
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./ClientFeedback.css";

const testimonials = [
  {
    id: 1,
    name: "Brett Bruhler",
    role: "Client",
    rating: 5,
    feedback:
      "Ramesh did a great job designing some of our website's assets. He was quick with his initial designs and came back to us with revisions when we needed them. Truly professional work from start to finish.",
    avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Brett-Bruhler.png",
    tag: "Web Design",
    accent: "#00f2ff",
    accentRgb: "0,242,255",
  },
  {
    id: 2,
    name: "Daria Kalinicheva",
    role: "Marketing Head",
    rating: 5,
    feedback:
      "The website you guys built is of superior quality and delivers consistent outstanding user experiences. Genuinely impressed with their professionalism at every step. Will work again for sure.",
    avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Daria-Kalinicheva.png",
    tag: "Web Development",
    accent: "#007bff",
    accentRgb: "0,123,255",
  },
  {
    id: 3,
    name: "Vin Pam",
    role: "Company Director",
    rating: 5,
    feedback:
      "Good SEO job in off page support and generating traffic. Job done very professionally. Highly recommend Acute Infosoft. Will hire again in the near future. Results exceeded my expectations.",
    avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Vin-Pam.png",
    tag: "SEO",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
  },
  {
    id: 4,
    name: "Ryan Angel",
    role: "CEO",
    rating: 5,
    feedback:
      "Ramesh tackled a complex blacklist problem and resolved it in a few hours. He followed up with a long-term solution that keeps us protected. Exceptional dedication and follow-through on every issue.",
    avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2022/12/client.jpeg",
    tag: "Technical Support",
    accent: "#00f2ff",
    accentRgb: "0,242,255",
  },
  {
    id: 5,
    name: "Jeniffer Doe",
    role: "Vice President",
    rating: 5,
    feedback:
      "Ramesh is always ready to go the extra mile. Smart, reasonable, and delivers within a quick turnaround. It was a great pleasure working with him. Highly recommended for any serious project!",
    avatar: "https://acuteinfosoft.com/wp-content/themes/startupzy/assets/img/person-people-girl-woman-hair-photography-1172571-pxhere.com.webp",
    tag: "Full Stack",
    accent: "#007bff",
    accentRgb: "0,123,255",
  },
  {
    id: 6,
    name: "Claudia Doe",
    role: "Marketing Head",
    rating: 5,
    feedback:
      "Delivered excellent work. Communication was top-notch, all deadlines met, skills exceptionally strong. He was transparent about scope and I will certainly come back with more projects in the future.",
    avatar: "https://acuteinfosoft.com/wp-content/themes/startupzy/assets/img/person-girl-woman-hair-photography-portrait-108386-pxhere.com.webp",
    tag: "Digital Marketing",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
  },
];

// ── Stars ──────────────────────────────────────────────────────
function Stars({ count, size = 13 }: { count: number; size?: number }) {
  return (
    <div className="cf-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i} width={size} height={size} viewBox="0 0 20 20" fill="currentColor"
          className={i < count ? "cf-star-on" : "cf-star-off"}
          style={{ animationDelay: `${i * 0.07}s` } as React.CSSProperties}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Ripple ─────────────────────────────────────────────────────
function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const trigger = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 800);
  }, []);
  return { ripples, trigger };
}

// ── ScrollCard ─────────────────────────────────────────────────
function ScrollCard({
  t, index, active, onClick,
}: {
  t: typeof testimonials[0]; index: number; active: boolean; onClick: () => void;
}) {
  const { ripples, trigger } = useRipple();
  return (
    <div
      className={`scf-card ${active ? "scf-card-active" : ""}`}
      style={{ "--accent": t.accent, "--accent-rgb": t.accentRgb, animationDelay: `${index * 0.09}s` } as React.CSSProperties}
      onClick={(e) => { trigger(e); onClick(); }}
    >
      {ripples.map(rp => (
        <span key={rp.id} className="scf-ripple" style={{ left: rp.x, top: rp.y }} />
      ))}
      <div className="scf-active-glow" />
      <div className="scf-topline" />
      <div className="scf-step-num">0{index + 1}</div>

      <div className="scf-head">
        <div className="scf-avatar-wrap">
          <img src={t.avatar} alt={t.name} className="scf-avatar" />
          <div className="scf-avatar-ring" />
          {active && <div className="scf-avatar-pulse" />}
        </div>
        <div className="scf-meta">
          <p className="scf-name">{t.name}</p>
          <p className="scf-role">{t.role}</p>
        </div>
        <div className="scf-tag">{t.tag}</div>
      </div>

      <Stars count={t.rating} size={12} />

      <div className="scf-quote-wrap">
        <p className="scf-quote">
          <span className="scf-qmark">"</span>
          {t.feedback}
          <span className="scf-qmark">"</span>
        </p>
      </div>

      <div className="scf-footer">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="scf-check">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Verified Client</span>
        <div className="scf-read-more">View full review →</div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────
const ClientFeedback: React.FC = () => {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const scrollRef     = useRef<HTMLDivElement>(null);
  const autoTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const progressAnimRef = useRef<number | null>(null);

  const [revealed, setRevealed]           = useState(false);
  const [active, setActive]               = useState(0);
  const [scrollProg, setScrollProg]       = useState(0);
  const [detailHovered, setDetailHovered] = useState(false);
  const [autoProgress, setAutoProgress]   = useState(0);

  // ── Intersection reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Left panel scroll progress
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setScrollProg(max > 0 ? scrollTop / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scroll card into view helper
  const scrollCardIntoView = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".scf-card");
    if (cards[i]) cards[i].scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const handleSelect = useCallback((i: number) => {
    setActive(i);
    scrollCardIntoView(i);
    setAutoProgress(0);
  }, [scrollCardIntoView]);

  // ── Auto-scroll logic when detail panel is hovered
  // Animates a progress bar over 2.4s then advances to next card
  useEffect(() => {
    if (!detailHovered) {
      // clean up
      if (autoIntervalRef.current) clearInterval(autoIntervalRef.current);
      if (autoTimerRef.current)    clearTimeout(autoTimerRef.current);
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
      setAutoProgress(0);
      return;
    }

    const DURATION = 2400; // ms per slide
    let startTime: number | null = null;

    const animateBar = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const pct = Math.min(elapsed / DURATION, 1);
      setAutoProgress(pct);

      if (pct < 1) {
        progressAnimRef.current = requestAnimationFrame(animateBar);
      } else {
        // advance
        setActive(prev => {
          const next = (prev + 1) % testimonials.length;
          scrollCardIntoView(next);
          return next;
        });
        startTime = null;
        setAutoProgress(0);
        progressAnimRef.current = requestAnimationFrame(animateBar);
      }
    };

    progressAnimRef.current = requestAnimationFrame(animateBar);

    return () => {
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
      setAutoProgress(0);
    };
  }, [detailHovered, scrollCardIntoView]);

  return (
    <section className="cf-section" ref={sectionRef}>
      {/* Backgrounds */}
      <div className="cf-bg-grid" />
      <div className="cf-blob cf-blob-1" />
      <div className="cf-blob cf-blob-2" />
      <div className="cf-blob cf-blob-3" />
      <div className="cf-scanlines" />
      <div className="cf-noise" />

      <div className="cf-container">

        {/* ── Header ── */}
        <div className={`cf-header cf-reveal ${revealed ? "cf-revealed" : ""}`}>
          <div className="cf-eyebrow">
            <span className="cf-eyebrow-dot" />
            Client Testimonials
          </div>
          <h2 className="cf-heading">
            What Our <span className="cf-heading-accent">Clients Say</span>
          </h2>
          <p className="cf-subheading">
            Don't just take our word for it. Here's what our partners say about working with us.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div
          className={`cf-cols cf-reveal ${revealed ? "cf-revealed" : ""}`}
          style={{ transitionDelay: "0.25s" }}
        >
          {/* ── LEFT — Scrollable feedback panel ── */}
          <div className="cf-scroll-panel">
            <div className="cf-panel-head">
              <span className="cf-panel-dot" />
              <span className="cf-panel-label">All Reviews</span>
              <span className="cf-panel-count">{testimonials.length} clients</span>
            </div>

            {/* Custom scrollbar track */}
            <div className="cf-scroll-track">
              <div
                className="cf-scroll-thumb"
                style={{ top: `${scrollProg * 76}%` }}
              />
            </div>

            <div className="cf-scroll-cards" ref={scrollRef}>
              <div className="cf-scroll-fade-top" />
              {testimonials.map((t, i) => (
                <ScrollCard
                  key={t.id} t={t} index={i}
                  active={active === i}
                  onClick={() => handleSelect(i)}
                />
              ))}
              <div className="cf-scroll-fade-bot" />
            </div>
          </div>

          {/* ── RIGHT — Detail panel ── */}
          <div
            className={`cf-detail-panel ${detailHovered ? "cf-detail-panel-hovered" : ""}`}
            onMouseEnter={() => setDetailHovered(true)}
            onMouseLeave={() => setDetailHovered(false)}
          >
            {/* Hover-to-autoplay hint */}
            <div className={`cf-hint ${detailHovered ? "cf-hint-hide" : ""}`}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
              Hover to auto-play
            </div>

            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`cf-detail ${active === i ? "cf-detail-active" : ""}`}
                style={{ "--accent": t.accent, "--accent-rgb": t.accentRgb } as React.CSSProperties}
              >
                {/* Auto-progress bar */}
                {active === i && detailHovered && (
                  <div className="cf-progress-bar">
                    <div
                      className="cf-progress-fill"
                      style={{ width: `${autoProgress * 100}%` }}
                    />
                    <div
                      className="cf-progress-glow"
                      style={{ left: `${autoProgress * 100}%` }}
                    />
                  </div>
                )}

                {/* Corner brackets */}
                <div className="cf-dc cf-dc-tl" />
                <div className="cf-dc cf-dc-tr" />
                <div className="cf-dc cf-dc-bl" />
                <div className="cf-dc cf-dc-br" />

                <div className="cf-detail-glow" />
                <div className="cf-detail-topline" />
                <div className="cf-detail-num">0{i + 1}</div>

                {/* Quote SVG icon */}
                <svg className="cf-detail-qicon" viewBox="0 0 60 40" fill="none">
                  <path d="M0 40V24C0 10.745 8.954 2.09 26.863 0L29 6.182C19.954 7.636 15.432 12.036 15.432 19.382H26V40H0ZM34 40V24C34 10.745 42.954 2.09 60.863 0L63 6.182C53.954 7.636 49.432 12.036 49.432 19.382H60V40H34Z" fill="currentColor" />
                </svg>

                <p className="cf-detail-quote">"{t.feedback}"</p>

                <Stars count={t.rating} size={20} />

                <div className="cf-detail-author">
                  <div className="cf-detail-av-wrap">
                    <img src={t.avatar} alt={t.name} className="cf-detail-av" />
                    <div className="cf-detail-av-ring" />
                    <div className="cf-detail-av-pulse" />
                  </div>
                  <div className="cf-detail-info">
                    <p className="cf-detail-name">{t.name}</p>
                    <p className="cf-detail-role">{t.role}</p>
                  </div>
                  <div className="cf-detail-badge">
                    <span className="cf-detail-badge-dot" />
                    Featured Review
                  </div>
                </div>

                <div className="cf-detail-tag">{t.tag}</div>
              </div>
            ))}

            {/* Nav dots */}
            <div className="cf-nav-dots">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  className={`cf-nav-dot ${active === i ? "cf-nav-dot-on" : ""}`}
                  style={{ "--dot-accent": t.accent } as React.CSSProperties}
                  onClick={() => handleSelect(i)}
                  aria-label={`View testimonial ${i + 1}`}
                >
                  {active === i && detailHovered && (
                    <svg className="cf-dot-ring" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"
                        strokeDasharray="50.27"
                        strokeDashoffset={`${50.27 * (1 - autoProgress)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 10 10)"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="cf-container">
        <div
          className={`cf-cta cf-reveal ${revealed ? "cf-revealed" : ""}`}
          style={{ transitionDelay: "0.5s" }}
        >
          <div className="cf-cta-l">
            <span className="cf-cta-dot" />
            <span className="cf-cta-txt">Ready to be our next success story?</span>
          </div>
          <a href="/contact" className="cf-cta-btn">
            <span>Start a Project</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
       {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default ClientFeedback;
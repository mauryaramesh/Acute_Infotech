"use client";

import React, { useEffect, useRef, useState } from "react";
import "./ClientFeedback.css";

const testimonials = [
  {
    id: 1,
    name: "Brett Bruhler",
    role: "Client",
    rating: 5,
    feedback:
      "Ramesh did a great job designing some of our website's assets. He was quick with his initial designs and came back to us with revisions when we needed them.",
    avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Brett-Bruhler.png",
    tag: "Web Design",
    tagColor: "cyan",
  },
  {
    id: 2,
    name: "Daria Kalinicheva",
    role: "Marketing Head",
    rating: 5,
    feedback:
      "The website you guys built is of superior quality and delivers consistent outstanding user experiences. Genuinely impressed with their professionalism at every step.",
    avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Daria-Kalinicheva.png",
    tag: "Web Development",
    tagColor: "blue",
  },
  {
    id: 3,
    name: "Vin Pam",
    role: "Company Director",
    rating: 5,
    feedback:
      "Good SEO job in off page support and generating traffic. Job done very professionally. Highly recommend Acute Infosoft. Will hire again in the near future.",
    avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2024/08/Vin-Pam.png",
    tag: "SEO",
    tagColor: "purple",
  },
  {
    id: 4,
    name: "Ryan Angel",
    role: "CEO",
    rating: 5,
    feedback:
      "Ramesh tackled a complex blacklist problem and resolved it in a few hours. He followed up with a long-term solution that keeps us protected. Exceptional work.",
    avatar: "https://www.acuteinfosoft.com/wp-content/uploads/2022/12/client.jpeg",
    tag: "Technical Support",
    tagColor: "cyan",
  },
  {
    id: 5,
    name: "Jeniffer Doe",
    role: "Vice President",
    rating: 5,
    feedback:
      "Ramesh is always ready to go the extra mile. Smart, reasonable, and delivers within a quick turnaround. It was a great pleasure working with him. Highly recommended!",
    avatar: "https://acuteinfosoft.com/wp-content/themes/startupzy/assets/img/person-people-girl-woman-hair-photography-1172571-pxhere.com.webp",
    tag: "Full Stack",
    tagColor: "blue",
  },
  {
    id: 6,
    name: "Claudia Doe",
    role: "Marketing Head",
    rating: 5,
    feedback:
      "Delivered excellent work. Communication was top-notch, all deadlines met, skills exceptionally strong. He was transparent about scope and I will certainly hire again.",
    avatar: "https://acuteinfosoft.com/wp-content/themes/startupzy/assets/img/person-girl-woman-hair-photography-portrait-108386-pxhere.com.webp",
    tag: "Digital Marketing",
    tagColor: "purple",
  },
];

// Tripled for perfectly seamless loop
const row1 = [...testimonials, ...testimonials, ...testimonials];
const row2 = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)];

// ── Stars ─────────────────────────────────────────────────────
function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="cf-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="currentColor"
          className={i < count ? "cf-star-on" : "cf-star-off"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Marquee Card ──────────────────────────────────────────────
function MarqueeCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <article className={`cf-card cf-card-${t.tagColor}`}>
      <div className="cf-card-glow" />
      <div className="cf-card-topline" />

      {/* Header row */}
      <div className="cf-card-head">
        <div className="cf-avatar-shell">
          <img src={t.avatar} alt={t.name} className="cf-avatar" loading="lazy" />
          <div className="cf-avatar-ring" />
        </div>
        <div className="cf-card-meta">
          <p className="cf-card-name">{t.name}</p>
          <p className="cf-card-role">{t.role}</p>
        </div>
        <div className={`cf-card-tag cf-tag-${t.tagColor}`}>{t.tag}</div>
      </div>

      {/* Stars */}
      <Stars count={t.rating} size={13} />

      {/* Quote */}
      <blockquote className="cf-card-quote">
        <span className="cf-open-quote">"</span>
        {t.feedback}
        <span className="cf-close-quote">"</span>
      </blockquote>

      {/* Footer */}
      <div className="cf-card-foot">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="cf-verified-icon">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Verified Client</span>
      </div>
    </article>
  );
}

// ── Featured Card (large hero) ────────────────────────────────
function FeaturedCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="cf-featured">
      <div className="cf-featured-glow" />
      <div className="cf-featured-topline" />
      <div className="cf-featured-corner cf-fc-tl" />
      <div className="cf-featured-corner cf-fc-tr" />
      <div className="cf-featured-corner cf-fc-bl" />
      <div className="cf-featured-corner cf-fc-br" />

      <div className="cf-featured-inner">
        {/* Big quote icon */}
        <svg className="cf-featured-icon" viewBox="0 0 48 48" fill="none">
          <path d="M14 28c0-5.523 4.477-10 10-10v4c-3.314 0-6 2.686-6 6v8H8V28h6zm20 0c0-5.523 4.477-10 10-10v4c-3.314 0-6 2.686-6 6v8H28V28h6z" fill="currentColor" />
        </svg>

        <p className="cf-featured-quote">"{t.feedback}"</p>

        <Stars count={t.rating} size={18} />

        <div className="cf-featured-author">
          <div className="cf-featured-avatar-wrap">
            <img src={t.avatar} alt={t.name} className="cf-featured-avatar" />
            <div className="cf-featured-avatar-ring" />
          </div>
          <div>
            <p className="cf-featured-name">{t.name}</p>
            <p className="cf-featured-role">{t.role}</p>
          </div>
          <div className="cf-featured-badge">
            <span className="cf-featured-badge-dot" />
            Featured Review
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
const ClientFeedback: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [featuredIdx, setFeaturedIdx] = useState(1); // Daria as hero

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); observer.disconnect(); } },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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

        {/* ── Summary pills ── */}
        <div className={`cf-pills-row cf-reveal ${revealed ? "cf-revealed" : ""}`}
          style={{ transitionDelay: "0.15s" }}>
          {[
            { val: "5.0★", label: "Avg Rating", color: "gold" },
            { val: "50+",  label: "Happy Clients", color: "cyan" },
            { val: "98%",  label: "Would Recommend", color: "blue" },
            { val: "100%", label: "On-Time Delivery", color: "purple" },
          ].map((p, i) => (
            <div key={i} className={`cf-pill cf-pill-${p.color}`}>
              <span className="cf-pill-val">{p.val}</span>
              <span className="cf-pill-label">{p.label}</span>
            </div>
          ))}
        </div>

        {/* ── Featured + sidebar layout ── */}
        <div className={`cf-feature-layout cf-reveal ${revealed ? "cf-revealed" : ""}`}
          style={{ transitionDelay: "0.25s" }}>

          {/* Left: featured big card */}
          <FeaturedCard t={testimonials[featuredIdx]} />

          {/* Right: stacked mini cards as selectors */}
          <div className="cf-selector-list">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                className={`cf-selector ${i === featuredIdx ? "cf-selector-active" : ""}`}
                onClick={() => setFeaturedIdx(i)}
              >
                <img src={t.avatar} alt={t.name} className="cf-sel-avatar" />
                <div className="cf-sel-info">
                  <p className="cf-sel-name">{t.name}</p>
                  <p className="cf-sel-role">{t.role}</p>
                </div>
                <Stars count={t.rating} size={11} />
                <div className="cf-sel-arrow">›</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── Marquee Row 1 (→ left) ── */}
      <div
        className={`cf-marquee-wrap cf-reveal ${revealed ? "cf-revealed" : ""}`}
        style={{ transitionDelay: "0.4s", marginTop: "4rem" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="cf-fade-l" />
        <div className="cf-fade-r" />
        <div className={`cf-track cf-track-l ${paused ? "cf-paused" : ""}`}>
          {row1.map((t, i) => <MarqueeCard key={`r1-${i}`} t={t} />)}
        </div>
      </div>

      {/* ── Marquee Row 2 (→ right) ── */}
      <div
        className={`cf-marquee-wrap cf-reveal ${revealed ? "cf-revealed" : ""}`}
        style={{ transitionDelay: "0.5s", marginTop: "1.2rem" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="cf-fade-l" />
        <div className="cf-fade-r" />
        <div className={`cf-track cf-track-r ${paused ? "cf-paused" : ""}`}>
          {row2.map((t, i) => <MarqueeCard key={`r2-${i}`} t={t} />)}
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="cf-container">
        <div className={`cf-cta-strip cf-reveal ${revealed ? "cf-revealed" : ""}`}
          style={{ transitionDelay: "0.6s" }}>
          <div className="cf-cta-left">
            <span className="cf-cta-dot" />
            <span className="cf-cta-text">Ready to be our next success story?</span>
          </div>
          <a href="/contact" className="cf-cta-btn">
            <span>Start a Project</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

    </section>
  );
};

export default ClientFeedback;
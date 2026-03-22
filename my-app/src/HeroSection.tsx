"use client";
import React, { useEffect, useState, useRef } from "react";
import "./HeroSection.css";

// ── Full-bleed background images (replace with your actual images) ──
// These are the 3 cinematic IT/AI background scenes that slide
const bgSlides = [
  {
    // Scene 1 — Digital dashboard / tech office
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1800&q=85",
    label: "Digital Engineering",
  },
  {
    // Scene 2 — AI / robotics / team
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1800&q=85",
    label: "AI Automation",
  },
  {
    // Scene 3 — Cloud / data infrastructure
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=85",
    label: "Cloud Systems",
  },
];

// ── Award badges exactly as seen in the video ──
const awards = [
  {
    logo: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#C8A96E" strokeWidth="1.5"/>
        <path d="M20 8l2.5 7.5H30l-6 4.5 2.5 7.5L20 23l-6.5 4.5 2.5-7.5-6-4.5h7.5z" fill="#C8A96E"/>
      </svg>
    ),
    title: "Entrepreneur",
    subtitle: "APP DEVELOPMENT\nCOMPANY OF THE YEAR",
    accent: "#C8A96E",
  },
  {
    logo: (
      <svg width="28" height="20" viewBox="0 0 56 32" fill="none">
        <rect x="1" y="1" width="54" height="30" rx="3" stroke="#E8B84B" strokeWidth="1.5"/>
        <text x="28" y="22" textAnchor="middle" fill="#E8B84B" fontSize="14" fontWeight="800" fontFamily="serif">ET</text>
      </svg>
    ),
    title: "ET Awards",
    subtitle: "INDUSTRY\nCHANGE MAKERS",
    accent: "#E8B84B",
  },
  {
    logo: (
      <svg width="48" height="24" viewBox="0 0 96 40" fill="none">
        <text x="0" y="28" fill="white" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="-0.5">TIMES</text>
        <text x="0" y="38" fill="#E8B84B" fontSize="7" fontWeight="600" fontFamily="sans-serif" letterSpacing="1">BUSINESS AWARDS</text>
      </svg>
    ),
    title: "Times Business",
    subtitle: "TECH COMPANY\nOF THE YEAR",
    accent: "#E8B84B",
  },
  {
    logo: (
      <svg width="52" height="20" viewBox="0 0 80 28" fill="none">
        <text x="0" y="20" fill="white" fontSize="15" fontWeight="900" fontFamily="serif" letterSpacing="-0.5">Deloitte.</text>
        <text x="0" y="28" fill="#86BC25" fontSize="7" fontWeight="700" fontFamily="sans-serif">Technology Fast 50</text>
      </svg>
    ),
    title: "Deloitte",
    subtitle: "TECHNOLOGY\nFAST 50",
    accent: "#86BC25",
  },
];

// ── Typewriter for subheadline ──
function useTypewriter(words: string[], speed = 70, pause = 2400) {
  const [text, setText]           = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const cur = words[wordIdx % words.length];
    const t = setTimeout(() => {
      if (!deleting) {
        setText(cur.slice(0, text.length + 1));
        if (text.length + 1 === cur.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(cur.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setWordIdx(w => w + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function HeroSection() {
  const [active, setActive]         = useState(0);
  const [prev,   setPrev]           = useState<number | null>(null);
  const [loaded, setLoaded]         = useState(false);
  const intervalRef                 = useRef<ReturnType<typeof setInterval> | null>(null);

  const word = useTypewriter([
    "Web Applications",
    "Mobile Apps",
    "AI Solutions",
    "Cloud Platforms",
    "SaaS Products",
    "Digital Systems",
  ]);

  // Preload first image then show hero
  useEffect(() => {
    const img = new Image();
    img.src = bgSlides[0].src;
    img.onload = () => setLoaded(true);
    setTimeout(() => setLoaded(true), 800); // fallback
  }, []);

  // Auto-advance slides
  const advance = (to: number) => {
    setPrev(active);
    setActive(to);
    setTimeout(() => setPrev(null), 900);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(i => {
        const next = (i + 1) % bgSlides.length;
        setPrev(i);
        setTimeout(() => setPrev(null), 900);
        return next;
      });
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleDot = (i: number) => {
    if (i === active) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    advance(i);
    intervalRef.current = setInterval(() => {
      setActive(j => {
        const next = (j + 1) % bgSlides.length;
        setPrev(j);
        setTimeout(() => setPrev(null), 900);
        return next;
      });
    }, 5000);
  };

  return (
    <section className={`hs-section ${loaded ? "hs-loaded" : ""}`}>

      {/* ── Full-bleed background slides ── */}
      <div className="hs-bg-stage">
        {bgSlides.map((s, i) => (
          <div
            key={i}
            className={`hs-bg-slide ${i === active ? "hs-bg-active" : ""} ${i === prev ? "hs-bg-exit" : ""}`}
          >
            <img src={s.src} alt={s.label} className="hs-bg-img" />
          </div>
        ))}
      </div>

      {/* ── Overlays ── */}
      {/* Left-side dark gradient so text is readable */}
      <div className="hs-overlay-left" />
      {/* Full subtle dark overlay */}
      <div className="hs-overlay-full" />
      {/* Bottom fade */}
      <div className="hs-overlay-bottom" />

      {/* ── Main content ── */}
      <div className="hs-body">

        {/* ── LEFT — hero copy ── */}
        <div className="hs-left">

         

          {/* Main headline */}
          <h1 className="hs-headline">
            Driving Innovation With
            <br className="hs-br" />
            Industry‑Experienced
            <br />
            <span className="hs-headline-accent">Software Experts</span>
          </h1>

          {/* Description */}
          <p className="hs-desc">
            Offering highly scalable, functionality‑rich, and reliable software
            development solutions and custom website &amp; app design and development
            services that drive digital transformation in the competitive landscape.
          </p>

          {/* Typewriter capability — chip style */}
          <div className="hs-capability">
            <span className="hs-cap-prefix">We build</span>
            <span className="hs-cap-chip">
              <span className="hs-cap-chip-icon">⚡</span>
              <span className="hs-cap-typed">{word}</span>
            </span>
            <span className="hs-cap-suffix">for the world</span>
          </div>

         
          {/* CTA buttons */}
          <div className="hs-cta-row">
            <a href="/contact" className="hs-cta-btn">
              Get A Free Consultation
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="white" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
        
          </div>

          {/* Slide dots */}
          <div className="hs-dots">
            {bgSlides.map((_, i) => (
              <button
                key={i}
                className={`hs-dot ${i === active ? "hs-dot-active" : ""}`}
                onClick={() => handleDot(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── Award badges row — bottom right ── */}
     

      {/* ── Slide progress bar ── */}
      <div className="hs-progress-rail">
        <div className="hs-progress-fill" key={active} />
      </div>

      

    </section>
  );
}
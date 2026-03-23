"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./HeroSection.css";

// ─── REPLACE THESE with your real images ───────────────────────
const BG_SLIDES = [
  {
    src:   "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=90",
    tag:   "Digital Engineering",
    color: "#0066FF",
  },
  {
    src:   "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=90",
    tag:   "AI Automation",
    color: "#7C3AED",
  },
  {
    src:   "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=90",
    tag:   "Cloud Infrastructure",
    color: "#0891B2",
  },
];

const SERVICES = [
  "Web Applications",
  "Mobile Apps",
  "AI Solutions",
  "Cloud Platforms",
  "SaaS Products",
  "Digital Systems",
  "LLM Integrations",
  "DevOps Pipelines",
];


// ─── Animated canvas background ────────────────────────────────
function useOrbitCanvas(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Floating nodes
    const nodes = Array.from({ length: 55 }, () => ({
      x:  Math.random() * 1.2 - 0.1,
      y:  Math.random() * 1.2 - 0.1,
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      r:  Math.random() * 1.4 + 0.5,
      a:  Math.random() * 0.5 + 0.1,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -0.1) n.x = 1.1;
        if (n.x > 1.1)  n.x = -0.1;
        if (n.y < -0.1) n.y = 1.1;
        if (n.y > 1.1)  n.y = -0.1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * w;
          const dy = (nodes[i].y - nodes[j].y) * h;
          const d  = Math.hypot(dx, dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.strokeStyle = `rgba(0,102,255,${0.12 * (1 - d / 140)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      // Dots
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,160,255,${n.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [ref]);
}

// ─── Typewriter ─────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 65, pause = 2600) {
  const [txt, setTxt]   = useState("");
  const [wi,  setWi]    = useState(0);
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const cur = words[wi % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setTxt(cur.slice(0, txt.length + 1));
        if (txt.length + 1 === cur.length) setTimeout(() => setDel(true), pause);
      } else {
        setTxt(cur.slice(0, txt.length - 1));
        if (txt.length - 1 === 0) { setDel(false); setWi(w => w + 1); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [txt, del, wi, words, speed, pause]);
  return txt;
}

// ─── Count-up ────────────────────────────────────────────────────
function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      let s = 0;
      const step = (ts: number) => {
        if (!s) s = ts;
        const p = Math.min((ts - s) / 1800, 1);
        setN(Math.floor((1 - Math.pow(1 - p, 3)) * end));
        if (p < 1) requestAnimationFrame(step); else setN(end);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ─── Main Hero ───────────────────────────────────────────────────
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useOrbitCanvas(canvasRef);

  const [slide, setSlide]           = useState(0);
  const [prevSlide, setPrevSlide]   = useState<number | null>(null);
  const [ready, setReady]           = useState(false);
  const [headIn, setHeadIn]         = useState(false);
  const timerRef                    = useRef<ReturnType<typeof setInterval> | null>(null);

  const word = useTypewriter(SERVICES);

  // Entry sequence
  useEffect(() => {
    const img = new Image(); img.src = BG_SLIDES[0].src;
    const show = () => { setReady(true); setTimeout(() => setHeadIn(true), 120); };
    img.onload = show;
    setTimeout(show, 900);
  }, []);

  // Auto-cycle slides
  const goTo = useCallback((to: number) => {
    setPrevSlide(slide);
    setSlide(to);
    setTimeout(() => setPrevSlide(null), 1000);
  }, [slide]);

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => {
      const next = (s + 1) % BG_SLIDES.length;
      setPrevSlide(s); setTimeout(() => setPrevSlide(null), 1000);
      return next;
    }), 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleDot = (i: number) => {
    if (i === slide) return;
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(i);
    timerRef.current = setInterval(() => setSlide(s => {
      const next = (s + 1) % BG_SLIDES.length;
      setPrevSlide(s); setTimeout(() => setPrevSlide(null), 1000);
      return next;
    }), 5500);
  };

  return (
    <section className={`hero ${ready ? "hero--ready" : ""}`}>

      {/* ── Canvas network animation ── */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* ── Background slideshow ── */}
      <div className="hero__stage">
        {BG_SLIDES.map((bg, i) => (
          <div
            key={i}
            className={[
              "hero__slide",
              i === slide     ? "hero__slide--active" : "",
              i === prevSlide ? "hero__slide--exit"   : "",
            ].join(" ")}
          >
            <img src={bg.src} alt={bg.tag} className="hero__slide-img" />
            {/* Per-slide colour tint */}
            <div
              className="hero__slide-tint"
              style={{ background: `${bg.color}18` }}
            />
          </div>
        ))}
      </div>

      {/* ── Overlay system ── */}
      <div className="hero__ov hero__ov--left"   />
      <div className="hero__ov hero__ov--full"   />
      <div className="hero__ov hero__ov--vignette" />
      <div className="hero__ov hero__ov--bottom" />

      {/* ── Animated grain texture ── */}
      <div className="hero__grain" />

      {/* ── Horizontal rule at bottom of copy area ── */}
      <div className="hero__rule" />

      {/* ══════════════════════════════════════════
          MAIN COPY
      ══════════════════════════════════════════ */}
      <div className="hero__body">
        <div className={`hero__copy ${headIn ? "hero__copy--in" : ""}`}>

          {/* Eyebrow */}
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            <span>Trusted by 50+ Businesses Globally</span>
            <span className="hero__eyebrow-badge">
              ★ Top Rated
            </span>
          </div>

          {/* Headline — each word animates in separately */}
          <h1 className="hero__h1" aria-label="Driving Innovation With Industry-Experienced Software Experts">
            {"Driving Innovation With".split(" ").map((w, i) => (
              <span key={i} className="hero__word" style={{ animationDelay: `${0.05 * i + 0.1}s` }}>{w}&nbsp;</span>
            ))}
            <br />
            {"Industry‑Experienced".split(" ").map((w, i) => (
              <span key={i} className="hero__word" style={{ animationDelay: `${0.05 * (i + 3) + 0.1}s` }}>{w}&nbsp;</span>
            ))}
            <br />
            <span className="hero__word hero__h1-accent" style={{ animationDelay: "0.4s" }}>
              Software Experts
            </span>
          </h1>

          {/* Description */}
          <p className="hero__desc">
            Offering highly scalable, functionality‑rich, and reliable software
            development solutions and custom website &amp; app design and development
            services that drive digital transformation in the competitive landscape.
          </p>

          {/* Animated service typewriter */}
          <div className="hero__service-row">
            <span className="hero__service-label">We craft</span>
            <span className="hero__service-chip">
              <svg className="hero__service-icon" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="hero__service-typed">{word}</span>
            </span>
          </div>
          {/* CTAs */}
          <div className="hero__ctas">
            <a href="/contact" className="hero__btn hero__btn--primary">
              <span>Get A Free Consultation</span>
              <span className="hero__btn-arrow">
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <path d="M3.5 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <a href="/portfolio" className="hero__btn hero__btn--ghost">
              <span>View Our Work</span>
              <span className="hero__btn-play">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 14 14">
                  <path d="M3 2.5l9 4.5-9 4.5V2.5z"/>
                </svg>
              </span>
            </a>
          </div>

          {/* Slide navigation dots */}
          <div className="hero__nav">
            {BG_SLIDES.map((bg, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                className={`hero__navdot ${i === slide ? "hero__navdot--on" : ""}`}
                aria-label={bg.tag}
              >
                {i === slide && (
                  <span
                    className="hero__navdot-ring"
                    style={{ borderColor: BG_SLIDES[slide].color }}
                  />
                )}
              </button>
            ))}
            <span className="hero__nav-label">{BG_SLIDES[slide].tag}</span>
          </div>
        </div>
      </div>

      {/* ── Progress rail ── */}
      <div className="hero__progress">
        <div
          className="hero__progress-fill"
          key={slide}
          style={{ "--accent": BG_SLIDES[slide].color } as React.CSSProperties}
        />
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero__scroll">
        <div className="hero__scroll-track">
          <div className="hero__scroll-thumb" />
        </div>
        <span>Scroll</span>
      </div>

    </section>
  );
}
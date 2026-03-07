"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./HeroSection.css";
import logo from './assets/images/acute_right_1.png';

const heroImages = [
  logo.src,
  "/right_2.webp",
  "/right_3.webp",
];

// ── Particle System ──────────────────────────────────────────────
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.6 + 0.1,
      hue: Math.random() > 0.7 ? 280 : 195,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx += (dx / dist) * 0.08;
          p.vy += (dy / dist) * 0.08;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${p.alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 65%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef]);
}

// ── Typewriter Hook ────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((w) => w + 1);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

// ── Magnetic Button ────────────────────────────────────────────
function MagneticBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className="hero-btn"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

// ── Main Component ─────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  const dynamicWord = useTypewriter([
    "digital products",
    "SaaS platforms",
    "AI automations",
    "web experiences",
    "mobile apps",
    "LLM integrations",
    "cloud solutions",
    "AR/VR experiences",
    "blockchain apps",
    "IoT systems",
  ]);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveImage(i => (i + 1) % heroImages.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-section">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="hero-particles" />

      {/* Background Layers */}
      <div className="hero-grid-overlay" />
      <div className="hero-scanlines" />
      <div className="hero-glow-blob blob-1" />
      <div className="hero-glow-blob blob-2" />
      <div className="hero-glow-blob blob-3" />
      <div className="hero-glow-blob blob-4" />
      <div className="hero-noise" />

      <div className="hero-container">

        {/* ── LEFT SIDE ── */}
        <div className="hero-left">
          <h1 className="hero-title">
            <span className="hero-title-static">We turn your ideas into</span>
            <span className="hero-title-dynamic">
              <span className="hero-title-typewriter">{dynamicWord}</span>
            </span>
          </h1>

          <p className="hero-description">
            We build custom <strong>SOFTWARE</strong> and <strong>APPS</strong> for our customers
            to run their business efficiently with cutting&#8209;edge{" "}
            <span className="hero-desc-highlight">AI automation</span>.
          </p>

          <div className="hero-cta-row">
            <MagneticBtn href="/contact">
              <span>Get A Quote</span>
              <span className="hero-btn-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </MagneticBtn>
          </div>
        </div>

        {/* ── RIGHT SIDE ── */}
        <div className="hero-right">
          <div className="hero-orbit hero-orbit-1" />
          <div className="hero-orbit hero-orbit-2" />
          <div className="hero-orbit hero-orbit-3" />

          <div className="hero-image-wrapper">
            <div className="hero-corner hero-corner-tl" />
            <div className="hero-corner hero-corner-tr" />
            <div className="hero-corner hero-corner-bl" />
            <div className="hero-corner hero-corner-br" />
            <div className="hero-progress-bar" />

            <div className="hero-carousel">
              {heroImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Project ${i + 1}`}
                  className={`hero-carousel-img ${i === activeImage ? "active" : ""}`}
                />
              ))}
              <div className="hero-dots">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    className={`hero-dot ${i === activeImage ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                  />
                ))}
              </div>
              <div className="hero-card-shimmer" />
            </div>
          </div>
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

export default HeroSection;
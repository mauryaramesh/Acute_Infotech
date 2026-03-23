"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   PARTICLE HOOK
───────────────────────────────────────────────────────────── */
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
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
    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });

    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.7 ? 280 : 195,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = p.x - mouse.x,
          dy = p.y - mouse.y;
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
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, `hsla(${p.hue},100%,65%,${p.alpha})`);
        g.addColorStop(1, `hsla(${p.hue},100%,65%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x,
            dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,242,255,${0.07 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
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
    };
  }, [canvasRef]);
}

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal,.reveal-l,.reveal-r");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────────────────────── */
function useCounter(target: number, suffix: string, duration = 1800) {
  const [count, setCount] = useState("0" + suffix);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let cur = 0;
          const step = target / (duration / 16);
          const t = setInterval(() => {
            cur += step;
            if (cur >= target) {
              setCount(target + suffix);
              clearInterval(t);
            } else setCount(Math.floor(cur) + suffix);
          }, 16);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, suffix, duration]);
  return { ref, count };
}

/* ─────────────────────────────────────────────────────────────
   3D TILT CARD
───────────────────────────────────────────────────────────── */
function TiltCard({
  children,
  className = "",
  featured = false,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * 12;
    const ry = -((e.clientX - r.left - r.width / 2) / r.width) * 12;
    el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100) + "%");
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100) + "%");
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);
  return (
    <div
      ref={ref}
      className={`scard${featured ? " featured" : ""} ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "🤖",
    badge: "AI-First",
    badgeClass: "",
    title: "AI & Machine Learning",
    desc: "Custom LLM integrations, predictive analytics, intelligent automation, NLP pipelines and computer vision solutions that give your business a true competitive edge.",
    tags: ["LLM Integration", "Computer Vision", "NLP", "MLOps"],
  },
  {
    icon: "📱",
    badge: "Popular",
    badgeClass: "hot",
    title: "Mobile App Development",
    desc: "High-performance iOS, Android & cross-platform apps built with React Native and Flutter, designed for seamless UX and millions of concurrent users.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
    featured: true,
  },
  {
    icon: "🌐",
    badge: "Full-Stack",
    badgeClass: "",
    title: "Web Development",
    desc: "Blazing-fast, SEO-optimized web applications and SaaS platforms using Next.js, React, Node.js and scalable microservices architectures.",
    tags: ["Next.js", "React", "Node.js", "GraphQL"],
  },
  {
    icon: "⚙️",
    badge: "Enterprise",
    badgeClass: "",
    title: "Custom Software & ERP",
    desc: "Tailored enterprise software, ERP and CRM systems that automate operations, centralise data and scale effortlessly with your growing business needs.",
    tags: ["ERP", "CRM", "SaaS", "Microservices"],
  },
  {
    icon: "🎨",
    badge: "Creative",
    badgeClass: "hot",
    title: "UI/UX Design",
    desc: "Research-driven, pixel-perfect design systems, prototypes and user journeys that maximise conversion, retention and brand perception at every touchpoint.",
    tags: ["Figma", "Design System", "Prototyping", "Usability"],
  },
  {
    icon: "☁️",
    badge: "DevOps",
    badgeClass: "",
    title: "Cloud & DevOps",
    desc: "CI/CD pipelines, Kubernetes orchestration, AWS/GCP/Azure deployments and 24/7 infrastructure monitoring for maximum uptime and resilience.",
    tags: ["AWS", "Kubernetes", "Docker", "Terraform"],
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Discovery & Strategy",
    desc: "Deep-dive into your business goals, market landscape, user needs and competitive edge. We define success metrics before writing a single line of code.",
  },
  {
    n: "02",
    title: "UX/UI Design",
    desc: "Wireframes, interactive prototypes and polished design systems. We validate with real users before development begins to eliminate costly rework later.",
  },
  {
    n: "03",
    title: "Architecture & Planning",
    desc: "Scalable system architecture, tech stack selection, security layers, integrations map and sprint planning ensuring zero surprises during development.",
  },
  {
    n: "04",
    title: "Agile Development",
    desc: "Two-week sprints with continuous demos, real-time progress dashboards and open Slack channels. You always know exactly where your product stands.",
  },
  {
    n: "05",
    title: "QA & Testing",
    desc: "Automated and manual testing across devices, load testing up to 10M requests and security audits before any line ships to production.",
  },
  {
    n: "06",
    title: "Launch & Ongoing Support",
    desc: "Zero-downtime deployments, post-launch monitoring and 24/7 dedicated support with SLA guarantees. We stay with you long after go-live.",
  },
];

const TECH_STACKS = [
  {
    icon: "⚛️",
    title: "Frontend",
    pills: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    icon: "🔧",
    title: "Backend",
    pills: ["Node.js", "Python", "Go", "GraphQL", "REST APIs", "gRPC"],
  },
  {
    icon: "🤖",
    title: "AI & Data",
    pills: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Apache Spark", "Pinecone"],
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    pills: ["AWS", "GCP", "Azure", "Kubernetes", "Docker", "Terraform"],
  },
];

const INDUSTRIES = [
  { icon: "🏥", name: "Healthcare", desc: "HIPAA-compliant patient portals, telemedicine & clinical tools" },
  { icon: "🏦", name: "Fintech", desc: "Banking platforms, payment gateways & trading systems" },
  { icon: "🛒", name: "E-Commerce", desc: "High-conversion storefronts, ERPs & omnichannel platforms" },
  { icon: "🎓", name: "EdTech", desc: "LMS platforms, adaptive learning & student engagement tools" },
  { icon: "🚗", name: "Automotive", desc: "Fleet management, IoT dashboards & EV infrastructure" },
  { icon: "🏗️", name: "Real Estate", desc: "Property listing platforms, VR tours & CRM solutions" },
  { icon: "🍕", name: "Food & Restaurant", desc: "Online ordering, delivery tracking & kitchen management" },
  { icon: "📦", name: "Logistics", desc: "Supply chain visibility, route optimization & WMS systems" },
];

/* ─────────────────────────────────────────────────────────────
   HERO BADGE DATA
───────────────────────────────────────────────────────────── */
const HERO_BADGES: [string, string, string][] = [
  ["🤖", "AI & Machine Learning", "3.5s"],
  ["📱", "Mobile Apps", "4.2s"],
  ["🌐", "Web Development", "3.8s"],
  ["☁️", "Cloud & DevOps", "5s"],
  ["🔗", "Blockchain", "4.6s"],
  ["📊", "Data Engineering", "3.2s"],
  ["🛡️", "Cybersecurity", "4.9s"],
  ["🥽", "AR / VR", "3.6s"],
];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const ServicesPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);
  useReveal();

  const c1 = useCounter(150, "+");
  const c2 = useCounter(120, "+");
  const c3 = useCounter(4, "+", 1200);
  const c4 = useCounter(50, "+", 1500);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700;800&family=Syne:wght@700;800;900&display=swap');
        :root{--cyan:#00f2ff;--blue:#007bff;--purple:#7000ff;--green:#00ff88;--bg:#030816;--text:#fff;--muted:rgba(255,255,255,0.55);--card:rgba(5,15,38,0.88);--border:rgba(0,242,255,0.14);--ff:'Syne',sans-serif;--fb:'Space Grotesk',sans-serif}
        *{box-sizing:border-box;margin:0;padding:0}
        .sp-page{position:relative;min-height:100vh;background:radial-gradient(ellipse 80% 60% at 50% -10%,#0a1a3a 0%,#030816 55%,#000 100%);font-family:var(--fb);color:var(--text);overflow-x:hidden}
        .sp-canvas{position:fixed;inset:0;z-index:0;width:100%;height:100%;pointer-events:all}
        .sp-grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(circle,rgba(0,242,255,.055) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)}
        .sp-scanlines{position:fixed;inset:0;z-index:0;pointer-events:none;background:repeating-linear-gradient(to bottom,transparent,transparent 3px,rgba(0,242,255,.009) 3px,rgba(0,242,255,.009) 4px);animation:scan 10s linear infinite}
        @keyframes scan{to{background-position:0 120px}}
        .sp-blob{position:fixed;border-radius:50%;filter:blur(140px);z-index:0;pointer-events:none}
        .spb1{width:60vw;height:60vw;background:radial-gradient(circle,rgba(0,100,255,.18),transparent 70%);top:-25%;left:-20%;animation:bf1 24s ease-in-out infinite alternate}
        .spb2{width:45vw;height:45vw;background:radial-gradient(circle,rgba(112,0,255,.16),transparent 70%);bottom:-15%;right:-10%;animation:bf2 30s ease-in-out infinite alternate}
        .spb3{width:30vw;height:30vw;background:radial-gradient(circle,rgba(0,242,255,.09),transparent 70%);top:45%;left:55%;animation:bf1 20s ease-in-out infinite alternate-reverse}
        @keyframes bf1{from{transform:translate(0,0) scale(1)}to{transform:translate(7%,11%) scale(1.09)}}
        @keyframes bf2{from{transform:translate(0,0) scale(1.04)}to{transform:translate(-5%,-9%) scale(1)}}
        .sp-content{position:relative;z-index:2}
        .section{padding:100px 0}
        .wrap{width:90%;max-width:1220px;margin:0 auto}
        .tag{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;background:rgba(0,242,255,.07);border:1px solid rgba(0,242,255,.2);border-radius:999px;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--cyan);margin-bottom:20px}
        .tag::before{content:'';width:6px;height:6px;background:var(--cyan);border-radius:50%;box-shadow:0 0 8px var(--cyan);animation:pdot 2s ease-in-out infinite;flex-shrink:0}
        @keyframes pdot{0%,100%{transform:scale(1)}50%{transform:scale(1.8);opacity:.5}}
        .section-title{font-family:var(--ff);font-size:clamp(2rem,4vw,3.4rem);font-weight:900;line-height:1.06;letter-spacing:-.04em;margin-bottom:14px}
        .gr{background:linear-gradient(100deg,var(--cyan) 0%,#4da6ff 50%,var(--purple) 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 20px rgba(0,242,255,.3));animation:gsweep 5s ease infinite}
        @keyframes gsweep{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .section-sub{color:var(--muted);font-size:1rem;line-height:1.75;max-width:580px}
        .reveal,.reveal-l,.reveal-r{opacity:0;transform:translateY(32px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
        .reveal-l{transform:translateX(-40px)}.reveal-r{transform:translateX(40px)}
        .reveal.visible,.reveal-l.visible,.reveal-r.visible{opacity:1;transform:none}
        .s1{padding:120px 0 80px;text-align:center}
        .tbadges{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:44px}
        .tbadge{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:var(--card);border:1px solid var(--border);border-radius:999px;font-size:.8rem;font-weight:700;backdrop-filter:blur(16px);transition:all .3s;animation:fbadge var(--fd,4s) ease-in-out infinite alternate}
        .tbadge:hover{border-color:var(--cyan);box-shadow:0 0 20px rgba(0,242,255,.2);transform:translateY(-4px) scale(1.05)}
        @keyframes fbadge{from{transform:translateY(0)}to{transform:translateY(-8px)}}
        .hero-cta{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:44px;flex-wrap:wrap}
        .btn-primary{display:inline-flex;align-items:center;gap:10px;padding:.95rem 2.2rem;background:linear-gradient(110deg,var(--blue),var(--cyan));color:#fff;font-family:var(--fb);font-weight:800;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;border:none;border-radius:8px;cursor:pointer;position:relative;overflow:hidden;transition:transform .2s,box-shadow .3s,letter-spacing .3s;box-shadow:0 0 28px rgba(0,123,255,.4);text-decoration:none}
        .btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.18) 50%,transparent 70%);transform:translateX(-100%) skewX(-15deg);transition:transform .55s ease}
        .btn-primary:hover::before{transform:translateX(200%) skewX(-15deg)}
        .btn-primary:hover{box-shadow:0 0 50px rgba(0,242,255,.55);letter-spacing:.14em}
        .btn-ghost{display:inline-flex;align-items:center;gap:8px;padding:.93rem 2.2rem;background:transparent;color:var(--text);font-family:var(--fb);font-weight:700;font-size:.85rem;letter-spacing:.06em;text-transform:uppercase;border:1px solid rgba(255,255,255,.2);border-radius:8px;cursor:pointer;transition:all .3s;text-decoration:none}
        .btn-ghost:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(0,242,255,.05)}
        .s2-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:56px;gap:40px;flex-wrap:wrap}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .scard{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:32px 28px;backdrop-filter:blur(20px);position:relative;overflow:hidden;cursor:pointer;transition:transform .35s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .3s}
        .scard::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(0,242,255,.07),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
        .scard:hover{border-color:rgba(0,242,255,.4);box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 40px rgba(0,242,255,.1)}
        .scard:hover::after{opacity:1}
        .scard.featured{border-color:rgba(0,242,255,.3);background:linear-gradient(135deg,rgba(0,100,255,.1),rgba(0,242,255,.05))}
        .scard-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:0;transition:opacity .3s}
        .scard:hover .scard-line{opacity:1}
        .scard-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}
        .scard-icon{width:52px;height:52px;border-radius:12px;background:rgba(0,242,255,.08);border:1px solid rgba(0,242,255,.2);display:flex;align-items:center;justify-content:center;font-size:1.5rem;transition:transform .3s,box-shadow .3s}
        .scard:hover .scard-icon{transform:scale(1.1) rotate(-5deg);box-shadow:0 0 24px rgba(0,242,255,.25)}
        .scard-badge{font-size:.6rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:rgba(0,255,136,.1);color:var(--green);border:1px solid rgba(0,255,136,.25)}
        .scard-badge.hot{background:rgba(0,123,255,.12);color:var(--cyan);border-color:rgba(0,123,255,.3)}
        .scard h3{font-family:var(--ff);font-size:1.15rem;font-weight:800;margin-bottom:10px;transition:color .3s}
        .scard:hover h3{color:var(--cyan)}
        .scard p{font-size:.83rem;color:var(--muted);line-height:1.65;margin-bottom:20px}
        .scard-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:22px}
        .stag{font-size:.65rem;font-weight:700;padding:4px 10px;border-radius:6px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:var(--muted)}
        .scard-arrow{display:flex;align-items:center;gap:6px;font-size:.78rem;font-weight:700;color:var(--muted);letter-spacing:.06em;text-transform:uppercase;transition:color .3s,gap .3s}
        .scard:hover .scard-arrow{color:var(--cyan);gap:10px}
        .s3{background:linear-gradient(180deg,transparent,rgba(0,20,60,.3),transparent)}
        .s3-header{text-align:center;margin-bottom:72px}
        .s3-header .section-sub{margin:0 auto}
        .process-line{position:relative}
        .process-track{position:absolute;top:42px;left:calc(50% - 1px);width:2px;height:calc(100% - 42px);background:linear-gradient(180deg,var(--cyan),var(--blue),var(--purple),transparent);opacity:.2}
        .pstep{display:grid;grid-template-columns:1fr 80px 1fr;align-items:center;margin-bottom:16px}
        .pstep:nth-child(odd) .pstep-content{grid-column:1;text-align:right}
        .pstep:nth-child(odd) .pstep-empty{grid-column:3}
        .pstep:nth-child(even) .pstep-content{grid-column:3;text-align:left}
        .pstep:nth-child(even) .pstep-empty{grid-column:1}
        .pstep-dot{grid-column:2;grid-row:1;display:flex;justify-content:center;align-items:center;z-index:2}
        .dot-num{width:56px;height:56px;border-radius:50%;background:var(--card);border:2px solid var(--cyan);display:flex;align-items:center;justify-content:center;font-family:var(--ff);font-size:1.1rem;font-weight:900;color:var(--cyan);box-shadow:0 0 20px rgba(0,242,255,.2);animation:breathe 3s ease-in-out infinite;transition:transform .3s,box-shadow .3s}
        .pstep:hover .dot-num{transform:scale(1.15);box-shadow:0 0 40px rgba(0,242,255,.5)}
        @keyframes breathe{0%,100%{box-shadow:0 0 20px rgba(0,242,255,.15)}50%{box-shadow:0 0 35px rgba(0,242,255,.35)}}
        .pstep-content{padding:28px 36px}
        .pstep-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:24px 22px;backdrop-filter:blur(16px);transition:all .3s}
        .pstep:hover .pstep-card{border-color:rgba(0,242,255,.3);box-shadow:0 0 30px rgba(0,242,255,.07)}
        .pstep-num-label{font-size:.62rem;text-transform:uppercase;letter-spacing:.14em;color:rgba(0,242,255,.5);margin-bottom:6px;font-weight:700}
        .pstep-card h4{font-family:var(--ff);font-size:1rem;font-weight:800;margin-bottom:8px;color:var(--cyan)}
        .pstep-card p{font-size:.82rem;color:var(--muted);line-height:1.65}
        .s4-header{text-align:center;margin-bottom:60px}
        .s4-header .section-sub{margin:0 auto}
        .tech-stack-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
        .tech-category-block{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;backdrop-filter:blur(16px);transition:border-color .3s}
        .tech-category-block:hover{border-color:rgba(0,242,255,.25)}
        .tcb-header{display:flex;align-items:center;gap:12px;margin-bottom:20px}
        .tcb-icon{width:40px;height:40px;border-radius:10px;background:rgba(0,242,255,.07);border:1px solid rgba(0,242,255,.15);display:flex;align-items:center;justify-content:center;font-size:1.1rem}
        .tcb-title{font-family:var(--ff);font-size:1rem;font-weight:800}
        .tech-pills{display:flex;flex-wrap:wrap;gap:8px}
        .tech-pill{display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);font-size:.75rem;font-weight:600;color:var(--muted);transition:all .25s;cursor:default}
        .tech-pill:hover{background:rgba(0,242,255,.08);border-color:rgba(0,242,255,.25);color:var(--text);transform:translateY(-2px)}
        .tech-pill-dot{width:6px;height:6px;border-radius:50%;background:var(--cyan);opacity:.6}
        .s5-header{text-align:center;margin-bottom:60px}
        .s5-header .section-sub{margin:0 auto}
        .industries-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:80px}
        .ind-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:24px 18px;backdrop-filter:blur(16px);text-align:center;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
        .ind-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:0;background:linear-gradient(0deg,rgba(0,242,255,.08),transparent);transition:height .3s}
        .ind-card:hover{border-color:rgba(0,242,255,.3);transform:translateY(-5px)}
        .ind-card:hover::before{height:100%}
        .ind-icon{font-size:2rem;margin-bottom:12px;display:block;transition:transform .3s}
        .ind-card:hover .ind-icon{transform:scale(1.2) rotate(-5deg)}
        .ind-card h4{font-family:var(--ff);font-size:.9rem;font-weight:800;margin-bottom:5px}
        .ind-card p{font-size:.72rem;color:var(--muted);line-height:1.5}
        .cta-banner{position:relative;border-radius:24px;background:linear-gradient(135deg,rgba(0,30,80,.9),rgba(20,0,60,.9));border:1px solid rgba(0,242,255,.2);padding:70px 60px;overflow:hidden;text-align:center}
        .cta-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 80% at 50% 50%,rgba(0,100,255,.15),transparent 70%);pointer-events:none}
        .cta-grid-bg{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(0,242,255,.06) 1px,transparent 1px);background-size:36px 36px;opacity:.5;pointer-events:none}
        .cta-corner{position:absolute;width:20px;height:20px}
        .cc-tl{top:-1px;left:-1px;border-top:2px solid var(--cyan);border-left:2px solid var(--cyan)}
        .cc-tr{top:-1px;right:-1px;border-top:2px solid var(--cyan);border-right:2px solid var(--cyan)}
        .cc-bl{bottom:-1px;left:-1px;border-bottom:2px solid var(--cyan);border-left:2px solid var(--cyan)}
        .cc-br{bottom:-1px;right:-1px;border-bottom:2px solid var(--cyan);border-right:2px solid var(--cyan)}
        .cta-stats{display:flex;justify-content:center;gap:40px;margin-bottom:40px;flex-wrap:wrap;position:relative;z-index:1}
        .cta-stat-num{display:block;font-family:var(--ff);font-size:2.2rem;font-weight:900;background:linear-gradient(90deg,var(--cyan),var(--blue));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
        .cta-stat-lbl{font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)}
        .cta-banner h2{font-family:var(--ff);font-size:clamp(1.8rem,3.5vw,3rem);font-weight:900;line-height:1.1;margin-bottom:16px;position:relative;z-index:1}
        .cta-banner p{color:var(--muted);font-size:1rem;max-width:560px;margin:0 auto 36px;line-height:1.7;position:relative;z-index:1}
        .cta-btns{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;position:relative;z-index:1}
        @media(max-width:1050px){.services-grid{grid-template-columns:repeat(2,1fr)}.tech-stack-grid{grid-template-columns:1fr}.industries-grid{grid-template-columns:repeat(2,1fr)}.pstep{grid-template-columns:1fr 60px 1fr}}
        @media(max-width:700px){.services-grid,.tech-stack-grid{grid-template-columns:1fr}.industries-grid{grid-template-columns:repeat(2,1fr)}.pstep{grid-template-columns:1fr;text-align:center!important}.pstep-dot{grid-column:1;margin:0 auto}.pstep:nth-child(n) .pstep-content{grid-column:1;text-align:center}.pstep:nth-child(n) .pstep-empty{display:none}.process-track{display:none}.cta-banner{padding:44px 24px}.s2-header{flex-direction:column;align-items:flex-start}}
      `}</style>

      <div className="sp-page">
        <canvas ref={canvasRef} className="sp-canvas" />
        <div className="sp-grid" />
        <div className="sp-scanlines" />
        <div className="sp-blob spb1" />
        <div className="sp-blob spb2" />
        <div className="sp-blob spb3" />

        <div className="sp-content">

          {/* ── SECTION 1: HERO ── */}
          <section className="s1 section reveal">
            <div className="wrap">
              <div className="tag">Our Services</div>
              <h1 className="section-title" style={{ maxWidth: 820, margin: "0 auto 16px" }}>
                We Build <span className="gr">Next-Generation</span>
                <br />Digital Solutions
              </h1>
              <p className="section-sub" style={{ margin: "0 auto 20px", textAlign: "center" }}>
                From AI-powered automation to enterprise SaaS platforms — we craft end-to-end digital
                products that drive measurable business growth for companies across the globe.
              </p>
              <div className="tbadges">
                {HERO_BADGES.map(([icon, label, fd]) => (
                  <div key={label} className="tbadge" style={{ ["--fd" as string]: fd }}>
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
              <div className="hero-cta">
                <a href="#services" className="btn-primary">
                  Explore Services
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="/contact" className="btn-ghost">Get Free Consultation</a>
              </div>
            </div>
          </section>

          {/* ── SECTION 2: SERVICE CARDS ── */}
          <section className="section" id="services" style={{ paddingTop: 60 }}>
            <div className="wrap">
              <div className="s2-header">
                <div className="reveal-l">
                  <div className="tag">What We Do</div>
                  <h2 className="section-title">
                    Services Built for
                    <br />
                    <span className="gr">Your Growth</span>
                  </h2>
                </div>
                <p className="section-sub reveal-r" style={{ maxWidth: 360, textAlign: "right" }}>
                  Comprehensive technology services tailored to transform your business vision into a
                  live, scalable product.
                </p>
              </div>
              <div className="services-grid">
                {SERVICES.map((s, i) => (
                  <TiltCard
                    key={s.title}
                    featured={!!s.featured}
                    className="reveal"
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    <div className="scard-line" />
                    <div className="scard-top">
                      <div className="scard-icon">{s.icon}</div>
                      <div className={`scard-badge${s.badgeClass ? " " + s.badgeClass : ""}`}>
                        {s.badge}
                      </div>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="scard-tags">
                      {s.tags.map((t) => (
                        <span key={t} className="stag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="scard-arrow">
                      Learn More
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECTION 3: PROCESS ── */}
          <section className="section s3">
            <div className="wrap">
              <div className="s3-header reveal">
                <div className="tag">Our Process</div>
                <h2 className="section-title">
                  How We Turn Ideas Into
                  <br />
                  <span className="gr">Shipped Products</span>
                </h2>
                <p className="section-sub">
                  A proven six-step process refined across 150+ successful projects — transparent,
                  agile, and obsessed with results.
                </p>
              </div>
              <div className="process-line">
                <div className="process-track" />
                {PROCESS.map((step, i) => {
                  const isOdd = i % 2 === 0;
                  return (
                    <div
                      key={step.n}
                      className="pstep reveal"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      {isOdd ? (
                        <>
                          <div className="pstep-content">
                            <div className="pstep-card">
                              <div className="pstep-num-label">Step {step.n}</div>
                              <h4>{step.title}</h4>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                          <div className="pstep-dot">
                            <div className="dot-num">{step.n}</div>
                          </div>
                          <div className="pstep-empty" />
                        </>
                      ) : (
                        <>
                          <div className="pstep-empty" />
                          <div className="pstep-dot">
                            <div className="dot-num">{step.n}</div>
                          </div>
                          <div className="pstep-content">
                            <div className="pstep-card">
                              <div className="pstep-num-label">Step {step.n}</div>
                              <h4>{step.title}</h4>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── SECTION 4: TECH STACK ── */}
          <section className="section">
            <div className="wrap">
              <div className="s4-header reveal">
                <div className="tag">Tech Stack</div>
                <h2 className="section-title">
                  Cutting-Edge Technologies
                  <br />
                  <span className="gr">We Master</span>
                </h2>
                <p className="section-sub">
                  We don't just know the latest tools — we use them in production across dozens of
                  client projects every year.
                </p>
              </div>
              <div className="tech-stack-grid reveal" style={{ transitionDelay: "0.1s" }}>
                {TECH_STACKS.map((tc) => (
                  <div key={tc.title} className="tech-category-block">
                    <div className="tcb-header">
                      <div className="tcb-icon">{tc.icon}</div>
                      <span className="tcb-title">{tc.title}</span>
                    </div>
                    <div className="tech-pills">
                      {tc.pills.map((p) => (
                        <div key={p} className="tech-pill">
                          <div className="tech-pill-dot" />
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECTION 5: INDUSTRIES + CTA ── */}
          <section className="section">
            <div className="wrap">
              <div className="s5-header reveal">
                <div className="tag">Industries We Serve</div>
                <h2 className="section-title">
                  Deep Expertise Across
                  <br />
                  <span className="gr">35+ Industries</span>
                </h2>
                <p className="section-sub">
                  From regulated healthcare and fintech to high-growth e-commerce and SaaS — we've
                  shipped products across the entire business spectrum.
                </p>
              </div>
              <div className="industries-grid reveal" style={{ transitionDelay: "0.1s" }}>
                {INDUSTRIES.map((ind) => (
                  <div key={ind.name} className="ind-card">
                    <span className="ind-icon">{ind.icon}</span>
                    <h4>{ind.name}</h4>
                    <p>{ind.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA Banner */}
              <div className="cta-banner reveal">
                <div className="cta-grid-bg" />
                <div className="cta-corner cc-tl" />
                <div className="cta-corner cc-tr" />
                <div className="cta-corner cc-bl" />
                <div className="cta-corner cc-br" />
                <div className="cta-stats">
                  {[
                    { ref: c1.ref, count: c1.count, label: "Projects Delivered" },
                    { ref: c2.ref, count: c2.count, label: "Happy Clients" },
                    { ref: c3.ref, count: c3.count, label: "Years of Excellence" },
                    { ref: c4.ref, count: c4.count, label: "Expert Engineers" },
                  ].map((s) => (
                    <div key={s.label}>
                      <span
                        ref={s.ref as React.RefObject<HTMLSpanElement>}
                        className="cta-stat-num"
                      >
                        {s.count}
                      </span>
                      <span className="cta-stat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>
                <h2>
                  Ready to Build Something
                  <br />
                  <span className="gr">Extraordinary?</span>
                </h2>
                <p>
                  Let's start with a free 30-minute strategy call. We'll map out your product roadmap,
                  estimate timelines and give you a clear path forward — no commitment required.
                </p>
                <div className="cta-btns">
                  <a href="/contact" className="btn-primary">
                    Book Free Strategy Call
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a href="/portfolio" className="btn-ghost">View Our Portfolio</a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default ServicesPage;
"use client";
import React, { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────────── */
const ENG_DATA = [
  {
    icon: "🏢", badge: "Offshore", hot: false,
    title: "Offshore Development Center",
    tagline: "Your dedicated engineering hub",
    desc: "We set up and operate a full Offshore Development Center tailored to your business. You get a dedicated, long-term team working exclusively on your products — with full transparency, IP ownership and seamless integration into your workflows.",
    features: ["Dedicated office space & infra", "Full IP ownership from day one", "Direct management control", "Scales from 5 to 200+ engineers", "Aligned time-zone working hours", "Monthly SLA & performance reports"],
    ideal: "Companies wanting a long-term offshore presence without the overhead of setting it up themselves.",
    cta: "Explore ODC Model",
  },
  {
    icon: "📌", badge: "Predictable", hot: false,
    title: "Fixed Price Model",
    tagline: "Crystal-clear scope, timeline & cost",
    desc: "When your requirements are well-defined, the Fixed Price Model gives you certainty. We agree on scope, deliverables, milestones and total cost upfront — then execute with zero surprises. Perfect for MVPs, redesigns or bounded feature builds.",
    features: ["Fixed budget — no hidden costs", "Defined milestones & deliverables", "Full risk ownership by our side", "Ideal for bounded scoped projects", "Formal acceptance testing", "Regular progress demos"],
    ideal: "Startups and enterprises with clear requirements who need budget certainty and a firm delivery date.",
    cta: "Start Fixed Price Project",
  },
  {
    icon: "🧑💻", badge: "Popular", hot: true,
    title: "Staff Augmentation",
    tagline: "Elite developers in your team",
    desc: "Instantly extend your in-house team with pre-vetted, senior engineers from our talent pool. They join your Slack, follow your processes and report to your managers — working like a seamless extension of your own team.",
    features: ["Onboard top talent in 1–2 weeks", "Pre-vetted, senior-level engineers", "You manage the work directly", "No long-term hiring commitments", "Scale up or down instantly", "NDA and IP agreements included"],
    ideal: "Tech teams that need to accelerate delivery quickly with specialist skills — without full-time hires.",
    cta: "Augment My Team",
  },
  {
    icon: "👥", badge: "Full Control", hot: false,
    title: "Dedicated Development Team",
    tagline: "Self-managed team for your product",
    desc: "We assemble a complete, cross-functional team — developers, QA engineers, UX designers and a project manager — fully dedicated to your product. The team owns velocity, quality and delivery, freeing you to focus on strategy and growth.",
    features: ["Full team: dev, QA, PM, design", "Long-term product focus & context", "Agile sprints with weekly demos", "Transparent reporting & metrics", "Proven Scrum & Kanban expertise", "Smooth knowledge transfer process"],
    ideal: "Product companies that want a reliable senior team to own development while leadership focuses on business.",
    cta: "Build My Team",
  },
  {
    icon: "🤝", badge: "Strategic", hot: false,
    title: "Build-Operate-Transfer (BOT)",
    tagline: "We build it, run it, hand it over",
    desc: "The BOT model lets us build your development capability from scratch, operate it until fully mature, then transfer complete ownership — team, processes, IP and infrastructure — to you. A risk-free path to your own offshore team.",
    features: ["We recruit, train & set up the team", "Operate with full SLAs in transition", "Complete IP & team transfer at close", "Zero upfront infrastructure cost", "Defined transition timeline (6–18 mo)", "Post-transfer knowledge support"],
    ideal: "Companies that want to own their offshore engineering capability long-term without the risk of building it alone.",
    cta: "Explore BOT Model",
  },
];

const SVC_CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "dev", label: "Development" },
  { id: "ai", label: "AI & Data" },
  { id: "cloud", label: "Cloud & Ops" },
  { id: "design", label: "Design & QA" },
];

const SVC_DATA = [
  { icon: "🤖", num: "01", cat: "ai",     title: "AI & Machine Learning",       desc: "LLM integrations, RAG pipelines, computer vision and NLP systems that automate work and unlock new revenue.",          tags: ["OpenAI", "LangChain", "TensorFlow", "MLOps"],     featured: true  },
  { icon: "🌐", num: "02", cat: "dev",    title: "Web Application Development", desc: "Fast, SEO-optimized SaaS platforms and web apps built with Next.js, React and scalable microservices.",              tags: ["Next.js", "React", "Node.js", "GraphQL"],          featured: false },
  { icon: "📱", num: "03", cat: "dev",    title: "Mobile App Development",      desc: "iOS, Android and cross-platform apps with React Native and Flutter for millions of daily active users.",             tags: ["React Native", "Flutter", "Swift", "Kotlin"],      featured: false },
  { icon: "⚙️", num: "04", cat: "dev",    title: "Custom Software & ERP",       desc: "Tailored enterprise systems, ERP and CRM that automate operations and scale with your business.",                     tags: ["ERP", "CRM", "SaaS", "Microservices"],             featured: false },
  { icon: "☁️", num: "05", cat: "cloud",  title: "Cloud & DevOps Engineering",  desc: "CI/CD pipelines, Kubernetes orchestration and AWS/GCP/Azure deployments with 24/7 monitoring.",                     tags: ["AWS", "Kubernetes", "Docker", "Terraform"],        featured: false },
  { icon: "📊", num: "06", cat: "ai",     title: "Data Science & Analytics",    desc: "Data pipelines, predictive models and real-time dashboards that turn raw data into actionable insight.",              tags: ["Apache Spark", "Power BI", "Python", "BigQuery"],  featured: false },
  { icon: "🎨", num: "07", cat: "design", title: "UI/UX Design",                desc: "Research-driven design systems, prototypes and user journeys that maximise conversion at every touchpoint.",          tags: ["Figma", "Prototyping", "Design System", "A/B"],    featured: false },
  { icon: "🧪", num: "08", cat: "design", title: "QA & Software Testing",       desc: "Automated and manual testing, load testing up to 10M requests and security audits before shipping.",                 tags: ["Selenium", "Jest", "Cypress", "k6"],               featured: false },
  { icon: "🔗", num: "09", cat: "dev",    title: "Software Integration",        desc: "Connect ERP, CRM, IoT and cloud apps with scalable APIs. Eliminate silos and automate data flows.",                  tags: ["REST", "GraphQL", "Webhooks", "iPaaS"],            featured: false },
  { icon: "🛡️", num: "10", cat: "cloud",  title: "Maintenance & Support",       desc: "24/7 monitoring, proactive maintenance and feature upgrades under strict SLA guarantees post-launch.",               tags: ["SLA", "Monitoring", "CI/CD", "Hotfixes"],          featured: false },
  { icon: "⚡", num: "11", cat: "dev",    title: "MVP Development",             desc: "Go from idea to live product in 6–10 weeks with a focused, investor-ready MVP that validates your market.",          tags: ["Rapid Prototyping", "Lean", "Agile", "Validation"], featured: false },
  { icon: "🤝", num: "12", cat: "cloud",  title: "Hire Dedicated Developers",   desc: "Access pre-vetted senior engineers who embed into your team, follow your processes and scale on demand.",           tags: ["Staff Aug", "Senior", "Remote", "Flexible"],       featured: false },
];

/* ─── ICONS ─────────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3L9 7L5 11" stroke="rgba(0,242,255,.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="rgba(0,242,255,.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const NavArrow = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2.5 7.5H12.5M12.5 7.5L8.5 3.5M12.5 7.5L8.5 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── PARTICLE CANVAS ─────────────────────────────────────────────── */
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, animId = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / W, y: e.clientY / H };
    };
    window.addEventListener("mousemove", onMove);

    interface Particle { x: number; y: number; vx: number; vy: number; r: number; a: number; blue: boolean }
    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.3 + 0.3,
      a: Math.random() * 0.35 + 0.08,
      blue: Math.random() > 0.55,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      const g1 = ctx.createRadialGradient(W * 0.3, H * 0.2, 0, W * 0.3, H * 0.2, W * 0.4);
      g1.addColorStop(0, "rgba(0,50,180,.04)"); g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x * W, my = mouseRef.current.y * H;

      // connections + cursor lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 95) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,160,255,${(1 - d / 95) * 0.065})`; ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
        const dx = particles[i].x - mx, dy = particles[i].y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) {
          ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(particles[i].x, particles[i].y);
          ctx.strokeStyle = `rgba(0,242,255,${(1 - d / 150) * 0.16})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }

      // update & draw
      particles.forEach((p) => {
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) { const f = Math.min(100 / d, 2.5); p.x += (dx / d) * f * 0.65; p.y += (dy / d) * f * 0.65; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.blue ? `rgba(0,242,255,${p.a})` : `rgba(60,100,255,${p.a})`; ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
};

/* ─── ENGAGEMENT MODELS ───────────────────────────────────────────── */
const EngagementModels: React.FC = () => {
  const [active, setActive] = useState(0);
  const d = ENG_DATA[active];

  return (
    <section style={{ position: "relative", zIndex: 2, padding: "90px 0" }}>
      <div style={{ width: "90%", maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag-pill">Engagement Models</div>
          <h2 className="hdr-title">
            Choose How You Want to<br />
            <span className="grad-txt">Work With Us</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".96rem", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
            Every project is different. We offer five flexible engagement models — each designed to match your goals, team size, budget and timeline.
          </p>
        </div>

        {/* Layout */}
        <div className="eng-layout">
          {/* Tabs */}
          <div className="eng-tabs">
            {ENG_DATA.map((e, i) => (
              <div
                key={i}
                className={`eng-tab${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
                data-interactive=""
              >
                <div className="eng-tab-icon">{e.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <span className="eng-tab-name">{e.title.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="eng-tab-hint">{e.tagline}</span>
                </div>
                <div className="eng-tab-arr"><ChevronRight /></div>
              </div>
            ))}
          </div>

          {/* Panel */}
          <div className="eng-panel" key={active}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
              <div className="panel-icon">{d.icon}</div>
              <div>
                <span className={`panel-badge${d.hot ? " hot" : ""}`}>{d.badge}</span>
                <div className="panel-h2">{d.title}</div>
                <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.65)" }}>{d.tagline}</div>
              </div>
            </div>
            <p style={{ fontSize: ".875rem", color: "rgba(255,255,255,.65)", lineHeight: 1.85 }}>{d.desc}</p>
            <div className="feats">
              {d.features.map((f) => (
                <div key={f} className="feat">
                  <div className="feat-ck"><CheckIcon /></div>
                  <span className="feat-txt">{f}</span>
                </div>
              ))}
            </div>
            <div className="ideal-box">
              <span className="ideal-lbl">Ideal&nbsp;For</span>
              <span style={{ fontSize: ".81rem", color: "rgba(255,255,255,.65)", lineHeight: 1.65 }}>{d.ideal}</span>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/contact" className="btn-p">{d.cta} <ArrowRight /></a>
              <a href="/services" className="btn-g">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICES SHOWCASE ───────────────────────────────────────────── */
const ServicesShowcase: React.FC = () => {
  const [activeCat, setActiveCat] = useState("all");
  const filtered = activeCat === "all" ? SVC_DATA : SVC_DATA.filter((s) => s.cat === activeCat);

  return (
    <section style={{ position: "relative", zIndex: 2, padding: "90px 0" }}>
      <div style={{ width: "90%", maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div className="svc-hdr">
          <div>
            <div className="tag-pill">What We Offer</div>
            <h2 className="hdr-title" style={{ textAlign: "left", marginBottom: 0 }}>
              End-to-End Services<br />for <span className="grad-txt">Every Stage</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
            <p style={{ fontSize: ".86rem", color: "rgba(255,255,255,.65)", maxWidth: 300, textAlign: "right", lineHeight: 1.7 }}>
              From first idea to post-launch support — we cover the full product lifecycle with specialist teams for every discipline.
            </p>
            <a href="/services" className="btn-g" data-interactive="">View All Services <ArrowRight /></a>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {SVC_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`cat-btn${activeCat === cat.id ? " active" : ""}`}
              onClick={() => setActiveCat(cat.id)}
              data-interactive=""
            >
              {cat.label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="svc-grid" key={activeCat}>
          {filtered.map((s, i) => (
            <div
              key={s.num}
              className={`svc-card${s.featured ? " feat" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
              data-interactive=""
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                <div className="svc-ico">{s.icon}</div>
                <span className="svc-num">{s.num}</span>
              </div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                {s.tags.map((t) => <span key={t} className="svc-tag">{t}</span>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <div className="svc-learn">Explore <ArrowRight /></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Band */}
        <div className="cta-band">
          <div className="cbc cbc-tl" /><div className="cbc cbc-br" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 className="cta-band-title">Not sure which service<br /><span className="grad-txt">fits your project?</span></h3>
            <p style={{ fontSize: ".87rem", color: "rgba(255,255,255,.65)", maxWidth: 460, lineHeight: 1.75 }}>
              Book a free 30-minute discovery call. Our senior engineers will assess your requirements and give you a clear, no-obligation roadmap.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexShrink: 0, position: "relative", zIndex: 1 }}>
            <a href="/contact" className="cband-btn-p" data-interactive="">Book Free Discovery Call <NavArrow /></a>
            <a href="/portfolio" className="cband-btn-g" data-interactive="">See Our Work</a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── PAGE ─────────────────────────────────────────────────────────── */
export default function EngagementAndServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700;800&family=Syne:wght@700;800;900&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --cyan: #00f2ff;
          --blue: #007bff;
          --purple: #7000ff;
          --green: #00ff88;
          --muted: rgba(255,255,255,.65);
          --card: rgba(5,15,38,.92);
          --border: rgba(0,242,255,.15);
          --ff: 'Syne', sans-serif;
          --fb: 'Space Grotesk', sans-serif;
        }

        body {
          background: #020b1e;
          color: #fff;
          font-family: var(--fb);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── TAG PILL ── */
        .tag-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 18px; background: rgba(0,242,255,.07);
          border: 1px solid rgba(0,242,255,.22); border-radius: 999px;
          font-size: .65rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--cyan); margin-bottom: 18px;
        }
        .tag-pill::before {
          content: ''; width: 6px; height: 6px; background: var(--cyan);
          border-radius: 50%; box-shadow: 0 0 8px var(--cyan);
          animation: pdot 2s ease-in-out infinite;
        }
        @keyframes pdot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(2);opacity:.4} }

        /* ── TYPOGRAPHY ── */
        .hdr-title {
          font-family: var(--ff); font-size: clamp(2rem,4vw,3.4rem);
          font-weight: 900; line-height: 1.06; letter-spacing: -.04em; margin-bottom: 14px;
        }
        .grad-txt {
          background: linear-gradient(110deg,var(--cyan) 0%,#4da6ff 45%,var(--purple) 100%);
          background-size: 200% 100%; -webkit-background-clip: text;
          background-clip: text; -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 14px rgba(0,242,255,.22));
          animation: gsweep 5s ease infinite;
        }
        @keyframes gsweep { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        /* ── ENGAGEMENT LAYOUT ── */
        .eng-layout {
          display: grid; grid-template-columns: 290px 1fr;
          background: var(--card); border: 1px solid var(--border);
          border-radius: 22px; overflow: hidden; backdrop-filter: blur(24px);
          box-shadow: 0 40px 120px rgba(0,0,0,.6); min-height: 510px; position: relative;
        }
        .eng-layout::before {
          content: ''; position: absolute; inset: 0; border-radius: 22px;
          background: radial-gradient(ellipse 60% 40% at 70% 0%,rgba(0,100,255,.07),transparent 60%);
          pointer-events: none; z-index: 0;
        }

        /* ── TABS ── */
        .eng-tabs {
          display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,.07);
          padding: 10px 0; position: relative; z-index: 1;
        }
        .eng-tab {
          display: flex; align-items: center; gap: 13px; padding: 18px 22px;
          cursor: pointer; border-left: 3px solid transparent;
          transition: background .25s, border-color .25s; user-select: none;
        }
        .eng-tab:hover { background: rgba(255,255,255,.03); }
        .eng-tab.active { background: rgba(0,120,255,.08); border-left-color: var(--cyan); }
        .eng-tab-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0; transition: all .3s;
        }
        .eng-tab.active .eng-tab-icon {
          background: rgba(0,242,255,.1); border-color: rgba(0,242,255,.3);
          box-shadow: 0 0 16px rgba(0,242,255,.2);
        }
        .eng-tab-name {
          font-family: var(--ff); font-size: .86rem; font-weight: 800;
          color: rgba(255,255,255,.45); display: block; transition: color .2s;
        }
        .eng-tab-hint {
          font-size: .66rem; color: rgba(255,255,255,.22);
          margin-top: 3px; display: block; line-height: 1.4;
        }
        .eng-tab:hover .eng-tab-name,
        .eng-tab.active .eng-tab-name { color: #fff; }
        .eng-tab.active .eng-tab-hint { color: rgba(0,242,255,.7); }
        .eng-tab-arr { margin-left: auto; flex-shrink: 0; opacity: 0; transition: opacity .25s, transform .25s; }
        .eng-tab.active .eng-tab-arr { opacity: 1; transform: translateX(3px); }

        /* ── PANEL ── */
        .eng-panel {
          padding: 44px 46px; display: flex; flex-direction: column;
          gap: 22px; position: relative; z-index: 1;
          animation: panelIn .4s cubic-bezier(.16,1,.3,1);
        }
        @keyframes panelIn { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:translateX(0)} }
        .panel-icon {
          width: 64px; height: 64px; border-radius: 14px;
          background: rgba(0,242,255,.08); border: 1px solid rgba(0,242,255,.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; flex-shrink: 0; box-shadow: 0 0 24px rgba(0,242,255,.12);
          animation: iconPop .45s cubic-bezier(.16,1,.3,1);
        }
        @keyframes iconPop { from{transform:scale(.6) rotate(-10deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
        .panel-badge {
          font-size: .6rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 999px; background: rgba(0,255,136,.1);
          color: var(--green); border: 1px solid rgba(0,255,136,.25);
          display: inline-block; margin-bottom: 8px;
        }
        .panel-badge.hot { background: rgba(0,123,255,.15); color: var(--cyan); border-color: rgba(0,242,255,.3); }
        .panel-h2 {
          font-family: var(--ff); font-size: 1.55rem; font-weight: 900;
          letter-spacing: -.03em; line-height: 1.1; margin-bottom: 4px; color: #fff;
        }

        /* ── FEATURES ── */
        .feats { display: grid; grid-template-columns: repeat(2,1fr); gap: 9px; }
        .feat {
          display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px;
          background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px; transition: all .3s;
        }
        .feat:hover {
          border-color: rgba(0,242,255,.25); background: rgba(0,242,255,.05);
          transform: translateX(4px);
        }
        .feat-ck {
          width: 20px; height: 20px; border-radius: 50%; background: rgba(0,242,255,.1);
          border: 1px solid rgba(0,242,255,.35); display: flex; align-items: center;
          justify-content: center; flex-shrink: 0; margin-top: 1px;
        }
        .feat-txt { font-size: .78rem; color: rgba(255,255,255,.75); line-height: 1.5; font-weight: 600; }

        /* ── IDEAL BOX ── */
        .ideal-box {
          display: flex; align-items: flex-start; gap: 10px; padding: 13px 16px;
          background: rgba(0,242,255,.04); border: 1px solid rgba(0,242,255,.13); border-radius: 10px;
        }
        .ideal-lbl {
          font-size: .62rem; text-transform: uppercase; letter-spacing: .13em;
          color: var(--cyan); font-weight: 700; flex-shrink: 0; margin-top: 2px; white-space: nowrap;
        }

        /* ── BUTTONS ── */
        .btn-p {
          display: inline-flex; align-items: center; gap: 8px; padding: .82rem 1.9rem;
          background: linear-gradient(110deg,var(--blue),var(--cyan)); color: #fff;
          font-family: var(--fb); font-weight: 800; font-size: .78rem; letter-spacing: .1em;
          text-transform: uppercase; border: none; border-radius: 8px; cursor: pointer;
          position: relative; overflow: hidden; text-decoration: none;
          transition: box-shadow .3s, letter-spacing .3s;
          box-shadow: 0 0 26px rgba(0,123,255,.38);
        }
        .btn-p::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(105deg,transparent 30%,rgba(255,255,255,.2) 50%,transparent 70%);
          transform: translateX(-120%) skewX(-15deg); transition: transform .55s ease;
        }
        .btn-p:hover::before { transform: translateX(220%) skewX(-15deg); }
        .btn-p:hover { box-shadow: 0 0 50px rgba(0,242,255,.5); letter-spacing: .14em; }
        .btn-g {
          display: inline-flex; align-items: center; gap: 8px; padding: .8rem 1.9rem;
          background: transparent; color: rgba(255,255,255,.85); font-family: var(--fb);
          font-weight: 700; font-size: .78rem; letter-spacing: .06em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.2); border-radius: 8px; cursor: pointer;
          transition: all .3s; text-decoration: none;
        }
        .btn-g:hover { border-color: var(--cyan); color: var(--cyan); background: rgba(0,242,255,.06); }

        /* ── SERVICES HEADER ── */
        .svc-hdr {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 40px; margin-bottom: 48px; flex-wrap: wrap;
        }

        /* ── CATEGORY BUTTONS ── */
        .cat-btn {
          padding: 7px 18px; border-radius: 999px; background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.5);
          font-size: .72rem; font-weight: 700; letter-spacing: .06em; cursor: pointer;
          transition: all .25s; text-transform: uppercase; user-select: none;
        }
        .cat-btn:hover { background: rgba(0,242,255,.07); border-color: rgba(0,242,255,.25); color: rgba(255,255,255,.85); }
        .cat-btn.active { background: rgba(0,242,255,.1); border-color: rgba(0,242,255,.38); color: var(--cyan); }

        /* ── SERVICE GRID ── */
        .svc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 15px; }

        /* ── SERVICE CARD ── */
        .svc-card {
          background: var(--card); border: 1px solid var(--border); border-radius: 16px;
          padding: 26px 22px; backdrop-filter: blur(20px); position: relative;
          overflow: hidden; cursor: pointer; display: flex; flex-direction: column;
          transition: transform .35s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
          animation: cardIn .4s ease both;
        }
        .svc-card.feat { border-color: rgba(0,242,255,.35); }
        .svc-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg,transparent,var(--cyan),transparent);
          opacity: 0; transition: opacity .3s;
        }
        .svc-card.feat::before { opacity: .6; }
        .svc-card:hover { transform: translateY(-8px); border-color: rgba(0,242,255,.45); box-shadow: 0 24px 60px rgba(0,0,0,.5),0 0 30px rgba(0,242,255,.1); }
        .svc-card:hover::before { opacity: 1; }
        @keyframes cardIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .svc-ico {
          width: 48px; height: 48px; border-radius: 12px; background: rgba(0,242,255,.07);
          border: 1px solid rgba(0,242,255,.16); display: flex; align-items: center;
          justify-content: center; font-size: 1.3rem;
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .3s; flex-shrink: 0;
        }
        .svc-card:hover .svc-ico { transform: scale(1.14) rotate(-7deg); box-shadow: 0 0 20px rgba(0,242,255,.25); }
        .svc-num { font-family: var(--ff); font-size: .72rem; font-weight: 900; color: rgba(255,255,255,.12); }
        .svc-title { font-family: var(--ff); font-size: .98rem; font-weight: 800; margin-bottom: 9px; transition: color .25s; line-height: 1.3; color: rgba(255,255,255,.95); }
        .svc-card:hover .svc-title { color: var(--cyan); }
        .svc-desc { font-size: .78rem; color: rgba(255,255,255,.6); line-height: 1.72; margin-bottom: 14px; flex: 1; }
        .svc-tag { font-size: .6rem; font-weight: 700; padding: 3px 8px; border-radius: 5px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); color: rgba(255,255,255,.4); }
        .svc-learn { display: flex; align-items: center; gap: 5px; font-size: .72rem; font-weight: 700; color: rgba(255,255,255,.45); letter-spacing: .06em; text-transform: uppercase; transition: color .25s, gap .25s; }
        .svc-card:hover .svc-learn { color: var(--cyan); gap: 8px; }

        /* ── CTA BAND ── */
        .cta-band {
          margin-top: 56px; border-radius: 18px;
          background: linear-gradient(115deg,rgba(0,15,60,.96),rgba(10,0,40,.96));
          border: 1px solid rgba(0,242,255,.2); padding: 50px 56px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 28px; flex-wrap: wrap; position: relative; overflow: hidden;
        }
        .cta-band::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 100% at 18% 50%,rgba(0,80,220,.14),transparent 60%);
          pointer-events: none;
        }
        .cta-band::after {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle,rgba(0,242,255,.05) 1px,transparent 1px);
          background-size: 34px 34px; opacity: .55; pointer-events: none;
          animation: dotMove 30s linear infinite;
        }
        @keyframes dotMove { from{background-position:0 0} to{background-position:68px 68px} }
        .cbc { position: absolute; width: 16px; height: 16px; }
        .cbc-tl { top: -1px; left: -1px; border-top: 2px solid var(--cyan); border-left: 2px solid var(--cyan); }
        .cbc-br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--cyan); border-right: 2px solid var(--cyan); }
        .cta-band-title { font-family: var(--ff); font-size: 1.65rem; font-weight: 900; line-height: 1.15; margin-bottom: 10px; }
        .cband-btn-p {
          display: inline-flex; align-items: center; gap: 10px; padding: .9rem 2rem;
          background: linear-gradient(110deg,var(--blue),var(--cyan)); color: #fff;
          font-family: var(--fb); font-weight: 800; font-size: .82rem; letter-spacing: .1em;
          text-transform: uppercase; border: none; border-radius: 8px; cursor: pointer;
          position: relative; overflow: hidden; text-decoration: none;
          transition: box-shadow .3s, letter-spacing .3s;
          box-shadow: 0 0 28px rgba(0,123,255,.4);
        }
        .cband-btn-p::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(105deg,transparent 30%,rgba(255,255,255,.2) 50%,transparent 70%);
          transform: translateX(-120%) skewX(-15deg); transition: transform .55s ease;
        }
        .cband-btn-p:hover::before { transform: translateX(220%) skewX(-15deg); }
        .cband-btn-p:hover { box-shadow: 0 0 50px rgba(0,242,255,.55); letter-spacing: .14em; }
        .cband-btn-g {
          display: inline-flex; align-items: center; gap: 8px; padding: .88rem 2rem;
          background: transparent; color: rgba(255,255,255,.85); font-family: var(--fb);
          font-weight: 700; font-size: .82rem; letter-spacing: .06em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.2); border-radius: 8px; cursor: pointer;
          transition: all .3s; text-decoration: none;
        }
        .cband-btn-g:hover { border-color: var(--cyan); color: var(--cyan); background: rgba(0,242,255,.06); }

        /* ── RIPPLE ── */
        @keyframes rippleOut { to{transform:translate(-50%,-50%) scale(4);opacity:0} }

        /* ── RESPONSIVE ── */
        @media(max-width:950px){
          .eng-layout{grid-template-columns:1fr}
          .eng-tabs{flex-direction:row;overflow-x:auto;border-right:none;border-bottom:1px solid rgba(255,255,255,.07);padding:0}
          .eng-tab{border-left:none;border-bottom:3px solid transparent;padding:13px 16px;flex-shrink:0;min-width:120px}
          .eng-tab.active{border-bottom-color:var(--cyan);border-left-color:transparent}
          .eng-tab-arr{display:none}
          .svc-grid{grid-template-columns:repeat(2,1fr)}
          .cta-band{flex-direction:column;padding:32px 28px}
        }
        @media(max-width:620px){
          .feats{grid-template-columns:1fr}
          .eng-panel{padding:22px 18px}
          .svc-grid{grid-template-columns:1fr}
          .svc-hdr{flex-direction:column}
        }
      `}</style>

      <ParticleCanvas />
      <EngagementModels />
      <ServicesShowcase />
    </>
  );
}
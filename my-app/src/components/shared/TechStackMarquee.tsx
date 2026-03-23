"use client";

import React, { useEffect, useRef, useState } from "react";
import "./TechStackMarquee.css";

const technologies = [
  // Cloud & Infrastructure
  { name: "AWS",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", category: "Cloud" },
  { name: "Azure",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",                              category: "Cloud" },
  { name: "Google Cloud",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",                  category: "Cloud" },
  // Data & Analytics
  { name: "Databricks",    logo: "https://cdn.simpleicons.org/databricks/FF3621",                                                                   category: "Data" },
  { name: "Snowflake",     logo: "https://cdn.simpleicons.org/snowflake/29B5E8",                                                                    category: "Data" },
  { name: "Oracle",        logo: "https://cdn.simpleicons.org/oracle/F80000",                                                                       category: "Data" },
  // Platform & Integration
  { name: "ServiceNow",    logo: "https://cdn.simpleicons.org/servicenow/62D84E",                                                                   category: "Platform" },
  { name: "MuleSoft",      logo: "https://cdn.simpleicons.org/mulesoft/00A1DF",                                                                     category: "Integration" },
  { name: "Stripe",        logo: "https://cdn.simpleicons.org/stripe/635BFF",                                                                       category: "Payments" },
  // Creative & Commerce
  { name: "Adobe",         logo: "https://cdn.simpleicons.org/adobe/FF0000",                                                                        category: "Creative" },
  { name: "Magento",       logo: "https://cdn.simpleicons.org/magento/EE672F",                                                                      category: "Commerce" },
  { name: "HubSpot",       logo: "https://cdn.simpleicons.org/hubspot/FF7A59",                                                                      category: "CRM" },
  { name: "Cloudinary",    logo: "https://cdn.simpleicons.org/cloudinary/3448C5",                                                                   category: "Media" },
  { name: "Shopify",       logo: "https://cdn.simpleicons.org/shopify/96BF48",                                                                      category: "Commerce" },
  { name: "WordPress",     logo: "https://cdn.simpleicons.org/wordpress/21759B",                                                                    category: "CMS" },
  // Frontend
  { name: "React",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",                             category: "Frontend" },
  { name: "Next.js",       logo: "https://cdn.simpleicons.org/nextdotjs/ffffff",                                                                    category: "Frontend" },
  { name: "Vue.js",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",                             category: "Frontend" },
  { name: "Angular",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",                     category: "Frontend" },
  { name: "Tailwind CSS",  logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",                                                                  category: "Frontend" },
  // Languages
  { name: "TypeScript",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",                   category: "Language" },
  { name: "Python",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",                           category: "Language" },
  { name: "PHP",           logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",                                 category: "Language" },
  { name: "Java",          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",                               category: "Language" },
  // Backend
  { name: "Node.js",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",                          category: "Backend" },
  { name: "Laravel",       logo: "https://cdn.simpleicons.org/laravel/FF2D20",                                                                      category: "Backend" },
  { name: "GraphQL",       logo: "https://cdn.simpleicons.org/graphql/E10098",                                                                      category: "Backend" },
  // DevOps & Infra
  { name: "Docker",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",                          category: "DevOps" },
  { name: "Kubernetes",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",                      category: "DevOps" },
  { name: "GitHub",        logo: "https://cdn.simpleicons.org/github/ffffff",                                                                       category: "DevOps" },
  { name: "GitLab",        logo: "https://cdn.simpleicons.org/gitlab/FC6D26",                                                                       category: "DevOps" },
  { name: "Terraform",     logo: "https://cdn.simpleicons.org/terraform/7B42BC",                                                                    category: "DevOps" },
  { name: "Jenkins",       logo: "https://cdn.simpleicons.org/jenkins/D24939",                                                                      category: "DevOps" },
  // Databases
  { name: "MongoDB",       logo: "https://cdn.simpleicons.org/mongodb/47A248",                                                                      category: "Database" },
  { name: "PostgreSQL",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",                   category: "Database" },
  { name: "MySQL",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",                            category: "Database" },
  { name: "Redis",         logo: "https://cdn.simpleicons.org/redis/FF4438",                                                                        category: "Database" },
  { name: "Elasticsearch", logo: "https://cdn.simpleicons.org/elasticsearch/005571",                                                               category: "Search" },
  // AI / ML
  { name: "TensorFlow",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",                   category: "AI/ML" },
  { name: "OpenAI",        logo: "https://cdn.simpleicons.org/openai/ffffff",                                                                       category: "AI/ML" },
  { name: "Figma",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",                            category: "Design" },
];

// Category colour map
const catColor: Record<string, string> = {
  "Cloud":       "0,242,255",
  "Data":        "0,123,255",
  "Platform":    "139,92,246",
  "Integration": "0,242,255",
  "Payments":    "0,200,150",
  "Creative":    "255,80,80",
  "Commerce":    "255,140,0",
  "CRM":         "255,165,0",
  "Media":       "0,123,255",
  "Frontend":    "0,242,255",
  "Language":    "139,92,246",
  "Backend":     "0,200,150",
  "DevOps":      "0,123,255",
  "CMS":         "139,92,246",
  "Search":      "255,140,0",
  "Database":    "0,200,150",
  "AI/ML":       "255,80,80",
  "Design":      "139,92,246",
};

// Split 41 techs across 3 rows — tripled for seamless loop
const row1 = [...technologies.slice(0,  14), ...technologies.slice(0,  14), ...technologies.slice(0,  14)];
const row2 = [...technologies.slice(14, 28), ...technologies.slice(14, 28), ...technologies.slice(14, 28)];
const row3 = [...technologies.slice(28),     ...technologies.slice(28),     ...technologies.slice(28),
              ...technologies.slice(0, 3),   ...technologies.slice(0, 3),   ...technologies.slice(0, 3)];

// ── Tech Card ─────────────────────────────────────────────────
function TechCard({ tech }: { tech: typeof technologies[0] }) {
  const rgb = catColor[tech.category] ?? "0,242,255";
  return (
    <div
      className="tsm-card"
      style={{ "--accent-rgb": rgb, "--accent": `rgb(${rgb})` } as React.CSSProperties}
    >
      <div className="tsm-card-glow" />
      <div className="tsm-card-topline" />

      <div className="tsm-logo-wrap">
        <img src={tech.logo} alt={tech.name} className="tsm-logo" loading="lazy" />
        <div className="tsm-logo-shine" />
      </div>

      <p className="tsm-name">{tech.name}</p>
      <span className="tsm-cat">{tech.category}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
const TechStackMarquee: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="tsm-section" ref={sectionRef}>
      {/* Backgrounds */}
      <div className="tsm-bg-grid" />
      <div className="tsm-blob tsm-blob-1" />
      <div className="tsm-blob tsm-blob-2" />
      <div className="tsm-blob tsm-blob-3" />
      <div className="tsm-scanlines" />
      <div className="tsm-noise" />

      {/* ── Header ── */}
      <div className="tsm-container">
        <div className={`tsm-header tsm-reveal ${revealed ? "tsm-revealed" : ""}`}>
          <div className="tsm-eyebrow">
            <span className="tsm-eyebrow-dot" />
            Tech Stack
          </div>

          <h2 className="tsm-heading">
            Technologies{" "}
            <span className="tsm-heading-accent">We Work With</span>
          </h2>

          <p className="tsm-subheading">
            We leverage leading platforms and tools to build robust, scalable solutions
            across every layer of the stack.
          </p>

          {/* Count pill */}
          <div className="tsm-count-pill">
            <span className="tsm-count-val">40+</span>
            <span className="tsm-count-sep" />
            <span className="tsm-count-label">Technologies & Platforms</span>
          </div>
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div
        className={`tsm-rows tsm-reveal ${revealed ? "tsm-revealed" : ""}`}
        style={{ transitionDelay: "0.25s" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Row 1 → left */}
        <div className="tsm-row-wrap">
          <div className="tsm-fade-l" /><div className="tsm-fade-r" />
          <div className={`tsm-track tsm-track-l ${paused ? "tsm-paused" : ""}`}>
            {row1.map((t, i) => <TechCard key={`r1-${i}`} tech={t} />)}
          </div>
        </div>

        {/* Row 2 → right */}
        <div className="tsm-row-wrap">
          <div className="tsm-fade-l" /><div className="tsm-fade-r" />
          <div className={`tsm-track tsm-track-r ${paused ? "tsm-paused" : ""}`}>
            {row2.map((t, i) => <TechCard key={`r2-${i}`} tech={t} />)}
          </div>
        </div>

        {/* Row 3 → left (slower) */}
        <div className="tsm-row-wrap">
          <div className="tsm-fade-l" /><div className="tsm-fade-r" />
          <div className={`tsm-track tsm-track-l tsm-track-slow ${paused ? "tsm-paused" : ""}`}>
            {row3.map((t, i) => <TechCard key={`r3-${i}`} tech={t} />)}
          </div>
        </div>
      </div>

      {/* ── Bottom stats bar ── */}
      <div className="tsm-container">
        <div className={`tsm-stats tsm-reveal ${revealed ? "tsm-revealed" : ""}`}
          style={{ transitionDelay: "0.4s" }}>
          {[
            { val: "40+", label: "Integrations",    color: "cyan"   },
            { val: "10+",  label: "Categories",      color: "blue"   },
            { val: "5★",  label: "Certified Team",  color: "gold"   },
            { val: "∞",   label: "Scalability",     color: "purple" },
          ].map((s, i) => (
            <div key={i} className={`tsm-stat tsm-stat-${s.color}`}>
              <span className="tsm-stat-val">{s.val}</span>
              <span className="tsm-stat-label">{s.label}</span>
            </div>
          ))}
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

export default TechStackMarquee;
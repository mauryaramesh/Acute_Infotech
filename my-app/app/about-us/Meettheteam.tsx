"use client";

import React, { useEffect, useRef, useState } from "react";
import "./MeetTheTeam.css";

const team = [
  {
    name: "Rahul Mehta",
    role: "Founder & CEO",
    bio: "Visionary behind Acute Infosoft. 10+ years in enterprise software and digital transformation.",
    skills: ["Strategy", "Leadership", "Product"],
    accent: "#00f2ff", accentRgb: "0,242,255",
    initials: "RM",
    linkedin: "#", twitter: "#",
    tag: "Founder",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    bio: "Crafts pixel-perfect experiences with a philosophy of design that drives conversion, not just compliments.",
    skills: ["Figma", "UX Research", "Design Systems"],
    accent: "#8b5cf6", accentRgb: "139,92,246",
    initials: "PS",
    linkedin: "#", twitter: "#",
    tag: "Design Lead",
  },
  {
    name: "Arjun Patel",
    role: "Lead Backend Engineer",
    bio: "Architect of scalable, secure systems. Loves distributed systems, clean APIs, and strong coffee.",
    skills: ["Node.js", "AWS", "PostgreSQL"],
    accent: "#007bff", accentRgb: "0,123,255",
    initials: "AP",
    linkedin: "#", twitter: "#",
    tag: "Tech Lead",
  },
  {
    name: "Sneha Joshi",
    role: "Frontend Architect",
    bio: "Turns complex requirements into smooth, fast, accessible interfaces. React evangelist.",
    skills: ["React", "Next.js", "TypeScript"],
    accent: "#00c896", accentRgb: "0,200,150",
    initials: "SJ",
    linkedin: "#", twitter: "#",
    tag: "Frontend",
  },
  {
    name: "Dev Kapoor",
    role: "AI/ML Engineer",
    bio: "Bridges the gap between cutting-edge AI research and production-ready applications.",
    skills: ["Python", "LLMs", "TensorFlow"],
    accent: "#ff5050", accentRgb: "255,80,80",
    initials: "DK",
    linkedin: "#", twitter: "#",
    tag: "AI/ML",
  },
  {
    name: "Neha Gupta",
    role: "Project Manager",
    bio: "The glue that holds everything together. On-time, on-budget, zero chaos.",
    skills: ["Agile", "Jira", "Stakeholder Mgmt"],
    accent: "#f59e0b", accentRgb: "245,158,11",
    initials: "NG",
    linkedin: "#", twitter: "#",
    tag: "Operations",
  },
  {
    name: "Vikram Singh",
    role: "DevOps Engineer",
    bio: "Makes deployment feel like magic. Zero-downtime releases, bulletproof pipelines.",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    accent: "#007bff", accentRgb: "0,123,255",
    initials: "VS",
    linkedin: "#", twitter: "#",
    tag: "DevOps",
  },
  {
    name: "Ananya Roy",
    role: "Business Analyst",
    bio: "Translates business problems into technical blueprints. Fluent in both boardrooms and standups.",
    skills: ["Requirements", "Wireframing", "Roadmapping"],
    accent: "#8b5cf6", accentRgb: "139,92,246",
    initials: "AR",
    linkedin: "#", twitter: "#",
    tag: "Strategy",
  },
];

function TeamCard({ member, index, revealed }: { member: typeof team[0]; index: number; revealed: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`mtt-card mtt-reveal ${revealed ? "mtt-revealed" : ""}`}
      style={{
        "--accent": member.accent,
        "--accent-rgb": member.accentRgb,
        transitionDelay: `${0.06 * index}s`,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mtt-card-glow" />
      <div className="mtt-card-topline" />

      {/* Tag */}
      <span className="mtt-tag">{member.tag}</span>

      {/* Avatar */}
      <div className="mtt-avatar-wrap">
        {hovered && <div className="mtt-avatar-pulse" />}
        <div className="mtt-avatar-ring" />
        <div className="mtt-avatar">
          <span className="mtt-initials">{member.initials}</span>
          <div className="mtt-avatar-shine" />
        </div>
      </div>

      {/* Info */}
      <div className="mtt-info">
        <h3 className="mtt-name">{member.name}</h3>
        <p className="mtt-role">{member.role}</p>
        <p className="mtt-bio">{member.bio}</p>

        {/* Skills */}
        <div className="mtt-skills">
          {member.skills.map(s => (
            <span key={s} className="mtt-skill">{s}</span>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="mtt-social">
        <a href={member.linkedin} className="mtt-soc-btn" aria-label="LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
        <a href={member.twitter} className="mtt-soc-btn" aria-label="Twitter">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
          </svg>
        </a>
      </div>

      {/* Bottom number */}
      <div className="mtt-num">0{index + 1}</div>
    </div>
  );
}

const MeetTheTeam: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="mtt-section" ref={sectionRef}>
      <div className="mtt-bg-grid" />
      <div className="mtt-blob mtt-blob-1" />
      <div className="mtt-blob mtt-blob-2" />
      <div className="mtt-blob mtt-blob-3" />
      <div className="mtt-scanlines" />
      <div className="mtt-noise" />

      <div className="mtt-container">

        {/* Header */}
        <div className={`mtt-header mtt-reveal ${revealed ? "mtt-revealed" : ""}`}>
          <div className="mtt-eyebrow"><span className="mtt-eyebrow-dot" />The People</div>
          <h2 className="mtt-heading">
            Meet The <span className="mtt-heading-accent">Brilliant Minds</span>
          </h2>
          <p className="mtt-subheading">
            A hand-picked team of engineers, designers, and strategists who live and breathe
            digital excellence every single day.
          </p>
        </div>

        {/* Grid */}
        <div className="mtt-grid">
          {team.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} revealed={revealed} />
          ))}
        </div>

        {/* Hiring CTA */}
        <div className={`mtt-hiring mtt-reveal ${revealed ? "mtt-revealed" : ""}`}
          style={{ transitionDelay: `${0.06 * team.length + 0.1}s` }}>
          <div className="mtt-hiring-l">
            <span className="mtt-hiring-icon">🚀</span>
            <div>
              <p className="mtt-hiring-title">We're always looking for exceptional talent.</p>
              <p className="mtt-hiring-sub">Think you belong here? We'd love to hear from you.</p>
            </div>
          </div>
          <a href="/careers" className="mtt-hiring-btn">
            View Open Roles
            <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default MeetTheTeam;
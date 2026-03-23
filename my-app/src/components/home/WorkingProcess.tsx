"use client";

import React, { useEffect, useRef, useState } from "react";
import "./WorkingProcess.css";

const steps = [
  {
    id: 1,
    title: "Requirement Gathering",
    description: "Strategic insights shaping clear project direction.",
    detail: "Deep-dive discovery sessions, stakeholder interviews, and competitive analysis to define the project scope.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Analysis & Planning",
    description: "Structured planning for efficient, scalable outcomes.",
    detail: "Architecture decisions, tech stack selection, sprint planning, and risk assessment to set a clear roadmap.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Design",
    description: "User-centric designs crafted for lasting impact.",
    detail: "Wireframes, high-fidelity UI mockups, design systems, and interactive prototypes reviewed with stakeholders.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Development",
    description: "Robust engineering powering reliable digital solutions.",
    detail: "Agile sprints, clean code practices, CI/CD pipelines, and regular demos keeping you in the loop.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Testing & QA",
    description: "Precision testing ensuring uncompromised performance.",
    detail: "Automated test suites, manual QA, performance benchmarking, and security audits before release.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Deployment",
    description: "Seamless deployment enabling smooth go-live operations.",
    detail: "Zero-downtime deployments, cloud infrastructure setup, monitoring dashboards, and rollback strategies.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Maintenance & Support",
    description: "Proactive support sustaining long-term product excellence.",
    detail: "24/7 monitoring, bug fixes, performance optimizations, and feature iterations based on user feedback.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: 8,
    title: "Success",
    description: "Celebrating shared victory and continuous growth.",
    detail: "Analytics reviews, growth planning, and celebrating milestones — your success is our success.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
      </svg>
    ),
  },
];

const WorkingProcess: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="wp-section" ref={sectionRef}>
      {/* Background */}
      <div className="wp-bg-grid" />
      <div className="wp-bg-blob wp-blob-1" />
      <div className="wp-bg-blob wp-blob-2" />
      <div className="wp-scanlines" />
      <div className="wp-noise" />

      <div className="wp-container">

        {/* ── Header ── */}
        <div className={`wp-header wp-reveal ${revealed ? "wp-revealed" : ""}`}>
          <div className="wp-eyebrow">
            <span className="wp-eyebrow-dot" />
            Our Workflow
          </div>
          <h2 className="wp-heading">
            Our Approach to{" "}
            <span className="wp-heading-accent">Success</span>
          </h2>
          <p className="wp-subheading">
            A structured development lifecycle designed to turn complex visions into
            seamless, high-performing digital realities.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="wp-grid">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`wp-reveal wp-card-outer ${revealed ? "wp-revealed" : ""}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* SVG Connector arrow between cards */}
              {idx % 4 !== 3 && idx < 7 && (
                <div className={`wp-connector ${revealed ? "live" : ""}`}>
                  <svg viewBox="0 0 60 20" className="wp-conn-svg">
                    <line x1="0" y1="10" x2="48" y2="10" className="wp-conn-line" />
                    <polyline points="40,4 52,10 40,16" className="wp-conn-arrow" />
                    <circle className="wp-conn-dot" r="3" cx="0" cy="10">
                      <animateMotion dur="1.8s" repeatCount="indefinite" path="M0,0 H48" />
                    </circle>
                  </svg>
                </div>
              )}

              <div
                className={`wp-card ${activeStep === step.id ? "active" : ""}`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Background large number */}
                <div className="wp-bg-num">{String(step.id).padStart(2, "0")}</div>

                {/* Top glow line */}
                <div className="wp-card-topline" />

                {/* Step badge */}
                <div className="wp-step-badge">
                  <span className="wp-step-badge-dot" />
                  {String(step.id).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="wp-icon-wrap">
                  <div className="wp-icon-glow" />
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="wp-card-title">{step.title}</h3>
                <p className="wp-card-desc">{step.description}</p>

                {/* Expandable detail */}
                <div className="wp-card-detail">
                  <div className="wp-detail-divider" />
                  <p className="wp-detail-text">{step.detail}</p>
                </div>

                {/* Per-card progress bar */}
                <div className="wp-card-progress">
                  <div
                    className="wp-card-progress-fill"
                    style={{
                      width: revealed ? `${(step.id / steps.length) * 100}%` : "0%",
                      transitionDelay: `${0.5 + idx * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Global progress track ── */}
        <div
          className={`wp-progress-track wp-reveal ${revealed ? "wp-revealed" : ""}`}
          style={{ transitionDelay: "0.9s" }}
        >
          <span className="wp-progress-label">Process completion</span>
          <div className="wp-progress-bar-wrap">
            <div className={`wp-progress-fill ${revealed ? "animate" : ""}`} />
            <div className={`wp-progress-glow ${revealed ? "animate" : ""}`} />
          </div>
          <span className="wp-progress-pct">100%</span>
        </div>

      </div>
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default WorkingProcess;
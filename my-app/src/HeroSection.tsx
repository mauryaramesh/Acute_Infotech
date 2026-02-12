"use client";

import React from "react";
import "./HeroSection.css";
import logo from './assets/images/acute_right_1.png';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">

      <div className="hero-container">

        {/* LEFT SIDE TEXT */}
        <div className="hero-left">

          <h1 className="hero-title">
            We turn your ideas into extraordinary digital products
          </h1>

          <p className="hero-description">
            We build custom SOFTWARE and APPS for our customers to run their
            business efficiently!
          </p>

          <a href="/contact" className="hero-button">
            Get A Quote
          </a>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero-right">
          <img
           src={logo.src}
            alt="Digital Product"
            className="hero-image"
          />
        </div>

      </div>

    </section>
  );
};

export default HeroSection;

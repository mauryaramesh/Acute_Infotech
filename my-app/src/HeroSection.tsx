"use client";

import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import logo from './assets/images/acute_right_1.png';

// Floating particles data
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 12,
}));

const heroImages = [
  logo.src,
  "/right_2.webp",
  "/right_3.webp",
 
];

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section py-24 md:py-32 bg-white relative">
      <div className="hero-container">
        {/* Static decorative assets (No parallax) */}
        <div className="absolute top-20 right-10 w-24 h-24 opacity-20 pointer-events-none">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_After_Effects_CC_icon.svg" alt="AE" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-40 left-10 w-32 h-32 opacity-10 pointer-events-none">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vercel_logo_black.svg" alt="Vercel" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-0 left-1/4 w-16 h-16 opacity-10 pointer-events-none">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="w-full h-full object-contain" />
        </div>

        {/* LEFT SIDE TEXT */}
        <div className="hero-left">
          <h1 className="hero-title text-black">
            We turn your ideas into extraordinary digital products
          </h1>

          <p className="hero-description text-gray-700">
            We build custom SOFTWARE and APPS for our customers to run their
            business efficiently!
          </p>

          <a
            href="/contact"
            className="neo-button text-lg"
            style={{ backgroundColor: '#007bff' }}
          >
            Get A Quote
          </a>
        </div>

        {/* RIGHT SIDE IMAGE SCROLL */}
        <div className="hero-right">
         <div className="hero-image-wrapper bg-white overflow-hidden">
            <div className="hero-image-track">
              {heroImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Digital Product ${index + 1}`}
                  className="hero-image-item"
                />
              ))}
              {/* Duplicate first image for seamless loop */}
              <img
                src={heroImages[0]}
                alt="Digital Product Duplicate"
                className="hero-image-item"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;

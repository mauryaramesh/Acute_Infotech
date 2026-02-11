import React from 'react';
import './Navbar.css';
import logo from './assets/images/Acute_InfoSoft_logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side - Image */}
        <div className="navbar-left">
          <img 
            src={logo.src} 
            alt="Acute InfoSoft Logo" 
            className="navbar-logo"
          />
        </div>

        {/* Right Side - Content */}
        <div className="navbar-right">
          <ul className="navbar-menu">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/career">Career</a></li>
            <li><a href="/contact" className="navbar-button">Let's Talk</a></li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

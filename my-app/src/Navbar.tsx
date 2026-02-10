import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side - Image */}
        <div className="navbar-left">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="navbar-logo"
          />
        </div>

        {/* Right Side - Content */}
        <div className="navbar-right">
          <ul className="navbar-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

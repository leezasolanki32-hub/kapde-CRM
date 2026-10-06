import React, { useEffect, useState } from 'react';
import './HeroStoryAnimation.css';

const CLOTHES = [
  // 1. Yellow Dress
  <g key="yellow">
    <path d="M25 -5 C 25 -10, 35 -10, 30 0" stroke="#1e293b" strokeWidth="2" fill="none" />
    <polygon points="30,0 15,6 45,6" fill="none" stroke="#1e293b" strokeWidth="2" />
    <path d="M 20 6 Q 15 25 10 70 L 5 115 L 55 115 L 50 70 Q 45 25 40 6 Q 30 15 20 6 Z" fill="#fbbf24" />
    <circle cx="30" cy="40" r="8" fill="#ffffff" />
  </g>,
  // 2. Teal Jacket
  <g key="teal">
    <path d="M25 -5 C 25 -10, 35 -10, 30 0" stroke="#1e293b" strokeWidth="2" fill="none" />
    <polygon points="30,0 15,6 45,6" fill="none" stroke="#1e293b" strokeWidth="2" />
    <path d="M 15 6 L 5 40 L 15 40 L 20 70 L 40 70 L 45 40 L 55 40 L 45 6 Z" fill="#14b8a6" />
    <line x1="30" y1="6" x2="30" y2="70" stroke="#0f766e" strokeWidth="2" />
  </g>,
  // 3. Pink Shirt
  <g key="pink">
    <path d="M25 -5 C 25 -10, 35 -10, 30 0" stroke="#1e293b" strokeWidth="2" fill="none" />
    <polygon points="30,0 15,6 45,6" fill="none" stroke="#1e293b" strokeWidth="2" />
    <path d="M 15 6 L 5 30 L 15 35 L 15 65 L 45 65 L 45 35 L 55 30 L 45 6 Z" fill="#f472b6" />
  </g>
];

const HeroStoryAnimation = () => {
  const [isStopped, setIsStopped] = useState(false);
  const [clothIndex, setClothIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setIsStopped(false); // start walking (0ms)
      
      setTimeout(() => {
        setIsStopped(true); // stop at 900ms
      }, 900);

      setTimeout(() => {
        setIsStopped(false); // run back at 5100ms
        setClothIndex(prev => (prev + 1) % CLOTHES.length);
      }, 5100);
      
    }, 6000);

    // Initial run
    setTimeout(() => { setIsStopped(true); }, 900);
    setTimeout(() => { 
      setIsStopped(false); 
      setClothIndex(prev => (prev + 1) % CLOTHES.length);
    }, 5100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-story-container">
      {/* Ground Line */}
      <div className="story-ground"></div>
      
      {/* Right Side: Detailed Clothing Shop Boutique */}
      <div className="story-shop">
        <svg viewBox="0 0 800 450" className="shop-rack">
          {/* Background merged with Hero container */}

          {/* Left Window */}
          <path d="M 100 150 A 75 75 0 0 1 250 150 L 250 300 L 100 300 Z" fill="#bce4ee" />
          <path d="M 100 150 A 75 75 0 0 1 250 150" fill="none" stroke="#ffffff" strokeWidth="6" />
          <line x1="100" y1="150" x2="250" y2="150" stroke="#ffffff" strokeWidth="6" />
          <line x1="175" y1="75" x2="175" y2="300" stroke="#ffffff" strokeWidth="6" />

          {/* Right Window */}
          <path d="M 550 150 A 75 75 0 0 1 700 150 L 700 300 L 550 300 Z" fill="#bce4ee" />
          <path d="M 550 150 A 75 75 0 0 1 700 150" fill="none" stroke="#ffffff" strokeWidth="6" />
          <line x1="550" y1="150" x2="700" y2="150" stroke="#ffffff" strokeWidth="6" />
          <line x1="625" y1="75" x2="625" y2="300" stroke="#ffffff" strokeWidth="6" />

          {/* Hanging Lights */}
          <g stroke="#1e293b" strokeWidth="2">
            <line x1="150" y1="0" x2="150" y2="60" />
            <path d="M 140 60 L 160 60 L 165 75 L 135 75 Z" fill="#1e293b" />
            <circle cx="150" cy="78" r="4" fill="#fbbf24" stroke="none" />

            <line x1="300" y1="0" x2="300" y2="90" />
            <path d="M 290 90 L 310 90 L 315 105 L 285 105 Z" fill="#1e293b" />
            <circle cx="300" cy="108" r="4" fill="#fbbf24" stroke="none" />

            <line x1="500" y1="0" x2="500" y2="90" />
            <path d="M 490 90 L 510 90 L 515 105 L 485 105 Z" fill="#1e293b" />
            <circle cx="500" cy="108" r="4" fill="#fbbf24" stroke="none" />

            <line x1="650" y1="0" x2="650" y2="60" />
            <path d="M 640 60 L 660 60 L 665 75 L 635 75 Z" fill="#1e293b" />
            <circle cx="650" cy="78" r="4" fill="#fbbf24" stroke="none" />
          </g>

          {/* Sign */}
          <g transform="translate(400, 100)">
            <rect x="-100" y="-40" width="200" height="80" fill="#1e293b" rx="5" />
            <rect x="-95" y="-35" width="190" height="70" fill="none" stroke="#38bdf8" strokeWidth="2" rx="3" />
            <text x="0" y="-5" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle" letterSpacing="2" fontFamily="sans-serif">CLOTHING</text>
            <text x="0" y="20" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle" letterSpacing="3" fontFamily="sans-serif">STORE</text>
          </g>

          {/* Female Mannequin */}
          <g transform="translate(300, 200)">
            <line x1="0" y1="100" x2="0" y2="180" stroke="#1e293b" strokeWidth="3" />
            <path d="M -15 180 Q 0 170 15 180" fill="none" stroke="#1e293b" strokeWidth="3" />
            <path d="M -10 10 L 10 10 L 20 50 L 15 110 L -15 110 L -20 50 Z" fill="#ef4444" />
            <circle cx="0" cy="-10" r="12" fill="#1e293b" />
            <ellipse cx="0" cy="-22" rx="20" ry="5" fill="#fbbf24" />
            <path d="M -10 -22 C -10 -35 10 -35 10 -22 Z" fill="#fbbf24" />
          </g>

          {/* Male Mannequin */}
          <g transform="translate(500, 180)">
            <rect x="-12" y="90" width="10" height="110" fill="#fbbf24" />
            <rect x="2" y="90" width="10" height="110" fill="#fbbf24" />
            <rect x="-15" y="195" width="15" height="5" fill="#1e293b" />
            <rect x="0" y="195" width="15" height="5" fill="#1e293b" />
            <path d="M -15 10 L 15 10 L 22 50 L 18 110 L -18 110 L -22 50 Z" fill="#0f766e" />
            <path d="M -5 10 L 5 10 L 5 90 L -5 90 Z" fill="#f8fafc" />
            <circle cx="0" cy="-15" r="15" fill="#1e293b" />
          </g>

          {/* Center Table & Handbag */}
          <g transform="translate(400, 260)">
            <rect x="-40" y="40" width="80" height="80" fill="#c2410c" />
            <rect x="-50" y="30" width="100" height="10" fill="#ea580c" />
            <path d="M -20 15 C -20 0 20 0 20 15" fill="none" stroke="#1e293b" strokeWidth="3" />
            <path d="M -25 15 L 25 15 L 30 30 L -30 30 Z" fill="#0284c7" />
            <polygon points="-25,15 25,15 0,30" fill="#fbbf24" />
          </g>

          {/* Left Rack */}
          <g transform="translate(50, 180)">
            <line x1="10" y1="0" x2="190" y2="0" stroke="#1e293b" strokeWidth="4" />
            <line x1="20" y1="0" x2="20" y2="200" stroke="#1e293b" strokeWidth="4" />
            <line x1="180" y1="0" x2="180" y2="200" stroke="#1e293b" strokeWidth="4" />
            
            <g transform="translate(0, 10) rotate(-15)">
              <rect x="-20" y="0" width="60" height="25" fill="#ef4444" rx="3" />
              <text x="10" y="17" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SALE</text>
            </g>
            
            <g transform="translate(40, 0)">
              <path d="M -5 0 L 5 0 L 0 10 Z" fill="none" stroke="#1e293b" strokeWidth="2" />
              <path d="M -15 10 L 15 10 L 20 80 L -20 80 Z" fill="#14b8a6" />
            </g>
            {/* Empty spot at x=80 for target cloth */}
            <g transform="translate(130, 0)">
              <path d="M -5 0 L 5 0 L 0 10 Z" fill="none" stroke="#1e293b" strokeWidth="2" />
              <path d="M -25 10 Q 0 30 25 10 Q 35 50 20 80 L -20 80 Q -35 50 -25 10 Z" fill="#ef4444" />
            </g>
          </g>

          {/* Right Rack */}
          <g transform="translate(560, 180)">
            <line x1="10" y1="0" x2="190" y2="0" stroke="#1e293b" strokeWidth="4" />
            <line x1="20" y1="0" x2="20" y2="200" stroke="#1e293b" strokeWidth="4" />
            <line x1="180" y1="0" x2="180" y2="200" stroke="#1e293b" strokeWidth="4" />
            
            <g transform="translate(40, 0)">
              <path d="M -5 0 L 5 0 L 0 10 Z" fill="none" stroke="#1e293b" strokeWidth="2" />
              <path d="M -20 10 L 20 10 L 25 40 L 15 40 L 15 80 L -15 80 L -15 40 L -25 40 Z" fill="#0284c7" />
            </g>
            <g transform="translate(90, 0)">
              <path d="M -5 0 L 5 0 L 0 10 Z" fill="none" stroke="#1e293b" strokeWidth="2" />
              <path d="M -15 10 L 15 10 L 15 80 L -15 80 Z" fill="#f59e0b" />
            </g>
            <g transform="translate(140, 0)">
              <path d="M -5 0 L 5 0 L 0 10 Z" fill="none" stroke="#1e293b" strokeWidth="2" />
              <path d="M -25 10 L 25 10 L 25 70 L -25 70 Z" fill="#ec4899" />
              <line x1="0" y1="10" x2="0" y2="70" stroke="#1e293b" strokeWidth="2" opacity="0.3" />
            </g>
          </g>

          {/* Potted Plant */}
          <g transform="translate(250, 380)">
            <rect x="-15" y="0" width="30" height="40" fill="#fbbf24" rx="2" />
            <path d="M 0 0 Q -40 -30 -20 -60 Q 20 -40 0 0" fill="#65a30d" />
            <path d="M 0 0 Q 40 -20 50 -50 Q 20 -10 0 0" fill="#4d7c0f" />
            <path d="M -5 -10 Q -50 -10 -60 -30 Q -20 0 -5 -10" fill="#4d7c0f" />
          </g>

          {/* Front Tables & Accessories */}
          <g transform="translate(0, 390)">
            <rect x="0" y="20" width="220" height="40" fill="#c2410c" />
            <rect x="0" y="10" width="230" height="10" fill="#ea580c" />
            <path d="M 30 10 L 50 10 Q 40 -10 35 -10 L 20 10 Z" fill="#ef4444" />
            <path d="M 60 10 L 80 10 Q 70 -10 65 -10 L 50 10 Z" fill="#ef4444" />
            <path d="M 120 10 L 140 10 Q 130 -10 125 -10 L 110 10 Z" fill="#06b6d4" />
            <path d="M 150 10 L 170 10 Q 160 -10 155 -10 L 140 10 Z" fill="#06b6d4" />
            
            <rect x="580" y="20" width="220" height="40" fill="#c2410c" />
            <rect x="570" y="10" width="230" height="10" fill="#ea580c" />
            <path d="M 600 10 Q 610 -5 630 0 L 640 10 Z" fill="#92400e" />
            <path d="M 650 10 Q 660 -5 680 0 L 690 10 Z" fill="#92400e" />
            <rect x="710" y="-30" width="60" height="40" fill="#b45309" rx="3" />
            <rect x="715" y="-30" width="50" height="10" fill="#d97706" />
            <path d="M 730 -30 L 730 -40 L 750 -40 L 750 -30" fill="none" stroke="#1e293b" strokeWidth="3" />
          </g>
        </svg>
      </div>

      {/* Target Cloth (The one that gets caught) */}
      <div className="story-target-cloth">
        <svg viewBox="0 0 50 120" style={{ width: '100%', height: '100%' }}>
          {CLOTHES[clothIndex]}
        </svg>
      </div>

      {/* Left Side: Person & Hook */}
      <div className={`story-person-wrapper ${isStopped ? 'stopped' : ''}`}>
        <div className="story-person">
          {/* Person Body */}
          <svg viewBox="0 0 100 200" className="person-svg">
            {/* Back Arm (Left Arm) */}
            <rect className="arm-left" x="35" y="65" width="10" height="50" rx="5" fill="#5b21b6" />
            
            {/* Head */}
            <circle cx="50" cy="30" r="20" fill="#1a1a2e" />
            {/* Body */}
            <rect x="35" y="60" width="30" height="70" rx="15" fill="#1d4ed8" />
            {/* Legs */}
            <rect className="leg-left" x="35" y="120" width="10" height="70" rx="5" fill="#1a1a2e" />
            <rect className="leg-right" x="55" y="120" width="10" height="70" rx="5" fill="#1a1a2e" />
          </svg>
          
          {/* Front Arm (Right Arm) and Stick */}
          <div className="story-arm">
            {/* Hand */}
            <div className="story-hand"></div>
            {/* Base Stick always held */}
            <div className="story-stick-base"></div>
            {/* Extending Stick */}
            <div className="story-hook-line">
              <div className="story-hook-head"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroStoryAnimation;

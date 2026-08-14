import React, { useRef, useEffect, useState, useCallback } from 'react';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  dur: 8 + Math.random() * 12,
  del: Math.random() * 6,
  px: (Math.random() - 0.5) * 80,
  py: -(Math.random() * 80 + 20),
}));

const FLOAT_ITEMS = [
  { emoji: '🧥', cls: 'float-item-1' },
  { emoji: '👟', cls: 'float-item-2' },
  { emoji: '👗', cls: 'float-item-3' },
  { emoji: '👜', cls: 'float-item-4' },
  { emoji: '🧣', cls: 'float-item-5' },
  { emoji: '👔', cls: 'float-item-6' },
];

const HeroParallax = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const modelRef = useRef(null);
  const fgRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    if (bgRef.current) bgRef.current.style.transform = `translate3d(${nx*12}px,${ny*12}px,0)`;
    if (modelRef.current) modelRef.current.style.transform = `translate3d(${nx*30}px,${ny*25}px,0)`;
    if (fgRef.current) fgRef.current.style.transform = `translate3d(${nx*55}px,${ny*45}px,0)`;
  }, []);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} style={{ position:'absolute', inset:0, overflow:'hidden', zIndex:0 }}>
      {/* L0 — Background */}
      <div ref={bgRef} className="hero-bg-layer hero-bg-gradient">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        {PARTICLES.map(p => (
          <div key={p.id} className="hero-particle" style={{
            left:`${p.x}%`, top:`${p.y}%`,
            width:`${p.size}px`, height:`${p.size}px`,
            opacity: 0.4,
            animationDuration:`${p.dur}s`, animationDelay:`${p.del}s`,
            '--px':`${p.px}px`, '--py':`${p.py}px`,
          }} />
        ))}
      </div>
      {/* L1 — Fashion model */}
      <div ref={modelRef} className="hero-model-wrap">
        <img src="/fashion_hero.png" alt="" className="hero-model-img" />
      </div>
      {/* L2 — Floating fashion items */}
      <div ref={fgRef} className="hero-bg-layer" style={{ zIndex: 3 }}>
        {FLOAT_ITEMS.map((item, i) => (
          <div key={i} className={`hero-float-item ${item.cls}`}>{item.emoji}</div>
        ))}
      </div>
    </div>
  );
};

export default HeroParallax;

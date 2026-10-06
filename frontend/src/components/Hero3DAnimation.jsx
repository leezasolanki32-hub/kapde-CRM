import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './Hero3DAnimation.css';

export const Hero3DAnimation = () => {
  const containerRef = useRef(null);
  const headlineRef  = useRef(null);
  const taglineRef   = useRef(null);
  const glowRef      = useRef(null);
  const maskRef      = useRef(null);

  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(true);

  /* ── Entrance animations ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(glowRef.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.6 },
      0
    );

    tl.fromTo(headlineRef.current,
      { filter: 'blur(18px)', scale: 0.88, opacity: 0, y: 20 },
      { filter: 'blur(0px)',  scale: 1,    opacity: 1, y: 0, duration: 1.8 },
      0.5
    );

    tl.fromTo(taglineRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 1 },
      1.6
    );
  }, []);

  /* ── Cursor spotlight tracking ── */
  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    setSpotPos({ x, y });
  }, []);

  /* ── Subtle mouse parallax on headline ── */
  useEffect(() => {
    const handleParallax = (e) => {
      if (!headlineRef.current) return;
      const xPos = (e.clientX / window.innerWidth  - 0.5) * 12;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 8;
      gsap.to(headlineRef.current, { x: xPos, y: yPos, duration: 1.4, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleParallax);
    return () => window.removeEventListener('mousemove', handleParallax);
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-3d-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Atmospheric glow orb */}
      <div ref={glowRef} className="hero-glow-orb" />

      {/* Center content */}
      <div className="hero-center-content">
        <h1 ref={headlineRef} className="hero-headline">Kapde</h1>
        <p  ref={taglineRef}  className="hero-tagline">
          Your Complete Clothing Business Management Platform
        </p>
      </div>

      {/* Water reveal mask — dark overlay with cursor spotlight hole */}
      <div
        ref={maskRef}
        className="hero-water-mask"
        style={{
          '--spot-x': `${spotPos.x}%`,
          '--spot-y': `${spotPos.y}%`,
          '--spot-size': '280px',
        }}
      />

    </section>
  );
};

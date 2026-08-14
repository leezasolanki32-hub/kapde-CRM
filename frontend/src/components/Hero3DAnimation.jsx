import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero3DAnimation.css';

gsap.registerPlugin(ScrollTrigger);

// Clear scroll memory globally
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  ScrollTrigger.clearScrollMemory('manual');
}

const clothingCards = [
  { id: 1, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80" },
  { id: 2, img: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=800&q=80" },
  { id: 3, img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80" },
  { id: 4, img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80" },
];

export const Hero3DAnimation = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    // Reset scroll position instantly to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 1. Initial Intro Animation for KAPDE Text on page load
    gsap.fromTo(textRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    const cardsEl = cardsContainerRef.current;
    
    // Cards start completely off-screen to the right and invisible
    gsap.set(cardsEl, { x: "100vw", opacity: 0 });

    // 2. Scroll animation pinned strictly to Hero Section
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2200",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Make cards visible as scroll starts
    scrollTl.to(cardsEl, { opacity: 1, duration: 0.05 }, 0);

    // Keep KAPDE text clearly visible in background during scroll
    scrollTl.to(textRef.current, {
      scale: 0.95,
      opacity: 0.75,
      ease: "none",
      duration: 0.8
    }, 0);

    // Move cards from right (100vw) completely out to the left
    scrollTl.to(cardsEl, {
      x: () => {
        const totalWidth = cardsEl.scrollWidth;
        return -(totalWidth + window.innerWidth);
      },
      ease: "none",
      duration: 0.85
    }, 0);

    // Fade out cards completely at end of hero section so they never appear in other sections
    scrollTl.to(cardsEl, {
      opacity: 0,
      duration: 0.1
    }, 0.85);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Subtle Mouse Parallax for KAPDE text
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!textRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(textRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="hero-3d-wrapper">
      
      {/* Prominent Background Typography */}
      <div ref={textRef} className="hero-3d-bg-text">
        KAP<span style={{ marginLeft: '-0.05em' }}>DE</span>
      </div>

      {/* Hero Cards Container */}
      <div className="hero-cards-container" ref={cardsContainerRef}>
        {clothingCards.map((card) => (
          <div key={card.id} className="hero-card">
            <img src={card.img} alt={`Clothing item ${card.id}`} className="hero-card-image" />
          </div>
        ))}
      </div>

    </section>
  );
};



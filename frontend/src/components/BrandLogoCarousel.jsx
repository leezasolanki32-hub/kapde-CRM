import React, { useEffect, useRef } from 'react';
import './BrandLogoCarousel.css';

/* ─── Brand definitions ─────────────────────────────── */
const BRANDS = [
  { id: 'zara',    text: 'ZARA',           cls: 'bl-zara'  },
  { id: 'hm',      text: 'H&M',            cls: 'bl-hm'    },
  { id: 'levis',   text: "Levi's",         cls: 'bl-levis' },
  { id: 'lp',      text: 'LOUIS PHILIPPE', cls: 'bl-lp'    },
  { id: 'manyavar',text: 'Manyavar',       cls: 'bl-mv'    },
  { id: 'fabindia',text: 'FabIndia',       cls: 'bl-fi'    },
];

const N             = BRANDS.length;
const ANGULAR_SPEED = 0.0025; // slow orbit — full lap ≈ 42 s

/* ─── Component ─────────────────────────────────────── */
export const BrandLogoCarousel = () => {
  const containerRef = useRef(null);
  const itemRefs     = useRef([]);
  // Evenly distribute logos around the ellipse
  const anglesRef    = useRef(BRANDS.map((_, i) => (i / N) * 2 * Math.PI));
  const rafRef       = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      const W  = container.offsetWidth;
      const H  = container.offsetHeight;
      const cx = W / 2;
      const cy = H / 2;

      // Wide, slightly flat ellipse — fills the section
      const rx = W * 0.42;
      const ry = H * 0.36;

      // Advance all angles (clockwise on screen)
      anglesRef.current = anglesRef.current.map(a => a + ANGULAR_SPEED);

      // Sort back→front for correct z layering
      const withDepth = anglesRef.current.map((angle, i) => ({
        i,
        angle,
        // Depth: logo at LEFT/RIGHT is "closer" visually in a tilted ellipse
        // sin(angle)=0 means left/right → front; sin(angle)=±1 → top/bottom → back
        depth: 1 - Math.abs(Math.sin(angle)), // 0=top/bottom, 1=left/right
      }));
      withDepth.sort((a, b) => a.depth - b.depth);

      withDepth.forEach(({ i, angle, depth }, sortIdx) => {
        const el = itemRefs.current[i];
        if (!el) return;

        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);

        // Subtle depth effect — logos always visible
        const scale   = 0.72 + depth * 0.52;     // 0.72 → 1.24
        const blurVal = (1 - depth) * 4;          // 0 → 4 px (very subtle)
        const opacity = 0.45 + depth * 0.55;      // 0.45 → 1.0

        el.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${scale.toFixed(4)})`;
        el.style.filter    = `blur(${blurVal.toFixed(1)}px)`;
        el.style.opacity   = opacity.toFixed(3);
        el.style.zIndex    = sortIdx + 1;

        // Color & glow driven by depth
        const txt = el.querySelector('.bl-text');
        if (txt) {
          if (depth > 0.55) {
            txt.style.color      = '#ffffff';
            txt.style.textShadow = `0 0 ${(20 * depth).toFixed(0)}px rgba(180,210,255,${(depth * 0.4).toFixed(2)})`;
          } else {
            txt.style.color      = `rgba(180,210,255,${(0.5 + depth * 0.3).toFixed(2)})`;
            txt.style.textShadow = 'none';
          }
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="blc-section">

      {/* Deep atmospheric glow */}
      <div className="blc-glow" />

      {/* Orbit stage — logos + center text together */}
      <div ref={containerRef} className="blc-orbit-container" aria-hidden="true">

        {/* Brand logos — absolutely positioned, rAF drives transform */}
        {BRANDS.map((brand, i) => (
          <div
            key={brand.id}
            ref={el => { itemRefs.current[i] = el; }}
            className="bl-item"
          >
            <span className={`bl-text ${brand.cls}`}>{brand.text}</span>
          </div>
        ))}

        {/* Center text — fixed, always on top */}
        <div className="blc-center">
          <p className="blc-label">Testimonials</p>
          <h2 className="blc-center-heading">
            Loved by<br />
            <em className="blc-center-em">Retailers</em>
          </h2>
          <p className="blc-center-sub">
            The world's finest fashion brands run on Kapde
          </p>
        </div>

      </div>

    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero3DAnimation.css';

export const Hero3DAnimation = ({ setView }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const btnRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    
    window.addEventListener('resize', resize);
    
    const mouse = { x: null, y: null, radius: 200 };

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        // Vibrant theme blues
        const hue = Math.random() * 20 + 205; 
        this.color = `hsla(${hue}, 95%, 65%, ${Math.random() * 0.8 + 0.2})`;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
          }
        } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
        }
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for(let j = i; j < particles.length; j++) {
           let dx = particles[i].x - particles[j].x;
           let dy = particles[i].y - particles[j].y;
           let distance = Math.sqrt(dx * dx + dy * dy);
           if (distance < 120) {
               ctx.beginPath();
               ctx.strokeStyle = particles[i].color.replace(/[\d.]+\)$/g, `${1 - distance/120})`);
               ctx.lineWidth = 0.4;
               ctx.moveTo(particles[i].x, particles[i].y);
               ctx.lineTo(particles[j].x, particles[j].y);
               ctx.stroke();
           }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (containerRef.current) {
         containerRef.current.removeEventListener('mousemove', handleMouseMove);
         containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const headline = "KapdeCRM";
  const letters = Array.from(headline);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 }
    }
  };

  const letterVariants = {
    hidden: { y: 150, opacity: 0, rotateX: -90, scale: 0.5 },
    visible: {
      y: 0, opacity: 1, rotateX: 0, scale: 1,
      transition: { type: "spring", damping: 14, stiffness: 100 }
    }
  };

  const handleBtnMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  };

  const handleBtnMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <section ref={containerRef} className="advanced-hero-container">
      
      <canvas ref={canvasRef} className="advanced-canvas" />

      <motion.div 
         className="cursor-light"
         animate={{ x: mousePosition.x - 300, y: mousePosition.y - 300 }}
         transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      <div className="advanced-content-wrapper z-10 relative">
        <motion.div 
           variants={containerVariants} 
           initial="hidden" 
           animate="visible"
           className="headline-container"
        >
          {letters.map((letter, i) => (
            <motion.span key={i} variants={letterVariants} className="headline-letter">
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
           animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
           transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
        >
           <p className="advanced-tagline">
             The Ultimate Intelligence for Fashion Retailers.
           </p>
        </motion.div>

        <motion.div
           className="advanced-actions"
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 2, duration: 1, type: "spring" }}
        >
           <button 
             ref={btnRef}
             className="advanced-btn magnetic-btn" 
             onClick={() => setView && setView('register')}
             onMouseMove={handleBtnMouseMove}
             onMouseLeave={handleBtnMouseLeave}
           >
             <span className="btn-text">Enter the Future</span>
             <div className="btn-glare"></div>
           </button>
        </motion.div>
      </div>
      
    </section>
  );
};


import React, { useRef, useEffect } from 'react';

const HeroParticles = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, radius: 160 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particlesArray = [];

    // Globals for continuous scatter animation
    let isMouseMoving = false;
    let mouseTimeout;
    let globalCycle = 0;

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const drawShape = (offCtx, type, cx, cy, scale) => {
      offCtx.save();
      offCtx.translate(cx, cy);
      offCtx.scale(scale, scale);
      offCtx.translate(-50, -50);
      offCtx.beginPath();

      if (type === 'dress') {
        offCtx.moveTo(35, 10);
        offCtx.quadraticCurveTo(50, 25, 65, 10);
        offCtx.lineTo(75, 15);
        offCtx.quadraticCurveTo(65, 40, 60, 50);
        offCtx.quadraticCurveTo(80, 80, 90, 100);
        offCtx.lineTo(10, 100);
        offCtx.quadraticCurveTo(20, 80, 40, 50);
        offCtx.quadraticCurveTo(35, 40, 25, 15);
      } else if (type === 'tshirt') {
        offCtx.moveTo(20, 10);
        offCtx.lineTo(40, 5);
        offCtx.quadraticCurveTo(50, 20, 60, 5);
        offCtx.lineTo(80, 10);
        offCtx.lineTo(95, 35);
        offCtx.lineTo(80, 45);
        offCtx.lineTo(80, 95);
        offCtx.lineTo(20, 95);
        offCtx.lineTo(20, 45);
        offCtx.lineTo(5, 35);
      } else if (type === 'jeans') {
        offCtx.moveTo(25, 5);
        offCtx.lineTo(75, 5);
        offCtx.lineTo(85, 30);
        offCtx.lineTo(85, 95);
        offCtx.lineTo(55, 95);
        offCtx.lineTo(50, 40);
        offCtx.lineTo(45, 95);
        offCtx.lineTo(15, 95);
        offCtx.lineTo(15, 30);
      } else if (type === 'skirt') {
        offCtx.moveTo(35, 10);
        offCtx.lineTo(65, 10);
        offCtx.lineTo(90, 90);
        offCtx.quadraticCurveTo(50, 100, 10, 90);
      } else if (type === 'polo') {
        offCtx.moveTo(25, 20);
        offCtx.lineTo(40, 15);
        offCtx.lineTo(50, 30);
        offCtx.lineTo(60, 15);
        offCtx.lineTo(75, 20);
        offCtx.lineTo(95, 40);
        offCtx.lineTo(80, 50);
        offCtx.lineTo(75, 95);
        offCtx.lineTo(25, 95);
        offCtx.lineTo(20, 50);
        offCtx.lineTo(5, 40);
      } else if (type === 'sweater') {
        offCtx.moveTo(30, 15);
        offCtx.quadraticCurveTo(50, 30, 70, 15);
        offCtx.lineTo(90, 25);
        offCtx.lineTo(95, 60);
        offCtx.lineTo(80, 65);
        offCtx.lineTo(75, 90);
        offCtx.lineTo(25, 90);
        offCtx.lineTo(20, 65);
        offCtx.lineTo(5, 60);
        offCtx.lineTo(10, 25);
      }

      offCtx.closePath();
      offCtx.fill();
      offCtx.restore();
    };

    const getClothParticles = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      offCtx.fillStyle = '#000';

      const baseScale = Math.min(width, height) / 100;
      // Restored clothes in small, elegant positions
      drawShape(offCtx, 'dress', width * 0.25, height * 0.18, baseScale * 0.14);
      drawShape(offCtx, 'tshirt', width * 0.15, height * 0.35, baseScale * 0.15);
      drawShape(offCtx, 'dress', width * 0.85, height * 0.25, baseScale * 0.16);
      drawShape(offCtx, 'skirt', width * 0.75, height * 0.15, baseScale * 0.14);
      drawShape(offCtx, 'sweater', width * 0.18, height * 0.75, baseScale * 0.16);
      drawShape(offCtx, 'jeans', width * 0.82, height * 0.75, baseScale * 0.18);
      drawShape(offCtx, 'polo', width * 0.08, height * 0.55, baseScale * 0.14);
      drawShape(offCtx, 'tshirt', width * 0.92, height * 0.55, baseScale * 0.14);

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const points = [];
      const gap = width < 768 ? 3 : 2;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const i = (y * width + x) * 4;
          if (imageData[i + 3] > 128) {
            points.push({ x, y });
          }
        }
      }
      return points;
    };

    class Particle {
      constructor(targetX, targetY) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.targetX = targetX;
        this.targetY = targetY;
        this.size = Math.random() * 1.2 + 0.6;
        this.vx = 0;
        this.vy = 0;

        // Random properties for the "breathing/scattering" effect
        this.scatterAngle = Math.random() * Math.PI * 2;
        // Massive scatter radius to spread across the entire screen
        this.scatterRadius = Math.random() * Math.max(width, height) * 0.8 + 100;

        this.friction = 0.82 + Math.random() * 0.08;
        this.ease = 0.03 + Math.random() * 0.05;

        const colors = ['#a855f7', '#f472b6', '#c084fc', '#e879f9'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Direct Mouse Collision Repulsion
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          this.vx -= forceDirectionX * force * 12;
          this.vy -= forceDirectionY * force * 12;
        }

        // Global Scatter Cycle logic
        // When globalCycle > 0, the target shifts outwards, causing them to shatter
        let currentTargetX = this.targetX + Math.cos(this.scatterAngle) * this.scatterRadius * globalCycle;
        let currentTargetY = this.targetY + Math.sin(this.scatterAngle) * this.scatterRadius * globalCycle;

        // Spring back to calculated target
        this.vx += (currentTargetX - this.x) * this.ease;
        this.vy += (currentTargetY - this.y) * this.ease;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      const points = getClothParticles();
      points.forEach(point => {
        particlesArray.push(new Particle(point.x, point.y));
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Continuous oscillation for the shatter & reform effect (slower and smoother)
      // Math.pow gives it more time near 0 (fully formed) than near 1 (fully shattered)
      let cycleRaw = (Math.sin(Date.now() / 2500) + 1) / 2;
      globalCycle = Math.pow(cycleRaw, 2.5);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      // Track if mouse is currently moving
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 150);
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      isMouseMoving = false;
    };

    initCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      initCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(mouseTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 opacity-70"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default HeroParticles;

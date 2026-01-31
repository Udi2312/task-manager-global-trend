'use client';

import { useEffect, useRef } from 'react';

const InteractiveParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();

    const particles = [];
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        color: ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4'][Math.floor(Math.random() * 4)],
      });
    }

    const distance = (x1, y1, x2, y2) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x - p.radius < 0 || p.x + p.radius > canvas.width) p.vx *= -1;
        if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) p.vy *= -1;

        // Keep in bounds
        p.x = Math.max(p.radius, Math.min(canvas.width - p.radius, p.x));
        p.y = Math.max(p.radius, Math.min(canvas.height - p.radius, p.y));

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw links to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = distance(p.x, p.y, p2.x, p2.y);
          if (d < 150) {
            ctx.strokeStyle = '#3B82F6';
            ctx.globalAlpha = 0.2 * (1 - d / 150);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Interaction with mouse
        const d = distance(p.x, p.y, mouse.x, mouse.y);
        if (d < 200) {
          ctx.globalAlpha = 0.9;
          ctx.strokeStyle = '#8B5CF6';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          // Attract to mouse
          const angle = Math.atan2(mouse.y - p.y, mouse.x - p.x);
          p.vx += Math.cos(angle) * 0.05;
          p.vy += Math.sin(angle) * 0.05;
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Mouse move listener
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Click to spawn particles
    const handleClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * 2,
          vy: Math.sin(angle) * 2,
          radius: Math.random() * 2 + 1,
          color: ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4'][Math.floor(Math.random() * 4)],
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', resizeCanvas);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{
        background: 'transparent',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default InteractiveParticles;

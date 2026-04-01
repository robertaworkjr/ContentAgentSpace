import React, { useEffect, useRef } from 'react';

interface NexusConfig {
  density: number;
  chaos: number;
  size: number;
  wind: number;
}

export const NexusSimulation: React.FC<{ config: NexusConfig; onCanvasReady: (canvas: HTMLCanvasElement) => void }> = ({ config, onCanvasReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onCanvasReady(canvas);

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < config.density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 * config.size + 1,
          speedX: (Math.random() - 0.5) * config.chaos,
          speedY: (Math.random() - 0.5) * config.chaos,
          color: `hsla(${Math.random() * 40 + 10}, 80%, 60%, 0.8)`
        });
      }
    };

    const resize = () => {
      canvas.width = 1920;
      canvas.height = 1080;
      createParticles();
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX + config.wind;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 100, 0, ${1 - dist / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [config, onCanvasReady]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-contain bg-black shadow-2xl"
      style={{ aspectRatio: '16/9' }}
    />
  );
};

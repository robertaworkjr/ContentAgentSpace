import React, { useEffect, useRef } from 'react';

interface BokehConfig {
  density: number;
  size: number;
  blur: number;
  chaos: number;
  wind: number;
}

export const BokehSimulation: React.FC<{ config: BokehConfig; onCanvasReady: (canvas: HTMLCanvasElement) => void }> = ({ config, onCanvasReady }) => {
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
          size: Math.random() * 40 * config.size + 10,
          speedX: (Math.random() - 0.5) * config.chaos,
          speedY: (Math.random() - 0.5) * config.chaos - 0.2,
          opacity: Math.random() * 0.3,
          color: `hsla(${Math.random() * 40 + 10}, 80%, 60%, 1)`
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

      ctx.globalCompositeOperation = 'screen';

      particles.forEach(p => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, p.color.replace('1)', `${p.opacity})`));
        gradient.addColorStop(0.5, p.color.replace('1)', `${p.opacity * 0.5})`));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX + config.wind;
        p.y += p.speedY;

        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;
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

import React, { useEffect, useRef, useCallback } from 'react';
import { createNoise } from '../utils/noise';

interface InfernoConfig {
  heat: number;
  density: number;
  chaos: number;
  size: number;
  burn: number;
  wind: number;
}

const WIDTH = 1920;
const HEIGHT = 1080;
const SPRITE_SIZE = 96;
const SPRITE_COUNT = 16;

class Particle {
  x: number = 0;
  y: number = 0;
  z: number = 0;
  vx: number = 0;
  vy: number = 0;
  spriteIdx: number = 0;
  baseSize: number = 0;
  noiseOffset: number = 0;
  life: number = 0;
  decay: number = 0;

  constructor() {
    this.init(true);
  }

  init(randomY = false) {
    this.x = Math.random() * WIDTH;
    this.y = randomY ? (HEIGHT - Math.random() * HEIGHT * 0.8) : HEIGHT + (Math.random() * 50);
    this.z = 0.2 + Math.random() * 0.8;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = -(Math.random() * 3 + 2);
    this.spriteIdx = Math.floor(Math.random() * SPRITE_COUNT);
    this.baseSize = (0.5 + this.z * 1.5) * (0.8 + Math.random() * 0.4);
    this.noiseOffset = Math.random() * 1000;
    this.life = randomY ? Math.random() : 1.0;
    this.decay = (0.005 + Math.random() * 0.01) / this.z;
  }

  update(time: number, dt: number, config: InfernoConfig, noise: (x: number, y: number) => number) {
    this.life -= this.decay * config.burn * dt;

    if (this.life <= 0 || this.y < -150) {
      this.init(false);
      return;
    }

    const nx = noise(this.x * 0.004, (this.y * 0.004) + time * 0.001) * config.chaos * 8;
    const ny = noise(this.y * 0.004, this.noiseOffset + time * 0.001) * config.chaos * 4;

    this.vx += nx * 0.1;
    this.vy -= (0.1 * config.heat) + ny * 0.02;

    const heightFactor = Math.max(0, (HEIGHT - this.y) / HEIGHT);
    const currentWind = config.wind * (0.2 + heightFactor * 0.8);

    this.vx *= 0.95;
    this.vy *= 0.98;

    this.x += (this.vx + currentWind) * dt;
    this.y += this.vy * dt * config.heat;
  }

  draw(ctx: CanvasRenderingContext2D, spriteSheet: HTMLCanvasElement, config: InfernoConfig) {
    const currentScale = Math.max(0.1, this.life);
    const finalSize = SPRITE_SIZE * this.baseSize * config.size * currentScale;
    const drawX = Math.round(this.x - finalSize / 2);
    const drawY = Math.round(this.y - finalSize / 2);

    ctx.globalAlpha = Math.min(1, this.life * 1.5);

    ctx.drawImage(
      spriteSheet,
      this.spriteIdx * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      drawX,
      drawY,
      finalSize,
      finalSize
    );
  }
}

export const InfernoSimulation: React.FC<{
  config: InfernoConfig;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
}> = ({ config, onCanvasReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteSheetRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const noiseRef = useRef(createNoise());
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const generateSprites = useCallback(() => {
    const spriteSheet = document.createElement('canvas');
    spriteSheet.width = SPRITE_SIZE * SPRITE_COUNT;
    spriteSheet.height = SPRITE_SIZE;
    const sCtx = spriteSheet.getContext('2d');
    if (!sCtx) return null;

    sCtx.clearRect(0, 0, spriteSheet.width, spriteSheet.height);
    for (let i = 0; i < SPRITE_COUNT; i++) {
      const x = i * SPRITE_SIZE + SPRITE_SIZE / 2;
      const y = SPRITE_SIZE / 2;
      const r = SPRITE_SIZE * 0.4;

      sCtx.save();
      sCtx.translate(x, y);

      const hue = 15 + Math.random() * 35;
      const grad = sCtx.createRadialGradient(0, r * 0.2, 0, 0, 0, r);
      grad.addColorStop(0, `hsla(${hue}, 100%, 80%, 1)`);
      grad.addColorStop(0.3, `hsla(${hue}, 100%, 50%, 0.8)`);
      grad.addColorStop(0.7, `hsla(${Math.max(0, hue - 15)}, 100%, 30%, 0.2)`);
      grad.addColorStop(1, `hsla(0, 100%, 10%, 0)`);

      sCtx.fillStyle = grad;
      sCtx.scale(1 + Math.random() * 0.5, 1.5 + Math.random() * 1.0);

      sCtx.beginPath();
      sCtx.arc(0, 0, r, 0, Math.PI * 2);
      sCtx.fill();

      sCtx.restore();
    }
    return spriteSheet;
  }, []);

  useEffect(() => {
    spriteSheetRef.current = generateSprites();
  }, [generateSprites]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onCanvasReady(canvas);

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const animate = (time: number) => {
      const dt = Math.min(32, time - lastTimeRef.current) / 16.66;
      lastTimeRef.current = time;

      if (particlesRef.current.length < config.density) {
        for (let i = 0; i < config.density - particlesRef.current.length; i++) {
          particlesRef.current.push(new Particle());
        }
      } else if (particlesRef.current.length > config.density) {
        particlesRef.current.length = config.density;
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#050200';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.globalCompositeOperation = 'lighter';

      particlesRef.current.sort((a, b) => a.z - b.z);

      if (spriteSheetRef.current) {
        for (const p of particlesRef.current) {
          p.update(time, dt, config, noiseRef.current);
          p.draw(ctx, spriteSheetRef.current, config);
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [config, onCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      className="max-w-full max-h-full object-contain bg-transparent shadow-2xl"
      id="mainCanvas"
    />
  );
};

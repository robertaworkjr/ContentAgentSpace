import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createNoise } from '../utils/noise';

interface EmberConfig {
  heat: number;
  density: number;
  chaos: number;
  glow: number;
  cooling: number;
  wind: number;
}

const WIDTH = 1920;
const HEIGHT = 1080;
const SPRITE_SIZE = 64;
const SPRITE_COUNT = 16;

class Particle {
  x: number = 0;
  y: number = 0;
  z: number = 0;
  vx: number = 0;
  vy: number = 0;
  life: number = 0;
  decay: number = 0;
  spriteIdx: number = 0;
  size: number = 0;
  noiseOffset: number = 0;

  constructor() {
    this.init();
  }

  init() {
    this.x = Math.random() * WIDTH;
    this.y = HEIGHT + 50 + Math.random() * 200;
    this.z = Math.random();
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = -(2 + Math.random() * 4);
    this.life = 1.0;
    this.decay = 0.002 + Math.random() * 0.008;
    this.spriteIdx = Math.floor(Math.random() * SPRITE_COUNT);
    this.size = (0.5 + this.z * 1.5) * (0.8 + Math.random() * 0.4);
    this.noiseOffset = Math.random() * 1000;
  }

  update(time: number, dt: number, config: EmberConfig, noise: (x: number, y: number) => number) {
    const speedMult = config.heat * (0.5 + this.z);
    const nx = noise(this.x * 0.005, this.y * 0.005 + time * 0.001) * config.chaos * 10;
    const ny = noise(this.y * 0.005, this.noiseOffset + time * 0.001) * config.chaos * 5;

    this.vx += nx * 0.1 + config.wind * 0.05;
    this.vy -= 0.1 * config.heat + ny * 0.02;

    this.vx *= 0.98;
    this.vy *= 0.98;

    this.x += this.vx * dt * speedMult;
    this.y += this.vy * dt * speedMult;

    this.life -= this.decay * dt * config.cooling;

    if (this.life <= 0 || this.y < -100 || this.x < -100 || this.x > WIDTH + 100) {
      this.init();
    }
  }

  draw(ctx: CanvasRenderingContext2D, spriteSheet: HTMLCanvasElement) {
    const alpha = Math.max(0, Math.min(1, this.life * 2));
    ctx.globalAlpha = alpha;
    const s = SPRITE_SIZE * this.size;
    const drawX = Math.round(this.x - s / 2);
    const drawY = Math.round(this.y - s / 2);

    ctx.drawImage(
      spriteSheet,
      this.spriteIdx * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      drawX,
      drawY,
      s,
      s
    );
  }
}

export const EmberSimulation: React.FC<{
  config: EmberConfig;
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
      const r = 4 + Math.random() * 8;

      sCtx.save();
      sCtx.translate(x, y);
      sCtx.rotate(Math.random() * Math.PI * 2);

      const hue = 10 + Math.random() * 30;
      const lum = 40 + Math.random() * 40;
      sCtx.fillStyle = `hsl(${hue}, 100%, ${lum}%)`;

      if (config.glow > 0) {
        sCtx.shadowBlur = config.glow;
        sCtx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      }

      sCtx.beginPath();
      const points = 5 + Math.floor(Math.random() * 3);
      for (let p = 0; p < points; p++) {
        const angle = (p / points) * Math.PI * 2;
        const dist = r * (0.6 + Math.random() * 0.8);
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist * 1.5;
        if (p === 0) sCtx.moveTo(px, py);
        else sCtx.lineTo(px, py);
      }
      sCtx.closePath();
      sCtx.fill();
      sCtx.restore();
    }
    return spriteSheet;
  }, [config.glow]);

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

      // Update particle count
      if (particlesRef.current.length < config.density) {
        for (let i = 0; i < config.density - particlesRef.current.length; i++) {
          particlesRef.current.push(new Particle());
        }
      } else if (particlesRef.current.length > config.density) {
        particlesRef.current.length = config.density;
      }

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Sort by Z for parallax
      particlesRef.current.sort((a, b) => a.z - b.z);

      if (spriteSheetRef.current) {
        for (const p of particlesRef.current) {
          p.update(time, dt, config, noiseRef.current);
          p.draw(ctx, spriteSheetRef.current);
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
      className="max-w-full max-h-full object-contain bg-black shadow-2xl"
      id="mainCanvas"
    />
  );
};

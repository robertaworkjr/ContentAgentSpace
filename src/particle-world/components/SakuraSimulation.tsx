import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createNoise } from '../utils/noise';

interface SakuraConfig {
  gravity: number;
  density: number;
  chaos: number;
  size: number;
  flutter: number;
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
  spriteIdx: number = 0;
  baseSize: number = 0;
  noiseOffset: number = 0;
  spinOffset: number = 0;

  constructor() {
    this.init(true);
  }

  init(randomY = false) {
    this.x = Math.random() * WIDTH;
    this.y = randomY ? Math.random() * HEIGHT : -50 - Math.random() * 200;
    this.z = 0.1 + Math.random() * 0.9;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = Math.random() * 2;
    this.spriteIdx = Math.floor(Math.random() * SPRITE_COUNT);
    this.baseSize = (0.4 + this.z * 1.2) * (0.7 + Math.random() * 0.6);
    this.noiseOffset = Math.random() * 1000;
    this.spinOffset = Math.random() * Math.PI * 2;
  }

  update(time: number, dt: number, config: SakuraConfig, noise: (x: number, y: number) => number) {
    const depthMult = 0.3 + this.z;
    const nx = noise(this.x * 0.003, this.y * 0.003 + time * 0.001 * config.flutter) * config.chaos * 6;
    const ny = noise(this.y * 0.003, this.noiseOffset + time * 0.001 * config.flutter) * config.chaos * 3;

    this.vx += nx * 0.1;
    this.vy += 0.05 * config.gravity + ny * 0.02;

    this.vx *= 0.96;
    if (this.vy > 4 * depthMult) {
      this.vy *= 0.95;
    }

    this.x += (this.vx + config.wind) * dt * depthMult;
    this.y += this.vy * dt * depthMult;

    if (this.y > HEIGHT + 100 || this.x < -200 || this.x > WIDTH + 200) {
      this.init(false);
      if (Math.random() < Math.abs(config.wind) / 5) {
        this.x = config.wind > 0 ? -100 : WIDTH + 100;
        this.y = Math.random() * HEIGHT;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, spriteSheet: HTMLCanvasElement, time: number, config: SakuraConfig) {
    const finalSize = SPRITE_SIZE * this.baseSize * config.size;
    const drawX = Math.round(this.x - finalSize / 2);
    const drawY = Math.round(this.y - finalSize / 2);
    const flutterPhase = Math.cos(time * 0.003 * config.flutter + this.spinOffset);
    const squish = Math.abs(flutterPhase);

    ctx.globalAlpha = Math.min(1, (this.y + 50) / 100);

    if (squish < 0.99) {
      ctx.save();
      ctx.translate(drawX + finalSize / 2, drawY + finalSize / 2);
      ctx.scale(squish, 1);
      ctx.drawImage(
        spriteSheet,
        this.spriteIdx * SPRITE_SIZE,
        0,
        SPRITE_SIZE,
        SPRITE_SIZE,
        -finalSize / 2,
        -finalSize / 2,
        finalSize,
        finalSize
      );
      ctx.restore();
    } else {
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
}

export const SakuraSimulation: React.FC<{
  config: SakuraConfig;
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
      const r = 6 + Math.random() * 6;

      sCtx.save();
      sCtx.translate(x, y);
      sCtx.rotate(Math.random() * Math.PI * 2);

      const hue = 320 + Math.random() * 40;
      const sat = 50 + Math.random() * 50;
      const lum = 75 + Math.random() * 20;
      sCtx.fillStyle = `hsl(${hue}, ${sat}%, ${lum}%)`;

      sCtx.beginPath();
      sCtx.moveTo(0, -r);
      sCtx.bezierCurveTo(r, -r, r, r, 0, r * 1.5);
      sCtx.bezierCurveTo(-r, r, -r, -r, 0, -r);
      sCtx.fill();

      sCtx.strokeStyle = `hsla(${hue}, ${sat}%, ${lum - 20}%, 0.5)`;
      sCtx.lineWidth = 1;
      sCtx.beginPath();
      sCtx.moveTo(0, -r * 0.5);
      sCtx.lineTo(0, r);
      sCtx.stroke();

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

      const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      gradient.addColorStop(0, '#0f111a');
      gradient.addColorStop(1, '#1a1b26');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      particlesRef.current.sort((a, b) => a.z - b.z);

      if (spriteSheetRef.current) {
        for (const p of particlesRef.current) {
          p.update(time, dt, config, noiseRef.current);
          p.draw(ctx, spriteSheetRef.current, time, config);
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

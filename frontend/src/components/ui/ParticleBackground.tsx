import { useEffect, useRef, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

// ─── Config ──────────────────────────────────────────────────────────────────

const PARTICLE_DENSITY    = 0.00009;
const BG_PARTICLE_DENSITY = 0.00003;
const MOUSE_RADIUS        = 180;
const RETURN_SPEED        = 0.08;
const DAMPING             = 0.90;
const REPULSION_STRENGTH  = 1.2;

const rnd = (min: number, max: number) => Math.random() * (max - min) + min;

// ─── Component ───────────────────────────────────────────────────────────────

export default function ParticleBackground() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const particlesRef   = useRef<Particle[]>([]);
  const bgParticlesRef = useRef<BackgroundParticle[]>([]);
  const mouseRef       = useRef<MouseState>({ x: -1000, y: -1000, isActive: false });
  const frameIdRef     = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.floor(width * height * PARTICLE_DENSITY);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y, originX: x, originY: y, vx: 0, vy: 0,
        size: rnd(1, 2.5),
        color: Math.random() > 0.9 ? '#FF6B4A' : '#ffffff',
      });
    }
    particlesRef.current = particles;

    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
    const bgParticles: BackgroundParticle[] = [];
    for (let i = 0; i < bgCount; i++) {
      bgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: rnd(0.5, 1.5),
        alpha: rnd(0.1, 0.4),
        phase: Math.random() * Math.PI * 2,
      });
    }
    bgParticlesRef.current = bgParticles;
  }, []);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const pulseOpacity = Math.sin(time * 0.0008) * 0.035 + 0.085;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(canvas.width, canvas.height) * 0.7);
    grad.addColorStop(0, `rgba(255, 107, 74, ${pulseOpacity})`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    for (const p of bgParticlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
      ctx.globalAlpha = p.alpha * (0.3 + 0.7 * twinkle);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    const particles = particlesRef.current;
    const mouse     = mouseRef.current;

    for (const p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (mouse.isActive && dist < MOUSE_RADIUS && dist > 0.01) {
        const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPULSION_STRENGTH;
        p.vx -= (dx / dist) * force * 5;
        p.vy -= (dy / dist) * force * 5;
      }

      p.vx += (p.originX - p.x) * RETURN_SPEED;
      p.vy += (p.originY - p.y) * RETURN_SPEED;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = p1.size + p2.size;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          if (dist < 0.01) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = (minDist - dist) * 0.5;
          p1.x -= nx * overlap;
          p1.y -= ny * overlap;
          p2.x += nx * overlap;
          p2.y += ny * overlap;

          const velDotNormal = (p1.vx - p2.vx) * nx + (p1.vy - p2.vy) * ny;
          if (velDotNormal > 0) {
            const impulse = (-(1 + 0.85) * velDotNormal) / (1 / p1.size + 1 / p2.size);
            p1.vx += (impulse * nx) / p1.size;
            p1.vy += (impulse * ny) / p1.size;
            p2.vx -= (impulse * nx) / p2.size;
            p2.vy -= (impulse * ny) / p2.size;
          }
        }
      }
    }

    for (const p of particles) {
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x  += p.vx;
      p.y  += p.vy;

      const speed   = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.3 + speed * 0.1, 1);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color === '#ffffff'
        ? `rgba(255, 255, 255, ${opacity})`
        : p.color;
      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Resize — uses viewport dimensions because the canvas is position:fixed
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const width  = window.innerWidth;
      const height = window.innerHeight;
      const dpr    = window.devicePixelRatio || 1;
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      initParticles(width, height);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  // Window-level mouse tracking — captures movement across all sections when scrolled
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, isActive: true };
    };
    const onLeave = () => { mouseRef.current.isActive = false; };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
        background: '#0f172a',
      }}
    />
  );
}

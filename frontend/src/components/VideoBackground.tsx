import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'gold' | 'leaf';
  rotation?: number;
  rotSpeed?: number;
}

export const VideoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize luxury golden stardust and subtle emerald embers
    const count = width < 768 ? 24 : 45;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const isLeaf = i % 5 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isLeaf ? 6 + Math.random() * 8 : 1.2 + Math.random() * 2.5,
        speedX: -0.3 + Math.random() * 0.6,
        speedY: isLeaf ? 0.3 + Math.random() * 0.6 : -0.2 - Math.random() * 0.4,
        opacity: 0.15 + Math.random() * 0.5,
        type: isLeaf ? 'leaf' : 'gold',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: -0.01 + Math.random() * 0.02,
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      // Delta time normalization for high-refresh-rate displays (60Hz, 120Hz, 144Hz, 240Hz)
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const speedMultiplier = delta * 60; // Normalize against 60fps base

      ctx.clearRect(0, 0, width, height);

      if (isPlaying) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX * speedMultiplier;
          p.y += p.speedY * speedMultiplier;
          if (p.rotation !== undefined && p.rotSpeed) {
            p.rotation += p.rotSpeed * speedMultiplier;
          }

          // Wrap around edges
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          if (p.type === 'gold') {
            ctx.fillStyle = `rgba(245, 206, 104, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Stylized micro emerald-gold leaf
            ctx.save();
            ctx.translate(p.x, p.y);
            if (p.rotation !== undefined) ctx.rotate(p.rotation);
            ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity * 0.6})`;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {/* 1. Instant Deep Royal Emerald Background (0ms initial load, zero black screen) */}
      <div className="absolute inset-0 bg-[#03160E]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A3324] via-[#041A11] to-[#020B07]" />

      {/* 2. Hardware-Accelerated Ambient Aurora & Liquid Gold Lights (Silky 120Hz/144Hz) */}
      <div
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-emerald-500/12 via-[#D4AF37]/8 to-transparent blur-[140px] pointer-events-none"
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#F5CE68]/10 via-emerald-600/8 to-transparent blur-[130px] pointer-events-none"
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#059669]/10 via-[#D4AF37]/6 to-transparent blur-[150px] pointer-events-none"
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      />

      {/* 3. Luxury Vignette & Deep Royal Emerald Edge Masking */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/90 via-transparent to-[#041810]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,13,8,0.7)_95%)] pointer-events-none" />

      {/* 4. High-Refresh-Rate Canvas: Golden Dust & Floating Botanical Embers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      />

      {/* 5. Ornate Golden Filigree Frame Corners (Subtle royal framing) */}
      <div className="absolute top-4 left-4 w-20 h-20 text-[#D4AF37] opacity-20 pointer-events-none hidden sm:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 80 L5 15 C5 9 9 5 15 5 L80 5" />
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <path d="M12 12 Q 25 5 35 15 Q 15 25 12 12" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-4 right-4 w-20 h-20 text-[#D4AF37] opacity-20 pointer-events-none hidden sm:block transform -scale-x-100">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 80 L5 15 C5 9 9 5 15 5 L80 5" />
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <path d="M12 12 Q 25 5 35 15 Q 15 25 12 12" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>

      {/* 6. Subtle Bottom Ambient Control Badge */}
      <div
        className="absolute bottom-6 left-6 z-30 pointer-events-auto"
        onMouseEnter={() => setControlsVisible(true)}
        onMouseLeave={() => setControlsVisible(false)}
      >
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 shadow-lg text-xs text-[#F5CE68]">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full hover:bg-emerald-950/70 text-[#F5CE68] hover:text-white transition-colors"
            title={isPlaying ? 'Pause Ambient Particles' : 'Resume Ambient Particles'}
            aria-label="Toggle Ambient Animation"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]/80 mr-1" />
          {controlsVisible && (
            <span className="text-[10px] pr-2 font-bold uppercase tracking-wider text-[#D4AF37] animate-in fade-in duration-200">
              Royal Atmosphere
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

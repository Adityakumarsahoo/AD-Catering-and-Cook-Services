import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Sparkles, VolumeX, Eye } from 'lucide-react';

interface LeafParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  shade: string;
}

interface GoldDust {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface SteamParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  growth: number;
}

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [leavesEnabled, setLeavesEnabled] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

  // High quality streaming catering/food steam loops with fallback
  const videoSources = [
    // Direct reliable MP4 catering & cooking ambient loops
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  ];

  useEffect(() => {
    // Attempt autoPlay reliably (browsers allow muted autoPlay)
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Canvas Physics Engine: Floating Green Leaves + Golden God Rays + Gold Dust + Steam
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Initialize Floating Fresh Green Leaves (Matching user's video)
    const leafCount = width < 768 ? 16 : 30;
    const leaves: LeafParticle[] = [];
    const leafShades = ['#22c55e', '#16a34a', '#15803d', '#4ade80', '#10b981'];

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 14 + Math.random() * 22,
        speedX: -0.4 + Math.random() * 0.8,
        speedY: 0.6 + Math.random() * 1.4,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: -0.02 + Math.random() * 0.04,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.02 + Math.random() * 0.03,
        opacity: 0.6 + Math.random() * 0.4,
        shade: leafShades[Math.floor(Math.random() * leafShades.length)],
      });
    }

    // 2. Initialize Golden Dust Particles (Sparkling bokeh)
    const dustCount = width < 768 ? 25 : 55;
    const dustParticles: GoldDust[] = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.8,
        speedY: -0.2 - Math.random() * 0.5,
        opacity: 0.2 + Math.random() * 0.7,
        pulseSpeed: 0.03 + Math.random() * 0.05,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // 3. Initialize Culinary Steam Particles from bottom corners
    const steamCount = 18;
    const steamParticles: SteamParticle[] = [];
    for (let i = 0; i < steamCount; i++) {
      steamParticles.push({
        x: width * 0.15 + (Math.random() - 0.5) * 120,
        y: height + Math.random() * 50,
        radius: 15 + Math.random() * 25,
        speedY: -0.6 - Math.random() * 0.8,
        speedX: -0.2 + Math.random() * 0.4,
        opacity: 0.08 + Math.random() * 0.12,
        growth: 0.12 + Math.random() * 0.18,
      });
    }

    let rayPhase = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // A. Golden Volumetric God Rays from Top-Right (pulsating gently as in video)
      rayPhase += 0.015;
      const rayAlpha = 0.14 + Math.sin(rayPhase) * 0.04;
      
      const rayGrad = ctx.createRadialGradient(
        width,
        0,
        10,
        width * 0.6,
        height * 0.6,
        Math.max(width, height)
      );
      rayGrad.addColorStop(0, `rgba(255, 223, 115, ${rayAlpha * 1.5})`);
      rayGrad.addColorStop(0.3, `rgba(212, 175, 55, ${rayAlpha})`);
      rayGrad.addColorStop(0.6, `rgba(16, 185, 129, ${rayAlpha * 0.4})`);
      rayGrad.addColorStop(1, 'rgba(4, 24, 16, 0)');

      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, width, height);

      // B. Render Rising Culinary Steam Wisps
      for (const s of steamParticles) {
        s.y += s.speedY;
        s.x += s.speedX;
        s.radius += s.growth;
        s.opacity *= 0.994;

        if (s.y < height * 0.3 || s.opacity <= 0.01) {
          s.y = height + 10;
          s.x = width * (Math.random() < 0.5 ? 0.15 : 0.85) + (Math.random() - 0.5) * 140;
          s.radius = 15 + Math.random() * 20;
          s.opacity = 0.07 + Math.random() * 0.12;
        }

        const steamGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        steamGrad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        steamGrad.addColorStop(0.5, `rgba(240, 253, 244, ${s.opacity * 0.5})`);
        steamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = steamGrad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // C. Render Golden Dust / Bokeh Particles
      for (const d of dustParticles) {
        d.y += d.speedY;
        d.pulsePhase += d.pulseSpeed;
        const currentOpacity = d.opacity * (0.6 + Math.sin(d.pulsePhase) * 0.4);

        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(255, 223, 115, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo on larger dust
        if (d.size > 2) {
          ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // D. Render Drifting & Fluttering Fresh Green Leaves
      if (leavesEnabled) {
        for (const l of leaves) {
          l.x += l.speedX;
          l.y += l.speedY;
          l.angle += l.rotationSpeed;
          l.flip += l.flipSpeed;

          // Wrap around screen
          if (l.y > height + 30) {
            l.y = -30;
            l.x = Math.random() * width;
          }
          if (l.x < -30) l.x = width + 30;
          if (l.x > width + 30) l.x = -30;

          ctx.save();
          ctx.translate(l.x, l.y);
          ctx.rotate(l.angle);
          ctx.scale(Math.cos(l.flip), 1); // 3D tumbling flip effect
          ctx.globalAlpha = l.opacity;

          // Draw organic leaf shape
          ctx.beginPath();
          ctx.moveTo(0, -l.size * 0.5);
          ctx.bezierCurveTo(
            l.size * 0.45,
            -l.size * 0.3,
            l.size * 0.45,
            l.size * 0.3,
            0,
            l.size * 0.5
          );
          ctx.bezierCurveTo(
            -l.size * 0.45,
            l.size * 0.3,
            -l.size * 0.45,
            -l.size * 0.3,
            0,
            -l.size * 0.5
          );

          ctx.fillStyle = l.shade;
          ctx.fill();

          // Leaf center vein
          ctx.strokeStyle = '#86efac';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, -l.size * 0.45);
          ctx.lineTo(0, l.size * 0.45);
          ctx.stroke();

          // Specular leaf shine
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.beginPath();
          ctx.ellipse(l.size * 0.12, -l.size * 0.12, l.size * 0.18, l.size * 0.08, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [leavesEnabled]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Underlying Royal Emerald Gradient Canvas */}
      <div className="absolute inset-0 bg-[#03160E]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A3324] via-[#041A11] to-[#020B07]" />

      {/* 2. Automatic Video Element Playing Seamlessly */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover filter brightness-[0.45] contrast-[1.25] saturate-[140%] mix-blend-screen transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          type="video/mp4"
        />
      </video>

      {/* 3. Luxury Vignette & Deep Emerald Tint Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020D08] via-transparent to-[#041810]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,13,8,0.75)_95%)]" />

      {/* 4. Canvas Particle Layer (Leaves, God Rays, Gold Dust, Steam) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 5. Ornate Golden Filigree Frame Corners (Subtle brand framing) */}
      <div className="absolute top-4 left-4 w-20 h-20 text-[#D4AF37] opacity-25 pointer-events-none hidden sm:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 80 L5 15 C5 9 9 5 15 5 L80 5" />
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <path d="M12 12 Q 25 5 35 15 Q 15 25 12 12" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-4 right-4 w-20 h-20 text-[#D4AF37] opacity-25 pointer-events-none hidden sm:block transform -scale-x-100">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 80 L5 15 C5 9 9 5 15 5 L80 5" />
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <path d="M12 12 Q 25 5 35 15 Q 15 25 12 12" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>

      {/* 6. Subtle Bottom Ambient Controls (Allows visitor to toggle video/leaves) */}
      <div
        className="absolute bottom-6 left-6 z-30 pointer-events-auto"
        onMouseEnter={() => setControlsVisible(true)}
        onMouseLeave={() => setControlsVisible(false)}
      >
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 shadow-lg text-xs text-[#F5CE68]">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-full hover:bg-emerald-950/70 text-[#F5CE68] hover:text-white transition-colors"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
            aria-label="Toggle Video Playback"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setLeavesEnabled(!leavesEnabled)}
            className={`p-1.5 rounded-full transition-colors ${
              leavesEnabled
                ? 'text-emerald-400 bg-emerald-950/60'
                : 'text-slate-400 hover:text-white'
            }`}
            title={leavesEnabled ? 'Disable Floating Leaves' : 'Enable Floating Leaves'}
            aria-label="Toggle Leaves Animation"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {controlsVisible && (
            <span className="text-[10px] pr-2 font-bold uppercase tracking-wider text-[#D4AF37] animate-in fade-in duration-200">
              Live Atmosphere
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

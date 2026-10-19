import React, { useEffect, useState } from 'react';

export const AmbientBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Subtle parallax listener with rAF throttle for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* ====================================================
          CINEMATIC ZOOM-OUT WRAPPER (Scale 1.08 -> 1.00 over 12s)
          ==================================================== */}
      <div className="absolute inset-0 w-full h-full animate-ice-zoom origin-center">
        
        {/* ====================================================
            LAYER 1: VERY LIGHT ICY FOUNDATION GRADIENT
            Ice White → Frost Blue → Pale Cyan → Soft Blue-Gray
            ==================================================== */}
        <div className="absolute inset-0 bg-[#F1F6FB]" />
        
        {/* Subtle radial wash of Pale Cyan and Frost Blue */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFFFFF] via-[#EAF2F9] to-[#E1ECF6]" />

        {/* ====================================================
            LAYER 2: LARGE BLURRED FROST & ICE GRADIENT BLOBS (24s - 38s)
            ==================================================== */}
        {/* 1. Pure Frost White / Ice Blue Key Glow (Top-Left) */}
        <div
          className="absolute -top-36 -left-36 w-[750px] h-[750px] rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#E0F2FE]/70 to-[#BAE6FD]/40 blur-[130px] animate-orb-1 opacity-80"
          style={{ transform: `translate3d(0, ${scrollY * 0.04}px, 0)` }}
        />

        {/* 2. Soft Cyan & Frost Blue Light (Center-Right) */}
        <div
          className="absolute top-1/4 -right-28 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#CFFAFE]/65 via-[#BAE6FD]/45 to-transparent blur-[125px] animate-orb-2"
          style={{ transform: `translate3d(0, ${scrollY * -0.03}px, 0)` }}
        />

        {/* 3. Subtle Champagne Gold Warm Accent (Mid-Lower Left) */}
        <div
          className="absolute top-2/3 left-1/5 w-[550px] h-[500px] rounded-full bg-gradient-to-tr from-[#FDE68A]/25 via-[#D4AF37]/12 to-transparent blur-[140px] animate-orb-3"
          style={{ transform: `translate3d(0, ${scrollY * 0.02}px, 0)` }}
        />

        {/* 4. Very Subtle Brand Wine/Burgundy Warm Whisper (Bottom-Right) */}
        <div
          className="absolute top-1/2 -right-32 w-[480px] h-[480px] rounded-full bg-gradient-to-l from-[#6B1724]/08 via-[#831843]/05 to-transparent blur-[150px] animate-orb-4"
        />

        {/* 5. Central Icy Soft White Bloom */}
        <div
          className="absolute top-1/3 left-1/3 w-[520px] h-[520px] rounded-full bg-white/70 blur-[130px] animate-pulse-glow"
        />

        {/* ====================================================
            LAYER 3: SUBTLE CATERING & FOOD IMAGERY (PARALLAX + 4-6% OPACITY)
            ==================================================== */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }}
        >
          {/* Top-Left: Royal Catering Platter & Rising Warm Steam Line Art */}
          <div className="absolute top-24 left-8 sm:left-20 text-[#D4AF37] opacity-[0.048]">
            <svg width="220" height="220" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M85 45 C80 35 90 25 85 15" strokeLinecap="round" className="animate-steam" />
              <path d="M100 42 C95 32 105 22 100 12" strokeLinecap="round" className="animate-steam" style={{ animationDelay: '2s' }} />
              <path d="M115 45 C110 35 120 25 115 15" strokeLinecap="round" className="animate-steam" style={{ animationDelay: '4s' }} />
              <circle cx="100" cy="50" r="5" fill="currentColor" fillOpacity="0.1" />
              <path d="M40 120 C40 70 70 55 100 55 C130 55 160 70 160 120 Z" />
              <path d="M25 125 C25 122 30 120 35 120 L165 120 C170 120 175 122 175 125 C175 128 170 130 165 130 L35 130 C30 130 25 128 25 125 Z" fill="currentColor" fillOpacity="0.08" />
              <path d="M50 112 L150 112" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Top-Right: Elegant Wedding Catering Crystalline Rangoli Motif */}
          <div className="absolute top-16 right-8 sm:right-24 text-[#D4AF37] opacity-[0.042]">
            <svg width="260" height="260" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="60" />
              <circle cx="100" cy="100" r="40" strokeDasharray="2 3" />
              <circle cx="100" cy="100" r="20" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <g key={idx} transform={`rotate(${angle} 100 100)`}>
                  <path d="M100 40 C92 60 92 80 100 100 C108 80 108 60 100 40 Z" fill="currentColor" fillOpacity="0.04" />
                  <circle cx="100" cy="30" r="2.5" fill="currentColor" fillOpacity="0.25" />
                </g>
              ))}
            </svg>
          </div>

          {/* Mid-Right: Crossed Chef Spoon & Fork Culinary Insignia */}
          <div className="absolute top-1/2 right-12 text-[#D4AF37] opacity-[0.045]">
            <svg width="180" height="180" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.2">
              <g transform="rotate(45 80 80)">
                <path d="M76 25 C70 30 70 45 76 50 C80 54 80 140 80 140" strokeLinecap="round" />
                <path d="M84 25 C90 30 90 45 84 50 C80 54 80 140 80 140" strokeLinecap="round" />
                <ellipse cx="80" cy="37" rx="8" ry="14" fill="currentColor" fillOpacity="0.08" />
              </g>
              <g transform="rotate(-45 80 80)">
                <path d="M74 25 L74 48 C74 55 78 58 80 62 L80 140" strokeLinecap="round" />
                <path d="M86 25 L86 48 C86 55 82 58 80 62" strokeLinecap="round" />
                <path d="M80 25 L80 50" strokeLinecap="round" />
                <path d="M72 45 C72 54 88 54 88 45" />
              </g>
            </svg>
          </div>

          {/* Mid-Left: Delicate Fresh Herb & Spice Line Art */}
          <div className="absolute top-1/3 left-10 text-[#D4AF37] opacity-[0.04]">
            <svg width="180" height="180" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M30 140 C50 110 80 70 130 30" strokeLinecap="round" />
              <path d="M55 105 C40 100 40 85 58 92 C70 98 62 108 55 105 Z" fill="currentColor" fillOpacity="0.06" />
              <path d="M75 88 C90 80 95 65 80 75 C70 82 72 90 75 88 Z" fill="currentColor" fillOpacity="0.06" />
              <path d="M92 70 C80 60 82 45 98 52 C108 58 100 68 92 70 Z" fill="currentColor" fillOpacity="0.06" />
              <path d="M112 50 C125 40 130 25 115 35 C105 42 108 48 112 50 Z" fill="currentColor" fillOpacity="0.06" />
            </svg>
          </div>

          {/* Bottom-Right: Grand Wedding Catering Banquet Buffet Table Silhouette */}
          <div className="absolute bottom-16 right-16 text-[#D4AF37] opacity-[0.045]">
            <svg width="240" height="130" viewBox="0 0 220 120" fill="none" stroke="currentColor" strokeWidth="1">
              <line x1="20" y1="90" x2="200" y2="90" strokeWidth="1.5" />
              <ellipse cx="60" cy="85" rx="25" ry="6" />
              <path d="M45 85 C45 70 75 70 75 85" />
              <ellipse cx="110" cy="85" rx="30" ry="7" />
              <path d="M90 85 C90 65 130 65 130 85" />
              <ellipse cx="160" cy="85" rx="25" ry="6" />
              <path d="M145 85 C145 70 175 70 175 85" />
              <path d="M20 90 Q 40 105 60 90 Q 80 105 100 90 Q 120 105 140 90 Q 160 105 180 90 Q 200 105 200 90" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>

        {/* ====================================================
            LAYER 4: SUBTLE FLOATING ICE & GOLD PARTICLES (RESTRICTED NUMBER)
            Tiny white particles, soft blue particles, occasional gold particles
            ==================================================== */}
        <div className="absolute top-1/6 left-1/4 w-2 h-2 rounded-full bg-white blur-[0.8px] shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-ice-particle" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#BAE6FD] blur-[0.6px] animate-ice-particle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px] opacity-40 animate-ice-particle" style={{ animationDelay: '3.2s' }} />
        <div className="absolute top-3/4 right-1/4 w-2.5 h-2.5 rounded-full bg-white blur-[1px] animate-ice-particle" style={{ animationDelay: '2.4s' }} />
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 rounded-full bg-[#CFFAFE] blur-[0.8px] animate-ice-particle" style={{ animationDelay: '4.2s' }} />
        <div className="absolute top-4/5 left-2/3 w-2 h-2 rounded-full bg-white blur-[1px] animate-ice-particle" style={{ animationDelay: '5.1s' }} />

        {/* ====================================================
            LAYER 5: FROSTED GLASS ICE TEXTURE GRAIN
            ==================================================== */}
        <div className="absolute inset-0 bg-grain opacity-60" />
      </div>
    </div>
  );
};

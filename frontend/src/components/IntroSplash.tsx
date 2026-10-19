import React, { useEffect, useState } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

export const IntroSplash: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show once per session to avoid annoying returning users
    const hasSeenSplash = sessionStorage.getItem('ad_catering_splash_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenSplash || prefersReducedMotion) {
      return;
    }

    setVisible(true);
    sessionStorage.setItem('ad_catering_splash_seen', 'true');

    // Trigger smooth fade out after 850ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 850);

    // Remove from DOM after 1250ms total
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1250);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#0A0507] flex items-center justify-center pointer-events-none transition-opacity duration-400 ease-out ${
        fading ? 'opacity-0 scale-102' : 'opacity-100 scale-100'
      }`}
    >
      <div className="text-center space-y-4">
        {/* Luxury Glowing Emblem */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#6B1724] to-[#D4AF37] blur-xl opacity-60 animate-pulse" />
          <div className="relative w-full h-full rounded-3xl bg-[#140A0E] border border-[#D4AF37]/50 p-[2px] flex items-center justify-center shadow-2xl">
            <ChefHat className="w-9 h-9 text-[#F5CE68]" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="font-display font-black text-xl tracking-wider text-white flex items-center justify-center gap-2">
            <span>AD CATERING</span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </h2>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold">
            & Cook Services · Odisha
          </p>
        </div>

        <div className="w-28 h-[2px] mx-auto rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-pulse" />
      </div>
    </div>
  );
};

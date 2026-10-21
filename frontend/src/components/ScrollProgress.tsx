import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[70] bg-[#020D08]/40 backdrop-blur-xs pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="relative h-full bg-gradient-to-r from-[#997010] via-[#D4AF37] to-[#F5CE68] shadow-[0_0_12px_rgba(245,206,104,0.9),0_0_24px_rgba(212,175,55,0.5)] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Leading radiant diamond bead */}
        {scrollProgress > 1 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FFFBEA] border border-[#F5CE68] shadow-[0_0_10px_#F5CE68,0_0_20px_#D4AF37] -mr-1 animate-pulse" />
        )}
      </div>
    </div>
  );
};


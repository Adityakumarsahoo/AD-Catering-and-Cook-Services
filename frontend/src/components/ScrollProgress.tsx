import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (windowHeight > 0) {
            setScrollProgress(Math.min(1, Math.max(0, totalScroll / windowHeight)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[70] bg-[#020D08]/40 pointer-events-none"
      aria-hidden="true"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <div
        className="h-full w-full bg-gradient-to-r from-[#997010] via-[#D4AF37] to-[#F5CE68] shadow-[0_0_12px_rgba(245,206,104,0.9),0_0_24px_rgba(212,175,55,0.5)] origin-left"
        style={{
          transform: `scaleX(${scrollProgress})`,
          willChange: 'transform',
          transition: 'transform 0.08s ease-out',
        }}
      />
    </div>
  );
};

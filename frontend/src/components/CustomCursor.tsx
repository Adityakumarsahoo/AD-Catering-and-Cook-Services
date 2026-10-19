import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'button' | 'image' | 'link'>('default');
  const [hidden, setHidden] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer & without prefers-reduced-motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setHidden(false);

      // Check element under cursor for interactive hover states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('button, .gold-gradient-btn, .burgundy-gradient-btn, [role="button"]')) {
        setCursorState('button');
      } else if (target.closest('img, .gallery-item, [data-cursor="image"]')) {
        setCursorState('image');
      } else if (target.closest('a, [data-cursor="link"]')) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth physics loop with lerp for luxury lag effect
    const render = () => {
      // Lerp ring towards dot
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled || hidden) return null;

  // Sizing and styling based on cursorState
  let ringClasses = 'w-9 h-9 border-white/40 bg-white/[0.04]';
  if (cursorState === 'button') {
    ringClasses = 'w-14 h-14 border-[#D4AF37] bg-[#D4AF37]/15 scale-110';
  } else if (cursorState === 'image') {
    ringClasses = 'w-18 h-18 border-[#F5CE68]/80 bg-[#6B1724]/20 backdrop-blur-sm scale-125';
  } else if (cursorState === 'link') {
    ringClasses = 'w-6 h-6 border-[#F5CE68]/60 bg-transparent';
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Glass Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,background-color,border-color,transform] duration-200 ease-out shadow-[0_0_15px_rgba(212,175,55,0.25)] ${ringClasses}`}
        style={{ willChange: 'transform' }}
      />
      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#F5CE68] shadow-[0_0_8px_#D4AF37]"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

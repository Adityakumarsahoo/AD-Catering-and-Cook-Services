import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface MagneticButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'burgundy' | 'glass' | 'ice';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  to,
  onClick,
  className = '',
  variant = 'gold',
  type = 'button',
  disabled = false,
}) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const match = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(match.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !btnRef.current || disabled) return;

    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Dampen to maximum 8px
    const maxDist = 8;
    const x = Math.max(-maxDist, Math.min(maxDist, distanceX * 0.22));
    const y = Math.max(-maxDist, Math.min(maxDist, distanceY * 0.22));

    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'gold':
        return 'gold-gradient-btn text-[#041810] shadow-[0_10px_30px_rgba(212,175,55,0.4)]';
      case 'burgundy':
        return 'burgundy-gradient-btn text-white shadow-[0_10px_30px_rgba(74,14,23,0.5)]';
      case 'ice':
        return 'bg-emerald-950/80 border border-[#D4AF37]/60 text-white shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:border-[#D4AF37] hover:bg-emerald-900';
      case 'glass':
      default:
        return 'bg-[#041810]/80 border border-[#D4AF37]/40 text-white hover:border-[#D4AF37] shadow-md';
    }
  };

  const innerContent = (
    <div
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
      }}
      className={`liquid-shine inline-flex items-center justify-center gap-2 group transition-all duration-300 active:scale-[0.97] ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {to ? (
        <Link to={to} className="inline-block">
          {innerContent}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className="inline-block bg-transparent p-0 border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {innerContent}
        </button>
      )}
    </div>
  );
};

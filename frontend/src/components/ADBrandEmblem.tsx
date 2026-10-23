import React from 'react';

interface ADBrandEmblemProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  imgClassName?: string;
}

export const ADBrandEmblem: React.FC<ADBrandEmblemProps> = ({
  size = 'md',
  showText = false,
  className = '',
  imgClassName = '',
}) => {
  const sizeMap = {
    xs: { box: 'w-8 h-8', text: 'text-[9px]' },
    sm: { box: 'w-10 h-10 sm:w-11 sm:h-11', text: 'text-xs' },
    md: { box: 'w-16 h-16 sm:w-20 sm:h-20', text: 'text-sm' },
    lg: { box: 'w-28 h-28 sm:w-36 sm:h-36', text: 'text-lg' },
    xl: { box: 'w-44 h-44 sm:w-52 sm:h-52', text: 'text-2xl' },
    '2xl': { box: 'w-60 h-60 sm:w-72 sm:h-72', text: 'text-3xl' },
  };

  const current = sizeMap[size as keyof typeof sizeMap] || sizeMap.md;

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Exact 3D Circular Gold & Black Emblem matching the official brand picture */}
      <div
        className={`relative ${current.box} rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0`}
      >
        <img
          src="/images/logo-badge.png"
          alt="AD Catering and Cook Services"
          className={`w-full h-full object-cover rounded-full filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)] select-none pointer-events-none ${imgClassName}`}
          loading="eager"
          decoding="async"
          onError={(e) => {
            // Fallback to /logo.png if logo-badge is unavailable
            const target = e.currentTarget;
            if (target.src.indexOf('logo.png') === -1) {
              target.src = '/logo.png';
            }
          }}
        />
      </div>

      {/* Brand Typography block underneath */}
      {showText && (
        <div className="text-center mt-2.5">
          <div className="flex items-center justify-center gap-1">
            <span className="font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F5CE68] via-[#FFDF73] to-[#D4AF37] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              AD Catering
            </span>
          </div>
          <p className="text-[10px] tracking-[0.22em] uppercase font-bold text-[#D4AF37] opacity-95">
            and Cook Services
          </p>
        </div>
      )}
    </div>
  );
};

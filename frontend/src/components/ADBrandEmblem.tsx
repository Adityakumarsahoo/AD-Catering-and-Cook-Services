import React from 'react';

interface ADBrandEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const ADBrandEmblem: React.FC<ADBrandEmblemProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-10 h-10', svg: 40, text: 'text-xs' },
    md: { box: 'w-16 h-16', svg: 64, text: 'text-sm' },
    lg: { box: 'w-28 h-28', svg: 112, text: 'text-lg' },
    xl: { box: 'w-44 h-44', svg: 176, text: 'text-2xl' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* 3D Circular Gold & Black Emblem matching 'Luxurious AD Catering Emblem.png' */}
      <div className={`relative ${current.box} rounded-full p-[2.5px] bg-gradient-to-tr from-[#996515] via-[#FFDF73] via-[#D4AF37] to-[#593A07] shadow-[0_8px_30px_rgba(212,175,55,0.45)] group`}>
        {/* Inner concentric gold ring */}
        <div className="w-full h-full rounded-full bg-[#041810] border border-[#F5CE68]/60 p-[3px] flex items-center justify-center relative overflow-hidden shadow-inner">
          {/* Subtle radial dark sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(212,175,55,0.22)_0%,rgba(6,35,25,0.95)_70%)]" />

          {/* SVG Vector Graphic of the exact AD Monogram, Chef Hat, Cloche, Fork & Spoon, Green Leaves */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full relative z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Metallic Gold Gradient 1 */}
              <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1B8" />
                <stop offset="25%" stopColor="#E5C04A" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="75%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#7A5600" />
              </linearGradient>

              {/* Metallic Gold Gradient 2 for bevel */}
              <linearGradient id="goldBevel" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8A5A00" />
                <stop offset="40%" stopColor="#FFEA9F" />
                <stop offset="70%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FFF5CC" />
              </linearGradient>

              {/* Fresh Green Leaf Gradient */}
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="50%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#065F46" />
              </linearGradient>

              {/* Chef Hat Shading */}
              <linearGradient id="chefHatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
            </defs>

            {/* Chef Hat atop the Letter 'A' */}
            <g transform="translate(70, 18) scale(0.68)">
              {/* Puffs of chef hat */}
              <path
                d="M15 48 C10 38 12 25 24 20 C28 10 44 8 52 16 C60 6 78 8 84 18 C94 22 98 35 90 48 Z"
                fill="url(#chefHatGrad)"
                stroke="#B8860B"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Chef Hat folds */}
              <path d="M36 24 C40 34 38 42 36 48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <path d="M52 18 C54 30 52 40 50 48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <path d="M68 22 C66 32 68 40 70 48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              {/* Hat brim with gold trim */}
              <rect x="22" y="47" width="62" height="12" rx="4" fill="url(#goldGrad1)" stroke="#593A07" strokeWidth="1.5" />
            </g>

            {/* Rising Steam from the Cloche on right */}
            <g opacity="0.9">
              <path d="M142 35 C146 28 142 22 147 16" stroke="url(#goldBevel)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M152 38 C158 30 154 24 160 17" stroke="url(#goldGrad1)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M162 42 C166 35 163 29 168 23" stroke="url(#goldBevel)" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* 3D Golden Monogram: Letter 'A' */}
            <path
              d="M48 135 L62 72 C63 68 67 65 72 65 L88 65 L106 135 L88 135 L83 115 L66 115 L62 135 Z M70 98 L80 98 L75 79 Z"
              fill="url(#goldGrad1)"
              stroke="#593A07"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* 3D Golden Monogram: Letter 'D' merged with Cloche & Cutlery */}
            <path
              d="M96 65 L124 65 C148 65 168 80 168 100 C168 120 148 135 124 135 L96 135 Z M114 80 L114 120 L124 120 C138 120 148 111 148 100 C148 89 138 80 124 80 Z"
              fill="url(#goldBevel)"
              stroke="#593A07"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Golden Cloche (Food Dome Cover) on upper-right of 'D' */}
            <g transform="translate(136, 42)">
              {/* Knob */}
              <circle cx="16" cy="6" r="3.5" fill="url(#goldBevel)" stroke="#593A07" strokeWidth="1" />
              {/* Dome */}
              <path d="M4 22 C4 12 10 7 16 7 C22 7 28 12 28 22 Z" fill="url(#goldGrad1)" stroke="#593A07" strokeWidth="1.5" />
              {/* Tray rim */}
              <path d="M1 22 L31 22 C32 22 33 23 32 24 C31 25 30 26 28 26 L4 26 C2 26 1 25 0 24 C-1 23 0 22 1 22 Z" fill="url(#goldBevel)" stroke="#593A07" strokeWidth="1" />
            </g>

            {/* Golden Fork & Spoon inside the 'D' Counter */}
            <g transform="translate(122, 85) scale(0.72)">
              {/* Fork */}
              <g transform="translate(-8, 0)">
                <path d="M6 3 L6 16 C6 19 8 21 11 21 L11 44 L13 44 L13 21 C16 21 18 19 18 16 L18 3 L16 3 L16 13 L14 13 L14 3 L12 3 L12 13 L10 13 L10 3 Z" fill="url(#goldGrad1)" stroke="#593A07" strokeWidth="0.8" />
              </g>
              {/* Spoon */}
              <g transform="translate(8, 0)">
                <ellipse cx="9" cy="11" rx="6" ry="9" fill="url(#goldBevel)" stroke="#593A07" strokeWidth="0.8" />
                <path d="M8 20 L8 44 L10 44 L10 20 Z" fill="url(#goldGrad1)" stroke="#593A07" strokeWidth="0.8" />
              </g>
            </g>

            {/* Fresh Twin Green Leaves on Ribbon */}
            <g transform="translate(42, 88)">
              {/* Leaf 1 */}
              <path
                d="M14 22 C14 10 24 4 34 2 C34 14 26 22 14 22 Z"
                fill="url(#leafGrad)"
                stroke="#14532D"
                strokeWidth="1.2"
              />
              <path d="M14 22 C22 15 28 8 34 2" stroke="#86EFAC" strokeWidth="0.8" />
              {/* Leaf 2 */}
              <path
                d="M12 24 C6 18 6 8 18 6 C20 16 16 22 12 24 Z"
                fill="url(#leafGrad)"
                stroke="#14532D"
                strokeWidth="1.2"
              />
            </g>

            {/* Flowing Gold Ribbon beneath Monogram */}
            <path
              d="M44 116 C55 110 70 114 90 108 C115 101 135 108 152 114 C140 120 115 115 90 120 C70 124 55 120 44 116 Z"
              fill="url(#goldGrad1)"
              stroke="#593A07"
              strokeWidth="1.5"
            />

            {/* Symmetrical Golden Floral Filigree Ornament at Bottom */}
            <g transform="translate(100, 168) scale(0.65)">
              <circle cx="0" cy="0" r="4" fill="url(#goldGrad1)" />
              <path d="M0 -3 C-8 -12 -18 -8 -22 2 C-14 3 -6 -1 0 0 C6 -1 14 3 22 2 C18 -8 8 -12 0 -3 Z" fill="url(#goldBevel)" />
              <path d="M-22 2 C-32 3 -36 -4 -40 -10 C-36 -2 -28 3 -22 2 Z" fill="url(#goldGrad1)" />
              <path d="M22 2 C32 3 36 -4 40 -10 C36 -2 28 3 22 2 Z" fill="url(#goldGrad1)" />
              <circle cx="-42" cy="-11" r="2" fill="url(#goldBevel)" />
              <circle cx="42" cy="-11" r="2" fill="url(#goldBevel)" />
            </g>
          </svg>
        </div>
      </div>

      {/* Optional Brand Typography block underneath */}
      {showText && (
        <div className="text-center mt-2">
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

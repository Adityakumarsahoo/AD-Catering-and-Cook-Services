// frontend/src/components/common/PageSkeleton.tsx
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-[50vh] w-full flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-transparent pointer-events-none" />

      {/* Elegant Shimmer Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full p-8 rounded-3xl bg-[#072F1F]/80 border border-[#D4AF37]/35 shadow-2xl backdrop-blur-xl">
        {/* Shimmer sweep */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5CE68]/15 to-transparent animate-[shimmer_1.6s_infinite]" />
        </div>

        {/* Golden culinary crest */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A3D29] to-[#052115] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg mb-4">
          <UtensilsCrossed className="w-7 h-7 text-[#F5CE68] animate-pulse" />
        </div>

        {/* Skeleton text bars */}
        <div className="h-4 w-40 bg-[#0A3D29]/90 rounded-full mb-3 animate-pulse" />
        <div className="h-2.5 w-56 bg-[#0A3D29]/60 rounded-full mb-5 animate-pulse" />

        {/* Gold progress line */}
        <div className="w-24 h-1 rounded-full bg-[#0A3D29] overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] rounded-full animate-[shimmer_1.4s_infinite]" />
        </div>
      </div>
    </div>
  );
};


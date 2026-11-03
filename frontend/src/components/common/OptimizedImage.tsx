// frontend/src/components/common/OptimizedImage.tsx
import React, { useState, useEffect } from 'react';
import { UtensilsCrossed } from 'lucide-react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
  secondaryFallback?: string;
  priority?: boolean;
  onClick?: () => void;
  showOverlay?: boolean;
  categoryHint?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-[16/10]',
  fallbackSrc,
  secondaryFallback = '/images/DISHE/Chenna Podo.png',
  priority = false,
  onClick,
  showOverlay = false,
  categoryHint,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallbackSrc || secondaryFallback);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorLevel, setErrorLevel] = useState<number>(0);

  // Sync state if source prop changes
  useEffect(() => {
    setCurrentSrc(src || fallbackSrc || secondaryFallback);
    setIsLoading(true);
    setHasError(false);
    setErrorLevel(0);
  }, [src, fallbackSrc, secondaryFallback]);

  const handleError = () => {
    if (errorLevel === 0 && fallbackSrc && fallbackSrc !== currentSrc) {
      setErrorLevel(1);
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else if (errorLevel < 2 && secondaryFallback !== currentSrc) {
      setErrorLevel(2);
      setCurrentSrc(secondaryFallback);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-br from-[#031D13] via-[#05281B] to-[#02130C] select-none ${containerClassName}`}
      onClick={onClick}
    >
      {/* 1. Luxury Gold & Emerald Shimmer Skeleton Loader (Eliminates Black Boxes) */}
      {isLoading && (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#042015]">
          {/* Shimmer sweep animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

          {/* Luxury Culinary Emblem in Skeleton State */}
          <div className="flex flex-col items-center justify-center gap-1.5 opacity-35">
            <UtensilsCrossed className="w-6 h-6 text-[#D4AF37]" />
            {categoryHint && (
              <span className="text-[10px] font-semibold text-[#D4AF37]/80 uppercase tracking-widest">
                {categoryHint}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. Responsive, Progressive High-Resolution Dish Image */}
      {!hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            isLoading ? 'opacity-0 scale-[1.03] blur-[4px]' : 'opacity-100 scale-100 blur-0'
          } ${className}`}
        />
      ) : (
        /* Graceful Final Fallback if All Network Assets Fail */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-[#041D14]">
          <UtensilsCrossed className="w-8 h-8 text-[#D4AF37]/40 mb-1" />
          <span className="text-[11px] font-bold text-[#F5CE68]/70 line-clamp-1">{alt}</span>
          <span className="text-[9px] text-[#A7F3D0]/60">AD Royal Catering</span>
        </div>
      )}

      {/* 3. Optional Ambient Vignette Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
};


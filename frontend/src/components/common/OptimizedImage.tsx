// frontend/src/components/common/OptimizedImage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { UtensilsCrossed } from 'lucide-react';

// Global memory cache of decoded image URLs in this session.
// Once an image has decoded once, any subsequent render or mount of that URL is marked loaded immediately (0ms).
const GLOBAL_IMAGE_CACHE = new Set<string>();

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
  aspectRatio = 'aspect-[16/11]',
  fallbackSrc,
  secondaryFallback = '/images/DISHE/Chenna Podo.png',
  priority = false,
  onClick,
  showOverlay = false,
  categoryHint,
}) => {
  const targetSrc = src || fallbackSrc || secondaryFallback;
  const isPreDecoded = GLOBAL_IMAGE_CACHE.has(targetSrc);

  const [currentSrc, setCurrentSrc] = useState<string>(targetSrc);
  const [isLoaded, setIsLoaded] = useState<boolean>(isPreDecoded);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorLevel, setErrorLevel] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const prevSrcRef = useRef<string>(targetSrc);

  // Check if image is already cached or complete on DOM mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      GLOBAL_IMAGE_CACHE.add(targetSrc);
      setIsLoaded(true);
    }
  }, [targetSrc]);

  // Sync state only if source prop genuinely changed to a different URL
  useEffect(() => {
    if (prevSrcRef.current !== targetSrc) {
      prevSrcRef.current = targetSrc;
      setCurrentSrc(targetSrc);
      if (GLOBAL_IMAGE_CACHE.has(targetSrc)) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
      setHasError(false);
      setErrorLevel(0);
    }
  }, [targetSrc]);

  const handleLoad = () => {
    GLOBAL_IMAGE_CACHE.add(currentSrc);
    setIsLoaded(true);
  };

  const handleError = () => {
    if (errorLevel === 0 && fallbackSrc && fallbackSrc !== currentSrc) {
      setErrorLevel(1);
      setCurrentSrc(fallbackSrc);
    } else if (errorLevel < 2 && secondaryFallback && secondaryFallback !== currentSrc) {
      setErrorLevel(2);
      setCurrentSrc(secondaryFallback);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-br from-[#072F1F] via-[#0A3D29] to-[#052115] select-none ${containerClassName}`}
      onClick={onClick}
    >
      {/* 1. Appetizing Royal Emerald & Gold Shimmer Skeleton (Never Pitch Black) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#072F1F] via-[#0A3D29] to-[#052115]">
          {/* Subtle Warm Amber Shimmer Beam */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5CE68]/15 to-transparent animate-[shimmer_1.6s_infinite]" />
          
          {/* Ambient Warm Radial Center Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,206,104,0.12)_0%,transparent_70%)]" />

          {/* Golden Culinary Crest in Skeleton State */}
          <div className="flex flex-col items-center justify-center gap-1.5 opacity-60">
            <UtensilsCrossed className="w-5 h-5 text-[#F5CE68]" />
            {categoryHint && (
              <span className="text-[9px] font-bold text-[#F5CE68] uppercase tracking-widest text-center px-2">
                {categoryHint}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. Responsive, Progressive High-Resolution Dish Image */}
      {!hasError ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'auto' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`relative z-1 w-full h-full object-cover transition-opacity duration-300 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          } ${className}`}
        />
      ) : (
        /* Graceful Final Fallback if All Network Assets Fail */
        <div className="absolute inset-0 z-1 flex flex-col items-center justify-center p-3 text-center bg-[#072F1F]">
          <UtensilsCrossed className="w-7 h-7 text-[#F5CE68]/60 mb-1" />
          <span className="text-[11px] font-bold text-[#F5CE68] line-clamp-1">{alt}</span>
          <span className="text-[9px] text-[#A7F3D0]/70">AD Catering Service</span>
        </div>
      )}

      {/* 3. Subtle Ambient Lighting Vignette (Gentle bottom contrast, NEVER 85% solid black) */}
      {showOverlay && (
        <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#02130C]/45 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
};

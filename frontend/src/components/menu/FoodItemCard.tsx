import React from 'react';
import { Eye, Plus, Check, Sparkles, UtensilsCrossed } from 'lucide-react';
import { ResolvedDish } from '../../utils/dishResolver.js';
import { useMenuCart } from '../../context/MenuCartContext.js';
import { OptimizedImage } from '../common/OptimizedImage.js';

export interface FoodItemCardProps {
  dish: ResolvedDish;
  onOpenDetail: (dish: ResolvedDish) => void;
  showCategoryBadge?: boolean;
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({
  dish,
  onOpenDetail,
  showCategoryBadge = false,
}) => {
  const { toggleDish, isDishSelected } = useMenuCart();
  const isSelected = isDishSelected(dish.id);

  return (
    <div
      onClick={() => onOpenDetail(dish)}
      className="group relative rounded-xl sm:rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#041A12]/95 via-[#02130C]/90 to-[#020D08]/95 border border-[#D4AF37]/35 hover:border-[#D4AF37] shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)] transition-all duration-300 flex flex-col justify-between cursor-pointer liquid-shine active:scale-[0.99] h-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetail(dish);
        }
      }}
      aria-label={`View details for ${dish.displayName || dish.name}`}
    >
      {/* Specular Top Shimmer */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#FFDF73]/40 to-transparent pointer-events-none group-hover:via-[#FFDF73]/80 transition-all" />

      <div>
        {/* Image Container with Badges */}
        <div className="relative h-28 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden mb-2.5 border border-[#D4AF37]/30 shadow-inner">
          <OptimizedImage
            src={dish.image}
            alt={dish.displayName || dish.name}
            fallbackSrc={dish.isVeg ? '/images/DISHE/Paneer Butter Masala.png' : '/images/DISHE/MUTTON CURRY.png'}
            secondaryFallback={dish.isVeg ? '/images/DISHE/DALEMA.png' : '/images/DISHE/CHICKEN BIRIYANI.png'}
            aspectRatio="h-full w-full"
            containerClassName="h-full w-full"
            showOverlay={true}
            className="group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Veg / Non-Veg Indicator Badge */}
          <div className="absolute top-1.5 left-1.5 z-10">
            {dish.isVeg ? (
              <span className="w-4 h-4 rounded-[3px] bg-white/95 border border-emerald-600 flex items-center justify-center shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shadow-sm" />
              </span>
            ) : (
              <span className="w-4 h-4 rounded-[3px] bg-white/95 border border-rose-600 flex items-center justify-center shadow-md">
                <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[7px] border-b-rose-600" />
              </span>
            )}
          </div>

          {/* Odia Specialty Pill */}
          {dish.isOdiaSpecialty && (
            <div className="absolute top-1.5 right-1.5 z-10">
              <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[8px] font-black uppercase tracking-wider shadow">
                Odia
              </span>
            </div>
          )}

          {/* Hover View Details Eye Capsule */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[1.5px]">
            <span className="px-2.5 py-1 rounded-full bg-[#041810]/95 border border-[#D4AF37] text-white text-[10px] font-bold shadow-lg flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3 h-3 text-[#FFDF73]" />
              <span>Details</span>
            </span>
          </div>
        </div>

        {/* Category Badge if requested */}
        {showCategoryBadge && dish.category && (
          <div className="mb-1">
            <span className="text-[8.5px] font-black uppercase tracking-wider text-[#F5CE68]">
              {dish.category}
            </span>
          </div>
        )}

        {/* Dish Title - Clean line-clamp-2 prevents awkward ellipsis */}
        <h4 className="font-display font-bold text-[12px] sm:text-[13.5px] text-white group-hover:text-[#FFDF73] transition-colors line-clamp-2 leading-snug min-h-[1.9rem] sm:min-h-[2.1rem] flex items-center">
          {dish.displayName || dish.name}
        </h4>

        {/* Short Description */}
        <p className="text-[10px] text-[#94A3B8] group-hover:text-[#CBD5E1] line-clamp-2 mt-0.5 leading-relaxed transition-colors font-normal hidden sm:block">
          {dish.description}
        </p>
      </div>

      {/* Card Footer: Quick Actions */}
      <div className="mt-3.5 pt-2.5 border-t border-[#D4AF37]/20 flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#F5CE68] flex items-center gap-1 group-hover:underline">
          <span>Explore Details</span>
          <Eye className="w-3 h-3 text-[#FFDF73]" />
        </span>

        {/* Tray Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleDish({
              id: dish.id,
              name: dish.displayName || dish.name,
              category: dish.category,
              price: dish.price,
              isVeg: dish.isVeg,
            });
          }}
          className={`p-1.5 rounded-lg border transition-all ${
            isSelected
              ? 'bg-rose-950 border-rose-400 text-rose-300 hover:bg-rose-900'
              : 'bg-emerald-950/80 border-[#D4AF37]/40 text-[#F5CE68] hover:bg-[#06291C] hover:border-[#D4AF37]'
          }`}
          title={isSelected ? 'Remove from custom menu tray' : 'Add to custom menu tray'}
          aria-label={isSelected ? 'Remove from custom menu tray' : 'Add to custom menu tray'}
        >
          {isSelected ? (
            <Check className="w-3.5 h-3.5 text-rose-300" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};

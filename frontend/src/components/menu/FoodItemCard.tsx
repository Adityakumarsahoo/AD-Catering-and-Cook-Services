import React from 'react';
import { Eye, Plus, Check, Sparkles, UtensilsCrossed } from 'lucide-react';
import { ResolvedDish } from '../../utils/dishResolver.js';
import { useMenuCart } from '../../context/MenuCartContext.js';

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
      className="group relative rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#041A12]/95 via-[#02130C]/90 to-[#020D08]/95 border border-[#D4AF37]/35 hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)] transition-all duration-300 flex flex-col justify-between cursor-pointer liquid-shine active:scale-[0.99]"
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
        <div className="relative h-36 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 bg-black/50 border border-[#D4AF37]/30 shadow-inner">
          <img
            src={dish.image}
            alt={dish.displayName || dish.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = dish.isVeg
                ? '/images/gourmet-ceramic-curry.jpg'
                : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
            }}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/85 via-transparent to-transparent pointer-events-none" />

          {/* Veg / Non-Veg Indicator Badge (Traditional Indian Food Symbol) */}
          <div className="absolute top-2.5 left-2.5 z-10">
            {dish.isVeg ? (
              <span className="w-5 h-5 rounded-md bg-white/95 border border-emerald-600 flex items-center justify-center shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm" />
              </span>
            ) : (
              <span className="w-5 h-5 rounded-md bg-white/95 border border-rose-600 flex items-center justify-center shadow-md">
                <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-rose-600" />
              </span>
            )}
          </div>

          {/* Odia Specialty Pill */}
          {dish.isOdiaSpecialty && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[9px] font-black uppercase tracking-wider shadow">
                Odia
              </span>
            </div>
          )}

          {/* Hover View Details Eye Capsule */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[2px]">
            <span className="px-3 py-1.5 rounded-full bg-[#041810]/95 border border-[#D4AF37] text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span>View Details</span>
            </span>
          </div>

          {/* Serving / Status Pill at bottom */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-semibold text-[#CBD5E1]">
            <span className="px-2 py-0.5 rounded-md bg-[#041810]/85 backdrop-blur-md border border-[#D4AF37]/35 text-[#F5CE68] truncate max-w-[85%]">
              {dish.isVeg ? 'Pure Veg' : 'Non-Veg'}
            </span>
            {dish.price && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-white border border-emerald-500/40 font-bold shrink-0">
                ₹{dish.price}
              </span>
            )}
          </div>
        </div>

        {/* Category Badge if requested */}
        {showCategoryBadge && dish.category && (
          <div className="mb-1.5">
            <span className="text-[9.5px] font-black uppercase tracking-wider text-[#F5CE68]">
              {dish.category}
            </span>
          </div>
        )}

        {/* Dish Title */}
        <h4 className="font-display font-black text-base sm:text-lg text-white group-hover:text-[#FFDF73] transition-colors line-clamp-1">
          {dish.displayName || dish.name}
        </h4>

        {/* Short Description */}
        <p className="text-xs text-[#94A3B8] group-hover:text-[#CBD5E1] line-clamp-2 mt-1 leading-relaxed transition-colors font-normal">
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

// frontend/src/components/menu/MasterDishCard.tsx
import React, { useState } from 'react';
import { Eye, Plus, Check, Sparkles, Flame, UtensilsCrossed } from 'lucide-react';
import { useMenuCart } from '../../context/MenuCartContext.js';
import { getCategoryMeta } from '../../data/menuCategories.js';

export interface MasterDishCardProps {
  dish: any;
  onOpenModal: (dish: any) => void;
}

export const MasterDishCard: React.FC<MasterDishCardProps> = ({ dish, onOpenModal }) => {
  const { toggleDish, isDishSelected } = useMenuCart();
  const [imageFailed, setImageFailed] = useState(false);

  const categoryMeta = getCategoryMeta(dish.category);
  const isSelected = isDishSelected(dish.id);

  // Determine fallback image based on category
  const fallbackImg = categoryMeta.fallbackImage || '/images/dishes/chhena-poda.jpg';
  const displayImage = imageFailed || !dish.image ? fallbackImg : dish.image;

  // Check if dish is Odia Heritage
  const isOdia =
    dish.isOdiaSpecialty ||
    categoryMeta.isOdiaHeritage ||
    ['ODISSI SPECIAL', 'SADDA (VEG)', 'AAMISHA (NON-VEG)'].includes(
      (dish.category || '').toUpperCase()
    );

  return (
    <div
      className={`group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-xl border ${
        isSelected
          ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_12px_40px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/50'
          : 'bg-[#041A12]/80 hover:bg-[#05261A]/95 border-[#D4AF37]/35 hover:border-[#F5CE68]/70 shadow-lg hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.2)]'
      } hover:-translate-y-1.5`}
    >
      {/* 1. Image Container */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden bg-stone-950 cursor-pointer"
        onClick={() => onOpenModal(dish)}
      >
        <img
          src={displayImage}
          alt={dish.displayName || dish.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {/* Traditional FSSAI Veg / Non-Veg Indicator */}
          <div className="flex items-center gap-1.5">
            {dish.isVeg ? (
              <div
                className="w-6 h-6 rounded-md bg-stone-950/95 border-2 border-emerald-500 flex items-center justify-center shadow-md backdrop-blur-md"
                title="100% Pure Vegetarian"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              </div>
            ) : (
              <div
                className="w-6 h-6 rounded-md bg-stone-950/95 border-2 border-rose-600 flex items-center justify-center shadow-md backdrop-blur-md"
                title="Non-Vegetarian Delicacy"
              >
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-rose-600 shadow-[0_0_8px_#E11D48]" />
              </div>
            )}

            {/* Veg / Non-Veg Text Badge */}
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md border shadow-sm ${
                dish.isVeg
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                  : 'bg-rose-950/90 text-rose-300 border-rose-500/50'
              }`}
            >
              {dish.isVeg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>

          {/* Regional / Specialty Badges */}
          <div className="flex items-center gap-1">
            {isOdia && (
              <span className="px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-md flex items-center gap-1 font-bold">
                <Sparkles className="w-2.5 h-2.5 text-[#041810]" />
                <span>Odia Heritage</span>
              </span>
            )}
            {dish.isPopular && !isOdia && (
              <span className="px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase tracking-wider bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow flex items-center gap-1 font-bold">
                <Flame className="w-2.5 h-2.5 text-amber-400" />
                <span>Popular</span>
              </span>
            )}
          </div>
        </div>

        {/* Hover Quick View Trigger Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-xs font-black flex items-center gap-1.5 shadow-xl transition-transform active:scale-95">
            <Eye className="w-3.5 h-3.5" />
            <span>Recipe Details</span>
          </span>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 text-[#FAF8F5]">
        <div className="space-y-1.5">
          {/* Category Chip */}
          <div className="flex items-center justify-between text-[11px] text-[#F5CE68] font-medium tracking-wide">
            <span className="truncate uppercase font-bold tracking-wider text-[10px]">
              {categoryMeta.label}
            </span>
            {dish.serving && (
              <span className="text-[10px] text-stone-300 shrink-0 flex items-center gap-1">
                <UtensilsCrossed className="w-2.5 h-2.5 text-[#F5CE68]" />
                <span className="truncate max-w-[130px]">{dish.serving}</span>
              </span>
            )}
          </div>

          {/* Dish Name */}
          <h4
            onClick={() => onOpenModal(dish)}
            className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#F5CE68] transition-colors line-clamp-1 cursor-pointer"
            title={dish.displayName || dish.name}
          >
            {dish.displayName || dish.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed font-normal min-h-[32px]">
            {dish.description ||
              'Authentic culinary preparation freshly crafted by AD Catering master chefs using premium local ingredients.'}
          </p>
        </div>

        {/* 3. Action Footer */}
        <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
          {/* Quick Details Trigger */}
          <button
            onClick={() => onOpenModal(dish)}
            className="text-xs font-medium text-[#F5CE68] hover:text-white flex items-center gap-1 transition-colors group/btn py-1"
          >
            <span>Full Profile</span>
            <span className="text-xs group-hover/btn:translate-x-0.5 transition-transform">→</span>
          </button>

          {/* Add to Custom Selection Tray Button */}
          <button
            onClick={() =>
              toggleDish({
                id: dish.id,
                name: dish.displayName || dish.name,
                category: dish.category || categoryMeta.label,
                price: dish.price,
                isVeg: dish.isVeg,
              })
            }
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-md ${
              isSelected
                ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black shadow-emerald-500/20'
                : 'bg-[#02110A] hover:bg-[#042618] text-[#F5CE68] border border-[#D4AF37]/45 hover:border-[#FFDF73]'
            }`}
            title={isSelected ? 'Remove from Selection Tray' : 'Add to Custom Menu Tray'}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Selected</span>
                <span className="sm:hidden">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Tray</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

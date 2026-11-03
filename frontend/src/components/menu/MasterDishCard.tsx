// frontend/src/components/menu/MasterDishCard.tsx
import React from 'react';
import { Eye, Plus, Check, Sparkles, Flame, UtensilsCrossed } from 'lucide-react';
import { useMenuCart } from '../../context/MenuCartContext.js';
import { getCategoryMeta } from '../../data/menuCategories.js';
import { OptimizedImage } from '../common/OptimizedImage.js';

export interface MasterDishCardProps {
  dish: any;
  onOpenModal: (dish: any) => void;
}

export const MasterDishCard: React.FC<MasterDishCardProps> = ({ dish, onOpenModal }) => {
  const { toggleDish, isDishSelected } = useMenuCart();

  const categoryMeta = getCategoryMeta(dish.category);
  const isSelected = isDishSelected(dish.id);

  // Determine fallback image based on category
  const fallbackImg = categoryMeta.fallbackImage || (dish.isVeg ? '/images/DISHE/DALEMA.png' : '/images/DISHE/MUTTON CURRY.png');

  // Check if dish is Odia Heritage
  const isOdia =
    dish.isOdiaSpecialty ||
    categoryMeta.isOdiaHeritage ||
    ['ODISSI SPECIAL', 'SADDA (VEG)', 'AAMISHA (NON-VEG)'].includes(
      (dish.category || '').toUpperCase()
    );

  return (
    <div
      className={`group relative flex flex-col rounded-2xl sm:rounded-[22px] overflow-hidden transition-all duration-300 backdrop-blur-xl border ${
        isSelected
          ? 'bg-emerald-950/45 border-emerald-400 shadow-[0_8px_30px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/50'
          : 'bg-[#041A12]/85 hover:bg-[#05261A]/95 border-[#D4AF37]/35 hover:border-[#F5CE68]/70 shadow-md hover:shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.18)]'
      } hover:-translate-y-1`}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {/* 1. Compact Proportional Image with Progressive Luxury Emerald/Gold Skeleton */}
      <div
        className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer"
        onClick={() => onOpenModal(dish)}
      >
        <OptimizedImage
          src={dish.image}
          alt={dish.displayName || dish.name}
          fallbackSrc={fallbackImg}
          secondaryFallback={dish.isVeg ? '/images/DISHE/DALEMA.png' : '/images/DISHE/MUTTON CURRY.png'}
          categoryHint={categoryMeta.shortLabel || dish.category}
          aspectRatio="aspect-[16/10]"
          showOverlay={true}
          className="group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Top Badges Bar */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
          {/* Traditional FSSAI Veg / Non-Veg Indicator */}
          <div className="flex items-center gap-1">
            {dish.isVeg ? (
              <div
                className="w-5 h-5 rounded-md bg-stone-950/95 border border-emerald-500 flex items-center justify-center shadow backdrop-blur-md"
                title="100% Pure Vegetarian"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
              </div>
            ) : (
              <div
                className="w-5 h-5 rounded-md bg-stone-950/95 border border-rose-600 flex items-center justify-center shadow backdrop-blur-md"
                title="Non-Vegetarian Delicacy"
              >
                <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6.5px] border-b-rose-600 shadow-[0_0_6px_#E11D48]" />
              </div>
            )}

            {/* Veg / Non-Veg Text Badge */}
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider backdrop-blur-md border shadow-sm ${
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
              <span className="px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow flex items-center gap-0.5 font-bold">
                <Sparkles className="w-2 h-2 text-[#041810]" />
                <span>Odia</span>
              </span>
            )}
            {dish.isPopular && !isOdia && (
              <span className="px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow flex items-center gap-0.5 font-bold">
                <Flame className="w-2 h-2 text-amber-400" />
                <span>Popular</span>
              </span>
            )}
          </div>
        </div>

        {/* Hover Quick View Trigger Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[2px]">
          <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black flex items-center gap-1.5 shadow-xl transition-transform active:scale-95">
            <Eye className="w-3 h-3" />
            <span>Recipe Details</span>
          </span>
        </div>
      </div>

      {/* 2. Compact Content Body */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-2 text-[#FAF8F5]">
        <div className="space-y-1">
          {/* Category Chip & Serving Tag */}
          <div className="flex items-center justify-between gap-1 text-[10px] min-h-[18px]">
            <span className="uppercase font-bold tracking-wider text-[9px] text-[#F5CE68] truncate">
              {dish.category || categoryMeta.label}
            </span>
            {dish.serving && (
              <span className="text-[9px] text-stone-300 font-medium shrink-0 flex items-center gap-1 bg-[#020F09]/80 px-1.5 py-0.5 rounded border border-[#D4AF37]/25">
                <UtensilsCrossed className="w-2 h-2 text-[#F5CE68]" />
                <span className="max-w-[120px] truncate">{dish.serving}</span>
              </span>
            )}
          </div>

          {/* Dish Name: Full display with line-clamp-2 (no broken truncation) */}
          <h4
            onClick={() => onOpenModal(dish)}
            className="font-serif text-[13.5px] sm:text-[14.5px] font-bold text-white group-hover:text-[#F5CE68] transition-colors line-clamp-2 leading-snug cursor-pointer min-h-[2.4rem] flex items-center"
            title={dish.displayName || dish.name}
          >
            {dish.displayName || dish.name}
          </h4>

          {/* Description: Compact 2 lines */}
          <p className="text-[11px] text-[#CBD5E1] line-clamp-2 leading-relaxed font-normal min-h-[2rem]">
            {dish.description ||
              'Authentic culinary preparation freshly crafted by AD Catering master chefs using premium local ingredients.'}
          </p>
        </div>

        {/* 3. Action Footer */}
        <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
          {/* Quick Details Trigger */}
          <button
            type="button"
            onClick={() => onOpenModal(dish)}
            className="text-[11px] font-semibold text-[#F5CE68] hover:text-white flex items-center gap-1 transition-colors group/btn py-0.5"
          >
            <span>Full Profile</span>
            <span className="text-xs group-hover/btn:translate-x-0.5 transition-transform">→</span>
          </button>

          {/* Add to Custom Selection Tray Button */}
          <button
            type="button"
            onClick={() =>
              toggleDish({
                id: dish.id,
                name: dish.displayName || dish.name,
                category: dish.category || categoryMeta.label,
                price: dish.price,
                isVeg: dish.isVeg,
              })
            }
            className={`px-2.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] font-black flex items-center gap-1 transition-all active:scale-95 shadow-sm ${
              isSelected
                ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black shadow-emerald-500/20'
                : 'bg-[#02110A] hover:bg-[#042618] text-[#F5CE68] border border-[#D4AF37]/45 hover:border-[#FFDF73]'
            }`}
            title={isSelected ? 'Remove from Selection Tray' : 'Add to Custom Menu Tray'}
          >
            {isSelected ? (
              <>
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Add to Tray</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

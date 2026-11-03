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
      className={`group relative flex flex-col rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl border h-full ${
        isSelected
          ? 'bg-gradient-to-b from-[#063321]/95 to-[#031e13]/95 border-emerald-400 shadow-[0_6px_22px_rgba(16,185,129,0.28)] ring-1 ring-emerald-400/50'
          : 'bg-gradient-to-b from-[#041A12]/92 via-[#03160F]/90 to-[#02100A]/95 border-[#D4AF37]/30 hover:border-[#F5CE68]/75 shadow-md hover:shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(212,175,55,0.15)]'
      } hover:-translate-y-1`}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {/* 1. Compact Proportional Gourmet Image */}
      <div
        className="relative w-full aspect-[16/11] overflow-hidden cursor-pointer bg-[#031810]"
        onClick={() => onOpenModal(dish)}
      >
        <OptimizedImage
          src={dish.image}
          alt={dish.displayName || dish.name}
          fallbackSrc={fallbackImg}
          secondaryFallback={dish.isVeg ? '/images/DISHE/DALEMA.png' : '/images/DISHE/MUTTON CURRY.png'}
          categoryHint={categoryMeta.shortLabel || dish.category}
          aspectRatio="aspect-[16/11]"
          showOverlay={true}
          className="group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Top Badges Bar - Compact Mobile-First Proportions */}
        <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between gap-1 z-10 pointer-events-none">
          {/* Traditional FSSAI Veg / Non-Veg Indicator */}
          <div className="flex items-center gap-1">
            {dish.isVeg ? (
              <div
                className="w-4 h-4 rounded-[4px] bg-black/85 border border-emerald-500 flex items-center justify-center shadow backdrop-blur-md"
                title="100% Pure Vegetarian"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10B981]" />
              </div>
            ) : (
              <div
                className="w-4 h-4 rounded-[4px] bg-black/85 border border-rose-600 flex items-center justify-center shadow backdrop-blur-md"
                title="Non-Vegetarian Delicacy"
              >
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5.5px] border-b-rose-600 shadow-[0_0_5px_#E11D48]" />
              </div>
            )}

            {/* Veg / Non-Veg Text Badge */}
            <span
              className={`px-1 py-0.2 rounded text-[8px] sm:text-[8.5px] font-black uppercase tracking-wider backdrop-blur-md border shadow-sm ${
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
              <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow flex items-center gap-0.5 font-bold">
                <Sparkles className="w-2 h-2 text-[#041810]" />
                <span>Odia</span>
              </span>
            )}
            {dish.isPopular && !isOdia && (
              <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow flex items-center gap-0.5 font-bold">
                <Flame className="w-2 h-2 text-amber-400" />
                <span>Popular</span>
              </span>
            )}
          </div>
        </div>

        {/* Hover Quick View Trigger Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[1.5px]">
          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[10px] font-black flex items-center gap-1 shadow-lg transition-transform active:scale-95">
            <Eye className="w-2.5 h-2.5" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* 2. Compact Content Body */}
      <div className="p-2 sm:p-2.5 lg:p-3 flex flex-col flex-1 justify-between gap-1.5 text-[#FAF8F5]">
        <div className="space-y-1">
          {/* Category Chip & Serving Tag */}
          <div className="flex items-center justify-between gap-1 text-[8.5px] sm:text-[9.5px]">
            <span className="uppercase font-bold tracking-wider text-[#F5CE68] truncate">
              {dish.category || categoryMeta.label}
            </span>
            {dish.serving && (
              <span className="text-[8px] sm:text-[8.5px] text-stone-300 font-medium shrink-0 flex items-center gap-0.5 bg-[#020F09]/90 px-1 py-0.5 rounded border border-[#D4AF37]/25 truncate max-w-[85px] sm:max-w-[110px]">
                <UtensilsCrossed className="w-2 h-2 text-[#F5CE68]" />
                <span className="truncate">{dish.serving}</span>
              </span>
            )}
          </div>

          {/* Dish Name: Full display with line-clamp-2 (no broken truncation) */}
          <h4
            onClick={() => onOpenModal(dish)}
            className="font-serif text-[11.5px] sm:text-[13px] lg:text-[13.5px] font-bold text-white group-hover:text-[#F5CE68] transition-colors line-clamp-2 leading-tight cursor-pointer min-h-[1.8rem] sm:min-h-[2.1rem] flex items-center"
            title={dish.displayName || dish.name}
          >
            {dish.displayName || dish.name}
          </h4>

          {/* Description: Compact 2 lines (Hidden on small 2-col mobile to preserve neat uniform height) */}
          <p className="text-[9.5px] sm:text-[10.5px] text-[#CBD5E1]/80 line-clamp-2 leading-snug font-normal min-h-[1.5rem] hidden sm:block">
            {dish.description ||
              'Authentic culinary preparation freshly crafted by AD Catering master chefs using premium local ingredients.'}
          </p>
        </div>

        {/* 3. Action Footer */}
        <div className="pt-1.5 border-t border-[#D4AF37]/20 flex items-center justify-between gap-1">
          {/* Quick Details Trigger */}
          <button
            type="button"
            onClick={() => onOpenModal(dish)}
            className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#F5CE68] hover:text-white flex items-center gap-0.5 transition-colors group/btn py-0.5"
          >
            <span>Details</span>
            <span className="text-[10px] group-hover/btn:translate-x-0.5 transition-transform">→</span>
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
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[10.5px] font-black flex items-center gap-1 transition-all active:scale-95 shadow-sm ${
              isSelected
                ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black shadow-emerald-500/20'
                : 'bg-[#02110A] hover:bg-[#042618] text-[#F5CE68] border border-[#D4AF37]/45 hover:border-[#FFDF73]'
            }`}
            title={isSelected ? 'Remove from Selection Tray' : 'Add to Custom Menu Tray'}
          >
            {isSelected ? (
              <>
                <Check className="w-2.5 h-2.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-2.5 h-2.5" />
                <span>+ Tray</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

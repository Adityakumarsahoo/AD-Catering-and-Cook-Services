// frontend/src/components/FoodDetailModal.tsx
import React, { useState } from 'react';
import {
  X,
  Plus,
  Sparkles,
  ChefHat,
  UtensilsCrossed,
  ShieldCheck,
  Tag,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import { useMenuCart } from '../context/MenuCartContext.js';
import { Link } from 'react-router-dom';
import { getCategoryMeta } from '../data/menuCategories.js';

export interface FoodDetailModalProps {
  item: any | null;
  onClose: () => void;
  packageContext?: string;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  onClose,
  packageContext,
}) => {
  const { toggleDish, isDishSelected } = useMenuCart();
  const [imageFailed, setImageFailed] = useState(false);

  if (!item) return null;

  const isSelected = isDishSelected(item.id);
  const activePackage = packageContext || item.packageContext;
  const categoryMeta = getCategoryMeta(item.category || '');

  // Determine fallback image based on category
  const fallbackImg = categoryMeta.fallbackImage || '/images/DISHE/Chenna Podo.png';
  const displayImage = imageFailed || !item.image ? fallbackImg : item.image;

  const isOdia =
    item.isOdiaSpecialty ||
    categoryMeta.isOdiaHeritage ||
    ['ODISSI SPECIAL', 'SADDA (VEG)', 'AAMISHA (NON-VEG)'].includes(
      (item.category || '').toUpperCase()
    );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="food-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#06291C] via-[#041810] to-[#020D08] border-2 border-[#D4AF37]/60 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.25)] p-4 sm:p-7 space-y-4 sm:space-y-6 text-[#FAF8F5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular 24K Golden Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#F5CE68] to-transparent pointer-events-none" />

        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/3 w-1/3 h-20 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header Action: Close Button */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-[#F5CE68]" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#F5CE68]">
              AD Catering Delicacy Profile
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-[#020F09] hover:bg-[#06291C] text-[#CBD5E1] hover:text-[#F5CE68] border border-[#D4AF37]/40 shadow-md transition-all active:scale-95"
            aria-label="Close food modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          {/* Food Image with subtle zoom & badges */}
          <div className="relative w-full sm:w-56 h-48 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-[#D4AF37]/40 shadow-2xl bg-[#020F09] group">
            <img
              src={displayImage}
              alt={item.name || item.displayName}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/90 via-transparent to-transparent pointer-events-none" />

            {/* Dietary Badge */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
              {item.isVeg ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#020F09]/90 border border-emerald-400 text-emerald-300 text-[10px] font-black shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                  Pure Veg
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#020F09]/90 border border-rose-500 text-rose-300 text-[10px] font-black shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#FB7185]" />
                  Non-Veg
                </span>
              )}

              {isOdia && (
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[9px] font-black uppercase tracking-wider shadow">
                  Odia Heritage
                </span>
              )}
            </div>

            {/* Banquet Live Buffet Badge */}
            <div className="absolute bottom-2 left-2 right-2">
              <span className="block px-2 py-1 rounded-xl bg-[#041810]/90 border border-[#D4AF37]/40 text-[10px] font-bold text-[#F5CE68] text-center backdrop-blur-md">
                Live Banquet Preparation
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-3 flex-1 min-w-0">
            {/* Category & Tags Row */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-[10.5px] font-bold text-[#F5CE68] uppercase tracking-wider bg-[#020F09] border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full shadow-sm">
                {categoryMeta.label || item.category || 'Catering Selection'}
              </span>

              {item.isPopular && (
                <span className="text-[10px] sm:text-[10.5px] font-bold text-[#F5CE68] bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>Chef's Signature</span>
                </span>
              )}

              {item.price && (
                <span className="text-[10px] sm:text-[11px] font-black text-[#F5CE68] bg-[#041810] border border-[#D4AF37]/50 px-2.5 py-0.5 rounded-full shadow-sm">
                  ₹{item.price} / plate
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              id="food-modal-title"
              className="font-display font-black text-xl sm:text-2xl text-white tracking-tight leading-snug drop-shadow"
            >
              {item.displayName || item.name}
            </h3>

            {/* Package Context Pill (if open in context of a package) */}
            {activePackage && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/70 border border-[#D4AF37]/50 text-[#F5CE68] shadow-sm text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
                <span>
                  Included in <span className="text-white font-black">{activePackage}</span>
                </span>
              </div>
            )}

            {/* Serving Information */}
            {item.serving && (
              <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
                <span className="font-semibold text-white">Serving:</span>
                <span>{item.serving}</span>
              </div>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal bg-[#020F09]/80 p-3 rounded-xl border border-[#D4AF37]/25">
              {item.description ||
                'Prepared fresh for your celebratory banquet using premium grade farm produce, authentic regional spices, and pure desi ghee.'}
            </p>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-0.5">
                {item.tags.map((t: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[9.5px] font-medium text-[#CBD5E1] bg-[#041810] border border-[#D4AF37]/30 px-2 py-0.5 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quality & FSSAI Food Hygiene Guarantee */}
        <div className="pt-3 border-t border-[#D4AF37]/20 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#020F09]/80 border border-[#D4AF37]/25">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block text-xs">100% FSSAI Sanitized</span>
              <span className="text-[10.5px] text-[#94A3B8]">
                Cooked under stringent food safety, RO water, and temperature controls.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#020F09]/80 border border-[#D4AF37]/25">
            <Award className="w-4 h-4 text-[#F5CE68] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block text-xs">Fresh Banquet Preparation</span>
              <span className="text-[10.5px] text-[#94A3B8]">
                Freshly prepared on-site by master executive chefs for your guests.
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-[#D4AF37]/20">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#020F09] hover:bg-[#06291C] border border-[#D4AF37]/40 text-xs font-bold text-[#CBD5E1] hover:text-white transition-all text-center active:scale-95"
          >
            ← Return to Menu
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 justify-end">
            {/* Add to Custom Tray */}
            <button
              onClick={() => {
                toggleDish({
                  id: item.id,
                  name: item.displayName || item.name,
                  category: item.category || categoryMeta.label,
                  price: item.price,
                  isVeg: item.isVeg,
                });
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                isSelected
                  ? 'bg-rose-700 hover:bg-rose-800 text-white border border-rose-500'
                  : 'bg-[#041810] hover:bg-[#06291C] border border-[#D4AF37]/60 text-[#F5CE68]'
              }`}
            >
              {isSelected ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span>Remove from Tray</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-[#F5CE68]" />
                  <span>Add to Selection Tray</span>
                </>
              )}
            </button>

            {/* Direct Booking CTA */}
            <Link
              to={
                activePackage
                  ? `/booking?package=${encodeURIComponent(activePackage)}`
                  : `/booking?dish=${encodeURIComponent(item.displayName || item.name)}`
              }
              className="px-4 py-2.5 rounded-xl gold-gradient-btn text-[#041810] text-xs font-black flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              onClick={onClose}
            >
              <span>{activePackage ? 'Book Event Package' : 'Book Catering with this Dish'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

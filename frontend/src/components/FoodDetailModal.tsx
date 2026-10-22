import React from 'react';
import { X, Check, Plus, Sparkles, ChefHat } from 'lucide-react';
import { useMenuCart } from '../context/MenuCartContext.js';

interface FoodDetailModalProps {
  item: any | null;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ item, onClose }) => {
  const { toggleDish, isDishSelected } = useMenuCart();

  if (!item) return null;

  const isSelected = isDishSelected(item.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto mobile-touch-scroll rounded-[30px] sm:rounded-[36px] bg-[#041810]/95 backdrop-blur-2xl border border-[#D4AF37]/60 shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-5 sm:p-8 space-y-5 sm:space-y-6 liquid-shine animate-in fade-in zoom-in-95 duration-200 text-[#FAF8F5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular Golden Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5CE68] to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow-md transition-all"
          aria-label="Close food modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Food Image with subtle zoom & badge */}
          <div className="relative w-full sm:w-56 h-56 rounded-2xl overflow-hidden shrink-0 border border-[#D4AF37]/40 shadow-xl bg-black/40">
            <img
              src={item.image}
              alt={item.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = item.isVeg
                  ? '/images/gourmet-ceramic-curry.jpg'
                  : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
              }}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/70 via-transparent to-transparent pointer-events-none" />
            
            {item.isVeg ? (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-950/95 border border-emerald-400 text-emerald-200 text-[10px] font-bold shadow flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                Pure Veg
              </span>
            ) : (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-950/95 border border-rose-400 text-rose-200 text-[10px] font-bold shadow flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
                Non-Veg
              </span>
            )}
            {item.isOdiaSpecialty && (
              <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C04A] text-[#041810] text-[10px] font-black shadow">
                ODIA HERITAGE
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-wider bg-emerald-950/80 border border-[#D4AF37]/50 px-3 py-1 rounded-full shadow-sm">
                {item.category}
              </span>
              {item.menuType && item.menuType !== 'all' && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm">
                  {item.menuType} Collection
                </span>
              )}
              {item.isPopular && (
                <span className="text-[10px] font-bold text-[#FFDF73] bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/60">
                  ★ Chef's Special
                </span>
              )}
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              {item.name}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-[#D4AF37]/40 text-[#F5CE68]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-xs font-bold tracking-wide">Catering Banquet Selection • Included in Event Package</span>
              </div>

              {item.serving && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041810] border border-emerald-400/50 text-emerald-200 text-xs font-bold shadow-sm">
                  <UtensilsCrossed className="w-3 h-3 text-[#F5CE68]" />
                  <span>Serving: {item.serving}</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((t: string, idx: number) => (
                  <span key={idx} className="text-[10px] font-medium text-[#E2E8F0] bg-emerald-950/60 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-lg">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ingredients & Preparation Info */}
        <div className="pt-4 border-t border-[#D4AF37]/30 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#F5CE68] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Culinary Heritage & Ingredients</span>
          </h4>
          <p className="text-xs text-[#CBD5E1] leading-relaxed font-normal">
            Slow-cooked using authentic regional spices, pure desi ghee, and fresh daily farm produce. Prepared according to stringent FSSAI food safety and hygiene protocols.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#D4AF37]/30">
          <span className="text-xs text-[#CBD5E1]">
            {isSelected ? '✓ Dish added to your custom menu tray' : 'Add dish to your custom event menu tray'}
          </span>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/40 text-xs font-semibold text-white transition-all text-center"
            >
              Back to Menu
            </button>

            <button
              onClick={() => {
                toggleDish({
                  id: item.id,
                  name: item.name,
                  category: item.category,
                  price: item.price,
                  isVeg: item.isVeg,
                });
              }}
              className={`px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all ${
                isSelected
                  ? 'bg-rose-700 hover:bg-rose-800 text-white border border-rose-400'
                  : 'gold-gradient-btn text-[#041810]'
              }`}
            >
              {isSelected ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span>Remove from Menu</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Menu Tray</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

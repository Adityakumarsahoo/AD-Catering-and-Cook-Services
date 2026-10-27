// frontend/src/components/menu/MobileCategoryBar.tsx
import React, { useState } from 'react';
import {
  ListFilter,
  X,
  Search,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  UtensilsCrossed
} from 'lucide-react';
import { MENU_CATEGORIES, MenuCategoryMeta } from '../../data/menuCategories.js';

interface MobileCategoryBarProps {
  activeCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  categoryCounts: Record<string, number>;
  dietaryFilter: 'all' | 'veg' | 'non-veg' | 'odia';
  onDietaryFilterChange: (filter: 'all' | 'veg' | 'non-veg' | 'odia') => void;
  totalDishCount: number;
}

export const MobileCategoryBar: React.FC<MobileCategoryBarProps> = ({
  activeCategorySlug,
  onSelectCategory,
  categoryCounts,
  dietaryFilter,
  onDietaryFilterChange,
  totalDishCount,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');

  const activeCategory = MENU_CATEGORIES.find((c) => c.slug === activeCategorySlug) || MENU_CATEGORIES[0];

  const filteredCategories = MENU_CATEGORIES.filter((c) => {
    if (drawerSearch.trim()) {
      const q = drawerSearch.toLowerCase();
      if (!c.label.toLowerCase().includes(q) && !c.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (dietaryFilter === 'veg' && c.isNonVeg) return false;
    if (dietaryFilter === 'non-veg' && !c.isNonVeg && !['SOUP', 'COUNTER STARTER', 'RICE / PULAO / BIRYANI', 'DAL'].includes(c.key)) {
      return false;
    }
    if (dietaryFilter === 'odia' && !c.isOdiaHeritage) return false;
    return true;
  });

  return (
    <div className="lg:hidden sticky top-20 z-30 mb-6 space-y-2">
      {/* 1. Bar with Active Category Pill + "Browse All Categories" Drawer Button */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-[#02110A]/95 backdrop-blur-xl border border-[#D4AF37]/45 shadow-xl">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex-1 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#010905]/90 border border-[#D4AF37]/50 text-[#FAF8F5] text-xs font-bold active:scale-95 transition-all"
        >
          <div className="flex items-center gap-2 truncate">
            <ListFilter className="w-4 h-4 text-[#F5CE68] shrink-0" />
            <span className="text-[#FFDF73] font-bold truncate">
              {activeCategory.label}
            </span>
            <span className="text-[10px] text-stone-300 shrink-0">
              ({categoryCounts[activeCategory.key] || 0})
            </span>
          </div>
          <span className="text-[10.5px] text-[#F5CE68] font-black shrink-0 ml-2 uppercase tracking-wider flex items-center gap-1">
            <span>All 22 Categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* 2. Horizontal Scrollable Category Pills */}
      <div className="overflow-x-auto pb-1 flex items-center gap-1.5 scrollbar-none px-1">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = activeCategorySlug === cat.slug;
          const count = categoryCounts[cat.key] || 0;

          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] font-black shadow-md shadow-amber-500/20'
                  : 'bg-[#02110A]/90 hover:bg-[#05261A] text-stone-300 border border-[#D4AF37]/35'
              }`}
            >
              <span>{cat.shortLabel}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-[#041810]/20 text-[#041810]' : 'bg-[#010905] text-[#F5CE68]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Slide-over Category Drawer Modal */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex justify-end animate-in fade-in"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-sm h-full bg-[#02110A] border-l-2 border-[#D4AF37]/50 shadow-2xl flex flex-col p-5 text-[#FAF8F5] animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-[#FFDF73]" />
                <div>
                  <h3 className="font-serif text-base font-bold text-white">
                    Master Categories
                  </h3>
                  <p className="text-[11px] text-[#CBD5E1]">
                    22 Courses · {totalDishCount} Total Dishes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full bg-[#041A12] hover:bg-[#06291C] text-[#CBD5E1] border border-[#D4AF37]/30"
                aria-label="Close category drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Search */}
            <div className="relative my-3">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={drawerSearch}
                onChange={(e) => setDrawerSearch(e.target.value)}
                placeholder="Search 22 categories..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#010905] border border-[#D4AF37]/40 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#FFDF73]"
              />
            </div>

            {/* Dietary Filter Pills inside Drawer */}
            <div className="grid grid-cols-4 gap-1 mb-3 bg-[#010905] p-1 rounded-xl text-xs font-bold text-center border border-[#D4AF37]/25">
              <button
                onClick={() => onDietaryFilterChange('all')}
                className={`py-1 rounded-lg ${
                  dietaryFilter === 'all'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                    : 'text-stone-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onDietaryFilterChange('veg')}
                className={`py-1 rounded-lg ${
                  dietaryFilter === 'veg' ? 'bg-emerald-600 text-white' : 'text-stone-300'
                }`}
              >
                Veg
              </button>
              <button
                onClick={() => onDietaryFilterChange('non-veg')}
                className={`py-1 rounded-lg ${
                  dietaryFilter === 'non-veg' ? 'bg-rose-600 text-white' : 'text-stone-300'
                }`}
              >
                Non-Veg
              </button>
              <button
                onClick={() => onDietaryFilterChange('odia')}
                className={`py-1 rounded-lg ${
                  dietaryFilter === 'odia' ? 'bg-amber-600 text-white' : 'text-stone-300'
                }`}
              >
                Odia
              </button>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 divide-y divide-[#D4AF37]/15">
              {filteredCategories.map((cat) => {
                const isActive = activeCategorySlug === cat.slug;
                const count = categoryCounts[cat.key] || 0;

                return (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      setDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/25 via-[#062c1d] to-transparent border-l-4 border-amber-400 text-white font-bold'
                        : 'hover:bg-[#042014]/60 text-stone-300'
                    }`}
                  >
                    <div className="truncate min-w-0 pr-2">
                      <div className="text-xs font-medium truncate">{cat.label}</div>
                      {cat.hindiOdiaHint && (
                        <div className="text-[10px] text-stone-400 truncate">{cat.hindiOdiaHint}</div>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#03160E] text-[#F5CE68] border border-[#D4AF37]/30 shrink-0">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-[11px] text-[#CBD5E1]">
              <span>AD Catering Master Menu</span>
              <span className="text-[#F5CE68] font-bold">Bhubaneswar & Cuttack</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// frontend/src/components/menu/MasterMenuCategorySidebar.tsx
import React, { useState } from 'react';
import {
  GlassWater,
  Soup,
  Store,
  Sparkles,
  Flame,
  Egg,
  Utensils,
  CookingPot,
  Salad,
  Carrot,
  Crown,
  Fish,
  Drumstick,
  Award,
  Leaf,
  UtensilsCrossed,
  Cake,
  Search,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { MENU_CATEGORIES, MenuCategoryMeta } from '../../data/menuCategories.js';

interface MasterMenuCategorySidebarProps {
  activeCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  categoryCounts: Record<string, number>;
  dietaryFilter: 'all' | 'veg' | 'non-veg' | 'odia';
  onDietaryFilterChange: (filter: 'all' | 'veg' | 'non-veg' | 'odia') => void;
  totalDishCount: number;
}

// Icon mapper
const ICON_MAP: Record<string, React.ElementType> = {
  GlassWater,
  Soup,
  Store,
  Sparkles,
  Flame,
  Egg,
  Utensils,
  CookingPot,
  Salad,
  Carrot,
  Crown,
  Fish,
  Drumstick,
  Award,
  Leaf,
  UtensilsCrossed,
  Cake,
};

export const MasterMenuCategorySidebar: React.FC<MasterMenuCategorySidebarProps> = ({
  activeCategorySlug,
  onSelectCategory,
  categoryCounts,
  dietaryFilter,
  onDietaryFilterChange,
  totalDishCount,
}) => {
  const [sidebarQuery, setSidebarQuery] = useState('');

  // Filter categories based on sidebar search input and dietary tab
  const filteredCategories = MENU_CATEGORIES.filter((cat) => {
    // Search query match
    if (sidebarQuery.trim()) {
      const q = sidebarQuery.toLowerCase();
      const matchLabel = cat.label.toLowerCase().includes(q);
      const matchShort = cat.shortLabel.toLowerCase().includes(q);
      const matchDesc = cat.description.toLowerCase().includes(q);
      if (!matchLabel && !matchShort && !matchDesc) return false;
    }

    // Dietary filter match
    if (dietaryFilter === 'veg' && cat.isNonVeg) return false;
    if (dietaryFilter === 'non-veg' && !cat.isNonVeg && !['SOUP', 'COUNTER STARTER', 'RICE / PULAO / BIRYANI', 'DAL'].includes(cat.key)) {
      return false;
    }
    if (dietaryFilter === 'odia' && !cat.isOdiaHeritage) return false;

    return true;
  });

  return (
    <aside className="w-72 xl:w-80 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8.5rem)] flex flex-col rounded-3xl bg-[#02110A]/90 backdrop-blur-2xl border border-[#D4AF37]/45 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden text-[#FAF8F5] z-20">
      {/* 1. Sidebar Header */}
      <div className="p-4 sm:p-5 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#03160E] via-[#02110A] to-transparent">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-[#D4AF37]/50 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-[#FFDF73]" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-white tracking-wide">
                Menu Directory
              </h3>
              <p className="text-[11px] text-[#CBD5E1]">
                22 Categories · {totalDishCount} Dishes
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-[#F5CE68] border border-[#D4AF37]/50">
            Odisha
          </span>
        </div>

        {/* Real-time Category Search inside Sidebar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={sidebarQuery}
            onChange={(e) => setSidebarQuery(e.target.value)}
            placeholder="Find a category..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#010905]/95 border border-[#D4AF37]/40 text-xs text-[#FAF8F5] placeholder-stone-400 focus:outline-none focus:border-[#FFDF73] focus:ring-1 focus:ring-amber-400/40 transition-all"
          />
          {sidebarQuery && (
            <button
              onClick={() => setSidebarQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dietary Quick Filter Tabs */}
        <div className="grid grid-cols-4 gap-1 mt-3 bg-[#010905]/80 p-1 rounded-xl border border-[#D4AF37]/30 text-[10.5px] font-bold">
          <button
            onClick={() => onDietaryFilterChange('all')}
            className={`py-1 rounded-lg transition-all text-center ${
              dietaryFilter === 'all'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm font-black'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onDietaryFilterChange('veg')}
            className={`py-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              dietaryFilter === 'veg'
                ? 'bg-emerald-600 text-white shadow-sm font-black'
                : 'text-stone-300 hover:text-emerald-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Veg
          </button>
          <button
            onClick={() => onDietaryFilterChange('non-veg')}
            className={`py-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              dietaryFilter === 'non-veg'
                ? 'bg-rose-600 text-white shadow-sm font-black'
                : 'text-stone-300 hover:text-rose-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Non-Veg
          </button>
          <button
            onClick={() => onDietaryFilterChange('odia')}
            className={`py-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              dietaryFilter === 'odia'
                ? 'bg-amber-600 text-white shadow-sm font-black'
                : 'text-stone-300 hover:text-amber-400'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5" />
            Odia
          </button>
        </div>
      </div>

      {/* 2. Scrollable Category List */}
      <nav
        className="flex-1 overflow-y-auto p-2.5 space-y-1 divide-y divide-[#D4AF37]/15 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-transparent"
        aria-label="Catering Menu Categories"
      >
        {filteredCategories.length === 0 ? (
          <div className="py-8 text-center text-stone-400 text-xs">
            <p>No categories match "{sidebarQuery}"</p>
            <button
              onClick={() => {
                setSidebarQuery('');
                onDietaryFilterChange('all');
              }}
              className="mt-2 text-[#F5CE68] hover:underline text-[11px]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || UtensilsCrossed;
            const count = categoryCounts[cat.key] || 0;
            const isActive = activeCategorySlug === cat.slug;

            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/25 via-[#062c1d] to-transparent border-l-4 border-amber-400 text-white font-bold shadow-md'
                    : 'hover:bg-[#042014]/60 text-stone-300 hover:text-white border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Category Icon */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-[0_0_12px_rgba(212,175,55,0.6)] font-black'
                        : 'bg-[#03160E] text-[#F5CE68] group-hover:bg-[#05261A] border border-[#D4AF37]/30'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Category Title & Badge */}
                  <div className="truncate min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs truncate font-medium ${
                          isActive ? 'text-[#FFDF73] font-bold' : 'group-hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </span>
                      {cat.isOdiaHeritage && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" title="Odia Heritage" />
                      )}
                    </div>
                    {cat.hindiOdiaHint && (
                      <p className="text-[10px] text-stone-400 truncate font-normal">
                        {cat.hindiOdiaHint}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dish Count Pill */}
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                      isActive
                        ? 'bg-amber-400/20 text-[#FFDF73] border border-amber-400/50'
                        : 'bg-[#03160E] text-stone-400 group-hover:text-stone-200 border border-[#D4AF37]/20'
                    }`}
                  >
                    {count}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isActive
                        ? 'text-amber-400 translate-x-0.5'
                        : 'text-stone-600 group-hover:text-stone-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </div>
              </button>
            );
          })
        )}
      </nav>

      {/* 3. Sidebar Footer Guarantee */}
      <div className="p-3.5 border-t border-[#D4AF37]/30 bg-[#010905]/80 flex items-center justify-between text-[11px] text-stone-300">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>FSSAI Certified Cookery</span>
        </div>
        <span className="text-[#F5CE68] font-bold">100% Fresh</span>
      </div>
    </aside>
  );
};

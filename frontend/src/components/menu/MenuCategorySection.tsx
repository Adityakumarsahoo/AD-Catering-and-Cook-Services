import React from 'react';
import {
  GlassWater,
  Soup,
  Flame,
  Drumstick,
  UtensilsCrossed,
  Layers,
  Sparkles,
  Cake,
  Leaf,
  Crown
} from 'lucide-react';
import { FoodItemCard } from './FoodItemCard.js';
import { ResolvedDish } from '../../utils/dishResolver.js';

export interface MenuCategorySectionProps {
  categoryName: string;
  dishes: ResolvedDish[];
  onOpenDishDetail: (dish: ResolvedDish) => void;
}

// Maps category strings to thematic Lucide icons
export function getCategoryIcon(cat: string) {
  const c = cat.toUpperCase();
  if (c.includes('DRINK') || c.includes('BEVERAGE') || c.includes('COOLER') || c.includes('MOCKTAIL')) {
    return GlassWater;
  }
  if (c.includes('SOUP')) {
    return Soup;
  }
  if (c.includes('STARTER') && (c.includes('NON-VEG') || c.includes('CHICKEN') || c.includes('FISH') || c.includes('EGG'))) {
    return Drumstick;
  }
  if (c.includes('STARTER')) {
    return Flame;
  }
  if (c.includes('PLATE') || c.includes('SALAD') || c.includes('CHUTNEY')) {
    return UtensilsCrossed;
  }
  if (c.includes('MAIN') && (c.includes('NON-VEG') || c.includes('AAMISHA') || c.includes('MUTTON') || c.includes('FISH'))) {
    return Drumstick;
  }
  if (c.includes('MAIN') || c.includes('ROTI') || c.includes('RICE') || c.includes('DAL') || c.includes('VEG')) {
    return Layers;
  }
  if (c.includes('SWEET') || c.includes('DESERT') || c.includes('DESSERT')) {
    return Cake;
  }
  if (c.includes('SPECIAL') || c.includes('COUNTER') || c.includes('INCLUSION')) {
    return Sparkles;
  }
  return UtensilsCrossed;
}

export const MenuCategorySection: React.FC<MenuCategorySectionProps> = ({
  categoryName,
  dishes,
  onOpenDishDetail,
}) => {
  if (!dishes || dishes.length === 0) return null;

  const IconComponent = getCategoryIcon(categoryName);
  const vegCount = dishes.filter((d) => d.isVeg).length;
  const nonVegCount = dishes.length - vegCount;

  return (
    <section className="space-y-5 scroll-mt-32">
      {/* Category Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b-2 border-[#D4AF37]/35 relative">
        {/* Glow underline accent */}
        <div className="absolute -bottom-[2px] left-0 w-32 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#FFDF73]" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#06291C] via-[#041810] to-[#06291C] border border-[#D4AF37]/60 flex items-center justify-center text-[#FFDF73] shadow-md shrink-0">
            <IconComponent className="w-5 h-5" />
          </div>

          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
              {categoryName}
            </h3>
            <span className="text-[11px] text-[#CBD5E1] font-semibold">
              Authentic Banquet Counter Selection
            </span>
          </div>
        </div>

        {/* Counts Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/40 text-[#F5CE68] text-xs font-black shadow-sm">
            {dishes.length} {dishes.length === 1 ? 'Delicacy' : 'Delicacies'}
          </span>

          {vegCount > 0 && nonVegCount > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/50 text-emerald-300">
                {vegCount} Veg
              </span>
              <span className="px-2 py-0.5 rounded-md bg-rose-950 border border-rose-500/50 text-rose-300">
                {nonVegCount} Non-Veg
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Dishes Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {dishes.map((dish, idx) => (
          <FoodItemCard
            key={`${dish.id}_${idx}`}
            dish={dish}
            onOpenDetail={onOpenDishDetail}
          />
        ))}
      </div>
    </section>
  );
};

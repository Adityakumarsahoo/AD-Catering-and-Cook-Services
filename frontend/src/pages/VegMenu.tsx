import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMenuCart } from '../context/MenuCartContext.js';
import { TiltCard } from '../components/TiltCard.js';
import { FoodDetailModal } from '../components/FoodDetailModal.js';
import {
  officialVegMenu,
  officialVegCategories,
  VegMenuItem,
} from '../data/officialVegMenu.js';
import {
  Sparkles,
  Leaf,
  Check,
  Plus,
  Eye,
  GlassWater,
  Soup,
  UtensilsCrossed,
  Layers,
  Cake,
  Flame,
  CheckCircle2,
  CalendarCheck,
  Heart,
  ChevronRight,
  ShieldCheck,
  Crown,
} from 'lucide-react';

export const VegMenu: React.FC = () => {
  const { toggleDish, isDishSelected } = useMenuCart();
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);

  // Active category for sticky navigation
  const [activeCategory, setActiveCategory] = useState<number>(1);

  // Section Refs for smooth scrolling to the 7 exact categories
  const cat1Ref = useRef<HTMLElement>(null);
  const cat2Ref = useRef<HTMLElement>(null);
  const cat3Ref = useRef<HTMLElement>(null);
  const cat4Ref = useRef<HTMLElement>(null);
  const cat5Ref = useRef<HTMLElement>(null);
  const cat6Ref = useRef<HTMLElement>(null);
  const cat7Ref = useRef<HTMLElement>(null);

  const categoryRefs: Record<number, React.RefObject<HTMLElement | null>> = {
    1: cat1Ref,
    2: cat2Ref,
    3: cat3Ref,
    4: cat4Ref,
    5: cat5Ref,
    6: cat6Ref,
    7: cat7Ref,
  };

  const scrollToCategory = (catNum: number) => {
    setActiveCategory(catNum);
    const targetRef = categoryRefs[catNum];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Group the 27 items strictly by categoryNumber (1 to 7)
  const groupedMenu = useMemo(() => {
    const map: Record<number, VegMenuItem[]> = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
    };
    for (const item of officialVegMenu) {
      if (map[item.categoryNumber]) {
        map[item.categoryNumber].push(item);
      }
    }
    return map;
  }, []);

  const categoryIcons: Record<number, React.ComponentType<{ className?: string }>> = {
    1: GlassWater,
    2: Soup,
    3: Flame,
    4: UtensilsCrossed,
    5: Layers,
    6: Cake,
    7: Sparkles,
  };

  return (
    <div className="pt-28 pb-32 relative z-10 min-h-screen">
      {/* Food Detail Modal */}
      <FoodDetailModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* ====================================================
          1. VEG HERO SECTION WITH FROSTED ICE-GLASS PANEL
          ==================================================== */}
      <section className="relative overflow-hidden mb-16 py-16 sm:py-24 border-b border-[#D4AF37]/30 text-[#FAF8F5]">
        {/* Background Image: Royal Emerald Vegetarian Banquet Ambient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/luxury-buffet-setup.jpg"
            alt="Pure Vegetarian Catering Feast"
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06291C]/90 via-[#041810]/95 to-[#020D08]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(16,185,129,0.2)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Brand & 100% Veg Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-widest shadow-sm">
              AD CATERING & COOK SERVICES
            </span>
            <span className="px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400 text-xs font-black text-emerald-300 uppercase tracking-widest shadow-sm flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% PURE VEGETARIAN SANCTUARY</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-xs font-black text-[#F5CE68] uppercase tracking-wider">
              OFFICIAL 41-ITEM BANQUET
            </span>
          </div>

          {/* Frosted Royal Emerald & Gold Hero Panel */}
          <div className="rounded-[36px] p-8 sm:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.65)] border border-[#D4AF37]/50 glass-strong relative liquid-shine">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
                PURE VEGETARIAN <span className="gold-gradient-text drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">DELIGHTS</span>
              </h1>

              <p className="text-base sm:text-xl text-[#CBD5E1] font-normal leading-relaxed">
                Fresh flavours, vibrant creations and unforgettable vegetarian culinary memories crafted for weddings, sacred ceremonies, and elegant celebrations.
              </p>

              {/* Verified Count Banner */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold tracking-widest uppercase text-[#F5CE68]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Exactly 41 Dishes
                </span>
                <span className="text-emerald-700">•</span>
                <span className="flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" /> 7 Royal Courses
                </span>
                <span className="text-emerald-700">•</span>
                <span className="flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" /> 100% Pure Veg
                </span>
                <span className="text-emerald-700">•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Zero Duplicates
                </span>
              </div>
            </div>

            {/* Sattvic Notice & Navigation Link */}
            <div className="pt-8 border-t border-[#D4AF37]/25 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBD5E1]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Onion-Garlic / Sattvic preparation available upon request</span>
              </span>

              <Link
                to="/menu"
                className="text-[#F5CE68] hover:text-white font-bold transition-colors flex items-center gap-1"
              >
                <span>View Full 367-Dish Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ====================================================
            2. TIMELINE / VISUAL JOURNEY BAR (7 EXACT CATEGORIES)
            ==================================================== */}
        <section className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5CE68] flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>THE BANQUET PROGRESSION</span>
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              7-Course Vegetarian Flow
            </h2>
          </div>

          {/* Desktop Horizontal / Mobile Scrollable Timeline */}
          <div className="p-3 rounded-2xl glass-strong border border-[#D4AF37]/40 overflow-x-auto no-scrollbar shadow-md">
            <div className="flex items-center gap-2 min-w-max">
              {officialVegCategories.map((cat) => {
                const IconComponent = categoryIcons[cat.categoryNumber] || Sparkles;
                const isActive = activeCategory === cat.categoryNumber;
                return (
                  <button
                    key={cat.categoryNumber}
                    onClick={() => scrollToCategory(cat.categoryNumber)}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all text-left group ${
                      isActive
                        ? 'bg-emerald-950 border-2 border-[#D4AF37] shadow-lg ring-1 ring-[#F5CE68]/40'
                        : 'bg-[#041810]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-emerald-950/70'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white group-hover:text-[#F5CE68] transition-colors uppercase tracking-wider">
                        {cat.shortTitle}
                      </p>
                      <p className="text-[9px] text-[#94A3B8]">
                        {cat.itemCount} {cat.itemCount === 1 ? 'Dish' : 'Dishes'}
                      </p>
                    </div>
                    {cat.categoryNumber < 7 && (
                      <ChevronRight className="w-3 h-3 text-[#D4AF37]/50 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================
            3. CATEGORY 1: WELCOME DRINKS (15 ENTRIES)
            ==================================================== */}
        <section ref={cat1Ref} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Course 1 • Refreshing Chilled & Warm Welcome Beverages
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                1. Welcome Drinks
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              15 Selections
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedMenu[1].map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={3}>
                  <div className="rounded-[30px] bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 p-5 flex flex-col justify-between group h-full shadow-md hover:border-[#F5CE68] transition-all">
                    <div>
                      <div
                        onClick={() => setActiveModalItem(dish)}
                        className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group/img border border-[#D4AF37]/30"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-950/90 border border-emerald-500 text-emerald-300">
                          100% VEG
                        </span>
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/70 text-[#CBD5E1]">
                          {dish.serving}
                        </span>
                      </div>

                      <div className="pt-4 space-y-1.5">
                        <h3
                          onClick={() => setActiveModalItem(dish)}
                          className="font-display font-bold text-lg text-white group-hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed font-normal">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalItem(dish)}
                        className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          isVeg: true,
                        })}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{selected ? 'Added' : 'Add Drink'}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            4. CATEGORY 2: SOUP (1 ENTRY: Veg sweet corn/manchow soup)
            ==================================================== */}
        <section ref={cat2Ref} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Course 2 • Warm, Velvety & Aromatic Broth
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                2. Soup
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              1 Selection
            </span>
          </div>

          {groupedMenu[2].map((dish) => {
            const selected = isDishSelected(dish.id);
            return (
              <TiltCard key={dish.id} maxTilt={3}>
                <div className="rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <div
                    onClick={() => setActiveModalItem(dish)}
                    className="relative w-full md:w-80 h-64 rounded-3xl overflow-hidden cursor-pointer group shrink-0 border border-[#D4AF37]/40"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                      Warm Soup Bowl
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/70 border border-[#D4AF37]/50 text-white text-xs font-bold flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#F5CE68]" />
                        <span>Inspect Soup</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-500/40">
                        Indo-Chinese Delicacy
                      </span>
                      <span className="text-xs font-semibold text-[#CBD5E1]">
                        {dish.serving}
                      </span>
                    </div>

                    <h3
                      className="font-display text-3xl font-black text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                      onClick={() => setActiveModalItem(dish)}
                    >
                      {dish.name}
                    </h3>

                    <p className="text-sm text-[#CBD5E1] font-normal leading-relaxed">
                      {dish.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {dish.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] text-[#F5CE68] bg-emerald-950/70 border border-[#D4AF37]/30 px-2.5 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          isVeg: true,
                        })}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'gold-gradient-btn text-[#041810] font-black'
                        }`}
                      >
                        {selected ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Selection</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add Soup to Menu</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </section>

        {/* ====================================================
            5. CATEGORY 3: STARTER (6 ENTRIES)
            ==================================================== */}
        <section ref={cat3Ref} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Course 3 • Crispy, Crunchy & Tandoori Appetizers
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                3. Starter
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              6 Delicacies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedMenu[3].map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={3}>
                  <div className="rounded-[30px] bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 p-5 flex flex-col justify-between group h-full shadow-md hover:border-[#F5CE68] transition-all">
                    <div>
                      <div
                        onClick={() => setActiveModalItem(dish)}
                        className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group/img border border-[#D4AF37]/30"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-950/90 border border-emerald-500 text-emerald-300">
                          100% VEG
                        </span>
                      </div>

                      <div className="pt-4 space-y-1.5">
                        <h3
                          onClick={() => setActiveModalItem(dish)}
                          className="font-display font-bold text-lg text-white group-hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed font-normal">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalItem(dish)}
                        className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          isVeg: true,
                        })}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{selected ? 'Added' : 'Add Starter'}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            6. CATEGORY 4: PLATE COUNTER (5 ENTRIES)
            ==================================================== */}
        <section ref={cat4Ref} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Course 4 • Fresh Accompaniments, Salads & Royal Curd
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                4. Plate Counter
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              5 Accompaniments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedMenu[4].map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={2}>
                  <div className="rounded-[30px] bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 p-5 flex flex-col justify-between group h-full shadow-md hover:border-[#F5CE68] transition-all">
                    <div>
                      <div
                        onClick={() => setActiveModalItem(dish)}
                        className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group/img border border-[#D4AF37]/30"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-950/90 border border-emerald-500 text-emerald-300">
                          PLATE COUNTER
                        </span>
                      </div>

                      <div className="pt-4 space-y-1.5">
                        <h3
                          onClick={() => setActiveModalItem(dish)}
                          className="font-display font-bold text-lg text-white group-hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed font-normal">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalItem(dish)}
                        className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          isVeg: true,
                        })}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{selected ? 'Added' : 'Select'}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            7. CATEGORY 5: MAIN COURSE (9 ENTRIES)
            ==================================================== */}
        <section ref={cat5Ref} className="space-y-8 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Course 5 • Fragrant Basmati, Soft Rotis, Royal Curries & Dal
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                5. Main Course
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              9 Royal Specialties
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedMenu[5].map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={2}>
                  <div className="rounded-[30px] bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 p-5 flex flex-col justify-between group h-full shadow-md hover:border-[#F5CE68] transition-all">
                    <div>
                      <div
                        onClick={() => setActiveModalItem(dish)}
                        className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group/img border border-[#D4AF37]/30"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-950/90 border border-emerald-500 text-emerald-300">
                          MAIN COURSE
                        </span>
                      </div>

                      <div className="pt-4 space-y-1.5">
                        <h3
                          onClick={() => setActiveModalItem(dish)}
                          className="font-display font-bold text-lg text-white group-hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed font-normal">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalItem(dish)}
                        className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          isVeg: true,
                        })}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{selected ? 'Added' : 'Select'}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            8. CATEGORY 6: SWEET DESSERT (3 ENTRIES)
            ==================================================== */}
        <section ref={cat6Ref} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Course 6 • Heritage Sweets, Warm Desserts & Ice Cream
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                6. Sweet Dessert
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              3 Royal Desserts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedMenu[6].map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={3}>
                  <div className="rounded-[30px] bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 p-5 flex flex-col justify-between group h-full shadow-md hover:border-[#F5CE68] transition-all">
                    <div>
                      <div
                        onClick={() => setActiveModalItem(dish)}
                        className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group/img border border-[#D4AF37]/30"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-amber-950/90 border border-amber-400 text-amber-300">
                          ROYAL SWEET
                        </span>
                      </div>

                      <div className="pt-4 space-y-1.5">
                        <h3
                          onClick={() => setActiveModalItem(dish)}
                          className="font-display font-bold text-lg text-white group-hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed font-normal">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalItem(dish)}
                        className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          isVeg: true,
                        })}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{selected ? 'Added' : 'Select'}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            9. CATEGORY 7: ADDITIONAL ITEMS (2 ENTRIES)
            ==================================================== */}
        <section ref={cat7Ref} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Course 7 • Continuous Banquet Hospitality
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                7. Additional Items
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              2 Special Services
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupedMenu[7].map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={2}>
                  <div className="rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] h-full">
                    <div
                      onClick={() => setActiveModalItem(dish)}
                      className="relative w-full sm:w-44 h-44 rounded-2xl overflow-hidden cursor-pointer group shrink-0 border border-[#D4AF37]/40"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-[#D4AF37] text-[#041810]">
                        HOSPITALITY
                      </span>
                    </div>

                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-500/40">
                        {dish.serving}
                      </span>
                      <h3
                        onClick={() => setActiveModalItem(dish)}
                        className="font-display font-bold text-2xl text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </h3>
                      <p className="text-xs text-[#CBD5E1] font-normal leading-relaxed">
                        {dish.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => setActiveModalItem(dish)}
                          className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        <button
                          onClick={() => toggleDish({
                            id: dish.id,
                            name: dish.name,
                            category: dish.category,
                            isVeg: true,
                          })}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                            selected
                              ? 'bg-emerald-600 text-white'
                              : 'gold-gradient-btn text-[#041810] font-black'
                          }`}
                        >
                          {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{selected ? 'Included' : 'Include Item'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            10. BOOKING CALL-TO-ACTION (INTEGRATED)
            ==================================================== */}
        <section className="text-center rounded-[40px] bg-[#041810]/90 backdrop-blur-2xl border border-[#D4AF37]/50 p-10 sm:p-16 shadow-[0_24px_70px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-xs font-bold text-emerald-300 uppercase tracking-widest shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dedicated Vegetarian Banquet Booking</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-black text-white">
            LOVE THIS 27-COURSE VEG MENU?
          </h2>

          <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto font-normal leading-relaxed">
            Let AD Catering create a memorable vegetarian feast for your celebration with certified fresh ingredients, sacred preparation standards, and seamless hospitality.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/booking?menuType=veg&package=EXECUTIVE+VEGETARIAN+PACKAGE"
              className="px-8 py-4 rounded-2xl gold-gradient-btn text-[#041810] font-black text-sm tracking-wide shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>BOOK THIS VEG MENU</span>
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-2xl bg-emerald-950/90 border border-[#D4AF37]/50 text-white font-bold text-sm hover:bg-emerald-900 transition-all"
            >
              Consult with Veg Head Chef
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

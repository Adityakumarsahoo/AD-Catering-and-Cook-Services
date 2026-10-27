// frontend/src/pages/VegMenu.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMenuCart } from '../context/MenuCartContext.js';
import { FoodDetailModal } from '../components/FoodDetailModal.js';
import { MasterMenuFloatingTray } from '../components/menu/MasterMenuFloatingTray.js';
import { AnimatedCounter } from '../components/AnimatedCounter.js';
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
  ShieldCheck,
  Crown,
  ArrowRight,
  ShoppingBag,
  FileText,
  Users,
  X,
  PhoneCall,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

export const VegMenu: React.FC = () => {
  const { toggleDish, isDishSelected } = useMenuCart();

  // Active dish for Food Detail Modal
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);

  // Poster Modal state (Poster View / Menu Card)
  const [showPosterModal, setShowPosterModal] = useState<boolean>(false);

  // Package Card Mode: 'menu' (All 27 items) vs 'highlights' (Service highlights)
  const [vegCardViewMode, setVegCardViewMode] = useState<'menu' | 'highlights'>('menu');

  // Package Card Filter Pills: 'all' | 'drinks' | 'starters' | 'plate' | 'mains' | 'extras'
  const [vegCategoryFilter, setVegCategoryFilter] = useState<
    'all' | 'drinks' | 'starters' | 'plate' | 'mains' | 'extras'
  >('all');

  // Group items for the package card
  const packageSections = useMemo(() => {
    return [
      {
        id: 'drinks',
        category: 'WELCOME DRINKS',
        group: 'drinks',
        icon: '🍹',
        items: officialVegMenu.filter((i) => i.category === 'Welcome Drinks'),
      },
      {
        id: 'soup',
        category: 'SOUP COUNTER',
        group: 'drinks',
        icon: '🍲',
        items: officialVegMenu.filter((i) => i.category === 'Soup'),
      },
      {
        id: 'starters',
        category: 'STARTER & LIVE CHAAT',
        group: 'starters',
        icon: '🍢',
        items: officialVegMenu.filter((i) => i.category === 'Starter'),
      },
      {
        id: 'plate',
        category: 'PLATE COUNTER',
        group: 'plate',
        icon: '🥗',
        items: officialVegMenu.filter((i) => i.category === 'Plate Counter'),
      },
      {
        id: 'mains',
        category: 'ROYAL MAIN COURSE',
        group: 'mains',
        icon: '🍛',
        items: officialVegMenu.filter((i) => i.category === 'Main Course'),
      },
      {
        id: 'sweets',
        category: 'SWEET DESSERT',
        group: 'extras',
        icon: '🍨',
        items: officialVegMenu.filter((i) => i.category === 'Sweet Dessert'),
      },
      {
        id: 'extras',
        category: 'SPECIAL INCLUSIONS',
        group: 'extras',
        icon: '🍃',
        items: officialVegMenu.filter((i) => i.category === 'Special Inclusions'),
      },
    ];
  }, []);

  // Filtered sections according to pill selection
  const displayedSections = useMemo(() => {
    if (vegCategoryFilter === 'all') return packageSections;
    return packageSections.filter((s) => s.group === vegCategoryFilter);
  }, [packageSections, vegCategoryFilter]);

  // Grouped Menu strictly by categoryNumber (1 to 7) for visual gallery below
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

  // Quick Action: Select All 27 Dishes to Custom Tray
  const handleSelectAllVegDishes = () => {
    officialVegMenu.forEach((dish) => {
      if (!isDishSelected(dish.id)) {
        toggleDish({
          id: dish.id,
          name: dish.name,
          category: dish.category,
          isVeg: true,
        });
      }
    });
    toast.success('All 27 Pure Veg Package items added to your selection tray!', {
      icon: '🌿',
    });
  };

  const allSelected = officialVegMenu.every((d) => isDishSelected(d.id));

  return (
    <div className="pt-28 sm:pt-32 pb-32 relative z-10 min-h-screen bg-transparent text-[#FAF8F5] selection:bg-[#D4AF37]/40 selection:text-white font-sans">
      {/* Live Ambient Lighting Overlay: Allows VideoBackground & Canvas physics to shine through */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-10 w-[650px] h-[650px] bg-emerald-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-18">
        {/* ====================================================
            PAGE HEADER: ROYAL PURE VEG SANCTUARY
            ==================================================== */}
        <header className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#02110A]/90 border border-[#D4AF37]/60 text-[#F5CE68] text-xs font-black uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Pure Vegetarian Sanctuary · Live Kitchen</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Pure Vegetarian Catering Feasts
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#CBD5E1] max-w-2xl mx-auto font-normal leading-relaxed">
            Authentic pure vegetarian feasts crafted with 100% pure cow desi ghee, fresh local dairy, and live banquet counters. Designed for celebratory weddings, sacred thread ceremonies, and joyous festivities across Odisha.
          </p>
        </header>

        {/* ====================================================
            1. THE ROYAL VEG PACKAGE CARD (EXACT DESIGN MATCH)
            ==================================================== */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-[32px] sm:rounded-[38px] bg-gradient-to-b from-[#03180F]/95 via-[#02120B]/92 to-[#010905]/95 border-2 border-[#D4AF37] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.35)] ring-1 ring-[#FFF1B8]/40 p-4 sm:p-7 text-[#FAF8F5] backdrop-blur-2xl">
            {/* Top Crown Ribbon Badge (Overlapping top border) */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 sm:px-5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#D4AF37] text-[#041810] font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center gap-1.5 whitespace-nowrap z-20">
              <Crown className="w-3.5 h-3.5 fill-[#041810]" />
              <span>MOST POPULAR · PURE VEG FEAST</span>
            </div>

            {/* Specular 24K Gold Top Hairline */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent pointer-events-none" />

            {/* Hero Image Container matching user screenshot */}
            <div
              className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl group aspect-[16/9] sm:aspect-[21/9] bg-black/60 mt-1 cursor-pointer"
              onClick={() => setShowPosterModal(true)}
            >
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80"
                alt="Royal Shakahari Pure Veg Banquet Setup"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/luxury-buffet-setup.jpg';
                }}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Floating Pill on Bottom of Photo (Matching image) */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPosterModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-[#041810]/90 hover:bg-black border border-[#D4AF37]/60 text-[#F5CE68] text-xs font-bold flex items-center gap-2 shadow-lg backdrop-blur-md transition-all active:scale-95"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>27 Delicacies • 7 Full Counters</span>
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="flex items-center gap-1 text-white underline underline-offset-2">
                    <Eye className="w-3 h-3" />
                    <span>POSTER VIEW</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Title & Badge Row */}
            <div className="flex items-center justify-between gap-3 mt-5">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                ROYAL SHAKAHARI
              </h2>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400 text-emerald-300 shadow">
                WEDDING SPECIAL
              </span>
            </div>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2 leading-relaxed font-normal">
              Our signature 27-item royal pure vegetarian wedding feast. Complete multi-course banquet with tropical mocktails, sweet corn/manchow soup, starters, plate counter, rich gravies, desserts, and Banarasi paan.
            </p>

            {/* Price Container */}
            <div className="my-5 pb-4 border-b border-[#D4AF37]/25 flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-1.5 whitespace-nowrap shrink-0">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#F5CE68] whitespace-nowrap">
                  <AnimatedCounter
                    end={850}
                    prefix="₹"
                    triggerOnView={true}
                    duration={1200}
                    className="tabular-nums"
                  />
                </span>
                <span className="text-xs text-[#94A3B8] font-semibold">/ Plate</span>
              </div>

              <button
                type="button"
                onClick={() => setShowPosterModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-[#D4AF37]/60 text-[#F5CE68] text-xs font-bold flex items-center gap-1.5 shadow transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Menu Card</span>
              </button>
            </div>

            {/* Minimum Booking & Serving Requirements Box */}
            <div className="mb-4 p-3.5 rounded-2xl bg-[#020F09]/95 border border-[#D4AF37]/35 space-y-1.5 text-xs shadow-inner">
              <div className="flex items-center justify-between text-[#F5CE68] font-bold">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
                  <span>Minimum Booking: 200 Guests</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">
                  Standard
                </span>
              </div>
              <div className="flex items-center justify-between text-[#CBD5E1]">
                <span>Food Menu Included:</span>
                <strong className="text-white font-bold">27 Delicacies</strong>
              </div>
              <div className="flex items-center justify-between text-[#CBD5E1]">
                <span>Serving Details:</span>
                <span className="text-white">Buffet Handis & Uniformed Crew</span>
              </div>
            </div>

            {/* View Mode Switcher: All 27 Items vs Service Highlights */}
            <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-[#020F09] border border-[#D4AF37]/35 text-xs font-bold mb-3">
              <button
                type="button"
                onClick={() => setVegCardViewMode('menu')}
                className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center ${
                  vegCardViewMode === 'menu'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow font-black'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                All 27 Items (Veg Menu)
              </button>
              <button
                type="button"
                onClick={() => setVegCardViewMode('highlights')}
                className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center ${
                  vegCardViewMode === 'highlights'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow font-black'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                Service Highlights
              </button>
            </div>

            {/* Body: All 27 Items Mode */}
            {vegCardViewMode === 'menu' ? (
              <div className="space-y-3">
                {/* Course Filter Pills */}
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {[
                    { id: 'all', label: 'All 27' },
                    { id: 'drinks', label: 'Drinks & Soups (2)' },
                    { id: 'starters', label: 'Starters (6)' },
                    { id: 'plate', label: 'Plate (5)' },
                    { id: 'mains', label: 'Mains (9)' },
                    { id: 'extras', label: 'Desserts & Extras (5)' },
                  ].map((pill) => (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => setVegCategoryFilter(pill.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
                        vegCategoryFilter === pill.id
                          ? 'bg-[#F5CE68] text-[#041810] shadow-sm font-black'
                          : 'bg-[#041810]/90 text-[#CBD5E1] hover:text-[#F5CE68] border border-[#D4AF37]/30'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>

                {/* Categorized Dishes Container with Gold Accents */}
                <div className="max-h-[380px] overflow-y-auto pr-1.5 space-y-3 rounded-2xl bg-[#020F09]/85 border border-[#D4AF37]/30 p-3.5 shadow-inner scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-transparent">
                  {displayedSections.map((sec) => (
                    <div
                      key={sec.id}
                      className="space-y-2 pb-3 border-b border-[#D4AF37]/20 last:border-b-0 last:pb-0"
                    >
                      {/* Section Header with Left Gold Border */}
                      <div className="flex items-center gap-2 border-l-4 border-amber-400 pl-2">
                        <span className="text-sm">{sec.icon}</span>
                        <h4 className="text-xs font-black text-[#F5CE68] uppercase tracking-wider">
                          {sec.category}
                        </h4>
                        <span className="text-[10px] text-[#94A3B8] font-bold">
                          ({sec.items.length})
                        </span>
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                        {sec.items.map((item) => {
                          const isSelected = isDishSelected(item.id);
                          return (
                            <div
                              key={item.id}
                              className={`flex items-center justify-between gap-1.5 text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                                isSelected
                                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200'
                                  : 'bg-[#06291C]/70 hover:bg-[#06291C] border-[#D4AF37]/25 text-[#FAF8F5]'
                              }`}
                            >
                              <div
                                className="flex items-center gap-2 truncate cursor-pointer"
                                onClick={() => setActiveModalItem(item)}
                              >
                                <div className="w-4 h-4 rounded-sm bg-stone-950 border border-emerald-500 flex items-center justify-center shrink-0">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <span className="truncate font-medium">{item.name}</span>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  toggleDish({
                                    id: item.id,
                                    name: item.name,
                                    category: item.category,
                                    isVeg: true,
                                  })
                                }
                                className={`p-1 rounded-md transition-colors ${
                                  isSelected
                                    ? 'text-emerald-400 hover:text-rose-400'
                                    : 'text-amber-400/80 hover:text-amber-300'
                                }`}
                                title={isSelected ? 'Remove' : 'Add to custom tray'}
                              >
                                {isSelected ? (
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Body: Service Highlights Mode */
              <div className="p-4 rounded-2xl bg-[#020F09]/90 border border-[#D4AF37]/30 space-y-2.5 text-xs text-[#CBD5E1]">
                <h4 className="font-serif text-sm font-bold text-[#F5CE68] uppercase tracking-wide">
                  Complete Banquet Service Standards Included:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Live Chafing Dishes, Food Warmers & Buffet Counters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Uniformed Catering Captains, Stewards & Live Tandoor Chefs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ceramic Chinaware Dinner Plates, Bowls, Spoons & Glassware</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Pure Cow Desi Ghee & RO Filtered Water Preparation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Vegetarian Kitchen Sanctum (No Non-Veg Contact)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero Onion-Garlic / Sattvic Preparation Option on Request</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Hygienic Sealed Mineral Water Bottles & Banarasi Paan Included</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Bottom Card Actions */}
            <div className="mt-5 pt-4 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={`/booking?package=${encodeURIComponent(
                  'Royal Shakahari Pure Veg Package'
                )}`}
                className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-center"
              >
                <span>Book This Royal Feast (₹850/Person)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleSelectAllVegDishes}
                className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-[#041810] hover:bg-[#06291C] border border-[#D4AF37]/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 whitespace-nowrap"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>{allSelected ? '✓ All Selected' : 'Select All 27 Dishes'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================
            2. DETAILED VISUAL DISH GALLERY (ALL 27 ITEMS)
            ==================================================== */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Catering Dish Profiles</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Explore All 27 Handcrafted Recipes
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              Click on any dish card to view preparation secrets, serving portions, and nutritional information.
            </p>
          </div>

          {/* All 7 Course Categories */}
          <div className="space-y-14 sm:space-y-16">
            {officialVegCategories.map((cat) => {
              const dishes = groupedMenu[cat.number] || [];

              return (
                <div key={cat.number} className="space-y-6">
                  {/* Category Header with Emerald Glass styling */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#031c12]/90 via-[#042618]/70 to-[#02110A]/90 border border-[#D4AF37]/35 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Course {cat.number} of 7
                        </span>
                        {cat.hindiOdiaHint && (
                          <span className="text-xs text-[#CBD5E1] font-medium">
                            {cat.hindiOdiaHint}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-2xl font-black text-white">
                        {cat.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#CBD5E1]">
                        {cat.description}
                      </p>
                    </div>

                    <span className="px-3.5 py-1.5 rounded-full bg-[#02110A] border border-[#D4AF37]/45 text-[#F5CE68] text-xs font-black self-start sm:self-center shrink-0">
                      {dishes.length} {dishes.length === 1 ? 'Dish' : 'Dishes'}
                    </span>
                  </div>

                  {/* Dishes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {dishes.map((dish) => {
                      const isSelected = isDishSelected(dish.id);

                      return (
                        <div
                          key={dish.id}
                          className={`group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-xl border ${
                            isSelected
                              ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_12px_40px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/50'
                              : 'bg-[#041A12]/80 hover:bg-[#05261A]/95 border-[#D4AF37]/30 hover:border-[#F5CE68]/70 shadow-lg hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.2)]'
                          } hover:-translate-y-1.5`}
                        >
                          {/* Image Container */}
                          <div
                            className="relative w-full aspect-[4/3] overflow-hidden bg-stone-950 cursor-pointer"
                            onClick={() => setActiveModalItem(dish)}
                          >
                            <img
                              src={dish.image}
                              alt={dish.name}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                  '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg';
                              }}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                            {/* FSSAI Veg Badge */}
                            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
                              <div className="w-6 h-6 rounded-md bg-stone-950/95 border-2 border-emerald-500 flex items-center justify-center shadow-md">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                              </div>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-sm">
                                100% Veg
                              </span>
                            </div>

                            {/* Hover Quick View Trigger */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-xs font-black flex items-center gap-1.5 shadow-xl transition-transform active:scale-95">
                                <Eye className="w-3.5 h-3.5" />
                                <span>Recipe Details</span>
                              </span>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-5 flex flex-col flex-1 justify-between gap-3 text-[#FAF8F5]">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[11px] text-[#F5CE68] font-medium">
                                <span className="uppercase font-bold tracking-wider text-[10px]">
                                  {dish.category}
                                </span>
                                {dish.serving && (
                                  <span className="text-[10px] text-stone-300 truncate max-w-[140px]">
                                    {dish.serving}
                                  </span>
                                )}
                              </div>

                              <h5
                                onClick={() => setActiveModalItem(dish)}
                                className="font-serif text-lg font-bold text-white group-hover:text-[#F5CE68] transition-colors cursor-pointer"
                              >
                                {dish.name}
                              </h5>

                              <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed">
                                {dish.description}
                              </p>
                            </div>

                            {/* Action Footer */}
                            <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
                              <button
                                onClick={() => setActiveModalItem(dish)}
                                className="text-xs font-medium text-[#F5CE68] hover:text-white flex items-center gap-1 transition-colors"
                              >
                                <span>Full Profile</span>
                                <span className="text-xs">→</span>
                              </button>

                              <button
                                onClick={() =>
                                  toggleDish({
                                    id: dish.id,
                                    name: dish.name,
                                    category: dish.category,
                                    isVeg: true,
                                  })
                                }
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-md ${
                                  isSelected
                                    ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black'
                                    : 'bg-[#02110A] hover:bg-[#042618] text-[#F5CE68] border border-[#D4AF37]/50 hover:border-[#FFDF73]'
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    <span>Added to Tray</span>
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
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            3. QUALITY & SATTVIC ASSURANCE
            ==================================================== */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031c12] to-[#010c07] border-2 border-[#D4AF37]/45 text-center space-y-4 max-w-4xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            100% Pure Vegetarian Kitchen Sanctum
          </h3>

          <p className="text-sm text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
            Our pure vegetarian banquets are prepared under strict culinary sanctum guidelines with separate dedicated kitchenware, 100% pure cow desi ghee, RO filtered water, and zero non-vegetarian cross-contamination.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/booking?package=${encodeURIComponent(
                'Royal Shakahari Pure Veg Package'
              )}`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-xs font-black flex items-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
            >
              <span>Book This Pure Veg Package</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/menu"
              className="px-6 py-3 rounded-xl bg-[#041810] hover:bg-[#06291C] text-[#FAF8F5] border border-[#D4AF37]/40 text-xs font-bold transition-all"
            >
              <span>Explore Master Menu (367 Dishes)</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Floating Selection Tray */}
      <MasterMenuFloatingTray />

      {/* Food Detail Modal */}
      {activeModalItem && (
        <FoodDetailModal
          item={activeModalItem}
          packageContext="Royal Shakahari Pure Veg Package"
          onClose={() => setActiveModalItem(null)}
        />
      )}

      {/* Poster View Modal */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#041A12] border-2 border-[#D4AF37] p-6 shadow-2xl text-[#FAF8F5] space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#FFDF73]" />
                <h4 className="font-serif text-lg font-bold text-white">
                  Royal Shakahari Pure Veg Banquet • Menu Card
                </h4>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-full bg-[#02110A] hover:bg-black text-[#CBD5E1] border border-[#D4AF37]/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-black">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80"
                alt="Royal Pure Veg Menu Card Poster"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/luxury-buffet-setup.jpg';
                }}
                className="w-full h-auto object-cover max-h-[50vh]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#02110A] border border-[#D4AF37]/30 space-y-2 text-xs">
              <p className="font-bold text-[#F5CE68] uppercase tracking-wider">
                Full 27-Delicacy Pure Veg Banquet Inclusions:
              </p>
              <p className="text-[#CBD5E1] leading-relaxed">
                Mocktails • Veg Sweet Corn / Manchow Soup • American Corn Fry • Hara Bhara Kabab • Mushroom Cheese Ball • Paneer Shashlik • Dahi Papdi Chaat • Gupchup • Papad • Salad • Pasta • Dahi Rashola • Dahi Bara • Green Peas Basmati Rice • Rumali Roti • Yellow Dal Fry • Fruits Jelly • Paneer Punjabi / Hyderabadi • Navaratna Kurma • Seasonal Veg • Mushroom Chilli • Finger Chips • Khir Sagar • Hot Jalebi / Gulab Jamun • Ice Cream • Mineral Water Bottles • Banarasi Paan Counter.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setShowPosterModal(false)}
                className="px-4 py-2 rounded-xl bg-[#02110A] text-[#CBD5E1] border border-[#D4AF37]/30 text-xs font-bold"
              >
                Close
              </button>

              <Link
                to={`/booking?package=${encodeURIComponent(
                  'Royal Shakahari Pure Veg Package'
                )}`}
                onClick={() => setShowPosterModal(false)}
                className="px-6 py-2.5 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs shadow-lg"
              >
                Book Package (₹850/Plate)
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

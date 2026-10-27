import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Crown,
  Award,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Search,
  Filter,
  Flame,
  CalendarCheck,
  PhoneCall,
  UtensilsCrossed
} from 'lucide-react';
import { MenuCategorySection, getCategoryIcon } from './MenuCategorySection.js';
import { resolveFoodItem, ResolvedDish } from '../../utils/dishResolver.js';

export interface PackageDetailsViewProps {
  pkg: any;
  allPackages: any[];
  allMenuItems: any[];
  onSelectPackage: (pkg: any) => void;
  onBackToPackages: () => void;
  onOpenDishDetail: (dish: ResolvedDish) => void;
}

export const PackageDetailsView: React.FC<PackageDetailsViewProps> = ({
  pkg,
  allPackages,
  allMenuItems,
  onSelectPackage,
  onBackToPackages,
  onOpenDishDetail,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isBasic = pkg.name.toUpperCase().includes('BASIC');
  const isPremium = pkg.name.toUpperCase().includes('PREMIUM');
  const isDeluxe = pkg.name.toUpperCase().includes('DELUXE');

  // Resolve all categories and their items for this specific package
  const categorizedDishes = useMemo(() => {
    const categories: { categoryName: string; dishes: ResolvedDish[] }[] = [];

    if (Array.isArray(pkg.menuCategories) && pkg.menuCategories.length > 0) {
      pkg.menuCategories.forEach((catObj: any) => {
        const catName = catObj.category || 'Special Selection';
        const rawItems = Array.isArray(catObj.items) ? catObj.items : [];
        const resolved = rawItems.map((rawName: string) =>
          resolveFoodItem(rawName, catName, allMenuItems, pkg.name)
        );
        if (resolved.length > 0) {
          categories.push({ categoryName: catName, dishes: resolved });
        }
      });
    }

    return categories;
  }, [pkg, allMenuItems]);

  // Total count of dishes strictly inside this package
  const totalPackageDishes = useMemo(() => {
    return categorizedDishes.reduce((acc, cat) => acc + cat.dishes.length, 0);
  }, [categorizedDishes]);

  // Filtered categories according to tab filter and search
  const displayedCategories = useMemo(() => {
    return categorizedDishes
      .map((cat) => {
        if (activeCategoryFilter !== 'ALL' && cat.categoryName !== activeCategoryFilter) {
          return null;
        }

        let dishes = cat.dishes;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          dishes = dishes.filter(
            (d) =>
              d.name.toLowerCase().includes(q) ||
              d.displayName.toLowerCase().includes(q) ||
              d.description.toLowerCase().includes(q)
          );
        }

        if (dishes.length === 0) return null;
        return { ...cat, dishes };
      })
      .filter(Boolean) as { categoryName: string; dishes: ResolvedDish[] }[];
  }, [categorizedDishes, activeCategoryFilter, searchQuery]);

  return (
    <div className="space-y-10 text-[#FAF8F5]">
      {/* ====================================================
          1. PACKAGE HEADER & CONTROLS BANNER
          ==================================================== */}
      <div
        className={`relative rounded-[32px] sm:rounded-[40px] p-6 sm:p-9 md:p-10 border-2 overflow-hidden shadow-2xl transition-all duration-300 liquid-shine ${
          isPremium
            ? 'bg-gradient-to-r from-[#031E13]/98 via-[#063321]/95 to-[#02170E]/98 border-[#D4AF37] shadow-[0_20px_70px_rgba(212,175,55,0.25)]'
            : isDeluxe
            ? 'bg-gradient-to-r from-[#031B11]/98 via-[#052A1C]/95 to-[#02140D]/98 border-[#FFDF73]/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-r from-[#02180F]/98 via-[#042417]/95 to-[#02120B]/98 border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Specular Top Gold Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent pointer-events-none" />

        {/* Ambient Glow */}
        <div className="absolute -top-12 left-1/4 w-1/2 h-24 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Bar: Back Button & Quick Package Switcher Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-5">
            {/* Back Button */}
            <button
              onClick={onBackToPackages}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] hover:text-white transition-all shadow-sm active:scale-95 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to All Catering Packages</span>
            </button>

            {/* Quick Switcher Tabs (Basic | Deluxe | Premium) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#CBD5E1] uppercase tracking-wider hidden sm:inline mr-1">
                Switch Package:
              </span>

              {allPackages.map((otherPkg) => {
                const isActive = otherPkg.id === pkg.id;
                const otherIsPrem = otherPkg.name.toUpperCase().includes('PREMIUM');
                return (
                  <button
                    key={otherPkg.id}
                    onClick={() => {
                      onSelectPackage(otherPkg);
                      setActiveCategoryFilter('ALL');
                      setSearchQuery('');
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-black transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 ${
                      isActive
                        ? 'gold-gradient-btn text-[#041810] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-[#041810]/80 hover:bg-emerald-950 border border-[#D4AF37]/40 text-[#E2E8F0] hover:text-[#FFDF73]'
                    }`}
                  >
                    {otherIsPrem && <Crown className="w-3 h-3 text-amber-400 shrink-0" />}
                    <span>{otherPkg.name}</span>
                    <span className="text-[10px] opacity-85">
                      (₹{otherPkg.pricePerPerson})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Package Title, Price & Details Hero Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950/90 border border-[#D4AF37]/60 text-[10.5px] font-black uppercase tracking-[0.2em] text-[#FFDF73] shadow-sm">
                  {pkg.menuTitle || (isBasic ? 'NORMAL MENU' : isDeluxe ? 'DELUX MENU' : 'ROYAL WEDDING MENU')}
                </span>

                {isPremium && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[10.5px] font-black uppercase tracking-wider shadow flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Most Popular Wedding Selection</span>
                  </span>
                )}

                <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10.5px] font-bold text-[#A7F3D0]">
                  {totalPackageDishes} Handcrafted Delicacies
                </span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight drop-shadow-md">
                {pkg.name} — Complete Menu
              </h2>

              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
                {pkg.description}
              </p>
            </div>

            {/* Price Pill & Instant Booking CTA */}
            <div className="shrink-0 p-5 rounded-3xl bg-[#041810]/95 border-2 border-[#D4AF37]/70 shadow-2xl flex flex-col items-center sm:items-end justify-center gap-3 text-center sm:text-right">
              <div>
                <span className="text-[10.5px] uppercase font-bold tracking-widest text-[#94A3B8] block">
                  Catering Package Rate
                </span>
                <div className="flex items-baseline gap-1.5 justify-center sm:justify-end whitespace-nowrap">
                  <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9D2] via-[#FFDF73] to-[#D4AF37] whitespace-nowrap">
                    ₹{typeof pkg.pricePerPerson === 'number' ? pkg.pricePerPerson.toLocaleString('en-IN') : pkg.pricePerPerson}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#CBD5E1] whitespace-nowrap">
                    / person
                  </span>
                </div>
              </div>

              <Link
                to={`/booking?package=${encodeURIComponent(pkg.name)}`}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl gold-gradient-btn text-[#041810] text-xs font-black shadow-lg flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
              >
                <span>Book / Enquire Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Complimentary Inclusions Capsule Bar */}
          <div className="pt-4 border-t border-[#D4AF37]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/30 border border-[#D4AF37]/25 text-[#CBD5E1]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">Uniformed Stewards Included</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/30 border border-[#D4AF37]/25 text-[#CBD5E1]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">Chafing Buffet Warmer Setup</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/30 border border-[#D4AF37]/25 text-[#CBD5E1]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">
                {isPremium
                  ? 'Banarasi Paan & Water Bottle'
                  : isDeluxe
                  ? 'Fruit Carving & Water Bottle'
                  : 'Water Bottle & Traditional Paan'}
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/30 border border-[#D4AF37]/25 text-[#CBD5E1]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">100% FSSAI Sanitized Kitchens</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          2. CATEGORY FILTER TABS & SEARCH BAR
          ==================================================== */}
      <div className="sticky top-20 z-30 py-3.5 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-[#03160E]/95 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.8)] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search dishes in ${pkg.name}...`}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#06291C]/90 border border-[#D4AF37]/40 focus:border-[#D4AF37] text-xs text-white placeholder-[#94A3B8] outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Guidance note */}
          <div className="flex items-center gap-2 text-xs text-[#F5CE68]">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#FFDF73]" />
            <span className="font-bold">
              Click any dish to inspect complete ingredients, preparation, and details
            </span>
          </div>
        </div>

        {/* Scrollable Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 pt-1">
          {/* All Filter */}
          <button
            onClick={() => setActiveCategoryFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all active:scale-95 flex items-center gap-1.5 ${
              activeCategoryFilter === 'ALL'
                ? 'gold-gradient-btn text-[#041810]'
                : 'bg-emerald-950/70 hover:bg-emerald-900 border border-[#D4AF37]/40 text-[#E2E8F0]'
            }`}
          >
            <span>All Categories</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">
              {totalPackageDishes}
            </span>
          </button>

          {/* Individual Category Filter Pills */}
          {categorizedDishes.map((cat) => {
            const isCatActive = activeCategoryFilter === cat.categoryName;
            const CatIcon = getCategoryIcon(cat.categoryName);

            return (
              <button
                key={cat.categoryName}
                onClick={() => setActiveCategoryFilter(cat.categoryName)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 flex items-center gap-1.5 ${
                  isCatActive
                    ? 'gold-gradient-btn text-[#041810] font-black'
                    : 'bg-[#041810]/80 hover:bg-emerald-950 border border-[#D4AF37]/35 text-[#CBD5E1] hover:text-[#FFDF73]'
                }`}
              >
                <CatIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.categoryName}</span>
                <span className="text-[10px] opacity-80">({cat.dishes.length})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ====================================================
          3. CATEGORIZED MENU SECTIONS
          ==================================================== */}
      {displayedCategories.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#041810]/70 border border-[#D4AF37]/30 space-y-4">
          <UtensilsCrossed className="w-10 h-10 text-[#D4AF37] mx-auto opacity-70" />
          <h4 className="font-display font-black text-xl text-white">No Dishes Found</h4>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
            No dishes in {pkg.name} matched your search query "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategoryFilter('ALL');
            }}
            className="px-5 py-2 rounded-xl gold-gradient-btn text-[#041810] text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-14">
          {displayedCategories.map((cat) => (
            <MenuCategorySection
              key={cat.categoryName}
              categoryName={cat.categoryName}
              dishes={cat.dishes}
              onOpenDishDetail={onOpenDishDetail}
            />
          ))}
        </div>
      )}

      {/* ====================================================
          4. BOTTOM STICKY / CALL-TO-ACTION BAR
          ==================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#041810] via-[#062C1D] to-[#041810] border-2 border-[#D4AF37]/70 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5CE68]">
            AD Catering & Banquet Reservation
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Ready to book {pkg.name}?
          </h3>
          <p className="text-xs text-[#CBD5E1] max-w-xl">
            Customise your guest counts, live counters, and banquet setup. Transparent rates starting at ₹{pkg.pricePerPerson} per person.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
          <button
            onClick={onBackToPackages}
            className="px-5 py-3 rounded-2xl bg-emerald-950/90 hover:bg-emerald-900 border border-[#D4AF37]/50 text-xs font-bold text-white transition-all shadow-sm active:scale-95"
          >
            ← Compare Other Packages
          </button>

          <Link
            to={`/booking?package=${encodeURIComponent(pkg.name)}`}
            className="px-7 py-3 rounded-2xl gold-gradient-btn text-[#041810] text-xs font-black shadow-lg flex items-center gap-2 active:scale-95"
          >
            <span>Proceed to Booking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// frontend/src/pages/Menu.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { defaultMenuItems } from '../data/defaultMenu.js';
import { MENU_CATEGORIES, MenuCategoryMeta, getCategoryMeta } from '../data/menuCategories.js';
import { MasterMenuCategorySidebar } from '../components/menu/MasterMenuCategorySidebar.js';
import { MobileCategoryBar } from '../components/menu/MobileCategoryBar.js';
import { MasterDishCard } from '../components/menu/MasterDishCard.js';
import { MasterMenuFloatingTray } from '../components/menu/MasterMenuFloatingTray.js';
import { FoodDetailModal } from '../components/FoodDetailModal.js';
import {
  UtensilsCrossed,
  Search,
  Sparkles,
  ShieldCheck,
  Award,
  Crown,
  ArrowRight,
  Filter,
  Flame,
  Leaf
} from 'lucide-react';

export const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<any[]>(defaultMenuItems);
  const [loading, setLoading] = useState<boolean>(true);

  // Active category slug (for left sidebar highlight & scroll tracking)
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('welcome-drink');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'odia'>('all');

  // Selected dish for Food Detail Modal
  const [activeModalDish, setActiveModalDish] = useState<any | null>(null);

  // 1. Fetch live menu items with instant fallback to defaultMenuItems
  useEffect(() => {
    let isMounted = true;
    async function loadMenu() {
      try {
        const menuRes = await api.getMenu().catch(() => null);
        if (!isMounted) return;

        if (menuRes) {
          const items = Array.isArray(menuRes) ? menuRes : (menuRes.menuItems || menuRes.data);
          if (Array.isArray(items) && items.length > 0) {
            setMenuItems(items);
          }
        }
      } catch (err) {
        console.warn('Menu load notice:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadMenu();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Compute category counts based on current dietary & search filters
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    menuItems.forEach((item) => {
      const catKey = (item.category || '').toUpperCase();
      counts[catKey] = (counts[catKey] || 0) + 1;
    });
    return counts;
  }, [menuItems]);

  // 3. Filter dishes based on search query and dietary filter
  const filteredDishesByCategory = useMemo(() => {
    const result: Record<string, any[]> = {};
    const q = searchQuery.trim().toLowerCase();

    // Group items by category
    MENU_CATEGORIES.forEach((cat) => {
      result[cat.key] = [];
    });

    menuItems.forEach((item) => {
      const catKey = (item.category || '').toUpperCase();
      const meta = getCategoryMeta(catKey);

      // Dietary filter check
      if (dietaryFilter === 'veg' && !item.isVeg) return;
      if (dietaryFilter === 'non-veg' && item.isVeg) return;
      if (dietaryFilter === 'odia') {
        const isOdia =
          item.isOdiaSpecialty ||
          meta.isOdiaHeritage ||
          ['ODISSI SPECIAL', 'SADDA (VEG)', 'AAMISHA (NON-VEG)'].includes(catKey);
        if (!isOdia) return;
      }

      // Search query check
      if (q) {
        const nameMatch = (item.name || '').toLowerCase().includes(q);
        const displayMatch = (item.displayName || '').toLowerCase().includes(q);
        const descMatch = (item.description || '').toLowerCase().includes(q);
        const catMatch = (item.category || '').toLowerCase().includes(q);
        if (!nameMatch && !displayMatch && !descMatch && !catMatch) {
          return;
        }
      }

      if (!result[catKey]) {
        result[catKey] = [];
      }
      result[catKey].push(item);
    });

    return result;
  }, [menuItems, searchQuery, dietaryFilter]);

  // Total filtered dishes
  const totalFilteredDishes = useMemo(() => {
    return Object.values(filteredDishesByCategory).reduce(
      (sum, list) => sum + list.length,
      0
    );
  }, [filteredDishesByCategory]);

  // 4. Scroll to category section when selected from left sidebar
  const handleSelectCategory = (slug: string) => {
    setActiveCategorySlug(slug);
    const element = document.getElementById(`category-${slug}`);
    if (element) {
      const yOffset = -120; // clearance for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 5. ScrollSpy using IntersectionObserver to highlight left category automatically as user scrolls
  useEffect(() => {
    const categoryElements = MENU_CATEGORIES.map((cat) =>
      document.getElementById(`category-${cat.slug}`)
    ).filter(Boolean) as HTMLElement[];

    if (categoryElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((e) => e.isIntersecting);
        if (visibleEntry) {
          const id = visibleEntry.target.id.replace('category-', '');
          setActiveCategorySlug(id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    categoryElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredDishesByCategory]);

  return (
    <div className="min-h-screen bg-transparent text-[#FAF8F5] selection:bg-[#D4AF37]/40 selection:text-white font-sans">
      {/* Live Ambient Lighting Overlay: Allows VideoBackground & Canvas physics to shine through */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 left-10 w-[650px] h-[650px] bg-emerald-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* 1. HERO BANNER: THE MASTER CATERING MENU */}
        {/* ============================================================== */}
        <header className="relative mb-8 sm:mb-12 text-center max-w-4xl mx-auto space-y-4">
          {/* Top Royal Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#02110A]/90 border border-[#D4AF37]/60 shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-[#F5CE68] text-xs font-bold tracking-wide backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 text-[#FFDF73]" />
            <span className="uppercase tracking-widest text-[11px] font-black">
              AD Catering & Cook Services · Master Menu
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            The Complete Catering Menu
          </h1>

          {/* Subtitle */}
          <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Explore all 22 master culinary courses crafted for regal celebrations, weddings & banquets across Odisha. Choose individual dishes to build your custom catering tray.
          </p>

          {/* Search Bar & Quick Counters */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-2xl">
              <Search className="w-5 h-5 text-[#FFDF73] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 367 dishes (e.g. Mutton Kasa, Dahibara, Dalma, Paneer Tikka, Chhena Poda)..."
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-[#02110A]/95 border-2 border-[#D4AF37]/45 hover:border-[#FFDF73] focus:border-[#FFDF73] focus:outline-none focus:ring-4 focus:ring-amber-500/20 text-[#FAF8F5] placeholder-stone-400 text-xs sm:text-sm transition-all shadow-inner backdrop-blur-md"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-3 py-1.5 rounded-xl bg-[#041A12] hover:bg-[#06291C] text-xs text-stone-300 hover:text-white font-bold transition-colors border border-[#D4AF37]/40"
                >
                  Clear
                </button>
              ) : (
                <span className="absolute right-3 hidden sm:flex items-center gap-1 px-3 py-1 rounded-xl bg-[#03160E] border border-[#D4AF37]/40 text-[11px] text-[#F5CE68] font-bold">
                  {totalFilteredDishes} Dishes
                </span>
              )}
            </div>
          </div>

          {/* Dietary Filter Pills Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'all'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-[#02110A]/90 hover:bg-[#042618] text-[#CBD5E1] border border-[#D4AF37]/40'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>All Dishes (367)</span>
            </button>

            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 font-black'
                  : 'bg-[#02110A]/90 hover:bg-[#042618] text-emerald-400 border border-[#D4AF37]/40'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
              <span>Pure Veg (266)</span>
            </button>

            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'non-veg'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 font-black'
                  : 'bg-[#02110A]/90 hover:bg-[#042618] text-rose-400 border border-[#D4AF37]/40'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#FB7185]" />
              <span>Non-Veg (101)</span>
            </button>

            <button
              onClick={() => setDietaryFilter('odia')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'odia'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg font-black'
                  : 'bg-[#02110A]/90 hover:bg-[#042618] text-amber-400 border border-[#D4AF37]/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Odia Heritage (55)</span>
            </button>
          </div>

          {/* Discrete Link to Per-Plate Catering Packages */}
          <div className="pt-2">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-xs font-medium text-stone-300 hover:text-[#F5CE68] transition-colors py-1 group"
            >
              <span>Looking for pre-bundled banquet packages?</span>
              <span className="text-[#F5CE68] font-bold group-hover:underline flex items-center gap-1">
                Explore Catering Packages (₹850 - ₹1,050/plate)
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </header>

        {/* ============================================================== */}
        {/* 2. MOBILE CATEGORY SWITCHER BAR (Visible on < lg screens) */}
        {/* ============================================================== */}
        <MobileCategoryBar
          activeCategorySlug={activeCategorySlug}
          onSelectCategory={handleSelectCategory}
          categoryCounts={categoryCounts}
          dietaryFilter={dietaryFilter}
          onDietaryFilterChange={setDietaryFilter}
          totalDishCount={menuItems.length}
        />

        {/* ============================================================== */}
        {/* 3. MAIN CONTENT LAYOUT: LEFT SIDEBAR + CATEGORY SECTIONS */}
        {/* ============================================================== */}
        <div className="flex items-start gap-8">
          {/* Left Category Navigation Sidebar (Desktop sticky) */}
          <div className="hidden lg:block">
            <MasterMenuCategorySidebar
              activeCategorySlug={activeCategorySlug}
              onSelectCategory={handleSelectCategory}
              categoryCounts={categoryCounts}
              dietaryFilter={dietaryFilter}
              onDietaryFilterChange={setDietaryFilter}
              totalDishCount={menuItems.length}
            />
          </div>

          {/* Right Main Content: Category Sections */}
          <main className="flex-1 min-w-0 space-y-12 sm:space-y-16">
            {totalFilteredDishes === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-[#02110A]/90 border border-[#D4AF37]/40 p-8 space-y-3 backdrop-blur-xl">
                <UtensilsCrossed className="w-12 h-12 text-[#D4AF37]/60 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-white">
                  No dishes matched your criteria
                </h3>
                <p className="text-sm text-[#CBD5E1] max-w-md mx-auto">
                  Try clearing your search query or selecting "All Dishes" to view our complete 367-dish catering catalog.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDietaryFilter('all');
                  }}
                  className="px-5 py-2.5 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs transition-transform active:scale-95 shadow-md"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              MENU_CATEGORIES.map((cat, catIdx) => {
                const dishes = filteredDishesByCategory[cat.key] || [];
                if (dishes.length === 0) return null;

                return (
                  <section
                    key={cat.slug}
                    id={`category-${cat.slug}`}
                    className="scroll-mt-28 space-y-5"
                  >
                    {/* Category Header Card */}
                    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#031c12]/90 via-[#042618]/70 to-[#02110A]/90 border border-[#D4AF37]/40 shadow-xl backdrop-blur-xl relative overflow-hidden group">
                      {/* Top ambient gold shine */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF73]/50 to-transparent pointer-events-none" />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5 max-w-2xl">
                          {/* Course Step & Regional Tag */}
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Course {catIdx + 1} of 22
                            </span>
                            {cat.hindiOdiaHint && (
                              <span className="text-xs text-[#CBD5E1] font-medium">
                                {cat.hindiOdiaHint}
                              </span>
                            )}
                            {cat.isOdiaHeritage && (
                              <span className="px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]">
                                Odia Heritage
                              </span>
                            )}
                          </div>

                          {/* Category Title */}
                          <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <span>{cat.label}</span>
                          </h2>

                          {/* Category Description */}
                          <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed">
                            {cat.description}
                          </p>
                        </div>

                        {/* Dish Count Pill */}
                        <div className="shrink-0 self-start sm:self-center">
                          <span className="px-3.5 py-1.5 rounded-full bg-[#02110A] border border-[#D4AF37]/50 text-[#F5CE68] text-xs font-black shadow-md flex items-center gap-1.5">
                            <span>{dishes.length}</span>
                            <span className="text-stone-300 font-normal">
                              {dishes.length === 1 ? 'Dish' : 'Dishes'}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dish Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                      {dishes.map((dish) => (
                        <MasterDishCard
                          key={dish.id}
                          dish={dish}
                          onOpenModal={setActiveModalDish}
                        />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </main>
        </div>

        {/* ============================================================== */}
        {/* 4. FOOTER ASSURANCE & CATERING CONSULTATION */}
        {/* ============================================================== */}
        <section className="mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031c12]/95 to-[#010c07]/95 border-2 border-[#D4AF37]/45 text-center space-y-4 max-w-4xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-[#FFDF73]">
            <Award className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Need a Customized Banquet Tasting or Consultation?
          </h3>

          <p className="text-sm text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
            Our executive chefs and event planners specialize in customized wedding banquets, sacred thread ceremonies, birthday parties, and corporate galas across Odisha.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/booking"
              className="px-6 py-3 rounded-xl gold-gradient-btn text-[#041810] text-xs font-black flex items-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
            >
              <span>Book Catering Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/packages"
              className="px-6 py-3 rounded-xl bg-[#02110A] hover:bg-[#06291C] text-[#FAF8F5] border border-[#D4AF37]/45 text-xs font-bold transition-all"
            >
              <span>View Per-Guest Packages</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ============================================================== */}
      {/* 5. FLOATING CUSTOM MENU TRAY BAR (When user adds dishes) */}
      {/* ============================================================== */}
      <MasterMenuFloatingTray />

      {/* ============================================================== */}
      {/* 6. FOOD DETAIL MODAL */}
      {/* ============================================================== */}
      {activeModalDish && (
        <FoodDetailModal
          item={activeModalDish}
          onClose={() => setActiveModalDish(null)}
        />
      )}
    </div>
  );
};

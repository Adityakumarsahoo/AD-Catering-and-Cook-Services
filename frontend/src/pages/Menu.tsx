import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api.js';
import { useMenuCart } from '../context/MenuCartContext.js';
import { TiltCard } from '../components/TiltCard.js';
import { FoodDetailModal } from '../components/FoodDetailModal.js';
import { defaultMenuItems, defaultMenuSummary } from '../data/defaultMenu.js';
import {
  Search,
  Check,
  Plus,
  ShoppingBag,
  Sparkles,
  Filter,
  Trash2,
  UtensilsCrossed,
  Crown,
  Eye,
  Flame,
  Award,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChefHat,
  Heart,
  SlidersHorizontal,
  Layers,
  GlassWater,
  Cake,
  Drumstick,
  Fish,
  Soup,
  Leaf,
  Menu as MenuIcon,
  X,
  LayoutGrid,
  Grid2X2
} from 'lucide-react';

export const Menu: React.FC = () => {
  const { selectedDishes, toggleDish, isDishSelected, clearSelection } = useMenuCart();
  const [searchParams] = useSearchParams();
  const [menuItems, setMenuItems] = useState<any[]>(defaultMenuItems);
  const [activeTier, setActiveTier] = useState<'ALL' | 'NORMAL' | 'DELUXE' | 'PREMIUM'>('ALL');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [dietFilter, setDietFilter] = useState<'ALL' | 'VEG' | 'NON-VEG' | 'POPULAR' | 'CHEF_SPECIAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);
  const [menuSummary, setMenuSummary] = useState<any | null>(defaultMenuSummary);
  const [mobileCategoryDrawerOpen, setMobileCategoryDrawerOpen] = useState<boolean>(false);
  const [compactItemSize, setCompactItemSize] = useState<boolean>(true);

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const dishesGridRef = useRef<HTMLDivElement>(null);

  // Official Categories List from uploaded reference menus
  const categories = [
    { id: 'ALL', label: 'All Delicacies', icon: UtensilsCrossed },
    { id: 'WELCOME DRINKS', label: 'Welcome Drinks', icon: GlassWater },
    { id: 'SOUP', label: 'Soups & Shorbas', icon: Soup },
    { id: 'COUNTER STARTER', label: 'Counter Starters', icon: Flame },
    { id: 'STARTER - VEG', label: 'Starters (Veg)', icon: Leaf },
    { id: 'STARTER - NON-VEG', label: 'Starters (Non-Veg)', icon: Drumstick },
    { id: 'PANEER', label: 'Paneer Collection', icon: Crown },
    { id: 'FISH', label: 'River & Sea Fish', icon: Fish },
    { id: 'PRAWN', label: 'Chilika Prawns', icon: Fish },
    { id: 'CHICKEN', label: 'Royal Chicken', icon: Drumstick },
    { id: 'MUTTON', label: 'The Mutton Feast', icon: Flame },
    { id: 'EGG', label: 'Egg Specialties', icon: UtensilsCrossed },
    { id: 'ROTI / NAN / PURI', label: 'Roti, Naan & Puri', icon: Layers },
    { id: 'RICE / PULAO / BIRYANI', label: 'Biryani & Pulao', icon: Sparkles },
    { id: 'DAL', label: 'Dal & Dalma', icon: Soup },
    { id: 'CHUTNEY & RAITA', label: 'Chutney & Raita', icon: UtensilsCrossed },
    { id: 'VEGETABLE', label: 'Vegetable Curries', icon: Leaf },
    { id: 'MUSHROOM', label: 'Mushroom Specials', icon: Leaf },
    { id: 'AAMISHA / NON-VEG', label: 'Aamisha Specialties', icon: Drumstick },
    { id: 'ODISSY SPECIAL', label: 'Odisha Heritage', icon: Crown },
    { id: 'SADDA / VEG', label: 'Sadda & Bhaja', icon: Leaf },
    { id: 'CONTINENTAL', label: 'Continental Corner', icon: UtensilsCrossed },
    { id: 'SWEET DESSERT', label: 'Sweet Desserts', icon: Cake },
    { id: 'PLATE COUNTER', label: 'Plate & Crockery', icon: Award },
    { id: 'WATER BOTTLE', label: 'Water Station', icon: GlassWater },
    { id: 'PAAN COUNTER', label: 'Live Paan Lounge', icon: Sparkles },
    { id: 'FRUIT DESIGN CUTTING', label: 'Fruit Carving', icon: Heart },
  ];

  useEffect(() => {
    async function fetchMenuData() {
      try {
        const [menuRes, summaryRes] = await Promise.all([
          api.getMenu().catch((err) => {
            console.warn('Backend API getMenu notice:', err);
            return null;
          }),
          api.getMenuSummary().catch(() => null),
        ]);
        if (menuRes) {
          const items = Array.isArray(menuRes)
            ? menuRes
            : (menuRes.menuItems || menuRes.data);
          if (Array.isArray(items) && items.length > 0) {
            setMenuItems(items);
          }
        }
        if (summaryRes && summaryRes.totalDishes) {
          setMenuSummary(summaryRes);
        }
      } catch (err) {
        console.warn('Failed to load menu data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenuData();
  }, []);

  // Sync category with URL query parameter
  useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('cat');
    if (cat) {
      setActiveCategory(cat.toUpperCase());
      setTimeout(() => {
        dishesGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [searchParams]);

  // Filter items based on tier, category, diet, search
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // 1. Tier Filter
      if (activeTier !== 'ALL') {
        const itemTier = (item.menuType || 'all').toLowerCase();
        if (activeTier === 'NORMAL') {
          if (itemTier !== 'normal' && itemTier !== 'all') return false;
        } else if (activeTier === 'DELUXE') {
          if (itemTier !== 'deluxe' && itemTier !== 'normal' && itemTier !== 'all') return false;
        } else if (activeTier === 'PREMIUM') {
          // Premium includes all tiers
        }
      }

      // 2. Category Filter
      if (activeCategory !== 'ALL') {
        const catUpper = activeCategory.toUpperCase();
        const itemCatUpper = (item.category || '').toUpperCase();
        let matchCat = itemCatUpper === catUpper;
        if (!matchCat) {
          if (catUpper === 'FISH' && (itemCatUpper === 'FISH' || itemCatUpper === 'RIVER & SEA FISH')) matchCat = true;
          else if (catUpper === 'PANEER' && itemCatUpper.includes('PANEER')) matchCat = true;
          else if (catUpper === 'CHICKEN' && itemCatUpper.includes('CHICKEN')) matchCat = true;
          else if (catUpper === 'MUTTON' && itemCatUpper.includes('MUTTON')) matchCat = true;
          else if (catUpper === 'PRAWN' && (itemCatUpper.includes('PRAWN') || itemCatUpper.includes('CRAB'))) matchCat = true;
          else if (catUpper === 'STARTER - VEG' && itemCatUpper === 'STARTER - VEG') matchCat = true;
          else if (catUpper === 'STARTER - NON-VEG' && itemCatUpper === 'STARTER - NON-VEG') matchCat = true;
          else if (catUpper === 'SWEET DESSERT' && (itemCatUpper.includes('DESSERT') || itemCatUpper.includes('SWEET'))) matchCat = true;
          else if (catUpper === 'WELCOME DRINKS' && (itemCatUpper.includes('DRINK') || itemCatUpper.includes('COOLER'))) matchCat = true;
          else if (catUpper === 'ODISSY SPECIAL' && (item.isOdiaSpecialty || itemCatUpper.includes('ODIA') || itemCatUpper.includes('ODISSY'))) matchCat = true;
          else if (catUpper === 'VEGETABLE' && (itemCatUpper.includes('VEGETABLE') || itemCatUpper === 'VEGETARIAN')) matchCat = true;
          else if (catUpper === 'DAL' && itemCatUpper.includes('DAL')) matchCat = true;
          else if (catUpper === 'RICE / PULAO / BIRYANI' && (itemCatUpper.includes('RICE') || itemCatUpper.includes('BIRYANI') || itemCatUpper.includes('PULAO'))) matchCat = true;
        }
        if (!matchCat) return false;
      }

      // 3. Dietary / Quality Filter
      if (dietFilter === 'VEG' && !item.isVeg) return false;
      if (dietFilter === 'NON-VEG' && item.isVeg) return false;
      if (dietFilter === 'POPULAR' && !item.isPopular) return false;
      if (dietFilter === 'CHEF_SPECIAL' && (!item.isFeatured && !item.isPopular)) return false;

      // 4. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name?.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchCat = item.category?.toLowerCase().includes(q);
        const matchTags = item.tags?.some((t: string) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCat && !matchTags) return false;
      }

      return true;
    });
  }, [menuItems, activeTier, activeCategory, dietFilter, searchQuery]);

  // Featured Chef's specials
  const chefSpecialDishes = useMemo(() => {
    return menuItems.filter((item) => item.isFeatured || (item.isPopular && item.isOdiaSpecialty)).slice(0, 4);
  }, [menuItems]);

  // Odia Specialty highlights
  const odiaSpecialDishes = useMemo(() => {
    return menuItems.filter((item) => item.isOdiaSpecialty || item.category === 'ODISSY SPECIAL').slice(0, 6);
  }, [menuItems]);

  // Dessert highlights
  const dessertDishes = useMemo(() => {
    return menuItems.filter((item) => item.category === 'SWEET DESSERT').slice(0, 6);
  }, [menuItems]);

  // Non-Veg highlights
  const nonVegHighlights = useMemo(() => {
    return menuItems.filter((item) => !item.isVeg && (item.category === 'MUTTON' || item.category === 'FISH' || item.category === 'PRAWN' || item.category === 'CHICKEN')).slice(0, 6);
  }, [menuItems]);

  // Real Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: menuItems.length };
    categories.forEach((cat) => {
      if (cat.id === 'ALL') return;
      const catUpper = cat.id.toUpperCase();
      const count = menuItems.filter((item) => {
        const itemCatUpper = (item.category || '').toUpperCase();
        if (itemCatUpper === catUpper) return true;
        if (catUpper === 'FISH' && (itemCatUpper === 'FISH' || itemCatUpper === 'RIVER & SEA FISH')) return true;
        if (catUpper === 'PANEER' && itemCatUpper.includes('PANEER')) return true;
        if (catUpper === 'CHICKEN' && itemCatUpper.includes('CHICKEN')) return true;
        if (catUpper === 'MUTTON' && itemCatUpper.includes('MUTTON')) return true;
        if (catUpper === 'PRAWN' && (itemCatUpper.includes('PRAWN') || itemCatUpper.includes('CRAB'))) return true;
        if (catUpper === 'STARTER - VEG' && itemCatUpper === 'STARTER - VEG') return true;
        if (catUpper === 'STARTER - NON-VEG' && itemCatUpper === 'STARTER - NON-VEG') return true;
        if (catUpper === 'SWEET DESSERT' && (itemCatUpper.includes('DESSERT') || itemCatUpper.includes('SWEET'))) return true;
        if (catUpper === 'WELCOME DRINKS' && (itemCatUpper.includes('DRINK') || itemCatUpper.includes('COOLER'))) return true;
        if (catUpper === 'ODISSY SPECIAL' && (item.isOdiaSpecialty || itemCatUpper.includes('ODIA') || itemCatUpper.includes('ODISSY'))) return true;
        if (catUpper === 'VEGETABLE' && (itemCatUpper.includes('VEGETABLE') || itemCatUpper === 'VEGETARIAN')) return true;
        if (catUpper === 'DAL' && itemCatUpper.includes('DAL')) return true;
        if (catUpper === 'RICE / PULAO / BIRYANI' && (itemCatUpper.includes('RICE') || itemCatUpper.includes('BIRYANI') || itemCatUpper.includes('PULAO'))) return true;
        return false;
      }).length;
      counts[cat.id] = count;
    });
    return counts;
  }, [menuItems, categories]);

  const scrollToGrid = () => {
    dishesGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-28 pb-32 relative z-10 min-h-screen">
      {/* Food Detail Modal */}
      <FoodDetailModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* ====================================================
          1. CINEMATIC FULL-WIDTH MENU HEADER (ROYAL EMERALD & GOLD)
          ==================================================== */}
      <section className="relative overflow-hidden mb-16 py-16 sm:py-24 border-b border-[#D4AF37]/30 bg-[#03150D]">
        {/* Background Image with Deep Royal Emerald & Gold Aurora Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80"
            alt="Royal Catering Feast"
            className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.25] saturate-[1.2]"
          />
          {/* Deep Royal Emerald & Jade Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#021109]/95 via-[#06291C]/85 to-[#03150D]" />
          {/* Radiant 24K Imperial Gold Aurora Center Light */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(212,175,55,0.25)_0%,rgba(6,41,28,0.7)_55%,transparent_85%)]" />
          {/* Ambient Emerald Edge Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,14,9,0.9)_100%)]" />
        </div>

        {/* Shimmering Top & Bottom Gold Filigree Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFDF73]/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          
          {/* Top Royal Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-[#041810]/95 backdrop-blur-2xl border-2 border-[#D4AF37] text-xs font-black text-[#F5CE68] uppercase tracking-[0.22em] shadow-[0_0_35px_rgba(212,175,55,0.35)] transition-transform hover:scale-105 select-none">
            <Crown className="w-4 h-4 text-[#F5CE68] animate-pulse" />
            <span>AD Catering Official Menu System</span>
          </div>

          {/* Master Headings with 24K Liquid Gold Typography */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
              THE ART OF <span className="gold-gradient-text drop-shadow-[0_4px_35px_rgba(212,175,55,0.6)]">GREAT FOOD</span>
            </h1>

            <p className="text-base sm:text-xl text-[#FAF8F5]/90 max-w-3xl mx-auto font-light leading-relaxed">
              From traditional Odia delicacies to royal Indian banquets and live interactive counters, explore our carefully curated catering collections.
            </p>
          </div>

          {/* Quick Stats Pill Bar (Luxury Emerald & Gold Capsules) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2">
            <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#041810]/95 via-[#06291C]/90 to-[#041810]/95 backdrop-blur-xl border border-[#D4AF37]/50 flex items-center gap-3 text-xs font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[#D4AF37] hover:scale-105 transition-all group">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-sm group-hover:rotate-12 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[#F5CE68] font-black text-sm tabular-nums">
                  {menuSummary?.totalDishes || menuItems.length || '145+'} Delicacies
                </span>
                <span className="text-[10px] text-[#CBD5E1] uppercase tracking-wider font-semibold">Universal Selection</span>
              </div>
            </div>

            <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#041810]/95 via-[#06291C]/90 to-[#041810]/95 backdrop-blur-xl border border-[#D4AF37]/50 flex items-center gap-3 text-xs font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-[#D4AF37] hover:scale-105 transition-all group">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-sm group-hover:rotate-12 transition-transform">
                <Crown className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[#F5CE68] font-black text-sm tabular-nums">
                  {categories.length - 1} Categories
                </span>
                <span className="text-[10px] text-[#CBD5E1] uppercase tracking-wider font-semibold">Master Handcrafted</span>
              </div>
            </div>

            <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#041810]/95 via-[#06291C]/90 to-[#041810]/95 backdrop-blur-xl border border-emerald-500/50 flex items-center gap-3 text-xs font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-emerald-400 hover:scale-105 transition-all group">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[#041810] shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-emerald-300 font-black text-sm">
                  100% FSSAI Certified
                </span>
                <span className="text-[10px] text-[#CBD5E1] uppercase tracking-wider font-semibold">Sanitized Kitchens</span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Pure Veg Button + Explore Chevron */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/veg-menu"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white hover:brightness-110 transition-all text-xs font-black shadow-[0_0_35px_rgba(16,185,129,0.5)] border-2 border-emerald-300 flex items-center gap-2.5 active:scale-95 group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <Leaf className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>Dedicated 100% Pure Vegetarian Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={scrollToGrid}
              className="px-5 py-3 rounded-2xl bg-[#06291C]/90 hover:bg-[#041810] border border-[#D4AF37]/60 hover:border-[#D4AF37] text-xs font-bold text-[#F5CE68] hover:text-white transition-all shadow-md flex items-center gap-2 group active:scale-95"
            >
              <span>Explore All Banquet Items</span>
              <ChevronDown className="w-4 h-4 text-[#F5CE68] group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ====================================================
            2. THREE 3D FLOATING GLASS COLLECTION CARDS
            ==================================================== */}
        <section>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow">
              <Layers className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Three Tiers of Banquet Excellence</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Signature Menu Collections
            </h2>
            <p className="text-sm text-[#CBD5E1] font-normal">
              Select a collection tier to view curated dishes, or browse all delicacies simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* NORMAL MENU CARD */}
            <TiltCard maxTilt={4}>
              <div
                onClick={() => {
                  setActiveTier(activeTier === 'NORMAL' ? 'ALL' : 'NORMAL');
                  scrollToGrid();
                }}
                className={`group relative rounded-[36px] p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 liquid-shine h-full ${
                  activeTier === 'NORMAL'
                    ? 'bg-[#06291C]/95 border-2 border-[#D4AF37] shadow-[0_25px_70px_rgba(0,0,0,0.7)] ring-2 ring-[#D4AF37]/50'
                    : 'bg-[#06291C]/80 border border-[#D4AF37]/35 shadow-[0_16px_45px_rgba(0,0,0,0.5)]'
                }`}
              >
                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                      alt="Normal Menu Feast"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/75 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/90 text-[10px] font-bold text-white border border-[#D4AF37]/40">
                      Classic Tier
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-black text-white">NORMAL MENU</h3>
                    <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed">
                      Essential feast featuring welcome cooler, classic veg & chicken gravies, fragrant rice, hot breads, dal, and traditional dessert.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Dishes Included:</span>
                    <span className="font-bold text-[#F5CE68]">45+ Delicacies</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      activeTier === 'NORMAL'
                        ? 'gold-gradient-btn text-[#041810]'
                        : 'bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/40 text-white'
                    }`}
                  >
                    <span>{activeTier === 'NORMAL' ? 'Viewing Normal Menu' : 'Explore Normal Menu'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltCard>

            {/* DELUX MENU CARD (POPULAR) */}
            <TiltCard maxTilt={4}>
              <div
                onClick={() => {
                  setActiveTier(activeTier === 'DELUXE' ? 'ALL' : 'DELUXE');
                  scrollToGrid();
                }}
                className={`group relative rounded-[36px] p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 liquid-shine h-full ${
                  activeTier === 'DELUXE'
                    ? 'bg-[#06291C]/95 border-2 border-[#D4AF37] shadow-[0_30px_90px_rgba(0,0,0,0.8)] ring-2 ring-[#D4AF37]'
                    : 'bg-[#06291C]/85 border border-[#D4AF37]/50 shadow-md hover:border-[#D4AF37]'
                }`}
              >
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C04A] text-[#041810] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 z-20">
                  <Crown className="w-3.5 h-3.5" />
                  <span>Most Selected Banquet</span>
                </div>

                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
                      alt="Delux Menu Feast"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/75 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#D4AF37] text-[10px] font-black text-[#041810] shadow">
                      Deluxe Tier
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-black text-white">DELUX MENU</h3>
                    <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed">
                      Comprehensive banquet including live Puchka & Dahi Vada counters, Tandoori starters, Fish Kalia, Dum Biryani, and twin desserts.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Dishes Included:</span>
                    <span className="font-bold text-[#F5CE68]">75+ Delicacies</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    className="w-full py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 gold-gradient-btn text-[#041810]"
                  >
                    <span>{activeTier === 'DELUXE' ? 'Viewing Delux Menu' : 'Explore Delux Menu'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltCard>

            {/* PREMIUM MENU CARD */}
            <TiltCard maxTilt={4}>
              <div
                onClick={() => {
                  setActiveTier(activeTier === 'PREMIUM' ? 'ALL' : 'PREMIUM');
                  scrollToGrid();
                }}
                className={`group relative rounded-[36px] p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 liquid-shine h-full ${
                  activeTier === 'PREMIUM'
                    ? 'bg-[#06291C]/95 border-2 border-[#D4AF37] shadow-[0_25px_70px_rgba(0,0,0,0.7)] ring-2 ring-[#D4AF37]/50'
                    : 'bg-[#06291C]/80 border border-[#D4AF37]/35 shadow-[0_16px_45px_rgba(0,0,0,0.5)]'
                }`}
              >
                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                      alt="Premium Royal Menu"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/75 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/90 text-[10px] font-bold text-[#F5CE68] border border-[#D4AF37]/40">
                      VIP Royal Tier
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-black text-white">PREMIUM MENU</h3>
                    <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed">
                      Unrestricted royal banquet with live Reshmi Kebab, Odia Mutton Kasa, Prawn Malai Curry, Chhena Poda, Paan lounge & Fruit Carving.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Dishes Included:</span>
                    <span className="font-bold text-[#F5CE68]">All 108+ Delicacies</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                      activeTier === 'PREMIUM'
                        ? 'gold-gradient-btn text-[#041810]'
                        : 'bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/40 text-white'
                    }`}
                  >
                    <span>{activeTier === 'PREMIUM' ? 'Viewing Premium Menu' : 'Explore Premium Menu'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltCard>

          </div>

          {activeTier !== 'ALL' && (
            <div className="text-center pt-6">
              <button
                onClick={() => setActiveTier('ALL')}
                className="text-xs text-[#F5CE68] hover:text-white underline font-semibold transition-colors"
              >
                Clear Tier Filter & View All Menu Delicacies
              </button>
            </div>
          )}
        </section>

        {/* ====================================================
            3. CHEF'S SPECIAL SPOTLIGHT (Horizontal Cards)
            ==================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#D4AF37]/30">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
                <ChefHat className="w-4 h-4 text-[#F5CE68]" />
                <span>Culinary Spotlight</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                Chef's Signature Selection
              </h2>
            </div>
            <span className="text-xs text-[#CBD5E1] font-light">
              Handpicked by AD Catering and Cook Services Master Chefs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chefSpecialDishes.map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={3}>
                  <div className="p-5 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 flex flex-col sm:flex-row gap-5 items-center liquid-shine h-full shadow-[0_16px_45px_rgba(0,0,0,0.6)] text-[#FAF8F5]">
                    <div
                      onClick={() => setActiveModalItem(dish)}
                      className="relative w-full sm:w-44 h-44 rounded-2xl overflow-hidden shrink-0 cursor-pointer group border border-[#D4AF37]/30 bg-black/40"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow">
                        Chef's Choice
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#F5CE68] font-bold uppercase tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
                          {dish.category}
                        </span>
                        {dish.isVeg ? (
                          <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/90 px-2 py-0.5 rounded-md border border-emerald-500/50">Veg</span>
                        ) : (
                          <span className="text-[10px] text-rose-300 font-bold bg-rose-950/90 px-2 py-0.5 rounded-md border border-rose-500/50">Non-Veg</span>
                        )}
                      </div>

                      <h3
                        onClick={() => setActiveModalItem(dish)}
                        className="font-display font-bold text-lg text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </h3>

                      <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => setActiveModalItem(dish)}
                          className="text-xs text-[#CBD5E1] hover:text-[#F5CE68] flex items-center gap-1 font-semibold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Inspect</span>
                        </button>

                        <button
                          onClick={() => toggleDish({
                            id: dish.id,
                            name: dish.name,
                            category: dish.category,
                            price: dish.price,
                            isVeg: dish.isVeg
                          })}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                            selected
                              ? 'bg-rose-700 hover:bg-rose-800 text-white border border-rose-400'
                              : 'gold-gradient-btn text-[#041810]'
                          }`}
                        >
                          {selected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Select Dish</span>
                            </>
                          )}
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
            4. ODISHA'S SIGNATURE FLAVOURS (ODISSY SPECIAL)
            ==================================================== */}
        <section className="relative rounded-[40px] overflow-hidden p-8 sm:p-12 bg-[#041810]/95 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_24px_70px_rgba(0,0,0,0.8)] space-y-8 text-[#FAF8F5]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Utkala Culinary Heritage</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              ODISHA'S SIGNATURE FLAVOURS
            </h2>
            <p className="text-sm text-[#CBD5E1] font-normal leading-relaxed">
              Timeless recipes perfected across centuries in Puri and Cuttack royal kitchens—authentic Chhena Poda, slow-cooked Mutton Kasa, traditional Dalma, and stone-ground Machha Besara.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {odiaSpecialDishes.map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={3}>
                  <div className="rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 p-5 flex flex-col justify-between liquid-shine h-full shadow-[0_16px_45px_rgba(0,0,0,0.6)] text-[#FAF8F5]">
                    <div>
                      <div
                        onClick={() => setActiveModalItem(dish)}
                        className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/30 bg-black/40"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = dish.isVeg
                              ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
                              : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
                          }}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/70 via-transparent to-transparent" />
                        <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow">
                          ODIA TRADITION
                        </span>
                      </div>

                      <div className="pt-4 space-y-1.5">
                        <h3
                          onClick={() => setActiveModalItem(dish)}
                          className="font-display font-bold text-lg text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalItem(dish)}
                        className="text-xs text-[#F5CE68] hover:text-white flex items-center gap-1 font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Recipe</span>
                      </button>

                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          price: dish.price,
                          isVeg: dish.isVeg
                        })}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all ${
                          selected
                            ? 'bg-rose-700 hover:bg-rose-800 text-white border border-rose-400'
                            : 'gold-gradient-btn text-[#041810]'
                        }`}
                      >
                        {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{selected ? 'Selected' : 'Add Dish'}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            5. CATEGORY BROWSER IN SIDE & DELICACIES GRID (DESKTOP & MOBILE)
            ==================================================== */}
        <section ref={dishesGridRef} className="space-y-6 pt-4">
          
          {/* Mobile Category Trigger & Quick Bar (< lg) */}
          <div className="lg:hidden sticky top-20 z-30 space-y-2.5">
            {/* Top row with Categories Button & Search */}
            <div className="p-3 rounded-2xl bg-[#041810]/95 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-xl flex items-center justify-between gap-2.5">
              <button
                onClick={() => setMobileCategoryDrawerOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl gold-gradient-btn text-[#041810] text-xs font-black shadow-md shrink-0 active:scale-95 transition-transform"
              >
                <MenuIcon className="w-4 h-4" />
                <span>Categories ({categories.length})</span>
                <span className="w-2 h-2 rounded-full bg-[#041810] animate-ping" />
              </button>

              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-[#F5CE68] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 145+ dishes..."
                  className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-xl pl-9 pr-7 py-2 text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:border-[#F5CE68]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Quick Horizontal Category Scroll Strip for 1-Tap Access on Mobile */}
            <div
              ref={categoryScrollRef}
              className="p-2 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/35 backdrop-blur-xl flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || (cat.id === 'ALL' ? menuItems.length : 0);
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      dishesGridRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 ${
                      isActive
                        ? 'gold-gradient-btn text-[#041810] shadow-md scale-105'
                        : 'bg-emerald-950/70 border border-[#D4AF37]/25 text-[#E2E8F0] hover:text-[#F5CE68]'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${isActive ? 'bg-[#041810]/20 text-[#041810]' : 'bg-[#06291C] text-[#F5CE68]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Category Slide-in Side Drawer (< lg) */}
          {mobileCategoryDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              {/* Dark Backdrop */}
              <div
                className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setMobileCategoryDrawerOpen(false)}
              />

              {/* Side Drawer Panel */}
              <div className="relative w-80 max-w-[85vw] h-full bg-[#041810] border-r border-[#D4AF37]/50 shadow-2xl p-5 flex flex-col z-10 animate-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F5CE68]" />
                    <h3 className="font-display font-black text-lg text-white">Menu Categories</h3>
                  </div>
                  <button
                    onClick={() => setMobileCategoryDrawerOpen(false)}
                    className="p-1.5 rounded-xl bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/40"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Dietary Segment Inside Drawer */}
                <div className="py-3 border-b border-[#D4AF37]/20 flex items-center gap-1">
                  <button
                    onClick={() => setDietFilter('ALL')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold text-center transition-all ${
                      dietFilter === 'ALL'
                        ? 'gold-gradient-btn text-[#041810]'
                        : 'bg-emerald-950/70 text-[#CBD5E1] border border-white/10'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietFilter('VEG')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold text-center transition-all ${
                      dietFilter === 'VEG'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    Veg
                  </button>
                  <button
                    onClick={() => setDietFilter('NON-VEG')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold text-center transition-all ${
                      dietFilter === 'NON-VEG'
                        ? 'bg-rose-600 text-white'
                        : 'bg-emerald-950/70 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    Non-Veg
                  </button>
                </div>

                {/* Categories List in Drawer */}
                <div className="flex-1 overflow-y-auto py-3 space-y-1.5 pr-1">
                  {categories.map((cat) => {
                    const IconComponent = cat.icon;
                    const isActive = activeCategory === cat.id;
                    const count = categoryCounts[cat.id] || (cat.id === 'ALL' ? menuItems.length : 0);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setMobileCategoryDrawerOpen(false);
                          dishesGridRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all ${
                          isActive
                            ? 'gold-gradient-btn text-[#041810] shadow-md scale-[1.02]'
                            : 'bg-emerald-950/50 hover:bg-emerald-900/60 text-[#E2E8F0] hover:text-[#F5CE68] border border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconComponent className="w-4 h-4 shrink-0 text-[#F5CE68]" />
                          <span className="truncate">{cat.label}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          isActive ? 'bg-[#041810]/20 text-[#041810]' : 'bg-[#06291C] text-[#F5CE68] border border-[#D4AF37]/30'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              TWO COLUMN LAYOUT: SIDEBAR (DESKTOP) + DISHES
              ==================================================== */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start relative">

            {/* ================================================
                DESKTOP CATEGORY SIDEBAR (In Side Perfectly)
                ================================================ */}
            <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 sticky top-28 max-h-[calc(100vh-140px)] rounded-3xl bg-[#041810]/95 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-4 overflow-hidden z-20 space-y-3">
              {/* Sidebar Header */}
              <div className="pb-3 border-b border-[#D4AF37]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] text-[#041810] flex items-center justify-center font-black shadow">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                      Categories
                    </h3>
                    <p className="text-[10px] text-[#F5CE68] font-semibold">
                      {categories.length - 1} Handcrafted Sections
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#06291C] text-[#F5CE68] border border-[#D4AF37]/40">
                  {menuItems.length} Dishes
                </span>
              </div>

              {/* Diet Quick Filter Segment in Sidebar */}
              <div className="p-1 rounded-xl bg-[#06291C]/90 border border-[#D4AF37]/30 grid grid-cols-3 gap-1">
                <button
                  onClick={() => setDietFilter('ALL')}
                  className={`py-1.5 text-[11px] font-bold rounded-lg text-center transition-all ${
                    dietFilter === 'ALL'
                      ? 'gold-gradient-btn text-[#041810] shadow-sm'
                      : 'text-[#CBD5E1] hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietFilter('VEG')}
                  className={`py-1.5 text-[11px] font-bold rounded-lg text-center transition-all flex items-center justify-center gap-1 ${
                    dietFilter === 'VEG'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Veg
                </button>
                <button
                  onClick={() => setDietFilter('NON-VEG')}
                  className={`py-1.5 text-[11px] font-bold rounded-lg text-center transition-all flex items-center justify-center gap-1 ${
                    dietFilter === 'NON-VEG'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-rose-300 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Non-Veg
                </button>
              </div>

              {/* Scrollable Categories List */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 pr-1 pb-1">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  const isActive = activeCategory === cat.id;
                  const count = categoryCounts[cat.id] || (cat.id === 'ALL' ? menuItems.length : 0);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        dishesGridRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all group ${
                        isActive
                          ? 'gold-gradient-btn text-[#041810] shadow-md scale-[1.02] font-black'
                          : 'bg-[#06291C]/50 hover:bg-[#06291C] text-[#E2E8F0] hover:text-[#F5CE68] border border-transparent hover:border-[#D4AF37]/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#041810]' : 'text-[#F5CE68] group-hover:scale-110'} transition-transform`} />
                        <span className="truncate">{cat.label}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        isActive
                          ? 'bg-[#041810]/20 text-[#041810]'
                          : 'bg-[#041810] text-[#F5CE68] border border-[#D4AF37]/30'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* ================================================
                MAIN DISHES COLUMN (With Small Size Items)
                ================================================ */}
            <div className="flex-1 min-w-0 w-full space-y-4">
              {/* Desktop Search & Controls Bar */}
              <div className="p-4 rounded-3xl bg-[#041810]/90 backdrop-blur-2xl border border-[#D4AF37]/45 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search Box */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#F5CE68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes (e.g. Mutton, Biryani, Prawn, Chhena Poda)..."
                    className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl pl-10 pr-8 py-2.5 text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:border-[#F5CE68] focus:ring-1 focus:ring-[#D4AF37]/50 shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Right Controls: Item Size Toggle & Special Filter Pills */}
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
                  {/* Small Size / Standard Toggle */}
                  <div className="flex items-center rounded-xl bg-[#06291C] p-1 border border-[#D4AF37]/35">
                    <button
                      onClick={() => setCompactItemSize(true)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                        compactItemSize
                          ? 'gold-gradient-btn text-[#041810] shadow-sm'
                          : 'text-[#CBD5E1] hover:text-white'
                      }`}
                      title="Compact Small Size Items View"
                    >
                      <Grid2X2 className="w-3.5 h-3.5" />
                      <span>Small Size</span>
                    </button>
                    <button
                      onClick={() => setCompactItemSize(false)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                        !compactItemSize
                          ? 'gold-gradient-btn text-[#041810] shadow-sm'
                          : 'text-[#CBD5E1] hover:text-white'
                      }`}
                      title="Standard Card View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Standard</span>
                    </button>
                  </div>

                  {/* Popular & Chef Special Pills */}
                  <button
                    onClick={() => setDietFilter(dietFilter === 'POPULAR' ? 'ALL' : 'POPULAR')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      dietFilter === 'POPULAR'
                        ? 'gold-gradient-btn text-[#041810] shadow-sm'
                        : 'bg-[#06291C] border border-[#D4AF37]/30 text-[#CBD5E1] hover:text-[#F5CE68]'
                    }`}
                  >
                    ★ Popular
                  </button>
                  <button
                    onClick={() => setDietFilter(dietFilter === 'CHEF_SPECIAL' ? 'ALL' : 'CHEF_SPECIAL')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      dietFilter === 'CHEF_SPECIAL'
                        ? 'gold-gradient-btn text-[#041810] shadow-sm'
                        : 'bg-[#06291C] border border-[#D4AF37]/30 text-[#CBD5E1] hover:text-[#F5CE68]'
                    }`}
                  >
                    Chef's Special
                  </button>
                </div>
              </div>

              {/* Active Category Status Bar */}
              <div className="flex items-center justify-between text-xs px-2 text-[#CBD5E1]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span>Showing</span>
                  <strong className="text-white font-black text-sm">{filteredItems.length}</strong>
                  <span>delicacies</span>
                  {activeCategory !== 'ALL' && (
                    <span className="text-[#F5CE68] font-bold">
                      in <span className="underline">{categories.find(c => c.id === activeCategory)?.label || activeCategory}</span>
                    </span>
                  )}
                  {activeTier !== 'ALL' && <span>• <strong>{activeTier} Tier</strong></span>}
                  {dietFilter !== 'ALL' && <span>• <strong className="text-[#F5CE68]">{dietFilter}</strong></span>}
                </div>

                {(activeCategory !== 'ALL' || activeTier !== 'ALL' || dietFilter !== 'ALL' || searchQuery) && (
                  <button
                    onClick={() => {
                      setActiveCategory('ALL');
                      setActiveTier('ALL');
                      setDietFilter('ALL');
                      setSearchQuery('');
                    }}
                    className="text-[#F5CE68] hover:text-white underline font-semibold text-xs"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>

              {/* ================================================
                  SMALL SIZE ITEMS GRID
                  ================================================ */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-20 rounded-[36px] bg-[#041810]/85 border border-[#D4AF37]/40 space-y-4 shadow-xl">
                  <UtensilsCrossed className="w-12 h-12 text-[#F5CE68] mx-auto opacity-70" />
                  <h3 className="font-display text-2xl text-white font-bold">No delicacies found</h3>
                  <p className="text-xs text-[#CBD5E1] max-w-md mx-auto">
                    No menu items match your active search or filters. Try adjusting your query or resetting filters.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('ALL');
                      setActiveTier('ALL');
                      setDietFilter('ALL');
                      setSearchQuery('');
                      if (menuItems.length === 0) {
                        setMenuItems(defaultMenuItems);
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810]"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-3 sm:gap-4 ${
                    compactItemSize
                      ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {filteredItems.map((dish) => {
                    const selected = isDishSelected(dish.id);
                    return (
                      <TiltCard key={dish.id} maxTilt={compactItemSize ? 2 : 3}>
                        <div className="rounded-2xl sm:rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/35 p-3 sm:p-3.5 flex flex-col justify-between group liquid-shine h-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#D4AF37] hover:shadow-[0_14px_40px_rgba(212,175,55,0.2)] transition-all text-[#FAF8F5]">
                          <div>
                            {/* Food Thumbnail with Preview */}
                            <div
                              onClick={() => setActiveModalItem(dish)}
                              className={`relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group/img border border-[#D4AF37]/30 bg-black/40 ${
                                compactItemSize ? 'h-28 sm:h-36' : 'h-44 sm:h-48'
                              }`}
                              title="Click to view recipe & ingredients"
                            >
                              <img
                                src={dish.image}
                                alt={dish.name}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = dish.isVeg
                                    ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
                                    : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
                                }}
                                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/80 via-transparent to-transparent pointer-events-none" />

                              {/* Hover Inspect Overlay */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="px-2.5 py-1 rounded-full bg-black/75 text-white text-[10px] font-bold flex items-center gap-1 border border-[#D4AF37]/50 shadow-lg">
                                  <Eye className="w-3 h-3 text-[#F5CE68]" />
                                  <span>View Dish</span>
                                </span>
                              </div>

                              {/* Veg / Non-Veg Indicator */}
                              {dish.isVeg ? (
                                <span
                                  className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-emerald-950/95 border border-emerald-400 text-emerald-300 text-[9px] font-bold shadow flex items-center gap-1 backdrop-blur-sm"
                                  title="Pure Vegetarian"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                                  Veg
                                </span>
                              ) : (
                                <span
                                  className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-rose-950/95 border border-rose-400 text-rose-300 text-[9px] font-bold shadow flex items-center gap-1 backdrop-blur-sm"
                                  title="Non-Vegetarian"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
                                  Non-Veg
                                </span>
                              )}

                              {/* Odia Tag if applicable */}
                              {dish.isOdiaSpecialty && (
                                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[8px] font-black bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow">
                                  ODIA
                                </span>
                              )}

                              {/* Tier Badge */}
                              {dish.menuType && dish.menuType !== 'all' && (
                                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[8px] font-bold bg-[#041810]/85 text-[#F5CE68] border border-[#D4AF37]/40">
                                  {dish.menuType.toUpperCase()}
                                </span>
                              )}
                            </div>

                            {/* Dish Details */}
                            <div className="pt-2.5 space-y-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[9px] text-[#F5CE68] font-bold uppercase tracking-wider truncate">
                                  {dish.category}
                                </span>
                                {dish.isPopular && (
                                  <span className="text-[8px] text-[#FFDF73] font-black bg-[#D4AF37]/20 px-1.5 py-0.5 rounded border border-[#D4AF37]/40 shrink-0">
                                    ★ Popular
                                  </span>
                                )}
                              </div>

                              <h3
                                onClick={() => setActiveModalItem(dish)}
                                className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#F5CE68] transition-colors cursor-pointer truncate"
                                title={dish.name}
                              >
                                {dish.name}
                              </h3>

                              <p className="text-[11px] text-[#CBD5E1] line-clamp-1 sm:line-clamp-2 leading-tight">
                                {dish.description}
                              </p>
                            </div>
                          </div>

                          {/* Card Actions (Bottom Compact Bar) */}
                          <div className="mt-2.5 pt-2 border-t border-[#D4AF37]/25 flex items-center justify-between gap-1.5">
                            <button
                              onClick={() => setActiveModalItem(dish)}
                              className="text-[10px] text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1 transition-colors shrink-0"
                            >
                              <Eye className="w-3 h-3" />
                              <span className="hidden sm:inline">Inspect</span>
                            </button>

                            <button
                              onClick={() => toggleDish({
                                id: dish.id,
                                name: dish.name,
                                category: dish.category,
                                price: dish.price,
                                isVeg: dish.isVeg
                              })}
                              className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-black flex items-center gap-1 transition-all shadow-sm ${
                                selected
                                  ? 'bg-rose-700 hover:bg-rose-800 text-white border border-rose-400'
                                  : 'gold-gradient-btn text-[#041810]'
                              }`}
                            >
                              {selected ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" />
                                  <span>+ Add</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </section>

        {/* ====================================================
            7. THREE TIER COMPARISON MATRIX SECTION
            ==================================================== */}
        <section className="space-y-8 pt-8 text-[#FAF8F5]">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow">
              <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Transparent Package Specs</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Menu Collections Comparison
            </h2>
            <p className="text-sm text-[#CBD5E1] font-normal">
              Compare items, counters, and service inclusions across our Basic, Premium, and Deluxe banquet offerings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* BASIC TIER COLUMN */}
            <div className="rounded-[36px] bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 p-6 sm:p-8 space-y-6 liquid-shine flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="space-y-4">
                <div>
                  <h3 className="font-display font-black text-2xl text-white">BASIC</h3>
                  <p className="text-xs text-[#CBD5E1] mt-1">Clean, elegant celebratory feast</p>
                  <p className="font-display font-black text-2xl text-[#F5CE68] mt-2">₹850 <span className="text-xs text-[#CBD5E1] font-semibold">/ Person</span></p>
                </div>

                <div className="py-3 border-y border-[#D4AF37]/25 space-y-3 text-xs text-[#CBD5E1]">
                  <div className="flex items-center justify-between">
                    <span>Dishes Count:</span>
                    <strong className="text-white">45+ Selections</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Welcome Coolers:</span>
                    <strong className="text-white">1 Choice (Lime Soda / Jaljeera)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Starters:</span>
                    <strong className="text-white">2 (Veg Crispy / Corn Seekh)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Main Courses:</span>
                    <strong className="text-white">Chicken / Paneer + Dalma</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Breads & Rice:</span>
                    <strong className="text-white">Tandoori Roti, Phulka & Basmati</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Desserts:</span>
                    <strong className="text-white">1 Classic (Gulab Jamun)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Staff & Warmers:</span>
                    <strong className="text-emerald-400">Included</strong>
                  </div>
                </div>
              </div>

              <Link
                to="/booking?package=BASIC%20PACKAGE"
                className="w-full py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/50 text-xs font-bold text-center block text-white shadow-sm transition-all"
              >
                Choose Basic (₹850)
              </Link>
            </div>

            {/* PREMIUM TIER COLUMN (POPULAR) */}
            <div className="rounded-[36px] bg-[#06291C]/95 backdrop-blur-2xl border-2 border-[#D4AF37] p-6 sm:p-8 space-y-6 liquid-shine flex flex-col justify-between shadow-[0_25px_65px_rgba(0,0,0,0.8)] ring-2 ring-[#D4AF37]/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-2xl text-white">PREMIUM</h3>
                    <p className="text-xs text-[#F5CE68] font-semibold mt-1">Most chosen wedding banquet</p>
                    <p className="font-display font-black text-2xl text-[#F5CE68] mt-2">₹950 <span className="text-xs text-[#CBD5E1] font-semibold">/ Person</span></p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C04A] text-[#041810] text-[10px] font-black uppercase shadow-sm">
                    POPULAR
                  </span>
                </div>

                <div className="py-3 border-y border-[#D4AF37]/30 space-y-3 text-xs text-[#CBD5E1]">
                  <div className="flex items-center justify-between">
                    <span>Dishes Count:</span>
                    <strong className="text-[#F5CE68]">75+ Selections</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Welcome Coolers:</span>
                    <strong className="text-white">2 Coolers (Mojito + Mango)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Starters:</span>
                    <strong className="text-white">4 (Fish Amritsari + Tikka)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Main Courses:</span>
                    <strong className="text-white">Mutton Kasa + Butter Chicken</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Breads & Rice:</span>
                    <strong className="text-white">Butter Naan, Laccha & Biryani</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Desserts:</span>
                    <strong className="text-white">3 Royal (Rasmalai + Chhena Poda)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Live Counters:</span>
                    <strong className="text-emerald-400">Puchka & Chaat Counter</strong>
                  </div>
                </div>
              </div>

              <Link
                to="/booking?package=PREMIUM%20PACKAGE"
                className="w-full py-3.5 rounded-xl gold-gradient-btn text-[#041810] text-xs font-black text-center block shadow-md hover:scale-[1.02] transition-transform"
              >
                Choose Premium (₹950)
              </Link>
            </div>

            {/* DELUXE TIER COLUMN */}
            <div className="rounded-[36px] bg-[#06291C]/95 backdrop-blur-2xl border-2 border-[#D4AF37] p-6 sm:p-8 space-y-6 liquid-shine flex flex-col justify-between shadow-[0_30px_75px_rgba(0,0,0,0.85)] animate-luxury-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-2xl text-white">DELUXE</h3>
                    <p className="text-xs text-[#CBD5E1] mt-1">The pinnacle of VIP hospitality</p>
                    <p className="font-display font-black text-2xl text-[#F5CE68] mt-2">₹1050 <span className="text-xs text-[#CBD5E1] font-semibold">/ Person</span></p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#041810] text-[#F5CE68] text-[10px] font-black uppercase shadow-sm border border-[#D4AF37]/50">
                    VIP LUXURY
                  </span>
                </div>

                <div className="py-3 border-y border-[#D4AF37]/30 space-y-3 text-xs text-[#CBD5E1]">
                  <div className="flex items-center justify-between">
                    <span>Dishes Count:</span>
                    <strong className="text-[#F5CE68]">All 108+ Delicacies</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Welcome Coolers:</span>
                    <strong className="text-white">Full Mocktail & Ice Bar</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Starters:</span>
                    <strong className="text-white">6 (Live BBQ, Prawns & Kebabs)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Main Courses:</span>
                    <strong className="text-white">Mutton Kasa + Prawn + Fish</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Breads & Rice:</span>
                    <strong className="text-white">Assorted Tandoor Baskets & Biryani</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Desserts:</span>
                    <strong className="text-white">4 Grand Artisanal Sweets</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Live Counters:</span>
                    <strong className="text-emerald-400">Live BBQ + Paan + Fruit Lounge</strong>
                  </div>
                </div>
              </div>

              <Link
                to="/booking?package=DELUXE%20PACKAGE"
                className="w-full py-3.5 rounded-xl gold-gradient-btn text-[#041810] text-xs font-black text-center block shadow-md hover:scale-[1.02] transition-transform"
              >
                Choose Deluxe (₹1050)
              </Link>
            </div>

          </div>
        </section>

        {/* ====================================================
            8. CALL TO ACTION BANNER
            ==================================================== */}
        <section className="relative rounded-[40px] overflow-hidden p-8 sm:p-14 bg-[#041810]/95 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_24px_70px_rgba(0,0,0,0.8)] text-center space-y-6 liquid-shine text-[#FAF8F5]">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Custom Menu Consultation</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
              READY TO PLAN YOUR PERFECT MENU?
            </h2>
            <p className="text-sm text-[#CBD5E1] font-normal leading-relaxed">
              Connect with our master catering coordinators to sample dishes, tailor specific recipes for special diets, or plan multi-day wedding banquets.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/booking"
              className="px-8 py-4 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md hover:scale-105 transition-transform flex items-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Book Your Event Now</span>
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-2xl bg-emerald-950/80 border border-[#D4AF37]/50 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
            >
              Get a Custom Quote
            </Link>
          </div>
        </section>

      </div>

      {/* ====================================================
          9. FLOATING MENU SELECTION CART DOCK
          ==================================================== */}
      {selectedDishes.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl p-4 rounded-3xl bg-[#041810]/95 border border-[#D4AF37] shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 backdrop-blur-3xl animate-in slide-in-from-bottom-5 text-[#FAF8F5]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] text-[#041810] flex items-center justify-center font-bold shrink-0 shadow">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {selectedDishes.length} Custom {selectedDishes.length === 1 ? 'Dish' : 'Dishes'} Selected
              </p>
              <p className="text-[11px] text-[#CBD5E1] truncate max-w-md">
                {selectedDishes.map((d) => d.name).join(', ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearSelection}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear dish selection"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <Link
              to="/booking"
              className="px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md flex items-center gap-1.5 whitespace-nowrap hover:scale-105 transition-transform"
            >
              <span>Continue to Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

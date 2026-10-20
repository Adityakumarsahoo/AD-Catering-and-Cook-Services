import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { TiltCard } from '../components/TiltCard.js';
import { AnimatedCounter } from '../components/AnimatedCounter.js';
import { BanquetCalculator } from '../components/BanquetCalculator.js';
import {
  CheckCircle2,
  Sparkles,
  Award,
  Crown,
  Calendar,
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  Flame,
  X,
  Eye,
  FileText,
  Wine,
  Coffee,
} from 'lucide-react';
import { defaultPackages } from '../data/defaultData.js';

// ====================================================
// AUTHENTIC ROYAL WEDDING BANQUET MENU (IMAGE 2)
// Exactly 36 items across 9 royal banquet counters
// ====================================================
export interface RoyalMenuCategory {
  id: string;
  category: string;
  group: 'all' | 'drinks' | 'starters' | 'plate' | 'mains' | 'sweets';
  icon: string;
  image: string;
  items: string[];
}

export const ROYAL_WEDDING_MENU_CATEGORIES: RoyalMenuCategory[] = [
  {
    id: 'drinks',
    category: 'WELCOME DRINKS',
    group: 'drinks',
    icon: '🍸',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
    items: ['Fire Mocktail', 'Smoky Mocktail', 'Masala Drinks'],
  },
  {
    id: 'soups',
    category: 'SOUP COUNTER',
    group: 'drinks',
    icon: '🍲',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80',
    items: ['Veg Manchow Soup', 'Chicken H/S Soup'],
  },
  {
    id: 'starter_veg',
    category: 'STARTER (VEG)',
    group: 'starters',
    icon: '🍢',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
    items: [
      'Papudi Chaat / Aloo Tiki Chaat',
      'Panipuri Counter',
      'Paneer Crispy',
      'Spring Roll',
      'Corn Chaat',
    ],
  },
  {
    id: 'starter_nonveg',
    category: 'STARTER (NON-VEG)',
    group: 'starters',
    icon: '🍗',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
    items: ['Chicken (Tikka / Lolipop)', 'Fish Finger', 'Scotch Egg'],
  },
  {
    id: 'plate_counter',
    category: 'PLATE COUNTER',
    group: 'plate',
    icon: '🥗',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
    items: ['Green Salad', 'Spout Salad', 'Rusian Salad', 'Papad', 'Dahibara', 'Pickles'],
  },
  {
    id: 'main_veg',
    category: 'MAIN COURSE (VEG)',
    group: 'mains',
    icon: '🍛',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80',
    items: [
      'Rice (Veriety)',
      'Rumali Roti',
      'Chakuli / Biri Kachudi',
      'Dal Butter Fry',
      'Khatta',
      'Paneer (Masala/Hydrabadi)',
      'Mix Veg (Navaratna/Punjabi)',
      'Mushroom (Dopiaza/Chilli)',
    ],
  },
  {
    id: 'main_nonveg',
    category: 'MAIN COURSE (NON-VEG)',
    group: 'mains',
    icon: '🍖',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    items: ['Mutton Rogan Juice', 'Fish Masala', 'Chicken Hyderabadi'],
  },
  {
    id: 'sweet_desert',
    category: 'SWEET DESERT',
    group: 'sweets',
    icon: '🍨',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80',
    items: ['Chhena Payes', 'Hot Jalebi', 'Ice Cream', 'Gulab Jamun'],
  },
  {
    id: 'special_counters',
    category: 'SPECIAL INCLUSIONS',
    group: 'sweets',
    icon: '🍃',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=80',
    items: ['Water Bottle (Packaged Mineral Water)', 'Paan Counter (Banarasi Meetha Paan)'],
  },
];

export const Packages: React.FC = () => {
  const [packages, setPackages] = useState<any[]>(defaultPackages);
  const [, setLoading] = useState(false);

  // Modal and category filter states for the Royal Wedding Banquet card
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'card' | 'poster'>('card');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'drinks' | 'starters' | 'plate' | 'mains' | 'sweets'>('all');
  const [premiumViewMode, setPremiumViewMode] = useState<'menu' | 'summary'>('menu');

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await api.getPackages().catch(() => null);
        if (res) {
          const items = Array.isArray(res) ? res : (res.packages || res.data);
          if (Array.isArray(items) && items.length > 0) {
            setPackages(items);
          }
        }
      } catch (err) {
        console.warn('Live packages sync notice:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  // Filtered categories for the Premium card's in-place display
  const displayedCategories =
    categoryFilter === 'all'
      ? ROYAL_WEDDING_MENU_CATEGORIES
      : ROYAL_WEDDING_MENU_CATEGORIES.filter((cat) => cat.group === categoryFilter);

  // Guarantee the exact required package order & single source of truth fallback
  const basicPkg = packages.find((p) => p.name.includes('BASIC')) || {
    id: 'pkg_1',
    name: 'BASIC',
    pricePerPerson: 850,
    description: 'Clean, elegant frosted spread ideal for family gatherings, traditional pujas, and intimate celebrations.',
    startersCount: 2,
    mainCourseCount: 4,
    dessertCount: 1,
    drinksCount: 1,
    staffIncluded: true,
    decorationOption: false,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    features: [
      '1 Welcome Cooler (Fresh Lime / Jaljeera)',
      '2 Starters (Veg Crispy / Corn Seekh)',
      '1 Paneer / Seasonal Veg Specialty',
      '1 Dal Tadka / Authentic Dalma',
      'Steamed Basmati Rice + Phulka / Roti',
      '1 Traditional Sweet (Gulab Jamun)',
      'Salad, Papad & House Pickles',
      'Uniformed Service Crew & Chafing Warmer',
    ],
    popular: false,
  };

  const premiumPkg = packages.find((p) => p.name.includes('PREMIUM')) || {
    id: 'pkg_3',
    name: 'PREMIUM',
    pricePerPerson: 950,
    description: 'Our flagship 36-item royal wedding feast featuring live counters, mocktails, soups, starters, rich gravies, desserts, and Banarasi paan.',
    startersCount: 8,
    mainCourseCount: 11,
    dessertCount: 4,
    drinksCount: 5,
    staffIncluded: true,
    decorationOption: true,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    features: [
      'Welcome Drinks: Fire Mocktail, Smoky Mocktail, Masala Drinks',
      'Soup Counter: Veg Manchow Soup, Chicken H/S Soup',
      'Starter Veg: Papudi/Aloo Tiki Chaat, Panipuri Counter, Paneer Crispy, Spring Roll, Corn Chaat',
      'Starter Non-Veg: Chicken (Tikka/Lolipop), Fish Finger, Scotch Egg',
      'Plate Counter: Green Salad, Spout Salad, Rusian Salad, Papad, Dahibara, Pickles',
      'Main Course Veg: Rice (Veriety), Rumali Roti, Chakuli/Biri Kachudi, Dal Butter Fry, Khatta, Paneer, Mix Veg, Mushroom',
      'Main Course Non-Veg: Mutton Rogan Juice, Fish Masala, Chicken Hyderabadi',
      'Sweet Desert: Chhena Payes, Hot Jalebi, Ice Cream, Gulab Jamun',
      'Special Inclusions: Water Bottle Service & Banarasi Paan Counter',
    ],
    popular: true,
  };

  const deluxePkg = packages.find((p) => p.name.includes('DELUXE')) || {
    id: 'pkg_deluxe',
    name: 'DELUXE',
    pricePerPerson: 1050,
    description: 'The pinnacle of winter ice-glass banquet hospitality with master live counters, VIP buffet styling, and grand multi-course delicacies.',
    startersCount: 6,
    mainCourseCount: 12,
    dessertCount: 4,
    drinksCount: 3,
    staffIncluded: true,
    decorationOption: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    features: [
      '6 Live Counters (Chaat, Live BBQ & Seafood)',
      'Royal Odia Mutton Kasa, Prawn Malai Curry, Fish Fry',
      'Hyderabadi Dum Biryani & Fragrant Pulao',
      'Shahi Paneer, Dal Bukhara & Special Breads',
      'Assorted Breads from Live Tandoor',
      '4 Grand Artisanal Sweets (Chhena Poda, Rasmalai, Malpua)',
      'VIP Table Decor & Uniformed Executive Captains',
      'Complimentary Welcome Ice Mocktail Bar',
    ],
    popular: false,
  };

  const corePackages = [
    {
      ...basicPkg,
      cleanName: 'BASIC',
      badge: 'Essential Banquet',
      cardStyle: 'glass-medium border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)]',
      image: basicPkg.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      btnStyle: 'gold-gradient-btn',
    },
    {
      ...premiumPkg,
      cleanName: 'PREMIUM',
      badge: 'MOST POPULAR',
      subBadge: 'ROYAL WEDDING FEAST',
      cardStyle: 'glass-strong border-2 border-[#D4AF37] shadow-[0_25px_65px_rgba(0,0,0,0.6)] ring-2 ring-[#F5CE68]/40',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      btnStyle: 'gold-gradient-btn',
    },
    {
      ...deluxePkg,
      cleanName: 'DELUXE',
      badge: 'VIP LUXURY',
      cardStyle: 'glass-strong border-2 border-[#FFDF73] shadow-[0_30px_75px_rgba(0,0,0,0.7)] animate-luxury-border',
      image: deluxePkg.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      btnStyle: 'gold-gradient-btn',
    },
  ];

  return (
    <div className="pt-32 pb-28 relative z-10 min-h-screen text-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ====================================================
            HEADER: ROYAL EMERALD & GOLD BANQUET COLLECTION
            ==================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow-sm">
            <Award className="w-4 h-4 text-[#F5CE68]" />
            <span>Royal Emerald Banquet Collection</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Curated Catering Packages
          </h1>

          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
            Transparent per-guest catering rates with complete live counters, uniform service stewards, warming chafing buffet setup, and authentic freshly prepared delicacies.
          </p>
        </div>

        {/* ====================================================
            RESPONSIVE 3-CARD GRID: BASIC (₹850), PREMIUM (₹950), DELUXE (₹1050)
            Desktop: 3 side-by-side | Mobile: Stacked vertically
            ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {corePackages.map((pkg, idx) => {
            const isPremium = pkg.cleanName === 'PREMIUM';

            return (
              <TiltCard key={pkg.id || idx} maxTilt={isPremium ? 3 : 2}>
                <div
                  className={`relative rounded-[36px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 liquid-shine h-full ${pkg.cardStyle}`}
                >
                  {/* Popular / VIP Badge */}
                  {isPremium ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 z-20">
                      <Crown className="w-3.5 h-3.5 fill-[#041810]" />
                      <span>MOST POPULAR • WEDDING FEAST</span>
                    </div>
                  ) : pkg.cleanName === 'DELUXE' ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-950 to-[#041810] text-[#FFDF73] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 z-20 border border-[#D4AF37]">
                      <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                      <span>VIP LUXURY</span>
                    </div>
                  ) : null}

                  <div>
                    {/* Warm Appetizing Food Photography Header */}
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-5 border border-[#D4AF37]/40 shadow-sm group">
                      <img
                        src={pkg.image}
                        alt={`${pkg.cleanName} Package Catering spread`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/85 via-transparent to-transparent" />
                      
                      {/* Floating Counter Badge on the Image */}
                      {isPremium ? (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-bold text-[#F5CE68] px-3 py-1 rounded-full bg-[#041810]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-md">
                          <span className="flex items-center gap-1.5 text-[11px]">
                            <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>36 Delicacies • 9 Full Counters</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsMenuModalOpen(true);
                            }}
                            className="text-[10px] uppercase font-black tracking-wider text-white hover:text-[#F5CE68] underline underline-offset-2 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Poster View</span>
                          </button>
                        </div>
                      ) : (
                        <span className="absolute bottom-3 left-3 text-xs font-bold text-[#F5CE68] px-3 py-1 rounded-full bg-[#041810]/85 backdrop-blur-md border border-[#D4AF37]/40">
                          {pkg.startersCount} Starters • {pkg.mainCourseCount} Mains
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                        {pkg.cleanName}
                      </h3>
                      {isPremium && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 border border-[#D4AF37] text-[#F5CE68]">
                          Wedding Special
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#CBD5E1] mt-2 min-h-[38px] leading-relaxed">
                      {isPremium
                        ? 'Our signature 36-item royal wedding feast. Complete multi-course banquet with mocktails, soups, starters, plate counter, rich gravies, desserts, and Banarasi paan.'
                        : pkg.description}
                    </p>

                    {/* Price Container with Viewport Entry Animation */}
                    <div className="my-5 pb-4 border-b border-[#D4AF37]/25 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#F5CE68]">
                          <AnimatedCounter
                            end={pkg.pricePerPerson}
                            prefix="₹"
                            triggerOnView={true}
                            duration={1200}
                            className="tabular-nums"
                          />
                        </span>
                        <span className="text-xs text-[#94A3B8] font-semibold">/ Person</span>
                      </div>

                      {isPremium && (
                        <button
                          type="button"
                          onClick={() => setIsMenuModalOpen(true)}
                          className="px-3 py-1 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-[#D4AF37]/60 text-[#F5CE68] text-[11px] font-bold flex items-center gap-1 shadow transition-all active:scale-95"
                          title="Open Royal Banquet Menu Card"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Menu Card</span>
                        </button>
                      )}
                    </div>

                    {/* ====================================================
                        IN THAT PLACE: ALL 36 ITEMS FOR THE PREMIUM PACKAGE
                        ==================================================== */}
                    {isPremium ? (
                      <div className="space-y-3.5 mb-7">
                        
                        {/* Toggle Mode: Menu Breakdown vs Summary Inclusions */}
                        <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-[#020F09] border border-[#D4AF37]/35 text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setPremiumViewMode('menu')}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all text-center ${
                              premiumViewMode === 'menu'
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm font-black'
                                : 'text-[#CBD5E1] hover:text-white'
                            }`}
                          >
                            All 36 Items (From Image 2)
                          </button>
                          <button
                            type="button"
                            onClick={() => setPremiumViewMode('summary')}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all text-center ${
                              premiumViewMode === 'summary'
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm font-black'
                                : 'text-[#CBD5E1] hover:text-white'
                            }`}
                          >
                            Service Highlights
                          </button>
                        </div>

                        {premiumViewMode === 'menu' ? (
                          <>
                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap gap-1 pb-1">
                              {[
                                { id: 'all', label: 'All 36' },
                                { id: 'drinks', label: 'Drinks & Soups (5)' },
                                { id: 'starters', label: 'Starters (8)' },
                                { id: 'plate', label: 'Plate (6)' },
                                { id: 'mains', label: 'Mains (11)' },
                                { id: 'sweets', label: 'Desserts & Extras (6)' },
                              ].map((tab) => (
                                <button
                                  key={tab.id}
                                  type="button"
                                  onClick={() => setCategoryFilter(tab.id as any)}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                                    categoryFilter === tab.id
                                      ? 'bg-[#F5CE68] text-[#041810]'
                                      : 'bg-[#041810]/90 text-[#CBD5E1] hover:text-[#F5CE68] border border-[#D4AF37]/30'
                                  }`}
                                >
                                  {tab.label}
                                </button>
                              ))}
                            </div>

                            {/* Categorized Dishes Container with Custom Scroll */}
                            <div className="max-h-[340px] overflow-y-auto pr-1.5 space-y-3 rounded-2xl bg-[#020F09]/75 border border-[#D4AF37]/30 p-3 shadow-inner">
                              {displayedCategories.map((sec) => (
                                <div key={sec.id} className="space-y-1.5 pb-2 border-b border-[#D4AF37]/20 last:border-b-0 last:pb-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs">{sec.icon}</span>
                                    <h4 className="text-[11px] font-black text-[#F5CE68] uppercase tracking-wider">
                                      {sec.category}
                                    </h4>
                                    <span className="text-[10px] text-[#94A3B8] font-bold">({sec.items.length})</span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-0.5">
                                    {sec.items.map((item, itemIdx) => (
                                      <div
                                        key={itemIdx}
                                        className="flex items-center gap-1.5 text-[11px] text-[#FAF8F5] bg-[#06291C]/70 px-2 py-1 rounded-lg border border-[#D4AF37]/25 hover:border-[#F5CE68] transition-colors"
                                      >
                                        <CheckCircle2 className="w-3 h-3 text-[#F5CE68] shrink-0" />
                                        <span className="truncate">{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Quick Callout to Full Ornate View */}
                            <div className="flex items-center justify-between text-[11px] pt-1 text-[#CBD5E1]">
                              <span className="flex items-center gap-1 text-[#F5CE68]">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>100% Guaranteed Fresh On-Site Preparation</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsMenuModalOpen(true)}
                                className="text-white hover:text-[#F5CE68] font-bold underline underline-offset-2 shrink-0 ml-2"
                              >
                                View Poster
                              </button>
                            </div>
                          </>
                        ) : (
                          /* Summary & Hospitality Inclusions View */
                          <div className="space-y-2.5 text-xs text-[#CBD5E1]">
                            <ul className="space-y-2 text-xs">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span><strong>3 Welcome Drinks:</strong> Fire Mocktail, Smoky Mocktail, Masala Drinks</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span><strong>2 Soup Counters:</strong> Veg Manchow & Chicken Hot/Sour Soup</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span><strong>8 Starters (Veg & Non-Veg):</strong> Panipuri, Chicken Tikka/Lollipop, Paneer Crispy, Fish Finger</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span><strong>6 Plate Counter Delights:</strong> Dahibara, Russian & Sprout Salads, Papad, Pickles</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span><strong>11 Main Course Specialties:</strong> Mutton Rogan Josh, Dal Butter Fry, Rumali Roti, Khatta, Chakuli</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span><strong>4 Royal Sweets:</strong> Chhena Payes, Live Hot Jalebi, Ice Cream, Gulab Jamun</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span><strong>Complimentary:</strong> Packaged Mineral Water Bottles & Royal Paan Counter</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span><strong>Banquet Hospitality:</strong> Gold Chafing Warmers, Ceramic Crockery & Uniformed Crew</span>
                              </li>
                            </ul>
                          </div>
                        )}

                      </div>
                    ) : (
                      /* Basic & Deluxe Packages Standard Inclusions View */
                      <div className="space-y-3 mb-8">
                        <p className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Package Inclusions:</span>
                        </p>

                        <ul className="space-y-2.5 text-xs text-[#CBD5E1]">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                            <span>{pkg.startersCount} Starters & Appetizers</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                            <span>{pkg.mainCourseCount} Main Course Delicacies</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                            <span>{pkg.dessertCount} Royal Sweets & Desserts</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                            <span>{pkg.drinksCount} Welcome Coolers</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                            <span>Uniformed Service Crew Included</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                            <span>Commercial Warming Chafing Buffet Setup</span>
                          </li>
                        </ul>

                        {pkg.features && pkg.features.length > 0 && (
                          <div className="pt-3 border-t border-[#D4AF37]/20 space-y-1.5">
                            <p className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-wider">
                              Signature Highlights:
                            </p>
                            {pkg.features.slice(0, 3).map((f: string, fIdx: number) => (
                              <p key={fIdx} className="text-[11px] text-[#CBD5E1] truncate">
                                • {f}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Primary CTA Button */}
                  <div className="space-y-2 mt-auto pt-2">
                    <Link
                      to={`/booking?package=${encodeURIComponent(pkg.name)}`}
                      className={`w-full py-3.5 sm:py-4 rounded-2xl text-xs font-black text-center block transition-all shadow-md active:scale-95 ${pkg.btnStyle}`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Choose {pkg.cleanName} (₹{pkg.pricePerPerson})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>

                    {isPremium && (
                      <button
                        type="button"
                        onClick={() => setIsMenuModalOpen(true)}
                        className="w-full py-2.5 rounded-xl bg-[#041810]/80 hover:bg-[#06291C] border border-[#D4AF37]/45 text-[11px] font-bold text-[#F5CE68] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#F5CE68]" />
                        <span>View Royal Wedding Menu Card (Image 2)</span>
                      </button>
                    )}
                  </div>

                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* ====================================================
            INTERACTIVE LIVE BANQUET BUDGET CALCULATOR
            ==================================================== */}
        <div className="mt-16">
          <BanquetCalculator />
        </div>

        {/* ====================================================
            CUSTOM CONSULTATION BANNER
            ==================================================== */}
        <div className="mt-16 p-8 rounded-[36px] glass-strong border border-[#D4AF37]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-white text-lg sm:text-xl">
              Planning a Grand Wedding or Gala for 300+ Guests?
            </h4>
            <p className="text-xs sm:text-sm text-[#CBD5E1]">
              We provide tailored banquet proposals with live Tandoor stations, authentic Odia sweet halwais, and customized multi-course menus based on the 36-item royal wedding feast.
            </p>
          </div>
          <Link
            to="/booking"
            className="px-7 py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] whitespace-nowrap shadow-md active:scale-95 transition-transform"
          >
            Book Custom Event Consultation
          </Link>
        </div>

      </div>

      {/* ====================================================
          ROYAL WEDDING BANQUET MENU CARD MODAL (IMAGE 2 VIEW)
          Replicating Image 2's ornate maroon & gold banquet poster
          ==================================================== */}
      {isMenuModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
        >
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-gradient-to-br from-[#2c050e] via-[#3a0815] to-[#1f0208] border-2 sm:border-4 border-[#D4AF37] shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-4 sm:p-8 text-[#FAF8F5]">
            
            {/* Top Close Button & View Switcher */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D4AF37]/40">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#F5CE68]" />
                <span className="font-display font-black text-sm sm:text-base text-white tracking-wide">
                  Royal Wedding Banquet Menu (₹950 / Person)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-xl p-1 bg-[#041810] border border-[#D4AF37]/50 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('card')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'card'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Royal Ornate Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('poster')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'poster'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Original Card Image
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="p-2 rounded-full bg-[#041810] hover:bg-rose-950 text-white border border-[#D4AF37]/50 transition-colors shadow"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TAB 1: ROYAL ORNATE MENU CARD (MATCHING IMAGE 2 EXACTLY) */}
            {activeModalTab === 'card' ? (
              <div className="space-y-6">
                
                {/* Ornate Header with Traditional Odia Motifs */}
                <div className="text-center space-y-1 pb-4 border-b-2 border-dashed border-[#D4AF37]/40">
                  <p className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-[#F5CE68]">
                    AD Catering & Master Cook Services
                  </p>
                  <h2 className="font-display text-2xl sm:text-4xl font-black text-amber-200 tracking-tight">
                    Royal Wedding Feast Menu
                  </h2>
                  <p className="text-xs text-[#E2E8F0] font-normal">
                    Complete 36 Delicacies • All Live Counters • Mineral Water Bottles • Banarasi Paan Counter
                  </p>
                </div>

                {/* TWO-COLUMN BANQUET SPREAD MATCHING IMAGE 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                  
                  {/* LEFT COLUMN: Welcome Drinks, Soups, Starters, Plate Counter */}
                  <div className="space-y-5">
                    
                    {/* 1. WELCOME DRINKS */}
                    <div className="rounded-2xl p-4 bg-[#1f030a]/80 border border-[#D4AF37]/60 shadow">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                          WELCOME DRINKS
                        </span>
                        <Wine className="w-4 h-4 text-[#F5CE68]" />
                      </div>
                      <ul className="space-y-1 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Fire Mocktail</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Smoky Mocktail</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Masala Drinks</span>
                        </li>
                      </ul>
                    </div>

                    {/* 2. SOUP COUNTER */}
                    <div className="rounded-2xl p-4 bg-[#1f030a]/80 border border-[#D4AF37]/60 shadow">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                          SOUP COUNTER
                        </span>
                        <Coffee className="w-4 h-4 text-[#F5CE68]" />
                      </div>
                      <ul className="space-y-1 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Veg Manchow Soup</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Chicken H/S Soup (Hot & Sour)</span>
                        </li>
                      </ul>
                    </div>

                    {/* 3. STARTER (VEG) */}
                    <div className="rounded-2xl p-4 bg-[#1f030a]/80 border border-[#D4AF37]/60 shadow">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                          STARTER (VEG)
                        </span>
                        <UtensilsCrossed className="w-4 h-4 text-[#F5CE68]" />
                      </div>
                      <ul className="space-y-1 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Papudi Chaat / Aloo Tiki Chaat</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Panipuri Counter (Live Stall)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Paneer Crispy</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Spring Roll</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Corn Chaat</span>
                        </li>
                      </ul>
                    </div>

                    {/* 4. STARTER (NON-VEG) */}
                    <div className="rounded-2xl p-4 bg-[#1f030a]/80 border border-[#D4AF37]/60 shadow">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                          STARTER (NON-VEG)
                        </span>
                        <Flame className="w-4 h-4 text-amber-400" />
                      </div>
                      <ul className="space-y-1 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Chicken (Tikka / Lolipop)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Fish Finger</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Scotch Egg</span>
                        </li>
                      </ul>
                    </div>

                    {/* 5. PLATE COUNTER */}
                    <div className="rounded-2xl p-4 bg-[#1f030a]/80 border border-[#D4AF37]/60 shadow">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                          PLATE COUNTER
                        </span>
                        <Sparkles className="w-4 h-4 text-[#F5CE68]" />
                      </div>
                      <ul className="space-y-1 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Green Salad</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Spout Salad</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Rusian Salad</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Papad</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Dahibara</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Pickles</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: Veg Mains, Non-Veg Mains, Sweet Desserts, Water & Paan */}
                  <div className="space-y-5">
                    
                    {/* 6. MAIN COURSE (VEG) */}
                    <div className="rounded-2xl p-4 bg-[#1f030a]/80 border border-[#D4AF37]/60 shadow">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                          MAIN COURSE (VEG)
                        </span>
                        <UtensilsCrossed className="w-4 h-4 text-[#F5CE68]" />
                      </div>
                      <ul className="space-y-1 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Rice (Veriety)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Rumali Roti</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Chakuli / Biri Kachudi</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Dal Butter Fry</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Khatta</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Paneer (Masala / Hydrabadi)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Mix Veg (Navaratna / Punjabi)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Mushroom (Dopiaza / Chilli)</span>
                        </li>
                      </ul>
                    </div>

                    {/* 7. MAIN COURSE (NON-VEG) */}
                    <div className="rounded-2xl p-4 bg-[#1f030a]/80 border border-[#D4AF37]/60 shadow">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                          MAIN COURSE (NON-VEG)
                        </span>
                        <Crown className="w-4 h-4 text-[#F5CE68]" />
                      </div>
                      <ul className="space-y-1 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Mutton Rogan Juice (Josh)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Fish Masala</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Chicken Hyderabadi</span>
                        </li>
                      </ul>
                    </div>

                    {/* 8. SWEET DESERT */}
                    <div className="rounded-2xl p-4 bg-[#1f030a]/80 border border-[#D4AF37]/60 shadow">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                          SWEET DESERT
                        </span>
                        <Sparkles className="w-4 h-4 text-[#F5CE68]" />
                      </div>
                      <ul className="space-y-1 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Chhena Payes (Royal Odia Cottage Cheese Pudding)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Hot Jalebi (Crispy Live Counter)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Ice Cream</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Gulab Jamun</span>
                        </li>
                      </ul>
                    </div>

                    {/* 9. SPECIAL BANQUET COUNTERS */}
                    <div className="rounded-2xl p-4 bg-gradient-to-r from-[#24040b] to-[#170207] border-2 border-[#D4AF37] shadow">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#F5CE68] mb-2">
                        SPECIAL EXCLUSIVE STATIONS
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-2.5 rounded-xl bg-[#041810]/80 border border-[#D4AF37]/40">
                          <p className="font-display font-black text-sm text-white">WATER BOTTLE</p>
                          <p className="text-[10px] text-[#CBD5E1] mt-0.5">Sealed Mineral Water</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#041810]/80 border border-[#D4AF37]/40">
                          <p className="font-display font-black text-sm text-[#F5CE68]">PAAN COUNTER</p>
                          <p className="text-[10px] text-[#CBD5E1] mt-0.5">Banarasi & Sweet Paan</p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Footer Action inside Modal */}
                <div className="pt-4 border-t border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left text-xs text-[#CBD5E1]">
                    <span className="text-white font-bold">Total: 36 Delicacies</span> • Uniformed Staff & Live Chafers Included
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsMenuModalOpen(false)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#041810] hover:bg-black text-[#CBD5E1] border border-[#D4AF37]/40 text-xs font-bold"
                    >
                      Close
                    </button>
                    <Link
                      to={`/booking?package=${encodeURIComponent('PREMIUM PACKAGE')}`}
                      onClick={() => setIsMenuModalOpen(false)}
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book This Royal Feast (₹950/Person)</span>
                    </Link>
                  </div>
                </div>

              </div>
            ) : (
              /* TAB 2: ORIGINAL CARD POSTER VIEW (IMAGE 2 FILE) */
              <div className="space-y-4 text-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] max-h-[70vh] flex items-center justify-center bg-black/60 p-2">
                  <img
                    src="/images/royal-wedding-menu-card.jpg"
                    alt="Royal Wedding Feast Original Menu Card"
                    className="max-h-[66vh] w-auto object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-[#CBD5E1]">
                    Authentic Royal Wedding Banquet Menu Sheet • High-Resolution Poster
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="/images/royal-wedding-menu-card.jpg"
                      download="Royal-Wedding-Banquet-Menu.jpg"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#041810] hover:bg-black text-white text-xs font-bold border border-[#D4AF37]/50"
                    >
                      Download Image
                    </a>
                    <Link
                      to={`/booking?package=${encodeURIComponent('PREMIUM PACKAGE')}`}
                      onClick={() => setIsMenuModalOpen(false)}
                      className="px-6 py-2 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs shadow-md"
                    >
                      Book PREMIUM Package (₹950)
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

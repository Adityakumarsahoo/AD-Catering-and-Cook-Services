import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { TiltCard } from '../components/TiltCard.js';
import { AnimatedCounter } from '../components/AnimatedCounter.js';
import { BanquetCalculator } from '../components/BanquetCalculator.js';
import { MinimumGuestsNotice } from '../components/MinimumGuestsNotice.js';
import { BUSINESS_CONFIG } from '../config/cateringConfig.js';
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
  Users,
  PhoneCall,
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
    image: '/images/DISHE/Mocktail.png',
    items: ['Fire Mocktail', 'Smoky Mocktail', 'Masala Drinks'],
  },
  {
    id: 'soups',
    category: 'SOUP COUNTER',
    group: 'drinks',
    icon: '🍲',
    image: '/images/DISHE/H  S Soup (Veg. & Non Veg.).png',
    items: ['Veg Manchow Soup', 'Chicken H/S Soup'],
  },
  {
    id: 'starter_veg',
    category: 'STARTER (VEG)',
    group: 'starters',
    icon: '🍢',
    image: '/images/DISHE/PaniPuri.png',
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
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    items: ['Chicken (Tikka / Lolipop)', 'Fish Finger', 'Scotch Egg'],
  },
  {
    id: 'plate_counter',
    category: 'PLATE COUNTER',
    group: 'plate',
    icon: '🥗',
    image: '/images/DISHE/Dahiwada Aloudum.png',
    items: ['Green Salad', 'Spout Salad', 'Rusian Salad', 'Papad', 'Dahibara', 'Pickles'],
  },
  {
    id: 'main_veg',
    category: 'MAIN COURSE (VEG)',
    group: 'mains',
    icon: '🍛',
    image: '/images/DISHE/Paneer Butter Masala.png',
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
    image: '/images/DISHE/MUTTON CURRY.png',
    items: ['Mutton Rogan Juice', 'Fish Masala', 'Chicken Hyderabadi'],
  },
  {
    id: 'sweet_desert',
    category: 'SWEET DESERT',
    group: 'sweets',
    icon: '🍨',
    image: '/images/DISHE/Chenna Podo.png',
    items: ['Chhena Payes', 'Hot Jalebi', 'Ice Cream', 'Gulab Jamun'],
  },
  {
    id: 'special_counters',
    category: 'SPECIAL INCLUSIONS',
    group: 'sweets',
    icon: '🍃',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Meetha_Paan.jpg/960px-Meetha_Paan.jpg',
    items: ['Water Bottle (Packaged Mineral Water)', 'Paan Counter (Banarasi Meetha Paan)'],
  },
];

// ====================================================
// AUTHENTIC NORMAL MENU (IMAGE 2)
// Exactly 29 items across 9 banquet counters for BASIC (₹850)
// ====================================================
export const NORMAL_MENU_CATEGORIES: RoyalMenuCategory[] = [
  {
    id: 'drinks',
    category: 'WELCOME DRINKS',
    group: 'drinks',
    icon: '🥛',
    image: '/images/DISHE/Hot Badam Milk.png',
    items: ['Dahi Chhanch / Kesar Milk'],
  },
  {
    id: 'soups',
    category: 'SOUP COUNTER',
    group: 'drinks',
    icon: '🍲',
    image: '/images/DISHE/L  C Soup (Veg. & Non Veg.).png',
    items: ['Lemon Coriender Soup', 'Chicken H/S Soup'],
  },
  {
    id: 'starter_veg',
    category: 'STARTER (VEG)',
    group: 'starters',
    icon: '🍢',
    image: '/images/DISHE/Papdi Chaat.png',
    items: [
      'Papudi Chaat / Aloo Tiki Chaat',
      'Panipuri Counter',
      'Paneer Crispy',
      'Veg Cutlet',
      'Corn Chaat',
    ],
  },
  {
    id: 'starter_nonveg',
    category: 'STARTER (NON-VEG)',
    group: 'starters',
    icon: '🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    items: ['Chicken Pakoda', 'Egg Chop'],
  },
  {
    id: 'plate_counter',
    category: 'PLATE COUNTER',
    group: 'plate',
    icon: '🥗',
    image: '/images/DISHE/Dahiwada Aloudum.png',
    items: ['Green Salad', 'Papad', 'Dahibara', 'Pickles'],
  },
  {
    id: 'main_veg',
    category: 'MAIN COURSE (VEG)',
    group: 'mains',
    icon: '🍛',
    image: '/images/DISHE/DALEMA.png',
    items: [
      'Rice (Veriety)',
      'Rumali Roti / Chakuli',
      'Dal Fry',
      'Khatta',
      'Paneer (Masala/Hydrabadi)',
      'Mix Veg (Navaratna/Punjabi)',
      'Mushroom Besar',
    ],
  },
  {
    id: 'main_nonveg',
    category: 'MAIN COURSE (NON-VEG)',
    group: 'mains',
    icon: '🍖',
    image: '/images/DISHE/CHICKEN BIRIYANI.png',
    items: ['Mutton Rogan Juice', 'Fish Fry', 'Chicken Hyderabadi'],
  },
  {
    id: 'sweet_desert',
    category: 'SWEET DESERT',
    group: 'sweets',
    icon: '🍨',
    image: '/images/DISHE/Chenna Podo.png',
    items: ['Chhena Payes', 'Hot Jalebi', 'Ice Cream', 'Rasogola'],
  },
  {
    id: 'special_counters',
    category: 'SPECIAL INCLUSIONS',
    group: 'sweets',
    icon: '🍃',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
    items: ['Water Bottle (Packaged Mineral Water)', 'Paan Counter (Banarasi Meetha Paan)'],
  },
];

// ====================================================
// AUTHENTIC DELUX MENU (IMAGE 2)
// Exactly 44 items across 9 banquet counters for DELUXE (₹1,050)
// ====================================================
export const DELUX_MENU_CATEGORIES: RoyalMenuCategory[] = [
  {
    id: 'drinks',
    category: 'WELCOME DRINKS',
    group: 'drinks',
    icon: '🍸',
    image: '/images/DISHE/Fruit Punch.png',
    items: ['Fire Mocktail', 'Smoky Mocktail', 'Masala Drinks', 'Badam Kesar Milk'],
  },
  {
    id: 'soups',
    category: 'SOUP COUNTER',
    group: 'drinks',
    icon: '🍲',
    image: '/images/DISHE/S  C Soup (Veg. & Non Veg.).png',
    items: ['Veg Sweet Corn Soup', 'Chicken H/S Soup'],
  },
  {
    id: 'starter_veg',
    category: 'STARTER (VEG)',
    group: 'starters',
    icon: '🍢',
    image: '/images/DISHE/Pao Bhaji.png',
    items: [
      'Papudi Chaat / Aloo Tiki Chaat',
      'Gupchup Counter',
      'Harabara Kabab / Dahi Kabab',
      'American Corn Crispy',
      'Paneer Tikka',
      'Mushroom salt & Pepper',
      'Chowmein',
    ],
  },
  {
    id: 'starter_nonveg',
    category: 'STARTER (NON-VEG)',
    group: 'starters',
    icon: '🍗',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    items: ['Garlic Prawn', 'Fish Patrapoda', 'Chicken Kabab (Malai, Reshmi, Hariyali)', 'Egg Devil'],
  },
  {
    id: 'plate_counter',
    category: 'PLATE COUNTER',
    group: 'plate',
    icon: '🥗',
    image: '/images/DISHE/Dahi Papdi.png',
    items: ['Green Salad', 'Papad', 'Dahibara', 'Pickles', 'Nadia Pachedi', 'Dahi Rasgulla', 'Pasta Salad'],
  },
  {
    id: 'main_veg',
    category: 'MAIN COURSE (VEG)',
    group: 'mains',
    icon: '🍛',
    image: '/images/DISHE/Paneer Butter Masala.png',
    items: [
      'Rice (Variety)',
      'Rumali Roti',
      'Chakuli / Butter Naan',
      'Dal Makhani',
      'Pine Apple Jelly',
      'Paneer Pasinda / Tikka Masala',
      'Kadai Mushroom',
      'Navaratna Kurma',
      'Sijnal Veg',
    ],
  },
  {
    id: 'main_nonveg',
    category: 'MAIN COURSE (NON-VEG)',
    group: 'mains',
    icon: '🍖',
    image: '/images/DISHE/MUTTON CURRY.png',
    items: ['Mutton Rogan Josh', 'Dahi Fish', 'Garlic Chicken', 'Malai Prawn'],
  },
  {
    id: 'sweet_desert',
    category: 'SWEET DESSERT',
    group: 'sweets',
    icon: '🍨',
    image: '/images/DISHE/Chenna Podo.png',
    items: ['Kheer Sagar', 'Ice Cream', 'Baked Rasgula', 'Gajar Halwa'],
  },
  {
    id: 'special_counters',
    category: 'SPECIAL COUNTERS',
    group: 'sweets',
    icon: '🍃',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Meetha_Paan.jpg/960px-Meetha_Paan.jpg',
    items: ['Water Bottle', 'Paan Counter', 'Fruit Design Cutting'],
  },
];

export interface BanquetPackagesSectionProps {
  showHeader?: boolean;
  showCalculator?: boolean;
  showConsultationBanner?: boolean;
  kicker?: string;
  title?: string;
  subtitle?: string;
}

export const BanquetPackagesSection: React.FC<BanquetPackagesSectionProps> = ({
  showHeader = false,
  showCalculator = false,
  showConsultationBanner = false,
  kicker = 'Royal Emerald Banquet Collection',
  title = 'Curated Catering Packages',
  subtitle = 'Transparent per-guest catering rates with complete live counters, uniform service stewards, warming chafing buffet setup, and authentic freshly prepared delicacies.',
}) => {
  const [packages, setPackages] = useState<any[]>(defaultPackages);
  const [, setLoading] = useState(false);

  // Modal states: 'normal' for Basic (Image 1), 'royal' for Premium (Image 2), 'deluxe' for Deluxe (Image 3)
  const [activeMenuModal, setActiveMenuModal] = useState<'normal' | 'royal' | 'deluxe' | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'card' | 'poster' | 'basic_card' | 'deluxe_card'>('poster');
  
  // Basic Package (Normal Menu) in-card view states
  const [basicCategoryFilter, setBasicCategoryFilter] = useState<'all' | 'drinks' | 'starters' | 'plate' | 'mains' | 'sweets'>('all');
  const [basicViewMode, setBasicViewMode] = useState<'menu' | 'inclusions'>('menu');

  // Deluxe Package (Delux Menu) in-card view states
  const [deluxeCategoryFilter, setDeluxeCategoryFilter] = useState<'all' | 'drinks' | 'starters' | 'plate' | 'mains' | 'sweets'>('all');
  const [deluxeViewMode, setDeluxeViewMode] = useState<'menu' | 'inclusions'>('menu');

  // Premium Package in-card view states
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

  // Filtered categories for the Basic card's in-place display
  const displayedBasicCategories =
    basicCategoryFilter === 'all'
      ? NORMAL_MENU_CATEGORIES
      : NORMAL_MENU_CATEGORIES.filter((cat) => cat.group === basicCategoryFilter);

  // Filtered categories for the Deluxe card's in-place display
  const displayedDeluxeCategories =
    deluxeCategoryFilter === 'all'
      ? DELUX_MENU_CATEGORIES
      : DELUX_MENU_CATEGORIES.filter((cat) => cat.group === deluxeCategoryFilter);

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
    description: 'Ideal for intimate family gatherings, birthday get-togethers, and budget-friendly traditional get-togethers.',
    startersCount: 2,
    mainCourseCount: 4,
    dessertCount: 1,
    drinksCount: 1,
    staffIncluded: true,
    decorationOption: false,
    image: '/images/packages/basic-package.jpg',
    cardBadge: '2 Starters • 4 Mains',
    packageInclusions: [
      '2 Starters & Appetizers',
      '4 Main Course Delicacies',
      '1 Royal Sweets & Desserts',
      '1 Welcome Coolers',
      'Uniformed Service Crew Included',
      'Commercial Warming Chafing Buffet Setup',
    ],
    signatureHighlights: [
      '1 Welcome Beverage (Aam Panna / Jaljeera)',
      '2 Starters (Veg Crispy / Pakora)',
      '1 Paneer / Veg Specialty',
    ],
    features: [
      'Welcome Drinks: Dahi Chhanch / Kesar Milk',
      'Soup Counter: Lemon Coriender Soup, Chicken H/S Soup',
      'Starter Veg: Papudi/Aloo Tiki Chaat, Panipuri Counter, Paneer Crispy, Veg Cutlet, Corn Chaat',
      'Starter Non-Veg: Chicken Pakoda, Egg Chop',
      'Plate Counter: Green Salad, Papad, Dahibara, Pickles',
      'Main Course Veg: Rice (Veriety), Rumali Roti/Chakuli, Dal Fry, Khatta, Paneer, Mix Veg, Mushroom Besar',
      'Main Course Non-Veg: Mutton Rogan Juice, Fish Fry, Chicken Hyderabadi',
      'Sweet Desert: Chhena Payes, Hot Jalebi, Ice Cream, Rasogola',
      'Special Inclusions: Water Bottle Service & Paan Counter',
      'Package Inclusions: 2 Starters, 4 Mains, 1 Sweet, 1 Drink, Crew & Chafing Buffet',
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
    image: '/images/packages/premium-package.jpg',
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
    menuItemsCount: 44,
    menuTitle: 'DELUX MENU',
    cardBadge: '6 Starters • 12 Mains',
    image: '/images/packages/deluxe-package.jpg',
    packageInclusions: [
      '6 Starters & Appetizers',
      '12 Main Course Delicacies',
      '4 Royal Sweets & Desserts',
      '3 Welcome Coolers',
      'Uniformed Service Crew Included',
      'Commercial Warming Chafing Buffet Setup',
    ],
    signatureHighlights: [
      '6 Live Counters (Chaat, Live BBQ & Seafood)',
      'Mutton Rogan Josh & Malai Prawn Delicacies',
      'Artisanal Desserts & Fruit Design Cutting',
    ],
    features: [
      'Welcome Drinks: Fire Mocktail, Smoky Mocktail, Masala Drinks, Badam Kesar Milk',
      'Soup Counter: Veg Sweet Corn Soup, Chicken H/S Soup',
      'Starter Veg: Papudi/Aloo Tiki Chaat, Gupchup Counter, Harabara/Dahi Kabab, American Corn Crispy, Paneer Tikka, Mushroom salt & Pepper, Chowmein',
      'Starter Non-Veg: Garlic Prawn, Fish Patrapoda, Chicken Kabab (Malai/Reshmi/Hariyali), Egg Devil',
      'Plate Counter: Green Salad, Papad, Dahibara, Pickles, Nadia Pachedi, Dahi Rasgulla, Pasta Salad',
      'Main Course Veg: Rice (Variety), Rumali Roti, Chakuli/Butter Naan, Dal Makhani, Pine Apple Jelly, Paneer Pasinda/Tikka Masala, Kadai Mushroom, Navaratna Kurma, Sijnal Veg',
      'Main Course Non-Veg: Mutton Rogan Josh, Dahi Fish, Garlic Chicken, Malai Prawn',
      'Sweet Dessert: Kheer Sagar, Ice Cream, Baked Rasgula, Gajar Halwa',
      'Special Inclusions: Water Bottle, Paan Counter, Fruit Design Cutting',
      'Package Inclusions: 6 Starters, 12 Mains, 4 Desserts, 3 Drinks, Crew & Chafing Buffet',
    ],
    popular: false,
  };

  const corePackages = [
    {
      ...basicPkg,
      cleanName: 'BASIC',
      badge: 'NORMAL MENU • ₹850',
      cardStyle: 'glass-medium border border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-[#D4AF37]/30',
      image: '/images/packages/basic-package.jpg',
      btnStyle: 'gold-gradient-btn',
    },
    {
      ...premiumPkg,
      cleanName: 'PREMIUM',
      badge: 'MOST POPULAR',
      subBadge: 'ROYAL WEDDING FEAST',
      cardStyle: 'glass-strong border-2 border-[#D4AF37] shadow-[0_25px_65px_rgba(0,0,0,0.6)] ring-2 ring-[#F5CE68]/40',
      image: '/images/packages/premium-package.jpg',
      btnStyle: 'gold-gradient-btn',
    },
    {
      ...deluxePkg,
      cleanName: 'DELUXE',
      badge: 'VIP LUXURY',
      subBadge: 'DELUX MENU • 44 DELICACIES',
      cardStyle: 'glass-strong border-2 border-[#FFDF73] shadow-[0_30px_75px_rgba(0,0,0,0.7)] animate-luxury-border',
      image: '/images/packages/deluxe-package.jpg',
      btnStyle: 'gold-gradient-btn',
    },
  ];

  return (
    <div className="relative text-[#FAF8F5]">
      <div className="w-full">
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow-sm">
              <Award className="w-4 h-4 text-[#F5CE68]" />
              <span>{kicker}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>
        )}

        {/* Standard Catering Policy: Minimum Booking 500 Guests */}
        <MinimumGuestsNotice variant="banner" className="mb-10" />

        {/* ====================================================
            RESPONSIVE 3-CARD GRID: BASIC (₹850), PREMIUM (₹950), DELUXE (₹1050)
            Desktop: 3 side-by-side | Mobile: Stacked vertically
            ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {corePackages.map((pkg, idx) => {
            const isBasic = pkg.cleanName === 'BASIC';
            const isPremium = pkg.cleanName === 'PREMIUM';
            const isDeluxe = pkg.cleanName === 'DELUXE';

            return (
              <TiltCard key={pkg.id || idx} maxTilt={isPremium ? 3 : 2}>
                <div
                  className={`relative rounded-[36px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 liquid-shine h-full ${pkg.cardStyle}`}
                >
                  {/* Popular / VIP / Normal Badge */}
                  {isBasic ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-950 via-[#041810] to-emerald-950 text-[#F5CE68] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 z-20 border border-[#D4AF37]/70">
                      <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                      <span>NORMAL MENU • 29 DELICACIES</span>
                    </div>
                  ) : isPremium ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 z-20">
                      <Crown className="w-3.5 h-3.5 fill-[#041810]" />
                      <span>MOST POPULAR • WEDDING FEAST</span>
                    </div>
                  ) : isDeluxe ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-950 to-[#041810] text-[#FFDF73] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 z-20 border border-[#D4AF37]">
                      <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                      <span>VIP LUXURY • 44 DELICACIES</span>
                    </div>
                  ) : null}

                  <div>
                    {/* Warm Appetizing Food Photography Header with click to view poster */}
                    <div
                      onClick={() => {
                        if (isBasic) {
                          setActiveMenuModal('normal');
                          setActiveModalTab('poster');
                        } else if (isPremium) {
                          setActiveMenuModal('royal');
                          setActiveModalTab('poster');
                        } else if (isDeluxe) {
                          setActiveMenuModal('deluxe');
                          setActiveModalTab('poster');
                        }
                      }}
                      className="relative h-48 rounded-2xl overflow-hidden mb-5 border border-[#D4AF37]/40 shadow-sm group cursor-pointer"
                      title="Click to view full package poster"
                    >
                      <img
                        src={pkg.image}
                        alt={`${pkg.cleanName} Package Catering poster`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = isBasic
                            ? '/images/packages/basic-package.jpg'
                            : isPremium
                            ? '/images/packages/premium-package.jpg'
                            : '/images/packages/deluxe-package.jpg';
                        }}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/90 via-black/20 to-transparent" />
                      
                      {/* Floating Counter Badge on the Image */}
                      {isBasic ? (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-bold text-[#F5CE68] px-3 py-1 rounded-full bg-[#041810]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-md">
                          <span className="flex items-center gap-1.5 text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span>16 Delicacies • Normal Menu</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveMenuModal('normal');
                              setActiveModalTab('poster');
                            }}
                            className="text-[10px] uppercase font-black tracking-wider text-white hover:text-[#F5CE68] underline underline-offset-2 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Poster View</span>
                          </button>
                        </div>
                      ) : isPremium ? (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-bold text-[#F5CE68] px-3 py-1 rounded-full bg-[#041810]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-md">
                          <span className="flex items-center gap-1.5 text-[11px]">
                            <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Royal Feast • 36 Delicacies</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveMenuModal('royal');
                              setActiveModalTab('poster');
                            }}
                            className="text-[10px] uppercase font-black tracking-wider text-white hover:text-[#F5CE68] underline underline-offset-2 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Poster View</span>
                          </button>
                        </div>
                      ) : isDeluxe ? (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-bold text-[#FFDF73] px-3 py-1 rounded-full bg-[#041810]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-md">
                          <span className="flex items-center gap-1.5 text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span>Taste & Tradition • 44 Delicacies</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveMenuModal('deluxe');
                              setActiveModalTab('poster');
                            }}
                            className="text-[10px] uppercase font-black tracking-wider text-white hover:text-[#FFDF73] underline underline-offset-2 flex items-center gap-1"
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
                      {isBasic ? (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#041810] border border-[#D4AF37] text-[#F5CE68]">
                          Normal Menu
                        </span>
                      ) : isPremium ? (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 border border-[#D4AF37] text-[#F5CE68]">
                          Wedding Special
                        </span>
                      ) : isDeluxe ? (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#041810] border border-[#D4AF37] text-[#FFDF73]">
                          Delux Menu
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs text-[#CBD5E1] mt-2 min-h-[38px] leading-relaxed">
                      {isBasic
                        ? 'Ideal for intimate family gatherings, birthday get-togethers, and budget-friendly traditional get-togethers. Complete 29 authentic delicacies.'
                        : isPremium
                        ? 'Our signature 36-item royal wedding feast. Complete multi-course banquet with mocktails, soups, starters, plate counter, rich gravies, desserts, and Banarasi paan.'
                        : isDeluxe
                        ? 'The pinnacle of winter ice-glass banquet hospitality with master live counters, VIP buffet styling, and grand multi-course delicacies.'
                        : pkg.description}
                    </p>

                    {/* Price Container with Viewport Entry Animation */}
                    <div className="my-5 pb-4 border-b border-[#D4AF37]/25 flex items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-1.5 whitespace-nowrap shrink-0">
                        <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-display font-black text-[#F5CE68] whitespace-nowrap">
                          <AnimatedCounter
                            end={pkg.pricePerPerson}
                            prefix="₹"
                            triggerOnView={true}
                            duration={1200}
                            className="tabular-nums whitespace-nowrap"
                          />
                        </span>
                        <span className="text-xs text-[#94A3B8] font-semibold whitespace-nowrap">/ Plate</span>
                      </div>

                      {isBasic && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuModal('normal');
                            setActiveModalTab('poster');
                          }}
                          className="px-3 py-1 rounded-xl bg-[#041810]/90 hover:bg-[#06291C] border border-[#D4AF37]/60 text-[#F5CE68] text-[11px] font-bold flex items-center gap-1 shadow transition-all active:scale-95"
                          title="Open Basic Package Poster (Image 1)"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Basic Poster</span>
                        </button>
                      )}

                      {isPremium && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuModal('royal');
                            setActiveModalTab('poster');
                          }}
                          className="px-3 py-1 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-[#D4AF37]/60 text-[#F5CE68] text-[11px] font-bold flex items-center gap-1 shadow transition-all active:scale-95"
                          title="Open Premium Package Poster (Image 2)"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Premium Poster</span>
                        </button>
                      )}

                      {isDeluxe && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuModal('deluxe');
                            setActiveModalTab('poster');
                          }}
                          className="px-3 py-1 rounded-xl bg-[#041810]/90 hover:bg-[#06291C] border border-[#FFDF73]/60 text-[#FFDF73] text-[11px] font-bold flex items-center gap-1 shadow transition-all active:scale-95"
                          title="Open Deluxe Package Poster (Image 3)"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Deluxe Poster</span>
                        </button>
                      )}
                    </div>

                    {/* Serving Details & Minimum Booking Requirement */}
                    <div className="mb-4 p-3 rounded-2xl bg-[#020F09]/90 border border-[#D4AF37]/35 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between text-[#F5CE68] font-bold">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>Minimum Booking: 500 Guests</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">Standard</span>
                      </div>
                      <div className="flex items-center justify-between text-[#CBD5E1]">
                        <span>Food Menu Included:</span>
                        <strong className="text-white font-bold">{isBasic ? '29 Delicacies' : isPremium ? '36 Delicacies' : '44 Delicacies'}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[#CBD5E1]">
                        <span>Serving Details:</span>
                        <span className="text-white">Buffet Handis & Uniformed Crew</span>
                      </div>
                    </div>

                    {/* ====================================================
                        BODY: BASIC PACKAGE (NORMAL MENU) vs PREMIUM vs DELUXE
                        ==================================================== */}
                    {isBasic ? (
                      <div className="space-y-3.5 mb-7">
                        {/* Toggle Mode: Menu Breakdown vs Summary Inclusions */}
                        <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-[#020F09] border border-[#D4AF37]/35 text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setBasicViewMode('menu')}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all text-center ${
                              basicViewMode === 'menu'
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm font-black'
                                : 'text-[#CBD5E1] hover:text-white'
                            }`}
                          >
                            All 29 Items (From Image 2)
                          </button>
                          <button
                            type="button"
                            onClick={() => setBasicViewMode('inclusions')}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all text-center ${
                              basicViewMode === 'inclusions'
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm font-black'
                                : 'text-[#CBD5E1] hover:text-white'
                            }`}
                          >
                            Package Inclusions (Image 1)
                          </button>
                        </div>

                        {basicViewMode === 'menu' ? (
                          <>
                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap gap-1 pb-1">
                              {[
                                { id: 'all', label: 'All 29' },
                                { id: 'drinks', label: 'Drinks & Soups (3)' },
                                { id: 'starters', label: 'Starters (7)' },
                                { id: 'plate', label: 'Plate (4)' },
                                { id: 'mains', label: 'Mains (10)' },
                                { id: 'sweets', label: 'Desserts & Extras (6)' },
                              ].map((tab) => (
                                <button
                                  key={tab.id}
                                  type="button"
                                  onClick={() => setBasicCategoryFilter(tab.id as any)}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                                    basicCategoryFilter === tab.id
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
                              {displayedBasicCategories.map((sec) => (
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
                                onClick={() => {
                                  setActiveMenuModal('normal');
                                  setActiveModalTab('poster');
                                }}
                                className="text-white hover:text-[#F5CE68] font-bold underline underline-offset-2 shrink-0 ml-2"
                              >
                                View Poster
                              </button>
                            </div>
                          </>
                        ) : (
                          /* Package Inclusions View (Image 1 Exact Replicas) */
                          <div className="space-y-3 mb-4 rounded-2xl bg-[#020F09]/60 border border-[#D4AF37]/30 p-3.5">
                            <p className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                              <span>Package Inclusions:</span>
                            </p>

                            <ul className="space-y-2 text-xs text-[#CBD5E1]">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span>2 Starters & Appetizers</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span>4 Main Course Delicacies</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span>1 Royal Sweets & Desserts</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                                <span>1 Welcome Coolers</span>
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

                            <div className="pt-3 border-t border-[#D4AF37]/20 space-y-1.5">
                              <p className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-wider">
                                Signature Highlights:
                              </p>
                              <p className="text-[11px] text-[#CBD5E1]">
                                • 1 Welcome Beverage (Aam Panna / Jaljeera)
                              </p>
                              <p className="text-[11px] text-[#CBD5E1]">
                                • 2 Starters (Veg Crispy / Pakora)
                              </p>
                              <p className="text-[11px] text-[#CBD5E1]">
                                • 1 Paneer / Veg Specialty
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : isPremium ? (
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
                                onClick={() => {
                                  setActiveMenuModal('royal');
                                  setActiveModalTab('poster');
                                }}
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
                    ) : isDeluxe ? (
                      <div className="space-y-3.5 mb-7">
                        {/* Toggle Mode: Menu Breakdown vs Summary Inclusions */}
                        <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-[#020F09] border border-[#D4AF37]/35 text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setDeluxeViewMode('menu')}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all text-center ${
                              deluxeViewMode === 'menu'
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm font-black'
                                : 'text-[#CBD5E1] hover:text-white'
                            }`}
                          >
                            All 44 Items (From Image 2)
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeluxeViewMode('inclusions')}
                            className={`flex-1 py-1 px-2 rounded-lg transition-all text-center ${
                              deluxeViewMode === 'inclusions'
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm font-black'
                                : 'text-[#CBD5E1] hover:text-white'
                            }`}
                          >
                            Package Inclusions (Image 1)
                          </button>
                        </div>

                        {deluxeViewMode === 'menu' ? (
                          <>
                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap gap-1 pb-1">
                              {[
                                { id: 'all', label: 'All 44' },
                                { id: 'drinks', label: 'Drinks & Soups (6)' },
                                { id: 'starters', label: 'Starters (11)' },
                                { id: 'plate', label: 'Plate (7)' },
                                { id: 'mains', label: 'Mains (13)' },
                                { id: 'sweets', label: 'Desserts & Specials (7)' },
                              ].map((tab) => (
                                <button
                                  key={tab.id}
                                  type="button"
                                  onClick={() => setDeluxeCategoryFilter(tab.id as any)}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                                    deluxeCategoryFilter === tab.id
                                      ? 'bg-[#FFDF73] text-[#041810]'
                                      : 'bg-[#041810]/90 text-[#CBD5E1] hover:text-[#FFDF73] border border-[#D4AF37]/30'
                                  }`}
                                >
                                  {tab.label}
                                </button>
                              ))}
                            </div>

                            {/* Categorized Dishes Container with Custom Scroll */}
                            <div className="max-h-[340px] overflow-y-auto pr-1.5 space-y-3 rounded-2xl bg-[#020F09]/75 border border-[#D4AF37]/30 p-3 shadow-inner">
                              {displayedDeluxeCategories.map((sec) => (
                                <div key={sec.id} className="space-y-1.5 pb-2 border-b border-[#D4AF37]/20 last:border-b-0 last:pb-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs">{sec.icon}</span>
                                    <h4 className="text-[11px] font-black text-[#FFDF73] uppercase tracking-wider">
                                      {sec.category}
                                    </h4>
                                    <span className="text-[10px] text-[#94A3B8] font-bold">({sec.items.length})</span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-0.5">
                                    {sec.items.map((item, itemIdx) => (
                                      <div
                                        key={itemIdx}
                                        className="flex items-center gap-1.5 text-[11px] text-[#FAF8F5] bg-[#06291C]/70 px-2 py-1 rounded-lg border border-[#D4AF37]/25 hover:border-[#FFDF73] transition-colors"
                                      >
                                        <CheckCircle2 className="w-3 h-3 text-[#FFDF73] shrink-0" />
                                        <span className="truncate">{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Quick Callout to Full Ornate View */}
                            <div className="flex items-center justify-between text-[11px] pt-1 text-[#CBD5E1]">
                              <span className="flex items-center gap-1 text-[#FFDF73]">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>VIP Live Stations & Ice-Glass Hospitality</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuModal('deluxe');
                                  setActiveModalTab('poster');
                                }}
                                className="text-white hover:text-[#FFDF73] font-bold underline underline-offset-2 shrink-0 ml-2"
                              >
                                View Poster
                              </button>
                            </div>
                          </>
                        ) : (
                          /* Package Inclusions View (Image 1 Exact Replicas) */
                          <div className="space-y-3 mb-4 rounded-2xl bg-[#020F09]/60 border border-[#D4AF37]/30 p-3.5">
                            <p className="text-[10px] font-bold text-[#FFDF73] uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#FFDF73]" />
                              <span>Package Inclusions:</span>
                            </p>

                            <ul className="space-y-2 text-xs text-[#CBD5E1]">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                                <span>6 Starters & Appetizers</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                                <span>12 Main Course Delicacies</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                                <span>4 Royal Sweets & Desserts</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                                <span>3 Welcome Coolers</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                                <span>Uniformed Service Crew Included</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                                <span>Commercial Warming Chafing Buffet Setup</span>
                              </li>
                            </ul>

                            <div className="pt-3 border-t border-[#D4AF37]/20 space-y-1.5">
                              <p className="text-[10px] font-bold text-[#FFDF73] uppercase tracking-wider">
                                Signature Highlights:
                              </p>
                              <p className="text-[11px] text-[#CBD5E1]">
                                • 6 Live Counters (Chaat, Live BBQ & Seafood)
                              </p>
                              <p className="text-[11px] text-[#CBD5E1]">
                                • Mutton Rogan Josh & Malai Prawn Delicacies
                              </p>
                              <p className="text-[11px] text-[#CBD5E1]">
                                • Artisanal Desserts & Fruit Design Cutting
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Fallback Standard Inclusions View */
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

                  {/* Primary & Secondary CTA Buttons */}
                  <div className="space-y-2 mt-auto pt-2">
                    <Link
                      to={`/booking?package=${encodeURIComponent(pkg.name)}&guests=500`}
                      className={`w-full py-3.5 sm:py-4 rounded-2xl text-xs font-black text-center block transition-all shadow-md active:scale-95 ${pkg.btnStyle}`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book {pkg.cleanName} (₹{pkg.pricePerPerson} / Plate)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>

                    {isBasic && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuModal('normal');
                          setActiveModalTab('poster');
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#041810]/80 hover:bg-[#06291C] border border-[#D4AF37]/45 text-[11px] font-bold text-[#F5CE68] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#F5CE68]" />
                        <span>View Basic Package Poster & Menu</span>
                      </button>
                    )}

                    {isPremium && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuModal('royal');
                          setActiveModalTab('poster');
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#041810]/80 hover:bg-[#06291C] border border-[#D4AF37]/45 text-[11px] font-bold text-[#F5CE68] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#F5CE68]" />
                        <span>View Premium Package Poster & Menu</span>
                      </button>
                    )}

                    {isDeluxe && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuModal('deluxe');
                          setActiveModalTab('poster');
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#041810]/80 hover:bg-[#06291C] border border-[#D4AF37]/45 text-[11px] font-bold text-[#FFDF73] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#FFDF73]" />
                        <span>View Deluxe Package Poster & Menu</span>
                      </button>
                    )}
                  </div>

                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Informative Callout for Smaller Gatherings below 500 guests */}
        <div className="mt-10 p-6 rounded-3xl bg-[#041810]/95 border-2 border-[#D4AF37]/50 text-center space-y-3 shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68]">
            <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Special Enquiry for Smaller Gatherings</span>
          </div>
          <h4 className="font-display font-black text-xl text-white">
            Looking for catering for fewer than 500 guests?
          </h4>
          <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
            We also accept special enquiries for smaller gatherings of 200, 300, or other guest counts below our standard minimum. Please contact us using the phone number provided in the website footer to discuss your requirements.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phonePrimaryRaw}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call {BUSINESS_CONFIG.phonePrimary}</span>
            </a>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello AD Catering, I would like to inquire about a custom catering booking for fewer than 500 guests (e.g. 200 or 300 guests).'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-xs font-bold text-emerald-300 hover:bg-emerald-900 transition-colors"
            >
              <span>WhatsApp Custom Quotation</span>
            </a>
          </div>
        </div>

        {/* ====================================================
            INTERACTIVE LIVE BANQUET BUDGET CALCULATOR
            ==================================================== */}
        {showCalculator && (
          <div className="mt-16">
            <BanquetCalculator />
          </div>
        )}

        {/* ====================================================
            CUSTOM CONSULTATION BANNER
            ==================================================== */}
        {showConsultationBanner && (
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
        )}

      </div>

      {/* ====================================================
          ROYAL WEDDING BANQUET MENU CARD MODAL (IMAGE 2 VIEW)
          Replicating Image 2's ornate maroon & gold banquet poster
          ==================================================== */}
      {/* ====================================================
          1. NORMAL MENU BANQUET CARD MODAL (IMAGE 2 FOR BASIC)
          Replicating Image 2's ornate maroon & gold banquet poster
          ==================================================== */}
      {activeMenuModal === 'normal' && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
        >
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-gradient-to-br from-[#24030a] via-[#350613] to-[#1a0208] border-2 sm:border-4 border-[#D4AF37] shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-4 sm:p-8 text-[#FAF8F5]">
            
            {/* Top Close Button & View Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 mb-4 border-b border-[#D4AF37]/40">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#F5CE68]" />
                <span className="font-display font-black text-sm sm:text-base text-white tracking-wide">
                  Normal Menu • Basic Package (₹850 / Plate)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-xl p-1 bg-[#041810] border border-[#D4AF37]/50 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('poster')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'poster'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Package Poster
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('card')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'card'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Menu Breakdown
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('basic_card')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'basic_card'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Scanned Menu Sheet
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveMenuModal(null)}
                  className="p-2 rounded-full bg-[#041810] hover:bg-rose-950 text-white border border-[#D4AF37]/50 transition-colors shadow"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TAB 1: NORMAL ORNATE MENU CARD (MATCHING IMAGE 2 EXACTLY) */}
            {activeModalTab === 'card' ? (
              <div className="space-y-6">
                
                {/* Ornate Header with Traditional Odia & Royal Gold Filigree */}
                <div className="text-center space-y-1 pb-4 border-b-2 border-dashed border-[#D4AF37]/40">
                  <p className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-[#F5CE68]">
                    AD Catering & Master Cook Services
                  </p>
                  <div className="inline-block relative">
                    <h2 className="font-display text-2xl sm:text-4xl font-black text-amber-200 tracking-wider uppercase border-b-2 border-[#D4AF37] pb-1 px-6">
                      NORMAL MENU
                    </h2>
                  </div>
                  <p className="text-xs text-[#E2E8F0] font-normal pt-1">
                    29 Signature Delicacies Across 9 Banquet Counters • Uniformed Crew Included • ₹850 / Plate
                  </p>
                </div>

                {/* SPREAD: TWO-COLUMN MENU + RIGHT EDGE AUTHENTIC FOOD DISHES */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* TWO-COLUMN BANQUET SPREAD MATCHING IMAGE 2 (10 COLS) */}
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    
                    {/* LEFT COLUMN: Welcome Drinks, Soups, Starters, Plate Counter */}
                    <div className="space-y-4">
                      
                      {/* 1. WELCOME DRINKS */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            WELCOME DRINKS
                          </span>
                          <Wine className="w-4 h-4 text-[#F5CE68]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Dahi Chhanch / Kesar Milk</span>
                          </li>
                        </ul>
                      </div>

                      {/* 2. SOUP COUNTER */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            SOUP COUNTER
                          </span>
                          <Coffee className="w-4 h-4 text-[#F5CE68]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Lemon Coriender Soup</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Chicken H/S Soup</span>
                          </li>
                        </ul>
                      </div>

                      {/* 3. STARTER (VEG) */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[11px] font-black uppercase tracking-wider">
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
                            <span>Panipuri Counter</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Paneer Crispy</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Veg Cutlet</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Corn Chaat</span>
                          </li>
                        </ul>
                      </div>

                      {/* 4. STARTER (NON-VEG) */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            STARTER (NON-VEG)
                          </span>
                          <Flame className="w-4 h-4 text-amber-400" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Chicken Pakoda</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Egg Chop</span>
                          </li>
                        </ul>
                      </div>

                      {/* 5. PLATE COUNTER */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[11px] font-black uppercase tracking-wider">
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
                    <div className="space-y-4">
                      
                      {/* 6. MAIN COURSE (VEG) */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[11px] font-black uppercase tracking-wider">
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
                            <span>Rumali Roti / Chakuli</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Dal Fry</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Khatta</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Paneer (Masala/Hydrabadi)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Mix Veg (Navaratna/Punjabi)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Mushroom Besar</span>
                          </li>
                        </ul>
                      </div>

                      {/* 7. MAIN COURSE (NON-VEG) */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            MAIN COURSE (NON-VEG)
                          </span>
                          <Crown className="w-4 h-4 text-[#F5CE68]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Mutton Rogan Juice</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Fish Fry</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Chicken Hyderabadi</span>
                          </li>
                        </ul>
                      </div>

                      {/* 8. SWEET DESERT */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F5CE68] to-[#D4AF37] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            SWEET DESERT
                          </span>
                          <Sparkles className="w-4 h-4 text-[#F5CE68]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Chhena Payes</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Hot Jalebi</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Ice Cream</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68]" />
                            <span>Rasogola</span>
                          </li>
                        </ul>
                      </div>

                      {/* 9. SPECIAL BANQUET COUNTERS */}
                      <div className="rounded-2xl p-4 bg-gradient-to-r from-[#200309] to-[#140106] border-2 border-[#D4AF37] shadow">
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

                  {/* RIGHT EDGE: AUTHENTIC FOOD PHOTOGRAPHY FROM IMAGE 2 (3 COLS) */}
                  <div className="lg:col-span-3 space-y-3 hidden sm:flex sm:flex-col">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#F5CE68] text-center">
                      Signature Feast Dishes
                    </p>
                    
                    {/* Dish 1: Mix Veg */}
                    <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/60 shadow group relative">
                      <img
                        src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80"
                        alt="Mix Veg Navaratna Punjabi"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-amber-200">Mix Veg (Navaratna)</span>
                      </div>
                    </div>

                    {/* Dish 2: Paneer Crispy */}
                    <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/60 shadow group relative">
                      <img
                        src="https://images.unsplash.com/photo-1567184109265-276f5b9d3bfb?auto=format&fit=crop&w=400&q=80"
                        alt="Paneer Crispy"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-amber-200">Paneer Crispy Starter</span>
                      </div>
                    </div>

                    {/* Dish 3: Mutton Rogan Juice */}
                    <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/60 shadow group relative">
                      <img
                        src="https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=400&q=80"
                        alt="Mutton Rogan Juice"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-amber-200">Mutton Rogan Juice</span>
                      </div>
                    </div>

                    {/* Dish 4: Chicken Pakoda */}
                    <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/60 shadow group relative">
                      <img
                        src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80"
                        alt="Chicken Pakoda"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-amber-200">Crispy Chicken Pakoda</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Footer Action inside Modal */}
                <div className="pt-4 border-t border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left text-xs text-[#CBD5E1]">
                    <span className="text-white font-bold">Total: 29 Authentic Delicacies</span> • Uniformed Crew & Chafing Warmer Setup Included
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActiveMenuModal(null)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#041810] hover:bg-black text-[#CBD5E1] border border-[#D4AF37]/40 text-xs font-bold"
                    >
                      Close
                    </button>
                    <Link
                      to={`/booking?package=${encodeURIComponent('BASIC PACKAGE')}`}
                      onClick={() => setActiveMenuModal(null)}
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Basic Package (₹850/Person)</span>
                    </Link>
                  </div>
                </div>

              </div>
            ) : activeModalTab === 'poster' ? (
              /* TAB 2: FIRST IMAGE: OFFICIAL BASIC PACKAGE POSTER */
              <div className="space-y-4 text-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] max-h-[72vh] flex items-center justify-center bg-black/60 p-2">
                  <img
                    src="/images/packages/basic-package.jpg"
                    alt="Basic Package Official Banquet Poster (Image 1)"
                    className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/basic-package-poster.jpg';
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-[#CBD5E1]">
                    Official Basic Package Banquet Poster • 16 Delicacies Grid • ₹850 / Plate
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="/images/packages/basic-package.jpg"
                      download="Basic-Package-Poster.jpg"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#041810] hover:bg-black text-white text-xs font-bold border border-[#D4AF37]/50"
                    >
                      Download Poster
                    </a>
                    <Link
                      to={`/booking?package=${encodeURIComponent('BASIC PACKAGE')}`}
                      onClick={() => setActiveMenuModal(null)}
                      className="px-6 py-2 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs shadow-md"
                    >
                      Book BASIC Package (₹850)
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 3: ORIGINAL SCANNED NORMAL MENU CARD */
              <div className="space-y-4 text-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] max-h-[72vh] flex items-center justify-center bg-black/60 p-2">
                  <img
                    src="/images/normal-menu-card.png"
                    alt="Normal Menu Original Banquet Sheet"
                    className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/packages/basic-package.jpg';
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-[#CBD5E1]">
                    Authentic Normal Menu Scanned Banquet Card • High-Resolution Poster
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="/images/normal-menu-card.png"
                      download="Normal-Menu-Banquet-Card.png"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#041810] hover:bg-black text-white text-xs font-bold border border-[#D4AF37]/50"
                    >
                      Download Scan
                    </a>
                    <Link
                      to={`/booking?package=${encodeURIComponent('BASIC PACKAGE')}`}
                      onClick={() => setActiveMenuModal(null)}
                      className="px-6 py-2 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs shadow-md"
                    >
                      Book BASIC Package (₹850)
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ====================================================
          2. ROYAL WEDDING BANQUET MENU CARD MODAL (FOR PREMIUM)
          ==================================================== */}
      {activeMenuModal === 'royal' && (
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
                  Royal Wedding Banquet Menu (₹950 / Plate)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-xl p-1 bg-[#041810] border border-[#D4AF37]/50 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('poster')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'poster'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Package Poster
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('card')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'card'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Menu Breakdown
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveMenuModal(null)}
                  className="p-2 rounded-full bg-[#041810] hover:bg-rose-950 text-white border border-[#D4AF37]/50 transition-colors shadow"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TAB 1: ROYAL ORNATE MENU CARD */}
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

                {/* TWO-COLUMN BANQUET SPREAD */}
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
                      onClick={() => setActiveMenuModal(null)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#041810] hover:bg-black text-[#CBD5E1] border border-[#D4AF37]/40 text-xs font-bold"
                    >
                      Close
                    </button>
                    <Link
                      to={`/booking?package=${encodeURIComponent('PREMIUM PACKAGE')}`}
                      onClick={() => setActiveMenuModal(null)}
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book This Royal Feast (₹950/Person)</span>
                    </Link>
                  </div>
                </div>

              </div>
            ) : (
              /* TAB 2: SECOND IMAGE: OFFICIAL PREMIUM PACKAGE POSTER */
              <div className="space-y-4 text-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] max-h-[72vh] flex items-center justify-center bg-black/60 p-2">
                  <img
                    src="/images/packages/premium-package.jpg"
                    alt="Premium Package - A Royal Feast For Your Special Occasion (Image 2)"
                    className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/premium-package-poster.jpg';
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-[#CBD5E1]">
                    Official Premium Package Royal Feast Poster • Complete Multi-Course Spread • ₹950 / Plate
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="/images/packages/premium-package.jpg"
                      download="Premium-Package-Royal-Feast.jpg"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#041810] hover:bg-black text-white text-xs font-bold border border-[#D4AF37]/50"
                    >
                      Download Poster
                    </a>
                    <Link
                      to={`/booking?package=${encodeURIComponent('PREMIUM PACKAGE')}`}
                      onClick={() => setActiveMenuModal(null)}
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

      {/* ====================================================
          3. DELUX MENU BANQUET CARD MODAL (IMAGE 2 FOR DELUXE)
          Replicating Image 2's ornate crimson & gold banquet poster
          ==================================================== */}
      {activeMenuModal === 'deluxe' && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
        >
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-gradient-to-br from-[#2b040c] via-[#3b0816] to-[#1e020a] border-2 sm:border-4 border-[#FFDF73] shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-4 sm:p-8 text-[#FAF8F5]">
            
            {/* Top Close Button & View Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 mb-4 border-b border-[#D4AF37]/40">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#FFDF73]" />
                <span className="font-display font-black text-sm sm:text-base text-white tracking-wide">
                  Delux Menu • Deluxe Package (₹1,050 / Plate)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-xl p-1 bg-[#041810] border border-[#D4AF37]/50 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('poster')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'poster'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Package Poster
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('card')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'card'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Menu Breakdown
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('deluxe_card')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeModalTab === 'deluxe_card'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810]'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                  >
                    Scanned Menu Sheet
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveMenuModal(null)}
                  className="p-2 rounded-full bg-[#041810] hover:bg-rose-950 text-white border border-[#D4AF37]/50 transition-colors shadow"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TAB 1: DELUX ORNATE MENU CARD (MATCHING IMAGE 2 EXACTLY) */}
            {activeModalTab === 'card' ? (
              <div className="space-y-6">
                
                {/* Ornate Header with Traditional Royal Gold Filigree */}
                <div className="text-center space-y-1 pb-4 border-b-2 border-dashed border-[#D4AF37]/40">
                  <p className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-[#FFDF73]">
                    AD Catering & Master Cook Services
                  </p>
                  <div className="inline-block relative">
                    <h2 className="font-display text-2xl sm:text-4xl font-black text-amber-200 tracking-wider uppercase border-b-2 border-[#D4AF37] pb-1 px-6">
                      DELUX MENU
                    </h2>
                  </div>
                  <p className="text-xs text-[#E2E8F0] font-normal pt-1">
                    44 Signature Delicacies Across 9 Banquet Counters • VIP Live Stations & Ice-Glass Hospitality • ₹1,050 / Plate
                  </p>
                </div>

                {/* SPREAD: TWO-COLUMN MENU + RIGHT EDGE AUTHENTIC FOOD DISHES */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* TWO-COLUMN BANQUET SPREAD MATCHING IMAGE 2 (10 COLS) */}
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    
                    {/* LEFT COLUMN: STARTERS & REFRESHMENTS */}
                    <div className="space-y-4">
                      <div className="text-center py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-amber-950/80 border border-[#D4AF37]/50">
                        <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-[#FFDF73]">
                          STARTERS & REFRESHMENTS
                        </h3>
                      </div>
                      
                      {/* 1. WELCOME DRINKS */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            WELCOME DRINKS
                          </span>
                          <Wine className="w-4 h-4 text-[#FFDF73]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Fire Mocktail</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Smoky Mocktail</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Masala Drinks</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Badam Kesar Milk</span>
                          </li>
                        </ul>
                      </div>

                      {/* 2. SOUP COUNTER */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            SOUP COUNTER
                          </span>
                          <Coffee className="w-4 h-4 text-[#FFDF73]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Veg Sweet Corn Soup</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Chicken H/S Soup</span>
                          </li>
                        </ul>
                      </div>

                      {/* 3. STARTER (VEG) */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            STARTER (VEG)
                          </span>
                          <span className="text-[10px] text-[#CBD5E1] font-semibold">Live Stations</span>
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Papudi Chaat / Aloo Tiki Chaat</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Gupchup Counter</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Harabara Kabab / Dahi Kabab</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>American Corn Crispy</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Paneer Tikka</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Mushroom salt & Pepper</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Chowmein</span>
                          </li>
                        </ul>
                      </div>

                      {/* 4. STARTER (NON-VEG) */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            STARTER (NON-VEG)
                          </span>
                          <Flame className="w-4 h-4 text-orange-400" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Garlic Prawn</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Fish Patrapoda</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Chicken Kabab (Malai, Reshmi, Hariyali)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Egg Devil</span>
                          </li>
                        </ul>
                      </div>

                      {/* 5. PLATE COUNTER */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            PLATE COUNTER
                          </span>
                          <span className="text-[10px] text-[#CBD5E1] font-semibold">Salads & Chutneys</span>
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Green Salad</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Papad</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Dahibara</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Pickles</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Nadia Pachedi</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Dahi Rasgulla</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Pasta Salad</span>
                          </li>
                        </ul>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: MAIN COURSE & DESSERTS */}
                    <div className="space-y-4">
                      <div className="text-center py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-amber-950/80 border border-[#D4AF37]/50">
                        <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-[#FFDF73]">
                          MAIN COURSE & DESSERTS
                        </h3>
                      </div>
                      
                      {/* 6. MAIN COURSE (VEG) */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            MAIN COURSE (VEG)
                          </span>
                          <UtensilsCrossed className="w-4 h-4 text-[#FFDF73]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Rice (Variety)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Rumali Roti</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Chakuli / Butter Naan</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Dal Makhani</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Pine Apple Jelly</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Paneer Pasinda / Tikka Masala</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Kadai Mushroom</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Navaratna Kurma</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Sijnal Veg</span>
                          </li>
                        </ul>
                      </div>

                      {/* 7. MAIN COURSE (NON-VEG) */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            MAIN COURSE (NON-VEG)
                          </span>
                          <Crown className="w-4 h-4 text-[#FFDF73]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Mutton Rogan Josh</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Dahi Fish</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Garlic Chicken</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Malai Prawn</span>
                          </li>
                        </ul>
                      </div>

                      {/* 8. SWEET DESSERT */}
                      <div className="rounded-2xl p-4 bg-[#1b0308]/85 border border-[#D4AF37]/60 shadow">
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D4AF37]/35">
                          <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[11px] font-black uppercase tracking-wider">
                            SWEET DESSERT
                          </span>
                          <Sparkles className="w-4 h-4 text-[#FFDF73]" />
                        </div>
                        <ul className="space-y-1 text-xs text-white">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Kheer Sagar</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Ice Cream</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Baked Rasgula</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFDF73]" />
                            <span>Gajar Halwa</span>
                          </li>
                        </ul>
                      </div>

                      {/* 9. SPECIAL COUNTERS / INCLUSIONS */}
                      <div className="rounded-2xl p-4 bg-gradient-to-r from-[#200308] to-[#120104] border-2 border-[#D4AF37] shadow">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#FFDF73] mb-2">
                          SPECIAL VIP INCLUSIONS
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wide">
                            <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                            <span>WATER BOTTLE</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wide">
                            <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                            <span>PAAN COUNTER</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wide">
                            <CheckCircle2 className="w-4 h-4 text-[#FFDF73] shrink-0" />
                            <span>FRUIT DESIGN CUTTING</span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* RIGHT COLUMN: 4 AUTHENTIC SIDE FOOD DISHES FROM IMAGE 2 (3 COLS) */}
                  <div className="lg:col-span-3 space-y-3.5">
                    <p className="text-[10px] font-bold text-[#FFDF73] uppercase tracking-wider text-center">
                      Delux Culinary Art
                    </p>

                    {/* Dish 1: Butter Naan / Rotis */}
                    <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/50 bg-[#160207] p-2 text-center group shadow-md">
                      <div className="h-24 sm:h-28 rounded-xl overflow-hidden mb-1.5">
                        <img
                          src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80"
                          alt="Butter Naan & Chakuli"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-white">Chakuli & Butter Naan</p>
                      <p className="text-[9px] text-[#CBD5E1]">Live Tandoor Bread Basket</p>
                    </div>

                    {/* Dish 2: Paneer Pasinda / Tikka Masala */}
                    <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/50 bg-[#160207] p-2 text-center group shadow-md">
                      <div className="h-24 sm:h-28 rounded-xl overflow-hidden mb-1.5">
                        <img
                          src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80"
                          alt="Paneer Pasinda"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-white">Paneer Pasinda</p>
                      <p className="text-[9px] text-[#CBD5E1]">Rich Mughlai Gravy</p>
                    </div>

                    {/* Dish 3: Mutton Rogan Josh */}
                    <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/50 bg-[#160207] p-2 text-center group shadow-md">
                      <div className="h-24 sm:h-28 rounded-xl overflow-hidden mb-1.5">
                        <img
                          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
                          alt="Mutton Rogan Josh"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-white">Mutton Rogan Josh</p>
                      <p className="text-[9px] text-[#CBD5E1]">Kashmiri Slow Copper Handi</p>
                    </div>

                    {/* Dish 4: Kheer Sagar & Baked Rasgulla */}
                    <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/50 bg-[#160207] p-2 text-center group shadow-md">
                      <div className="h-24 sm:h-28 rounded-xl overflow-hidden mb-1.5">
                        <img
                          src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80"
                          alt="Kheer Sagar & Baked Rasgulla"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-white">Kheer Sagar & Desserts</p>
                      <p className="text-[9px] text-[#CBD5E1]">Royal Milk Delicacies</p>
                    </div>

                  </div>

                </div>

                {/* Bottom Callout Banner */}
                <div className="pt-4 border-t border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <p className="text-xs text-[#CBD5E1]">
                      <strong className="text-white">VIP Ice-Glass Styling:</strong> Includes gold chafing stations, 6 live counters, uniformed stewards, and complete post-banquet cleaning.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActiveMenuModal(null)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#041810] hover:bg-black text-[#CBD5E1] border border-[#D4AF37]/40 text-xs font-bold"
                    >
                      Close
                    </button>
                    <Link
                      to={`/booking?package=${encodeURIComponent('DELUXE PACKAGE')}`}
                      onClick={() => setActiveMenuModal(null)}
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Deluxe Package (₹1,050/Person)</span>
                    </Link>
                  </div>
                </div>

              </div>
            ) : activeModalTab === 'poster' ? (
              /* TAB 2: THIRD IMAGE: OFFICIAL DELUXE PACKAGE POSTER */
              <div className="space-y-4 text-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] max-h-[72vh] flex items-center justify-center bg-black/60 p-2">
                  <img
                    src="/images/packages/deluxe-package.jpg"
                    alt="Deluxe Package - A Perfect Blend of Taste & Tradition (Image 3)"
                    className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/deluxe-package-poster.jpg';
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-[#CBD5E1]">
                    Official Deluxe Package Poster • A Perfect Blend of Taste & Tradition • 44 Delicacies • ₹1,050 / Plate
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="/images/packages/deluxe-package.jpg"
                      download="Deluxe-Package-Poster.jpg"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#041810] hover:bg-black text-white text-xs font-bold border border-[#D4AF37]/50"
                    >
                      Download Poster
                    </a>
                    <Link
                      to={`/booking?package=${encodeURIComponent('DELUXE PACKAGE')}`}
                      onClick={() => setActiveMenuModal(null)}
                      className="px-6 py-2 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs shadow-md"
                    >
                      Book DELUXE Package (₹1,050)
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 3: ORIGINAL SCANNED DELUX MENU CARD */
              <div className="space-y-4 text-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] max-h-[72vh] flex items-center justify-center bg-black/60 p-2">
                  <img
                    src="/images/delux-menu-card.png"
                    alt="Delux Menu Original Banquet Sheet"
                    className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/packages/deluxe-package.jpg';
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-[#CBD5E1]">
                    Authentic Delux Menu Scanned Banquet Card • High-Resolution Poster
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="/images/delux-menu-card.png"
                      download="Delux-Menu-Banquet-Card.png"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#041810] hover:bg-black text-white text-xs font-bold border border-[#D4AF37]/50"
                    >
                      Download Scan
                    </a>
                    <Link
                      to={`/booking?package=${encodeURIComponent('DELUXE PACKAGE')}`}
                      onClick={() => setActiveMenuModal(null)}
                      className="px-6 py-2 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs shadow-md"
                    >
                      Book DELUXE Package (₹1,050)
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

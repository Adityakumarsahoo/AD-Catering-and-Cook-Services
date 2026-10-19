import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMenuCart } from '../context/MenuCartContext.js';
import { TiltCard } from '../components/TiltCard.js';
import { FoodDetailModal } from '../components/FoodDetailModal.js';
import {
  Sparkles,
  Leaf,
  Crown,
  Check,
  Plus,
  ArrowRight,
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
  RefreshCw,
} from 'lucide-react';

export const VegMenu: React.FC = () => {
  const { toggleDish, isDishSelected } = useMenuCart();
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);

  // Interactive variant toggles
  const [soupVariant, setSoupVariant] = useState<'sweet_corn' | 'manchow'>('sweet_corn');
  const [paneerVariant, setPaneerVariant] = useState<'punjabi' | 'hyderabadi'>('punjabi');
  const [dessertVariant, setDessertVariant] = useState<'jalebi' | 'gulab_jamun'>('jalebi');

  // Active category for sticky navigation
  const [activeCategory, setActiveCategory] = useState<string>('welcome_drinks');

  // Section Refs for smooth scrolling
  const welcomeRef = useRef<HTMLElement>(null);
  const soupRef = useRef<HTMLElement>(null);
  const starterRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const dessertRef = useRef<HTMLElement>(null);
  const waterRef = useRef<HTMLElement>(null);
  const paanRef = useRef<HTMLElement>(null);

  const scrollToSection = (category: string, ref: React.RefObject<HTMLElement | null>) => {
    setActiveCategory(category);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ==========================================
  // EXACT DATA DEFINITIONS (100% PURE VEG ONLY)
  // ==========================================

  const mocktailDish = {
    id: 'veg_wd_1',
    name: 'Mocktail',
    category: 'WELCOME DRINKS',
    menuType: 'all',
    description: 'Refreshing tropical blend of fresh muddled garden mint, zesty lime, exotic fruit nectars, and sparkling effervescence served ice-cold.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    tags: ['Refreshing', 'Welcome Special', 'Zero-Alcohol', 'Chilled'],
  };

  const sweetCornSoup = {
    id: 'veg_sp_1',
    name: 'Veg Sweet Corn Soup',
    category: 'SOUP',
    menuType: 'all',
    description: 'Warm, velvety broth loaded with crushed golden American sweet corn, finely minced garden vegetables, and aromatic white pepper.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isPopular: true,
    tags: ['Comforting', 'Velvety Sweet Corn', 'Mild'],
  };

  const manchowSoup = {
    id: 'veg_sp_2',
    name: 'Veg Manchow Soup',
    category: 'SOUP',
    menuType: 'all',
    description: 'Robust Indo-Chinese dark broth infused with minced garlic, ginger, chopped wild mushrooms, scallions, and served with crispy fried noodles.',
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isPopular: true,
    tags: ['Spicy & Tangy', 'Crispy Noodles', 'Chef Special'],
  };

  const startersList = [
    {
      id: 'veg_st_1',
      name: 'American Corn Fry',
      category: 'STARTER',
      description: 'Golden crispy corn bites with a delicious crunch.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Crispy Crunch', 'Party Starter'],
    },
    {
      id: 'veg_st_2',
      name: 'Hara Bhara Kabab',
      category: 'STARTER',
      description: 'Herb-packed vegetarian kebabs with a delicate crisp exterior.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isPopular: true,
      tags: ['Spinach & Peas', 'Melt in Mouth'],
    },
    {
      id: 'veg_st_3',
      name: 'Mushroom Cheese Ball',
      category: 'STARTER',
      description: 'Crispy mushroom and cheese bites with a rich centre.',
      image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isPopular: true,
      tags: ['Molten Cheese', 'Golden Crumb'],
    },
    {
      id: 'veg_st_4',
      name: 'Paneer Shashlik',
      category: 'STARTER',
      description: 'Char-grilled paneer with colourful vegetables.',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isFeatured: true,
      tags: ['Tandoor Char', 'Fresh Malai Paneer'],
    },
    {
      id: 'veg_st_5',
      name: 'Dahi Papdi Chaat',
      category: 'STARTER',
      description: 'Crisp papdi layered with creamy yoghurt and vibrant chutneys.',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Tangy & Sweet', 'Street Luxury'],
    },
    {
      id: 'veg_st_6',
      name: 'Gupchup',
      category: 'STARTER',
      description: 'Crispy puris filled with tangy, refreshing flavours.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isPopular: true,
      tags: ['Live Counter', 'Zesty Mint Water'],
    },
  ];

  const plateCounterList = [
    {
      id: 'veg_pc_1',
      name: 'Dahi Bara',
      category: 'PLATE COUNTER',
      description: 'Iconic Cuttack style soft urad dal vadas immersed in seasoned buttermilk, tempered with mustard seeds and curry leaves.',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isFeatured: true,
      isOdiaSpecialty: true,
      tags: ['Royal Odia', 'Prominent Feature'],
    },
    {
      id: 'veg_pc_2',
      name: 'Dahi Rashola',
      category: 'PLATE COUNTER',
      description: 'Traditional celebration delicacy of tender cottage cheese dumplings soaked in seasoned spiced yoghurt with roasted cumin.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isFeatured: true,
      isOdiaSpecialty: true,
      tags: ['Temple Recipe', 'Delicate Dumplings'],
    },
    {
      id: 'veg_pc_3',
      name: 'Pasta',
      category: 'PLATE COUNTER',
      description: 'Penne pasta tossed in rich garlic parmesan cream with crisp garden bell peppers and fine Italian herbs.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Creamy Alfredo', 'Kids Favorite'],
    },
    {
      id: 'veg_pc_4',
      name: 'Salad',
      category: 'PLATE COUNTER',
      description: 'Artistically carved garden fresh cucumber ribbons, sweet carrots, vine tomatoes, and beetroot rosettes.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Crisp & Fresh', 'Healthy Greens'],
    },
    {
      id: 'veg_pc_5',
      name: 'Papad',
      category: 'PLATE COUNTER',
      description: 'Crisp roasted and fried spiced lentil wafers dusted with roasted cumin and chaat masala.',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Crispy Accompaniment'],
    },
  ];

  // MAIN COURSE ITEMS
  const greenPeasRice = {
    id: 'veg_mc_1',
    name: 'Green Peas Rice',
    category: 'MAIN COURSE',
    description: 'Fragrant royal basmati rice gently tempered in desi cow ghee with sweet green garden peas, whole cardamom, and bay leaves.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isFeatured: true,
    tags: ['Signature Rice', 'Desi Ghee Basmati', 'Aromatic'],
  };

  const paneerPunjabi = {
    id: 'veg_mc_2a',
    name: 'Paneer Punjabi',
    category: 'MAIN COURSE',
    description: 'Soft cubes of malai cottage cheese simmered in a luscious, velvety tomato-cashew makhani gravy enriched with butter and kasuri methi.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isFeatured: true,
    tags: ['Punjabi Makhani', 'Rich Cashew Cream'],
  };

  const paneerHyderabadi = {
    id: 'veg_mc_2b',
    name: 'Paneer Hyderabadi',
    category: 'MAIN COURSE',
    description: 'Royal green gravy crafted with fresh mint, coriander leaves, roasted poppy seeds, coconut, and simmered tender paneer blocks.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isFeatured: true,
    tags: ['Nawabi Green Herb', 'Fragrant Hyderabadi'],
  };

  const navaratnaKurma = {
    id: 'veg_mc_3',
    name: 'Navaratna Kurma',
    category: 'MAIN COURSE',
    description: 'Nine culinary jewels of tender seasonal vegetables, fruits, dry nuts, and cottage cheese cooked in a royal mild cashew cream kurma.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isFeatured: true,
    tags: ['Imperial Mughal', 'Mild & Royal', 'Dry Fruits & Nuts'],
  };

  const mainCourseSupporting = [
    {
      id: 'veg_mc_4',
      name: 'Yellow Dal Fry',
      category: 'MAIN COURSE',
      description: 'Slow-cooked yellow lentils tempered with pure desi ghee, cumin seeds, garlic slivers, and fresh coriander.',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Desi Ghee Tadka', 'Comfort Classic'],
    },
    {
      id: 'veg_mc_5',
      name: 'Seasonal Veg',
      category: 'MAIN COURSE',
      description: 'Fresh farm-picked seasonal cauliflower, green peas, carrots, and beans dry-roasted with aromatic whole spices.',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Farm Fresh', 'Seasonal Bounty'],
    },
    {
      id: 'veg_mc_6',
      name: 'Mushroom Chilli',
      category: 'MAIN COURSE',
      description: 'Crispy button mushrooms wok-tossed with scallions, capsicum, green chillies, and savory dark soy.',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Indo-Chinese', 'Hot & Savory'],
    },
    {
      id: 'veg_mc_7',
      name: 'Rumali Roti',
      category: 'MAIN COURSE',
      description: 'Paper-thin, ultra-soft handkerchief flatbread expertly cooked on an inverted hot tawa and folded fresh.',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Paper Thin', 'Piped Hot'],
    },
    {
      id: 'veg_mc_8',
      name: 'Finger Chips',
      category: 'MAIN COURSE',
      description: 'Crispy golden potato fingers fried to perfection, lightly seasoned with rock salt and fine herbs.',
      image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Crispy Golden', 'Kids Favorite'],
    },
    {
      id: 'veg_mc_9',
      name: 'Fruits Jelly',
      category: 'MAIN COURSE',
      description: 'Glistening chilled fruit jelly layered with colorful real fruit pieces, offering a palate-cleansing sweetness.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      tags: ['Chilled Sweet', 'Fruity Delight'],
    },
  ];

  // SWEET DESSERT
  const khirSagar = {
    id: 'veg_des_1',
    name: 'Khir Sagar',
    category: 'SWEET DESSERT',
    description: 'Odisha specialty of miniature fresh cottage cheese dumplings poached in thickened cardamom-infused sweetened milk with saffron.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isFeatured: true,
    isOdiaSpecialty: true,
    tags: ['Royal Odia Sweet', 'Saffron Milk'],
  };

  const hotJalebi = {
    id: 'veg_des_2a',
    name: 'Hot Jalebi',
    category: 'SWEET DESSERT',
    description: 'Crisp, golden saffron spirals fried live in pure desi ghee and immersed in warm aromatic cardamom syrup.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isPopular: true,
    tags: ['Piped Hot', 'Desi Ghee Crispy'],
  };

  const gulabJamun = {
    id: 'veg_des_2b',
    name: 'Gulab Jamun',
    category: 'SWEET DESSERT',
    description: 'Warm, melt-in-mouth golden khoya dumplings gently steeped in rose-scented sugar nectar.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isPopular: true,
    tags: ['Warm & Soft', 'Rose Fragrance'],
  };

  const iceCreamDish = {
    id: 'veg_des_3',
    name: 'Ice Cream',
    category: 'SWEET DESSERT',
    description: 'Smooth, creamy celebration scoops of rich vanilla and strawberry ice cream, garnished with roasted almond flakes.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    tags: ['Chilled Cream', 'Banquet Classic'],
  };

  const waterBottleDish = {
    id: 'veg_wb_1',
    name: 'Water Bottle',
    category: 'WATER BOTTLE',
    description: 'Hygienically packaged, crystal clear purified natural mineral water bottles provided for every honored guest.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    tags: ['Purified & Sealed', 'Continuous Service'],
  };

  const paanCounterDish = {
    id: 'veg_pn_1',
    name: 'Paan Counter',
    category: 'PAAN COUNTER',
    description: 'Traditional royal digestive paan prepared live with tender Magahi betel leaf, sweetened gulkand, fragrant cardamom, sweet fennel, and edible silver leaf.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isFeatured: true,
    tags: ['Live Paan Lounge', 'Digestive Heritage', 'Festive Touch'],
  };

  const timelineSteps = [
    { title: 'WELCOME DRINKS', icon: GlassWater, ref: welcomeRef, desc: 'Mocktail' },
    { title: 'SOUP', icon: Soup, ref: soupRef, desc: 'Sweet Corn / Manchow' },
    { title: 'STARTERS', icon: Flame, ref: starterRef, desc: '6 Crispy Starters' },
    { title: 'PLATE COUNTER', icon: UtensilsCrossed, ref: plateRef, desc: 'Dahi Bara & Accompaniments' },
    { title: 'MAIN COURSE', icon: Layers, ref: mainRef, desc: 'Green Peas Rice, Paneer & Kurma' },
    { title: 'SWEET DESSERT', icon: Cake, ref: dessertRef, desc: 'Khir Sagar, Jalebi / Jamun' },
    { title: 'WATER BOTTLE', icon: GlassWater, ref: waterRef, desc: 'Purified Water' },
    { title: 'PAAN COUNTER', icon: Sparkles, ref: paanRef, desc: 'Royal Live Paan' },
  ];

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
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1920&q=80"
            alt="Pure Vegetarian Catering Feast"
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] opacity-25"
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

              {/* Animated Word Highlight */}
              <div className="pt-2 flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold tracking-widest uppercase text-[#F5CE68]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Farm Fresh
                </span>
                <span className="text-emerald-700">•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-400" /> Authentic Flavours
                </span>
                <span className="text-emerald-700">•</span>
                <span className="flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" /> 100% Pure Veg
                </span>
              </div>
            </div>

            {/* Link to Full Menu if user wants all-cuisines */}
            <div className="pt-8 border-t border-[#D4AF37]/25 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBD5E1]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Onion-Garlic / Sattvic options available upon request</span>
              </span>

              <Link
                to="/menu"
                className="text-[#F5CE68] hover:text-white font-bold transition-colors flex items-center gap-1"
              >
                <span>View Full Banquet Menu</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ====================================================
            2. TIMELINE / VISUAL JOURNEY BAR
            ==================================================== */}
        <section className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5CE68] flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>THE BANQUET PROGRESSION</span>
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Vegetarian Culinary Flow
            </h2>
          </div>

          {/* Desktop Horizontal / Mobile Scrollable Timeline */}
          <div className="p-3 rounded-2xl glass-strong border border-[#D4AF37]/40 overflow-x-auto no-scrollbar shadow-md">
            <div className="flex items-center gap-2 min-w-max">
              {timelineSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(step.title.toLowerCase().replace(' ', '_'), step.ref)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#041810]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-emerald-950 transition-all text-left group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white group-hover:text-[#F5CE68] transition-colors uppercase tracking-wider">
                        {step.title}
                      </p>
                      <p className="text-[9px] text-[#94A3B8] truncate max-w-[110px]">
                        {step.desc}
                      </p>
                    </div>
                    {idx < timelineSteps.length - 1 && (
                      <ChevronRight className="w-3 h-3 text-[#D4AF37]/50 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================
            3. WELCOME DRINKS (MOCKTAIL)
            ==================================================== */}
        <section ref={welcomeRef} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Refreshing Beginnings
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                WELCOME DRINKS
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              1 Selection
            </span>
          </div>

          <TiltCard maxTilt={3}>
            <div className="rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div
                onClick={() => setActiveModalItem(mocktailDish)}
                className="relative w-full md:w-80 h-64 rounded-3xl overflow-hidden cursor-pointer group shrink-0 border border-[#D4AF37]/40"
              >
                <img
                  src={mocktailDish.image}
                  alt={mocktailDish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                  Welcome Special
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 border border-[#D4AF37]/50 text-white text-xs font-bold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#F5CE68]" />
                    <span>Inspect Drink</span>
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-500/40">
                    Mocktail Bar
                  </span>
                  <span className="text-xs font-semibold text-[#CBD5E1]">
                    Chilled & Zero-Alcohol
                  </span>
                </div>

                <h3 className="font-display text-3xl font-black text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                  onClick={() => setActiveModalItem(mocktailDish)}
                >
                  {mocktailDish.name}
                </h3>

                <p className="text-sm text-[#CBD5E1] font-normal leading-relaxed">
                  {mocktailDish.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {mocktailDish.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] text-[#F5CE68] bg-emerald-950/70 border border-[#D4AF37]/30 px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleDish({
                      id: mocktailDish.id,
                      name: mocktailDish.name,
                      category: mocktailDish.category,
                      isVeg: true,
                    })}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                      isDishSelected(mocktailDish.id)
                        ? 'bg-emerald-600 text-white'
                        : 'gold-gradient-btn text-[#041810] font-black'
                    }`}
                  >
                    {isDishSelected(mocktailDish.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Selection</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Mocktail to Menu</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </TiltCard>
        </section>

        {/* ====================================================
            4. SOUP SECTION (SPLIT CARD: SWEET CORN vs MANCHOW)
            ==================================================== */}
        <section ref={soupRef} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Warm, comforting and flavourful
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                SOUP
              </h2>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-950/80 p-1 rounded-xl border border-[#D4AF37]/30 text-xs">
              <button
                onClick={() => setSoupVariant('sweet_corn')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  soupVariant === 'sweet_corn'
                    ? 'gold-gradient-btn text-[#041810] shadow'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                Sweet Corn
              </button>
              <button
                onClick={() => setSoupVariant('manchow')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  soupVariant === 'manchow'
                    ? 'gold-gradient-btn text-[#041810] shadow'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                Manchow
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sweet Corn Option */}
            <TiltCard maxTilt={3}>
              <div
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 h-full ${
                  soupVariant === 'sweet_corn'
                    ? 'bg-[#041810]/90 backdrop-blur-xl border-2 border-[#D4AF37] shadow-[0_20px_60px_rgba(0,0,0,0.7)] ring-1 ring-[#F5CE68]/40'
                    : 'bg-[#041810]/75 backdrop-blur-xl border border-[#D4AF37]/35 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div
                    onClick={() => setActiveModalItem(sweetCornSoup)}
                    className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/40"
                  >
                    <img
                      src={sweetCornSoup.image}
                      alt={sweetCornSoup.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-[10px] font-bold">
                      Choice A
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-black text-white">
                      Veg Sweet Corn Soup
                    </h3>
                    <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed font-normal">
                      {sweetCornSoup.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-[#D4AF37]/25 mt-4">
                  <button
                    onClick={() => setActiveModalItem(sweetCornSoup)}
                    className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Ingredients</span>
                  </button>

                  <button
                    onClick={() => toggleDish({
                      id: sweetCornSoup.id,
                      name: sweetCornSoup.name,
                      category: sweetCornSoup.category,
                      isVeg: true,
                    })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow ${
                      isDishSelected(sweetCornSoup.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                    }`}
                  >
                    {isDishSelected(sweetCornSoup.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isDishSelected(sweetCornSoup.id) ? 'Selected' : 'Select Sweet Corn'}</span>
                  </button>
                </div>
              </div>
            </TiltCard>

            {/* Manchow Option */}
            <TiltCard maxTilt={3}>
              <div
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 h-full ${
                  soupVariant === 'manchow'
                    ? 'bg-[#041810]/90 backdrop-blur-xl border-2 border-[#D4AF37] shadow-[0_20px_60px_rgba(0,0,0,0.7)] ring-1 ring-[#F5CE68]/40'
                    : 'bg-[#041810]/75 backdrop-blur-xl border border-[#D4AF37]/35 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div
                    onClick={() => setActiveModalItem(manchowSoup)}
                    className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/40"
                  >
                    <img
                      src={manchowSoup.image}
                      alt={manchowSoup.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-[10px] font-bold">
                      Choice B
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-black text-white">
                      Veg Manchow Soup
                    </h3>
                    <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed font-normal">
                      {manchowSoup.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-[#D4AF37]/25 mt-4">
                  <button
                    onClick={() => setActiveModalItem(manchowSoup)}
                    className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Ingredients</span>
                  </button>

                  <button
                    onClick={() => toggleDish({
                      id: manchowSoup.id,
                      name: manchowSoup.name,
                      category: manchowSoup.category,
                      isVeg: true,
                    })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow ${
                      isDishSelected(manchowSoup.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                    }`}
                  >
                    {isDishSelected(manchowSoup.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isDishSelected(manchowSoup.id) ? 'Selected' : 'Select Manchow'}</span>
                  </button>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* ====================================================
            5. VEGETARIAN STARTERS (6-CARD PREMIUM GRID)
            ==================================================== */}
        <section ref={starterRef} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Crispy, creamy and full of flavour
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                VEGETARIAN STARTERS
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              All 6 Delicacies Included
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {startersList.map((dish) => {
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
                        <span>{selected ? 'Added' : 'Add Dish'}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            6. PLATE COUNTER (DAHI BARA & DAHI RASHOLA PROMINENT)
            ==================================================== */}
        <section ref={plateRef} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                Fresh accompaniments and delightful favourites
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                PLATE COUNTER
              </h2>
            </div>
            <span className="text-xs text-[#CBD5E1] font-semibold">
              5 Authentic Accompaniments
            </span>
          </div>

          {/* Prominent Two Cards: Dahi Bara and Dahi Rashola */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plateCounterList.slice(0, 2).map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={3}>
                  <div className="rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
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
                        HERITAGE SPECIAL
                      </span>
                    </div>

                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                        Plate Feature
                      </span>
                      <h3
                        onClick={() => setActiveModalItem(dish)}
                        className="font-display font-bold text-xl text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
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
                          <span>{selected ? 'Added' : 'Select'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          {/* Three Remaining Accompaniments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {plateCounterList.slice(2).map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={2}>
                  <div className="rounded-3xl bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/35 p-5 flex flex-col justify-between h-full shadow-sm">
                    <div>
                      <div
                        onClick={() => setActiveModalItem(dish)}
                        className="relative h-40 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/30"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>

                      <div className="pt-4 space-y-1">
                        <h4
                          onClick={() => setActiveModalItem(dish)}
                          className="font-display font-bold text-base text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h4>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 font-normal">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalItem(dish)}
                        className="text-xs text-[#F5CE68] hover:text-white font-semibold"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          isVeg: true,
                        })}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shadow ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {selected ? 'Added' : 'Select'}
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            7. MAIN COURSE (EDITORIAL LUXURY LAYOUT)
            ==================================================== */}
        <section ref={mainRef} className="space-y-8 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                A satisfying vegetarian feast crafted for every celebration
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                MAIN COURSE
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
              Feast Centerpiece
            </span>
          </div>

          {/* Large Feature Card: Green Peas Rice */}
          <TiltCard maxTilt={3}>
            <div className="rounded-[40px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center shadow-[0_24px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div
                onClick={() => setActiveModalItem(greenPeasRice)}
                className="relative w-full lg:w-96 h-72 rounded-3xl overflow-hidden cursor-pointer group shrink-0 border border-[#D4AF37]/40"
              >
                <img
                  src={greenPeasRice.image}
                  alt={greenPeasRice.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D4AF37] text-[#041810] text-[10px] font-black uppercase tracking-wider">
                  Royal Rice Anchor
                </span>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
                    Crown Delicacy
                  </span>
                  <span className="text-xs text-[#CBD5E1] font-medium">
                    Slow-Steamed with Desi Ghee
                  </span>
                </div>

                <h3
                  onClick={() => setActiveModalItem(greenPeasRice)}
                  className="font-display text-3xl sm:text-4xl font-black text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                >
                  {greenPeasRice.name}
                </h3>

                <p className="text-sm text-[#CBD5E1] font-normal leading-relaxed">
                  {greenPeasRice.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {greenPeasRice.tags.map((t, i) => (
                    <span key={i} className="text-[10px] text-[#F5CE68] bg-emerald-950/70 border border-[#D4AF37]/30 px-2.5 py-1 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalItem(greenPeasRice)}
                    className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Preparation</span>
                  </button>

                  <button
                    onClick={() => toggleDish({
                      id: greenPeasRice.id,
                      name: greenPeasRice.name,
                      category: greenPeasRice.category,
                      isVeg: true,
                    })}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                      isDishSelected(greenPeasRice.id)
                        ? 'bg-emerald-600 text-white'
                        : 'gold-gradient-btn text-[#041810] font-black'
                    }`}
                  >
                    {isDishSelected(greenPeasRice.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    <span>{isDishSelected(greenPeasRice.id) ? 'Selected' : 'Select Green Peas Rice'}</span>
                  </button>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Medium Features Grid: Paneer Punjabi / Hyderabadi & Navaratna Kurma */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Paneer Punjabi / Hyderabadi with Variant Toggle */}
            <TiltCard maxTilt={3}>
              <div className="rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 sm:p-8 flex flex-col justify-between h-full space-y-6 shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
                      Cottage Cheese Royal
                    </span>
                    {/* Variant Switch */}
                    <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-[#D4AF37]/30 text-xs">
                      <button
                        onClick={() => setPaneerVariant('punjabi')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all ${
                          paneerVariant === 'punjabi'
                            ? 'gold-gradient-btn text-[#041810] shadow'
                            : 'text-[#CBD5E1] hover:text-white'
                        }`}
                      >
                        Punjabi
                      </button>
                      <button
                        onClick={() => setPaneerVariant('hyderabadi')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all ${
                          paneerVariant === 'hyderabadi'
                            ? 'gold-gradient-btn text-[#041810] shadow'
                            : 'text-[#CBD5E1] hover:text-white'
                        }`}
                      >
                        Hyderabadi
                      </button>
                    </div>
                  </div>

                  {/* Active Variant Image & Info */}
                  <div
                    onClick={() => setActiveModalItem(paneerVariant === 'punjabi' ? paneerPunjabi : paneerHyderabadi)}
                    className="relative h-56 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/40"
                  >
                    <img
                      src={paneerVariant === 'punjabi' ? paneerPunjabi.image : paneerHyderabadi.image}
                      alt={paneerVariant === 'punjabi' ? paneerPunjabi.name : paneerHyderabadi.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-[10px] font-black uppercase">
                      {paneerVariant === 'punjabi' ? 'Tomato Cashew Makhani' : 'Mint & Poppy Green Curry'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-black text-white">
                      {paneerVariant === 'punjabi' ? paneerPunjabi.name : paneerHyderabadi.name}
                    </h3>
                    <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed font-normal">
                      {paneerVariant === 'punjabi' ? paneerPunjabi.description : paneerHyderabadi.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                  <span className="text-[11px] text-[#CBD5E1]">
                    Two royal preparation options available
                  </span>

                  <button
                    onClick={() => {
                      const cur = paneerVariant === 'punjabi' ? paneerPunjabi : paneerHyderabadi;
                      toggleDish({
                        id: cur.id,
                        name: cur.name,
                        category: cur.category,
                        isVeg: true,
                      });
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                      isDishSelected(paneerVariant === 'punjabi' ? paneerPunjabi.id : paneerHyderabadi.id)
                        ? 'bg-emerald-600 text-white'
                        : 'gold-gradient-btn text-[#041810] font-black'
                    }`}
                  >
                    {isDishSelected(paneerVariant === 'punjabi' ? paneerPunjabi.id : paneerHyderabadi.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select Paneer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </TiltCard>

            {/* Navaratna Kurma */}
            <TiltCard maxTilt={3}>
              <div className="rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 sm:p-8 flex flex-col justify-between h-full space-y-6 shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
                      Imperial Mughal
                    </span>
                    <span className="text-xs text-[#F5CE68] font-bold">
                      9 Jewels Harmony
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveModalItem(navaratnaKurma)}
                    className="relative h-56 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/40"
                  >
                    <img
                      src={navaratnaKurma.image}
                      alt={navaratnaKurma.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-[10px] font-black uppercase">
                      Mild & Nutty Kurma
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-black text-white">
                      Navaratna Kurma
                    </h3>
                    <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed font-normal">
                      {navaratnaKurma.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalItem(navaratnaKurma)}
                    className="text-xs text-[#F5CE68] hover:text-white font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Ingredients</span>
                  </button>

                  <button
                    onClick={() => toggleDish({
                      id: navaratnaKurma.id,
                      name: navaratnaKurma.name,
                      category: navaratnaKurma.category,
                      isVeg: true,
                    })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                      isDishSelected(navaratnaKurma.id)
                        ? 'bg-emerald-600 text-white'
                        : 'gold-gradient-btn text-[#041810] font-black'
                    }`}
                  >
                    {isDishSelected(navaratnaKurma.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select Kurma</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Supporting Dishes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {mainCourseSupporting.map((dish) => {
              const selected = isDishSelected(dish.id);
              return (
                <TiltCard key={dish.id} maxTilt={2}>
                  <div className="rounded-3xl bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/35 p-5 flex flex-col justify-between h-full shadow-sm">
                    <div>
                      <div
                        onClick={() => setActiveModalItem(dish)}
                        className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/30"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>

                      <div className="pt-4 space-y-1">
                        <h4
                          onClick={() => setActiveModalItem(dish)}
                          className="font-display font-bold text-lg text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h4>
                        <p className="text-xs text-[#CBD5E1] line-clamp-2 font-normal">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-[#D4AF37]/25 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalItem(dish)}
                        className="text-xs text-[#F5CE68] hover:text-white font-semibold"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => toggleDish({
                          id: dish.id,
                          name: dish.name,
                          category: dish.category,
                          isVeg: true,
                        })}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {selected ? 'Added' : 'Select'}
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ====================================================
            8. SWEET DESSERT (KHIR SAGAR, JALEBI / GULAB JAMUN, ICE CREAM)
            ==================================================== */}
        <section ref={dessertRef} className="space-y-6 scroll-mt-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
            <div>
              <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest">
                A delightful finish to your vegetarian feast
              </span>
              <h2 className="font-display text-3xl font-black text-white mt-0.5">
                SWEET DESSERT
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-[#D4AF37]/50 text-[#F5CE68] font-bold">
              3 Sweet Courses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Khir Sagar */}
            <TiltCard maxTilt={3}>
              <div className="rounded-3xl bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 flex flex-col justify-between h-full space-y-4 shadow-md">
                <div>
                  <div
                    onClick={() => setActiveModalItem(khirSagar)}
                    className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/40"
                  >
                    <img
                      src={khirSagar.image}
                      alt={khirSagar.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-[#D4AF37] text-[#041810]">
                      ODIA HERITAGE SWEET
                    </span>
                  </div>

                  <div className="pt-4 space-y-1.5">
                    <h3
                      onClick={() => setActiveModalItem(khirSagar)}
                      className="font-display font-bold text-xl text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                    >
                      {khirSagar.name}
                    </h3>
                    <p className="text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed font-normal">
                      {khirSagar.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalItem(khirSagar)}
                    className="text-xs text-[#F5CE68] hover:text-white font-semibold"
                  >
                    Inspect
                  </button>

                  <button
                    onClick={() => toggleDish({
                      id: khirSagar.id,
                      name: khirSagar.name,
                      category: khirSagar.category,
                      isVeg: true,
                    })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                      isDishSelected(khirSagar.id)
                        ? 'bg-emerald-600 text-white'
                        : 'gold-gradient-btn text-[#041810] font-black'
                    }`}
                  >
                    {isDishSelected(khirSagar.id) ? 'Selected' : 'Select Khir Sagar'}
                  </button>
                </div>
              </div>
            </TiltCard>

            {/* 2. Hot Jalebi / Gulab Jamun (Interactive Variant) */}
            <TiltCard maxTilt={3}>
              <div className="rounded-3xl bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 flex flex-col justify-between h-full space-y-4 shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase text-[#F5CE68]">
                      Warm Sweet Choice
                    </span>
                    <div className="flex items-center gap-1 bg-emerald-950/80 p-0.5 rounded-lg border border-[#D4AF37]/30 text-[11px]">
                      <button
                        onClick={() => setDessertVariant('jalebi')}
                        className={`px-2.5 py-1 rounded font-bold transition-all ${
                          dessertVariant === 'jalebi'
                            ? 'gold-gradient-btn text-[#041810] shadow-sm'
                            : 'text-[#CBD5E1] hover:text-white'
                        }`}
                      >
                        Jalebi
                      </button>
                      <button
                        onClick={() => setDessertVariant('gulab_jamun')}
                        className={`px-2.5 py-1 rounded font-bold transition-all ${
                          dessertVariant === 'gulab_jamun'
                            ? 'gold-gradient-btn text-[#041810] shadow-sm'
                            : 'text-[#CBD5E1] hover:text-white'
                        }`}
                      >
                        Jamun
                      </button>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveModalItem(dessertVariant === 'jalebi' ? hotJalebi : gulabJamun)}
                    className="relative h-44 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/40"
                  >
                    <img
                      src={dessertVariant === 'jalebi' ? hotJalebi.image : gulabJamun.image}
                      alt={dessertVariant === 'jalebi' ? hotJalebi.name : gulabJamun.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-950/90 border border-emerald-500 text-emerald-300">
                      SERVED WARM
                    </span>
                  </div>

                  <div className="pt-3 space-y-1">
                    <h3 className="font-display font-bold text-xl text-white">
                      {dessertVariant === 'jalebi' ? hotJalebi.name : gulabJamun.name}
                    </h3>
                    <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed font-normal">
                      {dessertVariant === 'jalebi' ? hotJalebi.description : gulabJamun.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                  <span className="text-[10px] text-[#94A3B8]">
                    Switch preparation anytime
                  </span>

                  <button
                    onClick={() => {
                      const cur = dessertVariant === 'jalebi' ? hotJalebi : gulabJamun;
                      toggleDish({
                        id: cur.id,
                        name: cur.name,
                        category: cur.category,
                        isVeg: true,
                      });
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                      isDishSelected(dessertVariant === 'jalebi' ? hotJalebi.id : gulabJamun.id)
                        ? 'bg-emerald-600 text-white'
                        : 'gold-gradient-btn text-[#041810] font-black'
                    }`}
                  >
                    {isDishSelected(dessertVariant === 'jalebi' ? hotJalebi.id : gulabJamun.id) ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </TiltCard>

            {/* 3. Ice Cream */}
            <TiltCard maxTilt={3}>
              <div className="rounded-3xl bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-6 flex flex-col justify-between h-full space-y-4 shadow-md">
                <div>
                  <div
                    onClick={() => setActiveModalItem(iceCreamDish)}
                    className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/40"
                  >
                    <img
                      src={iceCreamDish.image}
                      alt={iceCreamDish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-sky-950/90 border border-sky-400 text-sky-200">
                      CHILLED SCOOP
                    </span>
                  </div>

                  <div className="pt-4 space-y-1.5">
                    <h3
                      onClick={() => setActiveModalItem(iceCreamDish)}
                      className="font-display font-bold text-xl text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                    >
                      {iceCreamDish.name}
                    </h3>
                    <p className="text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed font-normal">
                      {iceCreamDish.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalItem(iceCreamDish)}
                    className="text-xs text-[#F5CE68] hover:text-white font-semibold"
                  >
                    Inspect
                  </button>

                  <button
                    onClick={() => toggleDish({
                      id: iceCreamDish.id,
                      name: iceCreamDish.name,
                      category: iceCreamDish.category,
                      isVeg: true,
                    })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                      isDishSelected(iceCreamDish.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-950/80 border border-[#D4AF37]/50 text-white hover:bg-emerald-900'
                    }`}
                  >
                    {isDishSelected(iceCreamDish.id) ? 'Selected' : 'Select Ice Cream'}
                  </button>
                </div>
              </div>
            </TiltCard>

          </div>
        </section>

        {/* ====================================================
            9. WATER BOTTLE SECTION (MINIMAL PREMIUM)
            ==================================================== */}
        <section ref={waterRef} className="space-y-6 scroll-mt-28">
          <TiltCard maxTilt={2}>
            <div className="rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#D4AF37]/40">
                  <img
                    src={waterBottleDish.image}
                    alt={waterBottleDish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                    Continuous Hospitality
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white">
                    WATER BOTTLE
                  </h3>
                  <p className="text-xs text-[#CBD5E1] max-w-xl font-normal leading-relaxed">
                    Hygienically packaged, crystal clear purified drinking water served continuously across banquet tables and buffet zones.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-full border border-emerald-500/50">
                  Included in Catering Setup
                </span>
              </div>
            </div>
          </TiltCard>
        </section>

        {/* ====================================================
            10. PAAN COUNTER SECTION (TRADITIONAL CELEBRATORY)
            ==================================================== */}
        <section ref={paanRef} className="space-y-6 scroll-mt-28">
          <TiltCard maxTilt={3}>
            <div className="rounded-[40px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 shadow-[0_24px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              <div
                onClick={() => setActiveModalItem(paanCounterDish)}
                className="relative w-full md:w-80 h-60 rounded-3xl overflow-hidden cursor-pointer group shrink-0 border border-[#D4AF37]/40"
              >
                <img
                  src={paanCounterDish.image}
                  alt={paanCounterDish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D4AF37] text-[#041810] text-[10px] font-black uppercase tracking-wider">
                  ROYAL FINALE
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
                  Traditional Touch
                </span>
                <h3
                  onClick={() => setActiveModalItem(paanCounterDish)}
                  className="font-display text-3xl font-black text-white hover:text-[#F5CE68] transition-colors cursor-pointer"
                >
                  PAAN COUNTER
                </h3>
                <p className="text-sm text-[#CBD5E1] font-normal leading-relaxed">
                  {paanCounterDish.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-[#F5CE68] font-bold">
                    Live Betel Leaf Attendant Counter
                  </span>

                  <button
                    onClick={() => toggleDish({
                      id: paanCounterDish.id,
                      name: paanCounterDish.name,
                      category: paanCounterDish.category,
                      isVeg: true,
                    })}
                    className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                      isDishSelected(paanCounterDish.id)
                        ? 'bg-emerald-600 text-white'
                        : 'gold-gradient-btn text-[#041810] font-black'
                    }`}
                  >
                    {isDishSelected(paanCounterDish.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isDishSelected(paanCounterDish.id) ? 'Selected' : 'Include Paan Lounge'}</span>
                  </button>
                </div>
              </div>
            </div>
          </TiltCard>
        </section>

        {/* ====================================================
            11. BOOKING CALL-TO-ACTION (INTEGRATED)
            ==================================================== */}
        <section className="text-center rounded-[40px] bg-[#041810]/90 backdrop-blur-2xl border border-[#D4AF37]/50 p-10 sm:p-16 shadow-[0_24px_70px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-xs font-bold text-emerald-300 uppercase tracking-widest shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dedicated Vegetarian Banquet Booking</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-black text-white">
            LOVE THIS VEG MENU?
          </h2>

          <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto font-normal leading-relaxed">
            Let us create a memorable vegetarian feast for your celebration with certified fresh ingredients, sacred preparation standards, and seamless hospitality.
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

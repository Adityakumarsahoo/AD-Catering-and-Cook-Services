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
} from 'lucide-react';

export const Packages: React.FC = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await api.getPackages();
        if (res.packages) setPackages(res.packages);
      } catch (err) {
        console.error('Failed to load packages:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

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
    description: 'Our most selected luxury spread with live starter counters, royal gravies, aromatic dum biryani, and artisanal desserts.',
    startersCount: 4,
    mainCourseCount: 8,
    dessertCount: 3,
    drinksCount: 2,
    staffIncluded: true,
    decorationOption: true,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    features: [
      '4 Live Counter Starters (Amritsari Fish + Chicken Tikka + Kebabs)',
      'Royal Odia Mutton Kasa or Rogan Josh',
      'Butter Chicken / Fish Besara',
      'Shahi Paneer + Mixed Veg Jalfrezi',
      'Dum Biryani + Fragrant Pulao',
      'Tandoori Roti, Naan & Kulcha',
      '3 Desserts (Chhena Poda + Rasmalai + Kulfi)',
      'Full Ceramic Crockery & Premium Linen',
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
      badge: 'POPULAR',
      cardStyle: 'glass-strong border-2 border-[#D4AF37] shadow-[0_25px_65px_rgba(0,0,0,0.6)] ring-2 ring-[#F5CE68]/40',
      image: premiumPkg.image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
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
            Transparent per-guest catering rates with full service crew, warming chafing buffet setup, and appetizing fresh preparations.
          </p>
        </div>

        {/* ====================================================
            RESPONSIVE 3-CARD GRID: BASIC (₹850), PREMIUM (₹950), DELUXE (₹1050)
            Desktop: 3 side-by-side | Mobile: Stacked vertically
            ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {corePackages.map((pkg, idx) => (
            <TiltCard key={pkg.id || idx} maxTilt={pkg.cleanName === 'PREMIUM' ? 4 : 3}>
              <div
                className={`relative rounded-[36px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 liquid-shine h-full ${pkg.cardStyle}`}
              >
                {/* Popular / VIP Badge */}
                {pkg.cleanName === 'PREMIUM' ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 z-20">
                    <Crown className="w-3.5 h-3.5" />
                    <span>POPULAR</span>
                  </div>
                ) : pkg.cleanName === 'DELUXE' ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-950 to-[#041810] text-[#FFDF73] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 z-20 border border-[#D4AF37]">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                    <span>VIP LUXURY</span>
                  </div>
                ) : null}

                <div>
                  {/* Warm, Appetizing Food Photography Header */}
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-6 border border-[#D4AF37]/40 shadow-sm">
                    <img
                      src={pkg.image}
                      alt={`${pkg.cleanName} Package Catering spread`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-[#F5CE68] px-3 py-1 rounded-full bg-[#041810]/85 backdrop-blur-md border border-[#D4AF37]/40">
                      {pkg.startersCount} Starters • {pkg.mainCourseCount} Mains
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {pkg.cleanName}
                  </h3>

                  <p className="text-xs text-[#CBD5E1] mt-2 min-h-[42px] leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Price Container with Viewport Entry Animation */}
                  <div className="my-6 pb-5 border-b border-[#D4AF37]/25 flex items-baseline gap-1.5">
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

                  {/* Included Delicacies Bullet Points */}
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
                </div>

                {/* Primary CTA Button */}
                <Link
                  to={`/booking?package=${encodeURIComponent(pkg.name)}`}
                  className={`w-full py-4 rounded-2xl text-xs font-black text-center block transition-all shadow-md active:scale-95 ${pkg.btnStyle}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Choose {pkg.cleanName} (₹{pkg.pricePerPerson})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </TiltCard>
          ))}
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
              We provide tailored banquet proposals with live Tandoor stations, authentic Odia sweet halwais, and customized multi-course menus.
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
    </div>
  );
};

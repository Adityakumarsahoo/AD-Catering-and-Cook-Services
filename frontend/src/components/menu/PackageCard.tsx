import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Crown,
  Award,
  CheckCircle2,
  ArrowRight,
  Eye,
  UtensilsCrossed,
  Users,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { TiltCard } from '../TiltCard.js';

export interface PackageCardProps {
  pkg: {
    id: string;
    name: string;
    pricePerPerson: number;
    description: string;
    menuTitle?: string;
    cardBadge?: string;
    menuItemsCount?: number;
    image?: string;
    popular?: boolean;
    packageInclusions?: string[];
    signatureHighlights?: string[];
    features?: string[];
    startersCount?: number;
    mainCourseCount?: number;
    dessertCount?: number;
    drinksCount?: number;
    staffIncluded?: boolean;
  };
  isSelected?: boolean;
  onSelectPackage: (pkg: any) => void;
  onViewDetails: (pkg: any) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  isSelected = false,
  onSelectPackage,
  onViewDetails,
}) => {
  const isBasic = pkg.name.toUpperCase().includes('BASIC');
  const isPremium = pkg.name.toUpperCase().includes('PREMIUM');
  const isDeluxe = pkg.name.toUpperCase().includes('DELUXE');

  // Package category label
  const categoryLabel = isPremium
    ? 'Royal Grand Wedding Feast'
    : isDeluxe
    ? 'VIP Luxury Banquet Collection'
    : 'Classic Traditional Banquet';

  // Dish count from data or fallback calculation
  const totalDishes =
    pkg.menuItemsCount ||
    (isBasic ? 29 : isDeluxe ? 44 : isPremium ? 36 : 30);

  // Default images for package cards
  const cardImage =
    pkg.image ||
    (isBasic
      ? '/images/luxury-buffet-setup.jpg'
      : isDeluxe
      ? 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80');

  // Key course count summary
  const starterCount = pkg.startersCount || (isBasic ? 2 : isDeluxe ? 6 : 8);
  const mainCount = pkg.mainCourseCount || (isBasic ? 4 : isDeluxe ? 12 : 11);
  const dessertCount = pkg.dessertCount || (isBasic ? 1 : isDeluxe ? 4 : 4);
  const drinksCount = pkg.drinksCount || (isBasic ? 1 : isDeluxe ? 3 : 5);

  return (
    <TiltCard maxTilt={isPremium ? 3 : 2}>
      <div
        className={`relative rounded-[32px] sm:rounded-[38px] p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-500 h-full liquid-shine ${
          isPremium
            ? 'bg-gradient-to-b from-[#062B1D]/95 via-[#031910]/95 to-[#020F0A]/95 border-2 border-[#D4AF37] shadow-[0_25px_65px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.25)] ring-2 ring-[#FFDF73]/40'
            : isDeluxe
            ? 'bg-gradient-to-b from-[#052418]/90 via-[#03170F]/90 to-[#020F0A]/90 border-2 border-[#FFDF73]/70 shadow-[0_20px_55px_rgba(0,0,0,0.7)] hover:border-[#FFDF73]'
            : 'bg-gradient-to-b from-[#041E14]/90 via-[#02130C]/90 to-[#020D08]/90 border border-[#D4AF37]/50 shadow-[0_16px_45px_rgba(0,0,0,0.6)] hover:border-[#D4AF37]/80'
        } ${isSelected ? 'ring-4 ring-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.45)]' : ''}`}
      >
        {/* Shimmering Top Hairline Gold Edge */}
        <div
          className={`absolute top-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent pointer-events-none ${
            isPremium ? 'opacity-100' : 'opacity-70'
          }`}
        />

        {/* Ambient Glow for Premium Package */}
        {isPremium && (
          <div className="absolute -top-10 left-1/4 w-1/2 h-20 bg-[#D4AF37]/25 rounded-full blur-2xl pointer-events-none" />
        )}

        {/* Top Badges */}
        {isPremium ? (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#D4AF37] text-[#041810] text-[10.5px] font-black uppercase tracking-[0.16em] shadow-[0_4px_16px_rgba(212,175,55,0.5)] flex items-center gap-1.5 z-20 whitespace-nowrap">
            <Crown className="w-3.5 h-3.5 fill-[#041810]" />
            <span>Most Popular • Royal Wedding Feast</span>
          </div>
        ) : isDeluxe ? (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-950 via-[#041810] to-emerald-950 text-[#FFDF73] text-[10.5px] font-black uppercase tracking-[0.16em] shadow-md flex items-center gap-1.5 z-20 border border-[#FFDF73]/80 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-[#FFDF73]" />
            <span>VIP Luxury • 44 Delicacies</span>
          </div>
        ) : isBasic ? (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-950 via-[#041810] to-emerald-950 text-[#F5CE68] text-[10.5px] font-black uppercase tracking-[0.16em] shadow-md flex items-center gap-1.5 z-20 border border-[#D4AF37]/60 whitespace-nowrap">
            <Award className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Classic Tier • Normal Menu</span>
          </div>
        ) : null}

        {/* Top Content: Image & Titles */}
        <div>
          {/* Package Food Photography Header */}
          <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 border border-[#D4AF37]/40 shadow-lg group bg-black/40">
            <img
              src={cardImage}
              alt={`${pkg.name} Catering Banquet`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/90 via-[#020D08]/30 to-transparent" />

            {/* In-Image Dish Counter Capsule */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-[#F5CE68] px-3.5 py-1.5 rounded-full bg-[#041810]/95 backdrop-blur-md border border-[#D4AF37]/50 shadow-md">
              <span className="flex items-center gap-1.5 text-[11.5px] font-black text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                <span>{totalDishes} Delicacies Included</span>
              </span>
              <span className="text-[10px] text-[#F5CE68] font-bold uppercase tracking-wider">
                9 Counters
              </span>
            </div>
          </div>

          {/* Category Tag */}
          <div className="mb-2">
            <span className="text-[10px] sm:text-[10.5px] font-black uppercase tracking-[0.2em] text-[#F5CE68] inline-block">
              {categoryLabel}
            </span>
          </div>

          {/* Package Name */}
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight drop-shadow-sm">
            {pkg.name}
          </h3>

          {/* Price Per Person Display */}
          <div className="mt-3.5 mb-4 p-3.5 rounded-2xl bg-[#03150D]/90 border border-[#D4AF37]/40 flex items-center justify-between shadow-inner gap-2">
            <div className="flex items-baseline gap-1.5 shrink-0 whitespace-nowrap">
              <span className="font-display font-black text-2xl sm:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9D2] via-[#FFDF73] to-[#D4AF37] whitespace-nowrap">
                ₹{typeof pkg.pricePerPerson === 'number' ? pkg.pricePerPerson.toLocaleString('en-IN') : pkg.pricePerPerson}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#CBD5E1] whitespace-nowrap">
                / person
              </span>
            </div>
            <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#A7F3D0] bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
              Transparent Rate
            </span>
          </div>

          {/* Package Short Description */}
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed font-normal min-h-[42px]">
            {pkg.description}
          </p>

          {/* Breakdown Pills: Starters • Mains • Desserts • Drinks */}
          <div className="grid grid-cols-4 gap-1.5 py-3.5 my-3.5 border-y border-[#D4AF37]/25 text-center text-[10.5px]">
            <div className="p-1.5 rounded-xl bg-black/25 border border-white/5">
              <span className="block font-black text-[#FFDF73] text-sm">
                {starterCount}
              </span>
              <span className="text-[9.5px] text-[#94A3B8] uppercase">Starters</span>
            </div>
            <div className="p-1.5 rounded-xl bg-black/25 border border-white/5">
              <span className="block font-black text-[#FFDF73] text-sm">
                {mainCount}
              </span>
              <span className="text-[9.5px] text-[#94A3B8] uppercase">Mains</span>
            </div>
            <div className="p-1.5 rounded-xl bg-black/25 border border-white/5">
              <span className="block font-black text-[#FFDF73] text-sm">
                {dessertCount}
              </span>
              <span className="text-[9.5px] text-[#94A3B8] uppercase">Desserts</span>
            </div>
            <div className="p-1.5 rounded-xl bg-black/25 border border-white/5">
              <span className="block font-black text-[#FFDF73] text-sm">
                {drinksCount}
              </span>
              <span className="text-[9.5px] text-[#94A3B8] uppercase">Drinks</span>
            </div>
          </div>

          {/* Key Inclusions Highlights */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs text-[#E2E8F0]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Uniformed Executive Service Stewards</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#E2E8F0]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Commercial Warming Chafing Buffet Setup</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#E2E8F0]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                {isPremium
                  ? 'Banarasi Paan & Packaged Mineral Water'
                  : isDeluxe
                  ? 'Fruit Carving Counter & Mineral Water'
                  : 'Mineral Water & Traditional Paan'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions: View Full Menu + View Details + Book Package */}
        <div className="space-y-2.5 pt-3 border-t border-[#D4AF37]/30">
          <div className="grid grid-cols-2 gap-2">
            {/* View Full Menu Button */}
            <button
              onClick={() => onSelectPackage(pkg)}
              className={`py-3 px-3 rounded-2xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
                isPremium
                  ? 'gold-gradient-btn text-[#041810]'
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] hover:brightness-110'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>View Full Menu</span>
            </button>

            {/* View Package Details Button */}
            <button
              onClick={() => onViewDetails(pkg)}
              className="py-3 px-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span>Package Details</span>
            </button>
          </div>

          {/* Book / Enquiry CTA Button */}
          <Link
            to={`/booking?package=${encodeURIComponent(pkg.name)}`}
            className="w-full py-2.5 px-4 rounded-2xl bg-[#06291C]/90 hover:bg-[#083827] border border-[#D4AF37]/40 text-xs font-bold text-[#E2E8F0] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm active:scale-95"
          >
            <span>Book / Enquire for {pkg.name}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F5CE68] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
};

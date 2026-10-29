import React from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  ChefHat,
  ShieldCheck,
  Crown,
  Heart,
  Sparkles,
  ArrowRight,
  CalendarPlus,
  PhoneCall,
  Award,
  Flame,
  CheckCircle2,
  MapPin,
  Clock,
} from 'lucide-react';
import { ADBrandEmblem } from './ADBrandEmblem.js';
import { BUSINESS_CONFIG } from '../config/cateringConfig.js';

interface CateringHeroBannerProps {
  onOpenBooking?: () => void;
  className?: string;
}

export const CateringHeroBanner: React.FC<CateringHeroBannerProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-3xl sm:rounded-[44px] overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(212,175,55,0.18)] bg-[#041810] liquid-shine ${className}`}
    >
      {/* ====================================================
          1. CINEMATIC BACKGROUND: ROYAL EMERALD & GOLD AMBIENCE
          ==================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep emerald radiant base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06291C] via-[#03170E] to-[#010B06]" />
        
        {/* Radial ambient emerald wash in center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.22)_0%,transparent_70%)]" />

        {/* Volumetric Warm Golden Sunlight Rays from Top Center */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(253,230,138,0.22)_0%,rgba(212,175,55,0.1)_45%,transparent_75%)] blur-3xl" />

        {/* Specular Top Golden Edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent" />

        {/* Ornate Golden Filigree Frame Corners */}
        <svg className="absolute top-3 left-3 w-16 h-16 sm:w-24 sm:h-24 text-[#D4AF37] opacity-80" viewBox="0 0 100 100" fill="none">
          <path d="M10 90 L10 20 C10 14 14 10 20 10 L90 10" stroke="currentColor" strokeWidth="2" />
          <path d="M18 90 L18 26 C18 21 21 18 26 18 L90 18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="10" cy="10" r="5" fill="currentColor" />
          <path d="M25 25 C35 15 45 25 35 35 C25 45 15 35 25 25 Z" fill="currentColor" fillOpacity="0.4" />
        </svg>

        <svg className="absolute top-3 right-3 w-16 h-16 sm:w-24 sm:h-24 text-[#D4AF37] opacity-80 transform -scale-x-100" viewBox="0 0 100 100" fill="none">
          <path d="M10 90 L10 20 C10 14 14 10 20 10 L90 10" stroke="currentColor" strokeWidth="2" />
          <path d="M18 90 L18 26 C18 21 21 18 26 18 L90 18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="10" cy="10" r="5" fill="currentColor" />
          <path d="M25 25 C35 15 45 25 35 35 C25 45 15 35 25 25 Z" fill="currentColor" fillOpacity="0.4" />
        </svg>

        <svg className="absolute bottom-3 left-3 w-16 h-16 sm:w-24 sm:h-24 text-[#D4AF37] opacity-60 transform -scale-y-100" viewBox="0 0 100 100" fill="none">
          <path d="M10 90 L10 20 C10 14 14 10 20 10 L90 10" stroke="currentColor" strokeWidth="2" />
          <path d="M18 90 L18 26 C18 21 21 18 26 18 L90 18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="10" cy="10" r="5" fill="currentColor" />
        </svg>

        <svg className="absolute bottom-3 right-3 w-16 h-16 sm:w-24 sm:h-24 text-[#D4AF37] opacity-60 transform -scale-x-100 -scale-y-100" viewBox="0 0 100 100" fill="none">
          <path d="M10 90 L10 20 C10 14 14 10 20 10 L90 10" stroke="currentColor" strokeWidth="2" />
          <path d="M18 90 L18 26 C18 21 21 18 26 18 L90 18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="10" cy="10" r="5" fill="currentColor" />
        </svg>

        {/* Ambient Corner Leaves Vignette */}
        <div className="absolute top-0 left-0 w-44 h-44 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.3)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.3)_0%,transparent_70%)]" />
      </div>

      {/* ====================================================
          2. MAJESTIC ROYAL BANNER CENTERPIECE CONTENT
          ==================================================== */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 text-center max-w-5xl mx-auto space-y-5 sm:space-y-6">
        
        {/* Top Tagline Ribbon */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/95 via-[#0A2E20] to-emerald-950/95 border border-[#D4AF37]/70 text-xs sm:text-sm font-black tracking-widest text-[#F5CE68] uppercase shadow-[0_4px_25px_rgba(212,175,55,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
            <span>ROYAL HOSPITALITY & BANQUET EXCELLENCE • ODISHA</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
          </div>
        </div>

        {/* 3D Royal AD Emblem with Golden Halo */}
        <div className="flex justify-center relative">
          <div className="absolute inset-0 max-w-[180px] mx-auto bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="transform hover:scale-105 transition-transform duration-500 drop-shadow-[0_12px_35px_rgba(212,175,55,0.35)]">
            <ADBrandEmblem size="lg" showText={false} />
          </div>
        </div>

        {/* Main Brand Title & Typography */}
        <div className="space-y-2">
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF6D6] via-[#FFDF73] via-[#D4AF37] to-[#B8860B] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            AD Catering
          </h1>
          <p className="font-serif italic text-xl sm:text-3xl text-[#F5CE68] tracking-widest">
            and Cook Services
          </p>
        </div>

        {/* Slogan Ribbon with Golden Flourishes */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-base font-semibold text-[#FAF8F5]">
          <span className="h-[1.5px] w-8 sm:w-20 bg-gradient-to-r from-transparent via-[#F5CE68] to-[#D4AF37]" />
          <span className="italic tracking-wider flex items-center gap-2 text-center text-[#FFF1B8]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5CE68] hidden sm:inline" />
            <span>Delicious Food for Every Special Occasion</span>
            <Heart className="w-4 h-4 text-[#F5CE68] fill-[#F5CE68] inline shrink-0 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-[#F5CE68] hidden sm:inline" />
          </span>
          <span className="h-[1.5px] w-8 sm:w-20 bg-gradient-to-l from-transparent via-[#F5CE68] to-[#D4AF37]" />
        </div>

        {/* Narrative Prestige Statement */}
        <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed font-normal">
          Odisha’s Premier Choice for Grand Royal Weddings, Authentic Heritage Bhojis, Live LED Buffet Counters & Certified In-Home Master Cook Services.
        </p>

        {/* ====================================================
            3. THE 4 PILLARS OF ROYAL HOSPITALITY (LUXURY JEWELS - NO PRICES)
            ==================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
          
          {/* Pillar 1: Quality Food */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#062D1F]/90 via-[#031C13]/90 to-[#02100A] border border-[#D4AF37]/50 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex flex-col items-center text-center space-y-2 hover:border-[#F5CE68] hover:bg-emerald-950/80 transition-all group liquid-shine">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#B8860B] via-[#F5CE68] to-[#FFDF73] flex items-center justify-center text-[#041810] shadow-[0_4px_14px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-[#041810]" />
            </div>
            <span className="text-xs font-black text-[#F5CE68] tracking-wider uppercase">
              Quality Royal Food
            </span>
            <span className="text-[10px] text-[#CBD5E1] leading-tight">
              Authentic Taste & Fresh Ingredients
            </span>
          </div>

          {/* Pillar 2: Experienced Cooks */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#062D1F]/90 via-[#031C13]/90 to-[#02100A] border border-[#D4AF37]/50 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex flex-col items-center text-center space-y-2 hover:border-[#F5CE68] hover:bg-emerald-950/80 transition-all group liquid-shine">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#B8860B] via-[#F5CE68] to-[#FFDF73] flex items-center justify-center text-[#041810] shadow-[0_4px_14px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
              <ChefHat className="w-5 h-5 text-[#041810]" />
            </div>
            <span className="text-xs font-black text-[#F5CE68] tracking-wider uppercase">
              Master Cook Team
            </span>
            <span className="text-[10px] text-[#CBD5E1] leading-tight">
              Certified Halwais & Private Chefs
            </span>
          </div>

          {/* Pillar 3: Hygienic Ingredients */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#062D1F]/90 via-[#031C13]/90 to-[#02100A] border border-[#D4AF37]/50 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex flex-col items-center text-center space-y-2 hover:border-[#F5CE68] hover:bg-emerald-950/80 transition-all group liquid-shine">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#16A34A] via-[#22C55E] to-[#4ADE80] flex items-center justify-center text-[#041810] shadow-[0_4px_14px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5 text-[#041810]" />
            </div>
            <span className="text-xs font-black text-[#4ADE80] tracking-wider uppercase">
              100% Purity & Hygiene
            </span>
            <span className="text-[10px] text-[#CBD5E1] leading-tight">
              Pure Desi Ghee & Sanitized Prep
            </span>
          </div>

          {/* Pillar 4: Bespoke Grand Banquets (NO PRICE) */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#062D1F]/90 via-[#031C13]/90 to-[#02100A] border border-[#D4AF37]/50 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex flex-col items-center text-center space-y-2 hover:border-[#F5CE68] hover:bg-emerald-950/80 transition-all group liquid-shine">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#B8860B] via-[#F5CE68] to-[#FFDF73] flex items-center justify-center text-[#041810] shadow-[0_4px_14px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
              <Crown className="w-5 h-5 text-[#041810]" />
            </div>
            <span className="text-xs font-black text-[#F5CE68] tracking-wider uppercase">
              Bespoke Banquets
            </span>
            <span className="text-[10px] text-[#CBD5E1] leading-tight">
              Tailored for 25 to 5,000+ Guests
            </span>
          </div>

        </div>

        {/* ====================================================
            4. LIVE PRESTIGE STATS & TRUST STRIP
            ==================================================== */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#03170E]/85 border border-[#D4AF37]/35 shadow-inner backdrop-blur-md flex flex-wrap items-center justify-around gap-3 text-xs sm:text-sm font-bold text-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#F5CE68] shrink-0" />
            <span><strong className="text-[#F5CE68]">500+</strong> Grand Banquets</span>
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-[#D4AF37]/40" />

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#F5CE68] shrink-0" />
            <span><strong className="text-[#F5CE68]">15+</strong> Years Master Experience</span>
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-[#D4AF37]/40" />

          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong className="text-emerald-400">100%</strong> Live On-Site Cooking</span>
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-[#D4AF37]/40" />

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span className="text-[#CBD5E1]">Bhubaneswar • Cuttack • Puri & Odisha</span>
          </div>
        </div>

        {/* ====================================================
            5. QUICK ACTION CTA BUTTONS & HOTLINE
            ==================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full">
          <Link
            to="/booking"
            className="w-full sm:w-auto justify-center px-8 py-4 rounded-2xl gold-gradient-btn text-xs sm:text-sm font-black text-[#041810] shadow-[0_10px_30px_rgba(212,175,55,0.45)] flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all text-center group"
          >
            <CalendarPlus className="w-4 h-4 shrink-0 text-[#041810]" />
            <span>Reserve Your Event Date</span>
            <ArrowRight className="w-4 h-4 shrink-0 text-[#041810] group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            to="/menu"
            className="w-full sm:w-auto justify-center px-7 py-4 rounded-2xl bg-emerald-950/80 border border-[#D4AF37]/60 text-xs sm:text-sm font-bold text-[#F5CE68] hover:bg-emerald-900 hover:text-white shadow-md transition-all text-center flex items-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#F5CE68] shrink-0" />
            <span>Explore Banquet Menu</span>
          </Link>

          <a
            href={BUSINESS_CONFIG.phoneTel}
            className="w-full sm:w-auto justify-center px-6 py-4 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/40 text-xs font-bold text-[#CBD5E1] hover:text-[#F5CE68] hover:border-[#D4AF37] shadow-sm transition-all text-center flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Talk to Team: {BUSINESS_CONFIG.phoneFormatted}</span>
          </a>
        </div>

      </div>
    </div>
  );
};

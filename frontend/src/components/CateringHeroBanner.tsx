import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  ChefHat,
  Leaf,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  Flame,
  CalendarPlus,
} from 'lucide-react';
import { ADBrandEmblem } from './ADBrandEmblem.js';

interface CateringHeroBannerProps {
  onOpenBooking?: () => void;
  className?: string;
}

export const CateringHeroBanner: React.FC<CateringHeroBannerProps> = ({
  className = '',
}) => {
  const [rightCardMode, setRightCardMode] = useState<'LIGHT_TABLE' | 'FEAST'>('LIGHT_TABLE');
  return (
    <div
      className={`relative rounded-3xl sm:rounded-[44px] overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_30px_90px_rgba(0,0,0,0.7)] bg-[#041810] liquid-shine ${className}`}
    >
      {/* ====================================================
          1. CINEMATIC BACKGROUND: DEEP ROYAL EMERALD GREEN VIGNETTE
          ==================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep emerald radiant gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06291C] via-[#041810] to-[#020D08]" />
        
        {/* Radial ambient emerald wash */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.18)_0%,transparent_65%)]" />

        {/* Volumetric Warm Golden Sunlight Rays streaming from top-right */}
        <div className="absolute -top-10 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(253,230,138,0.22)_0%,rgba(212,175,55,0.08)_45%,transparent_75%)] transform rotate-12 blur-2xl" />

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

        {/* Overhead lush green leaves silhouette in corners */}
        <div className="absolute top-0 left-0 w-36 h-36 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.35)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.35)_0%,transparent_70%)]" />
      </div>

      {/* ====================================================
          2. BANNER COMPOSITION (Left: Chafing Dishes | Center: Emblem & Badges | Right: Indian Feast)
          ==================================================== */}
      <div className="relative z-10 px-5 sm:px-10 py-10 sm:py-14">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <span className="px-5 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/90 via-[#0A2E20] to-emerald-950/90 border border-[#D4AF37]/60 text-xs sm:text-sm font-black tracking-widest text-[#F5CE68] uppercase shadow-[0_4px_20px_rgba(212,175,55,0.25)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
            <span>ROYAL HOSPITALITY & BANQUET EXCELLENCE</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
          </span>
        </div>

        {/* Main 3-Column Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT WING: Golden Chafing Dishes Buffet with Steam */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col items-center lg:items-start space-y-3">
            <div className="relative w-full max-w-[260px] h-48 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
                alt="Golden Buffet Chafing Dishes with Live Steam"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041810] via-[#041810]/40 to-transparent" />
              
              {/* Golden corner badge */}
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#041810]/85 border border-[#D4AF37] text-[10px] font-black text-[#F5CE68] uppercase tracking-wider flex items-center gap-1 shadow">
                <Flame className="w-3 h-3 text-[#FFDF73]" />
                <span>Live Buffet Setup</span>
              </span>

              {/* Steam text */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-xs font-bold text-white drop-shadow">Golden Chafing Warmers</p>
                <p className="text-[10px] text-emerald-300">Piping Hot & Hygienic</p>
              </div>
            </div>
            <p className="text-[11px] text-[#CBD5E1] text-center lg:text-left max-w-[240px]">
              Polished brass & gold chafing dishes with live flame warming for weddings and gala banquets.
            </p>
          </div>

          {/* CENTER CORE: 3D AD Emblem, Slogan, and 4 Badges */}
          <div className="lg:col-span-6 order-1 lg:order-2 text-center space-y-6">
            
            {/* The 3D Emblem with Gold Rings & Chef Hat */}
            <div className="flex justify-center transform hover:scale-105 transition-transform duration-500">
              <ADBrandEmblem size="lg" showText={false} />
            </div>

            {/* Main Brand Title & Typography */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF1B8] via-[#FFDF73] via-[#D4AF37] to-[#B8860B] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                AD Catering
              </h1>
              <p className="font-serif italic text-base sm:text-xl text-[#F5CE68] tracking-wider">
                and Cook Services
              </p>
            </div>

            {/* Authentic Slogan with Heart: "Delicious Food for Every Special Occasion" */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-base font-semibold text-[#FAF8F5] pt-1">
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="italic tracking-wide flex items-center gap-1.5 text-center">
                <span>Delicious Food for Every Special Occasion</span>
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5CE68] fill-[#F5CE68] inline shrink-0" />
              </span>
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            {/* THE 4 PILLARS / BADGES matching 'Elegant Green and Gold Catering Banner (1).png' */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-4">
              
              {/* Badge 1: Quality Food */}
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/50 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-1.5 hover:border-[#F5CE68] hover:bg-emerald-950/80 transition-all group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow group-hover:scale-110 transition-transform">
                  <UtensilsCrossed className="w-4 h-4 text-[#041810]" />
                </div>
                <span className="text-[11px] font-black text-[#F5CE68] tracking-wider uppercase">
                  Quality Food
                </span>
                <span className="text-[9px] text-[#94A3B8]">Fresh & Delicious</span>
              </div>

              {/* Badge 2: Experienced Cooks */}
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/50 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-1.5 hover:border-[#F5CE68] hover:bg-emerald-950/80 transition-all group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow group-hover:scale-110 transition-transform">
                  <ChefHat className="w-4 h-4 text-[#041810]" />
                </div>
                <span className="text-[11px] font-black text-[#F5CE68] tracking-wider uppercase">
                  Experienced Cooks
                </span>
                <span className="text-[9px] text-[#94A3B8]">Master Halwai & Chefs</span>
              </div>

              {/* Badge 3: Hygienic Ingredients */}
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/50 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-1.5 hover:border-[#F5CE68] hover:bg-emerald-950/80 transition-all group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#16A34A] to-[#4ADE80] flex items-center justify-center text-[#041810] shadow group-hover:scale-110 transition-transform">
                  <Leaf className="w-4 h-4 text-[#041810]" />
                </div>
                <span className="text-[11px] font-black text-[#4ADE80] tracking-wider uppercase">
                  Hygienic Ingredients
                </span>
                <span className="text-[9px] text-[#94A3B8]">100% Pure & Clean</span>
              </div>

              {/* Badge 4: Affordable Packages */}
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/50 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-1.5 hover:border-[#F5CE68] hover:bg-emerald-950/80 transition-all group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow group-hover:scale-110 transition-transform">
                  <Users className="w-4 h-4 text-[#041810]" />
                </div>
                <span className="text-[11px] font-black text-[#F5CE68] tracking-wider uppercase">
                  Affordable Packages
                </span>
                <span className="text-[9px] text-[#94A3B8]">From ₹850/person</span>
              </div>

            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 w-full">
              <Link
                to="/booking"
                className="w-full sm:w-auto justify-center px-7 py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-[0_8px_25px_rgba(212,175,55,0.4)] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-center"
              >
                <CalendarPlus className="w-4 h-4 shrink-0" />
                <span>Reserve Your Event Date</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>

              <Link
                to="/menu"
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-2xl bg-emerald-950/80 border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] hover:bg-emerald-900 hover:text-white shadow-md transition-all text-center"
              >
                <span>Explore Banquet Menu</span>
              </Link>
            </div>
          </div>

          {/* RIGHT WING: Royal Light Table / Banana Leaf Wedding Feast */}
          <div className="lg:col-span-3 order-3 flex flex-col items-center lg:items-end space-y-3">
            {/* Mode Switcher Pill */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 shadow-md">
              <button
                type="button"
                onClick={() => setRightCardMode('LIGHT_TABLE')}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-all ${
                  rightCardMode === 'LIGHT_TABLE'
                    ? 'gold-gradient-btn text-[#041810] shadow'
                    : 'text-[#CBD5E1] hover:text-[#F5CE68]'
                }`}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>Light Table</span>
              </button>
              <button
                type="button"
                onClick={() => setRightCardMode('FEAST')}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-all ${
                  rightCardMode === 'FEAST'
                    ? 'gold-gradient-btn text-[#041810] shadow'
                    : 'text-[#CBD5E1] hover:text-[#F5CE68]'
                }`}
              >
                <Leaf className="w-2.5 h-2.5" />
                <span>Odia Feast</span>
              </button>
            </div>

            <div className="relative w-full max-w-[260px] h-48 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.25)] group">
              {rightCardMode === 'LIGHT_TABLE' ? (
                <>
                  <img
                    src="/images/royal-led-light-table.jpg"
                    alt="Royal LED Light Table & Illuminated Banquet Buffet"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041810] via-[#041810]/40 to-transparent" />

                  {/* Golden corner badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37] text-[10px] font-black text-[#F5CE68] uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#FFDF73] animate-pulse" />
                    <span>Live Light Table</span>
                  </span>

                  {/* Light table text */}
                  <div className="absolute bottom-3 left-3 right-3 text-right">
                    <p className="text-xs font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      Royal LED Light Table
                    </p>
                    <p className="text-[10px] text-[#F5CE68] font-medium">
                      Ice-Glass & Neon Ambience
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src="/images/odia-feast-catering.jpg"
                    alt="Authentic Royal Odia Banana Leaf Wedding Feast"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041810] via-[#041810]/40 to-transparent" />

                  {/* Golden corner badge */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37] text-[10px] font-black text-[#F5CE68] uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Leaf className="w-3 h-3 text-[#4ADE80]" />
                    <span>Banana Leaf Feast</span>
                  </span>

                  {/* Feast text */}
                  <div className="absolute bottom-3 left-3 right-3 text-right">
                    <p className="text-xs font-bold text-white drop-shadow">
                      Odia Feast Catering
                    </p>
                    <p className="text-[10px] text-[#F5CE68]">
                      Dalma, Mutton Kasa, Ghee Anna
                    </p>
                  </div>
                </>
              )}
            </div>

            <p className="text-[11px] text-[#CBD5E1] text-center lg:text-right max-w-[240px]">
              {rightCardMode === 'LIGHT_TABLE'
                ? 'Illuminated LED glass buffet tables & glowing reception counters for evening gala celebrations.'
                : 'Traditional authentic feast with hot fragrant ghee anna, Dalma, and earthenware handi service.'}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

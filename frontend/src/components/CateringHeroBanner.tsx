import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarPlus,
  UtensilsCrossed,
  PhoneCall,
  ArrowRight,
  Maximize2,
  X,
  ChefHat,
  Sparkles,
  Crown,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/cateringConfig.js';

interface CateringHeroBannerProps {
  onOpenBooking?: () => void;
  className?: string;
}

export const CateringHeroBanner: React.FC<CateringHeroBannerProps> = ({
  className = '',
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ====================================================
          1. CINEMATIC MASTER BANNER (16:9 PROPORTION MATCHING IMAGE 1)
          ==================================================== */}
      <div className="relative rounded-3xl sm:rounded-[40px] p-[2px] bg-gradient-to-b from-[#F5CE68]/70 via-[#D4AF37]/40 to-[#B8860B]/70 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(212,175,55,0.22)] overflow-hidden group">
        
        {/* Specular Ambient Halo */}
        <div className="absolute -inset-1 rounded-[42px] bg-gradient-to-tr from-[#D4AF37]/20 via-emerald-500/10 to-[#D4AF37]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />

        {/* Main 16:9 Banner Image Container */}
        <div 
          className="relative w-full aspect-video rounded-[28px] sm:rounded-[38px] overflow-hidden bg-[#03150E] select-none"
          style={{ aspectRatio: '16/9' }}
        >
          {/* Master Graphic Artwork (Matches User's Master Poster Exactly) */}
          <img
            src="/images/hero-master-banner.jpg"
            alt="AD Catering and Cook Services - Royal Hospitality & Banquet Excellence Odisha"
            className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
          />

          {/* Subtle Cinematic Shimmer Sweep Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* ====================================================
              2. UNIQUE INTERACTIVE HOTSPOTS & HOVER ZONES
              ==================================================== */}
          
          {/* Hotspot 1: Master Cook Team (Top-Left) */}
          <Link
            to="/cook-services"
            onMouseEnter={() => setActiveTooltip('Explore Master Cook Services')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[6%] left-[2%] w-[29%] h-[40%] rounded-2xl sm:rounded-3xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer z-20"
            title="Explore Master Cook Services"
          >
            <span className="sr-only">Master Cook Team - Authentic Taste & Professional Chefs</span>
          </Link>

          {/* Hotspot 2: Live LED Buffet (Bottom-Left) */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('Explore Live LED Buffet Counters')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[48%] left-[0.5%] w-[29%] h-[35%] rounded-2xl sm:rounded-3xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer z-20"
            title="Explore Live LED Buffet Counters"
          >
            <span className="sr-only">Live LED Buffet - A Royal Dining Experience</span>
          </Link>

          {/* Hotspot 3: Royal Banquets (Top-Right) */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('Explore Grand Wedding Banquets')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[6%] right-[2%] w-[29%] h-[40%] rounded-2xl sm:rounded-3xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer z-20"
            title="Explore Royal Wedding Banquets"
          >
            <span className="sr-only">Royal Banquets - For Your Grand Celebrations</span>
          </Link>

          {/* Hotspot 4: Quality Royal Food (Bottom-Right) */}
          <Link
            to="/menu"
            onMouseEnter={() => setActiveTooltip('Explore Gourmet Royal Menu')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[48%] right-[0.5%] w-[29%] h-[35%] rounded-2xl sm:rounded-3xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer z-20"
            title="Explore Gourmet Royal Menu"
          >
            <span className="sr-only">Quality Royal Food - Authentic Taste & Fresh Ingredients</span>
          </Link>

          {/* Hotspot 5: Center Brand Logo / Booking */}
          <Link
            to="/booking"
            onMouseEnter={() => setActiveTooltip('Book Your Celebration With AD Catering')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[8%] left-[40%] w-[20%] h-[32%] rounded-full hover:ring-2 hover:ring-[#F5CE68]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all cursor-pointer z-20"
            title="Book Your Event Date"
          >
            <span className="sr-only">AD Catering and Cook Services</span>
          </Link>

          {/* Floating Interactive Tooltip Pill */}
          {activeTooltip && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#041810]/95 border border-[#D4AF37] text-[11px] font-black uppercase tracking-wider text-[#F5CE68] shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md z-30 pointer-events-none flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
              <Sparkles className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
              <span>{activeTooltip}</span>
            </div>
          )}

          {/* Fullscreen Expand Button (Top Right Corner) */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#041810]/85 hover:bg-[#06291C] border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105 z-20"
            title="View Full Resolution Banner Poster"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-black uppercase tracking-wider">
              Enlarge Poster
            </span>
          </button>
        </div>
      </div>

      {/* ====================================================
          3. LUXURY FLOATING ACTION BAR BELOW BANNER
          ==================================================== */}
      <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#03150E]/90 border border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Quick Status Text */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#B8860B] via-[#F5CE68] to-[#FFDF73] flex items-center justify-center text-[#041810] shadow shrink-0">
            <Crown className="w-5 h-5 text-[#041810]" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-black text-white">
              Odisha's Royal Hospitality & Banquets
            </p>
            <p className="text-[11px] text-[#CBD5E1]">
              Live Cooking Stations • Master Halwai Teams • Luxury LED Buffets
            </p>
          </div>
        </div>

        {/* Right: Direct Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
          <Link
            to="/booking"
            className="px-6 py-3 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-[0_6px_20px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <CalendarPlus className="w-4 h-4 shrink-0 text-[#041810]" />
            <span>Reserve Your Event Date</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#041810]" />
          </Link>

          <Link
            to="/menu"
            className="px-5 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] shadow transition-all flex items-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#F5CE68] shrink-0" />
            <span>Explore Royal Menu</span>
          </Link>

          <a
            href={BUSINESS_CONFIG.phoneTel}
            className="px-4 py-3 rounded-xl bg-[#041810]/80 hover:bg-[#06291C] border border-[#D4AF37]/40 text-xs font-bold text-[#CBD5E1] hover:text-[#F5CE68] transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">{BUSINESS_CONFIG.phoneFormatted}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>

      {/* ====================================================
          4. FULL-SCREEN LIGHTBOX MODAL
          ==================================================== */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl rounded-3xl bg-[#041810] border-2 border-[#D4AF37]/70 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden p-3 sm:p-5 space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#F5CE68]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#F5CE68]">
                  AD Catering & Cook Services • Official Royal Banner Poster
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-full bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Poster */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-black/80">
              <img
                src="/images/hero-master-banner.jpg"
                alt="Full Resolution Royal Banner"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer with Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 pt-1">
              <p className="text-xs text-[#CBD5E1]">
                Serving royal weddings, corporate banquets, and master cook hire across Odisha.
              </p>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-white"
                >
                  Close
                </button>
                <Link
                  to="/booking"
                  onClick={() => setLightboxOpen(false)}
                  className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md"
                >
                  Reserve Your Event Date
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

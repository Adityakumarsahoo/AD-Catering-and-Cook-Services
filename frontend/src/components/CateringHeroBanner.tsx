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
  Play,
  Award,
  ShieldCheck,
  Heart,
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
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ====================================================
          1. CINEMATIC MASTER BANNER (100% MATCHING USER'S MASTER DESIGN)
          ==================================================== */}
      <div className="relative rounded-3xl sm:rounded-[44px] p-[2.5px] bg-gradient-to-b from-[#F5CE68]/70 via-[#D4AF37]/40 to-[#B8860B]/70 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_60px_rgba(212,175,55,0.25)] overflow-hidden group">
        
        {/* Specular Ambient Glow */}
        <div className="absolute -inset-1 rounded-[46px] bg-gradient-to-tr from-[#D4AF37]/25 via-emerald-500/15 to-[#D4AF37]/25 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />

        {/* Master Image Frame (Aspect ratio 1024 / 540 matching the image dimensions exactly) */}
        <div 
          className="relative w-full rounded-[26px] sm:rounded-[42px] overflow-hidden bg-[#FAF8F5] select-none"
          style={{ aspectRatio: '1024 / 540' }}
        >
          {/* Master Graphic Artwork - Matches User's Design Perfectly */}
          <img
            src="/images/hero-luxury-showcase.jpg"
            alt="AD Catering and Cook Services - Royal Hospitality & Banquet Excellence Odisha"
            className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />

          {/* Shimmer Sweep Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* ====================================================
              2. PIXEL-ALIGNED INTERACTIVE CLICKABLE HOTSPOTS
              ==================================================== */}
          
          {/* A. Top Navigation Hotspots */}
          <Link
            to="/booking"
            onMouseEnter={() => setActiveTooltip('Book Your Event')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[3%] right-[3%] w-[14%] h-[7%] rounded-full hover:ring-2 hover:ring-[#F5CE68] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all z-20 cursor-pointer"
            title="Book Your Event"
          >
            <span className="sr-only">Book Your Event</span>
          </Link>

          {/* B. Primary Action: Explore Our Services Button */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('Explore All 12 Catering & Cook Services')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[51.5%] left-[7%] w-[16.5%] h-[7%] rounded-full hover:ring-2 hover:ring-[#F5CE68] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all z-20 cursor-pointer"
            title="Explore Our Services"
          >
            <span className="sr-only">Explore Our Services</span>
          </Link>

          {/* C. Secondary Action: Watch Our Story Button */}
          <button
            type="button"
            onClick={() => setStoryModalOpen(true)}
            onMouseEnter={() => setActiveTooltip('Watch Our Story & Culinary Heritage')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[51.5%] left-[24.5%] w-[13.5%] h-[7%] rounded-full hover:ring-2 hover:ring-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="Watch Our Story"
          >
            <span className="sr-only">Watch Our Story</span>
          </button>

          {/* D. Right Vertical 5 Feature Cards */}
          {/* Card 1: Master Cook Team */}
          <Link
            to="/cook-services"
            onMouseEnter={() => setActiveTooltip('Master Cook Team — Certified Halwais & Chefs')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[13.5%] right-[2%] w-[18%] h-[9.5%] rounded-2xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/70 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="Master Cook Team"
          >
            <span className="sr-only">Master Cook Team</span>
          </Link>

          {/* Card 2: Live Buffet Counters */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('Live Buffet Counters — Modern Setup & Service')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[23.5%] right-[2%] w-[18%] h-[9.5%] rounded-2xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/70 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="Live Buffet Counters"
          >
            <span className="sr-only">Live Buffet Counters</span>
          </Link>

          {/* Card 3: For All Occasions */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('For All Occasions — Weddings, Functions, Parties')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[33.5%] right-[2%] w-[18%] h-[9.5%] rounded-2xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/70 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="For All Occasions"
          >
            <span className="sr-only">For All Occasions</span>
          </Link>

          {/* Card 4: Hygienic & Fresh Food */}
          <Link
            to="/about"
            onMouseEnter={() => setActiveTooltip('Hygienic & Fresh Food — Pure Ingredients & Quality')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[43.5%] right-[2%] w-[18%] h-[9.5%] rounded-2xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#4ADE80]/70 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all z-20 cursor-pointer"
            title="Hygienic & Fresh Food"
          >
            <span className="sr-only">Hygienic & Fresh Food</span>
          </Link>

          {/* Card 5: Custom Menu Planning */}
          <Link
            to="/booking"
            onMouseEnter={() => setActiveTooltip('Custom Menu Planning — As Per Your Requirements')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[53.5%] right-[2%] w-[18%] h-[9.5%] rounded-2xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/70 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="Custom Menu Planning"
          >
            <span className="sr-only">Custom Menu Planning</span>
          </Link>

          {/* E. Bottom Row of 4 Showcase Cards */}
          {/* Card 1: Weddings */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('Weddings — Grand Feasts, Memorable Moments')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[62%] left-[2.5%] w-[23%] h-[23%] rounded-2xl sm:rounded-3xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/70 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="Weddings"
          >
            <span className="sr-only">Weddings - Grand Feasts</span>
          </Link>

          {/* Card 2: Corporate Events */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('Corporate Events — Professional Catering Solutions')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[62%] left-[26.5%] w-[23%] h-[23%] rounded-2xl sm:rounded-3xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/70 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="Corporate Events"
          >
            <span className="sr-only">Corporate Events</span>
          </Link>

          {/* Card 3: Functions & Celebrations */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('Functions & Celebrations — Delicious Food for Every Occasion')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[62%] left-[50.5%] w-[23%] h-[23%] rounded-2xl sm:rounded-3xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/70 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="Functions & Celebrations"
          >
            <span className="sr-only">Functions & Celebrations</span>
          </Link>

          {/* Card 4: Community Feeds */}
          <Link
            to="/services"
            onMouseEnter={() => setActiveTooltip('Community Feeds — Nutritious Meals in Bulk')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[62%] left-[74.5%] w-[23%] h-[23%] rounded-2xl sm:rounded-3xl hover:bg-emerald-500/10 hover:ring-2 hover:ring-[#F5CE68]/70 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all z-20 cursor-pointer"
            title="Community Feeds"
          >
            <span className="sr-only">Community Feeds</span>
          </Link>

          {/* F. Center Brand Logo */}
          <Link
            to="/about"
            onMouseEnter={() => setActiveTooltip('About AD Catering and Cook Services')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="absolute top-[2%] left-[12%] w-[16%] h-[7%] rounded-full hover:ring-2 hover:ring-[#F5CE68]/50 transition-all z-20 cursor-pointer"
            title="AD Catering and Cook Services"
          >
            <span className="sr-only">Home</span>
          </Link>

          {/* Interactive Floating Tooltip Pill */}
          {activeTooltip && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#041810]/95 border border-[#D4AF37] text-[11px] font-black uppercase tracking-wider text-[#F5CE68] shadow-[0_4px_25px_rgba(0,0,0,0.9)] backdrop-blur-md z-30 pointer-events-none flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
              <Sparkles className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
              <span>{activeTooltip}</span>
            </div>
          )}

          {/* Lightbox Enlarge Button (Floating in Top Corner) */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute top-3 right-3 p-2 rounded-full bg-[#041810]/90 hover:bg-[#06291C] border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-110 z-20"
            title="View Full Resolution Showcase"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ====================================================
          3. LUXURY ACTION DECK & QUICK ACCESS
          ==================================================== */}
      <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#03150E]/90 border border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand Promise */}
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

        {/* Right: Quick Action Buttons */}
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
            to="/services"
            className="px-5 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] shadow transition-all flex items-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#F5CE68] shrink-0" />
            <span>Explore All Services</span>
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
            
            <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#F5CE68]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#F5CE68]">
                  AD Catering & Cook Services • Official Master Design Showcase
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

            <div 
              className="relative w-full rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-black/80"
              style={{ aspectRatio: '1024 / 540' }}
            >
              <img
                src="/images/hero-luxury-showcase.jpg"
                alt="Full Resolution Master Hero Showcase"
                className="w-full h-full object-contain"
              />
            </div>

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

      {/* ====================================================
          5. "WATCH OUR STORY" CULINARY HERITAGE MODAL
          ==================================================== */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#041810] border-2 border-[#D4AF37]/70 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden p-6 sm:p-8 space-y-6 text-[#FAF8F5]">
            <button
              type="button"
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#B8860B] via-[#F5CE68] to-[#FFDF73] flex items-center justify-center text-[#041810] shadow">
                <ChefHat className="w-6 h-6 text-[#041810]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5CE68]">
                  Our Story & Heritage
                </span>
                <h3 className="font-display font-black text-2xl text-white">
                  15+ Years of Master Culinary Craft
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Founded with a passion for authentic Odia heritage recipes, royal Mughal-era banquets, and genuine golden hospitality, <strong className="text-[#F5CE68]">AD Catering and Cook Services</strong> has served over 500+ memorable weddings, corporate galas, and sacred puja gatherings across Bhubaneswar, Cuttack, Puri, and all Odisha.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/30 text-xs">
                <Award className="w-4 h-4 text-[#F5CE68] mb-1" />
                <p className="font-bold text-white">Master Halwais</p>
                <p className="text-[11px] text-[#94A3B8]">Authentic Chhena Poda & Sweets</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/30 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                <p className="font-bold text-white">FSSAI Certified</p>
                <p className="text-[11px] text-[#94A3B8]">100% Pure Cow Ghee & Hygiene</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D4AF37]/30">
              <button
                type="button"
                onClick={() => setStoryModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-white"
              >
                Close
              </button>
              <Link
                to="/booking"
                onClick={() => setStoryModalOpen(false)}
                className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md"
              >
                Book Your Event Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

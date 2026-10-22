import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  CalendarPlus,
  Sparkles,
  ArrowRight,
  Calculator,
  X,
  Crown,
  CheckCircle2,
  PhoneCall,
  ChevronUp,
  ArrowUp,
} from 'lucide-react';

import { BUSINESS_CONFIG } from '../config/cateringConfig.js';

export const FloatingActions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [waHovered, setWaHovered] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [scrollTooltip, setScrollTooltip] = useState(false);

  // Scroll to Top & Live Progress tracking
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollY > 180) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      if (height > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / height) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Estimator state: Default to standard 500 guests minimum
  const [selectedPkg, setSelectedPkg] = useState<'BASIC' | 'PREMIUM' | 'DELUXE'>('PREMIUM');
  const [guestCount, setGuestCount] = useState<number>(500);

  const packagePrices = {
    BASIC: 850,
    PREMIUM: 950,
    DELUXE: 1050,
  };

  const calculatedTotal = guestCount * packagePrices[selectedPkg];
  const isBelowMinimum = guestCount < 500;

  // Hide floating CTAs on booking page or admin dashboard to prevent clutter
  const isBookingPage = location.pathname === '/booking';
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleProceedBooking = () => {
    setConciergeOpen(false);
    navigate(`/booking?package=${encodeURIComponent(`${selectedPkg} PACKAGE`)}&guests=${guestCount}`);
  };

  return (
    <>
      {/* Concierge Instant Quote Modal */}
      {conciergeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xl animate-in fade-in">
          <div className="relative max-w-md w-full max-h-[90vh] overflow-y-auto mobile-touch-scroll rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#06291C] via-[#041810] to-[#020D08] border border-[#D4AF37]/60 p-5 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.8)] liquid-shine space-y-5 sm:space-y-6 text-[#FAF8F5]">
            {/* Top specular reflection */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5CE68] to-transparent" />
            
            {/* Close button */}
            <button
              onClick={() => setConciergeOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#041810]/80 hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/40 shadow-sm transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-1.5 pr-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-[10px] font-black text-[#F5CE68] uppercase tracking-wider">
                <Crown className="w-3 h-3 text-[#F5CE68]" />
                <span>Royal Concierge</span>
              </span>
              <h3 className="font-display font-black text-2xl text-white">
                Instant Banquet Estimate
              </h3>
              <p className="text-xs text-[#CBD5E1]">
                Curated pricing with live counters, staff & banquet setup included.
              </p>
            </div>

            {/* Package Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white">
                Choose Package:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['BASIC', 'PREMIUM', 'DELUXE'] as const).map((pkg) => (
                  <button
                    key={pkg}
                    type="button"
                    onClick={() => setSelectedPkg(pkg)}
                    className={`p-3 rounded-2xl text-center transition-all border ${
                      selectedPkg === pkg
                        ? 'bg-emerald-950/90 text-white border-2 border-[#D4AF37] shadow-lg scale-[1.02]'
                        : 'bg-[#041810]/80 text-[#CBD5E1] border-[#D4AF37]/30 hover:bg-emerald-950/60'
                    }`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-wider">
                      {pkg}
                    </p>
                    <p className={`text-xs font-black mt-0.5 tabular-nums ${selectedPkg === pkg ? 'text-[#F5CE68]' : 'text-emerald-400'}`}>
                      ₹{packagePrices[pkg]}
                      <span className="text-[9px] font-normal block text-[#94A3B8]">/ Plate</span>
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Guests Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Number of Plates / Guests:</span>
                <span className="font-black text-[#F5CE68] px-2.5 py-1 rounded-xl bg-[#041810] border border-[#D4AF37]/50 tabular-nums">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={2500}
                step={25}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-[#020F09] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[10px] text-[#94A3B8]">
                <span>100</span>
                <span className="text-[#F5CE68] font-bold">500 (Standard Min)</span>
                <span>2,500+</span>
              </div>
            </div>

            {/* 500 Guests Requirement & Special Enquiry Notice */}
            {isBelowMinimum ? (
              <div className="p-3.5 rounded-2xl bg-amber-950/70 border border-[#D4AF37]/60 text-xs text-[#CBD5E1] space-y-1.5 shadow-md">
                <p className="font-bold text-[#F5CE68] flex items-center gap-1.5 text-xs">
                  <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
                  <span>{BUSINESS_CONFIG.minimumBookingNotice.title}</span>
                </p>
                <p className="text-[11px] leading-relaxed text-[#CBD5E1]">
                  {BUSINESS_CONFIG.minimumBookingNotice.smallerGatheringsNote}
                </p>
                <div className="pt-1">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phonePrimaryRaw}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#041810] text-[11px] font-black hover:bg-[#F5CE68] transition-colors shadow-sm"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Call {BUSINESS_CONFIG.phonePrimary}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-[11px] text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Meets standard 500 guests catering minimum. Uniformed crew & setup included.</span>
              </div>
            )}

            {/* Live Calculation Display */}
            <div className="p-4 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/35 shadow-inner space-y-1.5">
              <div className="flex justify-between text-xs text-[#CBD5E1]">
                <span>Rate per Plate:</span>
                <span className="font-bold text-[#F5CE68] tabular-nums">₹{packagePrices[selectedPkg]} / Plate</span>
              </div>
              <div className="flex justify-between text-xs text-[#CBD5E1]">
                <span>Total Plates / Guests:</span>
                <span className="font-bold text-white tabular-nums">{guestCount} Guests</span>
              </div>
              <div className="border-t border-[#D4AF37]/25 pt-2 flex justify-between items-baseline">
                <span className="text-xs font-black text-white">Estimated Total:</span>
                <span className="font-display font-black text-2xl text-[#F5CE68] tabular-nums">
                  ₹{calculatedTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              {isBelowMinimum ? (
                <a
                  href={`tel:${BUSINESS_CONFIG.phonePrimaryRaw}`}
                  className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md flex items-center justify-center gap-2 active:scale-98 transition-transform"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {BUSINESS_CONFIG.phonePrimary} for Custom Quote</span>
                </a>
              ) : (
                <button
                  onClick={handleProceedBooking}
                  className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md flex items-center justify-center gap-2 active:scale-98 transition-transform"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Reserve This Package Now</span>
                </button>
              )}

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `Hello AD Catering, I would like to inquire about the ${selectedPkg} Package for approximately ${guestCount} guests (Estimated Quote: ₹${calculatedTotal.toLocaleString('en-IN')}).`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Quote to Our Director</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Cluster (Bottom-Right on Desktop, safely above mobile bottom nav on Mobile) */}
      <aside aria-label="Quick contact and booking" className="fixed bottom-20 md:bottom-6 right-3 md:right-6 z-40 flex items-center gap-2.5">
        {/* Royal Circular Progress Scroll-To-Top Button */}
        <div
          className={`relative flex items-center justify-center transition-all duration-500 ease-out ${
            showScrollTop
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-75 translate-y-6 pointer-events-none'
          }`}
          onMouseEnter={() => setScrollTooltip(true)}
          onMouseLeave={() => setScrollTooltip(false)}
        >
          {/* Tooltip on hover */}
          {scrollTooltip && (
            <div className="absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 animate-in fade-in zoom-in-95 z-50">
              <div className="px-3 py-1 rounded-full bg-[#041810]/95 border border-[#D4AF37]/60 shadow-[0_10px_25px_rgba(0,0,0,0.85)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-2.5 h-2.5 text-[#F5CE68]" />
                <span className="text-[10px] font-black text-[#F5CE68] uppercase tracking-wider">
                  Top • {Math.round(scrollProgress)}%
                </span>
              </div>
              <div className="w-2 h-2 bg-[#041810] border-r border-b border-[#D4AF37]/60 rotate-45 mx-auto -mt-1" />
            </div>
          )}

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="group relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#06281C] via-[#041D13] to-[#020F09] border border-[#D4AF37]/60 shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_15px_rgba(212,175,55,0.3)] hover:border-[#F5CE68] hover:shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(245,206,104,0.65)] hover:scale-110 active:scale-95 transition-all duration-300"
          >
            {/* Circular Progress SVG Gauge */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
            >
              <defs>
                <linearGradient id="royalScrollGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="40%" stopColor="#F5CE68" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              {/* Background Track */}
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="rgba(212, 175, 55, 0.2)"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Dynamic Gold Progress Fill */}
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="url(#royalScrollGold)"
                strokeWidth="2.8"
                strokeDasharray="125.66"
                strokeDashoffset={125.66 - (125.66 * scrollProgress) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-150 ease-out"
              />
            </svg>

            {/* Specular Inner Rim */}
            <div className="absolute inset-[3px] rounded-full border border-[#D4AF37]/25 pointer-events-none" />

            {/* Center Animated Chevron / Arrow with percentage */}
            <div className="relative flex flex-col items-center justify-center text-[#F5CE68] group-hover:text-white transition-colors">
              <ChevronUp className="w-5 h-5 -mb-0.5 stroke-[2.5] group-hover:-translate-y-1 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              <span className="text-[8px] font-black tracking-tight text-[#F5CE68] font-mono leading-none">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </button>
        </div>

        {/* Quick Quote Trigger Pill */}
        {!isBookingPage && !isAdminPage && (
          <button
            onClick={() => setConciergeOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#06281C]/95 via-[#041810]/95 to-[#020F09]/95 border border-[#D4AF37]/60 text-[#F5CE68] text-xs font-bold shadow-[0_16px_45px_rgba(0,0,0,0.6),0_0_15px_rgba(212,175,55,0.2)] hover:border-[#F5CE68] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(245,206,104,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 group liquid-shine backdrop-blur-xl"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
              <Calculator className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-[11px] tracking-wide text-[#F5CE68]">
              Quick Quote
            </span>
          </button>
        )}

        {/* Floating Book Now Button (Desktop) */}
        {!isBookingPage && !isAdminPage && (
          <Link
            to="/booking"
            className="hidden md:inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#06281C]/95 via-[#041810]/95 to-[#020F09]/95 border-2 border-[#D4AF37]/70 text-white text-xs font-bold shadow-[0_16px_45px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.25)] hover:border-[#F5CE68] hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(245,206,104,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group liquid-shine backdrop-blur-xl"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
              <CalendarPlus className="w-3.5 h-3.5" />
            </div>
            <span className="gold-gradient-text tracking-wider uppercase font-black text-[11px]">
              Book Your Event
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F5CE68] group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        )}

        {/* Floating WhatsApp Capsule with Expand On Hover */}
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            'Hello AD Catering, I would like to inquire about catering services.'
          )}`}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setWaHovered(true)}
          onMouseLeave={() => setWaHovered(false)}
          className={`flex items-center justify-center rounded-full bg-gradient-to-tr from-[#1E7E34] to-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.4),0_0_15px_rgba(37,211,102,0.25)] hover:shadow-[0_16px_45px_rgba(37,211,102,0.6),0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300 border-2 border-[#D4AF37] h-13 ${
            waHovered ? 'px-5 gap-2' : 'w-13'
          }`}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          {waHovered && (
            <span className="text-xs font-black whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200 tracking-wide">
              Chat With Us
            </span>
          )}
        </a>
      </aside>
    </>
  );
};

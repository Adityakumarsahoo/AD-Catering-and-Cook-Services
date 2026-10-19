import React, { useState } from 'react';
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
} from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [waHovered, setWaHovered] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);

  // Estimator state
  const [selectedPkg, setSelectedPkg] = useState<'BASIC' | 'PREMIUM' | 'DELUXE'>('PREMIUM');
  const [guestCount, setGuestCount] = useState<number>(150);

  const packagePrices = {
    BASIC: 850,
    PREMIUM: 950,
    DELUXE: 1050,
  };

  const calculatedTotal = guestCount * packagePrices[selectedPkg];

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
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Guests Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Estimated Guests:</span>
                <span className="font-black text-[#F5CE68] px-2.5 py-1 rounded-xl bg-[#041810] border border-[#D4AF37]/50 tabular-nums">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={1000}
                step={10}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-[#020F09] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[10px] text-[#94A3B8]">
                <span>20 min</span>
                <span>250 standard</span>
                <span>1,000+ grand</span>
              </div>
            </div>

            {/* Live Calculation Display */}
            <div className="p-4 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/35 shadow-inner space-y-1.5">
              <div className="flex justify-between text-xs text-[#CBD5E1]">
                <span>Rate per guest:</span>
                <span className="font-bold text-white">₹{packagePrices[selectedPkg]}</span>
              </div>
              <div className="flex justify-between text-xs text-[#CBD5E1]">
                <span>Total guests:</span>
                <span className="font-bold text-white">{guestCount}</span>
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
              <button
                onClick={handleProceedBooking}
                className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Reserve This Package Now</span>
              </button>

              <a
                href={`https://wa.me/919437123456?text=${encodeURIComponent(
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

      {/* Floating Action Cluster (Bottom-Right on Desktop, safely above sticky bar on Mobile) */}
      <aside aria-label="Quick contact and booking" className="fixed bottom-18 md:bottom-6 right-3 md:right-6 z-40 flex items-center gap-2">
        {/* Quick Quote Trigger Pill */}
        {!isBookingPage && !isAdminPage && (
          <button
            onClick={() => setConciergeOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-[#F5CE68] text-xs font-bold shadow-[0_16px_45px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group liquid-shine"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-sm">
              <Calculator className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[11px] text-[#F5CE68]">
              Quick Quote
            </span>
          </button>
        )}

        {/* Floating Book Now Button (Desktop) */}
        {!isBookingPage && !isAdminPage && (
          <Link
            to="/booking"
            className="hidden md:inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#041810]/90 border border-[#D4AF37]/60 text-white text-xs font-bold shadow-[0_16px_45px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group liquid-shine"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-sm">
              <CalendarPlus className="w-3.5 h-3.5" />
            </div>
            <span className="gold-gradient-text tracking-wide uppercase font-extrabold text-[11px]">
              Book Your Event
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F5CE68] group-hover:translate-x-1 transition-transform" />
          </Link>
        )}

        {/* Floating WhatsApp Capsule with Expand On Hover */}
        <a
          href="https://wa.me/919437123456?text=Hello%20AD%20Catering%2C%20I%20would%20like%20to%20inquire%20about%20catering%20services."
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setWaHovered(true)}
          onMouseLeave={() => setWaHovered(false)}
          className={`flex items-center justify-center rounded-full bg-gradient-to-tr from-[#1E7E34] to-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] hover:shadow-[0_16px_45px_rgba(37,211,102,0.5)] transition-all duration-300 border-2 border-[#D4AF37] h-13 ${
            waHovered ? 'px-5 gap-2' : 'w-13'
          }`}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          {waHovered && (
            <span className="text-xs font-extrabold whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
              Chat With Us
            </span>
          )}
        </a>
      </aside>

      {/* Floating Mobile Sticky CTA Bar */}
      {!isBookingPage && !isAdminPage && (
        <aside
          aria-label="Mobile booking action"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#041810]/95 backdrop-blur-xl border-t border-[#D4AF37]/50 p-2.5 px-4 pb-safe flex items-center justify-between gap-2 shadow-[0_-10px_35px_rgba(0,0,0,0.85)]"
        >
          <button
            onClick={() => setConciergeOpen(true)}
            className="flex flex-col text-left"
          >
            <span className="text-[10px] text-[#F5CE68] font-black uppercase tracking-wider flex items-center gap-1">
              <Calculator className="w-3 h-3 text-[#F5CE68]" />
              <span>Quick Calculator</span>
            </span>
            <span className="text-xs text-white font-black">
              From ₹850 / person
            </span>
          </button>
          <Link
            to="/booking"
            className="px-5 py-2.5 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Book Event</span>
          </Link>
        </aside>
      )}
    </>
  );
};

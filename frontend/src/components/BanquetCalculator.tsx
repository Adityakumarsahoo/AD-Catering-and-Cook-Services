import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Sparkles, Users, CheckCircle2, ArrowRight, Calculator, Calendar, Award } from 'lucide-react';

interface BanquetCalculatorProps {
  className?: string;
  initialPackage?: string;
  initialGuests?: number;
}

export const BanquetCalculator: React.FC<BanquetCalculatorProps> = ({
  className = '',
  initialPackage = 'PREMIUM',
  initialGuests = 200,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPackage);
  const [guestCount, setGuestCount] = useState<number>(initialGuests);

  const packagesInfo = [
    {
      id: 'BASIC',
      name: 'BASIC',
      rate: 850,
      badge: 'Essential Banquet',
      starters: 2,
      mains: 4,
      desserts: 1,
      drinks: 1,
      highlights: ['Fresh Lime Cooler', 'Dal Tadka / Dalma', 'Gulab Jamun', 'Uniformed Crew & Chafers'],
    },
    {
      id: 'PREMIUM',
      name: 'PREMIUM',
      rate: 950,
      badge: 'ROYAL WEDDING FEAST',
      isPopular: true,
      starters: 8,
      mains: 11,
      desserts: 4,
      drinks: 5,
      highlights: [
        '36 Signature Delicacies (From Royal Wedding Card)',
        'Live Panipuri, Chaat, Chicken Tikka & Lollipops',
        'Mutton Rogan Josh & Dal Butter Fry with Rumali Roti',
        'Chhena Payes, Hot Jalebi, Water & Paan Counter',
      ],
    },
    {
      id: 'DELUXE',
      name: 'DELUXE',
      rate: 1050,
      badge: 'VIP LUXURY',
      isVip: true,
      starters: 6,
      mains: 12,
      desserts: 4,
      drinks: 3,
      highlights: ['6 Live Food Stations', 'Chilika Prawns & Fish Fry', 'Artisanal Dessert Lounge', 'VIP Uniformed Captains'],
    },
  ];

  const currentPkg = packagesInfo.find((p) => p.name === selectedPackage) || packagesInfo[1];
  const totalCost = guestCount * currentPkg.rate;

  const guestPresets = [50, 100, 200, 350, 500, 800, 1200];

  return (
    <div className={`rounded-[36px] glass-strong border border-[#D4AF37]/50 p-6 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.65)] relative overflow-hidden liquid-shine ${className}`}>
      {/* Specular Golden Top Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5CE68] to-transparent" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/25">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-[11px] font-bold text-[#F5CE68] uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Interactive Event Pricing Estimator</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
            Calculate Your Banquet Budget
          </h3>
          <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1 font-normal">
            Slide to adjust guest count and compare Basic (₹850), Premium (₹950), and Deluxe (₹1050) per-person packages.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#041810]/80 border border-[#D4AF37]/40 text-right shrink-0">
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#F5CE68]">Transparent Catering</p>
          <p className="text-xs font-black text-white mt-0.5">Zero Hidden Extras • Staff Included</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        
        {/* Left Column: Package Selector & Guest Slider */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Package Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>1. Choose Catering Tier:</span>
              <span className="text-[#F5CE68] font-semibold text-[11px]">Live Package Rates</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {packagesInfo.map((pkg) => {
                const isSelected = selectedPackage === pkg.name;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackage(pkg.name)}
                    className={`relative rounded-2xl p-4 text-left transition-all duration-300 border ${
                      isSelected
                        ? 'bg-emerald-950/85 border-2 border-[#D4AF37] ring-2 ring-[#F5CE68]/40 shadow-lg scale-[1.02]'
                        : 'bg-[#041810]/70 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:bg-emerald-950/50'
                    }`}
                  >
                    {pkg.isPopular && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] text-[9px] font-black uppercase tracking-wider shadow">
                        POPULAR
                      </span>
                    )}
                    {pkg.isVip && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-950 text-[#FFDF73] text-[9px] font-black uppercase tracking-wider shadow border border-[#D4AF37]">
                        VIP
                      </span>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="font-display font-black text-sm text-white">{pkg.name}</p>
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />}
                    </div>

                    <p className="text-xl font-display font-black text-[#F5CE68] mt-2 tabular-nums">
                      ₹{pkg.rate}
                      <span className="text-[10px] text-[#94A3B8] font-normal ml-1">/ guest</span>
                    </p>

                    <p className="text-[10px] text-[#CBD5E1] mt-1 font-medium">
                      {pkg.starters} Starters • {pkg.mains} Mains • {pkg.desserts} Sweets
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Guest Count Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#F5CE68]" />
                <span>2. Number of Guests:</span>
              </label>
              <div className="px-3.5 py-1 rounded-xl bg-[#041810] border border-[#D4AF37]/50 shadow-sm flex items-center gap-1">
                <span className="font-display text-lg font-black text-[#F5CE68] tabular-nums">{guestCount}</span>
                <span className="text-xs text-[#94A3B8] font-semibold">Honored Guests</span>
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={25}
              max={1500}
              step={25}
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value) || 25)}
              className="w-full h-2.5 bg-[#020F09] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-[#94A3B8] mr-1">Quick Select:</span>
              {guestPresets.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setGuestCount(count)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    guestCount === count
                      ? 'bg-[#D4AF37] text-[#041810] font-black shadow-sm'
                      : 'bg-[#041810]/80 hover:bg-emerald-950 text-[#CBD5E1] border border-[#D4AF37]/30'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Highlights Checklist */}
          <div className="p-4 rounded-2xl bg-[#041810]/70 border border-[#D4AF37]/30 space-y-2">
            <p className="text-[11px] font-bold text-[#F5CE68] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Included in {currentPkg.name} at ₹{currentPkg.rate}/person:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#CBD5E1]">
              {currentPkg.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Uniformed Service Crew</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Warming Chafers & Buffet Setup</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Price Card & CTA */}
        <div className="lg:col-span-5">
          <div className="rounded-[30px] p-6 sm:p-8 bg-gradient-to-br from-[#06291C] via-[#041810] to-[#020D08] text-white shadow-2xl relative overflow-hidden space-y-6 border border-[#D4AF37]/60">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <div>
                <span className="text-[10px] text-[#F5CE68] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50">
                  Estimated Quote
                </span>
                <h4 className="font-display font-bold text-lg text-white mt-1">
                  {currentPkg.name} PACKAGE
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] font-bold">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Computation details */}
            <div className="space-y-2.5 text-xs text-[#CBD5E1]">
              <div className="flex justify-between">
                <span>Guest Count:</span>
                <span className="font-bold text-white tabular-nums">{guestCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span>Per Guest Rate:</span>
                <span className="font-bold text-[#F5CE68] tabular-nums">₹{currentPkg.rate}</span>
              </div>
              <div className="flex justify-between">
                <span>Buffet Table & Chafing Stations:</span>
                <span className="text-emerald-400 font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Service Crew & Staff:</span>
                <span className="text-emerald-400 font-bold">Included</span>
              </div>
            </div>

            {/* Big Total */}
            <div className="p-4 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/40 text-center shadow-inner">
              <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-semibold">
                Estimated Total Investment
              </p>
              <p className="font-display text-3xl sm:text-4xl font-black text-[#F5CE68] mt-1 tabular-nums">
                ₹{totalCost.toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] text-[#94A3B8] mt-1">
                (Inclusive of food, preparation, warmers & service crew)
              </p>
            </div>

            {/* Direct Booking CTA */}
            <Link
              to={`/booking?package=${encodeURIComponent(currentPkg.name + ' PACKAGE')}&guests=${guestCount}`}
              className="w-full py-4 rounded-2xl gold-gradient-btn text-xs font-black text-center text-[#041810] shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Lock This Date with {currentPkg.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-center text-[10px] text-[#94A3B8]">
              No immediate card payment needed. Our director will verify your venue and date slot.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

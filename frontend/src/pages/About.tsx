import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Award, ShieldCheck, HeartHandshake, UtensilsCrossed, Leaf, Users, Sparkles, Crown } from 'lucide-react';
import { ADBrandEmblem } from '../components/ADBrandEmblem.js';

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 relative z-10 min-h-screen text-[#FAF8F5]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="flex justify-center mb-2">
            <ADBrandEmblem size="md" showText={false} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Our Culinary Legacy</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            About AD Catering <br />
            <span className="gold-gradient-text">& Cook Services</span>
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
            Founded with a passion for authentic culinary traditions and flawless hospitality, AD Catering & Cook Services has grown to become Odisha's premier choice for festive, corporate, and royal wedding celebrations.
          </p>
        </div>
      </div>

      {/* Story & Image Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Preserving Authentic Heritage Flavors with Modern Hospitality Excellence
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              At AD Catering, we believe that food is not merely sustenance—it is the soul of every special occasion. Whether it is an intimate 25-guest family Puja or a 2,500-guest royal wedding banquet, we treat every dish with unwavering devotion.
            </p>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              Our culinary repertoire blends the deep-rooted richness of traditional Odia delicacies—such as slow-cooked Dalma, Machha Besara, Mutton Kasa, and earthen-baked Chhena Poda—with pan-Indian royal banquets, live Chinese woks, and European pastry dessert lounges.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl glass-card border border-[#D4AF37]/40 liquid-shine shadow-sm">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-white text-sm">FSSAI Certified</h4>
                <p className="text-xs text-[#94A3B8] mt-1">Spotless hygienic processing & temperature controlled setups.</p>
              </div>
              <div className="p-5 rounded-2xl glass-card border border-[#D4AF37]/40 liquid-shine shadow-sm">
                <ChefHat className="w-6 h-6 text-[#F5CE68] mb-2" />
                <h4 className="font-bold text-white text-sm">Master Chefs</h4>
                <p className="text-xs text-[#94A3B8] mt-1">Over 20+ experienced halwais, tandoor masters, and executive cooks.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[36px] overflow-hidden glass-strong border border-[#D4AF37]/50 shadow-[0_24px_70px_rgba(0,0,0,0.6)] p-3">
              <div className="relative rounded-[28px] overflow-hidden h-[420px]">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                  alt="Executive Chefs at Work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/40 shadow-xl backdrop-blur-md">
                  <p className="text-[10px] text-[#F5CE68] font-bold uppercase tracking-widest">The Culinary Artistry</p>
                  <h3 className="font-display text-base font-bold text-white">AD Catering and Cook Services Culinary Team</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values 4 Pillars Grid matching Uploaded Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#041810]/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Our Guiding Pillars</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">The Four Pillars of AD Catering</h2>
          <p className="text-xs sm:text-sm text-[#CBD5E1]">
            As featured on our official royal banner: Delicious Food for Every Special Occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Quality Food */}
          <div className="p-7 rounded-3xl glass-card border border-[#D4AF37]/40 space-y-3 liquid-shine shadow-md text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B8860B] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-md">
              <UtensilsCrossed className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Quality Food</h3>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Freshly prepared with pure cow ghee, authentic whole spices, and rich regional flavors.
            </p>
          </div>

          {/* Pillar 2: Experienced Cooks */}
          <div className="p-7 rounded-3xl glass-card border border-[#D4AF37]/40 space-y-3 liquid-shine shadow-md text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B8860B] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-md">
              <ChefHat className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Experienced Cooks</h3>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Veteran Odia halwais, tandoor maestros, and specialized caterers for wedding banquets.
            </p>
          </div>

          {/* Pillar 3: Hygienic Ingredients */}
          <div className="p-7 rounded-3xl glass-card border border-[#D4AF37]/40 space-y-3 liquid-shine shadow-md text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#16A34A] to-[#4ADE80] flex items-center justify-center text-[#041810] shadow-md">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Hygienic Ingredients</h3>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              100% sanitized kitchen stations, filtered RO water, and rigorous food safety protocols.
            </p>
          </div>

          {/* Pillar 4: Affordable Packages */}
          <div className="p-7 rounded-3xl glass-card border border-[#D4AF37]/40 space-y-3 liquid-shine shadow-md text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B8860B] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-md">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Affordable Packages</h3>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Transparent per-person pricing from ₹850 with complete buffet warmers and service crew.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Liquid Glass CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="p-10 sm:p-12 rounded-[36px] glass-strong border border-[#D4AF37]/50 shadow-[0_24px_70px_rgba(0,0,0,0.6)] space-y-6 liquid-shine">
          <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Experience Culinary Perfection for Your Next Occasion
          </h3>
          <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-lg mx-auto">
            Book our catering team or hire a master cook for your special day.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/booking" className="px-8 py-3.5 rounded-2xl gold-gradient-btn text-xs font-black shadow-md hover:scale-105 transition-transform text-[#041810]">
              Book Catering Now
            </Link>
            <Link to="/contact" className="px-8 py-3.5 rounded-2xl bg-emerald-950/80 border border-[#D4AF37]/50 text-[#F5CE68] hover:bg-emerald-900 text-xs font-bold shadow-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

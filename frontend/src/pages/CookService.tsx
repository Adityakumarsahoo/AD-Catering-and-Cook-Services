import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { TiltCard } from '../components/TiltCard.js';
import { ChefHat, Flame, Clock, Award, ShieldCheck, CheckCircle2, Calendar, Crown, Sparkles } from 'lucide-react';

export const CookService: React.FC = () => {
  const [cookServices, setCookServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getServices({ category: 'cook' });
        if (res.services) {
          setCookServices(res.services);
        }
      } catch (err) {
        console.error('Failed to load cook services:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="pt-32 pb-24 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header for Cook Services */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 text-[#FAF8F5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow">
            <ChefHat className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Verified Master Cooks for Hire</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Professional Cook Services
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
            Hire Odisha’s most experienced private chefs, wedding halwais, non-veg specialists, and home cooks. Enjoy restaurant-grade hygiene and authentic taste right in your own kitchen or venue.
          </p>
        </div>

        {/* Cook Trust Metrics in Royal Emerald Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 text-center liquid-shine shadow-xl">
            <Clock className="w-7 h-7 text-[#F5CE68] mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-white">10+ Years</p>
            <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">Average Experience</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 text-center liquid-shine shadow-xl">
            <ShieldCheck className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-white">Police & ID</p>
            <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">Verified Professionals</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 text-center liquid-shine shadow-xl">
            <Flame className="w-7 h-7 text-amber-400 mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-white">Live Cooking</p>
            <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">Piping Hot & Fresh</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 text-center liquid-shine shadow-xl">
            <Award className="w-7 h-7 text-[#F5CE68] mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-white">Spotless Clean</p>
            <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">Kitchen Sanitization Handover</p>
          </div>
        </div>

        {/* Cook Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cookServices.map((cook) => (
            <TiltCard key={cook.id} maxTilt={3}>
              <div
                className="rounded-[32px] bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 overflow-hidden flex flex-col justify-between group transition-all duration-300 liquid-shine h-full shadow-[0_16px_45px_rgba(0,0,0,0.6)] text-[#FAF8F5] hover:border-[#D4AF37]"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={cook.image}
                      alt={cook.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/80 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] shadow-md">
                      Starting ₹{cook.startingPrice}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5CE68] transition-colors mb-2">
                      {cook.title}
                    </h3>
                    <p className="text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed mb-4 font-normal">
                      {cook.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {cook.features?.map((feat: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/booking?service=${encodeURIComponent(cook.title)}`}
                    className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-center block shadow-md hover:scale-[1.02] transition-transform text-[#041810]"
                  >
                    Request Cook Service
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
};

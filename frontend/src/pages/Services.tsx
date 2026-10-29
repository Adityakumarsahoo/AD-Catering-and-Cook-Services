import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { TiltCard } from '../components/TiltCard.js';
import { CheckCircle2, ArrowRight, X, Sparkles, ChefHat, Crown, Users } from 'lucide-react';
import { defaultServices } from '../data/defaultServices.js';
import { MinimumGuestsNotice } from '../components/MinimumGuestsNotice.js';

export const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>(defaultServices);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [filter, setFilter] = useState<'all' | 'catering' | 'cook'>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await api.getServices().catch(() => null);
        if (res) {
          const items = Array.isArray(res) ? res : (res.services || res.data);
          if (Array.isArray(items) && items.length > 0) {
            setServices(items);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const getServiceImage = (srv: any) => {
    const t = (srv.title || '').toLowerCase();
    if (srv.id === 'srv_1' || t.includes('wedding')) return '/images/grand-wedding-catering.jpg';
    if (srv.id === 'srv_2' || t.includes('odia') || t.includes('feast')) return '/images/odia-feast-catering.jpg';
    if (srv.id === 'srv_light_table' || t.includes('light') || t.includes('led')) return '/images/royal-led-light-table.jpg';
    if (srv.id === 'srv_3' || t.includes('birth') || t.includes('anniversary')) return '/images/birthday-anniversary-catering.jpg';
    if (srv.id === 'srv_4' || t.includes('corp')) return '/images/corporate-galas-catering.jpg';
    if (srv.id === 'srv_5' || t.includes('housewarming') || t.includes('puja')) return '/images/housewarming-puja-catering.jpg';
    if (srv.id === 'srv_6' || t.includes('outdoor') || t.includes('destination')) return '/images/outdoor-destination-catering.jpg';
    if (srv.id === 'srv_7' || t.includes('master home cook') || t.includes('home cook')) return '/images/master-home-cook-service.jpg';
    if (srv.id === 'srv_9' || t.includes('non-veg') || t.includes('non veg')) return '/images/non-veg-specialist-cook.jpg';
    if (srv.id === 'srv_10' || t.includes('satvik') || t.includes('pure veg')) return '/images/satvik-pure-veg-cook.jpg';
    if (srv.id === 'srv_11' || t.includes('bbq') || t.includes('barbecue') || t.includes('weekend bbq')) return '/images/party-weekend-bbq-cook.jpg';
    if (srv.id === 'srv_12' || t.includes('bulk cooking') || t.includes('event kitchen')) return '/images/bulk-cooking-event-crew.jpg';
    return srv.image;
  };

  const getServiceTitle = (srv: any) => {
    const t = (srv.title || '').toLowerCase();
    if (srv.id === 'srv_2' || t.includes('odia') || t.includes('feast')) return 'Odia Feast Catering';
    if (srv.id === 'srv_light_table' || t.includes('light') || t.includes('led')) return 'Royal LED Light Table';
    if (srv.id === 'srv_1' || t.includes('wedding')) return 'Grand Wedding Catering';
    if (srv.id === 'srv_9' || t.includes('non-veg') || t.includes('non veg')) return 'Non-Veg Specialist Cook';
    if (srv.id === 'srv_10' || t.includes('satvik') || t.includes('pure veg')) return 'Satvik & Pure Veg Specialist Cook';
    if (srv.id === 'srv_11' || t.includes('bbq') || t.includes('barbecue')) return 'Party & Weekend BBQ Cook';
    if (srv.id === 'srv_12' || t.includes('bulk cooking') || t.includes('event kitchen')) return 'Bulk Cooking & Event Kitchen Crew';
    return srv.title;
  };

  const filtered = services.map(s => ({
    ...s,
    image: getServiceImage(s),
    title: getServiceTitle(s),
  })).filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  return (
    <div className="pt-32 pb-24 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 text-[#FAF8F5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow">
            <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Full-Spectrum Hospitality</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our Catering & Cook Services
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
            From regal multi-day wedding banquets to private master cooks in your kitchen, discover our handcrafted culinary offerings.
          </p>

          {/* Interactive Liquid Glass Filter Switcher */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/40 mt-4 shadow-lg backdrop-blur-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                filter === 'all'
                  ? 'gold-gradient-btn shadow-md text-[#041810]'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              All Offerings
            </button>
            <button
              onClick={() => setFilter('catering')}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                filter === 'catering'
                  ? 'gold-gradient-btn shadow-md text-[#041810]'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              Event Catering ({services.filter((s) => s.category === 'catering').length})
            </button>
            <button
              onClick={() => setFilter('cook')}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                filter === 'cook'
                  ? 'gold-gradient-btn shadow-md text-[#041810]'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              Cook Services ({services.filter((s) => s.category === 'cook').length})
            </button>
          </div>
        </div>

        {/* 500 Guests Standard Minimum Banner */}
        <MinimumGuestsNotice variant="banner" className="mb-12" />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
            <TiltCard key={service.id} maxTilt={3}>
              <div
                className="group rounded-[32px] bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 overflow-hidden flex flex-col justify-between liquid-shine h-full shadow-[0_16px_45px_rgba(0,0,0,0.6)] text-[#FAF8F5] hover:border-[#D4AF37] transition-all"
              >
                <div>
                  {/* Perfectly proportioned 16:9 Banner Box */}
                  <div 
                    className="relative w-full aspect-video overflow-hidden bg-black/60 cursor-pointer"
                    style={{ aspectRatio: '16/9' }}
                    onClick={() => setSelectedService(service)}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] shadow-lg backdrop-blur-md">
                      {service.category === 'cook' ? 'Custom Quote' : 'Bespoke Package'}
                    </div>
                    {service.category === 'catering' ? (
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-[10px] font-bold text-[#F5CE68] backdrop-blur-md">
                        Min. 500 Guests
                      </div>
                    ) : (
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
                        Live On-Site Master Chef
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5CE68] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed mb-5 font-normal">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {service.features?.slice(0, 3).map((feat: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/40 text-white text-xs font-semibold text-center transition-all shadow-sm"
                  >
                    View Details
                  </button>
                  <Link
                    to={service.category === 'cook' ? `/booking?type=cook&service=${encodeURIComponent(service.title)}` : `/booking?service=${encodeURIComponent(service.title)}`}
                    className="flex-1 py-2.5 rounded-xl gold-gradient-btn text-[#041810] text-xs font-bold text-center shadow-md"
                  >
                    Book Service
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Service Details Liquid Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-3xl rounded-[36px] bg-[#041810]/95 backdrop-blur-2xl border border-[#D4AF37]/60 shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden p-6 sm:p-8 space-y-6 liquid-shine text-[#FAF8F5] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow-md transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cinematic Full-Width 16:9 Banner Display */}
            <div 
              className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-2xl bg-black/90"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-contain sm:object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-[#041810]/90 backdrop-blur-md border border-[#D4AF37]/60 text-[10px] font-black uppercase tracking-wider text-[#F5CE68]">
                {selectedService.category === 'cook' ? 'Professional Master Cook' : 'Royal Catering Solution'}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">{selectedService.title}</h3>
              {selectedService.category === 'cook' ? (
                <p className="text-lg sm:text-xl font-black text-[#F5CE68]">
                  Custom Personalized Quote
                  <span className="block text-xs text-[#CBD5E1] mt-0.5 font-normal">
                    Tailored to your menu, guest count & cooking hours
                  </span>
                </p>
              ) : (
                <p className="text-lg sm:text-xl font-black text-[#F5CE68]">
                  Bespoke Catering Package
                  <span className="block text-xs text-[#CBD5E1] mt-0.5 font-normal">
                    Customized quote tailored to your guest count & menu
                  </span>
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed pt-1 font-normal">
                {selectedService.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/30">
              <h4 className="font-bold text-white text-sm mb-3">Service Inclusions:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features?.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D4AF37]/30">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-white"
              >
                Close
              </button>
              <Link
                to={selectedService.category === 'cook' ? `/booking?type=cook&service=${encodeURIComponent(selectedService.title)}` : `/booking?service=${encodeURIComponent(selectedService.title)}`}
                className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-black shadow-md text-[#041810]"
              >
                {selectedService.category === 'cook' ? 'Get Custom Quote' : 'Proceed to Book This Service'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

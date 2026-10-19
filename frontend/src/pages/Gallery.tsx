import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { TiltCard } from '../components/TiltCard.js';
import { X, ZoomIn, Image as ImageIcon, Camera, Crown } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await api.getGallery();
        if (res.gallery) setGallery(res.gallery);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const categories = [
    'ALL',
    'Weddings',
    'Birthdays',
    'Corporate',
    'Buffet',
    'Traditional Food',
    'Cooking',
    'Events',
    'Decorated Tables',
  ];

  const filtered = gallery.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="pt-32 pb-24 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 text-[#FAF8F5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow">
            <Camera className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Visual Portfolio</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Banquet & Culinary Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
            Take a visual tour through our grand wedding buffets, earthen clay handi preparations, live counters, and festive table decor across Odisha.
          </p>

          {/* Category Tabs inside Royal Emerald Bar */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'gold-gradient-btn text-[#041810] shadow-md scale-105 font-black'
                    : 'bg-[#06291C]/80 text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/80 border border-[#D4AF37]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <TiltCard key={item.id} maxTilt={4}>
              <div
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-[28px] overflow-hidden cursor-pointer bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 transition-all duration-500 shadow-[0_16px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_24px_60px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] liquid-shine h-full"
              >
                <div className="h-68 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/90 via-[#041810]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <span className="text-[10px] font-black text-[#041810] uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] px-2.5 py-0.5 rounded-full inline-block shadow">
                    {item.category}
                  </span>
                  <h3 className="font-display text-base font-bold text-white truncate">
                    {item.title}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-emerald-950/90 border border-[#D4AF37]/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  <ZoomIn className="w-4 h-4 text-[#F5CE68]" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Lightbox Liquid Glass Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in">
          <div className="relative max-w-4xl w-full rounded-[36px] bg-[#041810]/95 backdrop-blur-2xl border border-[#D4AF37]/60 overflow-hidden shadow-2xl liquid-shine text-[#FAF8F5]">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-5 right-5 z-10 p-2.5 rounded-2xl bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black/60">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-6 sm:p-8 bg-[#06291C]/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#D4AF37]/30">
              <div>
                <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest bg-emerald-950/80 border border-[#D4AF37]/40 px-3 py-1 rounded-full">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1.5">{selectedPhoto.title}</h3>
                {selectedPhoto.description && (
                  <p className="text-xs text-[#CBD5E1] mt-1 max-w-xl font-normal">{selectedPhoto.description}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-6 py-2.5 rounded-xl gold-gradient-btn text-[#041810] text-xs font-black shadow-sm"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

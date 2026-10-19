import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Search,
  Sparkles,
  UtensilsCrossed,
  Flame,
  Leaf,
  Drumstick,
  Fish,
  Soup,
  Crown,
  Layers,
  Cake,
  GlassWater,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface CategorySideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategorySideDrawer: React.FC<CategorySideDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState('');
  const [dietFilter, setDietFilter] = useState<'ALL' | 'VEG' | 'NON-VEG'>('ALL');

  if (!isOpen) return null;

  const categories = [
    { id: 'ALL', label: 'All 145+ Banquet Delicacies', count: 145, icon: UtensilsCrossed, type: 'all' },
    { id: 'MUTTON', label: 'The Mutton Feast (Bhoji Khasa)', count: 12, icon: Flame, type: 'non-veg', highlight: true },
    { id: 'CHICKEN', label: 'Royal Chicken Curations', count: 16, icon: Drumstick, type: 'non-veg' },
    { id: 'FISH', label: 'River & Sea Fish Delicacies', count: 10, icon: Fish, type: 'non-veg' },
    { id: 'PRAWN', label: 'Chilika Prawns & Crab', count: 8, icon: Fish, type: 'non-veg' },
    { id: 'PANEER', label: 'Paneer Royal Collection', count: 12, icon: Crown, type: 'veg' },
    { id: 'COUNTER STARTER', label: 'Live Counter Starters', count: 12, icon: Flame, type: 'all' },
    { id: 'STARTER - VEG', label: 'Crispy Veg Starters', count: 14, icon: Leaf, type: 'veg' },
    { id: 'STARTER - NON-VEG', label: 'Non-Veg Sizzling Starters', count: 16, icon: Drumstick, type: 'non-veg' },
    { id: 'WELCOME DRINKS', label: 'Mocktails & Welcome Drinks', count: 6, icon: GlassWater, type: 'veg' },
    { id: 'SOUP', label: 'Soups & Velvety Shorbas', count: 6, icon: Soup, type: 'all' },
    { id: 'RICE / PULAO / BIRYANI', label: 'Dum Biryani & Fragrant Pulao', count: 10, icon: Sparkles, type: 'all' },
    { id: 'ROTI / NAN / PURI', label: 'Tandoori Roti, Naan & Puri', count: 8, icon: Layers, type: 'veg' },
    { id: 'DAL', label: 'Dal Makhani & Authentic Dalma', count: 8, icon: Soup, type: 'veg' },
    { id: 'VEGETABLE', label: 'Exotic Vegetable Curries', count: 12, icon: Leaf, type: 'veg' },
    { id: 'MUSHROOM', label: 'Mushroom Specials', count: 6, icon: Leaf, type: 'veg' },
    { id: 'CHUTNEY & RAITA', label: 'Ambula, Khata & Raita', count: 6, icon: UtensilsCrossed, type: 'veg' },
    { id: 'SWEET DESSERT', label: 'Odisha Sweets & Desserts', count: 14, icon: Cake, type: 'veg', highlight: true },
    { id: 'PLATE COUNTER', label: 'Plate & Crockery Counters', count: 5, icon: Award, type: 'all' },
    { id: 'PAAN COUNTER', label: 'Live Royal Paan Lounge', count: 4, icon: Heart, type: 'all' },
  ];

  const filteredCategories = categories.filter((cat) => {
    if (dietFilter === 'VEG' && cat.type === 'non-veg') return false;
    if (dietFilter === 'NON-VEG' && cat.type === 'veg') return false;
    if (searchFilter.trim()) {
      return cat.label.toLowerCase().includes(searchFilter.toLowerCase());
    }
    return true;
  });

  const handleSelectCategory = (catId: string) => {
    onClose();
    if (catId === 'ALL') {
      navigate('/menu');
    } else {
      navigate(`/menu?category=${encodeURIComponent(catId)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-out Sidebar Drawer */}
      <aside className="relative w-full max-w-md sm:max-w-lg h-full bg-[#041810] border-l border-[#D4AF37]/50 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#06291C] to-[#041810] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-md">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg text-white">Menu Categories</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#F5CE68]">
                  145+ Dishes
                </span>
              </div>
              <p className="text-[11px] text-[#CBD5E1]">Quick-browse all culinary sections</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-emerald-950/80 border border-[#D4AF37]/40 text-[#CBD5E1] hover:text-white hover:bg-emerald-900 transition-colors"
            aria-label="Close categories sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Pure Veg & Packages Shortcuts */}
        <div className="p-4 bg-[#03140C] border-b border-[#D4AF37]/20 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              onClose();
              navigate('/veg-menu');
            }}
            className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950 to-teal-950/80 border border-emerald-500/50 hover:border-emerald-400 text-left transition-all group shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-0.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Pure Veg</span>
            </div>
            <p className="text-[10px] text-[#94A3B8]">Dedicated vegetarian banquet</p>
          </button>

          <button
            onClick={() => {
              onClose();
              navigate('/packages');
            }}
            className="p-3 rounded-2xl bg-gradient-to-br from-[#06291C] to-emerald-950 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-left transition-all group shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-[#F5CE68] font-bold text-xs mb-0.5">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Banquet Packages</span>
            </div>
            <p className="text-[10px] text-[#94A3B8]">Normal • Delux • Premium</p>
          </button>
        </div>

        {/* Dietary Filters & Search */}
        <div className="p-4 space-y-3 bg-[#041810] border-b border-[#D4AF37]/25">
          {/* Search Category */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#CBD5E1] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter categories (e.g., Mutton, Paneer, Soup)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-950/60 border border-[#D4AF37]/30 text-white placeholder-[#94A3B8] text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Diet Pills */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDietFilter('ALL')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                dietFilter === 'ALL'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] shadow-sm'
                  : 'bg-emerald-950/70 text-[#CBD5E1] hover:text-white border border-[#D4AF37]/25'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setDietFilter('VEG')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                dietFilter === 'VEG'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-950/70 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30'
              }`}
            >
              <Leaf className="w-3 h-3" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietFilter('NON-VEG')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                dietFilter === 'NON-VEG'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'bg-emerald-950/70 text-rose-400 hover:text-rose-300 border border-rose-500/30'
              }`}
            >
              <Drumstick className="w-3 h-3" />
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Scrollable Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-emerald-900/30">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`w-full pt-2.5 pb-2.5 px-3 rounded-xl flex items-center justify-between text-left transition-all group ${
                  cat.highlight
                    ? 'bg-gradient-to-r from-emerald-950/90 to-[#041810] border border-[#D4AF37]/50 hover:border-[#F5CE68]'
                    : 'hover:bg-emerald-950/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      cat.type === 'veg'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 group-hover:bg-emerald-600 group-hover:text-white'
                        : cat.type === 'non-veg'
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/40 group-hover:bg-rose-700 group-hover:text-white'
                        : 'bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/40 group-hover:bg-[#D4AF37] group-hover:text-[#041810]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F5CE68] transition-colors">
                        {cat.label}
                      </span>
                      {cat.highlight && (
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-[#D4AF37] text-[#041810]">
                          STAR
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#94A3B8]">
                      {cat.count} curated {cat.count === 1 ? 'item' : 'dishes'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F5CE68] opacity-80 group-hover:opacity-100">
                    {cat.count}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#F5CE68] group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 bg-gradient-to-t from-[#020C06] to-[#041810] border-t border-[#D4AF37]/30 flex items-center justify-between gap-3">
          <div className="text-xs">
            <p className="font-bold text-white">Create Custom Menu</p>
            <p className="text-[10px] text-[#94A3B8]">Add any dish directly to your booking</p>
          </div>
          <button
            onClick={() => {
              onClose();
              navigate('/booking');
            }}
            className="px-4 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md whitespace-nowrap"
          >
            Plan Banquet
          </button>
        </div>
      </aside>
    </div>
  );
};

// frontend/src/components/menu/MasterMenuFloatingTray.tsx
import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, X, Trash2, CheckCircle2 } from 'lucide-react';
import { useMenuCart } from '../../context/MenuCartContext.js';
import { Link } from 'react-router-dom';

export const MasterMenuFloatingTray: React.FC = () => {
  const { selectedDishes, removeDish, clearSelection } = useMenuCart();
  const [trayModalOpen, setTrayModalOpen] = useState(false);

  if (selectedDishes.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Pill Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-[#02110A]/95 border-2 border-[#D4AF37] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.35)] backdrop-blur-2xl text-[#FAF8F5]">
          {/* Dish Count & Clickable Preview */}
          <button
            onClick={() => setTrayModalOpen(true)}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#041810] flex items-center justify-center font-black shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#02110A]">
                {selectedDishes.length}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#FFDF73] transition-colors flex items-center gap-1.5">
                <span>Custom Catering Tray</span>
                <span className="text-[10px] text-[#F5CE68] font-normal underline">
                  (View Items)
                </span>
              </p>
              <p className="text-[11px] text-[#CBD5E1]">
                {selectedDishes.length} {selectedDishes.length === 1 ? 'dish' : 'dishes'} picked for your event
              </p>
            </div>
          </button>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={clearSelection}
              className="p-2 rounded-xl text-stone-400 hover:text-rose-400 hover:bg-[#041A12] text-xs transition-colors border border-transparent hover:border-rose-500/30"
              title="Clear all selections"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <Link
              to={`/booking?dishes=${encodeURIComponent(
                selectedDishes.map((d) => d.name).join(', ')
              )}`}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl gold-gradient-btn text-[#041810] text-xs font-black flex items-center gap-1.5 shadow-lg active:scale-95 transition-all whitespace-nowrap"
            >
              <span>Book Event</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Selected Dishes Modal Preview */}
      {trayModalOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setTrayModalOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[85vh] rounded-3xl bg-[#02110A] border-2 border-[#D4AF37]/60 p-6 flex flex-col shadow-2xl text-[#FAF8F5]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#FFDF73]" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Your Selected Catering Dishes
                  </h3>
                  <p className="text-xs text-[#CBD5E1]">
                    {selectedDishes.length} items customized for your banquet menu
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTrayModalOpen(false)}
                className="p-1.5 rounded-full bg-[#041A12] hover:bg-black text-[#CBD5E1] border border-[#D4AF37]/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1 divide-y divide-[#D4AF37]/15">
              {selectedDishes.map((d) => (
                <div
                  key={d.id}
                  className="pt-2 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        d.isVeg ? 'bg-emerald-400' : 'bg-rose-500'
                      }`}
                    />
                    <div className="truncate">
                      <p className="font-semibold text-white truncate">{d.name}</p>
                      <p className="text-[10px] text-stone-400 truncate">{d.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDish(d.id)}
                    className="p-1 text-stone-400 hover:text-rose-400 transition-colors shrink-0"
                    title="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between gap-3">
              <button
                onClick={clearSelection}
                className="text-xs text-rose-400 hover:underline"
              >
                Clear all
              </button>

              <Link
                to={`/booking?dishes=${encodeURIComponent(
                  selectedDishes.map((d) => d.name).join(', ')
                )}`}
                onClick={() => setTrayModalOpen(false)}
                className="px-5 py-2.5 rounded-xl gold-gradient-btn text-[#041810] font-black text-xs flex items-center gap-1.5 shadow-lg active:scale-95"
              >
                <span>Proceed to Catering Booking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

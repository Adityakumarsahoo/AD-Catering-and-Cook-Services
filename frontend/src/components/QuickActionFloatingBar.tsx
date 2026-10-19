import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMenuCart } from '../context/MenuCartContext.js';
import { Phone, MessageCircle, Calendar, ShoppingBag, X, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

export const QuickActionFloatingBar: React.FC = () => {
  const { selectedDishes } = useMenuCart();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Hide on booking page to avoid redundancy
  if (location.pathname === '/booking') return null;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 select-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="p-3.5 rounded-full bg-gradient-to-r from-[#0A192F] to-[#1E3A5F] text-[#F5CE68] border border-[#D4AF37]/50 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          title="Open Quick Hospitality Concierge"
        >
          <Sparkles className="w-4 h-4 text-[#F5CE68] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold text-white pr-1 hidden sm:inline">Book & Inquire</span>
          <ChevronUp className="w-3.5 h-3.5 text-white/60" />
        </button>
      ) : (
        <div className="rounded-3xl bg-[#041810]/95 border border-[#D4AF37]/50 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex items-center gap-2 sm:gap-3 relative overflow-hidden text-white">
          {/* Top gold edge */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          {/* Tray Counter if dishes selected */}
          {selectedDishes.length > 0 && (
            <Link
              to="/booking"
              className="px-3 py-2 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 hover:bg-emerald-900 transition-all flex items-center gap-1.5 text-xs font-bold shrink-0 shadow-sm"
              title="Review your curated custom dishes"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>{selectedDishes.length} Dishes</span>
            </Link>
          )}

          {/* Instant WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-[#041810] font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
            title="Chat instantly on WhatsApp"
            aria-label="WhatsApp Concierge"
          >
            <MessageCircle className="w-4 h-4 text-[#041810]" />
          </a>

          {/* Quick Phone Call */}
          <a
            href="tel:+919876543210"
            className="p-2.5 rounded-2xl bg-[#06291C] border border-[#D4AF37]/40 text-[#F5CE68] shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center hover:border-[#D4AF37]"
            title="Call Catering Manager (+91 98765 43210)"
            aria-label="Call Catering Manager"
          >
            <Phone className="w-4 h-4 text-[#F5CE68]" />
          </a>

          {/* Direct Reserve Button */}
          <Link
            to="/booking"
            className="px-4 py-2.5 rounded-2xl gold-gradient-btn text-xs font-bold text-[#041810] shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Event</span>
          </Link>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(true)}
            className="p-1.5 rounded-full hover:bg-emerald-950 text-[#CBD5E1] transition-colors ml-0.5"
            aria-label="Minimize bar"
            title="Minimize"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

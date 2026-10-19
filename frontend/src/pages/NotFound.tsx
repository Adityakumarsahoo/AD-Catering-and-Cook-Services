import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen pt-36 pb-24 relative z-10 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-[36px] glass-strong border border-white/20 p-8 sm:p-10 text-center space-y-6 shadow-2xl liquid-shine">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6B1724] to-[#B8233C] border border-[#D4AF37]/50 flex items-center justify-center text-[#F5CE68] mx-auto shadow-xl">
          <ChefHat className="w-8 h-8" />
        </div>
        <h1 className="font-display font-black text-6xl text-white tracking-tight">404</h1>
        <h2 className="font-display font-bold text-2xl text-[#F5CE68]">
          Recipe Not Found
        </h2>
        <p className="text-xs text-[#FAF8F5]/70 max-w-sm mx-auto font-light">
          The page or banquet section you are looking for has moved or does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl gold-gradient-btn text-xs font-black shadow-xl hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  ChefHat,
  Flame,
  Award,
  PhoneCall,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  // 5 destinations requested: Home, Services, Specializations, About, Contact
  const navItems = [
    {
      to: '/',
      label: 'Home',
      icon: Home,
      exact: true,
    },
    {
      to: '/services',
      label: 'Services',
      icon: ChefHat,
      exact: false,
    },
    {
      to: '/cook-service',
      label: 'Chefs',
      icon: Flame,
      exact: false,
    },
    {
      to: '/about',
      label: 'About',
      icon: Award,
      exact: false,
    },
    {
      to: '/contact',
      label: 'Contact',
      icon: PhoneCall,
      exact: false,
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#020C07]/98 via-[#041A12]/96 to-[#020C07]/98 backdrop-blur-2xl border-t border-[#D4AF37]/50 shadow-[0_-10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.18)] transition-transform duration-300"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
      }}
    >
      {/* Golden top micro-accent hairline with ambient center shine */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFF1B8] to-transparent opacity-90 pointer-events-none" />
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#D4AF37]/20 blur-xl rounded-full pointer-events-none" />

      <div className="grid grid-cols-5 items-center px-1.5 pt-1.5 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded-2xl select-none touch-manipulation group transition-all"
            >
              {/* Framer Motion Smooth Sliding Active Indicator Background */}
              {isActive && (
                <motion.div
                  layoutId="mobileNavActivePill"
                  className="absolute inset-x-1 inset-y-0.5 rounded-2xl bg-gradient-to-b from-[#0B3D26] via-[#05281A] to-[#02100A] border border-[#D4AF37]/80 shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_15px_rgba(212,175,55,0.35)] -z-0"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 32,
                  }}
                />
              )}

              <motion.div
                whileTap={{ scale: 0.88 }}
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#F5CE68]'
                    : 'text-[#94A3B8] group-hover:text-[#FAF8F5]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isActive
                      ? 'scale-110 drop-shadow-[0_2px_8px_rgba(245,206,104,0.6)]'
                      : 'group-hover:scale-105'
                  }`}
                />

                {isActive && (
                  <motion.span
                    layoutId="mobileNavActiveDot"
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#FFF1B8] shadow-[0_0_8px_#F5CE68]"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.div>

              <span
                className={`relative z-10 text-[9.5px] font-bold tracking-tight mt-0.5 transition-colors duration-200 truncate max-w-full px-0.5 ${
                  isActive
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] font-black drop-shadow'
                    : 'text-[#94A3B8] group-hover:text-slate-200'
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

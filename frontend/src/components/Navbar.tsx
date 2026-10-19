import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useMenuCart } from '../context/MenuCartContext.js';
import {
  Menu as MenuIcon,
  X,
  ChefHat,
  CalendarCheck,
  User,
  LogOut,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  LayoutGrid,
  Phone,
  MessageCircle,
  Leaf,
  Package,
  Image as ImageIcon,
  Award,
  PhoneCall,
  UtensilsCrossed,
  Flame,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { ADBrandEmblem } from './ADBrandEmblem.js';
import { CategorySideDrawer } from './CategorySideDrawer.js';

export const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const { selectedDishes } = useMenuCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Menu', path: '/menu', icon: UtensilsCrossed },
    { name: 'Veg Menu', path: '/veg-menu', isVeg: true, icon: Leaf },
    { name: 'Packages', path: '/packages', icon: Package },
    { name: 'Services', path: '/services', icon: ChefHat },
    { name: 'Cook Service', path: '/cook-service', icon: Flame },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'About', path: '/about', icon: Award },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-2.5 px-2 sm:px-3 lg:px-4 xl:px-6 transition-all duration-300">
      <div
        className={`w-full max-w-[1520px] mx-auto rounded-2xl sm:rounded-3xl relative transition-all duration-300 ${
          scrolled
            ? 'bg-gradient-to-r from-[#02110A]/98 via-[#052519]/96 to-[#02110A]/98 backdrop-blur-[32px] border border-[#D4AF37]/65 shadow-[0_20px_55px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] py-1.5 sm:py-2 px-2.5 sm:px-3.5 xl:px-5 scale-[0.998]'
            : 'bg-gradient-to-r from-[#03160E]/95 via-[#062C1D]/92 to-[#03160E]/95 backdrop-blur-[26px] border border-[#D4AF37]/50 py-2 sm:py-2.5 px-2.5 sm:px-4 xl:px-5 shadow-[0_12px_45px_rgba(0,0,0,0.75),0_0_20px_rgba(212,175,55,0.12)]'
        }`}
      >
        {/* Shimmering Top Hairline Gold Edge & Ambient Light Spot */}
        <div className="absolute top-0 left-8 right-8 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#FFF1B8] to-transparent pointer-events-none opacity-85" />
        <div className="absolute -top-10 left-1/3 w-1/3 h-16 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-1.5 sm:gap-2 xl:gap-3 relative z-10">
          
          {/* ====================================================
              1. BRAND LOGO CAPSULE (Shrink-0, Never crushed)
              ==================================================== */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0 py-0.5 px-1.5 -ml-1 rounded-2xl hover:bg-emerald-950/50 transition-all duration-300"
          >
            <div className="relative shrink-0 p-0.5 rounded-2xl bg-gradient-to-br from-[#0B3D26] via-[#041A12] to-[#02100A] border border-[#D4AF37]/60 shadow-[0_0_12px_rgba(212,175,55,0.25)] group-hover:border-[#FFDF73] transition-colors">
              <ADBrandEmblem size="sm" showText={false} />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 border-2 border-[#02110A] rounded-full shadow-[0_0_6px_#10B981] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-xs sm:text-sm lg:text-[15px] xl:text-base tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9D2] via-[#FFDF73] to-[#D4AF37] group-hover:from-white group-hover:to-[#FFE68C] transition-all drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)] whitespace-nowrap">
                  AD CATERING
                </span>
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFDF73] hidden sm:inline animate-pulse" />
              </div>
              <span className="text-[7.5px] sm:text-[8.5px] xl:text-[9px] tracking-[0.22em] uppercase font-black text-[#F5CE68] whitespace-nowrap drop-shadow">
                & Cook Services
              </span>
            </div>
          </Link>

          {/* ====================================================
              2. DESKTOP NAVIGATION PILL BAR (All 9 Links + Categories)
              ==================================================== */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-full bg-gradient-to-b from-[#02100A]/95 to-[#041A12]/90 border border-[#D4AF37]/40 shadow-[inset_0_2px_6px_rgba(0,0,0,0.7),0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md shrink-0">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10.5px] xl:text-[11.5px] 2xl:text-xs font-bold px-2 xl:px-2.5 2xl:px-3 py-1 xl:py-1.5 rounded-full transition-all duration-300 relative whitespace-nowrap flex items-center gap-1 ${
                    isActive
                      ? link.isVeg
                        ? 'text-white font-extrabold bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 shadow-[0_2px_14px_rgba(16,185,129,0.55)] border border-emerald-300/60 ring-1 ring-emerald-300/40'
                        : 'text-[#03150E] font-black bg-gradient-to-r from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] shadow-[0_2px_15px_rgba(212,175,55,0.55)] ring-1 ring-white/70'
                      : link.isVeg
                        ? 'text-emerald-300 hover:text-emerald-100 hover:bg-gradient-to-r hover:from-emerald-950/80 hover:to-[#041A12] border border-transparent hover:border-emerald-500/40 hover:shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                        : 'text-[#E2E8F0] hover:text-[#FFF1B8] hover:bg-gradient-to-b hover:from-emerald-950/80 hover:to-[#041A12] border border-transparent hover:border-[#D4AF37]/35 hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                  }`}
                >
                  {link.isVeg && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] shrink-0" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Desktop Side Category Drawer Trigger - Royal Jewel Button */}
            <button
              onClick={() => setCategoryDrawerOpen(true)}
              className="text-[10.5px] xl:text-[11.5px] 2xl:text-xs font-black px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-full bg-gradient-to-r from-[#0B3D26] via-[#06281B] to-[#0B3D26] border border-[#D4AF37]/80 text-[#FFDF73] hover:from-[#D4AF37] hover:via-[#F5CE68] hover:to-[#B8860B] hover:text-[#03150E] transition-all duration-300 flex items-center gap-1 shadow-[0_0_14px_rgba(212,175,55,0.25)] hover:shadow-[0_0_22px_rgba(212,175,55,0.5)] active:scale-95 ml-0.5 group shrink-0"
              title="Open full menu categories side drawer"
            >
              <LayoutGrid className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#FFDF73] group-hover:text-[#03150E] transition-colors" />
              <span>Categories</span>
            </button>
          </nav>

          {/* ====================================================
              3. RIGHT ACTION CONTROLS (All Options: Cart, Phone, Auth, Book Event)
              ==================================================== */}
          <div className="hidden md:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Custom Menu Tray Counter Badge */}
            {selectedDishes.length > 0 && (
              <Link
                to="/booking"
                className="relative px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-full bg-gradient-to-r from-emerald-950 to-[#041A12] border border-emerald-400/80 text-emerald-300 hover:text-white hover:border-emerald-300 transition-all flex items-center gap-1 text-[11px] xl:text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)] animate-pulse shrink-0"
                title="Review your curated custom dishes"
              >
                <ShoppingBag className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-emerald-400" />
                <span className="tabular-nums font-black">{selectedDishes.length}</span>
              </Link>
            )}

            {/* Instant Phone Hotline - Gold Circular Brooch */}
            <a
              href="tel:+919876543210"
              className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-gradient-to-b from-[#0B3D26] to-[#041A12] border border-[#D4AF37]/70 text-[#FFDF73] hover:border-[#FFF1B8] hover:bg-gradient-to-r hover:from-[#FFF1B8] hover:via-[#F5CE68] hover:to-[#D4AF37] hover:text-[#03150E] transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_10px_rgba(212,175,55,0.25)] hover:shadow-[0_0_18px_rgba(212,175,55,0.6)] flex items-center justify-center shrink-0"
              title="Call AD Catering (+91 98765 43210)"
              aria-label="Direct Call"
            >
              <Phone className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
            </a>

            {/* Admin State Indicator */}
            {isAdmin ? (
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1 px-2.5 xl:px-3 py-1 xl:py-1.5 text-[11px] xl:text-xs font-bold rounded-full bg-gradient-to-r from-emerald-950 to-[#041A12] border border-[#D4AF37]/70 text-[#FFDF73] hover:border-[#FFDF73] shadow-sm transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFDF73]" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1 text-[#CBD5E1] hover:text-white hover:bg-emerald-950/80 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : user ? (
              /* Customer Dropdown */
              <div className="relative shrink-0">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-full bg-gradient-to-r from-[#0B3D26] to-[#041A12] border border-[#D4AF37]/60 hover:border-[#FFDF73] text-[11px] xl:text-xs font-bold text-[#FAF8F5] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                >
                  <div className="w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#10B981] flex items-center justify-center text-[9px] xl:text-[10px] text-[#041810] font-black shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[70px] xl:max-w-[85px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-[#FFDF73]" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-gradient-to-b from-[#041810]/98 via-[#06281B]/98 to-[#03150E]/98 backdrop-blur-2xl border border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] py-2 z-50 animate-in fade-in zoom-in-95 text-white">
                    <div className="px-4 py-2 border-b border-[#D4AF37]/25">
                      <p className="text-[10px] text-[#FFDF73] uppercase tracking-wider font-extrabold">Signed in as</p>
                      <p className="text-xs font-bold text-white truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#CBD5E1] hover:bg-emerald-950/90 hover:text-[#FFDF73] transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-[#FFDF73]" />
                      <span>Customer Portal</span>
                    </Link>
                    <Link
                      to="/dashboard?tab=bookings"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#CBD5E1] hover:bg-emerald-950/90 hover:text-[#FFDF73] transition-colors"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-[#FFDF73]" />
                      <span>My Event Bookings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/60 transition-colors text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest Auth Links */
              <div className="flex items-center gap-1 xl:gap-1.5 shrink-0">
                <Link
                  to="/login"
                  className="px-2 xl:px-2.5 py-1 text-[11px] xl:text-xs font-bold text-[#E2E8F0] hover:text-[#FFDF73] hover:bg-emerald-950/70 rounded-full transition-colors whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-2.5 xl:px-3 py-1 xl:py-1.5 text-[11px] xl:text-xs font-black rounded-full bg-gradient-to-r from-[#0B3D26] to-[#041A12] border border-[#D4AF37]/65 text-[#FFDF73] hover:border-[#FFDF73] hover:shadow-[0_0_14px_rgba(212,175,55,0.35)] shadow-sm whitespace-nowrap transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Primary Action "Book Event" Button - Radiant Liquid Gold Gemstone */}
            <Link
              to="/booking"
              className="px-3 xl:px-4 py-1.5 xl:py-2 text-[11px] xl:text-xs font-black rounded-full bg-gradient-to-r from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] text-[#03150E] border border-white/80 shadow-[0_6px_20px_rgba(212,175,55,0.45),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.7),inset_0_1px_3px_rgba(255,255,255,1)] hover:scale-[1.03] active:scale-95 transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 shrink-0 group relative overflow-hidden"
            >
              {/* Shimmer light sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <Calendar className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#03150E] group-hover:rotate-12 transition-transform duration-300" />
              <span>Book Event</span>
            </Link>
          </div>

          {/* ====================================================
              4. MOBILE HEADER CONTROLS (< md)
              ==================================================== */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {/* Mobile Tray Counter if selected */}
            {selectedDishes.length > 0 && (
              <Link
                to="/booking"
                className="p-1.5 rounded-xl bg-gradient-to-r from-emerald-950 to-[#041A12] border border-emerald-400 text-emerald-300 text-xs shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse"
                title="View selected dishes"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            )}

            {/* Mobile Categories Side Drawer Button */}
            <button
              onClick={() => setCategoryDrawerOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0B3D26] via-[#06281B] to-[#0B3D26] text-[#FFDF73] border border-[#D4AF37]/70 active:scale-95 transition-all flex items-center gap-1 text-[11px] font-black shadow-[0_0_10px_rgba(212,175,55,0.25)]"
              aria-label="Open Categories Sidebar"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span>Categories</span>
            </button>

            {/* Hamburger / Close Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl bg-gradient-to-b from-[#0B3D26] to-[#041A12] text-[#FFDF73] border border-[#D4AF37]/70 active:scale-95 transition-all shadow-[0_0_10px_rgba(212,175,55,0.2)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <MenuIcon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* ====================================================
          5. MOBILE BANQUET DRAWER (< lg)
          ==================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-[1520px] max-h-[calc(100vh-85px)] overflow-y-auto mobile-touch-scroll rounded-2xl bg-gradient-to-b from-[#031810]/98 via-[#06281B]/98 to-[#02110A]/98 backdrop-blur-[36px] border border-[#D4AF37]/60 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.2)] space-y-3.5 animate-in slide-in-from-top-4 duration-300">
          
          {/* Top Quick Category Access Banner */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setCategoryDrawerOpen(true);
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#0B3D26] via-[#07281A] to-[#0B3D26] border border-[#D4AF37]/80 text-[#FFDF73] flex items-center justify-between text-xs font-black shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,55,0.2)] active:scale-98 transition-transform group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] flex items-center justify-center text-[#03150E] shadow-md group-hover:scale-105 transition-transform">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[#FAF8F5] text-xs font-black tracking-wide">Browse Menu Categories</p>
                <p className="text-[10px] text-[#CBD5E1]">Mutton, Chicken, Fish, Dalma, Sweets & more</p>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FFF1B8] to-[#D4AF37] text-[#03150E] font-black shadow-md border border-white/60">
              145+ Dishes →
            </span>
          </button>

          {/* 2-Column Responsive Navigation Grid */}
          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const IconComp = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    isActive
                      ? link.isVeg
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black shadow-[0_2px_12px_rgba(16,185,129,0.5)] border-emerald-300/60 ring-1 ring-emerald-300/40'
                        : 'bg-gradient-to-r from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] text-[#03150E] font-black shadow-[0_2px_14px_rgba(212,175,55,0.5)] border-white/60'
                      : link.isVeg
                        ? 'bg-gradient-to-r from-emerald-950/80 to-[#041A12]/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                        : 'bg-gradient-to-r from-[#06281B]/80 to-[#03160E]/80 text-[#E2E8F0] hover:text-[#FFDF73] border-[#D4AF37]/35 hover:border-[#D4AF37]/70'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 shrink-0 ${isActive && !link.isVeg ? 'text-[#03150E]' : link.isVeg ? 'text-emerald-400' : 'text-[#FFDF73]'}`} />
                  <span className="truncate">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Direct Support & Action Hub */}
          <div className="pt-3 border-t border-[#D4AF37]/30 space-y-3">
            
            {/* Quick 1-Tap Contact Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919876543210"
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0B3D26] to-[#041A12] border border-[#D4AF37]/70 text-[#FFDF73] text-xs font-black flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFDF73]" />
                <span>Call Hotline</span>
              </a>
            </div>

            {/* Auth / Account Controls */}
            {isAdmin ? (
              <div className="space-y-1.5">
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0B3D26] to-[#041A12] text-[#FFDF73] border border-[#D4AF37]/70 text-center text-xs font-black flex items-center justify-center gap-2 shadow-md"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFDF73]" />
                  <span>Admin Management Console</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-1 text-center text-xs text-rose-400 font-bold hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#06281B] border border-[#D4AF37]/50 shadow-inner">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFF1B8] to-[#D4AF37] text-[#03150E] flex items-center justify-center font-black text-xs shadow">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[10px] text-[#94A3B8]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] text-rose-300 font-bold px-2.5 py-1 rounded-lg bg-rose-950/70 border border-rose-800/70"
                  >
                    Logout
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-center text-xs font-semibold rounded-xl bg-[#06281B] border border-[#D4AF37]/40 text-white hover:text-[#FFDF73]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard?tab=bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-center text-xs font-semibold rounded-xl bg-[#06281B] border border-[#D4AF37]/40 text-[#FFDF73]"
                  >
                    My Bookings
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold text-white bg-[#06281B] hover:bg-emerald-950 rounded-xl border border-[#D4AF37]/50 shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-black rounded-xl bg-gradient-to-r from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] text-[#03150E] border border-white/70 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Book Your Event Main Action */}
            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] text-[#03150E] font-black text-center text-xs sm:text-sm shadow-[0_6px_22px_rgba(212,175,55,0.45),inset_0_1px_2px_rgba(255,255,255,0.9)] border border-white/80 flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#03150E]" />
              <span>Book Your Event Now</span>
            </Link>
          </div>
        </div>
      )}

      {/* Side Category Navigation Drawer for both Desktop & Mobile */}
      <CategorySideDrawer
        isOpen={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
      />
    </header>
  );
};

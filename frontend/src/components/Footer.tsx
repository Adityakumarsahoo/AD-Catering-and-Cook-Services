import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Phone, Mail, MapPin, Clock, ArrowUpRight, Shield, Crown, Sparkles, Users } from 'lucide-react';
import { ADBrandEmblem } from './ADBrandEmblem.js';
import { BUSINESS_CONFIG } from '../config/cateringConfig.js';

export const Footer: React.FC = () => {
  return (
    <footer id="footer-contact" className="relative z-10 bg-[#020B07] border-t border-[#D4AF37]/35 text-[#FAF8F5]/80 pt-16 pb-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#D4AF37]/20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3.5 group">
              <ADBrandEmblem size="sm" showText={false} />
              <div className="flex flex-col">
                <span className="font-display font-black text-lg text-white group-hover:text-[#F5CE68] tracking-tight transition-colors">
                  {BUSINESS_CONFIG.name.toUpperCase()}
                </span>
                <span className="text-[10px] text-[#F5CE68] tracking-widest uppercase font-bold">
                  {BUSINESS_CONFIG.tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#FAF8F5]/70 leading-relaxed max-w-sm font-light">
              Odisha’s premier catering company specializing in grand royal weddings, corporate banquets, traditional Odia feasts, and certified home cook services.
            </p>

            {/* Configurable Contact Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-900/80 transition-all flex items-center justify-center gap-1.5 shadow"
              >
                <span>WhatsApp Instant</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.phonePrimaryRaw}`}
                className="px-4 py-2 rounded-xl glass-medium text-[#FAF8F5] border border-white/15 text-xs font-bold hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5 text-[#F5CE68]" />
                <span>{BUSINESS_CONFIG.phonePrimary}</span>
              </a>
            </div>

            {/* Special Enquiry for <500 Guests Callout in Footer */}
            <div className="p-3 rounded-xl bg-[#041810] border border-[#D4AF37]/35 space-y-1 text-xs">
              <p className="font-bold text-[#F5CE68] flex items-center gap-1.5 text-[11px]">
                <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
                <span>Standard Minimum: 500 Guests</span>
              </p>
              <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
                Special enquiries accepted for smaller events (200, 300+ guests). Call <a href={`tel:${BUSINESS_CONFIG.phonePrimaryRaw}`} className="text-[#F5CE68] font-bold underline">{BUSINESS_CONFIG.phonePrimary}</a> for custom quotations.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-white font-bold text-xs tracking-wider uppercase text-[#F5CE68]">
              Explore Offerings
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link to="/" className="hover:text-[#F5CE68] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F5CE68] transition-colors">
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5CE68] transition-colors">
                  All Catering Services
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#F5CE68] transition-colors">
                  Food Menu & Delicacies
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-[#F5CE68] transition-colors">
                  Catering Packages
                </Link>
              </li>
              <li>
                <Link to="/cook-service" className="hover:text-[#F5CE68] transition-colors">
                  Professional Cook Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer & Booking */}
          <div className="space-y-3">
            <h4 className="font-display text-white font-bold text-xs tracking-wider uppercase text-[#F5CE68]">
              Customer Portal
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link to="/booking" className="hover:text-[#F5CE68] transition-colors font-medium text-white">
                  Book Catering / Cook
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#F5CE68] transition-colors">
                  Photo & Event Gallery
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#F5CE68] transition-colors">
                  Customer Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#F5CE68] transition-colors">
                  Create Customer Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#F5CE68] transition-colors">
                  Track My Bookings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5CE68] transition-colors">
                  Inquiries & Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-display text-white font-bold text-xs tracking-wider uppercase text-[#F5CE68]">
              Headquarters
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/80 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F5CE68] shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F5CE68] shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phonePrimaryRaw}`} className="hover:text-[#F5CE68] transition-colors">
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F5CE68] shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-[#F5CE68] transition-colors">
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#F5CE68] shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/50">
          <p>© 2026 AD Catering and Cook Services. All Rights Reserved. Crafted for unforgettable culinary celebrations.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="flex items-center gap-1 hover:text-[#F5CE68] transition-colors font-medium">
              <Shield className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Admin Portal</span>
            </Link>
            <span>·</span>
            <span>FSSAI Certified Hygiene</span>
            <span>·</span>
            <span>Odisha & Pan-India Feasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

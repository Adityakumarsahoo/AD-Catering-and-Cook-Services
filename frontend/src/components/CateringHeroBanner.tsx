import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat,
  Crown,
  Sparkles,
  ArrowRight,
  CalendarPlus,
  UtensilsCrossed,
  Play,
  PhoneCall,
  X,
  Award,
  ShieldCheck,
  Heart,
  CheckCircle2,
  Users,
  Briefcase,
  Leaf,
  Maximize2,
  Calendar,
  HeartHandshake,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/cateringConfig.js';
import { AnimatedCounter } from './AnimatedCounter.js';

interface CateringHeroBannerProps {
  onOpenBooking?: () => void;
  className?: string;
}

interface FeatureCardInfo {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
  tagline: string;
  highlights: string[];
  link: string;
}

interface ShowcaseCardInfo {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
  link: string;
  description: string;
  capacity: string;
  specialty: string;
}

export const CateringHeroBanner: React.FC<CateringHeroBannerProps> = ({
  className = '',
}) => {
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureCardInfo | null>(null);
  const [selectedShowcase, setSelectedShowcase] = useState<ShowcaseCardInfo | null>(null);

  // 5 Feature Cards (Fully Workable & Interactive)
  const featureCards: FeatureCardInfo[] = [
    {
      id: 'master-cook',
      title: 'Master Cook Team',
      subtitle: 'Certified Halwais & Chefs',
      icon: <ChefHat className="w-5 h-5 text-amber-700" />,
      badge: 'Heritage Chefs',
      tagline: 'Centuries-Old Royal Cooking Recipes & Live Kitchen Artisans',
      highlights: [
        'Dedicated Master Halwais for Chhena Poda, Rasagola, and Traditional Sweets',
        'Specialist Tandoor & Mughlai Biryani Chefs',
        'Hygienic In-Home & Banquet Master Cook Deployment',
        'Complete Culinary Crew with Assistant Cooks & Cleaners',
      ],
      link: '/cook-services',
    },
    {
      id: 'live-buffet',
      title: 'Live Buffet Counters',
      subtitle: 'Modern Setup & Service',
      icon: <UtensilsCrossed className="w-5 h-5 text-emerald-700" />,
      badge: 'Royal LED Buffets',
      tagline: 'Illuminated LED Tables, Live Chaat, Dosa & Tawa Fry Stations',
      highlights: [
        'High-Gloss Acrylic LED Lit Luxury Table Counters',
        'Roll-Top Stainless Steel Chafing Warmers',
        'Interactive Live Dahi Bara Aloo Dum & Puchka Bars',
        'Uniformed Banquet Stewards & Dedicated Counter Managers',
      ],
      link: '/services',
    },
    {
      id: 'all-occasions',
      title: 'For All Occasions',
      subtitle: 'Weddings, Functions, Parties',
      icon: <Users className="w-5 h-5 text-blue-700" />,
      badge: 'All Event Scales',
      tagline: 'From Intimate 50-Guest Family Pujas to 3,000+ Guest Grand Weddings',
      highlights: [
        'Royal Odia Weddings, Receptions & Engagement Galas',
        'Corporate Seminars, Executive Dinners & Annual Galas',
        'Sacred Bratopanayan, Griha Pravesh & Satyanarayan Pujas',
        'Vibrant Birthday Bashes, Anniversary Parties & Family Get-Togethers',
      ],
      link: '/packages',
    },
    {
      id: 'hygienic-food',
      title: 'Hygienic & Fresh Food',
      subtitle: 'Pure Ingredients & Quality',
      icon: <Leaf className="w-5 h-5 text-green-700" />,
      badge: '100% Purity Certified',
      tagline: 'Pure Desi Ghee, Zero Recycled Oils, Filtered Water & FSSAI Standards',
      highlights: [
        '100% Pure Cow Ghee and Cold-Pressed Oils used in all dishes',
        'Daily Farm-Fresh Vegetables & Certified Premium Cuts',
        'RO-Purified Drinking Water for All Cooking & Beverage Prep',
        'Strict Hairnets, Sanitized Gloves & Stainless Steel Kitchen Vessels',
      ],
      link: '/about',
    },
    {
      id: 'menu-planning',
      title: 'Custom Menu Planning',
      subtitle: 'As Per Your Requirements',
      icon: <HeartHandshake className="w-5 h-5 text-rose-700" />,
      badge: 'Tailored Menus',
      tagline: 'Personalized Tasting Sessions & Flexible Budget Curation',
      highlights: [
        'Over 350+ Signature Odia, North Indian, South Indian & Pan-Asian Delicacies',
        'Dedicated Satvik (No-Onion, No-Garlic) Brahmin & Temple Cuisine options',
        'Live Food Tasting Sessions Before Finalizing Your Grand Event',
        'Dynamic Per-Plate or Lump-Sum Pricing tailored to your guest count',
      ],
      link: '/booking',
    },
  ];

  // 4 Showcase Cards (Fully Workable & Interactive)
  const showcaseCards: ShowcaseCardInfo[] = [
    {
      id: 'weddings',
      title: 'Weddings',
      subtitle: 'Grand Feasts, Memorable Moments',
      image: '/images/hero-weddings.jpg',
      icon: <Crown className="w-4 h-4 text-[#F5CE68]" />,
      link: '/services',
      description:
        'Turn your dream wedding into a regal epic with majestic floral buffet counters, authentic royal Odia bhoji feasts, aromatic biryanis, and decadent artisan dessert bars.',
      capacity: '200 to 5,000+ Guests',
      specialty: 'Mutton Kasa, Chenna Jhili, Royal Pulao, Live Chaat Counter',
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      subtitle: 'Professional Catering Solutions',
      image: '/images/hero-corporate.jpg',
      icon: <Briefcase className="w-4 h-4 text-[#F5CE68]" />,
      link: '/services',
      description:
        'Punctual, hygienic, executive-class breakfast spreads, working lunches, cocktail appetizers, and formal gala dinners tailored for top corporate organizations.',
      capacity: '50 to 2,000+ Delegates',
      specialty: 'Continental Appetizers, Live Pasta Bar, Premium High-Tea & Salads',
    },
    {
      id: 'celebrations',
      title: 'Functions & Celebrations',
      subtitle: 'Delicious Food for Every Occasion',
      image: '/images/hero-celebrations.jpg',
      icon: <Sparkles className="w-4 h-4 text-[#F5CE68]" />,
      link: '/services',
      description:
        'Warm, joy-filled catering for Birthdays, Anniversaries, Upanayana thread ceremonies, and Housewarmings that leave every guest asking for second helpings.',
      capacity: '50 to 1,000+ Guests',
      specialty: 'Crispy Starters, Dahi Vada Aloo Dum, Biryani & Custom Cakes',
    },
    {
      id: 'community',
      title: 'Community Feeds',
      subtitle: 'Nutritious Meals in Bulk',
      image: '/images/hero-community.jpg',
      icon: <Leaf className="w-4 h-4 text-[#F5CE68]" />,
      link: '/services',
      description:
        'Large-scale, soulful community feasts, temple prasad bhoji, and mass humanitarian gatherings prepared with sacred purity, discipline, and swift service.',
      capacity: '300 to 10,000+ Servings',
      specialty: 'Kanika, Authentic Odia Dalma, Besara, Khatta & Kheer',
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ====================================================
          MAIN ROYAL LUXURY BANNER CONTAINER (100% WORKABLE REAL DOM)
          ==================================================== */}
      <div className="relative rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] p-[2px] sm:p-[2.5px] bg-gradient-to-b from-[#F5CE68]/85 via-[#D4AF37]/50 to-[#B8860B]/85 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.22)] overflow-hidden group">
        
        {/* Specular Ambient Glow */}
        <div className="absolute -inset-1 rounded-[46px] bg-gradient-to-tr from-[#D4AF37]/25 via-emerald-500/15 to-[#D4AF37]/25 opacity-50 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />

        {/* Master Canvas with Ivory & Gold Royal Theme */}
        <div className="relative w-full rounded-[22px] sm:rounded-[34px] lg:rounded-[42px] overflow-hidden bg-[#FAF8F5] text-[#0A2318] shadow-inner">
          
          {/* ====================================================
              BACKGROUND ARTWORK: MASTER CHEF & ROYAL BANQUET HALL
              ==================================================== */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            {/* Master Chef Photo Backdrop */}
            <img
              src="/images/hero-chef-backdrop.jpg"
              alt="AD Catering Master Chef Plating Gourmet Dish in Grand Banquet"
              className="w-full h-full object-cover object-[75%_center] sm:object-right transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
            />

            {/* Seamless Left Ivory Wash Gradient for Crystal-Clear Typography on Desktop & Tablet */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/98 via-55% sm:via-52% to-[#FAF8F5]/30 sm:to-transparent" />

            {/* Subtle Top & Bottom Vignette for Cinematic Warmth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-[#FAF8F5]/90 pointer-events-none" />

            {/* Decorative Botanical Branch Line Flourish (Left Corner) */}
            <svg
              className="absolute top-2 left-2 w-36 h-36 sm:w-56 sm:h-56 text-[#D4AF37]/20 pointer-events-none hidden sm:block"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path d="M10,10 Q60,20 80,70 Q100,120 70,160 Q40,130 50,80 Q20,60 10,10 Z" opacity="0.25" />
              <path d="M25,5 Q70,40 60,95 Q90,50 130,40 Q85,85 70,130" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* ====================================================
              BANNER CONTENT LAYER (AUTO-ADJUSTS ON MOBILE & DESKTOP)
              ==================================================== */}
          <div className="relative z-10 flex flex-col justify-between p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            
            {/* ----------------------------------------------------
                TOP SUB-HEADER ROW: VISIBLE ON TABLET & DESKTOP (CLEANLY HIDDEN ON MOBILE TO PREVENT DUPLICATION)
                ---------------------------------------------------- */}
            <div className="hidden sm:flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D4AF37]/30">
              
              {/* Brand Monogram & Name */}
              <Link
                to="/"
                className="flex items-center gap-2.5 sm:gap-3 group/brand transition-transform hover:scale-[1.02]"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#052317] border border-[#D4AF37] flex items-center justify-center text-[#F5CE68] shadow-md group-hover/brand:border-[#FFDF73] shrink-0">
                  <ChefHat className="w-5 h-5 text-[#F5CE68]" />
                </div>
                <div>
                  <span className="font-serif font-black text-sm sm:text-base text-[#0A2318] tracking-tight block leading-tight">
                    AD Catering
                  </span>
                  <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#8A6D24] uppercase tracking-wider block">
                    and Cook Services
                  </span>
                </div>
              </Link>

              {/* Working Navigation Links (XL screens) */}
              <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-[#1E3A2F]">
                <Link to="/" className="hover:text-[#B8860B] transition-colors pb-0.5 border-b-2 border-[#B8860B]">
                  Home
                </Link>
                <Link to="/about" className="hover:text-[#B8860B] transition-colors">
                  About Us
                </Link>
                <Link to="/services" className="hover:text-[#B8860B] transition-colors">
                  Our Services
                </Link>
                <Link to="/menu" className="hover:text-[#B8860B] transition-colors">
                  Menu
                </Link>
                <Link to="/packages" className="hover:text-[#B8860B] transition-colors">
                  Events
                </Link>
                <Link to="/gallery" className="hover:text-[#B8860B] transition-colors">
                  Gallery
                </Link>
                <Link to="/contact" className="hover:text-[#B8860B] transition-colors">
                  Contact
                </Link>
              </nav>

              {/* Top Right Actions: Book Event Button & Lightbox Poster Button */}
              <div className="flex items-center gap-2">
                <Link
                  to="/booking"
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#052317] hover:bg-[#083524] text-white text-[11px] sm:text-xs font-black tracking-wide border border-[#D4AF37]/60 shadow-[0_4px_15px_rgba(5,35,23,0.35)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.45)] hover:border-[#F5CE68] transition-all flex items-center gap-2 group/btn"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F5CE68]" />
                  <span>Book Your Event</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5CE68] group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0A2318] border border-[#D4AF37]/50 shadow transition-all hover:scale-105"
                  title="View Full Screen Showcase"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ----------------------------------------------------
                CENTER HERO SPLIT: TYPOGRAPHY, MOBILE CHEF CARD, & 5 PILLARS
                ---------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-center">
              
              {/* Left Column: Royal Typography, Motto & Working Buttons (7 cols on lg) */}
              <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
                
                {/* Royal Tagline Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DA] border border-[#D4AF37]/60 text-[9px] sm:text-[11px] font-black tracking-[0.14em] text-[#8C6D1F] uppercase shadow-sm">
                  <ChefHat className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59B27]" />
                  <span>Royal Hospitality & Banquet Excellence • Odisha</span>
                  <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59B27]" />
                </div>

                {/* Main Headline */}
                <div className="space-y-0.5">
                  <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-[52px] text-[#0A2318] tracking-tight leading-[1.05]">
                    AD Catering
                  </h1>
                  <p className="font-serif italic font-bold text-2xl sm:text-3xl lg:text-[40px] text-gradient-gold tracking-tight leading-tight">
                    and Cook Services
                  </p>
                </div>

                {/* Decorative Motto Divider */}
                <div className="flex items-center gap-2 max-w-lg">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59B27]/60 to-[#C59B27]" />
                  <span className="text-[9px] sm:text-[10.5px] font-black uppercase tracking-[0.18em] text-[#97731F] shrink-0">
                    Delicious Food For Every Special Occasion
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C59B27]/60 to-[#C59B27]" />
                </div>

                {/* Subtitle Description */}
                <p className="text-[12.5px] sm:text-sm lg:text-[14px] text-neutral-700 font-medium leading-relaxed max-w-xl">
                  Odisha's Premier Choice for Grand Royal Weddings, Authentic Heritage Bhojis, Live LED Buffet Counters & Certified In-Home Master Cook Services.
                </p>

                {/* Interactive Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  
                  {/* Button 1: Explore Our Services */}
                  <Link
                    to="/services"
                    className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#052317] hover:bg-[#073322] border border-[#D4AF37]/60 text-white text-xs sm:text-sm font-black tracking-wide shadow-[0_6px_20px_rgba(5,35,23,0.35)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:border-[#F5CE68] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group/explore"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5 text-[#F5CE68]" />
                    <span>Explore Our Services</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F5CE68] group-hover/explore:translate-x-1 transition-transform" />
                  </Link>

                  {/* Button 2: Watch Our Story */}
                  <button
                    type="button"
                    onClick={() => setStoryModalOpen(true)}
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white hover:bg-neutral-50 border border-[#D4AF37]/50 text-[#0A2318] text-xs sm:text-sm font-bold shadow-sm hover:shadow-md hover:border-[#C59B27] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group/story"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#052317] flex items-center justify-center text-[#F5CE68] shadow shrink-0">
                      <Play className="w-2 h-2 fill-current ml-0.5 text-[#F5CE68]" />
                    </div>
                    <span>Watch Our Story</span>
                  </button>
                </div>

                {/* ----------------------------------------------------
                    MOBILE CHEF FEATURE SHOWCASE (ONLY ON MOBILE & TABLET < lg)
                    Brings the chef plating visual front-and-center on phones
                    ---------------------------------------------------- */}
                <div className="lg:hidden relative rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-md my-2">
                  <div className="relative w-full h-44 sm:h-52 bg-neutral-900">
                    <img
                      src="/images/hero-chef-backdrop.jpg"
                      alt="AD Catering Master Chef Plating Royal Gourmet Dish"
                      className="w-full h-full object-cover object-[70%_25%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041A12]/95 via-transparent to-transparent" />
                    
                    {/* Chef Name & Tagline Overlay */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#052317] border border-[#F5CE68] flex items-center justify-center text-[#F5CE68] shadow">
                          <ChefHat className="w-4 h-4 text-[#F5CE68]" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-white leading-tight">Master Chef Culinary Artistry</p>
                          <p className="text-[10px] text-[#F5CE68] font-semibold">AD Catering & Certified Halwais</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/80 text-[9px] font-black text-[#F5CE68] uppercase tracking-wider backdrop-blur-sm shadow">
                        Live On-Site
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: 5 Feature Cards (Mobile: Horizontal Swipe Carousel | Desktop: Vertical 5-Stack) */}
              <div className="lg:col-span-5 w-full">
                
                {/* Mobile Section Header with Swipe Hint */}
                <div className="flex items-center justify-between pb-1.5 lg:hidden">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#8C6D1F] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Culinary Pillars</span>
                  </span>
                  <span className="text-[10px] text-neutral-500 font-semibold">Swipe cards →</span>
                </div>

                {/* Cards Container: Horizontal Scroll on Mobile, Vertical Stack on Desktop */}
                <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar snap-x snap-mandatory">
                  {featureCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setSelectedFeature(card)}
                      className="w-[250px] sm:w-[270px] lg:w-full shrink-0 snap-start text-left p-2.5 sm:p-3 rounded-2xl bg-white/95 hover:bg-white border border-[#E6DECE] hover:border-[#D4AF37] shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.3)] backdrop-blur-md transition-all duration-300 hover:-translate-x-1 flex items-center justify-between gap-2.5 group/card cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF5EA] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 group-hover/card:bg-[#052317] group-hover/card:border-[#F5CE68] transition-colors">
                          {card.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-black text-[#0A2318] group-hover/card:text-[#8C6D1F] transition-colors leading-snug truncate">
                            {card.title}
                          </h4>
                          <p className="text-[10px] sm:text-[11.5px] text-neutral-600 font-medium leading-snug truncate">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF5EA] group-hover/card:bg-[#052317] text-neutral-400 group-hover/card:text-[#F5CE68] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 transition-colors">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------
                BOTTOM 4 SHOWCASE CARDS:
                Mobile: Horizontal Snap Carousel (App Style) | Desktop: 4-Column Grid
                ---------------------------------------------------- */}
            <div className="space-y-2 pt-1">
              
              {/* Mobile Showcase Header with Swipe Hint */}
              <div className="flex items-center justify-between pb-1 sm:hidden">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#8C6D1F] flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Grand Banquets & Feasts</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-semibold">Swipe to explore →</span>
              </div>

              {/* Showcase Cards List */}
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 no-scrollbar snap-x snap-mandatory">
                {showcaseCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedShowcase(card)}
                    className="w-[78vw] max-w-[280px] sm:w-auto shrink-0 snap-center relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E6DECE] hover:border-[#D4AF37] bg-white shadow-md hover:shadow-[0_12px_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-1 group/showcase cursor-pointer flex flex-col"
                  >
                    {/* Card Photo */}
                    <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-neutral-900">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover/showcase:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#041810]/85 border border-[#D4AF37]/60 text-[9px] font-bold text-[#F5CE68] uppercase tracking-wider backdrop-blur-sm">
                        {card.capacity}
                      </div>
                    </div>

                    {/* Card Bottom Pill */}
                    <div className="p-2.5 sm:p-3 bg-white flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#052317] text-[#F5CE68] flex items-center justify-center shrink-0 shadow">
                          {card.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-[13px] font-black text-[#0A2318] truncate group-hover/showcase:text-[#8C6D1F] transition-colors leading-tight">
                            {card.title}
                          </h4>
                          <p className="text-[9.5px] sm:text-[10.5px] text-neutral-600 truncate leading-tight">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right Round Arrow Button */}
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF5EA] group-hover/showcase:bg-[#052317] text-neutral-600 group-hover/showcase:text-[#F5CE68] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 transition-colors">
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ----------------------------------------------------
                BOTTOM TRUST & METRICS BAR (DEEP EMERALD & GOLD)
                Mobile: Compact 2x2 Grid | Desktop: Divided 4-Col Row
                ---------------------------------------------------- */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#041A12] border border-[#D4AF37]/50 p-3 sm:p-4 shadow-xl text-white">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D4AF37]/25 text-center sm:text-left">
                
                {/* Metric 1 */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 px-1 sm:px-4 py-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-950/80 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5CE68] shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5CE68]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-black text-white flex items-center justify-center sm:justify-start">
                      <AnimatedCounter end={500} suffix="+" triggerOnView={true} />
                    </div>
                    <p className="text-[9px] sm:text-[11px] font-bold text-[#CBD5E1] uppercase tracking-wider">
                      Grand Banquets
                    </p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 px-1 sm:px-4 py-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-950/80 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5CE68] shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5CE68]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-black text-white flex items-center justify-center sm:justify-start">
                      <AnimatedCounter end={15} suffix="+ Years" triggerOnView={true} />
                    </div>
                    <p className="text-[9px] sm:text-[11px] font-bold text-[#CBD5E1] uppercase tracking-wider">
                      Master Experience
                    </p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 px-1 sm:px-4 py-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-950/80 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5CE68] shrink-0">
                    <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5CE68]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-black text-white flex items-center justify-center sm:justify-start">
                      <AnimatedCounter end={100} suffix="%" triggerOnView={true} />
                    </div>
                    <p className="text-[9px] sm:text-[11px] font-bold text-[#CBD5E1] uppercase tracking-wider">
                      Live On-Site Cooking
                    </p>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 px-1 sm:px-4 py-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-950/80 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5CE68] shrink-0">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5CE68]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-black text-white flex items-center justify-center sm:justify-start">
                      <AnimatedCounter end={100} suffix="%" triggerOnView={true} />
                    </div>
                    <p className="text-[9px] sm:text-[11px] font-bold text-[#CBD5E1] uppercase tracking-wider">
                      Purity & Hygiene
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ====================================================
          LUXURY QUICK ACTION DECK (MOBILE & DESKTOP ADAPTIVE)
          ==================================================== */}
      <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#03150E]/95 border border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3.5 sm:gap-4">
        
        {/* Left: Brand Promise */}
        <div className="flex items-center gap-3 text-center md:text-left w-full md:w-auto justify-center md:justify-start">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#B8860B] via-[#F5CE68] to-[#FFDF73] flex items-center justify-center text-[#041810] shadow shrink-0">
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#041810]" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-black text-white">
              Odisha's Royal Hospitality & Banquets
            </p>
            <p className="text-[10px] sm:text-[11px] text-[#CBD5E1]">
              Live Cooking Stations • Master Halwai Teams • Luxury LED Buffets
            </p>
          </div>
        </div>

        {/* Right: Quick Action Buttons (Responsive Layout) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full md:w-auto">
          <Link
            to="/booking"
            className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-[0_6px_20px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <CalendarPlus className="w-4 h-4 shrink-0 text-[#041810]" />
            <span>Reserve Your Event Date</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#041810]" />
          </Link>

          <div className="grid grid-cols-2 sm:flex items-center gap-2">
            <Link
              to="/services"
              className="px-4 py-2.5 sm:py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] shadow transition-all flex items-center justify-center gap-1.5"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
              <span>All Services</span>
            </Link>

            <a
              href={BUSINESS_CONFIG.phoneTel}
              className="px-4 py-2.5 sm:py-3 rounded-xl bg-[#041810]/80 hover:bg-[#06291C] border border-[#D4AF37]/40 text-xs font-bold text-[#CBD5E1] hover:text-[#F5CE68] transition-all flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* ====================================================
          MODAL 1: FEATURE DETAIL MODAL (WHEN ANY RIGHT CARD IS CLICKED)
          ==================================================== */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#041810] border-2 border-[#D4AF37]/70 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-5 sm:p-8 space-y-5 text-[#FAF8F5]">
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow transition-all"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#B8860B] via-[#F5CE68] to-[#FFDF73] flex items-center justify-center text-[#041810] shadow shrink-0">
                {selectedFeature.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5CE68]">
                  {selectedFeature.badge}
                </span>
                <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
                  {selectedFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              {selectedFeature.tagline}
            </p>

            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-bold text-[#F5CE68] uppercase tracking-wider">
                Key Features & Guarantees:
              </p>
              {selectedFeature.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#E2E8F0] p-2.5 rounded-xl bg-emerald-950/40 border border-[#D4AF37]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D4AF37]/30">
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-white"
              >
                Close
              </button>
              <Link
                to={selectedFeature.link}
                onClick={() => setSelectedFeature(null)}
                className="px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md flex items-center gap-1.5"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL 2: SHOWCASE DETAIL MODAL (WHEN ANY BOTTOM CARD IS CLICKED)
          ==================================================== */}
      {selectedShowcase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#041810] border-2 border-[#D4AF37]/70 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-5 sm:p-7 space-y-4 text-[#FAF8F5]">
            <button
              type="button"
              onClick={() => setSelectedShowcase(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow transition-all z-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Showcase Image Banner */}
            <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden border border-[#D4AF37]/40">
              <img
                src={selectedShowcase.image}
                alt={selectedShowcase.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-black text-lg sm:text-2xl text-white">
                    {selectedShowcase.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#F5CE68]">{selectedShowcase.subtitle}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37] text-[10px] sm:text-xs font-bold text-[#F5CE68]">
                  {selectedShowcase.capacity}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              {selectedShowcase.description}
            </p>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/30 text-xs space-y-1">
              <p className="font-bold text-[#F5CE68] uppercase tracking-wider text-[10.5px]">
                Signature Dishes & Highlights:
              </p>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedShowcase.specialty}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D4AF37]/30">
              <button
                type="button"
                onClick={() => setSelectedShowcase(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-white"
              >
                Close
              </button>
              <Link
                to="/booking"
                onClick={() => setSelectedShowcase(null)}
                className="px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md flex items-center gap-1.5"
              >
                <span>Reserve Event Date</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL 3: "WATCH OUR STORY" CULINARY HERITAGE MODAL
          ==================================================== */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#041810] border-2 border-[#D4AF37]/70 shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-5 sm:p-8 space-y-5 text-[#FAF8F5]">
            <button
              type="button"
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow transition-all"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#B8860B] via-[#F5CE68] to-[#FFDF73] flex items-center justify-center text-[#041810] shadow shrink-0">
                <ChefHat className="w-6 h-6 text-[#041810]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5CE68]">
                  Our Story & Heritage
                </span>
                <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
                  15+ Years of Master Culinary Craft
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              Founded with a passion for authentic Odia heritage recipes, royal Mughal-era banquets, and genuine golden hospitality, <strong className="text-[#F5CE68]">AD Catering and Cook Services</strong> has served over 500+ memorable weddings, corporate galas, and sacred puja gatherings across Bhubaneswar, Cuttack, Puri, and all Odisha.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/30 text-xs">
                <Award className="w-4 h-4 text-[#F5CE68] mb-1" />
                <p className="font-bold text-white">Master Halwais</p>
                <p className="text-[11px] text-[#94A3B8]">Authentic Chhena Poda & Sweets</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/30 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                <p className="font-bold text-white">FSSAI Certified</p>
                <p className="text-[11px] text-[#94A3B8]">100% Pure Cow Ghee & Hygiene</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D4AF37]/30">
              <button
                type="button"
                onClick={() => setStoryModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-white"
              >
                Close
              </button>
              <Link
                to="/booking"
                onClick={() => setStoryModalOpen(false)}
                className="px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md"
              >
                Book Your Event Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL 4: FULL-SCREEN LIGHTBOX MODAL
          ==================================================== */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl rounded-3xl bg-[#041810] border-2 border-[#D4AF37]/70 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden p-3 sm:p-5 space-y-4">
            
            <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#F5CE68]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#F5CE68]">
                  AD Catering & Cook Services • Official Master Design Showcase
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-full bg-[#06291C] hover:bg-emerald-950 text-[#F5CE68] border border-[#D4AF37]/50 shadow transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              className="relative w-full rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-black/80"
              style={{ aspectRatio: '1024 / 540' }}
            >
              <img
                src="/images/hero-luxury-showcase.jpg"
                alt="Full Resolution Master Hero Showcase"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 pt-1">
              <p className="text-xs text-[#CBD5E1]">
                Serving royal weddings, corporate banquets, and master cook hire across Odisha.
              </p>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-white"
                >
                  Close
                </button>
                <Link
                  to="/booking"
                  onClick={() => setLightboxOpen(false)}
                  className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md"
                >
                  Reserve Your Event Date
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

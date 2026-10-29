import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useMenuCart } from '../context/MenuCartContext.js';
import { TiltCard } from '../components/TiltCard.js';
import { MagneticButton } from '../components/MagneticButton.js';
import { AnimatedCounter } from '../components/AnimatedCounter.js';
import { FoodDetailModal } from '../components/FoodDetailModal.js';
import { BanquetCalculator } from '../components/BanquetCalculator.js';
import { BanquetPackagesSection } from '../components/BanquetPackagesSection.js';
import { CateringHeroBanner } from '../components/CateringHeroBanner.js';
import { ADBrandEmblem } from '../components/ADBrandEmblem.js';
import { defaultServices } from '../data/defaultServices.js';
import { defaultMenuItems } from '../data/defaultMenu.js';
import { defaultPackages } from '../data/defaultData.js';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  ChefHat,
  Star,
  CheckCircle2,
  Calendar,
  UtensilsCrossed,
  Flame,
  Plus,
  Check,
  Crown,
  HeartHandshake,
  Eye,
  Heart,
  Briefcase,
  Cake,
  Leaf,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { toggleDish, isDishSelected } = useMenuCart();
  const ROYAL_SIGNATURE_IDS = ['menu_278', 'menu_140', 'menu_300', 'menu_222', 'menu_365', 'menu_21'];
  const signatureDishes = ROYAL_SIGNATURE_IDS
    .map(id => defaultMenuItems.find(i => i.id === id))
    .filter(Boolean);
  const [featuredMenu, setFeaturedMenu] = useState<any[]>(
    signatureDishes.length > 0 ? signatureDishes : defaultMenuItems.slice(0, 6)
  );
  const [featuredServices, setFeaturedServices] = useState<any[]>(defaultServices);
  const [serviceFilter, setServiceFilter] = useState<string>('ALL');
  const [packages, setPackages] = useState<any[]>(defaultPackages);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [menuRes, srvRes, pkgRes, revRes] = await Promise.all([
          api.getMenu({ category: 'ALL' }).catch(() => null),
          api.getServices().catch(() => null),
          api.getPackages().catch(() => null),
          api.getReviews().catch(() => null),
        ]);
        if (menuRes?.menuItems && menuRes.menuItems.length > 0) {
          const curated = ROYAL_SIGNATURE_IDS
            .map(id => menuRes.menuItems.find((i: any) => i.id === id))
            .filter(Boolean);
          setFeaturedMenu(curated.length > 0 ? curated : menuRes.menuItems.slice(0, 6));
        }
        if (srvRes?.services && srvRes.services.length > 0) {
          setFeaturedServices(srvRes.services);
        }
        if (pkgRes?.packages && pkgRes.packages.length > 0) {
          setPackages(pkgRes.packages);
        }
        if (revRes?.reviews && revRes.reviews.length > 0) {
          setReviews(revRes.reviews.slice(0, 3));
        }
      } catch (err) {
        console.warn('Live homepage data sync notice:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);



  return (
    <div className="relative overflow-hidden text-[#FAF8F5]">
      {/* Food Detail Modal */}
      <FoodDetailModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* ====================================================
          1. CINEMATIC ROYAL EMERALD & GOLD HERO SECTION
          ==================================================== */}
      <section className="relative min-h-[96vh] flex flex-col justify-center pt-28 sm:pt-36 pb-20 overflow-hidden">
        {/* Subtle Ambient Emerald & Golden Glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#D4AF37]/15 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
          
          {/* A. Featured Official Royal Catering Banner matching uploaded 'Elegant Green and Gold Catering Banner (1).png' */}
          <CateringHeroBanner className="shadow-[0_25px_80px_rgba(0,0,0,0.75)]" />

          {/* B. Core Brand Intro Grid with 3D Monogram & Interactive Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Left Emerald & Gold Frosted Card */}
            <div className="lg:col-span-7">
              <TiltCard maxTilt={3}>
                <div className="p-6 sm:p-10 rounded-3xl sm:rounded-[38px] glass-strong border border-[#D4AF37]/50 shadow-[0_24px_70px_rgba(0,0,0,0.6)] space-y-6 relative overflow-hidden liquid-shine">
                  {/* Specular golden edge */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5CE68] to-transparent" />

                  {/* Kicker badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041810]/90 border border-[#D4AF37]/60 shadow-md">
                    <Crown className="w-4 h-4 text-[#F5CE68]" />
                    <span className="text-xs font-bold tracking-wider uppercase text-[#F5CE68]">
                      AD Catering & Cook Services • Odisha
                    </span>
                  </div>

                  {/* Headline */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F5CE68]">
                      Royal Odia Hospitality & Grand Banquets
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                      <span>Delicious Food for</span>
                      <br />
                      <span className="gold-gradient-text drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">
                        Every Special Occasion.
                      </span>
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#CBD5E1] max-w-xl leading-relaxed">
                    Crafting authentic Odia delicacies, royal Indian wedding buffets, and professional live cook services with pure ingredients, skilled halwais, and golden hospitality.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                    <MagneticButton
                      to="/booking"
                      variant="gold"
                      className="w-full sm:w-auto justify-center px-8 py-4 rounded-2xl text-sm font-bold shadow-lg text-center"
                    >
                      <Calendar className="w-4 h-4 text-[#0E0704] shrink-0" />
                      <span>Book Your Event</span>
                      <ArrowRight className="w-4 h-4 text-[#0E0704] group-hover:translate-x-1 transition-transform shrink-0" />
                    </MagneticButton>

                    <MagneticButton
                      to="/menu"
                      variant="ice"
                      className="w-full sm:w-auto justify-center px-8 py-4 rounded-2xl text-sm font-bold shadow-sm bg-emerald-950/70 border border-[#D4AF37]/50 text-[#F5CE68] hover:bg-emerald-900 text-center"
                    >
                      <UtensilsCrossed className="w-4 h-4 text-[#F5CE68] shrink-0" />
                      <span>Explore Menu</span>
                    </MagneticButton>
                  </div>

                  {/* Animated Counters */}
                  <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#D4AF37]/25">
                    <div className="p-3.5 rounded-2xl bg-[#041810]/70 border border-[#D4AF37]/35 text-center shadow-inner">
                      <p className="font-display text-2xl sm:text-3xl font-black text-[#F5CE68]">
                        <AnimatedCounter end={500} suffix="+" triggerOnView={true} />
                      </p>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5 font-bold">Happy Gatherings</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#041810]/70 border border-[#D4AF37]/35 text-center shadow-inner">
                      <p className="font-display text-2xl sm:text-3xl font-black text-white">
                        <AnimatedCounter end={50} suffix="+" triggerOnView={true} />
                      </p>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5 font-bold">Grand Banquets</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#041810]/70 border border-[#D4AF37]/35 text-center shadow-inner">
                      <p className="font-display text-2xl sm:text-3xl font-black text-[#F5CE68]">
                        <AnimatedCounter end={20} suffix="+" triggerOnView={true} />
                      </p>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5 font-bold">Signature Dishes</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#041810]/70 border border-[#D4AF37]/35 text-center shadow-inner">
                      <p className="font-display text-2xl sm:text-3xl font-black text-emerald-400">
                        <AnimatedCounter end={100} suffix="%" triggerOnView={true} />
                      </p>
                      <p className="text-[11px] text-emerald-400 mt-0.5 font-bold">Pure & Hygienic</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Right Card with Live Culinary Showcase */}
            <div className="lg:col-span-5 relative">
              <TiltCard maxTilt={5}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-[#D4AF37]/20 to-transparent rounded-[40px] blur-2xl transform -rotate-2" />

                  <div className="relative rounded-[36px] overflow-hidden glass-strong border border-[#D4AF37]/50 shadow-[0_24px_60px_rgba(0,0,0,0.6)] p-3">
                    <div className="relative rounded-[28px] overflow-hidden h-[390px] sm:h-[430px]">
                      <img
                        src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80"
                        alt="Grand Wedding Catering Feast"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/90 via-[#020D08]/30 to-transparent" />
                      
                      {/* Floating Bottom Card */}
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/50 backdrop-blur-xl flex items-center justify-between shadow-2xl">
                        <div>
                          <div className="flex items-center gap-1.5 text-[#F5CE68]">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase font-bold tracking-widest">
                              Royal Wedding Specialist
                            </span>
                          </div>
                          <h3 className="font-display text-base font-bold text-white mt-0.5">
                            Full Banquets & Live Counters
                          </h3>
                        </div>
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow-md shrink-0">
                          <ChefHat className="w-5 h-5 text-[#041810]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top-Left Floating Pill */}
                  <div className="absolute -top-4 -left-4 sm:-left-8 p-3 rounded-2xl bg-[#041810]/95 border border-[#D4AF37]/60 shadow-xl backdrop-blur-2xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C5D05] p-[1px]">
                      <div className="w-full h-full bg-[#041810] rounded-[11px] flex items-center justify-center text-[#F5CE68]">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Authentic Odia Taste</p>
                      <p className="text-[10px] text-[#F5CE68]">Chhena Poda & Dalma</p>
                    </div>
                  </div>

                  {/* Bottom-Right Floating Pill */}
                  <div className="absolute -bottom-5 -right-3 sm:-right-6 p-3 rounded-2xl bg-[#041810]/95 border border-[#D4AF37]/60 shadow-xl backdrop-blur-2xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">FSSAI Certified</p>
                      <p className="text-[10px] text-emerald-400 font-semibold">100% Sanitized Kitchens</p>
                    </div>
                  </div>

                </div>
              </TiltCard>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================
          2. PREMIER CATERING SERVICES SECTION
          ==================================================== */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/90 via-[#062417] to-emerald-950/90 border border-[#D4AF37]/60 text-xs font-black tracking-widest text-[#F5CE68] uppercase shadow-[0_4px_20px_rgba(212,175,55,0.25)]">
                <Crown className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
                <span>EXQUISITE BANQUET & LIVE COUNTER SOLUTIONS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Our Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF1B8] via-[#FFDF73] to-[#D4AF37]">Catering Services</span>
              </h2>
              <p className="text-sm text-[#CBD5E1] max-w-2xl leading-relaxed">
                From grand multi-day royal wedding banquets and authentic Odia banana leaf feasts to live LED light tables and executive corporate galas — freshly prepared and graciously served.
              </p>
            </div>

            <Link
              to="/services"
              className="px-5 py-3 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/60 text-xs font-black text-[#F5CE68] hover:text-white hover:bg-emerald-950 inline-flex items-center gap-2.5 group transition-all shadow-[0_6px_20px_rgba(0,0,0,0.5)] shrink-0 self-start md:self-end"
            >
              <span>Explore All 12 Offerings</span>
              <ArrowRight className="w-4 h-4 text-[#F5CE68] group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {[
              { id: 'ALL', label: 'All Offerings', icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'COOK', label: 'Master Cook Hire', icon: <ChefHat className="w-3.5 h-3.5" /> },
              { id: 'WEDDING', label: 'Royal Weddings', icon: <Crown className="w-3.5 h-3.5" /> },
              { id: 'ODIA', label: 'Odia Banana Leaf', icon: <Leaf className="w-3.5 h-3.5" /> },
              { id: 'LIGHT_TABLE', label: 'Live Light Tables', icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'PARTIES', label: 'Parties & Corporate', icon: <Briefcase className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setServiceFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-2 whitespace-nowrap transition-all ${
                  serviceFilter === tab.id
                    ? 'gold-gradient-btn text-[#041810] shadow-[0_4px_15px_rgba(212,175,55,0.4)] scale-105'
                    : 'bg-[#041810]/80 border border-[#D4AF37]/40 text-[#CBD5E1] hover:text-[#F5CE68] hover:border-[#D4AF37]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredServices && featuredServices.length > 0 ? featuredServices : defaultServices)
              .filter((srv) => {
                if (serviceFilter === 'ALL') return true;
                const t = (srv.title || '').toLowerCase();
                if (serviceFilter === 'COOK') return srv.category === 'cook' || t.includes('cook');
                if (serviceFilter === 'WEDDING') return t.includes('wedding');
                if (serviceFilter === 'ODIA') return t.includes('odia') || t.includes('feast');
                if (serviceFilter === 'LIGHT_TABLE') return t.includes('light') || t.includes('led');
                if (serviceFilter === 'PARTIES') return t.includes('birth') || t.includes('anniversary') || t.includes('corp');
                return true;
              })
              .slice(0, 8)
              .map((srv) => {
                const titleLower = (srv.title || '').toLowerCase();
                const isWedding = srv.id === 'srv_1' || titleLower.includes('wedding');
                const isOdia = srv.id === 'srv_2' || titleLower.includes('odia') || titleLower.includes('feast');
                const isLightTable = srv.id === 'srv_light_table' || titleLower.includes('light') || titleLower.includes('led');
                const isParty = srv.id === 'srv_3' || titleLower.includes('birth') || titleLower.includes('anniversary');
                const isCorporate = srv.id === 'srv_4' || titleLower.includes('corp');
                const isHousewarming = srv.id === 'srv_5' || titleLower.includes('housewarming') || titleLower.includes('puja');
                const isOutdoor = srv.id === 'srv_6' || titleLower.includes('outdoor') || titleLower.includes('destination');
                const isCook = srv.id === 'srv_7' || titleLower.includes('master home cook') || titleLower.includes('home cook');
                const isNonVeg = srv.id === 'srv_9' || titleLower.includes('non-veg') || titleLower.includes('non veg');
                const isSatvik = srv.id === 'srv_10' || titleLower.includes('satvik') || titleLower.includes('pure veg');
                const isBbq = srv.id === 'srv_11' || titleLower.includes('bbq') || titleLower.includes('barbecue') || titleLower.includes('weekend bbq');
                const isBulk = srv.id === 'srv_12' || titleLower.includes('bulk cooking') || titleLower.includes('event kitchen');

                // Explicitly applied titles requested by the user
                const displayTitle = isNonVeg
                  ? 'Non-Veg Specialist Cook'
                  : isSatvik
                  ? 'Satvik & Pure Veg Specialist Cook'
                  : isBbq
                  ? 'Party & Weekend BBQ Cook'
                  : isBulk
                  ? 'Bulk Cooking & Event Kitchen Crew'
                  : isOdia
                  ? 'Odia Feast Catering'
                  : isLightTable
                  ? 'Royal LED Light Table'
                  : isWedding
                  ? 'Grand Wedding Catering'
                  : isParty
                  ? 'Birthday & Anniversary Catering'
                  : isCorporate
                  ? 'Corporate Galas & Conferences'
                  : isHousewarming
                  ? 'Housewarming & Puja Catering'
                  : isOutdoor
                  ? 'Outdoor & Destination Catering'
                  : isCook
                  ? 'Master Home Cook Service'
                  : srv.title;

                // Explicitly assigned images requested by the user
                const displayImage = isNonVeg
                  ? '/images/non-veg-specialist-cook.jpg'
                  : isSatvik
                  ? '/images/satvik-pure-veg-cook.jpg'
                  : isBbq
                  ? '/images/party-weekend-bbq-cook.jpg'
                  : isBulk
                  ? '/images/bulk-cooking-event-crew.jpg'
                  : isWedding
                  ? '/images/grand-wedding-catering.jpg'
                  : isOdia
                  ? '/images/odia-feast-catering.jpg'
                  : isLightTable
                  ? '/images/royal-led-light-table.jpg'
                  : isParty
                  ? '/images/birthday-anniversary-catering.jpg'
                  : isCorporate
                  ? '/images/corporate-galas-catering.jpg'
                  : isHousewarming
                  ? '/images/housewarming-puja-catering.jpg'
                  : isOutdoor
                  ? '/images/outdoor-destination-catering.jpg'
                  : isCook
                  ? '/images/master-home-cook-service.jpg'
                  : srv.image;

                const categoryLabel = isNonVeg
                  ? 'Non-Veg Master'
                  : isSatvik
                  ? 'Satvik & Pure Veg'
                  : isBbq
                  ? 'Live BBQ Grill'
                  : isBulk
                  ? 'Mass Event Crew'
                  : isWedding
                  ? 'Royal Wedding'
                  : isOdia
                  ? 'Heritage Feast'
                  : isLightTable
                  ? 'Live Light Table'
                  : isParty
                  ? 'Social & Birthday'
                  : isCorporate
                  ? 'Executive Gala'
                  : isHousewarming
                  ? 'Sacred Puja & Havan'
                  : isOutdoor
                  ? 'Outdoor Destination'
                  : isCook
                  ? 'Master Chef Hire'
                  : 'Premier Banquet';

                const luxuryTag = isNonVeg
                  ? 'Flame & Handi Special'
                  : isSatvik
                  ? '100% Vedic Purity'
                  : isBbq
                  ? 'Live Charcoal Vibes'
                  : isBulk
                  ? 'Mass Feast Masters'
                  : isWedding
                  ? 'Royal Signature'
                  : isOdia
                  ? 'Authentic Bhoji'
                  : isLightTable
                  ? 'Illuminated Glow'
                  : isParty
                  ? 'Celebration Special'
                  : isCorporate
                  ? 'Executive Gala'
                  : isHousewarming
                  ? 'Satvik Purity'
                  : isOutdoor
                  ? 'Destination Luxe'
                  : isCook
                  ? 'Private Chef Hire'
                  : 'Bespoke Catering';

                const luxuryIcon = isNonVeg ? (
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                ) : isSatvik ? (
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                ) : isBbq ? (
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                ) : isBulk ? (
                  <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
                ) : isWedding ? (
                  <Crown className="w-3.5 h-3.5 text-[#FFDF73]" />
                ) : isOdia ? (
                  <Award className="w-3.5 h-3.5 text-[#4ADE80]" />
                ) : isLightTable ? (
                  <Sparkles className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
                ) : isParty ? (
                  <Cake className="w-3.5 h-3.5 text-[#F472B6]" />
                ) : isCorporate ? (
                  <Briefcase className="w-3.5 h-3.5 text-[#60A5FA]" />
                ) : isHousewarming ? (
                  <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                ) : isOutdoor ? (
                  <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
                ) : isCook ? (
                  <ChefHat className="w-3.5 h-3.5 text-[#4ADE80]" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-[#FFDF73]" />
                );

                const liveIndicator = isNonVeg
                  ? 'Mutton, Prawn, Fish & Tandoor'
                  : isSatvik
                  ? 'No Onion • No Garlic Purity'
                  : isBbq
                  ? 'Live Sizzle & Charcoal Grills'
                  : isBulk
                  ? 'From 100 to 10,000+ Guests'
                  : isLightTable
                  ? 'Live Neon Light Counter'
                  : isOdia
                  ? 'Authentic Banana Leaf'
                  : isWedding
                  ? 'Live Steam Warmers & Stewards'
                  : isParty
                  ? 'Live Chaat & Dessert Bar'
                  : isCorporate
                  ? 'High-Speed Executive Flow'
                  : isHousewarming
                  ? '100% Purity Satvik Bhog'
                  : isOutdoor
                  ? 'Mobile Outdoor Kitchen'
                  : isCook
                  ? 'Certified Chef At Home'
                  : 'Full Turnkey Live Setup';

                const categoryIcon = (isNonVeg || isBbq) ? (
                  <Flame className="w-3.5 h-3.5 text-[#F5CE68]" />
                ) : isSatvik ? (
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                ) : isBulk ? (
                  <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
                ) : isWedding ? (
                  <Crown className="w-3.5 h-3.5 text-[#FFDF73]" />
                ) : isOdia ? (
                  <Leaf className="w-3.5 h-3.5 text-[#4ADE80]" />
                ) : isLightTable ? (
                  <Sparkles className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
                ) : isParty ? (
                  <Cake className="w-3.5 h-3.5 text-[#F472B6]" />
                ) : isCorporate ? (
                  <Briefcase className="w-3.5 h-3.5 text-[#60A5FA]" />
                ) : isHousewarming ? (
                  <Leaf className="w-3.5 h-3.5 text-[#F5CE68]" />
                ) : isOutdoor ? (
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#38BDF8]" />
                ) : isCook ? (
                  <ChefHat className="w-3.5 h-3.5 text-[#4ADE80]" />
                ) : (
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#FFDF73]" />
                );

                const refinedFeatures = isNonVeg
                  ? ['Spicy Odia Mutton Kasa', 'Chilika Fish & Crab Kalia', 'Charcoal Chicken Tandoor', 'Fresh Seafood Handling']
                  : isSatvik
                  ? ['100% Zero Onion & Garlic', 'Temple Dalma & Kanika Bhog', 'Pure Desi Cow Ghee', 'Sanitized Cooking Protocol']
                  : isBbq
                  ? ['Live Charcoal BBQ Station', 'Smoky Chicken & Mutton Tikka', 'Tandoori Veg & Paneer Skewers', 'Cocktail Appetizer Counter']
                  : isBulk
                  ? ['100 to 10,000+ Guests', 'Industrial Steam Cauldrons', 'Fast Synchronized Batch Serving', 'Experienced Halwai Battalion']
                  : isWedding
                  ? ['Live Counter Stalls', 'Banquet Steward Crew', 'Luxury Crockery Setup', 'Custom Wedding Menu']
                  : isOdia
                  ? ['Authentic Banana Leaf', 'Temple Dalma & Besara', 'Hot Chhena Poda', 'Puri Heritage Sweets']
                  : isLightTable
                  ? ['Illuminated LED Tables', 'Golden Steam Chafers', 'Live Mocktail Stalls', 'Neon Night Decor']
                  : isParty
                  ? ['Live Chaat & Pasta Counter', 'Custom Balloon & Theme Setup', 'Mocktails & Dessert Bar', 'Kid-Friendly Special Menu']
                  : isCorporate
                  ? ['Executive Buffet Flow', 'Welcome Drinks & Hi-Tea', 'Live Cooking Stations', 'GST Invoicing Support']
                  : isHousewarming
                  ? ['Traditional Satvik Menu', 'Breakfast & Snacks Spread', 'Sweets & Prasad Setup', 'Eco-Friendly Areca Ware']
                  : isOutdoor
                  ? ['Beach & Lawn Setups', 'Mobile Tandoors & Woks', 'Resort Destination Banquets', 'Weather-Proof Stations']
                  : isCook
                  ? ['In-Home Fresh Preparation', 'Odia & Indian Specials', 'Hygienic Clean Handover', 'Custom Family Flavors']
                  : (srv.features || []).slice(0, 4);

                const guestRange = isBulk
                  ? '100 to 10,000+ Guests'
                  : (isNonVeg || isSatvik || isBbq || isCook)
                  ? '10 to 500+ Guests'
                  : '25 to 5,000+ Guests';

                const bookUrl = (isCook || isNonVeg || isSatvik || isBbq || isBulk || srv.category === 'cook')
                  ? `/booking?type=cook&service=${encodeURIComponent(displayTitle)}`
                  : `/booking?service=${encodeURIComponent(displayTitle)}`;

                return (
                  <TiltCard key={srv.id} maxTilt={4}>
                    <div className="group relative rounded-[34px] p-[1.5px] bg-gradient-to-b from-[#D4AF37]/40 via-emerald-800/25 to-[#D4AF37]/50 hover:from-[#F5CE68] hover:via-[#D4AF37] hover:to-[#10B981] transition-all duration-500 hover:-translate-y-2.5 h-full flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_65px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,55,0.3)] overflow-hidden">
                      
                      {/* Ambient Halo Glow on Hover */}
                      <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-tr from-[#D4AF37]/0 via-[#D4AF37]/20 to-emerald-500/15 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />

                      {/* Inner Dark Emerald Glass Container */}
                      <div className="relative rounded-[32.5px] bg-gradient-to-b from-[#062417]/95 via-[#03150E]/98 to-[#020A06] backdrop-blur-2xl flex flex-col justify-between h-full overflow-hidden z-10">
                        
                        <div>
                          {/* Perfectly proportioned 16:9 Banner Poster Box */}
                          <div 
                            className="relative w-full aspect-video overflow-hidden shimmer-sweep bg-black/60"
                            style={{ aspectRatio: '16/9' }}
                          >
                            <img
                              src={displayImage}
                              alt={displayTitle}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/images/grand-wedding-catering.jpg';
                              }}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Cinematic dark vignette gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020A06] via-[#041810]/20 to-black/35 pointer-events-none" />

                            {/* Category Badge (Top Left) */}
                            <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-[#041810]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center gap-1.5">
                              {categoryIcon}
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#F5CE68]">
                                {categoryLabel}
                              </span>
                            </div>

                            {/* Luxury Prestige Highlight Badge (Top Right - replacing starting price) */}
                            <div className="absolute top-3 right-3 px-3.5 py-1 rounded-full bg-[#041810]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_4px_16px_rgba(0,0,0,0.6)] text-[10px] font-black uppercase tracking-wider text-[#F5CE68] flex items-center gap-1.5 group-hover:border-[#F5CE68] group-hover:bg-[#041810]/95 transition-all">
                              {luxuryIcon}
                              <span>{luxuryTag}</span>
                            </div>

                            {/* Live Status Pill (Bottom Left) */}
                            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#041810]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[10px] font-bold text-[#CBD5E1] flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.7)]">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="text-[#A7F3D0] tracking-wide font-medium">{liveIndicator}</span>
                            </div>
                          </div>

                          {/* Card Content Body */}
                          <div className="p-6">
                            <h3 className="font-display font-black text-xl text-white group-hover:text-[#F5CE68] transition-colors leading-tight min-h-[3rem] flex items-center mb-2">
                              {displayTitle}
                            </h3>

                            <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-4 min-h-[2.5rem]">
                              {srv.description}
                            </p>

                            {/* 2x2 Feature Chips */}
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {refinedFeatures.map((feat: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-[#041810]/75 border border-[#D4AF37]/25 text-[11px] text-[#E2E8F0] font-medium group-hover:border-[#D4AF37]/50 transition-colors shadow-sm"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
                                  <span className="truncate">{feat}</span>
                                </div>
                              ))}
                            </div>

                            {/* Meta Specs Bar */}
                            <div className="flex items-center justify-between border-t border-[#D4AF37]/20 pt-3 text-[11px] text-[#94A3B8]">
                              <span className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
                                <span className="font-medium text-[#CBD5E1]">{guestRange}</span>
                              </span>
                              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>100% Purity & Hygiene</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Action Footer */}
                        <div className="p-6 pt-0 flex items-center gap-2.5">
                          <Link
                            to={bookUrl}
                            className="flex-1 py-3.5 px-4 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.55)] active:scale-95 transition-all group/btn text-center"
                          >
                            <span>Book This Service</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform shrink-0" />
                          </Link>

                          <Link
                            to="/menu"
                            className="px-3.5 py-3.5 rounded-xl bg-[#041810] border border-[#D4AF37]/50 text-[#F5CE68] hover:text-white hover:bg-emerald-950/80 transition-all shadow-md flex items-center justify-center group/menu shrink-0"
                            title="Explore Menu Items"
                          >
                            <UtensilsCrossed className="w-4 h-4 group-hover/menu:scale-110 transition-transform" />
                          </Link>
                        </div>

                      </div>
                    </div>
                  </TiltCard>
                );
              })}
          </div>

        </div>
      </section>

      {/* ====================================================
          2B. TWO PRIMARY OFFERINGS: CATERING BANQUETS VS MASTER COOK HIRE
          ==================================================== */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Two Distinct Service Models • Zero Restaurant Meals</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Full Banquet Catering <span className="text-[#F5CE68]">or</span> Master Cook Hire?
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              We cater to your celebration based on your exact logistics. Choose our complete turnkey banquet catering or hire our verified master cooks to prepare fresh meals in your kitchen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Model A: Full-Service Banquet Catering */}
            <TiltCard maxTilt={3}>
              <div className="rounded-[36px] bg-[#06291C]/90 backdrop-blur-2xl border-2 border-[#D4AF37]/60 p-8 sm:p-10 flex flex-col justify-between h-full liquid-shine shadow-[0_24px_70px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-[#041810] border border-[#D4AF37] text-xs font-black text-[#F5CE68] uppercase tracking-wider">
                      Turnkey Banquet Service
                    </span>
                    <span className="text-xs text-[#F5CE68] font-bold">Min. 500 Guests (Special Quote for 200/300)</span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                      <UtensilsCrossed className="w-7 h-7 text-[#F5CE68]" />
                      <span>Full-Service Banquet Catering</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2 leading-relaxed font-normal">
                      Complete end-to-end event feast management. We bring the complete royal multi-course menu, live cooking stalls, gold chafing warmers, premium cutlery, and uniformed banquet stewards.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                      <span><strong>Buffet & Chafers:</strong> Polished brass/gold warmers with continuous flame heating</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                      <span><strong>Live Master Counters:</strong> Chaat, Tandoori BBQ, Dosa, Jalebi, Mocktail Bar & Paan</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                      <span><strong>Crockery & Cutlery:</strong> Full bone china, ceramic buffet ware, or eco areca plates</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                      <span><strong>Hospitality Stewards:</strong> Polite uniformed table captains & post-event cleanup crew</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-[#F5CE68] shrink-0" />
                      <span><strong>All-Inclusive Packages:</strong> Basic (₹850 / Plate), Premium (₹950 / Plate), Deluxe (₹1,050 / Plate) • Min. 500 Guests</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/packages"
                    className="flex-1 py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] text-center shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    View Banquet Packages
                  </Link>
                  <Link
                    to="/booking?type=catering&guests=500"
                    className="flex-1 py-3.5 rounded-2xl bg-[#041810] border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] hover:bg-emerald-950 text-center transition-colors"
                  >
                    Book Full Catering
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* Model B: Verified Master Cook Hire */}
            <TiltCard maxTilt={3}>
              <div className="rounded-[36px] bg-[#06291C]/90 backdrop-blur-2xl border-2 border-[#D4AF37]/60 p-8 sm:p-10 flex flex-col justify-between h-full liquid-shine shadow-[0_24px_70px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-400 text-xs font-black text-emerald-300 uppercase tracking-wider">
                      On-Site Private Cook Team
                    </span>
                    <span className="text-xs text-[#CBD5E1] font-semibold">10 to 2,000+ Guests</span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                      <ChefHat className="w-7 h-7 text-emerald-400" />
                      <span>Professional Cook Services</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2 leading-relaxed font-normal">
                      Hire veteran Odia halwais, master chefs, and specialized cook teams to prepare fresh, piping-hot dishes on-site in your home kitchen, mandap kitchen, or outdoor venue.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">15+ Years of Master Cook Experience:</strong> Experienced professional chefs bringing exceptional cooking skills, authentic flavors, and memorable dining experiences to your home and special events.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Flexible Groceries:</strong> Supply your own groceries with chef’s checklist, or have AD Catering procure 100% pure desi ghee & fresh items.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Specialized Crews:</strong> Odia Mutton Kasa masters, Satvik Brahmin cooks & sweet halwai battalions.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Spotless Kitchen Handover:</strong> Full utensil cleaning and sanitization after cooking.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Personalized Custom Pricing:</strong> Contact-based quotation tailored to your chosen menu, guest count & hours.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/cook-service"
                    className="flex-1 py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] text-center shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    Explore Cook Services
                  </Link>
                  <Link
                    to="/booking?type=cook"
                    className="flex-1 py-3.5 rounded-2xl bg-[#041810] border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] hover:bg-emerald-950 text-center transition-colors"
                  >
                    Request a Cook Now
                  </Link>
                </div>
              </div>
            </TiltCard>

          </div>

        </div>
      </section>

      {/* ====================================================
          3. SIGNATURE DISHES & MENU SHOWCASE
          ==================================================== */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#041810]/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Handcrafted Delicacies</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Featured Signature Dishes
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              From celebrated temple recipes like authentic Dalma and Chhena Poda to spicy Odia Mutton Kasa and royal dum biryani.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMenu.map((item) => {
              const selected = isDishSelected(item.id);
              return (
                <TiltCard key={item.id} maxTilt={4}>
                  <div className="rounded-[32px] glass-card border border-[#D4AF37]/35 p-5 flex flex-col justify-between group liquid-shine h-full shadow-[0_16px_45px_rgba(0,0,0,0.4)]">
                    <div className="flex gap-4">
                      {/* Clickable Image -> Open Food Modal */}
                      <div
                        onClick={() => setActiveModalItem(item)}
                        className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-[#D4AF37]/40 cursor-pointer shadow-sm"
                        title="Click to view details"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                        {item.isVeg ? (
                          <span className="absolute top-1.5 left-1.5 w-4 h-4 bg-emerald-900 border border-emerald-400 rounded-md flex items-center justify-center shadow" title="Vegetarian">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          </span>
                        ) : (
                          <span className="absolute top-1.5 left-1.5 w-4 h-4 bg-rose-900 border border-rose-400 rounded-md flex items-center justify-center shadow" title="Non-Vegetarian">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          </span>
                        )}
                        <div className="absolute inset-0 bg-[#020D08]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                          <Eye className="w-4 h-4 text-[#F5CE68]" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => setActiveModalItem(item)}
                          className="font-display font-bold text-base text-white truncate group-hover:text-[#F5CE68] transition-colors cursor-pointer"
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#94A3B8] line-clamp-2 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs font-bold text-[#F5CE68] flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            <span>Banquet Delicacy</span>
                          </span>
                          <span className="text-[10px] text-[#F5CE68] bg-[#041810]/80 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full font-semibold">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
                      <span className="text-[11px] text-[#A7F3D0] font-medium flex items-center gap-1 truncate max-w-[170px]">
                        <UtensilsCrossed className="w-3 h-3 text-[#F5CE68] shrink-0" />
                        <span className="truncate">{item.serving || (item.isOdiaSpecialty ? 'Heritage Odia' : 'Royal Banquet')}</span>
                      </span>
                      <button
                        onClick={() =>
                          toggleDish({
                            id: item.id,
                            name: item.name,
                            category: item.category,
                            price: item.price,
                            isVeg: item.isVeg,
                          })
                        }
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                          selected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#041810] border border-[#D4AF37]/50 text-[#F5CE68] hover:bg-emerald-950'
                        }`}
                      >
                        {selected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Menu</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <MagneticButton
              to="/menu"
              variant="gold"
              className="px-9 py-4 rounded-2xl text-sm font-bold shadow-md"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4 text-[#0E0704] group-hover:translate-x-1.5 transition-transform" />
            </MagneticButton>
          </div>

        </div>
      </section>

      {/* ====================================================
          4. ROYAL EMERALD & GOLD PACKAGES (BASIC 850, PREMIUM 950, DELUXE 1050)
          ==================================================== */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#041810]/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Transparent Banquet Packages</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Curated Catering Packages
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              Complete solutions with service staff, buffet tables, chafing setups, and customizable menus.
            </p>
          </div>

          {/* Full Package Style Cards with Live In-Card Menus, Category Filtering & Authentic Modals */}
          <BanquetPackagesSection
            showHeader={false}
            showCalculator={true}
            showConsultationBanner={false}
          />

        </div>
      </section>

      {/* ====================================================
          5. MASTER COOK SERVICES HERO SHOWCASE (REDESIGNED & OVERFLOW FIXED)
          ==================================================== */}
      <section className="py-20 relative z-10" id="cook-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard maxTilt={2}>
            <div className="rounded-[40px] glass-strong border border-[#D4AF37]/60 p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.65)] relative overflow-hidden liquid-shine">
              
              {/* Top ambient gold accent hairline */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5CE68] to-transparent opacity-80" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                
                {/* Left Column: Headings, Highlights & CTAs */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-5 min-w-0">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041810]/90 border border-[#D4AF37]/60 text-xs font-extrabold text-[#F5CE68] uppercase tracking-wider shadow">
                      <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
                      <span>15+ Years of Master Cook Experience</span>
                    </div>

                    <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F5CE68]">
                      Need a Master Cook for Your Home or Event?
                    </p>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight break-words">
                      Exceptional Cooking. <span className="gold-gradient-text">Right at Your Doorstep.</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed max-w-xl break-words font-normal">
                      Find the right master cook for your home, family gathering, celebration, or special event. Enjoy personalized cooking services designed around your needs with authentic Odia flavors, hygienic preparation, and complete kitchen sanitization.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-[#FAF8F5]">
                    <div className="flex items-center gap-2 bg-[#041810]/70 p-2.5 rounded-2xl border border-[#D4AF37]/30">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-medium">15+ Yrs Master Chefs</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#041810]/70 p-2.5 rounded-2xl border border-[#D4AF37]/30">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-medium">Police & ID Verified</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#041810]/70 p-2.5 rounded-2xl border border-[#D4AF37]/30">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-medium">100% On-Site Live Cooking</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#041810]/70 p-2.5 rounded-2xl border border-[#D4AF37]/30">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-medium">Full Spotless Kitchen Handover</span>
                    </div>
                  </div>

                  {/* Action Buttons Row (Responsive Stacking) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                    <Link
                      to="/booking?type=cook"
                      className="px-7 py-4 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] text-center shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <ChefHat className="w-4 h-4 text-[#041810]" />
                      <span>Request a Cook Now</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#041810]" />
                    </Link>
                    <Link
                      to="/cook-service"
                      className="px-7 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] text-center shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Explore Cook Services</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Visual Chef Presentation */}
                <div className="lg:col-span-5 min-w-0 relative">
                  <div className="relative rounded-[32px] overflow-hidden border border-[#D4AF37]/60 shadow-2xl h-72 sm:h-80 lg:h-96 group">
                    <img
                      src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                      alt="Professional Master Chef Cooking"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02100A]/95 via-[#02100A]/30 to-transparent" />
                    
                    {/* Floating Bottom Card */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#041810]/95 border border-[#D4AF37]/60 backdrop-blur-xl flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shrink-0 shadow">
                          <Award className="w-5 h-5 text-[#041810]" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-white">15+ Years Master Experience</p>
                          <p className="text-[10px] text-[#F5CE68] font-bold">Authentic Heritage Flavors</p>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse shrink-0" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ====================================================
          6. CLIENT TESTIMONIALS
          ==================================================== */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#041810]/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Client Testimonials</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Loved by Hosts & Guests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <TiltCard key={rev.id} maxTilt={4}>
                <div className="rounded-[32px] glass-card border border-[#D4AF37]/35 p-6 sm:p-7 flex flex-col justify-between liquid-shine h-full shadow-[0_16px_45px_rgba(0,0,0,0.4)]">
                  <div>
                    <div className="flex items-center gap-1 text-[#F5CE68] mb-3">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F5CE68] text-[#F5CE68]" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] italic leading-relaxed mb-6 font-normal">
                      "{rev.comment}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#D4AF37]/25">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#F5CE68] border border-[#D4AF37] flex items-center justify-center text-sm font-bold text-[#041810] shrink-0 shadow-sm">
                      {rev.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{rev.customerName}</h4>
                      <p className="text-[11px] text-[#F5CE68] font-semibold">{rev.eventType}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================
          7. FINAL ROYAL EMERALD & GOLD CALL TO ACTION
          ==================================================== */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4">
          <TiltCard maxTilt={2}>
            <div className="rounded-[44px] glass-strong border border-[#D4AF37]/50 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden liquid-shine shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041810]/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68]">
                <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                <span>Let's Plan Your Memorable Feast</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Create an Unforgettable Feast?
              </h2>

              <p className="text-sm sm:text-base text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
                Let AD Catering & Cook Services turn your event into a delicious celebration. Contact us today for a custom menu and quote.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <MagneticButton
                  to="/booking"
                  variant="gold"
                  className="px-9 py-4 rounded-2xl text-sm font-bold shadow-md"
                >
                  Book Your Event
                </MagneticButton>
                <MagneticButton
                  to="/menu"
                  variant="ice"
                  className="px-9 py-4 rounded-2xl text-sm font-bold shadow-sm bg-emerald-950/80 border border-[#D4AF37]/50 text-[#F5CE68] hover:bg-emerald-900"
                >
                  Explore Menu
                </MagneticButton>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>
    </div>
  );
};

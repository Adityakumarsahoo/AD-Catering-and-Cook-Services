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
} from 'lucide-react';

export const Home: React.FC = () => {
  const { toggleDish, isDishSelected } = useMenuCart();
  const defaultCateringList = defaultServices.filter((s) => s.category === 'catering').slice(0, 4);
  const [featuredMenu, setFeaturedMenu] = useState<any[]>(defaultMenuItems.slice(0, 6));
  const [featuredServices, setFeaturedServices] = useState<any[]>(defaultCateringList);
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
          setFeaturedMenu(menuRes.menuItems.slice(0, 6));
        }
        if (srvRes?.services && srvRes.services.length > 0) {
          const catOnly = srvRes.services.filter((s: any) => s.category === 'catering');
          setFeaturedServices(catOnly.length > 0 ? catOnly.slice(0, 4) : srvRes.services.slice(0, 4));
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
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#041810]/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                <span>Exquisite Culinary Solutions</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Our Premier Catering Services
              </h2>
            </div>
            <Link
              to="/services"
              className="mt-4 md:mt-0 text-sm font-bold text-[#F5CE68] hover:text-white inline-flex items-center gap-2 group transition-colors"
            >
              <span>View All 12 Offerings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredServices && featuredServices.length > 0 ? featuredServices : defaultCateringList).map((srv) => (
              <TiltCard key={srv.id} maxTilt={4}>
                <div className="group rounded-[32px] glass-card border border-[#D4AF37]/40 overflow-hidden flex flex-col justify-between h-full liquid-shine">
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020D08]/80 via-transparent to-transparent" />
                      
                      <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-[#041810]/90 border border-[#D4AF37]/60 text-[#F5CE68] shadow-sm">
                        Starting ₹{srv.startingPrice}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-[#F5CE68] transition-colors mb-2">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed mb-4">
                        {srv.description}
                      </p>
                      <ul className="space-y-2 mb-2">
                        {srv.features?.slice(0, 2).map((feat: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      to={`/booking?service=${encodeURIComponent(srv.title)}`}
                      className="w-full py-3 rounded-xl gold-gradient-btn text-xs font-black text-[#041810] text-center block transition-all shadow-md active:scale-95"
                    >
                      Book This Service
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
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
                    <span className="text-xs text-[#CBD5E1] font-semibold">25 to 5,000+ Guests</span>
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
                      <span><strong>All-Inclusive Packages:</strong> Basic (₹850), Premium (₹950), Deluxe (₹1050)</span>
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
                    to="/booking?type=catering"
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

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Verified Master Chefs:</strong> 10+ years average culinary experience & police-verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Flexible Groceries:</strong> Supply your own groceries or have AD Catering procure fresh</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Specialized Crews:</strong> Odia Mutton Kasa masters, Satvik Brahmin cooks & sweet halwais</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Spotless Kitchen Handover:</strong> Full utensil cleaning and sanitization after cooking</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FAF8F5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Transparent Cook Fee:</strong> Starting ₹1,499 (Home Cook) to ₹4,999 (Wedding Crew)</span>
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
                    Hire a Master Cook
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
                      <span className="text-[11px] text-[#94A3B8] font-medium">
                        {item.isOdiaSpecialty ? 'Heritage Odia' : 'Royal Feast'}
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
          5. MASTER COOK SERVICES BANNER
          ==================================================== */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard maxTilt={2}>
            <div className="rounded-[40px] glass-strong border border-[#D4AF37]/50 p-8 sm:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.6)] relative overflow-hidden liquid-shine">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8 space-y-4">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#041810]/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
                    <ChefHat className="w-4 h-4 text-[#F5CE68]" />
                    <span>Verified Master Cooks for Hire</span>
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                    Need a Master Cook for Your Home or Event?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-2xl leading-relaxed">
                    Hire our verified master cooks for private home celebrations, traditional Odia feast preparation, non-veg specialists (Mutton & Fish), or halwais for weddings. We handle the cooking while you enjoy with guests.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
                  <MagneticButton
                    to="/cook-service"
                    variant="gold"
                    className="w-full py-4 rounded-2xl text-xs font-bold shadow-md text-center"
                  >
                    Explore Cook Services
                  </MagneticButton>
                  <MagneticButton
                    to="/booking?service=Cook+Service"
                    variant="ice"
                    className="w-full py-4 rounded-2xl text-xs font-bold text-center shadow-sm bg-emerald-950/80 border border-[#D4AF37]/50 text-[#F5CE68] hover:bg-emerald-900"
                  >
                    Request a Cook Now
                  </MagneticButton>
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

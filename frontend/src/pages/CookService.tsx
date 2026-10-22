import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { TiltCard } from '../components/TiltCard.js';
import {
  ChefHat,
  Flame,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Crown,
  Sparkles,
  Users,
  Utensils,
  HelpCircle,
  ArrowRight,
  Calculator,
  Phone,
  PhoneCall,
  MessageCircle,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/cateringConfig.js';

export const CookService: React.FC = () => {
  const [cookServices, setCookServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Quick requirement planner state (No fixed prices)
  const [selectedCookId, setSelectedCookId] = useState<string>('srv_7');
  const [estimatorGuests, setEstimatorGuests] = useState<number>(30);
  const [estimatorMeal, setEstimatorMeal] = useState<'lunch' | 'dinner' | 'full_day'>('lunch');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getServices({ category: 'cook' });
        if (res.services) {
          setCookServices(res.services);
        }
      } catch (err) {
        console.error('Failed to load cook services:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const activeCookService = cookServices.find((c) => c.id === selectedCookId) || cookServices[0];

  const workflowSteps = [
    {
      step: '01',
      title: 'Select Cook Specialization',
      desc: 'Choose from Master Home Cooks, Royal Wedding Halwai & Feast Teams, Odia Non-Veg Masters, or Satvik Temple Cooks.',
      icon: ChefHat,
    },
    {
      step: '02',
      title: 'Specify Date & Guests',
      desc: 'Pick your celebration date, meal slot (Lunch, Dinner, or Full Day), and estimated guest count (10 to 2,000+).',
      icon: Calendar,
    },
    {
      step: '03',
      title: 'Customized Grocery List',
      desc: 'You can supply your preferred groceries based on our chef’s exact quantity guide, or we can procure 100% farm-fresh items.',
      icon: Utensils,
    },
    {
      step: '04',
      title: 'Live On-Site Master Cooking',
      desc: 'Our uniformed chefs arrive punctually with traditional brass handis/tools, prepare hot delicacies, and leave your kitchen spotless clean.',
      icon: Award,
    },
  ];

  const faqs = [
    {
      q: 'How does cook service pricing work without fixed rates?',
      a: 'Every event and kitchen has unique requirements. We quote customized, transparent pricing based on your chosen menu complexity, service duration, number of courses, and guest headcount so you never overpay.',
    },
    {
      q: 'Do your cooks bring their own utensils and equipment?',
      a: 'For home cooking (up to 40 guests), our cooks work with your kitchen utensils and gas. For wedding feasts and large gathering teams (50+ to 2,000+ guests), our battalion brings complete industrial brass handis, heavy burners, and halwai equipment.',
    },
    {
      q: 'Who arranges the groceries and raw ingredients?',
      a: 'You have full flexibility! Either you can provide groceries using our master chef’s customized pre-event ingredient checklist, or you can opt for AD Catering to procure 100% verified pure cow ghee, fresh seafood/meat, and spices on your behalf.',
    },
    {
      q: 'Are your master cooks police-verified and certified?',
      a: 'Yes. Every master chef, halwai, and culinary assistant in our team undergoes strict government ID checks, background verification, and FSSAI health and hygiene training before joining any event.',
    },
    {
      q: 'Can you cook strictly Satvik (zero onion, zero garlic) food?',
      a: 'Absolutely! We have specialized Brahmin cooks who follow strict Vedic Satvik cooking protocols for Havans, Pujas, Shradh, and Griha Pravesh celebrations with zero cross-contamination and pure desi cow ghee.',
    },
  ];

  return (
    <div className="pt-32 pb-24 relative z-10 min-h-screen text-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ====================================================
            1. HERO HEADER WITH 15+ YEARS EXPERIENCE
            ==================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-[#D4AF37]/60 text-xs font-extrabold text-[#F5CE68] uppercase tracking-wider shadow-lg">
            <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>AD Professional Cook & Private Chef Services</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Professional Cook Services
          </h1>

          {/* 15+ Years of Master Cook Experience Showcase */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-[#06291C]/95 via-[#041A12]/90 to-[#02100A]/95 border-2 border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(212,175,55,0.2)] text-center relative overflow-hidden liquid-shine my-6">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFF1B8] to-transparent" />
            
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#F5CE68]/30 to-[#D4AF37]/20 border border-[#D4AF37]/70 text-[#F5CE68] text-xs font-black uppercase tracking-widest mb-3 shadow">
              <Award className="w-4 h-4 text-[#F5CE68]" />
              <span>Heritage Culinary Mastery</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] tracking-tight">
              15+ Years of Master Cook Experience
            </h2>

            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal max-w-2xl mx-auto mt-3">
              Experienced professional chefs bringing exceptional cooking skills, authentic flavors, and memorable dining experiences to your home and special events.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#F5CE68] font-bold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-white">Police & ID Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-white">100% On-Site Live Cooking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-white">Spotless Kitchen Cleanup</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cook Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 text-center liquid-shine shadow-xl">
            <Clock className="w-7 h-7 text-[#F5CE68] mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-white">15+ Years</p>
            <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">Master Culinary Experience</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 text-center liquid-shine shadow-xl">
            <ShieldCheck className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-white">Police & ID</p>
            <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">Verified Professionals</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 text-center liquid-shine shadow-xl">
            <Flame className="w-7 h-7 text-amber-400 mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-white">Live Cooking</p>
            <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">Piping Hot & Fresh</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 text-center liquid-shine shadow-xl">
            <Award className="w-7 h-7 text-[#F5CE68] mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-white">Spotless Clean</p>
            <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">Kitchen Sanitization Handover</p>
          </div>
        </div>

        {/* ====================================================
            2. CHOOSE YOUR MASTER COOK SPECIALIZATION (NO FIXED PRICES)
            ==================================================== */}
        <div className="mb-20" id="specializations">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
                Specialized Culinary Crews
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                Choose Your Master Cook Specialization
              </h2>
            </div>
            <p className="text-xs text-[#CBD5E1] max-w-md leading-relaxed">
              From intimate family feasts to mass wedding bhojis of 2,000+ guests, our certified master cooks deliver authentic culinary craftsmanship with personalized quotes.
            </p>
          </div>

          {/* Contact-Based Pricing Informational Banner */}
          <div className="mb-8 p-5 rounded-2xl bg-[#041810]/95 border border-[#D4AF37]/50 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shrink-0 mt-0.5 shadow">
                <ChefHat className="w-4 h-4 text-[#041810]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Contact Us for Custom Pricing & Tailored Menus
                </h4>
                <p className="text-xs text-[#CBD5E1] mt-0.5 leading-relaxed">
                  Every event and kitchen has different requirements. Contact us to discuss your preferred cuisine, service duration, guest count, and cooking needs. We’ll help you find the right cook for your requirements.
                </p>
              </div>
            </div>
            <a
              href={BUSINESS_CONFIG.phoneTel}
              className="px-4 py-2.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] whitespace-nowrap flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Talk to Our Team: {BUSINESS_CONFIG.phoneFormatted}</span>
            </a>
          </div>

          {/* Specialization Cards (Completely Removed Prices) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cookServices.map((cook) => (
              <TiltCard key={cook.id} maxTilt={3}>
                <div
                  className="rounded-[32px] bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 overflow-hidden flex flex-col justify-between group transition-all duration-300 liquid-shine h-full shadow-[0_16px_45px_rgba(0,0,0,0.6)] text-[#FAF8F5] hover:border-[#D4AF37]"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={cook.image}
                        alt={cook.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#041810]/80 via-transparent to-transparent" />
                      
                      {/* Contact-Based Custom Quote Pill Badge */}
                      <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-emerald-950/95 border border-[#D4AF37]/60 text-[11px] font-black text-[#F5CE68] shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#F5CE68]" />
                        <span>Custom Quote</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5CE68] transition-colors mb-2">
                        {cook.title}
                      </h3>
                      <p className="text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed mb-4 font-normal">
                        {cook.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {cook.features?.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5CE68] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dual Action: Primary "Get a Custom Quote" + Secondary "Talk to Our Team" */}
                  <div className="p-6 pt-0 space-y-2">
                    <Link
                      to={`/booking?type=cook&service=${encodeURIComponent(cook.title)}`}
                      className="w-full py-3 rounded-2xl gold-gradient-btn text-xs font-black text-center block shadow-md hover:scale-[1.02] transition-transform text-[#041810]"
                    >
                      Get a Custom Quote
                    </Link>
                    <a
                      href={BUSINESS_CONFIG.phoneTel}
                      className="w-full py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/40 text-xs font-bold text-center flex items-center justify-center gap-1.5 text-[#F5CE68] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Talk to Our Team</span>
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* ====================================================
            3. INTERACTIVE COOK REQUIREMENT PLANNER (NO FIXED PRICES)
            ==================================================== */}
        <section className="mb-20 rounded-[36px] bg-[#041810]/95 border border-[#D4AF37]/50 p-6 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.7)] relative overflow-hidden liquid-shine">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5CE68] to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#D4AF37]/25 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/40 text-xs font-bold text-[#F5CE68] uppercase tracking-wider mb-2">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Let's Plan Your Perfect Menu</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                Discover the Perfect Cook for Your Needs
              </h2>
              <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1 max-w-2xl">
                Your Occasion, Your Chef, Your Experience. Customize your preferred culinary specialization, guest count, and meal schedule for a personalized quote.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Pricing Method</span>
              <p className="font-display text-2xl font-black text-[#F5CE68]">
                Custom Quotation
              </p>
              <span className="text-[10px] text-emerald-400 font-medium">Transparent Itemized Proposal</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
            <div className="lg:col-span-8 space-y-6">
              {/* Select Cook Type */}
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                  1. Select Cook Specialty:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {cookServices.slice(0, 6).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCookId(c.id)}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs ${
                        selectedCookId === c.id
                          ? 'bg-emerald-950/90 border-[#D4AF37] text-white shadow-md font-bold'
                          : 'bg-[#06291C]/60 border-[#D4AF37]/30 text-[#CBD5E1] hover:bg-emerald-950/50'
                      }`}
                    >
                      <p className="truncate font-semibold">{c.title}</p>
                      <p className="text-[11px] text-[#F5CE68] mt-0.5">Custom Menu Plan</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
                    <span>2. Number of Guests:</span>
                  </label>
                  <span className="text-sm font-black text-[#F5CE68] tabular-nums px-3 py-0.5 rounded-lg bg-[#06291C] border border-[#D4AF37]/40">
                    {estimatorGuests} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={estimatorGuests}
                  onChange={(e) => setEstimatorGuests(parseInt(e.target.value) || 10)}
                  className="w-full h-2 bg-[#020F09] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              {/* Meal Slot */}
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                  3. Service Duration / Meal Slot:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['lunch', 'dinner', 'full_day'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setEstimatorMeal(m)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        estimatorMeal === m
                          ? 'gold-gradient-btn text-[#041810]'
                          : 'bg-[#06291C] border-[#D4AF37]/30 text-[#CBD5E1] hover:text-white'
                      }`}
                    >
                      {m === 'lunch' && 'Lunch Feast (4 Hours)'}
                      {m === 'dinner' && 'Dinner Banquet (5 Hours)'}
                      {m === 'full_day' && 'Full Day Cooking (Lunch + Dinner)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#06291C]/80 border border-[#D4AF37]/40 space-y-4">
              <h3 className="font-display font-bold text-lg text-white">Requirement Summary</h3>
              <div className="space-y-2 text-xs text-[#CBD5E1]">
                <div className="flex justify-between">
                  <span>Selected Cook:</span>
                  <span className="font-bold text-white truncate max-w-[150px]">{activeCookService?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guest Size:</span>
                  <span className="font-bold text-white">{estimatorGuests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span>Meal Slot:</span>
                  <span className="font-bold text-white uppercase">{estimatorMeal.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between border-t border-[#D4AF37]/25 pt-2 text-[#F5CE68] font-bold">
                  <span>Pricing Structure:</span>
                  <span className="text-xs uppercase">Customized Quote</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  to={`/booking?type=cook&service=${encodeURIComponent(activeCookService?.title || 'Master Home Cook Service')}&guests=${estimatorGuests}`}
                  className="w-full py-3.5 rounded-xl gold-gradient-btn text-xs font-black text-center block text-[#041810] shadow-md hover:scale-[1.02] transition-transform"
                >
                  Get Your Personalized Quote
                </Link>
                <a
                  href={BUSINESS_CONFIG.phoneTel}
                  className="w-full py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/40 text-xs font-bold text-center flex items-center justify-center gap-1.5 text-[#F5CE68] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Talk to Our Team</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How Cook Service Works */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple 4-Step Process</span>
            </span>
            <h2 className="font-display text-3xl font-black text-white">
              How Our Master Cook Service Works
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1]">
              Seamless hospitality tailored to your home kitchen or event banquet venue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((st) => (
              <div
                key={st.step}
                className="p-6 rounded-3xl bg-[#06291C]/85 border border-[#D4AF37]/40 liquid-shine space-y-3 relative overflow-hidden"
              >
                <span className="text-3xl font-display font-black text-[#D4AF37]/30 absolute top-4 right-4">
                  {st.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] shadow">
                  <st.icon className="w-5 h-5 text-[#041810]" />
                </div>
                <h3 className="font-display font-bold text-base text-white">{st.title}</h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cook Hire FAQs */}
        <section className="rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 p-8 sm:p-12 mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5CE68] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-[#F5CE68]" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
              Cook Hire Clarifications & Policies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#06291C]/80 border border-[#D4AF37]/30 space-y-2">
                <h3 className="font-display font-bold text-sm text-[#F5CE68] flex items-start gap-2">
                  <span className="text-white">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.js';
import { useMenuCart } from '../context/MenuCartContext.js';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Utensils,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  Crown,
  ChefHat,
  Flame,
  Leaf,
  Award,
} from 'lucide-react';

export const Booking: React.FC = () => {
  const { user } = useAuth();
  const { selectedDishes, clearSelection } = useMenuCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get('type') === 'cook' ? 'cook' : 'catering';
  const initialPackage = searchParams.get('package') || 'PREMIUM PACKAGE';
  const initialService = searchParams.get('service') || '';
  const initialMenuType = searchParams.get('menuType') || '';
  const initialGuests = parseInt(searchParams.get('guests') || '') || (initialType === 'cook' ? 30 : 150);

  const [bookingType, setBookingType] = useState<'catering' | 'cook'>(initialType);
  const [packages, setPackages] = useState<any[]>([]);
  const [cookServices, setCookServices] = useState<any[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    // Catering specific
    eventType: initialService && initialType === 'catering' ? initialService : 'Wedding Reception',
    selectedPackage: initialPackage,
    // Cook specific
    cookSpecialty: initialService && initialType === 'cook' ? initialService : 'Master Home Cook Service',
    mealSlot: 'Lunch Feast (4 Hours)',
    groceryOption: 'Client provides groceries from chef checklist',
    kitchenType: 'Home Kitchen',
    // Shared
    eventDate: '',
    eventTime: '18:30',
    venue: '',
    guestCount: initialGuests,
    foodPreference: initialMenuType.toLowerCase() === 'veg' ? 'Vegetarian' : 'Mixed',
    specialRequirements: initialMenuType.toLowerCase() === 'veg' ? '100% Pure Vegetarian Feast' : '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [pkgRes, srvRes] = await Promise.all([
          api.getPackages().catch(() => null),
          api.getServices({ category: 'cook' }).catch(() => null),
        ]);
        if (pkgRes?.packages) setPackages(pkgRes.packages);
        if (srvRes?.services) setCookServices(srvRes.services);
      } catch (err) {
        console.error('Failed to load booking dependencies:', err);
      }
    }
    loadData();
  }, []);

  // Update customer fields if user logs in while on page
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerName: prev.customerName || user.name,
        email: prev.email || user.email,
        phone: prev.phone || user.phone,
      }));
    }
  }, [user]);

  // Pricing calculations
  // 1. Catering Price Calculation
  const currentPkg = packages.find(
    (p) => p.name.toLowerCase() === formData.selectedPackage.toLowerCase()
  );
  const pricePerPerson = currentPkg ? currentPkg.pricePerPerson : 850;
  const estimatedCateringTotal = formData.guestCount * pricePerPerson;

  // 2. Cook Hire Calculation
  const selectedCookObj = cookServices.find(
    (c) => c.title.toLowerCase() === formData.cookSpecialty.toLowerCase()
  );
  const cookBaseRate = selectedCookObj ? selectedCookObj.startingPrice : 1499;
  const mealMultiplier = formData.mealSlot.includes('Full Day') ? 1.75 : 1.0;
  const cookGuestAddon = Math.max(0, Math.floor((formData.guestCount - 25) / 10)) * 250;
  const estimatedCookTotal = Math.round((cookBaseRate + cookGuestAddon) * mealMultiplier);

  // Active Total
  const activeEstimatedTotal = bookingType === 'catering' ? estimatedCateringTotal : estimatedCookTotal;

  const eventTypes = [
    'Wedding Reception',
    'Grand Wedding Banquet',
    'Engagement Ceremony',
    'Birthday Party',
    'Anniversary Celebration',
    'Corporate Gala / Conference',
    'Traditional Odia Feast (Bhoji)',
    'Housewarming / Griha Pravesh',
    'Puja & Sacred Havan Feast',
    'Bulk Catering / Cultural Festival',
  ];

  const cookSpecialties = [
    'Master Home Cook Service',
    'Wedding Master Cook Team (Kharada & Halwai)',
    'Non-Veg Specialist Cook (Mutton & Seafood)',
    'Satvik & Pure Veg Specialist Cook',
    'Party & Weekend BBQ Cook',
    'Bulk Cooking & Event Kitchen Crew',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.eventDate) {
      toast.error('Please fill in your name, phone number, and event date.');
      return;
    }

    const minGuests = bookingType === 'catering' ? 25 : 10;
    if (formData.guestCount < minGuests) {
      toast.error(`Minimum guest count for ${bookingType === 'catering' ? 'Catering' : 'Cook Service'} is ${minGuests}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Build requirements string
      let specReq = formData.specialRequirements;
      if (bookingType === 'cook') {
        const cookNotes = `[COOK HIRE] Specialty: ${formData.cookSpecialty} | Meal: ${formData.mealSlot} | Groceries: ${formData.groceryOption} | Kitchen: ${formData.kitchenType}`;
        specReq = specReq ? `${cookNotes}\n${specReq}` : cookNotes;
      }
      if (selectedDishes.length > 0) {
        const dishList = selectedDishes.map((d) => d.name).join(', ');
        specReq = specReq
          ? `${specReq}\nFeast Menu Selection: ${dishList}`
          : `Feast Menu Selection: ${dishList}`;
      }

      const payload = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        eventType: bookingType === 'catering' ? formData.eventType : `Cook Service: ${formData.cookSpecialty}`,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        venue: formData.venue,
        guestCount: formData.guestCount,
        package: bookingType === 'catering' ? formData.selectedPackage : `Cook Hire (${formData.cookSpecialty})`,
        foodPreference: formData.foodPreference,
        specialRequirements: specReq,
        additionalNotes: formData.additionalNotes,
        estimatedAmount: activeEstimatedTotal,
      };

      const res = await api.createBooking(payload);
      if (res.booking) {
        setConfirmedBooking({
          ...res.booking,
          bookingType,
          estimatedAmount: activeEstimatedTotal,
        });
        clearSelection();
        toast.success(res.message || 'Booking placed successfully!');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 relative z-10 min-h-screen text-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06291C] border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow">
            <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Official Event Reservation</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Book Catering & Cook Services
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
            Whether you need a full 5-star royal catering banquet with buffet warmers and service staff, or certified master cooks to prepare fresh meals in your kitchen, select your service below.
          </p>

          {/* Master Service Model Toggle Switch */}
          <div className="inline-flex items-center p-1.5 rounded-3xl bg-[#02100A] border-2 border-[#D4AF37]/60 shadow-[0_12px_35px_rgba(0,0,0,0.8)] mt-4">
            <button
              type="button"
              onClick={() => {
                setBookingType('catering');
                if (formData.guestCount < 25) {
                  setFormData((prev) => ({ ...prev, guestCount: 150 }));
                }
              }}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                bookingType === 'catering'
                  ? 'gold-gradient-btn text-[#041810] shadow-lg scale-[1.02]'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68]'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Full Catering Banquet</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setBookingType('cook');
                if (formData.guestCount > 150) {
                  setFormData((prev) => ({ ...prev, guestCount: 30 }));
                }
              }}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                bookingType === 'cook'
                  ? 'gold-gradient-btn text-[#041810] shadow-lg scale-[1.02]'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68]'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span>Hire Master Cook Team</span>
            </button>
          </div>
        </div>

        {/* Confirmation Liquid Glass Modal */}
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in">
            <div className="max-w-lg w-full rounded-[36px] bg-[#041810]/95 border border-[#D4AF37]/60 p-6 sm:p-8 text-center space-y-6 shadow-2xl relative text-[#FAF8F5]">
              <div className="w-16 h-16 rounded-3xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest bg-[#06291C] border border-[#D4AF37]/50 px-3 py-1 rounded-full">
                  {confirmedBooking.bookingType === 'cook' ? 'Master Cook Hire Request' : 'Catering Banquet Confirmed'}
                </span>
                <h2 className="font-display text-2xl font-bold text-white mt-3">
                  Thank You, {confirmedBooking.customerName}!
                </h2>
                <p className="text-xs text-[#CBD5E1] mt-2 font-normal">
                  Your event request has been securely logged in our system. Our catering director will contact you via phone and WhatsApp to review details and finalize requirements.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#06291C] border border-[#D4AF37]/35 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Booking ID:</span>
                  <span className="font-bold text-[#F5CE68]">{confirmedBooking.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Service Model:</span>
                  <span className="text-white font-bold">
                    {confirmedBooking.bookingType === 'cook' ? 'Master Cook Hire' : 'Full Catering Banquet'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Event Date:</span>
                  <span className="text-white font-medium">
                    {confirmedBooking.eventDate} at {confirmedBooking.eventTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Guest Scale:</span>
                  <span className="text-white font-medium">{confirmedBooking.guestCount} Honored Guests</span>
                </div>
                <div className="flex justify-between border-t border-[#D4AF37]/30 pt-2">
                  <span className="text-white font-bold">Estimated Total:</span>
                  <span className="text-[#F5CE68] font-black text-sm">
                    ₹{confirmedBooking.estimatedAmount?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="flex-1 py-3 rounded-xl bg-emerald-950/80 border border-[#D4AF37]/40 text-[#CBD5E1] hover:text-white text-xs font-semibold"
                >
                  Book Another Event
                </button>
                {user ? (
                  <Link
                    to="/dashboard"
                    className="flex-1 py-3 rounded-xl gold-gradient-btn text-xs font-bold text-[#041810] text-center shadow-lg"
                  >
                    View in My Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="flex-1 py-3 rounded-xl gold-gradient-btn text-xs font-bold text-[#041810] text-center shadow-lg"
                  >
                    Create Account to Track
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Booking Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column inside Royal Emerald Glass Container */}
          <div className="lg:col-span-8 bg-[#041810]/85 backdrop-blur-2xl border border-[#D4AF37]/50 rounded-[36px] p-6 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
            <form onSubmit={handleSubmit} className="space-y-7">
              
              {/* Service Model Indicator Banner */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-[#D4AF37]/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#041810] font-black shadow">
                    {bookingType === 'catering' ? <UtensilsCrossed className="w-5 h-5" /> : <ChefHat className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Currently Planning: {bookingType === 'catering' ? 'Full Catering Banquet' : 'Private Master Cook Service'}
                    </p>
                    <p className="text-[11px] text-[#CBD5E1]">
                      {bookingType === 'catering'
                        ? 'Includes royal buffet counters, gold chafing warmers, cutlery, and banquet stewards.'
                        : 'Hire verified master cooks & halwais to prepare fresh delicacies directly at your kitchen or venue.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. Host & Contact Details */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2 pb-2.5 border-b border-[#D4AF37]/30">
                  <Users className="w-5 h-5 text-[#F5CE68]" />
                  <span>1. Host & Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      placeholder="e.g. Ramesh Mohanty"
                      className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="host@gmail.com"
                      className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Event Date & Venue */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2 pb-2.5 border-b border-[#D4AF37]/30">
                  <Calendar className="w-5 h-5 text-[#F5CE68]" />
                  <span>2. Schedule & Venue Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.eventDate}
                      onChange={(e) =>
                        setFormData({ ...formData, eventDate: e.target.value })
                      }
                      className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Service / Serving Time
                    </label>
                    <input
                      type="time"
                      value={formData.eventTime}
                      onChange={(e) =>
                        setFormData({ ...formData, eventTime: e.target.value })
                      }
                      className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      {bookingType === 'catering' ? 'Estimated Guests (Min 25)' : 'Guest Scale (Min 10)'} *
                    </label>
                    <input
                      type="number"
                      min={bookingType === 'catering' ? 25 : 10}
                      max={10000}
                      step={5}
                      value={formData.guestCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guestCount: Math.max(
                            bookingType === 'catering' ? 25 : 10,
                            parseInt(e.target.value) || (bookingType === 'catering' ? 25 : 10)
                          ),
                        })
                      }
                      className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white font-bold tabular-nums focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                    {bookingType === 'catering' ? 'Event Venue / Banquet Hall' : 'Kitchen Address / Venue'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    placeholder="e.g. Swosti Plaza Lane, Jaydev Vihar, Bhubaneswar (or Home Kitchen Address)"
                    className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* 3. Service-Specific Configuration */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2 pb-2.5 border-b border-[#D4AF37]/30">
                  <Sparkles className="w-5 h-5 text-[#F5CE68]" />
                  <span>
                    3. {bookingType === 'catering' ? 'Catering Package & Banquet Style' : 'Cook Specialty & Kitchen Requirements'}
                  </span>
                </h3>

                {bookingType === 'catering' ? (
                  /* Catering Configuration */
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                        Occasion / Event Type
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) =>
                          setFormData({ ...formData, eventType: e.target.value })
                        }
                        className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                      >
                        {eventTypes.map((t) => (
                          <option key={t} value={t} className="bg-[#041810] text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                        Banquet Package Tier
                      </label>
                      <select
                        value={formData.selectedPackage}
                        onChange={(e) =>
                          setFormData({ ...formData, selectedPackage: e.target.value })
                        }
                        className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                      >
                        {packages.map((p) => (
                          <option key={p.id} value={p.name} className="bg-[#041810] text-white">
                            {p.name} (₹{p.pricePerPerson}/guest)
                          </option>
                        ))}
                        <option value="Customized Menu" className="bg-[#041810] text-white">
                          Customized Menu (A la Carte Proposal)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                        Dietary Preference
                      </label>
                      <select
                        value={formData.foodPreference}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            foodPreference: e.target.value as any,
                          })
                        }
                        className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                      >
                        <option value="Mixed" className="bg-[#041810] text-white">
                          Mixed (Veg + Non-Veg)
                        </option>
                        <option value="Vegetarian" className="bg-[#041810] text-white">
                          100% Pure Vegetarian Feast
                        </option>
                        <option value="Non-Vegetarian" className="bg-[#041810] text-white">
                          Non-Vegetarian Dominant
                        </option>
                      </select>
                    </div>
                  </div>
                ) : (
                  /* Cook Service Configuration */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                        Cook Service Specialty
                      </label>
                      <select
                        value={formData.cookSpecialty}
                        onChange={(e) =>
                          setFormData({ ...formData, cookSpecialty: e.target.value })
                        }
                        className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                      >
                        {cookSpecialties.map((s) => (
                          <option key={s} value={s} className="bg-[#041810] text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                        Meal Service Duration
                      </label>
                      <select
                        value={formData.mealSlot}
                        onChange={(e) =>
                          setFormData({ ...formData, mealSlot: e.target.value })
                        }
                        className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                      >
                        <option value="Lunch Feast (4 Hours)" className="bg-[#041810] text-white">
                          Lunch Feast (4 Hours Cooking & Serving)
                        </option>
                        <option value="Dinner Banquet (5 Hours)" className="bg-[#041810] text-white">
                          Dinner Banquet (5 Hours Cooking & Serving)
                        </option>
                        <option value="Full Day (Lunch + Dinner 9 Hours)" className="bg-[#041810] text-white">
                          Full Day (Lunch + Dinner 9 Hours)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                        Raw Groceries Arrangement
                      </label>
                      <select
                        value={formData.groceryOption}
                        onChange={(e) =>
                          setFormData({ ...formData, groceryOption: e.target.value })
                        }
                        className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                      >
                        <option value="Client provides groceries from chef checklist" className="bg-[#041810] text-white">
                          Client provides groceries (Chef provides list)
                        </option>
                        <option value="AD Catering procures 100% farm-fresh groceries" className="bg-[#041810] text-white">
                          AD Catering procures 100% pure groceries & spices
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                        Kitchen Facility Type
                      </label>
                      <select
                        value={formData.kitchenType}
                        onChange={(e) =>
                          setFormData({ ...formData, kitchenType: e.target.value })
                        }
                        className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                      >
                        <option value="Home Kitchen" className="bg-[#041810] text-white">
                          In-Home Private Kitchen
                        </option>
                        <option value="Banquet / Mandap Kitchen" className="bg-[#041810] text-white">
                          Banquet Mandap / Community Hall Kitchen
                        </option>
                        <option value="Outdoor Lawn / Temporary Kitchen" className="bg-[#041810] text-white">
                          Outdoor Lawn / Temporary Tandoor Setup
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Selected Dishes Summary if any */}
                {selectedDishes.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[#06291C] border border-[#D4AF37]/40">
                    <p className="text-xs font-bold text-[#F5CE68] flex items-center gap-1.5">
                      <UtensilsCrossed className="w-4 h-4 text-[#F5CE68]" />
                      <span>{selectedDishes.length} Custom Feast Dishes will be attached to your proposal:</span>
                    </p>
                    <p className="text-[11px] text-[#CBD5E1] mt-1 line-clamp-2">
                      {selectedDishes.map((d) => d.name).join(', ')}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                    Special Menu Preferences or Live Counters (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequirements}
                    onChange={(e) =>
                      setFormData({ ...formData, specialRequirements: e.target.value })
                    }
                    placeholder="e.g. Live tandoor counter, authentic hot Chhena Poda, banana leaf seating, specific Odia mutton/fish curry style..."
                    className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                    Additional Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalNotes: e.target.value })
                    }
                    placeholder="Any specific instructions regarding event timing, generator backup, or serving uniforms..."
                    className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#D4AF37]/30">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl gold-gradient-btn text-sm font-black text-[#041810] shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {bookingType === 'catering'
                          ? 'Submit Catering Banquet Request'
                          : 'Book Master Cook Service'}
                      </span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-[#94A3B8] mt-2 font-normal">
                  No immediate online payment required. Our culinary director will call you to verify kitchen capacity and finalize your booking.
                </p>
              </div>
            </form>
          </div>

          {/* Pricing Estimation Sticky Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="rounded-[36px] bg-[#041810]/90 backdrop-blur-2xl border border-[#D4AF37]/50 p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.6)] space-y-6">
              <div>
                <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-wider bg-[#06291C] border border-[#D4AF37]/50 px-3 py-1 rounded-full">
                  Live Transparent Estimate
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-2">
                  {bookingType === 'catering' ? 'Catering Summary' : 'Cook Hire Summary'}
                </h3>
              </div>

              {bookingType === 'catering' ? (
                /* Catering Price Breakdown */
                <div className="space-y-3.5 text-xs divide-y divide-[#D4AF37]/25">
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Service Type:</span>
                    <span className="font-bold text-emerald-400">Full Catering Banquet</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Selected Package:</span>
                    <span className="font-bold text-white">{formData.selectedPackage}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Rate per Person:</span>
                    <span className="font-bold text-[#F5CE68] tabular-nums">
                      ₹{pricePerPerson}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Honored Guests:</span>
                    <span className="font-bold text-white tabular-nums">
                      {formData.guestCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Buffet & Gold Chafers:</span>
                    <span className="text-emerald-400 font-bold">Included</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Service Stewards:</span>
                    <span className="text-emerald-400 font-bold">Included</span>
                  </div>
                </div>
              ) : (
                /* Cook Hire Breakdown */
                <div className="space-y-3.5 text-xs divide-y divide-[#D4AF37]/25">
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Service Type:</span>
                    <span className="font-bold text-[#F5CE68]">Master Cook Hire</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Cook Specialty:</span>
                    <span className="font-bold text-white truncate max-w-[150px]">{formData.cookSpecialty}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Meal Slot:</span>
                    <span className="font-bold text-white">{formData.mealSlot.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Guests to Feed:</span>
                    <span className="font-bold text-white tabular-nums">{formData.guestCount}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#CBD5E1]">Kitchen Sanitization:</span>
                    <span className="text-emerald-400 font-bold">Included</span>
                  </div>
                </div>
              )}

              {/* Dynamic Total Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#06291C] to-[#041810] text-white border border-[#D4AF37]/40 text-center shadow-md">
                <p className="text-[10px] text-[#CBD5E1] uppercase tracking-widest font-semibold">
                  Estimated Total Quote
                </p>
                <p className="font-display text-3xl sm:text-4xl font-black text-[#F5CE68] mt-1 tabular-nums">
                  ₹{activeEstimatedTotal.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-[#94A3B8] mt-1">
                  {bookingType === 'catering'
                    ? `(Based on ${formData.guestCount} guests × ₹${pricePerPerson})`
                    : `(Cook Team Fee for ${formData.guestCount} guests)`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#06291C]/70 border border-[#D4AF37]/30 space-y-1.5 text-[11px] text-[#CBD5E1]">
                <p className="font-bold text-[#F5CE68] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>AD Catering & Cook Guarantee:</span>
                </p>
                <p>• 100% Purity & Spotless FSSAI Hygiene</p>
                <p>• Verified Master Chefs & Experienced Halwais</p>
                <p>• Punctual Setup & Zero Host Stress</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

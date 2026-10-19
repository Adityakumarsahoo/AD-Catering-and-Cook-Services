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
  ShoppingBag,
  Crown,
} from 'lucide-react';

export const Booking: React.FC = () => {
  const { user } = useAuth();
  const { selectedDishes, clearSelection } = useMenuCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params
  const searchParams = new URLSearchParams(location.search);
  const initialPackage = searchParams.get('package') || 'PREMIUM PACKAGE';
  const initialService = searchParams.get('service') || '';
  const initialMenuType = searchParams.get('menuType') || '';
  const initialGuests = parseInt(searchParams.get('guests') || '') || 150;

  const [packages, setPackages] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    eventType: initialService ? initialService : 'Wedding Reception',
    eventDate: '',
    eventTime: '18:30',
    venue: '',
    guestCount: initialGuests,
    selectedPackage: initialPackage,
    foodPreference: initialMenuType.toLowerCase() === 'veg' ? 'Vegetarian' : 'Mixed',
    specialRequirements: initialMenuType.toLowerCase() === 'veg' ? '100% Pure Vegetarian Feast' : '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await api.getPackages();
        if (res.packages) setPackages(res.packages);
      } catch (err) {
        console.error('Failed to load packages:', err);
      }
    }
    loadPackages();
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

  // Find price of selected package
  const currentPkg = packages.find(
    (p) => p.name.toLowerCase() === formData.selectedPackage.toLowerCase()
  );
  const pricePerPerson = currentPkg ? currentPkg.pricePerPerson : 850;
  const estimatedTotal = formData.guestCount * pricePerPerson;

  const eventTypes = [
    'Wedding Reception',
    'Grand Wedding Banquet',
    'Engagement Ceremony',
    'Birthday Party',
    'Anniversary Celebration',
    'Corporate Gala / Conference',
    'Traditional Odia Feast',
    'Housewarming / Griha Pravesh',
    'Master Home Cook Service',
    'Bulk Catering / Festival',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.eventDate) {
      toast.error('Please fill in your name, phone number, and event date.');
      return;
    }

    if (formData.guestCount < 10) {
      toast.error('Minimum guest count for booking is 10.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Include selected custom dishes in special requirements if present
      let specReq = formData.specialRequirements;
      if (selectedDishes.length > 0) {
        const dishList = selectedDishes.map((d) => d.name).join(', ');
        specReq = specReq
          ? `${specReq}\nCustom Dishes: ${dishList}`
          : `Custom Dishes: ${dishList}`;
      }

      const payload = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        venue: formData.venue,
        guestCount: formData.guestCount,
        package: formData.selectedPackage,
        foodPreference: formData.foodPreference,
        specialRequirements: specReq,
        additionalNotes: formData.additionalNotes,
      };

      const res = await api.createBooking(payload);
      if (res.booking) {
        setConfirmedBooking(res.booking);
        clearSelection();
        toast.success(res.message || 'Booking placed successfully!');
        // Fire confetti celebration
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
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#06291C] border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow">
            <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Reserve Your Date</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Book Catering & Cook Services
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
            Fill out your celebration details below. Our executive team will calculate your quote and assign master chefs to your date.
          </p>
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
                  Booking Request Confirmed
                </span>
                <h2 className="font-display text-2xl font-bold text-white mt-3">
                  Thank You, {confirmedBooking.customerName}!
                </h2>
                <p className="text-xs text-[#CBD5E1] mt-2 font-normal">
                  Your catering inquiry has been safely logged in our system. Our catering director will contact you via phone or WhatsApp shortly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#06291C] border border-[#D4AF37]/35 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Booking ID:</span>
                  <span className="font-bold text-[#F5CE68]">{confirmedBooking.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Event Type:</span>
                  <span className="text-white font-medium">{confirmedBooking.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Date & Time:</span>
                  <span className="text-white font-medium">
                    {confirmedBooking.eventDate} at {confirmedBooking.eventTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#CBD5E1]">Guest Count:</span>
                  <span className="text-white font-medium">{confirmedBooking.guestCount} Guests</span>
                </div>
                <div className="flex justify-between border-t border-[#D4AF37]/30 pt-2">
                  <span className="text-white font-bold">Estimated Total:</span>
                  <span className="text-[#F5CE68] font-black text-sm">
                    ₹{confirmedBooking.estimatedAmount.toLocaleString('en-IN')}
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
              {/* 1. Contact Details */}
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
                      placeholder="Your Full Name (e.g. Ramesh Mohanty)"
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
                      placeholder="guest@adcatering.com"
                      className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Event Specifics */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2 pb-2.5 border-b border-[#D4AF37]/30">
                  <Calendar className="w-5 h-5 text-[#F5CE68]" />
                  <span>2. Event Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Event Type *
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
                      Service Serving Time
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
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                    Event Venue / Address
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    placeholder="e.g. Swosti Premium, Jaydev Vihar, Bhubaneswar (or Home Address)"
                    className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* 3. Package & Guests */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2 pb-2.5 border-b border-[#D4AF37]/30">
                  <Utensils className="w-5 h-5 text-[#F5CE68]" />
                  <span>3. Package & Guest Scale</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Estimated Guests (Min 10) *
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={10000}
                      step={5}
                      value={formData.guestCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guestCount: Math.max(10, parseInt(e.target.value) || 10),
                        })
                      }
                      className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white font-bold tabular-nums focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Selected Package
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
                          {p.name} (₹{p.pricePerPerson}/person)
                        </option>
                      ))}
                      <option value="Customized Menu" className="bg-[#041810] text-white">
                        Customized Menu (A la Carte)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                      Food Preference
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
                        100% Pure Vegetarian
                      </option>
                      <option value="Non-Vegetarian" className="bg-[#041810] text-white">
                        Non-Vegetarian Dominant
                      </option>
                    </select>
                  </div>
                </div>

                {/* Selected Dishes Summary if any */}
                {selectedDishes.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[#06291C] border border-[#D4AF37]/40">
                    <p className="text-xs font-bold text-[#F5CE68] flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-[#F5CE68]" />
                      <span>{selectedDishes.length} Custom Dishes will be attached:</span>
                    </p>
                    <p className="text-[11px] text-[#CBD5E1] mt-1 line-clamp-2">
                      {selectedDishes.map((d) => d.name).join(', ')}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequirements}
                    onChange={(e) =>
                      setFormData({ ...formData, specialRequirements: e.target.value })
                    }
                    placeholder="e.g. Live tandoor counter, authentic Chhena Poda, banana leaf seating, specific Odia fish preparation..."
                    className="w-full bg-[#06291C] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68] shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#CBD5E1] mb-1.5">
                    Additional Notes
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
                      <span>Submit Booking Request</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-[#94A3B8] mt-2 font-normal">
                  No immediate payment required. Our team will verify kitchen capacity and send a confirmed invoice.
                </p>
              </div>
            </form>
          </div>

          {/* Pricing Estimation Sticky Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="rounded-[36px] bg-[#041810]/90 backdrop-blur-2xl border border-[#D4AF37]/50 p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.6)] space-y-6">
              <div>
                <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-wider bg-[#06291C] border border-[#D4AF37]/50 px-3 py-1 rounded-full">
                  Live Price Estimate
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-2">Event Summary</h3>
              </div>

              <div className="space-y-3.5 text-xs divide-y divide-[#D4AF37]/25">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#CBD5E1]">Package Selected:</span>
                  <span className="font-bold text-white">{formData.selectedPackage}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#CBD5E1]">Rate per Person:</span>
                  <span className="font-bold text-[#F5CE68] tabular-nums">
                    ₹{pricePerPerson}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#CBD5E1]">Expected Guests:</span>
                  <span className="font-bold text-white tabular-nums">
                    {formData.guestCount}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#CBD5E1]">Service Staff:</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#CBD5E1]">Buffet Equipment:</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
              </div>

              {/* Dynamic Total Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#06291C] to-[#041810] text-white border border-[#D4AF37]/40 text-center shadow-md">
                <p className="text-[10px] text-[#CBD5E1] uppercase tracking-widest font-semibold">
                  Estimated Total Quote
                </p>
                <p className="font-display text-3xl sm:text-4xl font-black text-[#F5CE68] mt-1 tabular-nums">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-[#94A3B8] mt-1">
                  (Based on {formData.guestCount} guests × ₹{pricePerPerson})
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#06291C]/70 border border-[#D4AF37]/30 space-y-1.5 text-[11px] text-[#CBD5E1]">
                <p className="font-bold text-[#F5CE68] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>AD Catering Guarantee:</span>
                </p>
                <p>• 100% Fresh & Authentic Ingredients</p>
                <p>• On-time Food Warmers & Setup</p>
                <p>• Clean Hygiene & Utensils Handling</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

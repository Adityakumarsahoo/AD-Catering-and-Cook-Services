import React, { useState } from 'react';
import { api } from '../services/api.js';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ArrowUpRight, Crown } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/cateringConfig';
import { MinimumGuestsNotice } from '../components/MinimumGuestsNotice';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error('Name, phone number, and message are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitContact(formData);
      toast.success(res.message || 'Your inquiry has been submitted! We will respond shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 text-[#FAF8F5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68] uppercase tracking-wider shadow">
            <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
            <span>Get In Touch</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Contact AD Catering & Cook Services
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
            Have questions about wedding menus, cook availability, or custom quotes? Our team is available 7 days a week.
          </p>
        </div>

        {/* Minimum 500 Guests & Special Small Event Notice */}
        <div className="max-w-4xl mx-auto mb-12">
          <MinimumGuestsNotice variant="card" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Information & Quick CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[36px] bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 p-6 sm:p-8 space-y-6 shadow-[0_24px_70px_rgba(0,0,0,0.6)] liquid-shine text-[#FAF8F5]">
              <h3 className="font-display font-bold text-2xl text-white">Central Operations Office</h3>

              <div className="space-y-5 text-xs text-[#CBD5E1]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F5CE68] border border-[#D4AF37]/40 flex items-center justify-center text-[#041810] shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Headquarters Address</h4>
                    <p className="mt-0.5 leading-relaxed text-[#CBD5E1]">
                      Plot 104, Shaheed Nagar, Bhubaneswar, Odisha 751007, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F5CE68] border border-[#D4AF37]/40 flex items-center justify-center text-[#041810] shrink-0 mt-0.5 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Direct Phone</h4>
                    <p className="mt-0.5 leading-relaxed text-[#F5CE68] font-bold">
                      <a href={BUSINESS_CONFIG.phoneTel} className="hover:underline">
                        {BUSINESS_CONFIG.phoneFormatted}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F5CE68] border border-[#D4AF37]/40 flex items-center justify-center text-[#041810] shrink-0 mt-0.5 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Email Inquiries</h4>
                    <p className="mt-0.5 leading-relaxed text-[#CBD5E1]">
                      <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:underline">
                        {BUSINESS_CONFIG.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F5CE68] border border-[#D4AF37]/40 flex items-center justify-center text-[#041810] shrink-0 mt-0.5 shadow-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Business Hours</h4>
                    <p className="mt-0.5 leading-relaxed text-[#CBD5E1]">Monday – Sunday: 8:00 AM – 11:00 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-4 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row gap-3">
                <a
                  href={BUSINESS_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={BUSINESS_CONFIG.phoneTel}
                  className="flex-1 py-3 px-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-[#D4AF37]/50 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#F5CE68]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Google Maps Container */}
            <div className="rounded-[32px] overflow-hidden bg-[#06291C]/85 border border-[#D4AF37]/40 h-56 shadow-sm p-1">
              <iframe
                title="AD Catering Location"
                src="https://maps.google.com/maps?q=Shaheed%20Nagar%20Bhubaneswar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full rounded-[28px] border-0 filter contrast-[1.05]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#06291C]/85 backdrop-blur-xl border border-[#D4AF37]/40 rounded-[36px] p-6 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.6)] liquid-shine text-[#FAF8F5]">
            <h3 className="font-display font-bold text-2xl text-white mb-1">Send Us an Inquiry</h3>
            <p className="text-xs text-[#CBD5E1] mb-6 font-normal">
              Fill out this message form and our team will get in touch with detailed banquet brochures and sample menus.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name (e.g. AD Catering Guest)"
                    className="w-full bg-[#041810] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/50 focus:outline-none focus:border-[#F5CE68] focus:ring-1 focus:ring-[#D4AF37]/50 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#041810] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/50 focus:outline-none focus:border-[#F5CE68] focus:ring-1 focus:ring-[#D4AF37]/50 shadow-inner transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full bg-[#041810] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/50 focus:outline-none focus:border-[#F5CE68] focus:ring-1 focus:ring-[#D4AF37]/50 shadow-inner transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Wedding Catering Quote for 500 Guests"
                    className="w-full bg-[#041810] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/50 focus:outline-none focus:border-[#F5CE68] focus:ring-1 focus:ring-[#D4AF37]/50 shadow-inner transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
                  Message / Event Requirements *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the event date, venue location, estimated guests, and cuisine preferences (e.g. Traditional Odia Dalma, Mutton Kasa, live chaat counter)..."
                  className="w-full bg-[#041810] border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-emerald-300/50 focus:outline-none focus:border-[#F5CE68] focus:ring-1 focus:ring-[#D4AF37]/50 shadow-inner transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Inquiry Message'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

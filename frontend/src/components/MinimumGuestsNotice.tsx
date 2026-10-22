import React from 'react';
import { Phone, Users, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/cateringConfig.js';

interface MinimumGuestsNoticeProps {
  className?: string;
  variant?: 'banner' | 'card' | 'inline' | 'compact';
  highlightSmaller?: boolean;
}

export const MinimumGuestsNotice: React.FC<MinimumGuestsNoticeProps> = ({
  className = '',
  variant = 'banner',
  highlightSmaller = false,
}) => {
  const { minimumBookingNotice, phonePrimary, phonePrimaryRaw, whatsappNumber } = BUSINESS_CONFIG;

  if (variant === 'compact') {
    return (
      <div className={`p-4 rounded-2xl bg-[#041810]/90 border border-[#D4AF37]/50 shadow-md ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] text-[#041810] flex items-center justify-center shrink-0 font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <p className="font-display font-black text-sm text-[#F5CE68]">
              {minimumBookingNotice.title}
            </p>
            <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
              {minimumBookingNotice.smallerGatheringsNote}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href={`tel:${phonePrimaryRaw}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#041810] text-[11px] font-black hover:bg-[#F5CE68] transition-colors shadow-sm"
              >
                <Phone className="w-3 h-3" />
                <span>Call {phonePrimary}</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  'Hello AD Catering, I would like to make a special catering enquiry for a gathering below 500 guests.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[11px] font-bold hover:bg-emerald-900 transition-colors"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-[32px] p-6 sm:p-8 bg-gradient-to-r from-[#041810] via-[#062417] to-[#041810] border-2 border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden liquid-shine ${className}`}
    >
      {/* Golden accent bar on top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5CE68] to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Minimum requirement & note */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-[#D4AF37] text-[11px] font-black text-[#F5CE68] uppercase tracking-wider shadow-sm">
              <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Standard Catering Policy</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Direct Host Service</span>
            </span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
            <span>{minimumBookingNotice.title}</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
            {minimumBookingNotice.smallerGatheringsNote}
          </p>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-[#94A3B8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5CE68]" />
            <span>Smaller-event enquiries are handled as custom quotations to match bespoke menu logistics.</span>
          </div>
        </div>

        {/* Right Column: Direct Contact CTA */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
          <a
            href={`tel:${phonePrimaryRaw}`}
            className="w-full py-3.5 px-5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] text-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {phonePrimary}</span>
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              'Hello AD Catering, I would like to request a custom catering quotation for a gathering below 500 guests (e.g. 200 or 300 guests).'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-5 rounded-2xl bg-[#041810] hover:bg-[#06291C] border border-[#D4AF37]/60 text-xs font-bold text-[#F5CE68] text-center shadow transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Custom Quote</span>
          </a>

          <p className="text-[10px] text-center text-[#94A3B8]">
            Verified footer contact • Instant response
          </p>
        </div>
      </div>
    </div>
  );
};

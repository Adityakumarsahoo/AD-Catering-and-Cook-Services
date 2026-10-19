import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';
import {
  Home as HomeIcon,
  Save,
  RotateCcw,
  Eye,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  Sliders,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const AdminHomepage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [homepage, setHomepage] = useState({
    heroHeading: 'AD CATERING & COOK SERVICES',
    heroSubtitle: "Odisha's Premier Royal Festive & Wedding Catering. Authentic heritage delicacies, 5-star live master counters, and executive private cook services for banquets of 25 to 5,000+ guests.",
    heroBgVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-table-with-food-4074-large.mp4',
    heroBgImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80',
    primaryCtaText: 'Plan Your Grand Event',
    primaryCtaLink: '/booking',
    secondaryCtaText: 'Explore 145+ Menu Dishes',
    secondaryCtaLink: '/menu',
    trustStats: {
      eventsServed: '1,200+',
      masterChefs: '25+',
      happyGuests: '500,000+',
      hygieneRating: '4.9/5',
    },
    sectionVisibility: {
      hero: true,
      quickStats: true,
      calculator: true,
      featuredDishes: true,
      services: true,
      packages: true,
      testimonials: true,
      ctaBanner: true,
    },
  });

  const loadHomepage = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminHomepage();
      if (res?.homepage) {
        setHomepage(res.homepage);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load homepage content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomepage();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateAdminHomepage(homepage);
      toast.success('Homepage content saved and live on public website');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update homepage');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900">Homepage Content & Hero Settings</h3>
          <p className="text-xs text-slate-500">Customize royal headline, video background, CTA buttons, and visible modules</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadHomepage}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Publish to Website'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Hero Headlines & CTAs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Hero Section Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-[#AA7C11]" />
              <h4 className="font-display font-bold text-sm text-slate-900">Hero Section Headlines</h4>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Hero Main Heading *</label>
                <input
                  type="text"
                  required
                  value={homepage.heroHeading}
                  onChange={(e) => setHomepage({ ...homepage, heroHeading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Hero Subtitle & Introduction *</label>
                <textarea
                  rows={3}
                  required
                  value={homepage.heroSubtitle}
                  onChange={(e) => setHomepage({ ...homepage, heroSubtitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Media URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-blue-600" />
                    <span>Background Video MP4 URL</span>
                  </label>
                  <input
                    type="url"
                    value={homepage.heroBgVideoUrl}
                    onChange={(e) => setHomepage({ ...homepage, heroBgVideoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fallback Poster Image URL</span>
                  </label>
                  <input
                    type="url"
                    value={homepage.heroBgImageUrl}
                    onChange={(e) => setHomepage({ ...homepage, heroBgImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Primary Button Text & Destination</label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={homepage.primaryCtaText}
                      onChange={(e) => setHomepage({ ...homepage, primaryCtaText: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50"
                      placeholder="Button Label"
                    />
                    <input
                      type="text"
                      value={homepage.primaryCtaLink}
                      onChange={(e) => setHomepage({ ...homepage, primaryCtaLink: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-mono text-[11px]"
                      placeholder="Route path (e.g. /booking)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Secondary Button Text & Destination</label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={homepage.secondaryCtaText}
                      onChange={(e) => setHomepage({ ...homepage, secondaryCtaText: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50"
                      placeholder="Button Label"
                    />
                    <input
                      type="text"
                      value={homepage.secondaryCtaLink}
                      onChange={(e) => setHomepage({ ...homepage, secondaryCtaLink: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-mono text-[11px]"
                      placeholder="Route path (e.g. /menu)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Counters */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900">Trust Badges & Business Statistics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Events Served</label>
                <input
                  type="text"
                  value={homepage.trustStats?.eventsServed || '1,200+'}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      trustStats: { ...homepage.trustStats, eventsServed: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Master Chefs</label>
                <input
                  type="text"
                  value={homepage.trustStats?.masterChefs || '25+'}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      trustStats: { ...homepage.trustStats, masterChefs: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Happy Guests</label>
                <input
                  type="text"
                  value={homepage.trustStats?.happyGuests || '500,000+'}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      trustStats: { ...homepage.trustStats, happyGuests: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Hygiene Rating</label>
                <input
                  type="text"
                  value={homepage.trustStats?.hygieneRating || '4.9/5'}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      trustStats: { ...homepage.trustStats, hygieneRating: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Section Visibility Toggles */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sliders className="w-4 h-4 text-[#AA7C11]" />
              <h4 className="font-display font-bold text-sm text-slate-900">Section Visibility Control</h4>
            </div>
            <p className="text-xs text-slate-500">Enable or disable specific sections on the public homepage</p>

            <div className="space-y-3 pt-2">
              {Object.entries(homepage.sectionVisibility || {}).map(([key, val]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/60 cursor-pointer transition-colors"
                >
                  <span className="text-xs font-bold text-slate-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')} Section
                  </span>
                  <input
                    type="checkbox"
                    checked={Boolean(val)}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        sectionVisibility: {
                          ...homepage.sectionVisibility,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 text-[#D4AF37] rounded"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Quick Preview Link */}
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 space-y-2">
            <h5 className="font-bold text-xs text-emerald-900">Live Website Sync</h5>
            <p className="text-xs text-emerald-700">
              Changes saved here are instantly persistent in the backend database.
            </p>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-1"
            >
              <span>View Public Homepage</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </form>
  );
};

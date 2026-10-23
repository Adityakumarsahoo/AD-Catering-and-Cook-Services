import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.js';
import toast from 'react-hot-toast';
import {
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Share2,
  Search,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    businessName: 'AD Catering and Cook Services',
    tagline: "Odisha's Premier Festive, Wedding & Master Cook Experience",
    phoneHotline: '+91 99377 82778',
    whatsappNumber: '+91 7684842778',
    supportEmail: 'contact@adcatering.com',
    headquartersAddress: 'AT-BISWANATH BHAWAN, LALBAHADUR LANE NEAR SWADHIN BOYS HOSTEL, PO- AD MARKET, PS- BADAMBADI, PIN- 753012, CUTTACK',
    operatingHours: 'Monday - Sunday: 7:00 AM - 11:30 PM (IST)',
    logoUrl: '/logo.png',
    socialInstagram: 'https://instagram.com/adcatering_official',
    socialFacebook: 'https://facebook.com/adcateringservices',
    socialYoutube: 'https://youtube.com/@adcatering',
    seoTitle: 'AD Catering and Cook Services | Royal Festive & Wedding Catering Odisha',
    seoDescription: 'Premier wedding catering, festive bhoji, authentic Odia delicacies, and certified home cook services in Bhubaneswar, Cuttack, Puri & across Odisha.',
    seoKeywords: 'catering bhubaneswar, odia wedding catering, cook service odisha, mutton kasa catering, best caterer in cuttack, chhena poda sweetmaker',
  });

  // Admin profile update
  const [adminName, setAdminName] = useState(user?.name || 'AD Catering and Cook Services');
  const [adminPhone, setAdminPhone] = useState(user?.phone || '+91 9937782778');
  const [adminPassword, setAdminPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminSettings();
      if (res?.settings) {
        setSettings(res.settings);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateAdminSettings(settings);
      toast.success('Website business settings saved successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      const payload: any = { name: adminName, phone: adminPhone };
      if (adminPassword) payload.password = adminPassword;
      await api.updateProfile(payload);
      toast.success('Admin profile credentials updated');
      setAdminPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update admin profile');
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900">Website & Business Settings</h3>
          <p className="text-xs text-slate-500">Manage contact information, social links, SEO metadata, and admin profile</p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={saving}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer self-start sm:self-center"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Business Contact & SEO */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Business Contact Details */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Phone className="w-4 h-4 text-[#AA7C11]" />
              <h4 className="font-display font-bold text-sm text-slate-900">Official Business Details & Contacts</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Company / Enterprise Name *</label>
                <input
                  type="text"
                  required
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Official Hotline Phone *</label>
                <input
                  type="text"
                  required
                  value={settings.phoneHotline}
                  onChange={(e) => setSettings({ ...settings, phoneHotline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">WhatsApp Hotline *</label>
                <input
                  type="text"
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Support & Inquiries Email *</label>
                <input
                  type="email"
                  required
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Catering Headquarters Address</label>
                <textarea
                  rows={2}
                  value={settings.headquartersAddress}
                  onChange={(e) => setSettings({ ...settings, headquartersAddress: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Operating Hours / Service Availability</label>
                <input
                  type="text"
                  value={settings.operatingHours}
                  onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Share2 className="w-4 h-4 text-[#AA7C11]" />
              <h4 className="font-display font-bold text-sm text-slate-900">Social Media & Public Channels</h4>
            </div>

            <div className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Instagram Profile URL</label>
                <input
                  type="url"
                  value={settings.socialInstagram}
                  onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Facebook Page URL</label>
                <input
                  type="url"
                  value={settings.socialFacebook}
                  onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">YouTube Channel URL</label>
                <input
                  type="url"
                  value={settings.socialYoutube}
                  onChange={(e) => setSettings({ ...settings, socialYoutube: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Search className="w-4 h-4 text-[#AA7C11]" />
              <h4 className="font-display font-bold text-sm text-slate-900">Search Engine Optimization (SEO)</h4>
            </div>

            <div className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Page Meta Title</label>
                <input
                  type="text"
                  value={settings.seoTitle}
                  onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Meta Description (150-160 characters)</label>
                <textarea
                  rows={2}
                  value={settings.seoDescription}
                  onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Keywords (Comma separated)</label>
                <input
                  type="text"
                  value={settings.seoKeywords}
                  onChange={(e) => setSettings({ ...settings, seoKeywords: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Admin Account Profile & Security */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="font-display font-bold text-sm text-slate-900">Administrator Profile & Security</h4>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs font-medium">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Admin Display Name</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Admin Phone</label>
                <input
                  type="text"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Admin Email (Read-Only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || 'admin@adcatering.com'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Change Master Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Leave blank to keep unchanged"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {savingProfile ? 'Updating Credentials...' : 'Update Admin Credentials'}
                </button>
              </div>
            </form>
          </div>

          {/* Quick System Badge */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Role-Based Access Control</span>
            </div>
            <p className="text-amber-950/80 leading-relaxed text-[11px]">
              All admin operations require signed JWT bearer tokens and active Administrator authorization. Changes are persisted in real time to the server database.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

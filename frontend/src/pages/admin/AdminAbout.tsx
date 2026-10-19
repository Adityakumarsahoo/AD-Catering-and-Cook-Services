import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';
import {
  Info,
  Save,
  RotateCcw,
  Sparkles,
  Users,
  ShieldCheck,
  ChefHat,
  Crown,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export const AdminAbout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [about, setAbout] = useState({
    companyTitle: 'About AD Catering & Cook Services',
    subtitle: 'Preserving Authentic Heritage Flavors with Modern Hospitality Excellence',
    heritageStory: "Founded with a passion for authentic culinary traditions and flawless hospitality, AD Catering & Cook Services has grown to become Odisha's premier choice for festive, corporate, and royal wedding celebrations. Our culinary repertoire blends the deep-rooted richness of traditional Odia delicacies—such as slow-cooked Dalma, Machha Besara, Mutton Kasa, and earthen-baked Chhena Poda—with pan-Indian royal banquets, live Chinese woks, and European pastry dessert lounges.",
    culinaryMission: 'To deliver unforgettable gastronomic journeys and warm, impeccable hospitality while upholding the highest standards of food purity, taste, and safety.',
    culinaryVision: 'To be the most trusted and celebrated banquet catering and private master cook enterprise across Eastern India.',
    fssaiNumber: 'FSSAI-12024999000182',
    experienceYears: 15,
    guidingPillars: [
      {
        id: 'pil_1',
        title: 'Quality Food',
        description: 'Freshly prepared with pure cow ghee, authentic whole spices, and rich regional flavors.',
        icon: 'UtensilsCrossed',
      },
      {
        id: 'pil_2',
        title: 'FSSAI & Spotless Hygiene',
        description: 'Sterilized equipment, temperature-controlled transport, and strict hairnet/glove protocols.',
        icon: 'ShieldCheck',
      },
      {
        id: 'pil_3',
        title: 'Master Cooks & Halwais',
        description: 'Over 25+ veteran chefs specializing in Odia feasts, live tandoor, Mughlai, and traditional sweets.',
        icon: 'ChefHat',
      },
      {
        id: 'pil_4',
        title: 'Punctual VIP Service',
        description: 'Polite uniformed banquet stewards, seamless buffet flow, and spotless post-event cleanup.',
        icon: 'Crown',
      },
    ],
    teamMembers: [
      {
        id: 'tm_1',
        name: 'AD Catering and Cook Services',
        role: 'Founder & Managing Director',
        bio: 'Visionary hospitality entrepreneur dedicated to elevating traditional Odisha banquet culture into royal luxury experiences.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'tm_2',
        name: 'Master Chef Debasish Mohanty',
        role: 'Head Executive Chef',
        bio: '25+ years mastering authentic Odia Bhoji specialties, dum biryanis, and royal gravies.',
        image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'tm_3',
        name: 'Ramesh Halwai',
        role: 'Master Confectioner & Sweets Head',
        bio: 'Legendary sweetmaker famous for hot earthen baked Chhena Poda, Rasabali, and saffron Rasmalai.',
        image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80',
      },
    ],
  });

  const loadAbout = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminAbout();
      if (res?.about) {
        setAbout(res.about);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load about data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateAdminAbout(about);
      toast.success('About Us content saved and live on public website');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save about content');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePillar = (index: number, field: string, val: string) => {
    const updated = [...about.guidingPillars];
    updated[index] = { ...updated[index], [field]: val };
    setAbout({ ...about, guidingPillars: updated });
  };

  const handleUpdateTeam = (index: number, field: string, val: string) => {
    const updated = [...about.teamMembers];
    updated[index] = { ...updated[index], [field]: val };
    setAbout({ ...about, teamMembers: updated });
  };

  const handleAddTeamMember = () => {
    const newMember = {
      id: `tm_${Date.now()}`,
      name: 'New Culinary Team Member',
      role: 'Sous Chef',
      bio: 'Experienced chef in regional catering and banquets.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
    };
    setAbout({ ...about, teamMembers: [...about.teamMembers, newMember] });
  };

  const handleRemoveTeamMember = (index: number) => {
    const updated = about.teamMembers.filter((_, i) => i !== index);
    setAbout({ ...about, teamMembers: updated });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900">About Us & Culinary Heritage</h3>
          <p className="text-xs text-slate-500">Edit company story, mission, vision, guiding pillars, and leadership team</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadAbout}
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
        
        {/* Left Column (7 cols): Heritage Story, Mission & Vision */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900">Brand Identity & Heritage</h4>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Company Page Title *</label>
                <input
                  type="text"
                  required
                  value={about.companyTitle}
                  onChange={(e) => setAbout({ ...about, companyTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Headline Subtitle *</label>
                <input
                  type="text"
                  required
                  value={about.subtitle}
                  onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Heritage Story & Background *</label>
                <textarea
                  rows={4}
                  required
                  value={about.heritageStory}
                  onChange={(e) => setAbout({ ...about, heritageStory: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Culinary Mission</label>
                  <textarea
                    rows={3}
                    value={about.culinaryMission}
                    onChange={(e) => setAbout({ ...about, culinaryMission: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Culinary Vision</label>
                  <textarea
                    rows={3}
                    value={about.culinaryVision}
                    onChange={(e) => setAbout({ ...about, culinaryVision: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">FSSAI Certification #</label>
                  <input
                    type="text"
                    value={about.fssaiNumber}
                    onChange={(e) => setAbout({ ...about, fssaiNumber: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Years of Culinary Experience</label>
                  <input
                    type="number"
                    value={about.experienceYears}
                    onChange={(e) => setAbout({ ...about, experienceYears: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Guiding Pillars */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900">The Four Guiding Pillars</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              {about.guidingPillars.map((pillar, idx) => (
                <div key={pillar.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div>
                    <label className="block text-[11px] text-slate-500 font-bold mb-0.5">Pillar #{idx + 1} Title</label>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => handleUpdatePillar(idx, 'title', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 font-bold mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => handleUpdatePillar(idx, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Leadership & Master Chefs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900">Executive Culinary Team</h4>
                <p className="text-xs text-slate-500">Key leadership & master halwais</p>
              </div>
              <button
                type="button"
                onClick={handleAddTeamMember}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Member</span>
              </button>
            </div>

            <div className="space-y-4">
              {about.teamMembers.map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                      Member #{idx + 1}
                    </span>
                    {about.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTeamMember(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 text-xs font-medium">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-slate-600 font-bold mb-0.5">Full Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleUpdateTeam(idx, 'name', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-600 font-bold mb-0.5">Role / Designation</label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => handleUpdateTeam(idx, 'role', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 font-bold mb-0.5">Profile Photo URL</label>
                      <input
                        type="url"
                        value={member.image}
                        onChange={(e) => handleUpdateTeam(idx, 'image', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 font-bold mb-0.5">Short Bio</label>
                      <textarea
                        rows={2}
                        value={member.bio}
                        onChange={(e) => handleUpdateTeam(idx, 'bio', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </form>
  );
};

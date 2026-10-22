import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';
import {
  Package as PackageIcon,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Crown,
  CheckCircle2,
  Users,
  Wine,
  UtensilsCrossed,
  Cake,
  X,
  Star,
} from 'lucide-react';

export const AdminPackages: React.FC = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const initialForm = {
    id: '',
    name: '',
    pricePerPerson: 850,
    description: '',
    startersCount: 3,
    mainCourseCount: 6,
    dessertCount: 2,
    drinksCount: 1,
    staffIncluded: true,
    decorationOption: true,
    popular: false,
    minGuests: 500,
    featuresText: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const res = await api.getPackages();
      if (res?.packages) {
        setPackages(res.packages);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (pkg: any) => {
    setIsEditing(true);
    setFormData({
      id: pkg.id,
      name: pkg.name,
      pricePerPerson: pkg.pricePerPerson || 0,
      description: pkg.description || '',
      startersCount: pkg.startersCount || 2,
      mainCourseCount: pkg.mainCourseCount || 4,
      dessertCount: pkg.dessertCount || 1,
      drinksCount: pkg.drinksCount || 1,
      staffIncluded: Boolean(pkg.staffIncluded),
      decorationOption: Boolean(pkg.decorationOption),
      popular: Boolean(pkg.popular),
      minGuests: pkg.minGuests || 500,
      featuresText: Array.isArray(pkg.features) ? pkg.features.join('\n') : '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.pricePerPerson) {
      toast.error('Package name and price per plate are required.');
      return;
    }

    try {
      setSaving(true);
      const features = formData.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name.trim().toUpperCase(),
        pricePerPerson: Number(formData.pricePerPerson),
        description: formData.description.trim(),
        startersCount: Number(formData.startersCount || 2),
        mainCourseCount: Number(formData.mainCourseCount || 4),
        dessertCount: Number(formData.dessertCount || 1),
        drinksCount: Number(formData.drinksCount || 1),
        staffIncluded: formData.staffIncluded,
        decorationOption: formData.decorationOption,
        popular: formData.popular,
        minGuests: Number(formData.minGuests || 50),
        features,
      };

      if (isEditing) {
        await api.updatePackage(formData.id, payload);
        toast.success(`Package "${formData.name}" updated successfully`);
      } else {
        await api.createPackage(payload);
        toast.success(`Package "${formData.name}" created successfully`);
      }

      setModalOpen(false);
      loadPackages();
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deletePackage(id);
      toast.success('Package removed');
      setDeleteConfirmId(null);
      loadPackages();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete package');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900">Banquet Catering Packages</h3>
          <p className="text-xs text-slate-500">Tiered menus and inclusions for weddings, receptions, and corporate galas</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Package</span>
        </button>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-3xl bg-white border p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-5 relative ${
              pkg.popular ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30' : 'border-slate-200/90'
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] text-[10px] font-black uppercase tracking-wider shadow">
                ★ Most Popular
              </span>
            )}

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                    {pkg.id}
                  </span>
                  <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                    {pkg.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-[#AA7C11]">
                    ₹{pkg.pricePerPerson}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium">per plate</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {pkg.description || 'Complete banquet catering setup with master chefs and premium cutlery.'}
              </p>

              {/* Counters Grid */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-slate-50">
                  <p className="text-xs font-black font-mono text-slate-900">{pkg.startersCount || 2}</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Starters</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <p className="text-xs font-black font-mono text-slate-900">{pkg.mainCourseCount || 4}</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Mains</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <p className="text-xs font-black font-mono text-slate-900">{pkg.dessertCount || 1}</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Desserts</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <p className="text-xs font-black font-mono text-slate-900">{pkg.drinksCount || 1}</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Drinks</p>
                </div>
              </div>

              {/* Features List */}
              {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Package Inclusions:</p>
                  {pkg.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-semibold">
                Staff & Decor: {pkg.staffIncluded ? 'Included' : 'Optional'}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(pkg.id)}
                  className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================
          MODAL: ADD / EDIT PACKAGE
          ==================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-900">
                {isEditing ? 'Edit Catering Package' : 'Create New Package'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Package Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. GRAND ROYAL WEDDING PACKAGE"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Price per Plate (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerPerson}
                    onChange={(e) => setFormData({ ...formData, pricePerPerson: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Minimum Guests</label>
                  <input
                    type="number"
                    value={formData.minGuests}
                    onChange={(e) => setFormData({ ...formData, minGuests: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief overview of package hospitality tier..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Counts */}
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 font-bold mb-1">Starters</label>
                  <input
                    type="number"
                    value={formData.startersCount}
                    onChange={(e) => setFormData({ ...formData, startersCount: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 font-bold mb-1">Mains</label>
                  <input
                    type="number"
                    value={formData.mainCourseCount}
                    onChange={(e) => setFormData({ ...formData, mainCourseCount: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 font-bold mb-1">Desserts</label>
                  <input
                    type="number"
                    value={formData.dessertCount}
                    onChange={(e) => setFormData({ ...formData, dessertCount: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 font-bold mb-1">Drinks</label>
                  <input
                    type="number"
                    value={formData.drinksCount}
                    onChange={(e) => setFormData({ ...formData, drinksCount: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Features & Inclusions (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="4 Live Counter Starters&#10;Royal Odia Mutton Kasa&#10;Zafrani Dum Biryani&#10;Full Ceramic Crockery & Linen"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4 text-[#D4AF37] rounded"
                  />
                  <span className="font-bold text-slate-800">Feature as Popular</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.staffIncluded}
                    onChange={(e) => setFormData({ ...formData, staffIncluded: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="font-bold text-slate-800">Banquet Staff Included</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold shadow hover:shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : isEditing ? 'Update Package' : 'Save Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 text-center border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-slate-900">Delete this Package?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this package tier from the database?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

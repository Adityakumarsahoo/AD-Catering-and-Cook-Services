import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';
import {
  ChefHat,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  UtensilsCrossed,
  Sparkles,
  Layers,
  ArrowUpDown,
  X,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'catering' | 'cook'>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const initialForm = {
    id: '',
    title: '',
    description: '',
    startingPrice: 350,
    category: 'catering' as 'catering' | 'cook',
    image: '',
    featuresText: '',
    icon: 'ChefHat',
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await api.getServices();
      if (res?.services) {
        setServices(res.services);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (srv: any) => {
    setIsEditing(true);
    setFormData({
      id: srv.id,
      title: srv.title,
      description: srv.description || '',
      startingPrice: srv.startingPrice || 0,
      category: srv.category || 'catering',
      image: srv.image || '',
      featuresText: Array.isArray(srv.features) ? srv.features.join('\n') : '',
      icon: srv.icon || 'ChefHat',
      isPublished: srv.isPublished !== undefined ? srv.isPublished : true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.startingPrice) {
      toast.error('Title and price are required.');
      return;
    }

    try {
      setSaving(true);
      const features = formData.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        startingPrice: Number(formData.startingPrice),
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        features,
        icon: formData.icon,
        isPublished: formData.isPublished,
      };

      if (isEditing) {
        await api.updateService(formData.id, payload);
        toast.success('Service updated successfully');
      } else {
        await api.createService(payload);
        toast.success('Service added successfully');
      }

      setModalOpen(false);
      loadServices();
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteService(id);
      toast.success('Service removed');
      setDeleteConfirmId(null);
      loadServices();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete service');
    }
  };

  const handleTogglePublish = async (srv: any) => {
    try {
      const nextState = srv.isPublished !== undefined ? !srv.isPublished : false;
      await api.updateService(srv.id, { isPublished: nextState });
      toast.success(`Service ${nextState ? 'published' : 'unpublished'}`);
      loadServices();
    } catch (err: any) {
      toast.error('Failed to change publish status');
    }
  };

  const filteredServices = services.filter((s) => {
    if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search catering or cook services..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Filters & Add Button */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${categoryFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              All ({services.length})
            </button>
            <button
              onClick={() => setCategoryFilter('catering')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${categoryFilter === 'catering' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Catering ({services.filter((s) => s.category === 'catering').length})
            </button>
            <button
              onClick={() => setCategoryFilter('cook')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${categoryFilter === 'cook' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Cook Service ({services.filter((s) => s.category === 'cook').length})
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>

      </div>

      {/* Services Grid & Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={srv.image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80'}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    srv.category === 'cook' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {srv.category === 'cook' ? 'Master Cook' : 'Banquet Catering'}
                  </span>
                  <button
                    onClick={() => handleTogglePublish(srv)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                      srv.isPublished !== false ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                    }`}
                  >
                    {srv.isPublished !== false ? 'Published' : 'Draft'}
                  </button>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow font-mono font-black text-xs text-slate-900">
                  ₹{srv.startingPrice?.toLocaleString('en-IN')}{srv.category === 'cook' ? '/day' : '/plate'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {srv.description || 'No description provided.'}
                  </p>

                  {/* Feature list tags */}
                  {Array.isArray(srv.features) && srv.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {srv.features.slice(0, 3).map((feat: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 font-medium"
                        >
                          • {feat}
                        </span>
                      ))}
                      {srv.features.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-400 font-bold">
                          +{srv.features.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">ID: {srv.id}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(srv.id)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200/90">
            No services found matching your criteria.
          </div>
        )}
      </div>

      {/* ====================================================
          MODAL: ADD / EDIT SERVICE
          ==================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-900">
                {isEditing ? 'Edit Catering Service' : 'Add New Service'}
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
                <label className="block text-slate-700 font-bold mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Royal Wedding Banquet Catering"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  >
                    <option value="catering">Banquet Catering</option>
                    <option value="cook">Master Cook Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Starting Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
                {formData.image && (
                  <div className="mt-2 h-24 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of the culinary experience and team inclusions..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Key Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="Live Counter Stalls&#10;Uniformed Banquet Staff&#10;Full Cutlery & Crockery Setup"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="srvPublish"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-[#D4AF37] rounded"
                />
                <label htmlFor="srvPublish" className="text-slate-700 font-bold">
                  Publish to Public Website
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
                  {saving ? 'Saving...' : isEditing ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          CONFIRMATION DIALOG: DELETE SERVICE
          ==================================================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 text-center border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-slate-900">Delete this Service?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this service from AD Catering database? This action cannot be undone.
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

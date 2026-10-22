import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';
import {
  UtensilsCrossed,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Leaf,
  Drumstick,
  Sparkles,
  Flame,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Upload,
  Crown,
  Tag,
  Check,
} from 'lucide-react';

export const AdminMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dietFilter, setDietFilter] = useState<'ALL' | 'VEG' | 'NON-VEG'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [menuTypeFilter, setMenuTypeFilter] = useState('ALL');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const initialForm = {
    id: '',
    name: '',
    category: 'Mutton',
    menuType: 'all',
    description: '',
    price: 320,
    image: '',
    isVeg: false,
    isPopular: false,
    isFeatured: false,
    isAvailable: true,
    isOdiaSpecialty: false,
    tagsString: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const loadMenu = async () => {
    try {
      setLoading(true);
      const res = await api.getMenu();
      if (res?.menuItems) {
        setMenuItems(res.menuItems);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setIsEditing(true);
    setFormData({
      id: item.id,
      name: item.name,
      category: item.category || 'Traditional Odia Food',
      menuType: item.menuType || 'all',
      description: item.description || '',
      price: item.price || 0,
      image: item.image || '',
      isVeg: Boolean(item.isVeg),
      isPopular: Boolean(item.isPopular),
      isFeatured: Boolean(item.isFeatured),
      isAvailable: item.isAvailable !== false,
      isOdiaSpecialty: Boolean(item.isOdiaSpecialty),
      tagsString: Array.isArray(item.tags) ? item.tags.join(', ') : '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      toast.error('Dish name and category are required.');
      return;
    }

    try {
      setSaving(true);
      const tags = formData.tagsString
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        menuType: formData.menuType,
        description: formData.description.trim(),
        price: Number(formData.price || 0),
        image: formData.image || '/images/gourmet-ceramic-curry.jpg',
        isVeg: formData.isVeg,
        isPopular: formData.isPopular,
        isFeatured: formData.isFeatured,
        isAvailable: formData.isAvailable,
        isOdiaSpecialty: formData.isOdiaSpecialty,
        tags,
      };

      if (isEditing) {
        await api.updateMenuItem(formData.id, payload);
        toast.success(`"${formData.name}" updated successfully`);
      } else {
        await api.createMenuItem(payload);
        toast.success(`"${formData.name}" added to menu`);
      }

      setModalOpen(false);
      loadMenu();
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteMenuItem(id);
      toast.success('Delicacy removed from menu');
      setDeleteConfirmId(null);
      loadMenu();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete dish');
    }
  };

  const handleToggleAvailability = async (item: any) => {
    try {
      const next = item.isAvailable !== false ? false : true;
      await api.updateMenuItem(item.id, { isAvailable: next });
      toast.success(`${item.name} is now ${next ? 'Available' : 'Unavailable'}`);
      loadMenu();
    } catch (err: any) {
      toast.error('Failed to update availability');
    }
  };

  // Distinct categories
  const categoriesList = ['ALL', ...Array.from(new Set(menuItems.map((i) => i.category))).filter(Boolean)];

  const filteredItems = menuItems.filter((item) => {
    if (dietFilter === 'VEG' && !item.isVeg) return false;
    if (dietFilter === 'NON-VEG' && item.isVeg) return false;
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (menuTypeFilter !== 'ALL' && item.menuType !== menuTypeFilter && item.menuType !== 'all') return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Filter & Add Toolbar */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/90 shadow-xs space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 145+ dishes by name, ingredient, Odia recipe..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Quick Dietary and Add Delicacy */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setDietFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${dietFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                All ({menuItems.length})
              </button>
              <button
                onClick={() => setDietFilter('VEG')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${dietFilter === 'VEG' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700'}`}
              >
                <Leaf className="w-3 h-3" />
                <span>Pure Veg</span>
              </button>
              <button
                onClick={() => setDietFilter('NON-VEG')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${dietFilter === 'NON-VEG' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700'}`}
              >
                <Drumstick className="w-3 h-3" />
                <span>Non-Veg</span>
              </button>
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Delicacy</span>
            </button>
          </div>
        </div>

        {/* Second Row: Category Dropdown & Menu Tier filter */}
        <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-bold">Banquet Tier:</span>
            <select
              value={menuTypeFilter}
              onChange={(e) => setMenuTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none"
            >
              <option value="ALL">All Tiers</option>
              <option value="normal">Normal Package</option>
              <option value="deluxe">Deluxe Package</option>
              <option value="premium">Premium Package</option>
            </select>
          </div>

          <span className="ml-auto text-xs text-slate-400 font-mono">
            Showing {filteredItems.length} of {menuItems.length} delicacies
          </span>
        </div>

      </div>

      {/* Menu Items Table */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 font-bold">Dish Info</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Diet</th>
                <th className="py-3 px-4 font-bold">A La Carte</th>
                <th className="py-3 px-4 font-bold">Badges</th>
                <th className="py-3 px-4 font-bold">Availability</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Dish Preview & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={item.image || '/images/gourmet-ceramic-curry.jpg'}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-sm truncate">{item.name}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs">
                            {item.description || 'Authentic festive banquet item'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {item.category}
                      </span>
                    </td>

                    {/* Dietary */}
                    <td className="py-3 px-4">
                      {item.isVeg ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-200">
                          <Leaf className="w-3 h-3 text-emerald-600" />
                          <span>Pure Veg</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-full text-[11px] border border-rose-200">
                          <Drumstick className="w-3 h-3 text-rose-600" />
                          <span>Non-Veg</span>
                        </span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {item.price ? `₹${item.price}` : '—'}
                    </td>

                    {/* Badges */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 flex-wrap">
                        {item.isOdiaSpecialty && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black border border-amber-300">
                            Odia Specialty
                          </span>
                        )}
                        {item.isPopular && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 text-[10px] font-bold">
                            Popular
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Availability */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          item.isAvailable !== false
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {item.isAvailable !== false ? '● Available' : '○ Unavailable'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Delicacy"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No dishes found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================
          MODAL: ADD / EDIT DELICACY
          ==================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-900">
                {isEditing ? 'Edit Delicacy Details' : 'Add New Delicacy to Menu'}
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
                <label className="block text-slate-700 font-bold mb-1">Delicacy Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mutton Kasa with Earthen Spices"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Mutton, Starters, Desserts..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">A La Carte Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Photo Image URL</label>
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
                  placeholder="Authentic ingredients, preparation style, and flavor notes..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="font-bold text-slate-800">100% Pure Veg</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isOdiaSpecialty}
                    onChange={(e) => setFormData({ ...formData, isOdiaSpecialty: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span className="font-bold text-slate-800">Odia Heritage Dish</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <span className="font-bold text-slate-800">Popular Choice</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-bold text-slate-800">Currently Available</span>
                </label>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tagsString}
                  onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                  placeholder="Spicy, Bhoji, Chef Special, Claypot"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                />
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
                  {saving ? 'Saving...' : isEditing ? 'Update Dish' : 'Add to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: Delete */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 text-center border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-slate-900">Delete this Delicacy?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this dish from the menu? It will no longer appear on the public website.
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

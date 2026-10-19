import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Search,
  Filter,
  X,
  User,
  Calendar,
} from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const initialForm = {
    id: '',
    customerName: '',
    rating: 5,
    eventType: 'Wedding Reception',
    comment: '',
    photo: '',
    date: new Date().toISOString().split('T')[0],
    isApproved: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await api.getReviews();
      if (res?.reviews) {
        setReviews(res.reviews);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (rev: any) => {
    setIsEditing(true);
    setFormData({
      id: rev.id,
      customerName: rev.customerName || '',
      rating: rev.rating || 5,
      eventType: rev.eventType || 'Wedding Catering',
      comment: rev.comment || '',
      photo: rev.photo || '',
      date: rev.date || new Date().toISOString().split('T')[0],
      isApproved: rev.isApproved !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.comment) {
      toast.error('Customer name and review comment are required.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        customerName: formData.customerName.trim(),
        rating: Number(formData.rating),
        eventType: formData.eventType.trim(),
        comment: formData.comment.trim(),
        photo: formData.photo || `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(formData.customerName)}`,
        date: formData.date,
        isApproved: formData.isApproved,
      };

      if (isEditing) {
        await api.updateReview(formData.id, payload);
        toast.success('Testimonial updated');
      } else {
        await api.createReview(payload);
        toast.success('Testimonial added to database');
      }

      setModalOpen(false);
      loadReviews();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteReview(id);
      toast.success('Testimonial deleted');
      setDeleteConfirmId(null);
      loadReviews();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete review');
    }
  };

  const handleToggleApproval = async (rev: any) => {
    try {
      const next = rev.isApproved !== false ? false : true;
      await api.updateReview(rev.id, { isApproved: next });
      toast.success(`Review ${next ? 'approved & published' : 'hidden'}`);
      loadReviews();
    } catch (err: any) {
      toast.error('Failed to change status');
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.customerName.toLowerCase().includes(q) ||
        (r.comment && r.comment.toLowerCase().includes(q)) ||
        (r.eventType && r.eventType.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews by customer name, event, feedback..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>

      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.photo || `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(rev.customerName)}`}
                      alt={rev.customerName}
                      className="w-10 h-10 rounded-full bg-slate-100 object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900">
                        {rev.customerName}
                      </h4>
                      <p className="text-[11px] text-slate-400">{rev.eventType}</p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (rev.rating || 5) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Card Footer: Date, Status, Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleApproval(rev)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                      rev.isApproved !== false
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {rev.isApproved !== false ? 'Published' : 'Hidden'}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(rev)}
                    className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Edit review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(rev.id)}
                    className="p-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200/90">
            No testimonials found.
          </div>
        )}
      </div>

      {/* ====================================================
          MODAL: ADD / EDIT TESTIMONIAL
          ==================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-900">
                {isEditing ? 'Edit Customer Review' : 'Add Testimonial'}
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
                <label className="block text-slate-700 font-bold mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Soumya Ranjan Mohapatra"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Event Type</label>
                  <input
                    type="text"
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    placeholder="Wedding, Bhoji, Puja..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  >
                  </input>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Star Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Review Comment *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Customer experience regarding food quality, aroma, staff service, and timeliness..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Customer Photo URL</label>
                  <input
                    type="url"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="Optional avatar URL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Review Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="revApproved"
                  checked={formData.isApproved}
                  onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                  className="w-4 h-4 text-[#D4AF37] rounded"
                />
                <label htmlFor="revApproved" className="text-slate-700 font-bold">
                  Approve and Publish to Website Homepage
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
                  {saving ? 'Saving...' : isEditing ? 'Update Review' : 'Save Testimonial'}
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
              <h4 className="font-display font-bold text-base text-slate-900">Delete Testimonial?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this testimonial?
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

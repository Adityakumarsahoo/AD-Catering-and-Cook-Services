import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';
import {
  CalendarCheck,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Users,
  UtensilsCrossed,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Edit2,
  ExternalLink,
  X,
  FileText,
  DollarSign,
  Send,
} from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail Modal State
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [savingDetail, setSavingDetail] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form inside detail modal
  const [detailStatus, setDetailStatus] = useState('Pending');
  const [detailNotes, setDetailNotes] = useState('');
  const [detailFollowUp, setDetailFollowUp] = useState('');
  const [detailEstimatedAmount, setDetailEstimatedAmount] = useState<number>(0);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bkRes, msgRes] = await Promise.all([
        api.getAdminBookings(),
        api.getAdminMessages(),
      ]);
      if (bkRes?.bookings) setBookings(bkRes.bookings);
      if (msgRes?.messages) setMessages(msgRes.messages);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Check URL params if an ID was passed, open it directly
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const passedId = params.get('id');
    if (passedId && bookings.length > 0) {
      const match = bookings.find((b) => b.id === passedId || b.bookingId === passedId);
      if (match) {
        openBookingDetail(match);
      }
    }
  }, [location.search, bookings]);

  const openBookingDetail = (b: any) => {
    setSelectedBooking(b);
    setDetailStatus(b.status || 'Pending');
    setDetailNotes(b.internalNotes || b.additionalNotes || '');
    setDetailFollowUp(b.followUpDate || '');
    setDetailEstimatedAmount(b.estimatedAmount || 0);
  };

  const handleSaveBookingDetail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    try {
      setSavingDetail(true);
      await api.updateAdminBooking(selectedBooking.id, {
        status: detailStatus,
        internalNotes: detailNotes,
        followUpDate: detailFollowUp,
        estimatedAmount: Number(detailEstimatedAmount),
      });
      toast.success(`Booking ${selectedBooking.bookingId} updated successfully`);
      setSelectedBooking(null);
      loadData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update booking');
    } finally {
      setSavingDetail(false);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      await api.deleteAdminBooking(id);
      toast.success('Booking removed');
      setDeleteConfirmId(null);
      if (selectedBooking?.id === id) setSelectedBooking(null);
      loadData();
    } catch (err: any) {
      toast.error('Failed to delete booking');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await api.deleteAdminMessage(id);
      toast.success('Inquiry message removed');
      setSelectedMessage(null);
      loadData();
    } catch (err: any) {
      toast.error('Failed to delete message');
    }
  };

  const handleMarkMessageRead = async (id: string) => {
    try {
      await api.markAdminMessageRead(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.bookingId.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.eventType.toLowerCase().includes(q) ||
        (b.venue && b.venue.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const filteredMessages = messages.filter((m) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.message.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Filter and Switcher Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Switcher Tab: Bookings vs General Inquiries */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'bookings' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-[#AA7C11]" />
            <span>Event Bookings ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'messages' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>General Inquiries ({messages.length})</span>
          </button>
        </div>

        {/* Search & Status Filter */}
        <div className="flex items-center gap-3 flex-wrap flex-1 max-w-lg justify-end">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, phone, ID, venue..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {activeTab === 'bookings' && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>

      </div>

      {/* ====================================================
          TAB 1: EVENT BOOKINGS TABLE
          ==================================================== */}
      {activeTab === 'bookings' && (
        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 font-bold">Booking ID</th>
                  <th className="py-3 px-4 font-bold">Customer Info</th>
                  <th className="py-3 px-4 font-bold">Event & Date</th>
                  <th className="py-3 px-4 font-bold">Venue</th>
                  <th className="py-3 px-4 font-bold">Guests & Package</th>
                  <th className="py-3 px-4 font-bold">Est. Amount</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#AA7C11]">
                        {b.bookingId}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{b.customerName}</p>
                        <div className="flex items-center gap-2 pt-0.5">
                          <a
                            href={`tel:${b.phone}`}
                            className="text-[11px] text-emerald-700 font-mono font-semibold flex items-center gap-1 hover:underline"
                            title="Call customer directly"
                          >
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>{b.phone}</span>
                          </a>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{b.eventType}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{b.eventDate} ({b.eventTime || 'Evening'})</span>
                        </p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-slate-600 line-clamp-1 max-w-[180px]">{b.venue || 'Bhubaneswar'}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-mono text-slate-900 font-bold">{b.guestCount} Guests</p>
                        <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{b.package}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-black text-slate-900">
                        ₹{(b.estimatedAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : b.status === 'Completed'
                              ? 'bg-purple-100 text-purple-800'
                              : b.status === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openBookingDetail(b)}
                            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-[#D4AF37] hover:text-[#031D13] font-bold text-slate-800 transition-colors flex items-center gap-1 text-[11px]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(b.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                            title="Delete booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No bookings found for the selected criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================================================
          TAB 2: GENERAL CONTACT MESSAGES
          ==================================================== */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  handleMarkMessageRead(msg.id);
                  setSelectedMessage(msg);
                }}
                className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 ${
                  !msg.read ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200/90'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                    {!msg.read ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900">
                        New
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Read</span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#AA7C11] truncate">{msg.subject || 'Website Inquiry'}</p>
                  <p className="text-xs text-slate-600 line-clamp-3">"{msg.message}"</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  <a
                    href={`tel:${msg.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{msg.phone}</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200/90">
              No general inquiry messages recorded.
            </div>
          )}
        </div>
      )}

      {/* ====================================================
          MODAL: BOOKING DETAIL & WORKFLOW UPDATER
          ==================================================== */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-[#AA7C11]">
                    {selectedBooking.bookingId}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    detailStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {detailStatus}
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-slate-900 mt-1">
                  {selectedBooking.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Phone</span>
                <a
                  href={`tel:${selectedBooking.phone}`}
                  className="font-mono font-bold text-emerald-700 hover:underline block truncate mt-0.5"
                >
                  {selectedBooking.phone}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">WhatsApp</span>
                <a
                  href={`https://wa.me/${selectedBooking.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-600 hover:underline block truncate mt-0.5 flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Event Date</span>
                <p className="font-semibold text-slate-800 mt-0.5">{selectedBooking.eventDate}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Guest Count</span>
                <p className="font-mono font-bold text-slate-900 mt-0.5">{selectedBooking.guestCount} pax</p>
              </div>
            </div>

            {/* Venue & Requirements */}
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Venue Address</span>
                <p className="font-semibold text-slate-900">{selectedBooking.venue || 'Bhubaneswar'}</p>
              </div>

              {selectedBooking.specialRequirements && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-900">Special Culinary Requests</span>
                  <p className="text-amber-950 font-medium">{selectedBooking.specialRequirements}</p>
                </div>
              )}
            </div>

            {/* Workflow Management Form */}
            <form onSubmit={handleSaveBookingDetail} className="space-y-4 pt-2 border-t border-slate-100 text-xs font-medium">
              <h4 className="font-display font-bold text-sm text-slate-900">Administrative Workflow</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Update Status *</label>
                  <select
                    value={detailStatus}
                    onChange={(e) => setDetailStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold focus:outline-none"
                  >
                    <option value="Pending">Pending Review</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed Event</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Estimated Quotation (₹)</label>
                  <input
                    type="number"
                    value={detailEstimatedAmount}
                    onChange={(e) => setDetailEstimatedAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Follow-Up Date</label>
                <input
                  type="date"
                  value={detailFollowUp}
                  onChange={(e) => setDetailFollowUp(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Internal Admin Notes (Private)</label>
                <textarea
                  rows={3}
                  value={detailNotes}
                  onChange={(e) => setDetailNotes(e.target.value)}
                  placeholder="e.g. Spoke with customer on phone. Agreed on mutton kasa counter + live chhena poda. Advance ₹20,000 received."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(selectedBooking.id)}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBooking(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={savingDetail}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5CE68] text-[#031D13] font-bold shadow hover:shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {savingDetail ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
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
              <h4 className="font-display font-bold text-base text-slate-900">Delete Enquiry?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to permanently delete this reservation record from the database?
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
                onClick={() => handleDeleteBooking(deleteConfirmId)}
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

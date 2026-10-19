import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { useMenuCart } from '../context/MenuCartContext.js';
import { api } from '../services/api.js';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShoppingBag,
  Bell,
  User,
  Settings,
  Eye,
  Plus,
  Trash2,
  X,
  Crown,
  Sparkles,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { selectedDishes, removeDish, clearSelection } = useMenuCart();

  const [activeTab, setActiveTab] = useState<'bookings' | 'dishes' | 'notifications' | 'profile'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile edit state
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [newPassword, setNewPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const [bkRes, notifRes] = await Promise.all([
          api.getMyBookings(),
          api.getNotifications(),
        ]);
        if (bkRes.bookings) setBookings(bkRes.bookings);
        if (notifRes.notifications) setNotifications(notifRes.notifications);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  const totalBookings = bookings.length;
  const upcomingEvents = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Progress').length;
  const completedEvents = bookings.filter((b) => b.status === 'Completed').length;
  const pendingRequests = bookings.filter((b) => b.status === 'Pending').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Confirmed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>In Progress</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Completed</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300 shadow-sm">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-900 border border-yellow-300 shadow-sm">
            <AlertCircle className="w-3.5 h-3.5 text-yellow-600" />
            <span>Pending Review</span>
          </span>
        );
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const payload: any = { name: profileName, phone: profilePhone };
      if (newPassword.trim()) payload.password = newPassword.trim();
      const res = await api.updateProfile(payload);
      toast.success(res.message || 'Profile updated successfully!');
      await refreshUser();
      setNewPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleMarkNotifsRead = async () => {
    try {
      await api.markNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success('All notifications marked as read.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-32 pb-24 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[#FAF8F5]">
        
        {/* Welcome Royal Emerald & Gold Glass Banner */}
        <div className="rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/50 p-6 sm:p-10 mb-8 shadow-[0_24px_70px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-[#D4AF37]/50 text-[10px] font-black uppercase tracking-widest text-[#F5CE68]">
              <Crown className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Customer Portal</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              Welcome back, {user?.name || 'Valued Host'}!
            </h1>
            <p className="text-xs text-[#CBD5E1] max-w-xl font-normal leading-relaxed">
              Track your reservations, review chef notes, manage custom menus, and update your personal details.
            </p>
          </div>
          <Link
            to="/booking"
            className="px-6 py-3.5 rounded-2xl gold-gradient-btn text-xs font-black whitespace-nowrap text-center shadow-md self-start md:self-auto flex items-center gap-2 text-[#041810]"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Event</span>
          </Link>
        </div>

        {/* 4 Overview Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-3xl bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 shadow-sm">
            <span className="text-xs text-[#CBD5E1] font-medium">Total Bookings</span>
            <p className="font-display text-3xl font-extrabold text-white mt-1 tabular-nums">
              {totalBookings}
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 shadow-sm">
            <span className="text-xs text-amber-400 font-medium">Pending Requests</span>
            <p className="font-display text-3xl font-extrabold text-amber-300 mt-1 tabular-nums">
              {pendingRequests}
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 shadow-sm">
            <span className="text-xs text-emerald-400 font-medium">Upcoming Events</span>
            <p className="font-display text-3xl font-extrabold text-emerald-300 mt-1 tabular-nums">
              {upcomingEvents}
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-[#041810]/80 backdrop-blur-xl border border-[#D4AF37]/40 shadow-sm">
            <span className="text-xs text-teal-400 font-medium">Completed Events</span>
            <p className="font-display text-3xl font-extrabold text-teal-300 mt-1 tabular-nums">
              {completedEvents}
            </p>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#D4AF37]/25 no-scrollbar">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'gold-gradient-btn text-[#041810] shadow-md font-black'
                : 'bg-emerald-950/80 text-[#CBD5E1] hover:text-white border border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>My Bookings ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('dishes')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'dishes'
                ? 'gold-gradient-btn text-[#041810] shadow-md font-black'
                : 'bg-emerald-950/80 text-[#CBD5E1] hover:text-white border border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Saved Custom Menu ({selectedDishes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'gold-gradient-btn text-[#041810] shadow-md font-black'
                : 'bg-emerald-950/80 text-[#CBD5E1] hover:text-white border border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications ({notifications.filter((n) => !n.read).length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'gold-gradient-btn text-[#041810] shadow-md font-black'
                : 'bg-emerald-950/80 text-[#CBD5E1] hover:text-white border border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab 1: Bookings List */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-20 bg-[#041810]/80 rounded-3xl border border-[#D4AF37]/40 space-y-4 shadow-sm">
                <Calendar className="w-12 h-12 text-[#F5CE68] mx-auto opacity-70" />
                <h3 className="font-display font-bold text-xl text-white">No Event Bookings Found</h3>
                <p className="text-xs text-[#CBD5E1] max-w-sm mx-auto font-normal">
                  You haven't placed any catering or cook service requests yet.
                </p>
                <Link
                  to="/booking"
                  className="inline-block px-6 py-3 rounded-2xl gold-gradient-btn text-xs font-bold shadow-md text-[#041810]"
                >
                  Book Your First Event
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-6 rounded-3xl bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs font-black text-[#F5CE68] bg-emerald-950 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
                          {booking.bookingId}
                        </span>
                        {getStatusBadge(booking.status)}
                        <span className="text-xs text-emerald-600">·</span>
                        <span className="text-xs text-[#CBD5E1] font-medium">{booking.package}</span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-white">
                        {booking.eventType}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#CBD5E1]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>{booking.eventDate} at {booking.eventTime}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span>{booking.guestCount} Guests</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#F5CE68]" />
                          <span className="max-w-[200px] truncate">{booking.venue}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#D4AF37]/20">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">Estimated Total</span>
                        <p className="font-display text-xl font-black text-[#F5CE68] tabular-nums">
                          ₹{booking.estimatedAmount?.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="px-5 py-2 rounded-xl bg-emerald-950/90 border border-[#D4AF37]/50 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#F5CE68]" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Custom Dishes */}
        {activeTab === 'dishes' && (
          <div className="space-y-6">
            <div className="p-8 rounded-[36px] bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/45 shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-2xl text-white">
                  Your Custom Dish Selection ({selectedDishes.length})
                </h3>
                {selectedDishes.length > 0 && (
                  <button
                    onClick={clearSelection}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {selectedDishes.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-xs text-[#CBD5E1] font-normal">You have no custom dishes selected right now.</p>
                  <Link
                    to="/menu"
                    className="inline-block px-6 py-3 rounded-2xl gold-gradient-btn text-xs font-bold shadow-md text-[#041810]"
                  >
                    Browse & Add Dishes from Menu
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {selectedDishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="p-4 rounded-2xl bg-emerald-950/70 border border-[#D4AF37]/35 flex items-center justify-between shadow-sm"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{dish.name}</p>
                          <span className="text-[10px] text-[#F5CE68] bg-[#041810] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full inline-block mt-1 font-semibold">
                            {dish.category}
                          </span>
                        </div>
                        <button
                          onClick={() => removeDish(dish.id)}
                          className="p-2 text-[#94A3B8] hover:text-rose-400 transition-colors"
                          title="Remove dish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/booking"
                    className="inline-block px-8 py-3.5 rounded-2xl gold-gradient-btn text-xs font-bold shadow-md hover:scale-105 transition-transform text-[#041810]"
                  >
                    Take These Dishes to Booking Form
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={handleMarkNotifsRead}
                className="text-xs text-[#F5CE68] hover:underline font-bold"
              >
                Mark all as read
              </button>
            </div>
            {notifications.length === 0 ? (
              <div className="text-center py-16 bg-[#041810]/80 rounded-3xl border border-[#D4AF37]/40 text-xs text-[#CBD5E1] font-normal">
                No notifications right now.
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      notif.read
                        ? 'bg-[#041810]/70 border-[#D4AF37]/20 text-[#CBD5E1]'
                        : 'bg-emerald-950/90 border-[#D4AF37]/60 text-white shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-xs text-white">{notif.title}</h4>
                      <span className="text-[10px] text-[#94A3B8] font-mono">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs mt-1 text-[#CBD5E1] font-normal">{notif.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Account Settings */}
        {activeTab === 'profile' && (
          <div className="max-w-xl mx-auto bg-[#041810]/85 backdrop-blur-xl border border-[#D4AF37]/50 rounded-[36px] p-6 sm:p-10 space-y-6 shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
            <h3 className="font-display font-bold text-2xl text-white">Edit Profile & Credentials</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                {savingProfile ? 'Saving Changes...' : 'Save Profile Settings'}
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Booking Details Liquid Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in">
          <div className="max-w-xl w-full rounded-[36px] bg-[#041810] border border-[#D4AF37]/60 p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#FAF8F5]">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-950 border border-[#D4AF37]/40 hover:bg-emerald-900 text-white shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#F5CE68] font-bold bg-emerald-950 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full">
                  {selectedBooking.bookingId}
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-1">
                  {selectedBooking.eventType}
                </h3>
              </div>
              <div>{getStatusBadge(selectedBooking.status)}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-[#D4AF37]/30">
                <span className="text-[#94A3B8] text-[10px] uppercase font-semibold">Date & Time</span>
                <p className="font-bold text-white mt-0.5">
                  {selectedBooking.eventDate} at {selectedBooking.eventTime}
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-[#D4AF37]/30">
                <span className="text-[#94A3B8] text-[10px] uppercase font-semibold">Guest Scale</span>
                <p className="font-bold text-white mt-0.5">
                  {selectedBooking.guestCount} Guests
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-[#D4AF37]/30">
                <span className="text-[#94A3B8] text-[10px] uppercase font-semibold">Package</span>
                <p className="font-bold text-[#F5CE68] mt-0.5">
                  {selectedBooking.package}
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-[#D4AF37]/30">
                <span className="text-[#94A3B8] text-[10px] uppercase font-semibold">Food Preference</span>
                <p className="font-bold text-white mt-0.5">
                  {selectedBooking.foodPreference}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/70 border border-[#D4AF37]/30 text-xs space-y-1">
              <span className="text-[#94A3B8] text-[10px] uppercase font-semibold">Venue:</span>
              <p className="text-white font-medium">{selectedBooking.venue}</p>
            </div>

            {selectedBooking.specialRequirements && (
              <div className="p-4 rounded-2xl bg-emerald-950/70 border border-[#D4AF37]/30 text-xs space-y-1">
                <span className="text-[#94A3B8] text-[10px] uppercase font-semibold">Special Requirements & Dishes:</span>
                <p className="text-[#CBD5E1] whitespace-pre-wrap font-normal">{selectedBooking.specialRequirements}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[#D4AF37]/30">
              <span className="text-xs text-[#CBD5E1]">Estimated Total Quote:</span>
              <span className="text-2xl font-display font-black text-[#F5CE68] tabular-nums">
                ₹{selectedBooking.estimatedAmount?.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="w-full py-3.5 rounded-2xl gold-gradient-btn text-[#041810] text-xs font-black shadow-sm"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

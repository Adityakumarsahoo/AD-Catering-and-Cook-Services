import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  CalendarCheck,
  UtensilsCrossed,
  Layers,
  Image as GalleryIcon,
  Users,
  MessageSquare,
  Star,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  X,
  TrendingUp,
  DollarSign,
  ChefHat,
  Package as PackageIcon,
  Crown,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'bookings' | 'menus' | 'services' | 'packages' | 'gallery' | 'reviews' | 'messages' | 'customers'
  >('dashboard');

  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [addMenuModalOpen, setAddMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<any | null>(null);
  const [newMenu, setNewMenu] = useState({
    name: '',
    description: '',
    price: 250,
    category: 'STARTER - VEG',
    menuType: 'all',
    isVeg: true,
    isPopular: false,
    isFeatured: false,
    isOdiaSpecialty: false,
    image: '',
  });

  const [addGalleryModalOpen, setAddGalleryModalOpen] = useState(false);
  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'Weddings',
    image: '',
    description: '',
  });

  const loadAllAdminData = async () => {
    try {
      setLoading(true);
      const [dashRes, bkRes, menuRes, srvRes, pkgRes, galRes, revRes, msgRes, usrRes] =
        await Promise.all([
          api.getAdminDashboard(),
          api.getAdminBookings(),
          api.getMenu(),
          api.getServices(),
          api.getPackages(),
          api.getGallery(),
          api.getReviews(),
          api.getAdminMessages(),
          api.getAdminUsers(),
        ]);

      if (dashRes) setDashboardData(dashRes);
      if (bkRes?.bookings) setBookings(bkRes.bookings);
      if (menuRes?.menuItems) setMenuItems(menuRes.menuItems);
      if (srvRes?.services) setServices(srvRes.services);
      if (pkgRes?.packages) setPackages(pkgRes.packages);
      if (galRes?.gallery) setGallery(galRes.gallery);
      if (revRes?.reviews) setReviews(revRes.reviews);
      if (msgRes?.messages) setMessages(msgRes.messages);
      if (usrRes?.users) setCustomers(usrRes.users);
    } catch (err: any) {
      toast.error('Failed to load admin dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  // Update Booking Status
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await api.updateAdminBooking(bookingId, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      toast.success(`Booking status changed to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || 'Status update failed');
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await api.deleteAdminBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      toast.success('Booking deleted.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete booking');
    }
  };

  // Create or Update Menu Item
  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMenuItem) {
        const res = await api.updateMenuItem(editingMenuItem.id, newMenu);
        setMenuItems((prev) =>
          prev.map((m) => (m.id === editingMenuItem.id ? res.menuItem : m))
        );
        toast.success('Dish updated successfully!');
      } else {
        const res = await api.createMenuItem(newMenu);
        setMenuItems((prev) => [...prev, res.menuItem]);
        toast.success('New dish added to menu!');
      }
      setAddMenuModalOpen(false);
      setEditingMenuItem(null);
      setNewMenu({
        name: '',
        description: '',
        price: 250,
        category: 'STARTER - VEG',
        menuType: 'all',
        isVeg: true,
        isPopular: false,
        isFeatured: false,
        isOdiaSpecialty: false,
        image: '',
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to save menu item');
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id: string) => {
    if (!window.confirm('Delete this dish?')) return;
    try {
      await api.deleteMenuItem(id);
      setMenuItems((prev) => prev.filter((m) => m.id !== id));
      toast.success('Dish removed from menu.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete dish');
    }
  };

  // Add Gallery item
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.createGalleryItem(newGallery);
      setGallery((prev) => [res.galleryItem, ...prev]);
      setAddGalleryModalOpen(false);
      setNewGallery({ title: '', category: 'Weddings', image: '', description: '' });
      toast.success('Photo added to gallery!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add gallery photo');
    }
  };

  // Delete Gallery item
  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await api.deleteGalleryItem(id);
      setGallery((prev) => prev.filter((g) => g.id !== id));
      toast.success('Photo deleted.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete photo');
    }
  };

  // Mark Message Read
  const handleMarkMessageRead = async (id: string) => {
    try {
      await api.markAdminMessageRead(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
      toast.success('Inquiry marked as read');
    } catch (err: any) {
      toast.error('Failed to mark read');
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await api.deleteAdminMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Inquiry deleted.');
    } catch (err: any) {
      toast.error('Failed to delete message');
    }
  };

  // Delete Review
  const handleDeleteReview = async (id: string) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success('Review deleted.');
    } catch (err: any) {
      toast.error('Failed to delete review');
    }
  };

  const metrics = dashboardData?.metrics || {
    totalCustomers: customers.length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === 'Pending').length,
    confirmedBookings: bookings.filter((b) => b.status === 'Confirmed').length,
    completedEvents: bookings.filter((b) => b.status === 'Completed').length,
    totalRevenue: bookings
      .filter((b) => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((sum, b) => sum + (b.estimatedAmount || 0), 0),
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status.toLowerCase() !== statusFilter.toLowerCase())
      return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        b.customerName?.toLowerCase().includes(q) ||
        b.bookingId?.toLowerCase().includes(q) ||
        b.phone?.includes(q) ||
        b.eventType?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="pt-28 pb-24 relative z-10 min-h-screen text-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Management Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#D4AF37]/30 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#06291C] border border-[#D4AF37]/60 text-[10px] font-black text-[#F5CE68] uppercase tracking-wider shadow">
                Admin Control Room
              </span>
              <span className="text-xs text-[#D4AF37]/50">·</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Operations
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1.5">
              AD Catering & Cook Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#CBD5E1]">
              Admin: <strong className="text-[#F5CE68] font-bold">{user?.name}</strong>
            </span>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-900 transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-[#041810]/90 backdrop-blur-xl border border-[#D4AF37]/40 rounded-3xl p-3.5 space-y-1.5 shadow-[0_16px_45px_rgba(0,0,0,0.6)]">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'dashboard'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'bookings'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Bookings Management</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#06291C] text-[#F5CE68] text-[10px] font-black tabular-nums border border-[#D4AF37]/40">
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('menus')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'menus'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4 shrink-0" />
                <span>Menu Items ({menuItems.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'services'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <ChefHat className="w-4 h-4 shrink-0" />
              <span>Services ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('packages')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'packages'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <PackageIcon className="w-4 h-4 shrink-0" />
              <span>Packages ({packages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'gallery'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <GalleryIcon className="w-4 h-4 shrink-0" />
              <span>Gallery ({gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'messages'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Contact Inquiries</span>
              </div>
              {messages.filter((m) => !m.read).length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-600 text-[10px] font-black text-white shadow">
                  {messages.filter((m) => !m.read).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'customers'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Customers ({customers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all ${
                activeTab === 'reviews'
                  ? 'gold-gradient-btn text-[#041810] shadow-md'
                  : 'text-[#CBD5E1] hover:text-[#F5CE68] hover:bg-emerald-950/60'
              }`}
            >
              <Star className="w-4 h-4 shrink-0" />
              <span>Reviews ({reviews.length})</span>
            </button>
          </aside>

          {/* Main Display Pane */}
          <main className="lg:col-span-9 space-y-6">
            {/* 1. DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 6 Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="p-4 rounded-2xl bg-[#041810]/85 border border-[#D4AF37]/35 text-center shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-[#CBD5E1]">Customers</span>
                    <p className="font-display text-2xl font-black text-white mt-1 tabular-nums">
                      {metrics.totalCustomers}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#041810]/85 border border-[#D4AF37]/35 text-center shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-[#CBD5E1]">Bookings</span>
                    <p className="font-display text-2xl font-black text-white mt-1 tabular-nums">
                      {metrics.totalBookings}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#041810]/85 border border-amber-500/50 text-center shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-amber-300">Pending</span>
                    <p className="font-display text-2xl font-black text-amber-400 mt-1 tabular-nums">
                      {metrics.pendingBookings}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#041810]/85 border border-emerald-500/50 text-center shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-emerald-300">Confirmed</span>
                    <p className="font-display text-2xl font-black text-emerald-400 mt-1 tabular-nums">
                      {metrics.confirmedBookings}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#041810]/85 border border-cyan-500/50 text-center shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-cyan-300">Completed</span>
                    <p className="font-display text-2xl font-black text-cyan-400 mt-1 tabular-nums">
                      {metrics.completedEvents}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#041810]/85 border border-[#D4AF37]/60 text-center shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-[#F5CE68]">Revenue</span>
                    <p className="font-display text-lg font-black text-[#F5CE68] mt-1 tabular-nums truncate">
                      ₹{metrics.totalRevenue?.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Visual Chart Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Monthly Bookings & Revenue Visual representation */}
                  <div className="p-6 rounded-3xl bg-[#041810]/85 border border-[#D4AF37]/35 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-base text-white">
                        Monthly Bookings Flow (2026)
                      </h3>
                      <span className="text-xs text-[#F5CE68] font-bold">Annual Volume</span>
                    </div>

                    <div className="h-44 flex items-end gap-2 pt-6">
                      {(dashboardData?.monthlyData || [
                        { month: 'Jan', bookings: 2 },
                        { month: 'Feb', bookings: 3 },
                        { month: 'Mar', bookings: 1 },
                        { month: 'Apr', bookings: 4 },
                        { month: 'May', bookings: 6 },
                        { month: 'Jun', bookings: 5 },
                        { month: 'Jul', bookings: 7 },
                        { month: 'Aug', bookings: 8 },
                        { month: 'Sep', bookings: 9 },
                        { month: 'Oct', bookings: 11 },
                        { month: 'Nov', bookings: 14 },
                        { month: 'Dec', bookings: 16 },
                      ]).map((item: any, idx: number) => {
                        const maxVal = 20;
                        const heightPct = Math.min(100, Math.max(12, (item.bookings / maxVal) * 100));
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                            <span className="text-[9px] text-[#F5CE68] font-bold tabular-nums">
                              {item.bookings}
                            </span>
                            <div
                              style={{ height: `${heightPct}%` }}
                              className="w-full bg-gradient-to-t from-emerald-950 via-[#D4AF37] to-[#F5CE68] rounded-t-lg hover:brightness-125 transition-all shadow-sm"
                            />
                            <span className="text-[9px] text-[#94A3B8] font-medium">{item.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Popular Event Categories */}
                  <div className="p-6 rounded-3xl bg-[#041810]/85 border border-[#D4AF37]/35 space-y-4 shadow-sm">
                    <h3 className="font-display font-bold text-base text-white">
                      Popular Catering Services
                    </h3>
                    <div className="space-y-3.5 pt-2">
                      {[
                        { name: 'Grand Wedding Reception', share: '45%', count: '32 Events' },
                        { name: 'Traditional Odia Feast', share: '25%', count: '18 Events' },
                        { name: 'Professional Cook Service', share: '15%', count: '12 Bookings' },
                        { name: 'Corporate Gala Banquet', share: '15%', count: '10 Conferences' },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-white">{item.name}</span>
                            <span className="text-[#F5CE68] font-bold">{item.share} ({item.count})</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-[#06291C] overflow-hidden shadow-inner border border-[#D4AF37]/30">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-600 to-[#D4AF37] rounded-full"
                              style={{ width: item.share }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Bookings Quick Table */}
                <div className="p-6 rounded-3xl bg-[#041810]/85 border border-[#D4AF37]/35 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-white">
                      Recent Booking Activity
                    </h3>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-[#F5CE68] font-bold hover:underline"
                    >
                      View All Bookings
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#D4AF37]/30 text-[#F5CE68] font-bold">
                        <tr>
                          <th className="pb-3">Booking ID</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Event & Date</th>
                          <th className="pb-3">Guests</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4AF37]/15 text-[#CBD5E1]">
                        {bookings.slice(0, 5).map((b) => (
                          <tr key={b.id} className="hover:bg-emerald-950/40 transition-colors">
                            <td className="py-3 font-mono font-bold text-[#F5CE68]">{b.bookingId}</td>
                            <td className="py-3 font-medium text-white">{b.customerName}</td>
                            <td className="py-3">
                              <p className="font-semibold text-white">{b.eventType}</p>
                              <p className="text-[11px] text-[#94A3B8]">{b.eventDate}</p>
                            </td>
                            <td className="py-3 tabular-nums font-medium text-white">{b.guestCount}</td>
                            <td className="py-3 font-bold text-[#F5CE68] tabular-nums">
                              ₹{b.estimatedAmount?.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06291C] border border-[#D4AF37]/40 text-[#F5CE68]">
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* 2. BOOKINGS MANAGEMENT */}
            {activeTab === 'bookings' && (
              <div className="p-6 sm:p-8 rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="font-display font-bold text-xl text-white">
                    All Catering Reservations ({filteredBookings.length})
                  </h3>

                  {/* Filter & Search */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#F5CE68] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search ID, customer, phone..."
                        className="rounded-xl pl-8 pr-3 py-1.5 text-xs bg-[#06291C] border border-[#D4AF37]/40 text-white placeholder-emerald-300/50 focus:outline-none focus:border-[#F5CE68]"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="rounded-xl px-3 py-1.5 text-xs bg-[#06291C] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#F5CE68]"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#D4AF37]/30 text-[#F5CE68] font-semibold">
                      <tr>
                        <th className="pb-3">ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Contact</th>
                        <th className="pb-3">Event & Date</th>
                        <th className="pb-3">Guests</th>
                        <th className="pb-3">Quote</th>
                        <th className="pb-3">Status Action</th>
                        <th className="pb-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D4AF37]/15 text-[#CBD5E1]">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-emerald-950/40 transition-colors">
                          <td className="py-3 font-mono font-bold text-[#F5CE68]">{b.bookingId}</td>
                          <td className="py-3 font-medium text-white">{b.customerName}</td>
                          <td className="py-3 text-[11px]">
                            <p className="text-white font-medium">{b.phone}</p>
                            <p className="text-[#94A3B8]">{b.email || 'No email'}</p>
                          </td>
                          <td className="py-3">
                            <p className="font-semibold text-white">{b.eventType}</p>
                            <p className="text-[11px] text-[#94A3B8]">
                              {b.eventDate} ({b.eventTime})
                            </p>
                          </td>
                          <td className="py-3 tabular-nums font-medium text-white">{b.guestCount}</td>
                          <td className="py-3 font-bold text-[#F5CE68] tabular-nums">
                            ₹{b.estimatedAmount?.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3">
                            <select
                              value={b.status}
                              onChange={(e) => handleStatusChange(b.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none shadow-sm ${
                                b.status === 'Confirmed'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                                  : b.status === 'Completed'
                                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50'
                                  : b.status === 'Cancelled'
                                  ? 'bg-rose-950 text-rose-300 border-rose-500/50'
                                  : b.status === 'In Progress'
                                  ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                                  : 'bg-[#06291C] text-[#F5CE68] border-[#D4AF37]/40'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => handleDeleteBooking(b.id)}
                              className="p-2 text-[#94A3B8] hover:text-rose-400 transition-colors"
                              title="Delete booking"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. MENUS MANAGEMENT */}
            {activeTab === 'menus' && (
              <div className="p-6 sm:p-8 rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl text-white">
                    Food Menu Inventory ({menuItems.length} Dishes)
                  </h3>
                  <button
                    onClick={() => {
                      setEditingMenuItem(null);
                      setNewMenu({
                        name: '',
                        description: '',
                        price: 250,
                        category: 'STARTER - VEG',
                        menuType: 'all',
                        isVeg: true,
                        isPopular: false,
                        isFeatured: false,
                        isOdiaSpecialty: false,
                        image: '',
                      });
                      setAddMenuModalOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-2xl gold-gradient-btn text-xs font-bold flex items-center gap-1.5 shadow-md text-[#041810]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Dish</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-4 rounded-2xl bg-[#06291C]/80 border border-[#D4AF37]/35 flex flex-col justify-between shadow-sm hover:border-[#D4AF37]/60 transition-colors"
                    >
                      <div className="flex gap-3">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#D4AF37]/30"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-xs truncate">{dish.name}</h4>
                          <span className="text-[10px] text-[#F5CE68] font-bold">{dish.category}</span>
                          <p className="text-xs font-black text-white mt-1 tabular-nums">{dish.price ? `₹${dish.price}` : 'Package Included'}</p>
                          <div className="flex flex-wrap gap-1 mt-1 text-[9px] font-semibold">
                            {dish.isVeg ? (
                              <span className="text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">Pure Veg</span>
                            ) : (
                              <span className="text-rose-300 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-500/40">Non-Veg</span>
                            )}
                            {dish.isOdiaSpecialty && (
                              <span className="text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40">· Odia</span>
                            )}
                            {dish.menuType && dish.menuType !== 'all' && (
                              <span className="text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/40 capitalize">· {dish.menuType}</span>
                            )}
                            {dish.isFeatured && (
                              <span className="text-[#F5CE68] bg-[#041810] px-1.5 py-0.5 rounded border border-[#D4AF37]/50">· Featured</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#D4AF37]/25 mt-3">
                        <button
                          onClick={() => {
                            setEditingMenuItem(dish);
                            setNewMenu({
                              name: dish.name,
                              description: dish.description || '',
                              price: dish.price || 250,
                              category: dish.category,
                              menuType: dish.menuType || 'all',
                              isVeg: dish.isVeg,
                              isPopular: dish.isPopular || false,
                              isFeatured: dish.isFeatured || false,
                              isOdiaSpecialty: dish.isOdiaSpecialty || false,
                              image: dish.image,
                            });
                            setAddMenuModalOpen(true);
                          }}
                          className="p-2 text-[#CBD5E1] hover:text-[#F5CE68]"
                          title="Edit dish"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMenuItem(dish.id)}
                          className="p-2 text-rose-400 hover:text-rose-300"
                          title="Delete dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SERVICES MANAGEMENT */}
            {activeTab === 'services' && (
              <div className="p-6 sm:p-8 rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl text-white">
                    Catering & Cook Services ({services.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-5 rounded-2xl bg-[#06291C]/80 border border-[#D4AF37]/35 flex flex-col justify-between shadow-sm"
                    >
                      <div className="flex gap-4">
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[#D4AF37]/30"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#F5CE68] uppercase font-bold">
                            {srv.category}
                          </span>
                          <h4 className="font-bold text-sm text-white">{srv.title}</h4>
                          <p className="text-xs font-bold text-[#F5CE68]">
                            Starting ₹{srv.startingPrice}
                          </p>
                          <p className="text-[11px] text-[#CBD5E1] line-clamp-2">{srv.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PACKAGES MANAGEMENT */}
            {activeTab === 'packages' && (
              <div className="p-6 sm:p-8 rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 space-y-6 shadow-xl">
                <h3 className="font-display font-bold text-xl text-white">
                  Catering Packages ({packages.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-6 rounded-2xl bg-[#06291C]/80 border border-[#D4AF37]/35 space-y-3 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold text-base text-white">{pkg.name}</h4>
                          <p className="text-xs text-[#CBD5E1] mt-0.5">{pkg.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-display text-xl font-bold text-[#F5CE68] tabular-nums">
                            ₹{pkg.pricePerPerson}
                          </span>
                          <p className="text-[10px] text-slate-400">/ Plate</p>
                        </div>
                      </div>
                      <div className="text-xs text-[#CBD5E1] space-y-1 font-medium">
                        <p>• {pkg.startersCount} Starters, {pkg.mainCourseCount} Main Course</p>
                        <p>• {pkg.dessertCount} Desserts, {pkg.drinksCount} Drinks</p>
                        <p>• Staff Included: {pkg.staffIncluded ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. GALLERY MANAGEMENT */}
            {activeTab === 'gallery' && (
              <div className="p-6 sm:p-8 rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl text-white">
                    Portfolio Gallery ({gallery.length} Images)
                  </h3>
                  <button
                    onClick={() => setAddGalleryModalOpen(true)}
                    className="px-5 py-2.5 rounded-2xl gold-gradient-btn text-xs font-bold flex items-center gap-1.5 shadow-md text-[#041810]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative rounded-2xl overflow-hidden group bg-[#06291C]/80 border border-[#D4AF37]/35 shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-36 object-cover"
                      />
                      <div className="p-3">
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        <span className="text-[10px] text-[#F5CE68] font-semibold">{item.category}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/70 text-rose-300 hover:bg-rose-900 shadow-sm transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. CONTACT MESSAGES */}
            {activeTab === 'messages' && (
              <div className="p-6 sm:p-8 rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 space-y-4 shadow-xl">
                <h3 className="font-display font-bold text-xl text-white">
                  Customer Inquiries & Messages ({messages.length})
                </h3>

                {messages.length === 0 ? (
                  <p className="text-xs text-[#CBD5E1]">No customer messages yet.</p>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-start justify-between gap-3 shadow-sm ${
                          msg.read
                            ? 'bg-[#06291C]/60 border-[#D4AF37]/25 text-[#CBD5E1]'
                            : 'bg-[#06291C] border-[#D4AF37] text-white ring-1 ring-[#D4AF37]/50'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs text-white">{msg.name}</h4>
                            <span className="text-[11px] text-[#F5CE68] font-bold">({msg.phone})</span>
                            {msg.email && <span className="text-[11px] text-[#94A3B8]">· {msg.email}</span>}
                          </div>
                          <p className="text-xs font-semibold text-[#F5CE68]">{msg.subject}</p>
                          <p className="text-xs text-[#CBD5E1] whitespace-pre-wrap">{msg.message}</p>
                          <span className="text-[10px] text-[#94A3B8] block pt-1">
                            Received {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {!msg.read && (
                            <button
                              onClick={() => handleMarkMessageRead(msg.id)}
                              className="px-3.5 py-1.5 rounded-xl gold-gradient-btn text-xs font-bold text-[#041810] shadow-sm"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 text-[#94A3B8] hover:text-rose-400"
                            title="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 8. CUSTOMERS LIST */}
            {activeTab === 'customers' && (
              <div className="p-6 sm:p-8 rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 space-y-4 shadow-xl">
                <h3 className="font-display font-bold text-xl text-white">
                  Registered Customer Accounts ({customers.length})
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#D4AF37]/30 text-[#F5CE68] font-semibold">
                      <tr>
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Email</th>
                        <th className="pb-3">Phone</th>
                        <th className="pb-3">Role</th>
                        <th className="pb-3">Registered At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D4AF37]/15 text-[#CBD5E1]">
                      {customers.map((c) => (
                        <tr key={c.id} className="hover:bg-emerald-950/40 transition-colors">
                          <td className="py-3 font-bold text-white">{c.name}</td>
                          <td className="py-3 text-[#CBD5E1]">{c.email}</td>
                          <td className="py-3 text-[#CBD5E1]">{c.phone}</td>
                          <td className="py-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                c.role === 'admin'
                                  ? 'bg-[#06291C] text-[#F5CE68] border border-[#D4AF37]'
                                  : 'bg-[#041810] text-[#CBD5E1] border border-[#D4AF37]/30'
                              }`}
                            >
                              {c.role}
                            </span>
                          </td>
                          <td className="py-3 text-[#94A3B8]">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="p-6 sm:p-8 rounded-[36px] bg-[#041810]/90 border border-[#D4AF37]/40 space-y-4 shadow-xl">
                <h3 className="font-display font-bold text-xl text-white">
                  Customer Reviews ({reviews.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-[#06291C]/80 border border-[#D4AF37]/35 flex flex-col justify-between shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{rev.customerName}</span>
                          <div className="flex items-center text-[#F5CE68]">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#F5CE68]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-[#CBD5E1] italic">"{rev.comment}"</p>
                        <span className="text-[10px] text-[#F5CE68] bg-[#041810] border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full inline-block font-semibold">
                          {rev.eventType}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-[#D4AF37]/25 mt-3 flex justify-end">
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal: Add/Edit Menu Item */}
      {addMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-md w-full rounded-[36px] bg-[#041810]/95 border border-[#D4AF37]/50 p-6 sm:p-8 space-y-4 shadow-2xl relative text-[#FAF8F5]">
            <button
              onClick={() => setAddMenuModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#CBD5E1] hover:text-[#F5CE68]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-2xl text-white">
              {editingMenuItem ? 'Edit Dish' : 'Add New Menu Item'}
            </h3>

            <form onSubmit={handleSaveMenuItem} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={newMenu.name}
                  onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                  placeholder="e.g. Mutton Rogan Josh"
                  className="w-full rounded-2xl p-2.5 bg-[#06291C] border border-[#D4AF37]/40 text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68]"
                />
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Category *</label>
                <select
                  value={newMenu.category}
                  onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
                  className="w-full rounded-2xl p-2.5 bg-[#06291C] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#F5CE68]"
                >
                  <option value="WELCOME DRINKS">WELCOME DRINKS</option>
                  <option value="SOUP">SOUP</option>
                  <option value="COUNTER STARTER">COUNTER STARTER</option>
                  <option value="STARTER - VEG">STARTER - VEG</option>
                  <option value="STARTER - NON-VEG">STARTER - NON-VEG</option>
                  <option value="PANEER">PANEER</option>
                  <option value="FISH">FISH</option>
                  <option value="PRAWN">PRAWN</option>
                  <option value="CHICKEN">CHICKEN</option>
                  <option value="MUTTON">MUTTON</option>
                  <option value="EGG">EGG</option>
                  <option value="ROTI / NAN / PURI">ROTI / NAN / PURI</option>
                  <option value="RICE / PULAO / BIRYANI">RICE / PULAO / BIRYANI</option>
                  <option value="DAL">DAL</option>
                  <option value="CHUTNEY & RAITA">CHUTNEY & RAITA</option>
                  <option value="VEGETABLE">VEGETABLE</option>
                  <option value="MUSHROOM">MUSHROOM</option>
                  <option value="AAMISHA / NON-VEG">AAMISHA / NON-VEG</option>
                  <option value="ODISSY SPECIAL">ODISSY SPECIAL</option>
                  <option value="SADDA / VEG">SADDA / VEG</option>
                  <option value="CONTINENTAL">CONTINENTAL</option>
                  <option value="SWEET DESSERT">SWEET DESSERT</option>
                  <option value="PLATE COUNTER">PLATE COUNTER</option>
                  <option value="WATER BOTTLE">WATER BOTTLE</option>
                  <option value="PAAN COUNTER">PAAN COUNTER</option>
                  <option value="FRUIT DESIGN CUTTING">FRUIT DESIGN CUTTING</option>
                </select>
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Menu Collection Tier *</label>
                <select
                  value={newMenu.menuType}
                  onChange={(e) => setNewMenu({ ...newMenu, menuType: e.target.value })}
                  className="w-full rounded-2xl p-2.5 bg-[#06291C] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#F5CE68]"
                >
                  <option value="all">All Collections (Universal)</option>
                  <option value="normal">Normal Menu</option>
                  <option value="deluxe">Delux Menu</option>
                  <option value="premium">Premium Menu</option>
                </select>
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Price per Plate (₹) (Optional)</label>
                <input
                  type="number"
                  value={newMenu.price}
                  onChange={(e) => setNewMenu({ ...newMenu, price: Number(e.target.value) })}
                  className="w-full rounded-2xl p-2.5 bg-[#06291C] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#F5CE68]"
                />
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newMenu.description}
                  onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
                  placeholder="Ingredients and culinary style..."
                  className="w-full rounded-2xl p-2 bg-[#06291C] border border-[#D4AF37]/40 text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68]"
                />
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={newMenu.image}
                  onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-2xl p-2.5 bg-[#06291C] border border-[#D4AF37]/40 text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#FAF8F5] font-medium">
                  <input
                    type="checkbox"
                    checked={newMenu.isVeg}
                    onChange={(e) => setNewMenu({ ...newMenu, isVeg: e.target.checked })}
                    className="accent-emerald-500"
                  />
                  <span>Pure Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#FAF8F5] font-medium">
                  <input
                    type="checkbox"
                    checked={newMenu.isOdiaSpecialty}
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, isOdiaSpecialty: e.target.checked })
                    }
                    className="accent-[#F5CE68]"
                  />
                  <span>Odia Specialty</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#FAF8F5] font-medium">
                  <input
                    type="checkbox"
                    checked={newMenu.isPopular}
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, isPopular: e.target.checked })
                    }
                    className="accent-amber-400"
                  />
                  <span>Popular Dish</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#FAF8F5] font-medium">
                  <input
                    type="checkbox"
                    checked={newMenu.isFeatured}
                    onChange={(e) =>
                      setNewMenu({ ...newMenu, isFeatured: e.target.checked })
                    }
                    className="accent-cyan-400"
                  />
                  <span>Chef's Featured</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md mt-4"
              >
                {editingMenuItem ? 'Save Changes' : 'Add to Menu'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Gallery Item */}
      {addGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-md w-full rounded-[36px] bg-[#041810]/95 border border-[#D4AF37]/50 p-6 sm:p-8 space-y-4 shadow-2xl relative text-[#FAF8F5]">
            <button
              onClick={() => setAddGalleryModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#CBD5E1] hover:text-[#F5CE68]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-2xl text-white">Add Photo to Gallery</h3>

            <form onSubmit={handleSaveGallery} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  placeholder="e.g. Royal Wedding Buffet Setup"
                  className="w-full rounded-2xl p-2.5 bg-[#06291C] border border-[#D4AF37]/40 text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68]"
                />
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Category *</label>
                <select
                  value={newGallery.category}
                  onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                  className="w-full rounded-2xl p-2.5 bg-[#06291C] border border-[#D4AF37]/40 text-white focus:outline-none focus:border-[#F5CE68]"
                >
                  <option value="Weddings">Weddings</option>
                  <option value="Birthdays">Birthdays</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Buffet">Buffet</option>
                  <option value="Traditional Food">Traditional Food</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Events">Events</option>
                  <option value="Decorated Tables">Decorated Tables</option>
                </select>
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={newGallery.image}
                  onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-2xl p-2.5 bg-[#06291C] border border-[#D4AF37]/40 text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68]"
                />
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newGallery.description}
                  onChange={(e) =>
                    setNewGallery({ ...newGallery, description: e.target.value })
                  }
                  placeholder="Event venue or details..."
                  className="w-full rounded-2xl p-2 bg-[#06291C] border border-[#D4AF37]/40 text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#F5CE68]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md mt-4"
              >
                Upload Photo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

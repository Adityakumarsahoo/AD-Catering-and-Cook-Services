import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api.js';
import {
  Users,
  CalendarCheck,
  UtensilsCrossed,
  ChefHat,
  Package as PackageIcon,
  Image as GalleryIcon,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  ExternalLink,
  DollarSign,
  Phone,
  Eye,
  Filter,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { ADBrandEmblem } from '../../components/ADBrandEmblem.js';

export const AdminDashboardOverview: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [dashRes, menuRes, srvRes, pkgRes, galRes, msgRes] = await Promise.all([
        api.getAdminDashboard().catch(() => null),
        api.getMenu().catch(() => null),
        api.getServices().catch(() => null),
        api.getPackages().catch(() => null),
        api.getGallery().catch(() => null),
        api.getAdminMessages().catch(() => null),
      ]);

      const totalDishes = menuRes?.menuItems?.length || 0;
      const totalServices = srvRes?.services?.length || 0;
      const totalPackages = pkgRes?.packages?.length || 0;
      const totalGallery = galRes?.gallery?.length || 0;
      const totalMessages = msgRes?.messages?.length || 0;
      const unreadMessages = msgRes?.messages ? msgRes.messages.filter((m: any) => !m.read).length : 0;

      setData({
        ...dashRes,
        totalDishes,
        totalServices,
        totalPackages,
        totalGallery,
        totalMessages,
        unreadMessages,
        totalEnquiries: (dashRes?.metrics?.totalBookings || 0) + totalMessages,
        newEnquiries: (dashRes?.metrics?.pendingBookings || 0) + unreadMessages,
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading && !data) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#D4AF37]" />
        <p className="text-sm font-semibold text-slate-600">Loading live database metrics...</p>
      </div>
    );
  }

  const metrics = data?.metrics || {};
  const recentBookings = data?.recentBookings || [];

  const summaryCards = [
    {
      title: 'Total Enquiries',
      value: data?.totalEnquiries || 0,
      subtext: `${data?.metrics?.totalBookings || 0} Bookings + ${data?.totalMessages || 0} Messages`,
      icon: CalendarCheck,
      color: 'from-amber-500 to-amber-600',
      badge: 'All Time',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      title: 'New Enquiries',
      value: data?.newEnquiries || 0,
      subtext: `${metrics.pendingBookings || 0} Pending • Action Required`,
      icon: AlertCircle,
      color: 'from-rose-500 to-rose-600',
      badge: metrics.pendingBookings > 0 ? 'Urgent' : 'All clear',
      badgeColor: metrics.pendingBookings > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800',
    },
    {
      title: 'Total Services',
      value: data?.totalServices || 0,
      subtext: 'Banquets & Private Master Cooks',
      icon: ChefHat,
      color: 'from-emerald-600 to-teal-700',
      badge: 'Active Offerings',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      title: 'Total Food Items',
      value: data?.totalDishes || 0,
      subtext: 'Catering menu & Odia specialties',
      icon: UtensilsCrossed,
      color: 'from-blue-500 to-blue-600',
      badge: 'Live Menu',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Total Packages',
      value: data?.totalPackages || 0,
      subtext: 'Basic, Deluxe, Premium & Royal',
      icon: PackageIcon,
      color: 'from-purple-500 to-purple-600',
      badge: 'Curated Tiers',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      title: 'Gallery Images',
      value: data?.totalGallery || 0,
      subtext: 'Catering events, weddings, dishes',
      icon: GalleryIcon,
      color: 'from-indigo-500 to-indigo-600',
      badge: 'Portfolio',
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
  ];

  const totalCalculated =
    (metrics.pendingBookings || 0) +
    (metrics.confirmedBookings || 0) +
    (metrics.inProgressBookings || 0) +
    (metrics.completedEvents || 0) +
    (metrics.cancelledBookings || 0) || 1;

  const statusBreakdown = [
    { label: 'Pending Review', count: metrics.pendingBookings || 0, color: 'bg-amber-500' },
    { label: 'Confirmed', count: metrics.confirmedBookings || 0, color: 'bg-emerald-500' },
    { label: 'In Progress', count: metrics.inProgressBookings || 0, color: 'bg-blue-500' },
    { label: 'Completed', count: metrics.completedEvents || 0, color: 'bg-purple-500' },
    { label: 'Cancelled', count: metrics.cancelledBookings || 0, color: 'bg-rose-400' },
  ];

  return (
    <div className="space-y-6">
      
      {/* ====================================================
          TOP HERO BANNER: Management Greetings & Real Revenue
          ==================================================== */}
      <div className="rounded-3xl bg-gradient-to-r from-[#031D13] via-[#05291C] to-[#031D13] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-[#D4AF37]/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-xs font-bold text-[#F5CE68]">
              <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
              <span>Enterprise Admin Control Room</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              Welcome to AD Catering Executive Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Manage live banquet reservations, configure 145+ menu dishes, update royal packages, and oversee customer communications with persistent database synchronization.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#02130C]/80 border border-[#D4AF37]/40 p-4 sm:p-5 rounded-2xl shrink-0 shadow-inner">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] flex items-center justify-center text-[#031D13] font-black shadow-md">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#F5CE68] font-bold">Confirmed Pipeline</p>
              <p className="text-xl sm:text-2xl font-black text-white font-mono">
                ₹{(metrics.totalRevenue || 0).toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] text-emerald-400 font-medium">Real confirmed events value</p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          1. SUMMARY METRIC CARDS (6 Real Database Metrics)
          ==================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {summaryCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.title}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {card.value}
                </p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{card.title}</p>
                <p className="text-[10px] text-slate-400 mt-1 truncate">{card.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================
          2. QUICK ACTIONS BAR
          ==================================================== */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/90 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Executive Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <Link
            to="/admin/menu"
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 transition-all hover:border-[#D4AF37]"
          >
            <Plus className="w-4 h-4 text-[#AA7C11]" />
            <span>Add Delicacy</span>
          </Link>
          <Link
            to="/admin/services"
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 transition-all hover:border-[#D4AF37]"
          >
            <Plus className="w-4 h-4 text-[#AA7C11]" />
            <span>Add Service</span>
          </Link>
          <Link
            to="/admin/packages"
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 transition-all hover:border-[#D4AF37]"
          >
            <Plus className="w-4 h-4 text-[#AA7C11]" />
            <span>New Package</span>
          </Link>
          <Link
            to="/admin/gallery"
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 transition-all hover:border-[#D4AF37]"
          >
            <Plus className="w-4 h-4 text-[#AA7C11]" />
            <span>Upload Photo</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 transition-all hover:border-[#D4AF37]"
          >
            <Eye className="w-4 h-4 text-[#AA7C11]" />
            <span>View Bookings</span>
          </Link>
          <Link
            to="/admin/settings"
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 transition-all hover:border-[#D4AF37]"
          >
            <Sparkles className="w-4 h-4 text-[#AA7C11]" />
            <span>Website Settings</span>
          </Link>
        </div>
      </div>

      {/* ====================================================
          3. MAIN CONTENT: RECENT ENQUIRIES & STATUS DISTRIBUTION
          ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Recent Enquiries Table */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">Recent Customer Enquiries</h3>
              <p className="text-xs text-slate-500">Latest reservation requests received through booking system</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-bold text-[#AA7C11] hover:underline flex items-center gap-1"
            >
              <span>Manage All ({metrics.totalBookings || 0})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Booking ID</th>
                  <th className="py-2.5 px-3 font-bold">Customer</th>
                  <th className="py-2.5 px-3 font-bold">Event & Date</th>
                  <th className="py-2.5 px-3 font-bold">Guests</th>
                  <th className="py-2.5 px-3 font-bold">Est. Bill</th>
                  <th className="py-2.5 px-3 font-bold">Status</th>
                  <th className="py-2.5 px-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentBookings.length > 0 ? (
                  recentBookings.map((b: any) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#AA7C11]">{b.bookingId}</td>
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-900">{b.customerName}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{b.phone}</span>
                        </p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-slate-800">{b.eventType}</p>
                        <p className="text-[11px] text-slate-400">{b.eventDate}</p>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">{b.guestCount} pax</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        ₹{(b.estimatedAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
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
                      <td className="py-3 px-3 text-right">
                        <Link
                          to={`/admin/enquiries?id=${b.id}`}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#D4AF37] hover:text-[#031D13] font-bold text-slate-700 transition-colors inline-flex items-center gap-1 text-[11px]"
                        >
                          <span>Review</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No bookings recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols): Enquiry Status Distribution & Activity */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status Distribution Breakdown */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">Enquiry Status Distribution</h3>
            <p className="text-xs text-slate-500">Live breakdown of reservations by workflow state</p>

            <div className="space-y-3 pt-2">
              {statusBreakdown.map((item) => {
                const percent = Math.round((item.count / totalCalculated) * 100);
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700">{item.label}</span>
                      <span className="font-mono text-slate-900">
                        {item.count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick System Summary */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900">System Integrity & Database</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Database Engine</span>
                <span className="font-semibold text-slate-800">Persistent JSON FS Engine</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Authentication</span>
                <span className="font-semibold text-emerald-700">JWT + Bcrypt Secure Session</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Website Status</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live & Public
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Customer Hotline</span>
                <span className="font-mono font-bold text-slate-800">+91 98765 43210</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

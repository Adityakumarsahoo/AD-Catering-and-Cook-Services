import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';
import {
  LayoutDashboard,
  Home as HomeIcon,
  Info,
  UtensilsCrossed,
  ChefHat,
  Package as PackageIcon,
  Image as GalleryIcon,
  Star,
  CalendarCheck,
  Compass,
  Settings as SettingsIcon,
  LogOut,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  ExternalLink,
  ChevronDown,
  X,
  ShieldCheck,
  Crown,
  Sparkles,
  Phone,
  Mail,
  User,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { ADBrandEmblem } from '../components/ADBrandEmblem.js';

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  actionButton?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  pageTitle,
  pageDescription,
  actionButton,
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [unreadBookingsCount, setUnreadBookingsCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);
  const [globalSearch, setGlobalSearch] = useState('');

  // Fetch quick unread counters for the top bar notifications
  useEffect(() => {
    async function loadNotificationSummary() {
      try {
        const [dashRes, msgRes] = await Promise.all([
          api.getAdminDashboard().catch(() => null),
          api.getAdminMessages().catch(() => null),
        ]);
        if (dashRes) {
          const pending = dashRes.metrics?.pendingBookings || 0;
          const unreadMsgs = msgRes?.messages ? msgRes.messages.filter((m: any) => !m.read).length : 0;
          setUnreadBookingsCount(pending + unreadMsgs);
          
          const notifs: any[] = [];
          if (dashRes.recentBookings) {
            dashRes.recentBookings.slice(0, 4).forEach((b: any) => {
              notifs.push({
                id: b.id,
                title: `Booking: ${b.customerName}`,
                detail: `${b.eventType} • ₹${(b.estimatedAmount || 0).toLocaleString('en-IN')}`,
                time: new Date(b.createdAt).toLocaleDateString(),
                status: b.status,
                link: '/admin/enquiries',
              });
            });
          }
          setRecentNotifications(notifs);
        }
      } catch (err) {
        console.error('Failed to load admin notifications:', err);
      }
    }
    loadNotificationSummary();
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Home Page', path: '/admin/homepage', icon: HomeIcon },
    { name: 'About Us', path: '/admin/about', icon: Info },
    { name: 'Services', path: '/admin/services', icon: ChefHat },
    { name: 'Food Menu', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Packages & Pricing', path: '/admin/packages', icon: PackageIcon },
    { name: 'Gallery', path: '/admin/gallery', icon: GalleryIcon },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Enquiries & Bookings', path: '/admin/enquiries', icon: CalendarCheck, badge: unreadBookingsCount > 0 ? unreadBookingsCount : undefined },
    { name: 'Navigation Menu', path: '/admin/navigation', icon: Compass },
    { name: 'Website Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSearch.trim()) return;
    const query = globalSearch.toLowerCase().trim();
    if (query.includes('menu') || query.includes('dish') || query.includes('food')) {
      navigate('/admin/menu');
    } else if (query.includes('enquir') || query.includes('book') || query.includes('customer')) {
      navigate('/admin/enquiries');
    } else if (query.includes('service') || query.includes('cook')) {
      navigate('/admin/services');
    } else if (query.includes('package')) {
      navigate('/admin/packages');
    } else if (query.includes('photo') || query.includes('gallery')) {
      navigate('/admin/gallery');
    } else if (query.includes('review') || query.includes('testimonial')) {
      navigate('/admin/testimonials');
    } else if (query.includes('home')) {
      navigate('/admin/homepage');
    } else if (query.includes('about')) {
      navigate('/admin/about');
    } else if (query.includes('setting')) {
      navigate('/admin/settings');
    } else {
      navigate(`/admin/menu?search=${encodeURIComponent(query)}`);
    }
    setGlobalSearch('');
  };

  // Get current breadcrumb
  const currentNav = navItems.find((item) => item.path === location.pathname) || {
    name: pageTitle || 'Dashboard',
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-800 font-sans flex antialiased">
      {/* ====================================================
          1. DESKTOP SIDEBAR (Deep Emerald Green + Metallic Gold)
          ==================================================== */}
      <aside
        className={`hidden md:flex flex-col bg-[#031D13] text-[#FAF8F5] border-r border-[#0A3D29] z-30 transition-all duration-300 relative shadow-2xl ${
          collapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Shimmer top gold edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />

        {/* Brand Header */}
        <div className="p-4 h-20 flex items-center justify-between border-b border-emerald-950/80">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'justify-center w-full' : ''}`}
            title="AD Catering Admin Control Room"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B3D26] to-[#041A12] border border-[#D4AF37]/70 flex items-center justify-center shrink-0 shadow-md">
              <Crown className="w-5 h-5 text-[#F5CE68]" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="font-display font-black text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF1B8] via-[#F5CE68] to-[#D4AF37] truncate">
                  AD CATERING
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-400 truncate">
                  Admin Control Panel
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-900/90 to-[#05291C] text-[#F5CE68] border-l-4 border-[#D4AF37] shadow-md shadow-black/20'
                    : 'text-slate-300 hover:text-white hover:bg-emerald-950/50'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.name : undefined}
              >
                <IconComp
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#F5CE68]' : 'text-slate-400 group-hover:text-emerald-300'
                  }`}
                />
                {!collapsed && <span className="truncate flex-1">{item.name}</span>}

                {/* Badge for Enquiries */}
                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#D4AF37] text-[#031D13] shadow-sm animate-pulse">
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1.5 right-2 w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-2 ring-[#031D13]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer: Collapse Toggle & Logout */}
        <div className="p-3 border-t border-emerald-950/80 space-y-2 bg-[#02160E]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-[#F5CE68]" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 text-[#F5CE68]" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className={`w-full py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 text-rose-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Log out of Admin Dashboard"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ====================================================
          2. MOBILE SLIDE-OUT DRAWER
          ==================================================== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="relative w-72 max-w-[80vw] h-full bg-[#031D13] text-[#FAF8F5] border-r border-[#0A3D29] z-10 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Mobile Header */}
            <div className="p-4 h-20 flex items-center justify-between border-b border-emerald-950">
              <div className="flex items-center gap-2.5">
                <Crown className="w-5 h-5 text-[#F5CE68]" />
                <div>
                  <h3 className="font-display font-black text-sm text-[#F5CE68]">AD CATERING</h3>
                  <p className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Admin Console</p>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl bg-emerald-950 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-900 to-[#05291C] text-[#F5CE68] border-l-4 border-[#D4AF37]'
                        : 'text-slate-300 hover:text-white hover:bg-emerald-950/60'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-[#F5CE68]' : 'text-slate-400'}`} />
                    <span className="flex-1">{item.name}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#D4AF37] text-[#031D13]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-emerald-950 bg-[#02160E] space-y-2">
              <Link
                to="/"
                target="_blank"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-900/60 text-[#F5CE68] text-xs font-bold flex items-center justify-center gap-2 border border-[#D4AF37]/40"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Public Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-3 rounded-xl bg-rose-950/50 text-rose-300 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ====================================================
          3. MAIN CONTAINER
          ==================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* ====================================================
            TOP NAVBAR (White Card SaaS Style + Gold & Slate Accents)
            ==================================================== */}
        <header className="h-16 sm:h-20 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          
          {/* Left: Mobile hamburger + Breadcrumb */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Open mobile menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <span className="text-slate-400 font-normal">Admin</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold tracking-tight">{currentNav.name}</span>
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center relative max-w-md w-full mx-6"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search dishes, bookings, services, packages..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:bg-white transition-all"
            />
          </form>

          {/* Right: Actions, Notifications, Profile, View Site */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Website Button (Opens Public Site) */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors text-xs font-bold"
              title="Return to public AD Catering website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              <span>View Website</span>
            </Link>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors relative cursor-pointer"
                title="Notifications & Recent Enquiries"
              >
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {unreadBookingsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] text-[#031D13] font-black text-[10px] flex items-center justify-center shadow-sm">
                    {unreadBookingsCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 text-slate-800">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Notifications & Alerts</h4>
                      <p className="text-[10px] text-slate-500">Live booking activity updates</p>
                    </div>
                    {unreadBookingsCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {unreadBookingsCount} new
                      </span>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {recentNotifications.length > 0 ? (
                      recentNotifications.map((notif) => (
                        <Link
                          key={notif.id}
                          to={notif.link}
                          onClick={() => setNotifDropdownOpen(false)}
                          className="p-3 hover:bg-slate-50 transition-colors flex items-start gap-2.5 block"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{notif.title}</p>
                            <p className="text-[11px] text-slate-500 truncate">{notif.detail}</p>
                            <span className="text-[10px] text-slate-400">{notif.time}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            notif.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {notif.status}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No pending alerts or notifications.
                      </div>
                    )}
                  </div>

                  <div className="pt-2 px-3 border-t border-slate-100">
                    <Link
                      to="/admin/enquiries"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="w-full py-1.5 text-center text-xs font-bold text-[#AA7C11] hover:underline block"
                    >
                      View All Customer Enquiries →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 transition-all border border-slate-200/80 cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#031D13] to-[#0A3D29] text-[#F5CE68] border border-[#D4AF37]/50 flex items-center justify-center font-bold text-xs shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                    {user?.name || 'Administrator'}
                  </span>
                  <span className="text-[10px] text-[#AA7C11] font-semibold">Super Admin</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 text-slate-800">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user?.name || 'Administrator'}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@adcatering.com'}</p>
                  </div>
                  <Link
                    to="/admin/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 text-[#AA7C11]" />
                    <span>Website & Admin Settings</span>
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-emerald-600" />
                    <span>View Public Website</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left font-semibold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* ====================================================
            PAGE CONTENT WRAPPER
            ==================================================== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Page Top Title Bar */}
          {pageTitle && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
              <div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                  {pageTitle}
                </h1>
                {pageDescription && (
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {pageDescription}
                  </p>
                )}
              </div>
              {actionButton && <div className="shrink-0">{actionButton}</div>}
            </div>
          )}

          {/* Content Body */}
          {children}
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-800">AD Catering and Cook Services</strong> • Admin Management System
          </p>
        </footer>

      </div>
    </div>
  );
};

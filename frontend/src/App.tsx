import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.js';
import { MenuCartProvider } from './context/MenuCartContext.js';
import { VideoBackground } from './components/VideoBackground.js';
import { ScrollProgress } from './components/ScrollProgress.js';
import { CustomCursor } from './components/CustomCursor.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { FloatingActions } from './components/FloatingActions.js';
import { MobileBottomNav } from './components/MobileBottomNav.js';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute.js';
import { AdminLayout } from './layouts/AdminLayout.js';
import { PageSkeleton } from './components/common/PageSkeleton.js';

// Primary Critical Landing Pages (Immediate Static Import for 0ms initial render)
import { Home } from './pages/Home.js';
import { Menu } from './pages/Menu.js';
import { VegMenu } from './pages/VegMenu.js';

// Lazy-Loaded Public Pages (High-performance code splitting)
const About = lazy(() => import('./pages/About.js').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services.js').then((m) => ({ default: m.Services })));
const Packages = lazy(() => import('./pages/Packages.js').then((m) => ({ default: m.Packages })));
const CookService = lazy(() => import('./pages/CookService.js').then((m) => ({ default: m.CookService })));
const Gallery = lazy(() => import('./pages/Gallery.js').then((m) => ({ default: m.Gallery })));
const Booking = lazy(() => import('./pages/Booking.js').then((m) => ({ default: m.Booking })));
const Contact = lazy(() => import('./pages/Contact.js').then((m) => ({ default: m.Contact })));
const Login = lazy(() => import('./pages/Login.js').then((m) => ({ default: m.Login })));
const SignUp = lazy(() => import('./pages/SignUp.js').then((m) => ({ default: m.SignUp })));
const CustomerDashboard = lazy(() =>
  import('./pages/CustomerDashboard.js').then((m) => ({ default: m.CustomerDashboard }))
);
const NotFound = lazy(() => import('./pages/NotFound.js').then((m) => ({ default: m.NotFound })));

// Lazy-Loaded Admin Suite (Saves ~600KB from public visitor bundle)
const AdminLogin = lazy(() => import('./pages/AdminLogin.js').then((m) => ({ default: m.AdminLogin })));
const AdminDashboardOverview = lazy(() =>
  import('./pages/admin/AdminDashboardOverview.js').then((m) => ({ default: m.AdminDashboardOverview }))
);
const AdminHomepage = lazy(() =>
  import('./pages/admin/AdminHomepage.js').then((m) => ({ default: m.AdminHomepage }))
);
const AdminAbout = lazy(() =>
  import('./pages/admin/AdminAbout.js').then((m) => ({ default: m.AdminAbout }))
);
const AdminServices = lazy(() =>
  import('./pages/admin/AdminServices.js').then((m) => ({ default: m.AdminServices }))
);
const AdminMenu = lazy(() =>
  import('./pages/admin/AdminMenu.js').then((m) => ({ default: m.AdminMenu }))
);
const AdminPackages = lazy(() =>
  import('./pages/admin/AdminPackages.js').then((m) => ({ default: m.AdminPackages }))
);
const AdminGallery = lazy(() =>
  import('./pages/admin/AdminGallery.js').then((m) => ({ default: m.AdminGallery }))
);
const AdminTestimonials = lazy(() =>
  import('./pages/admin/AdminTestimonials.js').then((m) => ({ default: m.AdminTestimonials }))
);
const AdminEnquiries = lazy(() =>
  import('./pages/admin/AdminEnquiries.js').then((m) => ({ default: m.AdminEnquiries }))
);
const AdminNavigation = lazy(() =>
  import('./pages/admin/AdminNavigation.js').then((m) => ({ default: m.AdminNavigation }))
);
const AdminSettings = lazy(() =>
  import('./pages/admin/AdminSettings.js').then((m) => ({ default: m.AdminSettings }))
);

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // If in admin dashboard routes (except /admin/login), render inside AdminLayout
  if (isAdminRoute && location.pathname !== '/admin/login') {
    return (
      <AdminRoute>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout
                pageTitle="Dashboard Overview"
                pageDescription="Live banquet analytics, active bookings, revenue metrics, and quick actions"
              >
                <AdminDashboardOverview />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/homepage"
            element={
              <AdminLayout
                pageTitle="Homepage Management"
                pageDescription="Edit royal hero headline, video background, CTA buttons, and visible modules"
              >
                <AdminHomepage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/about"
            element={
              <AdminLayout
                pageTitle="About Us & Legacy"
                pageDescription="Manage company history, culinary vision, guiding pillars, and executive halwais/chefs"
              >
                <AdminAbout />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/services"
            element={
              <AdminLayout
                pageTitle="Catering & Cook Services"
                pageDescription="Manage banquet catering and master private cook services with live database pricing"
              >
                <AdminServices />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <AdminLayout
                pageTitle="Food Menu Delicacies"
                pageDescription="Manage 145+ dishes, pricing, dietary labels, Odia specialties, and live availability"
              >
                <AdminMenu />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/packages"
            element={
              <AdminLayout
                pageTitle="Packages & Pricing"
                pageDescription="Configure banquet packages, per-person rates, dish counts, inclusions, and popular tiers"
              >
                <AdminPackages />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <AdminLayout
                pageTitle="Portfolio Gallery"
                pageDescription="Upload, categorize, preview, and organize festive wedding and catering event photos"
              >
                <AdminGallery />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <AdminLayout
                pageTitle="Customer Testimonials"
                pageDescription="Manage customer feedback, star ratings, and verified wedding banquet testimonials"
              >
                <AdminTestimonials />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <AdminLayout
                pageTitle="Enquiries & Bookings"
                pageDescription="Track customer reservations, update workflow states, add private admin notes, and follow up"
              >
                <AdminEnquiries />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/navigation"
            element={
              <AdminLayout
                pageTitle="Navigation Menu"
                pageDescription="Reorder header navigation links, toggle visibility, and update public menu labels"
              >
                <AdminNavigation />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminLayout
                pageTitle="Website Settings"
                pageDescription="Manage business contact hotline, addresses, social channels, SEO meta, and admin security"
              >
                <AdminSettings />
              </AdminLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </AdminRoute>
    );
  }

  // Admin Login route
  if (location.pathname === '/admin/login') {
    return (
      <div className="relative min-h-screen bg-[#03160E] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#D4AF37]/40 selection:text-[#FFFFFF]">
        <VideoBackground />
        <Suspense fallback={<PageSkeleton />}>
          <AdminLogin />
        </Suspense>
      </div>
    );
  }

  // Public website with full existing layout, animations, navbar, and footer untouched
  return (
    <div className="relative min-h-screen bg-[#03160E] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#D4AF37]/40 selection:text-[#FFFFFF]">
      <ScrollProgress />
      <CustomCursor />
      <VideoBackground />
      <Navbar />
      <main className="flex-1 relative z-10 pb-20 md:pb-0">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/veg-menu" element={<VegMenu />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/cook-service" element={<CookService />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Customer Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuCartProvider>
          <ScrollToTop />
          <AppContent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#041D13',
                color: '#FAF8F5',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 600,
                padding: '12px 18px',
              },
              success: {
                iconTheme: {
                  primary: '#F5CE68',
                  secondary: '#041810',
                },
              },
            }}
          />
        </MenuCartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

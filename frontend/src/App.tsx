import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.js';
import { MenuCartProvider } from './context/MenuCartContext.js';
import { VideoBackground } from './components/VideoBackground.js';
import { ScrollProgress } from './components/ScrollProgress.js';
import { CustomCursor } from './components/CustomCursor.js';
import { IntroSplash } from './components/IntroSplash.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { FloatingActions } from './components/FloatingActions.js';
import { MobileBottomNav } from './components/MobileBottomNav.js';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute.js';
import { AdminLayout } from './layouts/AdminLayout.js';

// Public Pages
import { Home } from './pages/Home.js';
import { About } from './pages/About.js';
import { Services } from './pages/Services.js';
import { Menu } from './pages/Menu.js';
import { VegMenu } from './pages/VegMenu.js';
import { Packages } from './pages/Packages.js';
import { CookService } from './pages/CookService.js';
import { Gallery } from './pages/Gallery.js';
import { Booking } from './pages/Booking.js';
import { Contact } from './pages/Contact.js';
import { Login } from './pages/Login.js';
import { SignUp } from './pages/SignUp.js';
import { CustomerDashboard } from './pages/CustomerDashboard.js';
import { NotFound } from './pages/NotFound.js';

// Admin Pages
import { AdminLogin } from './pages/AdminLogin.js';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview.js';
import { AdminHomepage } from './pages/admin/AdminHomepage.js';
import { AdminAbout } from './pages/admin/AdminAbout.js';
import { AdminServices } from './pages/admin/AdminServices.js';
import { AdminMenu } from './pages/admin/AdminMenu.js';
import { AdminPackages } from './pages/admin/AdminPackages.js';
import { AdminGallery } from './pages/admin/AdminGallery.js';
import { AdminTestimonials } from './pages/admin/AdminTestimonials.js';
import { AdminEnquiries } from './pages/admin/AdminEnquiries.js';
import { AdminNavigation } from './pages/admin/AdminNavigation.js';
import { AdminSettings } from './pages/admin/AdminSettings.js';

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
      </AdminRoute>
    );
  }

  // Admin Login route
  if (location.pathname === '/admin/login') {
    return (
      <div className="relative min-h-screen bg-[#03160E] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#D4AF37]/40 selection:text-[#FFFFFF]">
        <VideoBackground />
        <AdminLogin />
      </div>
    );
  }

  // Public website with full existing layout, animations, navbar, and footer untouched
  return (
    <div className="relative min-h-screen bg-[#03160E] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#D4AF37]/40 selection:text-[#FFFFFF]">
      <IntroSplash />
      <ScrollProgress />
      <CustomCursor />
      <VideoBackground />
      <Navbar />
      <main className="flex-1 relative z-10 pb-20 md:pb-0">
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

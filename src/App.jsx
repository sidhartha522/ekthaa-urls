import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { Helmet } from 'react-helmet-async';
import usePageTracking from './hooks/usePageTracking';

// New app-first components
import Header from './components/Header';
import FooterNew from './components/FooterNew';
import ChatWidget from './components/ChatWidget';
import PrivateRoute from './components/PrivateRoute';

// New TailwindCSS pages
import HomeNew from './pages/HomeNew';
import ProductsNew from './pages/ProductsNew';
import AboutNew from './pages/AboutNew';
import CareersNew from './pages/CareersNew';
import Tracker from './pages/Tracker';
import Analytics from './pages/Analytics';
import AnalyticsNew from './pages/AnalyticsNew';
import AnalyticsAuth from './components/AnalyticsAuth';
import LinkInfo from './pages/LinkInfo';

// Customer app pages
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import ProductsExplore from './pages/customer/ProductsExplore';
import BusinessesExplore from './pages/customer/BusinessesExplore';
import ProductDetail from './pages/customer/ProductDetail';
import DetailView from './pages/customer/DetailView';

// Keep Terms, Privacy, DeleteAccount for legal pages
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import PrivacyCustomer from './pages/PrivacyCustomer';
import DeleteAccount from './pages/DeleteAccount';
import Support from './pages/Support';
import ComingSoon from './pages/ComingSoon';
import StudentStallInfo from './pages/StudentStallInfo';
import EkthaaBusiness from './pages/EkthaaBusiness';
import EventsLanding from './pages/EventsLanding';
import FreePlan from './pages/FreePlan';

function PageTracker() {
  usePageTracking();
  return null;
}

// External redirect component for Play Store and other external links
function ExternalRedirect({ url }) {
  window.location.href = url;
  return null;
}

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('Hyderabad');
  const { loading, user } = useAuth();

  // Unified app-first layout for all pages
  const AppLayout = ({ children, showChat = true, showHeader = true }) => (
    <div className="min-h-screen flex font-sans bg-brand-cream text-brand-text">
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out w-full">
        {showHeader && <Header currentCity={currentCity} setCurrentCity={setCurrentCity} />}
        <main className="flex-grow pb-16 md:pb-0">
          {/* Only show loader if auth is loading and we don't have a cached user */}
          {loading && !user ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
            </div>
          ) : (
            children
          )}
        </main>
        <FooterNew />
      </div>

      {showChat && (
        <ChatWidget
          isOpen={isChatOpen}
          onToggle={setIsChatOpen}
          className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'
            } w-full md:w-[35%] lg:w-[25%]`}
        />
      )}
    </div>
  );

  // Auth layout (no header/footer)
  const AuthLayout = ({ children }) => (
    <>{children}</>
  );

  return (
    <div className="app">
      <PageTracker />
      <Routes>
        {/* Main pages with app-first design */}
        <Route path="/" element={<AppLayout showChat={false} showHeader={false}><HomeNew /></AppLayout>} />

        {/* Explore pages - Products and Businesses */}
        {/* Product Catalog ("Products Page") */}
        <Route path="/products" element={<AppLayout><ProductsExplore /></AppLayout>} />
        <Route path="/businesses" element={<AppLayout><BusinessesExplore /></AppLayout>} />

        {/* Alias /explore to /products for backward compatibility if needed, or keeping it as is 
            But typically users expect "Products" -> /products
        */}
        <Route path="/explore" element={<Navigate to="/products" replace />} />

        {/* Detail Pages */}
        <Route path="/business/:businessId" element={<AppLayout><DetailView /></AppLayout>} />
        <Route path="/product/:productId" element={<AppLayout><ProductDetail /></AppLayout>} />

        {/* Marketing/Static Product Landing (Renamed/Moved) */}
        <Route path="/products-landing" element={<AppLayout><ProductsNew /></AppLayout>} />
        <Route path="/about" element={<AppLayout><AboutNew /></AppLayout>} />
        <Route path="/careers" element={<AppLayout><CareersNew /></AppLayout>} />
        <Route path="/tracker" element={<AppLayout showChat={false}><Tracker /></AppLayout>} />

        {/* Analytics Dashboard - Password protected */}
        <Route path="/analytics" element={<AnalyticsAuth><AnalyticsNew /></AnalyticsAuth>} />

        {/* Legal pages */}
        <Route path="/terms" element={<AppLayout showChat={false}><Terms /></AppLayout>} />
        <Route path="/privacy" element={<AppLayout showChat={false}><Privacy /></AppLayout>} />
        <Route path="/privacy-customer" element={<AppLayout showChat={false}><PrivacyCustomer /></AppLayout>} />
        <Route path="/delete-account" element={<AppLayout showChat={false}><DeleteAccount /></AppLayout>} />
        <Route path="/support" element={<AppLayout showChat={false}><Support /></AppLayout>} />
        <Route path="/coming-soon" element={<AppLayout showChat={false} showHeader={false}><ComingSoon /></AppLayout>} />
        <Route path="/link-info/:link" element={<AppLayout showChat={false} showHeader={false}><LinkInfo /></AppLayout>} />
        <Route path="/ekthaa-business-details" element={<AppLayout showChat={false} showHeader={false}><EkthaaBusiness /></AppLayout>} />
        <Route path="/student-stall-details" element={<AppLayout showChat={false} showHeader={false}><StudentStallInfo /></AppLayout>} />
        <Route path="/events" element={<AuthLayout><EventsLanding /></AuthLayout>} />
        <Route path="/freeplan" element={<AuthLayout><FreePlan /></AuthLayout>} />

        {/* Auth pages */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

        {/* External redirects */}
        <Route path="/business" element={<ExternalRedirect url="https://play.google.com/store/apps/details?id=com.ekthaa.business" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* Link Info Page */}
        <Route path="/link-info/:link" element={<AppLayout showChat={false} showHeader={false}><LinkInfo /></AppLayout>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AnalyticsProvider>
        <Router>
          <Helmet>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/logo.png?v=3" />
          </Helmet>
          <AppContent />
        </Router>
      </AnalyticsProvider>
    </AuthProvider>
  );
}

export default App;

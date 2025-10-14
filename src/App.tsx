import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookieSettings from './pages/CookieSettings';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import CheckoutConfirmation from './pages/CheckoutConfirmation';
import { AuthProvider } from './components/auth/AuthProvider';
import { PaymentGate } from './components/auth/PaymentGate';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [quoteFormTrigger, setQuoteFormTrigger] = useState<(() => void) | null>(null);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black">
      <ScrollToTop />
      <Navbar onGetQuote={location.pathname === '/' ? quoteFormTrigger : null} />
      <Routes>
        <Route path="/" element={<Home setQuoteFormTrigger={setQuoteFormTrigger} />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />
        <Route path="/success" element={<Success />} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/dashboard" element={<PaymentGate><Dashboard /></PaymentGate>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-settings" element={<CookieSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
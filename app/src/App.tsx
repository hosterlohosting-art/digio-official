import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { Phone } from 'lucide-react';

// Lazy load pages for chunk splitting and rapid initial loads
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const FAQsPage = lazy(() => import('./pages/FAQsPage'));
const BookAppointmentPage = lazy(() => import('./pages/BookAppointmentPage'));
const UKLandingPage = lazy(() => import('./pages/UKLandingPage'));
const USALandingPage = lazy(() => import('./pages/USALandingPage'));
const WokingLocationPage = lazy(() => import('./pages/WokingLocationPage'));
const SurreyLocationPage = lazy(() => import('./pages/SurreyLocationPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0d0520]">
      <div className="relative flex flex-col items-center">
        {/* Glowing pulsing background */}
        <div className="absolute w-24 h-24 bg-[#6a00ff]/25 rounded-full blur-xl animate-pulse" />
        
        {/* Animated spinner rings */}
        <div className="w-12 h-12 rounded-full border-2 border-[#ddd0f4]/20 border-t-[#6a00ff] animate-spin" />
        
        {/* Subtle branding text */}
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c7a7ff] mt-4 animate-pulse">
          Digioverse
        </span>
      </div>
    </div>
  );
}

export default function App() {

  return (
    <div className="min-h-screen bg-[#f7f7fa]">
      <div className="grain-overlay" />
      <ScrollToTop />
      <Navigation />
      <CookieConsent />
      
      {/* Floating Call & WhatsApp Buttons */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end">
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/442046155575" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center bg-[#25D366] text-white p-[18px] rounded-full shadow-[0_10px_28px_rgba(37,211,102,0.35)] hover:shadow-[0_14px_36px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300"
          title="Chat on WhatsApp"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[120px] transition-all duration-500 ease-in-out text-base font-extrabold order-first select-none mr-0 group-hover:mr-2">
            WhatsApp
          </span>
          <svg className="w-7 h-7 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.01-5.078-2.854-6.924C16.379 2.036 13.918 1.023 11.3 1.02c-5.41 0-9.81 4.396-9.813 9.801-.001 1.77.472 3.498 1.368 5.037L1.825 21.8l6.162-1.616-.34-.23zm8.995-5.918c-.287-.143-1.697-.838-1.959-.933-.261-.096-.452-.143-.642.143-.19.286-.736.933-.902 1.124-.167.19-.333.214-.62.071-.286-.143-1.21-.446-2.305-1.424-.853-.76-1.428-1.7-1.595-1.985-.167-.286-.018-.44.125-.581.129-.127.287-.333.43-.5.143-.167.19-.286.286-.476.096-.19.048-.357-.024-.5-.071-.143-.642-1.548-.88-2.12-.232-.558-.467-.482-.642-.491-.167-.008-.357-.01-.548-.01-.19 0-.5.071-.762.357-.262.286-1 .976-1 2.38 0 1.405 1.023 2.762 1.166 2.952.143.19 2.013 3.074 4.877 4.31.682.293 1.215.469 1.63.601.687.218 1.312.187 1.806.114.55-.082 1.697-.692 1.937-1.36.24-.668.24-1.24.167-1.36-.072-.12-.262-.19-.548-.332z" />
          </svg>
        </a>

        {/* Call Button */}
        <a 
          href="tel:+442046155575" 
          className="group flex items-center bg-gradient-to-r from-[#6a00ff] to-[#3b0a75] text-white p-[18px] rounded-full shadow-[0_10px_28px_rgba(106,0,255,0.35)] hover:shadow-[0_14px_36px_rgba(106,0,255,0.5)] hover:scale-110 transition-all duration-300"
          title="Call Us Now"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[100px] transition-all duration-500 ease-in-out text-base font-extrabold order-first select-none mr-0 group-hover:mr-2">
            Call Us
          </span>
          <Phone className="w-7 h-7 shrink-0" />
        </a>
      </div>

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/uk" element={<UKLandingPage />} />
            <Route path="/usa" element={<USALandingPage />} />
            <Route path="/locations/woking" element={<WokingLocationPage />} />
            <Route path="/locations/surrey" element={<SurreyLocationPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GoogleVerseProvider, useGoogleVerse } from './context/GoogleVerseContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PersonalizedStore } from './components/PersonalizedStore';
import { LimitedDrop } from './components/LimitedDrop';
import { Lookbook } from './components/Lookbook';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { GeminiMerchGuide } from './components/GeminiMerchGuide';

// Modals & Drawers
import { StyleScanner } from './components/StyleScanner';
import { GoogleIdentityQuiz } from './components/GoogleIdentityQuiz';
import { Customizer } from './components/Customizer';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProfileDashboard } from './components/ProfileDashboard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';

const AppContent: React.FC = () => {
  const { activeModal, setActiveModal, toastMessage } = useGoogleVerse();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col selection:bg-[#4285F4] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-black text-white px-5 py-3 rounded-full shadow-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2.5 border border-gray-800 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      <Navbar />
      <main className="flex-1">
        <Hero />
        <PersonalizedStore />
        <LimitedDrop />
        <Lookbook />
        <CommunitySection />
      </main>
      <Footer />

      {/* Floating Gemini AI Merch Guide */}
      <GeminiMerchGuide />

      {/* Active Modals */}
      {activeModal === 'scanner' && <StyleScanner onClose={() => setActiveModal(null)} />}
      {activeModal === 'quiz' && <GoogleIdentityQuiz onClose={() => setActiveModal(null)} />}
      {activeModal === 'customizer' && <Customizer onClose={() => setActiveModal(null)} />}
      {activeModal === 'tryon' && <VirtualTryOnModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'cart' && <CartDrawer onClose={() => setActiveModal(null)} />}
      {activeModal === 'checkout' && <CheckoutModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'profile' && <ProfileDashboard onClose={() => setActiveModal(null)} />}
      {activeModal === 'detail' && <ProductDetailModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'orderConfirmed' && <OrderConfirmationModal onClose={() => setActiveModal(null)} />}
    </div>
  );
};

export default function App() {
  return (
    <GoogleVerseProvider>
      <AppContent />
    </GoogleVerseProvider>
  );
}


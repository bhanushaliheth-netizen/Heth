import React, { useState } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { Order } from '../types';
import {
  CreditCard,
  X,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Loader2,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { cart, cartTotalPrice, activeModal, setActiveModal, placeOrder, clearCart } =
    useGoogleVerse();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [fullName, setFullName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@example.com');
  const [address, setAddress] = useState('742 Tech Park Avenue, Suite 404');
  const [city, setCity] = useState('Bengaluru');
  const [postalCode, setPostalCode] = useState('560100');
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'card'>('gpay');

  if (activeModal !== 'checkout') return null;

  const handleCompletePayment = () => {
    setStep(4); // Processing spinner step

    setTimeout(() => {
      placeOrder(
        {
          name: fullName || 'GoogleVerse Fan',
          email: email || 'fan@example.com',
          phone: '+91 98765 43210',
          address: address || 'Tech Hub Street',
          city: city || 'Bengaluru',
          pin: postalCode || '560001',
        },
        paymentMethod === 'gpay' ? 'Google Pay' : 'Credit / Debit Card'
      );
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">
              SECURE CHECKOUT
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-3 bg-slate-100 border-b border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-500">
          <span className={step >= 1 ? 'text-slate-900 font-extrabold' : ''}>1. DELIVERY</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-slate-900 font-extrabold' : ''}>2. PAYMENT</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-slate-900 font-extrabold' : ''}>3. REVIEW</span>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* STEP 1: Delivery Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase">
                SHIPPING & DELIVERY ADDRESS
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    STREET ADDRESS
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      CITY
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      POSTAL CODE
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase rounded-xl shadow-md flex items-center justify-center gap-2 pt-2"
              >
                <span>CONTINUE TO PAYMENT</span>
                <ArrowRight className="w-4 h-4 text-[#FBBC05]" />
              </button>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase">
                CHOOSE PAYMENT METHOD
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-xs font-extrabold transition-all ${
                    paymentMethod === 'gpay'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-lg">G Pay</span>
                  <span>GOOGLE PAY</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-xs font-extrabold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-[#4285F4]" />
                  <span>CREDIT / DEBIT CARD</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                {paymentMethod === 'gpay' ? (
                  <p>Fast & encrypted 1-tap checkout via Google Pay demo sandbox.</p>
                ) : (
                  <p>Standard 256-bit SSL encrypted card payment sandbox.</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  BACK
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-slate-900 text-white text-xs font-bold uppercase rounded-xl shadow-md"
                >
                  REVIEW ORDER
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase">
                REVIEW & CONFIRM
              </h4>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="font-bold">Deliver To:</span>
                  <span>{fullName}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-bold">Address:</span>
                  <span>{address}, {city}</span>
                </div>
                <div className="flex justify-between text-slate-700 border-t border-slate-200 pt-2 font-black text-sm text-slate-900">
                  <span>TOTAL AMOUNT:</span>
                  <span>₹{cartTotalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  BACK
                </button>
                <button
                  onClick={handleCompletePayment}
                  className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>PAY & PLACE ORDER — ₹{cartTotalPrice}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Processing Animation */}
          {step === 4 && (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-[#4285F4] animate-spin mx-auto" />
              <h4 className="text-lg font-black text-slate-900 uppercase">
                PROCESSING PAYMENT...
              </h4>
              <p className="text-xs text-slate-500">
                Authorizing encrypted transaction with GoogleVerse...
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

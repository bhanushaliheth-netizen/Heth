import React from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import {
  User,
  X,
  Award,
  Sparkles,
  ShoppingBag,
  Heart,
  Shirt,
  ShieldCheck,
  Package,
} from 'lucide-react';

export const ProfileDashboard: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    styleProfile,
    quizResult,
    userXp,
    orders,
    savedLooks,
    wishlist,
    showToast,
  } = useGoogleVerse();

  if (activeModal !== 'profile') return null;

  // Level calculation
  const level = Math.floor(userXp / 500) + 1;
  const xpInCurrentLevel = userXp % 500;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / 500) * 100));

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <User className="w-4 h-4 text-[#4285F4]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">
                MY GOOGLEVERSE DASHBOARD
              </h3>
              <p className="text-[11px] font-medium text-slate-500">
                Personalized style passport, XP progress, & order records
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* XP Level & Passport Summary */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#4285F4] text-white rounded-full text-xs font-black uppercase">
                  LEVEL {level} EXPLORER
                </span>
                <span className="text-xs text-slate-400 font-bold">{userXp} XP TOTAL</span>
              </div>

              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  GOOGLEVERSE CREATOR PASSPORT
                </h3>
                <p className="text-xs text-slate-300">
                  Earn XP by scanning styles, taking quizzes, saving looks, and customizing merch.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>LEVEL {level} PROGRESS</span>
                  <span>{xpInCurrentLevel} / 500 XP</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#4285F4] to-[#FBBC05] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Badges / Identity Summary */}
            <div className="md:col-span-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 text-xs space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                ACTIVE STYLE PROFILE
              </span>
              <div className="font-extrabold text-white">
                {styleProfile ? `${styleProfile.style} (${styleProfile.fit} fit)` : 'NOT SCANNED YET'}
              </div>
              <div className="text-[11px] text-slate-300">
                Identity: <span className="text-[#FBBC05] font-bold">{quizResult?.identity || 'EXPLORER'}</span>
              </div>
            </div>

          </div>

          {/* Saved Looks Section */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>MY SAVED LOOKS ({savedLooks.length})</span>
            </h3>

            {savedLooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedLooks.map((look) => (
                  <div
                    key={look.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{look.name}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Fit: {look.fit} • {look.timestamp}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#4285F4] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      SAVED
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200">
                No saved looks yet. Use the Virtual Try-On modal to save your favorite fit combinations!
              </p>
            )}
          </div>

          {/* Order History */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Package className="w-4 h-4 text-[#4285F4]" />
              <span>RECENT ORDERS ({orders.length})</span>
            </h3>

            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-slate-900">ORDER #{ord.id}</div>
                      <div className="text-slate-500">{ord.timestamp} • {ord.items.length} items</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-black text-slate-900 text-sm">
                        ₹{ord.totalPrice.toLocaleString()}
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold text-[10px] border border-emerald-200">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200">
                No completed orders yet.
              </p>
            )}
          </div>

          {/* Wishlist Items Grid */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>WISHLIST ITEMS ({wishlistedProducts.length})</span>
            </h3>

            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wishlistedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200">
                Your wishlist is empty. Click the heart icon on any product to save it here.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

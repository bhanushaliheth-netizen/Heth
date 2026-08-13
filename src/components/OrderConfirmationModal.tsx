import React from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { CheckCircle2, Award, ArrowRight, Package, Sparkles } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { activeModal, setActiveModal, orders } = useGoogleVerse();

  if (activeModal !== 'orderSuccess') return null;

  const latestOrder = orders[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-center p-8 space-y-6">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-black tracking-widest text-[#4285F4] uppercase">
            ORDER CONFIRMED
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            THANK YOU FOR YOUR ORDER<span className="text-[#FBBC05]">!</span>
          </h3>
          {latestOrder && (
            <p className="text-xs font-bold text-slate-500">
              ORDER ID: #{latestOrder.id}
            </p>
          )}
        </div>

        {/* XP Reward Badge */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-md space-y-1 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FBBC05] text-slate-950 flex items-center justify-center font-black">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-xs uppercase text-white">
                +250 XP EARNED!
              </div>
              <div className="text-[10px] text-slate-300">
                Level status updated in your GoogleVerse Passport.
              </div>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-[#FBBC05] animate-pulse" />
        </div>

        {/* Info */}
        <p className="text-xs text-slate-500 leading-relaxed">
          Your order has been recorded in your GoogleVerse dashboard. Detailed order status & tracking are now available in your profile.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => setActiveModal('profile')}
            className="w-full sm:w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full border border-slate-200"
          >
            VIEW DASHBOARD
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="w-full sm:w-1/2 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-md flex items-center justify-center gap-2"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4 text-[#FBBC05]" />
          </button>
        </div>

      </div>
    </div>
  );
};

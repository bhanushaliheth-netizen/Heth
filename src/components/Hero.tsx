import React from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { Camera, Sparkles, ArrowRight, ShieldCheck, Shirt, HardHat, ShoppingBag, BookOpen, Gift } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const Hero: React.FC = () => {
  const { setActiveModal, setSelectedProductForDetail, setSelectedProductForTryOn } = useGoogleVerse();

  // Selected floating merch items to feature in orbit around avatar
  const floatingCards = [
    { product: PRODUCTS[1], label: 'Hoodie', icon: Shirt, pos: 'top-4 -left-6 sm:-left-12', color: 'border-blue-200' },
    { product: PRODUCTS[0], label: 'T-Shirt', icon: Shirt, pos: 'top-20 -right-6 sm:-right-10', color: 'border-red-200' },
    { product: PRODUCTS[2], label: 'Cap', icon: HardHat, pos: 'bottom-24 -left-4 sm:-left-10', color: 'border-amber-200' },
    { product: PRODUCTS[3], label: 'Tote', icon: ShoppingBag, pos: 'bottom-8 -right-4 sm:-right-8', color: 'border-emerald-200' },
    { product: PRODUCTS[4], label: 'Notebook', icon: BookOpen, pos: '-top-6 right-8', color: 'border-slate-200' },
    { product: PRODUCTS[7], label: 'Collectible', icon: Gift, pos: 'bottom-2 left-12', color: 'border-purple-200' },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      {/* Background Google Color Accent Particles (subtle & elegant) */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-20 right-1/3 w-64 h-64 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Student Concept Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-ping" />
              <span className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                STUDENT CONCEPT PROJECT
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-[11px]">Next-Gen AI Merch</span>
            </div>

            {/* Massive Hero Display Title */}
            <div className="space-y-1">
              <h1 className="text-6xl sm:text-8xl xl:text-[96px] leading-[0.85] font-black text-gray-900 tracking-tighter uppercase mb-2">
                WEAR<br/>THE<br/>NET<span className="text-[#4285F4]">.</span>
              </h1>
            </div>

            {/* Subheading & Supporting Text */}
            <p className="text-base sm:text-lg text-gray-600 font-bold max-w-xl mx-auto lg:mx-0 uppercase tracking-wide">
              Your favorite digital worlds, personalized for your unique style profile.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Step into GoogleVerse — an AI-powered fashion ecosystem. Scan your outfit, unlock personalized style scores, try merchandise virtually on your photo, and chat with Gemini.
            </p>

            {/* Primary & Secondary Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setActiveModal('scanner')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-black hover:bg-gray-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all group cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#FBBC05] group-hover:scale-110 transition-transform" />
                <span>SCAN YOUR STYLE</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-black text-xs uppercase tracking-widest rounded-2xl border border-gray-300 shadow-xs transition-colors"
              >
                <span>SHOP ALL MERCH</span>
              </a>
            </div>

            {/* 4 Feature Highlights Pill */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-left">
                <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <span className="text-xs font-semibold text-slate-700">AI Style Scanner</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <span className="text-xs font-semibold text-slate-700">Virtual Fit Try-On</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <div className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                <span className="text-xs font-semibold text-slate-700">Gemini Merch Guide</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <div className="w-2 h-2 rounded-full bg-[#34A853]" />
                <span className="text-xs font-semibold text-slate-700">Identity Quiz</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column (Interactive Digital Human Avatar with Floating Merch Cards) */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl bg-gradient-to-b from-white to-slate-100 border border-slate-200 shadow-xl flex flex-col items-center justify-center p-6 text-center">
              
              {/* Interactive Stylish Avatar SVG */}
              <div className="relative w-48 h-56 flex items-center justify-center">
                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
                  {/* Subtle Background aura */}
                  <circle cx="100" cy="120" r="85" fill="#f1f5f9" />
                  
                  {/* Avatar Head & Hair */}
                  <circle cx="100" cy="65" r="28" fill="#334155" />
                  <path d="M 75 60 C 75 40 125 40 125 60 C 120 45 80 45 75 60" fill="#0f172a" />
                  {/* Stylish Glasses */}
                  <rect x="80" y="58" width="16" height="10" rx="3" fill="#0f172a" />
                  <rect x="104" y="58" width="16" height="10" rx="3" fill="#0f172a" />
                  <line x1="96" y1="63" x2="104" y2="63" stroke="#0f172a" strokeWidth="2" />
                  
                  {/* GoogleVerse Oversized Hoodie */}
                  <path d="M 55 95 L 100 80 L 145 95 L 175 130 L 150 160 L 135 145 L 135 220 L 65 220 L 65 145 L 50 160 L 25 130 Z" fill="#0f172a" />
                  <path d="M 75 92 Q 100 115 125 92 Z" fill="#4285F4" opacity="0.9" />
                  
                  {/* Google Color Emblem on Hoodie */}
                  <circle cx="100" cy="140" r="14" fill="#ffffff" />
                  <text x="100" y="145" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#0f172a" textAnchor="middle">GV</text>
                  
                  {/* Animated Scanner Grid Ring */}
                  <circle cx="100" cy="120" r="92" fill="none" stroke="#4285F4" strokeWidth="1.5" strokeDasharray="6,6" className="animate-spin-slow" />
                </svg>

                {/* Floating "AI Matched" Tag */}
                <div className="absolute -bottom-3 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-md flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
                  <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
                  <span>94% STYLE MATCH</span>
                </div>
              </div>

              {/* Floating Orbit Cards */}
              {floatingCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedProductForTryOn(card.product);
                      setActiveModal('tryon');
                    }}
                    className={`absolute ${card.pos} bg-white hover:bg-slate-50 p-2.5 rounded-2xl border ${card.color} shadow-md flex items-center gap-2 transition-all hover:scale-105 group cursor-pointer`}
                    title={`Try on ${card.product.name}`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-[10px] font-bold text-slate-900 leading-none">{card.label}</div>
                      <div className="text-[9px] font-medium text-slate-500">₹{card.product.price}</div>
                    </div>
                  </button>
                );
              })}

            </div>
          </div>

        </div>

        {/* Section Scroll Transition Banner */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs font-bold tracking-widest text-[#4285F4] uppercase mb-1">
            SCAN. DISCOVER. TRY. WEAR.
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            FIND WHAT FITS YOUR VIBE<span className="text-[#EA4335]">.</span>
          </h2>
        </div>

      </div>
    </section>
  );
};

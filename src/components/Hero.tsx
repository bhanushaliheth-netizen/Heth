import React from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { Camera, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveModal } = useGoogleVerse();

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      {/* Background Google Color Accent Particles (subtle & elegant) */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-20 right-1/3 w-64 h-64 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          
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
          <p className="text-base sm:text-lg text-gray-600 font-bold max-w-xl mx-auto uppercase tracking-wide">
            Your favorite digital worlds, personalized for your unique style profile.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Step into GoogleVerse — an AI-powered fashion ecosystem. Scan your outfit, unlock personalized style scores, try merchandise virtually on your photo, and chat with Gemini.
          </p>

          {/* Primary & Secondary Call To Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
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
            <div className="flex items-center justify-center gap-2 text-left">
              <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="text-xs font-semibold text-slate-700">AI Style Scanner</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-left">
              <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <span className="text-xs font-semibold text-slate-700">Virtual Fit Try-On</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-left">
              <div className="w-2 h-2 rounded-full bg-[#FBBC05]" />
              <span className="text-xs font-semibold text-slate-700">Gemini Merch Guide</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-left">
              <div className="w-2 h-2 rounded-full bg-[#34A853]" />
              <span className="text-xs font-semibold text-slate-700">Identity Quiz</span>
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

import React from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { Sparkles, Camera, Compass, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveModal } = useGoogleVerse();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white uppercase">
                GOOGLEVERSE
              </span>
              <span className="px-2 py-0.5 bg-white/10 text-slate-300 text-[10px] font-bold rounded-full border border-white/20">
                CONCEPT
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              “Wear the Internet.” A next-generation AI-powered merchandise discovery concept exploring tech fashion, style vision scanning, and virtual try-on.
            </p>

            {/* Google Color Dots */}
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase">
              AI INNOVATIONS
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li>
                <button
                  onClick={() => setActiveModal('scanner')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#4285F4]" />
                  <span>AI Style Scanner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('tryon')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#EA4335]" />
                  <span>Virtual Fit Try-On</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('quiz')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#FBBC05]" />
                  <span>Identity Quiz</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('customizer')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Apparel Customizer</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Student Concept Notice Box */}
          <div className="md:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-[#FBBC05] uppercase tracking-wider block">
              STUDENT CONCEPT DISCLAIMER
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              GoogleVerse is a student design & engineering concept project built for demonstration purposes. It is not affiliated with or endorsed by Google LLC. All logos and product concepts are creative explorations.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-semibold text-slate-500 gap-4">
          <div>
            © 2026 GOOGLEVERSE CONCEPT. CREATED FOR AI STUDIO BUILD.
          </div>
          <div className="flex items-center gap-4">
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
            <span>SYSTEM STATUS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

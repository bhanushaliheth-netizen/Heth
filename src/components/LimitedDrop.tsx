import React, { useState, useEffect } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, ShoppingBag, Shirt, Flame, Clock } from 'lucide-react';

export const LimitedDrop: React.FC = () => {
  const { addToCart, setSelectedProductForTryOn, setActiveModal } = useGoogleVerse();

  const limitedProduct = PRODUCTS.find((p) => p.limited) || PRODUCTS[23];

  // Countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 18,
    minutes: 47,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4285F4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EA4335]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Countdown */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-[#FBBC05] rounded-full text-xs font-black uppercase tracking-wider border border-amber-500/30">
              <Flame className="w-4 h-4 fill-current" />
              <span>THE GOOGLE DROP • LIMITED EDITION</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                GOOGLEVERSE LIMITED HOODIE<span className="text-[#FBBC05]">.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                Serialized numbered collector edition hoodie with metallic 3D GoogleVerse emblem and embedded NFC authenticity tag.
              </p>
            </div>

            {/* Countdown Clock Display */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>DROP EXPIRES IN:</span>
              </span>

              <div className="flex gap-3">
                {[
                  { value: String(timeLeft.days).padStart(2, '0'), label: 'DAYS' },
                  { value: String(timeLeft.hours).padStart(2, '0'), label: 'HOURS' },
                  { value: String(timeLeft.minutes).padStart(2, '0'), label: 'MIN' },
                  { value: String(timeLeft.seconds).padStart(2, '0'), label: 'SEC' },
                ].map((unit, idx) => (
                  <div key={idx} className="bg-slate-800/90 border border-slate-700/80 px-3.5 py-2.5 rounded-2xl text-center min-w-[64px]">
                    <span className="text-xl sm:text-2xl font-black text-white block">
                      {unit.value}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => addToCart(limitedProduct)}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FBBC05] hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SHOP THE DROP — ₹{limitedProduct.price}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedProductForTryOn(limitedProduct);
                  setActiveModal('tryon');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-full border border-slate-700 flex items-center justify-center gap-2"
              >
                <Shirt className="w-4 h-4 text-[#4285F4]" />
                <span>TRY LIMITED FIT</span>
              </button>
            </div>

          </div>

          {/* Right Product Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex items-center justify-center group">
              <img
                src={limitedProduct.image}
                alt={limitedProduct.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
              />
              <span className="absolute bottom-4 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full border border-slate-700">
                SERIAL #042 / 100
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { PRODUCTS } from '../data/products';
import { Sparkles, Shirt, ShoppingBag, ArrowRight } from 'lucide-react';

export const Lookbook: React.FC = () => {
  const { addToCart, setSelectedProductForTryOn, setActiveModal, showToast } = useGoogleVerse();

  const looks = [
    {
      id: 'look-01',
      number: 'LOOK 01',
      title: 'EVERYDAY UNIVERSE',
      tagline: 'T-shirt + Cap + Tote',
      products: [PRODUCTS[0], PRODUCTS[2], PRODUCTS[3]],
      color: 'border-blue-200 bg-blue-50/20',
      badge: 'EVERYDAY CLASSIC',
    },
    {
      id: 'look-02',
      number: 'LOOK 02',
      title: 'CREATOR STUDIO',
      tagline: 'Hoodie + Notebook + Cap',
      products: [PRODUCTS[11], PRODUCTS[13], PRODUCTS[13]],
      color: 'border-red-200 bg-red-50/20',
      badge: 'CREATOR CHOICE',
    },
    {
      id: 'look-03',
      number: 'LOOK 03',
      title: 'FUTURE CYBER',
      tagline: 'AI Hoodie + Tech Bottle + Collectible',
      products: [PRODUCTS[17], PRODUCTS[19], PRODUCTS[23]],
      color: 'border-purple-200 bg-purple-50/20',
      badge: 'CYBER EDITION',
    },
  ];

  const handleAddLookToCart = (pList: typeof PRODUCTS) => {
    pList.forEach((p) => addToCart(p));
    showToast('Added full Lookbook bundle to cart!');
    setActiveModal('cart');
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
            <span>STYLE CURATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            YOUR GOOGLEVERSE LOOKBOOK<span className="text-[#4285F4]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Complete head-to-toe style kits designed for creators, developers, and tech explorers.
          </p>
        </div>

        {/* 3 Lookbook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {looks.map((look) => {
            const totalPrice = look.products.reduce((acc, p) => acc + p.price, 0);

            return (
              <div
                key={look.id}
                className={`p-6 rounded-3xl border ${look.color} shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6`}
              >
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
                      {look.number}
                    </span>
                    <span className="px-2.5 py-0.5 bg-white text-slate-900 text-[10px] font-bold rounded-full shadow-2xs border border-slate-200">
                      {look.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                      {look.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {look.tagline}
                    </p>
                  </div>

                  {/* Product Miniatures */}
                  <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-slate-200">
                    {look.products.map((p, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center space-y-1">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-contain bg-slate-50 p-1 rounded-xl"
                        />
                        <span className="text-[9px] font-bold text-slate-800 line-clamp-1">
                          {p.name}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs font-black text-slate-900">
                    <span>BUNDLE TOTAL:</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedProductForTryOn(look.products[0]);
                        setActiveModal('tryon');
                      }}
                      className="py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 flex items-center justify-center gap-1"
                    >
                      <Shirt className="w-3.5 h-3.5 text-[#4285F4]" />
                      <span>TRY LOOK</span>
                    </button>

                    <button
                      onClick={() => handleAddLookToCart(look.products)}
                      className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#FBBC05]" />
                      <span>ADD BUNDLE</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

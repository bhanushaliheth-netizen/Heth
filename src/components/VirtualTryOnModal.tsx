import React, { useState } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { Product, FitOption } from '../types';
import { PRODUCTS } from '../data/products';
import {
  X,
  UserCheck,
  ShoppingBag,
  Heart,
  RotateCcw,
  Sparkles,
  Share2,
  ChevronLeft,
  ChevronRight,
  Palette,
  Layers,
  Shirt,
} from 'lucide-react';

export const VirtualTryOnModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedProductForTryOn,
    setSelectedProductForTryOn,
    styleProfile,
    addToCart,
    saveLook,
    showToast,
  } = useGoogleVerse();

  // Selected Product (default to first apparel if none selected)
  const product: Product =
    selectedProductForTryOn || PRODUCTS.find((p) => p.tryOnAvailable) || PRODUCTS[1];

  // Try On Mode: 'photo' | 'avatar'
  const [tryOnMode, setTryOnMode] = useState<'photo' | 'avatar'>('avatar');

  // Customizer Controls inside Try-On
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedFit, setSelectedFit] = useState<FitOption>(product.fitOptions[0] || 'Relaxed');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Default');

  // Avatar Customization State
  const [avatarSkin, setAvatarSkin] = useState<'light' | 'medium' | 'dark'>('medium');
  const [avatarBg, setAvatarBg] = useState<'studio' | 'cyber' | 'minimal'>('studio');

  // Scale & Y-Offset adjustment for photo overlay
  const [overlayScale, setOverlayScale] = useState(1);
  const [overlayY, setOverlayY] = useState(0);

  if (activeModal !== 'tryon') return null;

  // Find index for Previous/Next product browsing in try-on
  const apparelProducts = PRODUCTS.filter((p) => p.tryOnAvailable);
  const currentIndex = apparelProducts.findIndex((p) => p.id === product.id);

  const handleNextProduct = () => {
    const nextIdx = (currentIndex + 1) % apparelProducts.length;
    setSelectedProductForTryOn(apparelProducts[nextIdx]);
  };

  const handlePrevProduct = () => {
    const prevIdx = (currentIndex - 1 + apparelProducts.length) % apparelProducts.length;
    setSelectedProductForTryOn(apparelProducts[prevIdx]);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, selectedFit);
    setActiveModal('cart');
  };

  const handleSaveLook = () => {
    saveLook(`Look: ${product.name}`, [product.id], styleProfile?.userImage, selectedFit);
  };

  const handleShareLook = () => {
    if (navigator.share) {
      navigator.share({
        title: `GoogleVerse Virtual Fit - ${product.name}`,
        text: `Check out how I look in the ${product.name} on GoogleVerse!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Copied look link to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Shirt className="w-4 h-4 text-[#4285F4]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">
                GOOGLEVERSE VIRTUAL FIT
              </h3>
              <p className="text-[11px] font-medium text-slate-500">
                Simulated apparel preview & virtual try-on sandbox
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Try-On Mode Switcher Pills */}
            <div className="bg-slate-200 p-1 rounded-full flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setTryOnMode('photo')}
                disabled={!styleProfile?.userImage}
                className={`px-3 py-1 rounded-full transition-all ${
                  tryOnMode === 'photo'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 disabled:opacity-40'
                }`}
                title={!styleProfile?.userImage ? 'Scan photo first to use Photo Try-On' : ''}
              >
                USE MY PHOTO
              </button>

              <button
                onClick={() => setTryOnMode('avatar')}
                className={`px-3 py-1 rounded-full transition-all ${
                  tryOnMode === 'avatar' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                USE MY AVATAR
              </button>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Canvas Preview Area */}
          <div className="lg:col-span-7 bg-slate-100 p-6 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[460px]">
            
            {/* Product Nav Prev / Next buttons */}
            <button
              onClick={handlePrevProduct}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-transform hover:scale-110 z-20"
              title="Previous apparel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextProduct}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-transform hover:scale-110 z-20"
              title="Next apparel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* PREVIEW CANVAS */}
            <div
              className={`relative w-full max-w-xs sm:max-w-sm h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 shadow-lg flex items-center justify-center transition-all ${
                avatarBg === 'cyber'
                  ? 'bg-slate-950'
                  : avatarBg === 'minimal'
                  ? 'bg-amber-50/40'
                  : 'bg-white'
              }`}
            >
              {/* MODE: PHOTO TRY-ON */}
              {tryOnMode === 'photo' && styleProfile?.userImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={styleProfile.userImage}
                    alt="User photo"
                    className="w-full h-full object-cover"
                  />
                  {/* Apparel Overlay Layer */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-200"
                    style={{
                      transform: `scale(${overlayScale}) translateY(${overlayY}px)`,
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-48 h-48 object-contain drop-shadow-2xl mix-blend-multiply opacity-90"
                    />
                  </div>
                </div>
              ) : (
                /* MODE: AVATAR TRY-ON */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  <svg viewBox="0 0 200 240" className="w-48 h-64 drop-shadow-xl">
                    {/* Background Glow */}
                    <circle cx="100" cy="120" r="90" fill={avatarBg === 'cyber' ? '#1e1b4b' : '#f1f5f9'} />
                    
                    {/* Skin Color */}
                    <circle
                      cx="100"
                      cy="60"
                      r="26"
                      fill={
                        avatarSkin === 'light'
                          ? '#fde047'
                          : avatarSkin === 'dark'
                          ? '#78350f'
                          : '#f97316'
                      }
                      opacity="0.8"
                    />

                    {/* Hair */}
                    <path d="M 74 58 C 74 35 126 35 126 58 C 120 40 80 40 74 58" fill="#1e293b" />

                    {/* Overlay Selected Apparel */}
                    <g transform={`scale(${selectedFit === 'Oversized' ? 1.08 : selectedFit === 'Slim' ? 0.92 : 1}) translate(0,0)`}>
                      <path
                        d="M 55 90 L 100 75 L 145 90 L 175 125 L 150 155 L 135 140 L 135 220 L 65 220 L 65 140 L 50 155 L 25 125 Z"
                        fill={selectedColor === 'White' || selectedColor === 'Off-White' ? '#f8fafc' : '#0f172a'}
                        stroke="#334155"
                        strokeWidth="2"
                      />
                      <path d="M 75 88 Q 100 110 125 88 Z" fill="#4285F4" opacity="0.8" />
                      <circle cx="100" cy="135" r="12" fill="#ffffff" />
                      <text x="100" y="139" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#0f172a" textAnchor="middle">
                        GV
                      </text>
                    </g>
                  </svg>

                  {/* Avatar Customize Quick Controls */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500 uppercase">Skin:</span>
                    <div className="flex gap-1">
                      {(['light', 'medium', 'dark'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setAvatarSkin(s)}
                          className={`w-4 h-4 rounded-full border ${
                            s === 'light' ? 'bg-amber-200' : s === 'medium' ? 'bg-orange-400' : 'bg-amber-900'
                          } ${avatarSkin === s ? 'ring-2 ring-slate-900' : ''}`}
                        />
                      ))}
                    </div>

                    <span className="text-slate-500 uppercase ml-2">Bg:</span>
                    <div className="flex gap-1">
                      {(['studio', 'cyber', 'minimal'] as const).map((b) => (
                        <button
                          key={b}
                          onClick={() => setAvatarBg(b)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            avatarBg === b ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scale Adjuster for Photo Mode */}
            {tryOnMode === 'photo' && styleProfile?.userImage && (
              <div className="mt-3 flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs text-xs font-semibold">
                <span className="text-slate-500 text-[11px] uppercase">Layer Fit:</span>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  value={overlayScale}
                  onChange={(e) => setOverlayScale(parseFloat(e.target.value))}
                  className="w-24 accent-slate-900"
                />
              </div>
            )}

            {/* Disclaimer Mandate */}
            <p className="text-[10px] text-slate-400 text-center mt-3 max-w-sm">
              “Virtual preview is an illustrative visualization and may not represent exact fit or final physical appearance.”
            </p>
          </div>

          {/* Right Product Details & Fit Controls Area */}
          <div className="lg:col-span-5 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Product Header */}
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#4285F4] uppercase">
                  {product.universe} UNIVERSE • {product.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-lg font-black text-slate-900">₹{product.price}</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-emerald-200">
                    94% STYLE MATCH
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  SIZE: <span className="text-slate-500 font-medium">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Option */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  FIT: <span className="text-slate-500 font-medium">{selectedFit}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.fitOptions.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFit(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedFit === f
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colorways */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  COLOR: <span className="text-slate-500 font-medium">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedColor === c
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Try-On Actions Bar */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSaveLook}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>SAVE LOOK</span>
                </button>

                <button
                  onClick={handleShareLook}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4 text-slate-700" />
                  <span>SHARE LOOK</span>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#FBBC05]" />
                <span>ADD TO CART — ₹{product.price}</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

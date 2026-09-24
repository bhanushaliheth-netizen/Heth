import React, { useState, useRef } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { Product, FitOption } from '../types';
import { PRODUCTS } from '../data/products';
import {
  X,
  ShoppingBag,
  Heart,
  Sparkles,
  Share2,
  ChevronLeft,
  ChevronRight,
  Shirt,
  Upload,
  Move,
  RotateCw,
  Sliders,
  Layers,
  Sun,
  Eye,
  Download,
  CheckCircle2,
  Scan,
} from 'lucide-react';

const MODEL_PRESETS = [
  {
    id: 'preset-1',
    name: 'Dev Lead',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preset-2',
    name: 'Tech Creator',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preset-3',
    name: 'Studio Minimal',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  },
];

export const VirtualTryOnModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedProductForTryOn,
    setSelectedProductForTryOn,
    styleProfile,
    updateStyleProfile,
    addToCart,
    saveLook,
    showToast,
  } = useGoogleVerse();

  // Selected Product (default to first apparel if none selected)
  const product: Product =
    selectedProductForTryOn || PRODUCTS.find((p) => p.tryOnAvailable) || PRODUCTS[1];

  // Try On Mode: 'photo' | 'avatar'
  const [tryOnMode, setTryOnMode] = useState<'photo' | 'avatar'>('photo');

  // Selected Photo URL (User photo or preset model)
  const [activePhotoUrl, setActivePhotoUrl] = useState<string>(
    styleProfile?.userImage || MODEL_PRESETS[0].url
  );

  // Customizer Controls inside Try-On
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedFit, setSelectedFit] = useState<FitOption>(product.fitOptions[0] || 'Relaxed');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Default');

  // Avatar Customization State
  const [avatarSkin, setAvatarSkin] = useState<'light' | 'medium' | 'dark'>('medium');
  const [avatarBg, setAvatarBg] = useState<'studio' | 'cyber' | 'minimal'>('studio');

  // Precision Fitting Controls for Photo Mode Overlay
  const [overlayScale, setOverlayScale] = useState<number>(1.0);
  const [overlayX, setOverlayX] = useState<number>(0);
  const [overlayY, setOverlayY] = useState<number>(0);
  const [overlayRotation, setOverlayRotation] = useState<number>(0);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(100);
  const [blendMode, setBlendMode] = useState<'normal' | 'multiply' | 'overlay' | 'soft-light'>('normal');
  const [brightness, setBrightness] = useState<number>(100);
  const [showPoseGrid, setShowPoseGrid] = useState<boolean>(true);

  // Interactive Dragging State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; origX: number; origY: number }>({
    x: 0,
    y: 0,
    origX: 0,
    origY: 0,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    saveLook(`Look: ${product.name}`, [product.id], activePhotoUrl, selectedFit);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setActivePhotoUrl(url);
        updateStyleProfile({ userImage: url });
        showToast('Uploaded custom photo for Virtual Fit!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag Handlers for overlay positioning
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: overlayX,
      origY: overlayY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setOverlayX(dragStartRef.current.origX + deltaX);
    setOverlayY(dragStartRef.current.origY + deltaY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const autoAlignTorso = () => {
    setOverlayX(0);
    setOverlayY(15);
    setOverlayScale(1.05);
    setOverlayRotation(0);
    showToast('Auto-aligned to torso area');
  };

  const autoAlignShoulders = () => {
    setOverlayX(0);
    setOverlayY(-10);
    setOverlayScale(1.15);
    setOverlayRotation(0);
    showToast('Auto-aligned to shoulder line');
  };

  const resetFitting = () => {
    setOverlayX(0);
    setOverlayY(0);
    setOverlayScale(1.0);
    setOverlayRotation(0);
    setOverlayOpacity(100);
    setBlendMode('normal');
    setBrightness(100);
    showToast('Reset apparel fitting adjustments');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              <Shirt className="w-4 h-4 text-[#4285F4]" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <span>GOOGLEVERSE VIRTUAL FIT STUDIO</span>
                <span className="px-2 py-0.5 bg-[#4285F4]/10 text-[#4285F4] text-[9px] rounded-full border border-[#4285F4]/20 font-bold">
                  AI PRECISION
                </span>
              </h3>
              <p className="text-[11px] font-bold text-gray-400">
                Position, scale & blend apparel onto your photo or 3D avatar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Try-On Mode Switcher Pills */}
            <div className="bg-gray-200 p-1 rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-wider">
              <button
                onClick={() => setTryOnMode('photo')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  tryOnMode === 'photo'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                PHOTO TRY-ON
              </button>

              <button
                onClick={() => setTryOnMode('avatar')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  tryOnMode === 'avatar' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                AVATAR FIT
              </button>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Canvas & Controls Area */}
          <div className="lg:col-span-7 bg-gray-950 p-6 flex flex-col items-center justify-between relative min-h-[460px]">
            
            {/* Product Nav Prev / Next buttons */}
            <button
              onClick={handlePrevProduct}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-gray-800 shadow-xl transition-all hover:scale-110 z-20 cursor-pointer"
              title="Previous apparel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextProduct}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-gray-800 shadow-xl transition-all hover:scale-110 z-20 cursor-pointer"
              title="Next apparel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Photo Preset Selector Bar in Photo Mode */}
            {tryOnMode === 'photo' && (
              <div className="w-full flex items-center justify-between bg-black/60 border border-gray-800/80 px-4 py-2 rounded-2xl mb-4 text-xs z-10 backdrop-blur-md">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Scan className="w-3.5 h-3.5 text-[#4285F4]" />
                  <span>MODEL PHOTO:</span>
                </span>

                <div className="flex items-center gap-2 overflow-x-auto">
                  {/* Preset Model Buttons */}
                  {MODEL_PRESETS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActivePhotoUrl(m.url)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer ${
                        activePhotoUrl === m.url
                          ? 'bg-[#4285F4] text-white shadow-sm'
                          : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <img src={m.url} className="w-3.5 h-3.5 rounded-full object-cover" />
                      <span>{m.name}</span>
                    </button>
                  ))}

                  {/* Upload Own Photo Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-900 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm cursor-pointer transition-transform hover:scale-105"
                  >
                    <Upload className="w-3 h-3 text-[#EA4335]" />
                    <span>UPLOAD PHOTO</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* PREVIEW CANVAS */}
            <div
              className="relative w-full max-w-sm h-[360px] sm:h-[400px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex items-center justify-center bg-black cursor-grab active:cursor-grabbing group select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* MODE: PHOTO TRY-ON */}
              {tryOnMode === 'photo' ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Background User / Model Photo */}
                  <img
                    src={activePhotoUrl}
                    alt="Target Photo"
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* Simulated AI Pose Tracking Grid Overlay */}
                  {showPoseGrid && (
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Shoulder / Chest Pose Points */}
                        <circle cx="35" cy="35" r="1.5" fill="#4285F4" className="animate-ping" />
                        <circle cx="65" cy="35" r="1.5" fill="#4285F4" className="animate-ping" />
                        <circle cx="50" cy="48" r="1.5" fill="#34A853" />
                        <line x1="35" y1="35" x2="65" y2="35" stroke="#4285F4" strokeWidth="0.5" strokeDasharray="1 1" />
                        <line x1="50" y1="25" x2="50" y2="70" stroke="#34A853" strokeWidth="0.5" strokeDasharray="1 1" />
                        <path d="M 30 35 Q 50 38 70 35" fill="none" stroke="#FBBC05" strokeWidth="0.5" />
                      </svg>
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-[9px] font-black text-green-400 px-2 py-0.5 rounded-md border border-green-500/30 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        <span>AI POSE MAPPED</span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Apparel Overlay Layer */}
                  <div
                    className="absolute transition-transform duration-75 flex items-center justify-center"
                    style={{
                      transform: `translate(${overlayX}px, ${overlayY}px) scale(${overlayScale}) rotate(${overlayRotation}deg)`,
                      opacity: overlayOpacity / 100,
                      filter: `brightness(${brightness}%)`,
                      mixBlendMode: blendMode,
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-56 h-56 object-contain pointer-events-none drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                    />

                    {/* Drag Helper Box Indicator */}
                    <div className="absolute inset-0 border border-dashed border-[#4285F4] opacity-0 group-hover:opacity-60 transition-opacity rounded-xl pointer-events-none flex items-center justify-center">
                      <Move className="w-5 h-5 text-white/80" />
                    </div>
                  </div>

                </div>
              ) : (
                /* MODE: AVATAR TRY-ON */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  <svg viewBox="0 0 200 240" className="w-48 h-64 drop-shadow-2xl">
                    <circle cx="100" cy="120" r="90" fill={avatarBg === 'cyber' ? '#1e1b4b' : avatarBg === 'minimal' ? '#fef3c7' : '#f1f5f9'} />
                    
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

                    <path d="M 74 58 C 74 35 126 35 126 58 C 120 40 80 40 74 58" fill="#1e293b" />

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

                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-2xl border border-gray-200 flex items-center justify-between text-[10px] font-black uppercase">
                    <span className="text-gray-500">SKIN:</span>
                    <div className="flex gap-1.5">
                      {(['light', 'medium', 'dark'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setAvatarSkin(s)}
                          className={`w-4 h-4 rounded-full border cursor-pointer ${
                            s === 'light' ? 'bg-amber-200' : s === 'medium' ? 'bg-orange-400' : 'bg-amber-900'
                          } ${avatarSkin === s ? 'ring-2 ring-black' : ''}`}
                        />
                      ))}
                    </div>

                    <span className="text-gray-500 ml-2">BG:</span>
                    <div className="flex gap-1">
                      {(['studio', 'cyber', 'minimal'] as const).map((b) => (
                        <button
                          key={b}
                          onClick={() => setAvatarBg(b)}
                          className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase cursor-pointer ${
                            avatarBg === b ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
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

            {/* Precision Adjustment Toolbar in Photo Mode */}
            {tryOnMode === 'photo' && (
              <div className="w-full bg-black/80 border border-gray-800 p-3 rounded-2xl mt-3 text-white space-y-2 backdrop-blur-md">
                
                {/* Drag Hint & Quick Auto Align Buttons */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1 text-[#4285F4]">
                    <Move className="w-3 h-3" />
                    <span>DRAG IMAGE TO POSITION ON BODY</span>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={autoAlignTorso}
                      className="px-2 py-0.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-[9px] cursor-pointer"
                    >
                      TORSO FIT
                    </button>
                    <button
                      onClick={autoAlignShoulders}
                      className="px-2 py-0.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-[9px] cursor-pointer"
                    >
                      SHOULDERS
                    </button>
                    <button
                      onClick={resetFitting}
                      className="px-2 py-0.5 bg-red-950 text-red-300 hover:bg-red-900 rounded text-[9px] cursor-pointer"
                    >
                      RESET
                    </button>
                  </div>
                </div>

                {/* Adjustment Sliders Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-extrabold uppercase">
                  
                  {/* Size / Scale */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-gray-400">
                      <span>SCALE:</span>
                      <span>{Math.round(overlayScale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.6"
                      max="1.5"
                      step="0.05"
                      value={overlayScale}
                      onChange={(e) => setOverlayScale(parseFloat(e.target.value))}
                      className="w-full accent-[#4285F4] h-1 bg-gray-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Rotation */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-gray-400">
                      <span>ANGLE:</span>
                      <span>{overlayRotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-25"
                      max="25"
                      step="1"
                      value={overlayRotation}
                      onChange={(e) => setOverlayRotation(parseInt(e.target.value))}
                      className="w-full accent-[#FBBC05] h-1 bg-gray-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Lighting */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-gray-400">
                      <span>LIGHTING:</span>
                      <span>{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="130"
                      step="5"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full accent-[#34A853] h-1 bg-gray-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Blend Mode */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-gray-400">
                      <span>BLEND:</span>
                      <span className="text-white">{blendMode}</span>
                    </div>
                    <select
                      value={blendMode}
                      onChange={(e) => setBlendMode(e.target.value as any)}
                      className="w-full bg-gray-900 border border-gray-700 text-white text-[9px] rounded px-1.5 py-0.5 outline-none font-bold cursor-pointer"
                    >
                      <option value="normal">Normal (Solid)</option>
                      <option value="multiply">Multiply (Shadows)</option>
                      <option value="overlay">Overlay (Vibrant)</option>
                      <option value="soft-light">Soft Light (Studio)</option>
                    </select>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Right Product Details & Fit Controls Area */}
          <div className="lg:col-span-5 p-6 space-y-5 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              
              {/* Product Header */}
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#4285F4] uppercase block">
                  {product.universe} UNIVERSE • {product.category}
                </span>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-2xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black border border-green-200 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-green-600" />
                    <span>94% STYLE MATCH</span>
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-900 uppercase tracking-wider block">
                  SELECT SIZE: <span className="text-gray-500 font-bold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Option */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-900 uppercase tracking-wider block">
                  FIT CUT: <span className="text-gray-500 font-bold">{selectedFit}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.fitOptions.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFit(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        selectedFit === f
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colorways */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-900 uppercase tracking-wider block">
                  COLORWAY: <span className="text-gray-500 font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Try-On Actions Bar */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSaveLook}
                  className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-black uppercase tracking-wider rounded-2xl border border-gray-200 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>SAVE LOOK</span>
                </button>

                <button
                  onClick={handleShareLook}
                  className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-black uppercase tracking-wider rounded-2xl border border-gray-200 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Share2 className="w-4 h-4 text-gray-700" />
                  <span>SHARE LOOK</span>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-black hover:bg-gray-800 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
              >
                <ShoppingBag className="w-4 h-4 text-[#FBBC05]" />
                <span>ADD TO CART — ₹{product.price.toLocaleString()}</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};


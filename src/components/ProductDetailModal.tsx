import React, { useState } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { FitOption } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { X, ShoppingBag, Heart, Shirt, Sparkles, Star, Check } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedProductForDetail,
    setSelectedProductForTryOn,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useGoogleVerse();

  const product = selectedProductForDetail;

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFit, setSelectedFit] = useState<FitOption>('Relaxed');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (activeModal !== 'detail' || !product) return null;

  const currentSize = selectedSize || product.sizes[0] || 'M';
  const currentColor = selectedColor || product.colors[0] || 'Default';
  const isWishlisted = wishlist.includes(product.id);

  // Complete The Look recommendations (3 items from same universe or category)
  const completeLookProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.universe === product.universe || p.category === product.category)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, selectedFit);
    setActiveModal('cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <span className="text-xs font-black tracking-wider text-[#4285F4] uppercase">
            GOOGLEVERSE MERCH • {product.universe}
          </span>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Product Image Gallery */}
            <div className="md:col-span-6 bg-slate-50 rounded-2xl p-8 border border-slate-200/80 flex items-center justify-center relative min-h-[300px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-72 object-contain"
              />
              <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-2xs border border-slate-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>94% STYLE MATCH</span>
              </span>
            </div>

            {/* Product Specifications & Options */}
            <div className="md:col-span-6 space-y-5">
              
              <div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-2xl font-black text-slate-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  SIZE: <span className="text-slate-500 font-medium">{currentSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        currentSize === sz
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit options */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  FIT PREFERENCE
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

              {/* Colors */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  COLORWAY: <span className="text-slate-500 font-medium">{currentColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        currentColor === c
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FBBC05]" />
                    <span>ADD TO CART — ₹{product.price}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {product.tryOnAvailable && (
                  <button
                    onClick={() => {
                      setSelectedProductForTryOn(product);
                      setActiveModal('tryon');
                    }}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-2"
                  >
                    <Shirt className="w-4 h-4 text-[#4285F4]" />
                    <span>TRY THIS PRODUCT ON YOUR PHOTO / AVATAR</span>
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* COMPLETE THE LOOK SECTION */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              COMPLETE THE LOOK
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {completeLookProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Product } from '../types';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { Heart, ShoppingBag, Sparkles, Shirt } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  styleMatch?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, styleMatch = 94 }) => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    setSelectedProductForDetail,
    setSelectedProductForTryOn,
    setActiveModal,
  } = useGoogleVerse();

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Badges Area */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        
        {/* Style Match Badge or Limited Badge */}
        {product.limited ? (
          <span className="bg-black text-[#FBBC05] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-gray-800 pointer-events-auto">
            LIMITED DROP
          </span>
        ) : (
          <span className="bg-white/95 backdrop-blur-xs text-[#4285F4] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-gray-200 flex items-center gap-1 pointer-events-auto">
            <Sparkles className="w-3 h-3 text-[#4285F4]" />
            <span>{styleMatch}% MATCH</span>
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-full backdrop-blur-xs transition-transform hover:scale-110 pointer-events-auto ${
            isWishlisted
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-slate-700 shadow-2xs'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

      </div>

      {/* Product Image Stage */}
      <div
        onClick={() => {
          setSelectedProductForDetail(product);
          setActiveModal('detail');
        }}
        className="relative w-full h-56 sm:h-64 bg-slate-50 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick Try-On Overlay Button */}
        {product.tryOnAvailable && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProductForTryOn(product);
                setActiveModal('tryon');
              }}
              className="w-full py-2 bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <Shirt className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>TRY IT ON</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Info & Actions */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between border-t border-slate-100">
        <div
          onClick={() => {
            setSelectedProductForDetail(product);
            setActiveModal('detail');
          }}
          className="cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {product.universe}
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              ★ {product.rating} ({product.reviewCount})
            </span>
          </div>

          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate group-hover:text-[#4285F4] transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] text-slate-500 line-clamp-1">
            {product.description}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
          <div>
            <span className="text-xs sm:text-sm font-black text-gray-900 tracking-tight">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#FBBC05]" />
            <span>ADD</span>
          </button>
        </div>
      </div>

    </div>
  );
};

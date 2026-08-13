import React, { useState } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Tag, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotalPrice,
    activeModal,
    setActiveModal,
  } = useGoogleVerse();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  if (activeModal !== 'cart') return null;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'GOOGLEVERSE' || promoCode.toUpperCase() === 'STUDENT') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const finalPrice = Math.max(0, cartTotalPrice * (1 - discount / 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-slate-900" />
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">
              YOUR CART ({cart.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain bg-slate-50 p-1 rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Size: {item.size} • Fit: {item.fit}
                  </div>
                  {item.customText && (
                    <div className="text-[9px] font-bold text-[#4285F4]">
                      Custom: "{item.customText}"
                    </div>
                  )}
                  <div className="text-xs font-black text-slate-900 pt-1">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 text-xs font-bold">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-0.5 hover:bg-slate-200 text-slate-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-0.5 hover:bg-slate-200 text-slate-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-500 space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs font-bold uppercase">YOUR CART IS EMPTY</p>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full"
              >
                BROWSE MERCH
              </button>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 space-y-3">
            
            {/* Promo Code input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. STUDENT)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none uppercase"
              />
              <button
                onClick={handleApplyPromo}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300"
              >
                APPLY
              </button>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                <span>{discount}% PROMO DISCOUNT APPLIED</span>
                <span>-₹{(cartTotalPrice * (discount / 100)).toFixed(0)}</span>
              </div>
            )}

            <div className="space-y-1 pt-1 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>SUBTOTAL</span>
                <span>₹{cartTotalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>STANDARD SHIPPING</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-100">
                <span>TOTAL</span>
                <span>₹{finalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('checkout')}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 text-[#FBBC05]" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { FitOption, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SlidersHorizontal, Sparkles, ShoppingBag, X, Check, Type } from 'lucide-react';

export const Customizer: React.FC = () => {
  const { activeModal, setActiveModal, addToCart, showToast } = useGoogleVerse();

  const [itemType, setItemType] = useState<'tee' | 'hoodie' | 'cap'>('tee');
  const [color, setColor] = useState<'#0f172a' | '#4285F4' | '#EA4335' | '#f8fafc'>('#0f172a');
  const [size, setSize] = useState('M');
  const [fit, setFit] = useState<FitOption>('Relaxed');
  const [customText, setCustomText] = useState('HELLO WORLD');
  const [iconBadge, setIconBadge] = useState<'g' | 'android' | 'play' | 'ai'>('g');

  if (activeModal !== 'customizer') return null;

  const handleAddCustomToCart = () => {
    const baseProduct: Product =
      itemType === 'tee' ? PRODUCTS[0] : itemType === 'hoodie' ? PRODUCTS[1] : PRODUCTS[2];

    const customProduct: Product = {
      ...baseProduct,
      id: `custom-${Date.now()}`,
      name: `Custom ${itemType.toUpperCase()} - "${customText}"`,
      price: baseProduct.price + 300,
    };

    addToCart(
      customProduct,
      size,
      color === '#0f172a' ? 'Obsidian' : color === '#4285F4' ? 'Google Blue' : 'Studio Red',
      fit,
      1,
      customText,
      iconBadge
    );

    showToast('Added custom merchandise to cart!');
    setActiveModal('cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <SlidersHorizontal className="w-4 h-4 text-[#FBBC05]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">
                MAKE IT YOURS.
              </h3>
              <p className="text-[11px] font-medium text-slate-500">
                Interactive apparel customizer & live print laboratory
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customizer Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Live Interactive SVG Canvas */}
          <div className="md:col-span-6 bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center relative min-h-[300px]">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                {itemType === 'tee' && (
                  <path
                    d="M 60,30 L 100,15 L 140,30 L 180,60 L 155,90 L 140,75 L 140,170 L 60,170 L 60,75 L 45,90 L 20,60 Z"
                    fill={color}
                    stroke="#334155"
                    strokeWidth="2"
                  />
                )}
                {itemType === 'hoodie' && (
                  <path
                    d="M 60,40 L 100,20 L 140,40 L 185,70 L 160,105 L 145,90 L 145,180 L 55,180 L 55,90 L 40,105 L 15,70 Z"
                    fill={color}
                    stroke="#334155"
                    strokeWidth="2"
                  />
                )}
                {itemType === 'cap' && (
                  <path d="M 40,120 Q 100,50 160,120 Z" fill={color} stroke="#334155" strokeWidth="2" />
                )}

                {/* Badge Icon */}
                <circle cx="100" cy="100" r="14" fill="#ffffff" stroke="#334155" strokeWidth="1" />
                <text
                  x="100"
                  y="104"
                  fontFamily="sans-serif"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#0f172a"
                  textAnchor="middle"
                >
                  {iconBadge === 'g' ? 'G' : iconBadge === 'android' ? '🤖' : iconBadge === 'play' ? '▶' : '✨'}
                </text>

                {/* Custom Text Print */}
                <text
                  x="100"
                  y="130"
                  fontFamily="monospace"
                  fontSize="8"
                  fontWeight="bold"
                  fill={color === '#f8fafc' ? '#0f172a' : '#ffffff'}
                  textAnchor="middle"
                >
                  {customText.toUpperCase()}
                </text>
              </svg>
            </div>

            <span className="text-[11px] font-bold text-slate-500 uppercase mt-2">
              LIVE CUSTOM PRINT PREVIEW
            </span>
          </div>

          {/* Controls Form */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Apparel Base Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                PRODUCT TYPE
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['tee', 'hoodie', 'cap'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setItemType(t)}
                    className={`py-2 rounded-xl text-xs font-bold uppercase border transition-all ${
                      itemType === t
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Text Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                CUSTOM EMBROIDERED TEXT
              </label>
              <input
                type="text"
                maxLength={16}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-800 uppercase"
                placeholder="e.g. HELLO WORLD"
              />
            </div>

            {/* Icon Emblem Choice */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                ICON BADGE
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'g', label: 'G-Icon' },
                  { id: 'android', label: 'Bugdroid' },
                  { id: 'play', label: 'Play' },
                  { id: 'ai', label: 'Gemini' },
                ].map((badge) => (
                  <button
                    key={badge.id}
                    onClick={() => setIconBadge(badge.id as any)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      iconBadge === badge.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {badge.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Base Color Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                BASE COLORWAY
              </label>
              <div className="flex gap-2">
                {[
                  { hex: '#0f172a', name: 'Obsidian' },
                  { hex: '#4285F4', name: 'Google Blue' },
                  { hex: '#EA4335', name: 'Studio Red' },
                  { hex: '#f8fafc', name: 'Cloud White' },
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex as any)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      color === c.hex ? 'ring-2 ring-slate-900 scale-105' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size & Fit */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-extrabold text-slate-900 uppercase block mb-1">
                  SIZE
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-slate-900 uppercase block mb-1">
                  FIT
                </label>
                <select
                  value={fit}
                  onChange={(e) => setFit(e.target.value as FitOption)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
                >
                  <option value="Relaxed">Relaxed</option>
                  <option value="Regular">Regular</option>
                  <option value="Oversized">Oversized</option>
                  <option value="Slim">Slim</option>
                </select>
              </div>
            </div>

            {/* Add Custom Product Button */}
            <button
              onClick={handleAddCustomToCart}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 pt-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#FBBC05]" />
              <span>ADD CUSTOM PRODUCT TO CART — ₹1,799</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { Universe } from '../types';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  User,
  Camera,
  Search,
  SlidersHorizontal,
  Compass,
  Trophy,
  Menu,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    userXP,
    selectedUniverse,
    setSelectedUniverse,
    searchQuery,
    setSearchQuery,
    setActiveModal,
  } = useGoogleVerse();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const universes: { id: Universe; label: string; icon?: string }[] = [
    { id: 'ALL', label: 'ALL WORLDS' },
    { id: 'GOOGLE', label: 'GOOGLE' },
    { id: 'ANDROID', label: 'ANDROID' },
    { id: 'YOUTUBE', label: 'YOUTUBE' },
    { id: 'AI', label: 'AI' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Student Badge */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedUniverse('ALL');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                <span className="flex items-center">
                  G<span className="text-[#4285F4]">•</span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                    GOOGLE<span className="text-slate-400">VERSE</span>
                  </span>
                  <div className="flex gap-0.5 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>
                  </div>
                </div>
                <span className="text-[10px] font-medium tracking-widest text-slate-500 uppercase -mt-1">
                  WEAR THE INTERNET
                </span>
              </div>
            </a>
          </div>

          {/* Universe Filter Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            {universes.map((uni) => (
              <button
                key={uni.id}
                onClick={() => setSelectedUniverse(uni.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  selectedUniverse === uni.id
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {uni.label}
              </button>
            ))}
          </nav>

          {/* Actions Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input (Expandable) */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-slate-300 w-40 sm:w-64 animate-in fade-in duration-200">
                  <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    placeholder="Search merch..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent text-xs text-slate-900 focus:outline-none placeholder:text-slate-400"
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      setSearchQuery('');
                    }}
                    className="text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* AI Scanner & Gemini Guide CTAs */}
            <button
              onClick={() => setActiveModal('scanner')}
              className="relative px-4 py-2 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md hover:bg-gray-800 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
              <span>GEMINI GUIDE</span>
            </button>

            {/* Quiz Button */}
            <button
              onClick={() => setActiveModal('quiz')}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-full border border-slate-200 transition-colors"
              title="Identity Quiz"
            >
              <Compass className="w-4 h-4 text-[#4285F4]" />
              <span>QUIZ</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveModal('profile')}
              className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#EA4335] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setActiveModal('cart')}
              className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#4285F4] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* XP Profile Badge */}
            <button
              onClick={() => setActiveModal('profile')}
              className="flex items-center gap-1.5 pl-2 pr-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <Trophy className="w-3.5 h-3.5" />
              </div>
              <span className="hidden xs:inline">Lv.{userXP.level}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Universes</span>
            <div className="grid grid-cols-2 gap-2">
              {universes.map((uni) => (
                <button
                  key={uni.id}
                  onClick={() => {
                    setSelectedUniverse(uni.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-left ${
                    selectedUniverse === uni.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {uni.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveModal('scanner');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              <Camera className="w-4 h-4 text-[#FBBC05]" />
              <span>STYLE SCANNER</span>
            </button>

            <button
              onClick={() => {
                setActiveModal('quiz');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200"
            >
              <Compass className="w-4 h-4 text-[#4285F4]" />
              <span>IDENTITY QUIZ</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

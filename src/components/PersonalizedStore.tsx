import React, { useState, useMemo } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { PRODUCTS } from '../data/products';
import { ProductCategory, Universe } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, Search, Filter, Compass } from 'lucide-react';

export const PersonalizedStore: React.FC = () => {
  const {
    styleProfile,
    quizResult,
    searchQuery,
    setSearchQuery,
    selectedUniverse,
    setSelectedUniverse,
    selectedCategory,
    setSelectedCategory,
    setActiveModal,
  } = useGoogleVerse();

  const [activeTab, setActiveTab] = useState<'recommended' | 'bestMatch' | 'new' | 'complete'>('recommended');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');
  const [priceRange, setPriceRange] = useState<number>(5000);

  const categories: ProductCategory[] = ['ALL', 'APPAREL', 'ACCESSORIES', 'COLLECTIBLES', 'DESK', 'TECH'];
  const universes: Universe[] = ['ALL', 'GOOGLE', 'ANDROID', 'YOUTUBE', 'AI'];

  // Personalization Filter Logic
  const personalizedProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Universe Filter
    if (selectedUniverse !== 'ALL') {
      list = list.filter((p) => p.universe === selectedUniverse);
    }

    // Category Filter
    if (selectedCategory !== 'ALL') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Price Filter
    list = list.filter((p) => p.price <= priceRange);

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.universe.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Tab-based view sub-filter
    if (activeTab === 'bestMatch') {
      list = list.filter((p) => p.featured || p.styleTags.includes('Tech') || p.styleTags.includes('Minimal'));
    } else if (activeTab === 'new') {
      list = list.filter((p) => p.limited || p.rating >= 4.8);
    }

    // Sorting
    if (sortBy === 'priceAsc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedUniverse, selectedCategory, priceRange, searchQuery, activeTab, sortBy]);

  return (
    <section id="catalog" className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[#4285F4] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI RECOMMENDATION ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              MADE FOR YOUR VIBE<span className="text-[#EA4335]">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {styleProfile
                ? `Your style profile (${styleProfile.style} style, ${styleProfile.fit} fit) unlocked a personalized GoogleVerse.`
                : 'Complete the AI Style Scanner to unlock 94%+ style match personalization.'}
            </p>
          </div>

          {!styleProfile && (
            <button
              onClick={() => setActiveModal('scanner')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-2 self-start"
            >
              <Sparkles className="w-4 h-4 text-[#FBBC05]" />
              <span>UNLOCK STYLE SCAN MATCH</span>
            </button>
          )}
        </div>

        {/* Personalized Recommendation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'recommended', label: 'RECOMMENDED FOR YOU' },
            { id: 'bestMatch', label: 'BEST MATCH (90%+)' },
            { id: 'new', label: 'NEW FOR YOU' },
            { id: 'complete', label: 'COMPLETE THE LOOK' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wider transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Price Controls */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
            
            {/* Price Slider */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase">MAX PRICE:</span>
              <input
                type="range"
                min="500"
                max="5000"
                step="250"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-20 accent-slate-900"
              />
              <span className="text-slate-900">₹{priceRange}</span>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-900 font-bold focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="priceAsc">Price Low to High</option>
                <option value="priceDesc">Price High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* Product Grid (Desktop 4 col, Tablet 3 col, Mobile 2 col) */}
        {personalizedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {personalizedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-black text-slate-900 uppercase">
              NOTHING FOUND IN THIS UNIVERSE.
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or resetting universe filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedUniverse('ALL');
                setPriceRange(5000);
              }}
              className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-full mt-2"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

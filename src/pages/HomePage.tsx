import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  CheckCircle,
  Star,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  HERO_IMAGE,
  AUDIO_IMAGE,
  WORKSPACE_IMAGE,
  WELLNESS_IMAGE,
  BEAUTY_IMAGE
} from '../data/products';

interface HomePageProps {
  onSelectProduct: (productId: string) => void;
  onNavigateTab: (tab: string) => void;
  onSetCategoryFilter: (category: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onNavigateTab,
  onSetCategoryFilter
}) => {
  const { products } = useStore();
  const [heroPrompt, setHeroPrompt] = useState('');

  // Slices for sections
  const flashDeals = products.filter(p => p.tags.includes('flash-deal')).slice(0, 4);
  const trendingProducts = products.filter(p => p.tags.includes('trending')).slice(0, 4);
  const smartPicks = products.filter(p => p.tags.includes('smart-pick')).slice(0, 4);

  const categories = [
    { name: 'Electronics', count: '5 Essentials', icon: '🎧' },
    { name: 'Fashion', count: '4 Essentials', icon: '🧥' },
    { name: 'Beauty', count: '4 Essentials', icon: '🌿' },
    { name: 'Home', count: '4 Essentials', icon: '☕' },
    { name: 'Fitness', count: '4 Essentials', icon: '⚡' },
    { name: 'Accessories', count: '3 Essentials', icon: '⌚' },
    { name: 'Grocery', count: '4 Essentials', icon: '🍯' },
    { name: 'Travel', count: '4 Essentials', icon: '✈️' }
  ];

  const handleHeroSmartMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPrompt.trim()) {
      onNavigateTab(`smart-match?q=${encodeURIComponent(heroPrompt.trim())}`);
    } else {
      onNavigateTab('smart-match');
    }
  };

  const handleCategoryClick = (catName: string) => {
    onSetCategoryFilter(catName);
    onNavigateTab('shop');
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Flagship Hero Section */}
      <section className="relative overflow-hidden bg-stone-900 text-white rounded-2xl md:rounded-3xl border border-stone-800 shadow-xl mx-4 sm:mx-6 lg:mx-8 mt-4 md:mt-6">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Minimalist Curated Lifestyle"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 md:py-24 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Next-Generation Intelligent Commerce</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.08] text-balance">
              Shopping that understands you.
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Skip generic algorithmic clutter. Enter what you need, specify your budget, and allow NOVA Smart Match to pinpoint certified essentials tailored to your daily life.
            </p>

            {/* Interactive Hero Smart Match Bar */}
            <form
              onSubmit={handleHeroSmartMatchSubmit}
              className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 flex flex-col sm:flex-row gap-2 max-w-xl shadow-lg"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={heroPrompt}
                  onChange={e => setHeroPrompt(e.target.value)}
                  placeholder="e.g. Headphones under ₹3000 for studying and travel..."
                  className="w-full px-3.5 py-2.5 bg-transparent text-sm text-white placeholder-stone-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Match</span>
              </button>
            </form>

            {/* Quick Hero Proof stats */}
            <div className="pt-2 flex items-center gap-6 text-xs text-stone-400">
              <div>
                <span className="font-bold text-white font-mono-data text-sm">30+</span>
                <span className="ml-1.5">Curated Essentials</span>
              </div>
              <span>·</span>
              <div>
                <span className="font-bold text-white font-mono-data text-sm">100%</span>
                <span className="ml-1.5">Authenticity Guaranteed</span>
              </div>
              <span>·</span>
              <div>
                <span className="font-bold text-white font-mono-data text-sm">₹0</span>
                <span className="ml-1.5">Free Express &gt; ₹999</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Explore by Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
              Curated Departments
            </h2>
            <h3 className="text-2xl font-bold font-display text-stone-900 mt-1">
              Engineered for Every Dimension
            </h3>
          </div>
          <button
            onClick={() => {
              onSetCategoryFilter('All');
              onNavigateTab('shop');
            }}
            className="text-xs font-semibold text-stone-700 hover:text-emerald-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Departments</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-stone-200/80 hover:border-emerald-600 hover:shadow-sm transition-all duration-200 group text-center cursor-pointer"
            >
              <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {cat.name}
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Flash Deals Spotlight (Price Drop & Limited Supply) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100/70 rounded-2xl p-6 sm:p-8 border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wide">
                <Zap className="w-3.5 h-3.5 fill-rose-600" />
                <span>Limited Drops & Price Drops</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-stone-900 mt-1">
                Seasonal Spotlight Deals
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Verified price reductions on flagship studio audio, organic skincare, and travel essentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map(prod => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. NOVA Smart Match Editorial Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 text-white p-8 sm:p-12 overflow-hidden border border-emerald-900/40">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/60 border border-emerald-700/50 rounded-full text-xs text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Feature</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Have specific constraints in mind?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Tell NOVA what you want in plain words: "I need noise cancelling headphones under ₹3000 for travel" or "Gentle hydration serum under ₹1500". We calculate compatibility, match your exact budget, and show honest trade-offs.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('smart-match')}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Launch NOVA Smart Match</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Smart Picks (Staff & Algorithmic Favorites) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
              Tested & Proven
            </h2>
            <h3 className="text-2xl font-bold font-display text-stone-900 mt-1">
              Curator’s Smart Picks
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('shop')}
            className="text-xs font-semibold text-stone-700 hover:text-emerald-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Explore All Smart Picks</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {smartPicks.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 6. Four Curated Lifestyle Collections (Bento Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
            Cohesive Environments
          </h2>
          <h3 className="text-2xl font-bold font-display text-stone-900 mt-1">
            Curated Lifestyle Capsules
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Capsule 1: Minimalist Workspace */}
          <div
            onClick={() => {
              onSetCategoryFilter('Electronics');
              onNavigateTab('shop');
            }}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-[16/10] cursor-pointer border border-stone-200"
          >
            <img
              src={WORKSPACE_IMAGE}
              alt="Minimalist Workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-medium text-emerald-400">Capsule 01</span>
              <h4 className="text-xl sm:text-2xl font-bold font-display mt-1">
                The Focused Desk Setup
              </h4>
              <p className="text-xs text-stone-300 mt-1 max-w-md">
                Low-profile mechanical switches, glare-free monitor light bars, and solid oak valet trays.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-300">
                <span>View Setup Items</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Capsule 2: Botanical Wellness & Skincare */}
          <div
            onClick={() => {
              onSetCategoryFilter('Beauty');
              onNavigateTab('shop');
            }}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-[16/10] cursor-pointer border border-stone-200"
          >
            <img
              src={BEAUTY_IMAGE}
              alt="Botanical Skincare"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-medium text-emerald-400">Capsule 02</span>
              <h4 className="text-xl sm:text-2xl font-bold font-display mt-1">
                Pure Botanical Regimen
              </h4>
              <p className="text-xs text-stone-300 mt-1 max-w-md">
                Plant-derived squalane, active ceramides, and Kyoto hinoki cypress aromas.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-300">
                <span>Explore Skincare</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Capsule 3: Active Recovery & Movement */}
          <div
            onClick={() => {
              onSetCategoryFilter('Fitness');
              onNavigateTab('shop');
            }}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-[16/10] cursor-pointer border border-stone-200"
          >
            <img
              src={WELLNESS_IMAGE}
              alt="Active Recovery"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-medium text-emerald-400">Capsule 03</span>
              <h4 className="text-xl sm:text-2xl font-bold font-display mt-1">
                Natural Cork & Stainless Essentials
              </h4>
              <p className="text-xs text-stone-300 mt-1 max-w-md">
                Antimicrobial high-density cork yoga mats and 24h icy vacuum bottles.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-300">
                <span>Shop Movement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Capsule 4: Acoustic Studio Isolation */}
          <div
            onClick={() => {
              onSetCategoryFilter('Electronics');
              onNavigateTab('shop');
            }}
            className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-[16/10] cursor-pointer border border-stone-200"
          >
            <img
              src={AUDIO_IMAGE}
              alt="Acoustic Audio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-medium text-emerald-400">Capsule 04</span>
              <h4 className="text-xl sm:text-2xl font-bold font-display mt-1">
                Acoustic Clarity & Travel Sound
              </h4>
              <p className="text-xs text-stone-300 mt-1 max-w-md">
                Hybrid 38dB Active Noise Cancellation with biocellulose audio diaphragms.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-300">
                <span>Explore Audio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Trending Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Community Favorites</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-stone-900 mt-1">
              Trending Right Now
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('shop')}
            className="text-xs font-semibold text-stone-700 hover:text-emerald-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>See Entire Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 8. Attributable Testimonials (Adherent to Skill Constitution) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-stone-200 pt-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
              Verified Member Experiences
            </h2>
            <h3 className="text-2xl font-bold font-display text-stone-900 mt-1">
              Real shopping that respects your time.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-3">
              <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "NOVA Smart Match matched the Aether ANC headphones when I typed 'under ₹3000 for long study sessions'. The noise cancellation at this price is uncanny."
              </p>
              <div className="pt-2 border-t border-stone-100 text-xs">
                <span className="font-semibold text-stone-900">Dr. Rohit Sen</span>
                <span className="text-stone-400 block text-[11px]">Research Fellow, IISc Bengaluru</span>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-3">
              <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "No fake discount banners, no aggressive wheel spins. Just genuine design and fast delivery. The cork yoga mat is by far the best grip I’ve had."
              </p>
              <div className="pt-2 border-t border-stone-100 text-xs">
                <span className="font-semibold text-stone-900">Meera Nambiar</span>
                <span className="text-stone-400 block text-[11px]">Vinyasa Instructor, Mumbai</span>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-3">
              <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "The honest trade-offs breakdown in Smart Match is refreshing. It told me upfront the keyboard was low-profile, which helped me make the right call."
              </p>
              <div className="pt-2 border-t border-stone-100 text-xs">
                <span className="font-semibold text-stone-900">Aditya Roy</span>
                <span className="text-stone-400 block text-[11px]">Full Stack Architect, Gurgaon</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

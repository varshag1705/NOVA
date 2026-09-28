import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Heart,
  Sparkles,
  Search,
  User,
  SlidersHorizontal,
  X,
  Menu
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onSearchSubmit?: (query: string) => void;
  setSelectedProductId?: (id: string | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onSearchSubmit,
  setSelectedProductId
}) => {
  const {
    totalCartItemCount,
    wishlist,
    setIsCartDrawerOpen,
    compareList,
    setIsCompareOpen
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchQuery.trim());
      }
      setCurrentTab('shop');
      setIsSearchOpen(false);
    }
  };

  const handleNavClick = (tab: string) => {
    if (setSelectedProductId) setSelectedProductId(null);
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Promotional Top Ribbon - slim dismissible */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 text-center font-normal tracking-wide flex items-center justify-center gap-2">
        <span className="text-emerald-400 font-medium">NOVA Smart Match:</span>
        <span>AI-powered shopping curated to your exact budget & needs</span>
        <button
          onClick={() => handleNavClick('smart-match')}
          className="underline hover:text-white font-medium ml-2 cursor-pointer transition-colors"
        >
          Try Smart Match →
        </button>
      </div>

      {/* Main 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-xl md:text-2xl font-bold font-display tracking-tight text-stone-900 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 text-left"
          >
            NOVA CART
          </button>

          {/* Zone 2: Clean 4–6 text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                currentTab === 'home' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Discover
              {currentTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                currentTab === 'shop' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Shop Catalog
              {currentTab === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('smart-match')}
              className={`flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                currentTab === 'smart-match' ? 'text-emerald-800 font-semibold' : 'text-stone-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart Match</span>
              {currentTab === 'smart-match' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('tracking')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                currentTab === 'tracking' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Track Order
              {currentTab === 'tracking' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('profile')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                currentTab === 'profile' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Account
              {currentTab === 'profile' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Compare, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search products"
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Compare Drawer Trigger */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                title="Compare Products"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Compare</span>
                <span className="font-mono-data bg-stone-900 text-white rounded-full px-1.5 text-[10px]">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('wishlist')}
              aria-label="Wishlist"
              className="relative p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-700 text-white text-[10px] font-mono-data rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Cart"
              className="relative flex items-center gap-2 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="font-mono-data bg-emerald-700 text-white px-1.5 py-0.2 text-[11px] rounded-sm font-semibold">
                {totalCartItemCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {isSearchOpen && (
        <div className="border-t border-stone-200 bg-stone-50/90 px-4 py-3 animate-fadeIn">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, or keywords (e.g., ANC headphones, linen, matcha)..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
              currentTab === 'home' ? 'bg-stone-100 text-stone-950 font-semibold' : 'text-stone-700'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
              currentTab === 'shop' ? 'bg-stone-100 text-stone-950 font-semibold' : 'text-stone-700'
            }`}
          >
            Shop Catalog
          </button>
          <button
            onClick={() => handleNavClick('smart-match')}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between ${
              currentTab === 'smart-match' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-stone-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              NOVA Smart Match
            </span>
            <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-sm uppercase tracking-wider font-semibold">
              AI Match
            </span>
          </button>
          <button
            onClick={() => handleNavClick('wishlist')}
            className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 rounded-md transition-colors flex items-center justify-between"
          >
            <span>Saved Wishlist</span>
            <span className="font-mono-data text-xs text-stone-500">{wishlist.length}</span>
          </button>
          <button
            onClick={() => handleNavClick('tracking')}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
              currentTab === 'tracking' ? 'bg-stone-100 text-stone-950 font-semibold' : 'text-stone-700'
            }`}
          >
            Track Orders
          </button>
          <button
            onClick={() => handleNavClick('profile')}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
              currentTab === 'profile' ? 'bg-stone-100 text-stone-950 font-semibold' : 'text-stone-700'
            }`}
          >
            My Account & Addresses
          </button>
        </div>
      )}
    </header>
  );
};

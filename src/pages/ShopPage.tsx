import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES_LIST } from '../data/products';
import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface ShopPageProps {
  initialCategory?: string;
  initialSearch?: string;
  onSelectProduct: (productId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'All',
  initialSearch = '',
  onSelectProduct,
  onNavigateTab
}) => {
  const { products } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'savings'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceDropsOnly, setPriceDropsOnly] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // All unique brands
  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand))).sort();
  }, [products]);

  // Brand toggle
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(6000);
    setMinRating(0);
    setInStockOnly(false);
    setPriceDropsOnly(false);
    setSelectedBrands([]);
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (searchQuery.trim()) count++;
    if (maxPrice < 6000) count++;
    if (minRating > 0) count++;
    if (inStockOnly) count++;
    if (priceDropsOnly) count++;
    count += selectedBrands.length;
    return count;
  }, [selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, priceDropsOnly, selectedBrands]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q);
          if (!matches) return false;
        }
        // Price
        if (p.price > maxPrice) {
          return false;
        }
        // Rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        // In Stock
        if (inStockOnly && !p.inStock) {
          return false;
        }
        // Price drops
        if (priceDropsOnly && !p.isPriceDrop) {
          return false;
        }
        // Brands
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'savings') {
          const aSavings = ((a.originalPrice - a.price) / a.originalPrice);
          const bSavings = ((b.originalPrice - b.price) / b.originalPrice);
          return bSavings - aSavings;
        }
        return 0; // featured default order
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    maxPrice,
    minRating,
    inStockOnly,
    priceDropsOnly,
    selectedBrands,
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <button onClick={() => onNavigateTab('home')} className="hover:text-stone-900 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-stone-900 font-medium">Catalog</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-emerald-800 font-medium">{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
            {selectedCategory === 'All' ? 'All Curated Essentials' : selectedCategory}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Showing {filteredProducts.length} of {products.length} verified products
          </p>
        </div>

        {/* View mode & Sort controls */}
        <div className="flex items-center gap-3">
          {/* Smart Match nudge */}
          <button
            onClick={() => onNavigateTab('smart-match')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Smart Match Advisor</span>
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-stone-300 rounded-lg pl-3 pr-8 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="savings">Biggest Discount</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
          </div>

          {/* Grid/List switch */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters ({activeFilterCount})</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters Desktop */}
        <aside className={`md:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 md:sticky md:top-24 md:h-[calc(100vh-8rem)] md:overflow-y-auto pr-2`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-700" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Filters
              </h2>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-emerald-800 hover:underline font-medium cursor-pointer"
              >
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Search box inside filter */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1.5">
              Search Keywords
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Categories Segmented */}
          <div>
            <h3 className="text-xs font-semibold text-stone-700 mb-2">Category</h3>
            <div className="space-y-1 text-xs">
              {CATEGORIES_LIST.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white font-medium'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[11px] font-mono-data opacity-70">
                    {cat === 'All'
                      ? products.length
                      : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
              <span>Max Budget</span>
              <span className="font-mono-data text-stone-900">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="6000"
              step="250"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono-data mt-1">
              <span>₹500</span>
              <span>₹3,000</span>
              <span>₹6,000+</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="pt-2 border-t border-stone-100">
            <h3 className="text-xs font-semibold text-stone-700 mb-2">Customer Rating</h3>
            <div className="space-y-1.5 text-xs">
              {[4.8, 4.5, 4.0, 0].map(rating => (
                <label
                  key={rating}
                  className="flex items-center gap-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="minRating"
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    className="accent-emerald-700"
                  />
                  <span>{rating === 0 ? 'All Ratings' : `${rating}★ & above`}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="pt-2 border-t border-stone-100">
            <h3 className="text-xs font-semibold text-stone-700 mb-2">Artisan & Brand</h3>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-xs">
              {allBrands.map(brand => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-emerald-700 rounded-sm"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Checkboxes */}
          <div className="pt-2 border-t border-stone-100 space-y-2 text-xs">
            <label className="flex items-center gap-2 text-stone-700 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="accent-emerald-700 rounded-sm"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-2 text-emerald-800 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={priceDropsOnly}
                onChange={e => setPriceDropsOnly(e.target.checked)}
                className="accent-emerald-700 rounded-sm"
              />
              <span>Price-Dropped Items Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                No matching products found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your price range, clearing specific brand filters, or asking NOVA Smart Match for suggestions.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => onNavigateTab('smart-match')}
                  className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  Try NOVA Smart Match
                </button>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product.id)}
                  className="bg-white rounded-xl border border-stone-200/80 p-4 hover:border-stone-400 hover:shadow-sm transition-all flex flex-col sm:flex-row gap-5 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full sm:w-44 h-40 object-cover rounded-lg bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                        <span className="font-medium text-stone-700">{product.brand}</span>
                        <span>·</span>
                        <span>{product.category}</span>
                        <span>·</span>
                        <span className="text-amber-700 font-medium">★ {product.rating}</span>
                      </div>
                      <h3 className="text-base font-bold text-stone-900 hover:text-emerald-800 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-2">
                        <span className="font-medium text-emerald-800">Ideal for:</span>
                        <span>{product.smartMatchMeta.idealFor.slice(0, 3).join(', ')}</span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold font-mono-data text-stone-950">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs font-mono-data text-stone-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-emerald-800 font-semibold">
                        View Specifications →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

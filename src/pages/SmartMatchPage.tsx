import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { runNovaSmartMatch, parseQueryBudget } from '../utils/smartMatch';
import { SmartMatchResult } from '../types';
import { CATEGORIES_LIST, POPULAR_SMART_MATCH_PROMPTS } from '../data/products';
import {
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  RotateCcw,
  Zap,
  TrendingUp,
  Tag
} from 'lucide-react';

interface SmartMatchPageProps {
  initialQuery?: string;
  onSelectProduct: (productId: string) => void;
  onNavigateTab: (tab: string) => void;
}

const PRIORITY_TAGS = [
  'Noise Cancelling',
  'Long Battery Life',
  'Waterproof / Splashproof',
  'Ergonomic Comfort',
  'Organic / Pure',
  'Travel Lightweight',
  'Minimalist Design',
  'Eco-Friendly / Sustainable'
];

export const SmartMatchPage: React.FC<SmartMatchPageProps> = ({
  initialQuery = '',
  onSelectProduct,
  onNavigateTab
}) => {
  const { products, addToCart, toggleCompare, isInCompare, setIsCartDrawerOpen } = useStore();

  const [query, setQuery] = useState(
    initialQuery || 'headphones under ₹3000 for studying and travel'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [budgetLimit, setBudgetLimit] = useState<number>(3000);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(['Noise Cancelling', 'Long Battery Life']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SmartMatchResult[]>([]);

  // Toggle priority tag
  const togglePriority = (tag: string) => {
    setSelectedPriorities(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Run match
  const executeMatch = () => {
    setIsAnalyzing(true);

    // Auto-detect budget from text query if present
    const detectedBudget = parseQueryBudget(query);
    const activeBudget = detectedBudget || budgetLimit;
    if (detectedBudget && detectedBudget !== budgetLimit) {
      setBudgetLimit(detectedBudget);
    }

    setTimeout(() => {
      const matchResults = runNovaSmartMatch(
        {
          query,
          category: selectedCategory,
          maxBudget: activeBudget,
          priorities: selectedPriorities
        },
        products
      );
      setResults(matchResults);
      setIsAnalyzing(false);
    }, 450);
  };

  useEffect(() => {
    executeMatch();
  }, []);

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
    const detected = parseQueryBudget(prompt);
    if (detected) setBudgetLimit(detected);
    setIsAnalyzing(true);
    setTimeout(() => {
      const matchResults = runNovaSmartMatch(
        {
          query: prompt,
          category: selectedCategory,
          maxBudget: detected || budgetLimit,
          priorities: selectedPriorities
        },
        products
      );
      setResults(matchResults);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white rounded-2xl md:rounded-3xl p-6 sm:p-10 border border-emerald-900/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/70 border border-emerald-700/60 rounded-full text-xs text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>NOVA Smart Match Intelligence Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight">
            Shopping that understands you.
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
            Traditional filters show you everything that matches a keyword. NOVA Smart Match analyzes real material specs, battery life, honest user reviews, and your exact monetary ceiling to generate curated recommendations with transparent reasoning.
          </p>
        </div>
      </div>

      {/* Interactive Smart Match Console */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-2">
            1. Describe What You Need & Your Constraints
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && executeMatch()}
              placeholder="e.g. Headphones under ₹3000 for studying and travel, or organic serum under ₹1500..."
              className="w-full pl-4 pr-32 py-3 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all text-stone-900"
            />
            <button
              onClick={executeMatch}
              disabled={isAnalyzing}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? 'Matching...' : 'Match Now'}</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Query Inspiration */}
        <div>
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
            Sample Smart Prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SMART_MATCH_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(prompt)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                  query === prompt
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Fine-Tuning Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-stone-100">
          {/* Budget Limit Slider */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
              <span>Budget Cap</span>
              <span className="font-mono-data text-emerald-800 text-sm">
                ₹{budgetLimit.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="800"
              max="6000"
              step="100"
              value={budgetLimit}
              onChange={e => setBudgetLimit(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono-data">
              <span>₹800</span>
              <span>₹3,000</span>
              <span>₹6,000</span>
            </div>
          </div>

          {/* Department Filter */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-semibold text-stone-800 block">
              Department
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
            >
              {CATEGORIES_LIST.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Departments' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Key Priority Flags */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-semibold text-stone-800 block">
              Key Prioritized Attributes
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRIORITY_TAGS.map(tag => {
                const active = selectedPriorities.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => togglePriority(tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                      active
                        ? 'border-emerald-700 bg-emerald-800 text-white font-medium'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Match Results Display Stage */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <h2 className="text-lg font-bold font-display text-stone-900">
                Recommended Matches
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {results.length} items ranked by compatibility and budget fit
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span>Algorithm: Hybrid Semantic & Budget Fit</span>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-600 font-medium">
              Evaluating compatibility metrics, specs & budget bounds...
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-sm font-bold text-stone-900">No match for this specific combination</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your query or increasing your budget cap slightly.
            </p>
            <button
              onClick={() => {
                setBudgetLimit(4000);
                setSelectedCategory('All');
                setQuery('headphones under ₹3000 for studying and travel');
                executeMatch();
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
            >
              Reset to Default Prompt
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map(({ product, matchScore, reasons, budgetFit, savingsAmount }, index) => {
              const inComp = isInCompare(product.id);

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl border transition-all p-5 sm:p-6 shadow-xs relative overflow-hidden ${
                    index === 0
                      ? 'border-emerald-700/80 ring-1 ring-emerald-700/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {/* Top Match Ribbon for #1 */}
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-4 rounded-bl-xl flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Best Overall Match</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Product Image Stage */}
                    <div
                      onClick={() => onSelectProduct(product.id)}
                      className="lg:col-span-3 aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden cursor-pointer border border-stone-200"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-103 transition-transform"
                      />
                    </div>

                    {/* Middle: Details & Reasoning */}
                    <div className="lg:col-span-6 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                          <span className="font-semibold text-stone-800">{product.brand}</span>
                          <span>·</span>
                          <span>{product.category}</span>
                          <span>·</span>
                          <span className="text-amber-700 font-bold">★ {product.rating}</span>
                        </div>
                        <h3
                          onClick={() => onSelectProduct(product.id)}
                          className="text-base sm:text-lg font-bold font-display text-stone-900 hover:text-emerald-800 cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>

                      {/* Reasons Box */}
                      <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Why NOVA matched this for you:</span>
                        </span>
                        <ul className="text-xs text-stone-700 space-y-1">
                          {reasons.map((reason, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-1.5">
                              <span className="text-emerald-700 font-bold">•</span>
                              <span className="leading-snug">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Trade-off notice */}
                      <div className="text-[11px] text-stone-500 flex items-start gap-1.5 italic">
                        <span className="font-semibold text-stone-700 not-italic">Trade-off:</span>
                        <span>"{product.smartMatchMeta.tradeoffs}"</span>
                      </div>
                    </div>

                    {/* Right: Score, Price, Add to Cart */}
                    <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-4 pt-4 lg:pt-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-stone-100">
                      {/* Compatibility Gauge */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-stone-700">Match Score</span>
                          <span className="font-mono-data font-bold text-emerald-800 text-sm">
                            {matchScore}%
                          </span>
                        </div>
                        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                            style={{ width: `${matchScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Pricing */}
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold font-mono-data text-stone-950">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs font-mono-data text-stone-400 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        {savingsAmount > 0 && (
                          <span className="text-[11px] font-medium text-emerald-700 block mt-0.5">
                            ₹{savingsAmount.toLocaleString('en-IN')} under budget ceiling
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>

                        <div className="flex gap-2">
                          <button
                            onClick={() => onSelectProduct(product.id)}
                            className="flex-1 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg text-[11px] font-medium transition-colors text-center cursor-pointer"
                          >
                            Full Specs
                          </button>
                          <button
                            onClick={() => toggleCompare(product.id)}
                            className={`px-3 py-1.5 border rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                              inComp
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                                : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            {inComp ? 'Comparing' : 'Compare'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

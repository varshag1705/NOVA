import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CompareDrawer: React.FC = () => {
  const {
    compareList,
    products,
    removeFromCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen,
    addToCart
  } = useStore();

  if (!isCompareOpen || compareList.length === 0) return null;

  const compareProducts = compareList
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  // Gather unique spec keys across all compared products
  const allSpecKeys = Array.from(
    new Set(
      compareProducts.flatMap(p => Object.keys(p.specs))
    )
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCompareOpen(false)}
      />

      <div className="fixed inset-x-0 bottom-0 top-12 md:top-20 bg-white rounded-t-2xl shadow-2xl flex flex-col max-w-7xl mx-auto overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold font-display text-stone-900">
              Product Comparison
            </h2>
            <span className="text-xs font-mono-data text-stone-500">
              {compareProducts.length} of 4 items selected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="w-48 text-left py-3 px-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Product Details
                </th>
                {compareProducts.map(p => (
                  <th key={p.id} className="w-64 text-left py-3 px-4 relative align-top">
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute top-2 right-2 p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="space-y-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-36 object-cover rounded-lg bg-stone-100 border border-stone-200"
                      />
                      <div>
                        <span className="text-[11px] font-semibold text-stone-500">{p.brand}</span>
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-2 mt-0.5">
                          {p.name}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold font-mono-data text-stone-900">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="px-2.5 py-1 bg-stone-900 hover:bg-emerald-800 text-white text-[11px] font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {/* Category */}
              <tr>
                <td className="py-3 px-4 font-medium text-stone-600 bg-stone-50/50">Category</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="py-3 px-4 text-stone-800 font-medium">
                    {p.category}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="py-3 px-4 font-medium text-stone-600 bg-stone-50/50">Customer Rating</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="py-3 px-4 text-stone-800">
                    <span className="text-amber-700 font-bold">★ {p.rating}</span>
                    <span className="text-stone-400 ml-1">({p.reviewsCount} reviews)</span>
                  </td>
                ))}
              </tr>

              {/* Stock Status */}
              <tr>
                <td className="py-3 px-4 font-medium text-stone-600 bg-stone-50/50">Availability</td>
                {compareProducts.map(p => (
                  <td key={p.id} className="py-3 px-4">
                    {p.isLowStock ? (
                      <span className="text-amber-800 font-medium">Only {p.stockCount} left</span>
                    ) : (
                      <span className="text-emerald-700 font-medium">In Stock</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Key Highlights */}
              <tr>
                <td className="py-3 px-4 font-medium text-stone-600 bg-stone-50/50 align-top">
                  Key Strengths
                </td>
                {compareProducts.map(p => (
                  <td key={p.id} className="py-3 px-4 text-stone-700 align-top">
                    <ul className="space-y-1 list-disc list-inside text-[11px] text-stone-600">
                      {p.smartMatchMeta.strengths.slice(0, 2).map((s, idx) => (
                        <li key={idx} className="line-clamp-2">{s}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Honest Trade-off */}
              <tr>
                <td className="py-3 px-4 font-medium text-stone-600 bg-stone-50/50 align-top">
                  Trade-off Consideration
                </td>
                {compareProducts.map(p => (
                  <td key={p.id} className="py-3 px-4 text-[11px] text-stone-500 italic align-top">
                    "{p.smartMatchMeta.tradeoffs}"
                  </td>
                ))}
              </tr>

              {/* Specifications */}
              {allSpecKeys.map(key => (
                <tr key={key}>
                  <td className="py-2.5 px-4 font-medium text-stone-600 bg-stone-50/50">
                    {key}
                  </td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="py-2.5 px-4 text-stone-700 font-mono-data text-[11px]">
                      {p.specs[key] || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

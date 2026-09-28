import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Plus, Check, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare
  } = useStore();

  const [imgError, setImgError] = useState(false);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompare(product.id);
  };

  return (
    <div
      onClick={() => onSelectProduct(product.id)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/80 hover:border-stone-400/80 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <span className="text-xs font-mono-data text-stone-500 uppercase tracking-widest">{product.category}</span>
            <span className="text-xs font-medium text-stone-700 mt-1 line-clamp-1">{product.name}</span>
          </div>
        )}

        {/* Quiet text tags: Price drop or Low stock (Clean unboxed text, not pill badges) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isLowStock && (
            <span className="text-[11px] font-medium text-amber-900 bg-amber-50/95 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-amber-200/80">
              Only {product.stockCount || 3} left
            </span>
          )}
          {product.isPriceDrop && (
            <span className="text-[11px] font-medium text-emerald-900 bg-emerald-50/95 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-emerald-200/80">
              Price dropped ₹{product.priceDropAmount || 400}
            </span>
          )}
        </div>

        {/* Quick action icons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          {/* Wishlist */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label="Wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer shadow-xs ${
              inWish
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/90 text-stone-700 hover:text-rose-600 hover:bg-white border border-stone-200/60'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-current' : ''}`} />
          </button>

          {/* Compare */}
          <button
            type="button"
            onClick={handleToggleCompare}
            title={inComp ? 'Remove from compare' : 'Add to compare'}
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer shadow-xs ${
              inComp
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-white/90 text-stone-700 hover:text-emerald-700 hover:bg-white border border-stone-200/60'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 flex-wrap">
            <span className="font-medium text-stone-700">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-700 font-medium">★ {product.rating}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add To Cart Button Row */}
        <div className="pt-3.5 mt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-stone-950 font-mono-data">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through font-mono-data">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[11px] font-medium text-emerald-700">
                Save {discountPercent}%
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
              isAddedAnim
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {isAddedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

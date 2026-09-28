import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

interface WishlistPageProps {
  onSelectProduct: (productId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onSelectProduct,
  onNavigateTab
}) => {
  const { wishlist, products, addToCart, toggleWishlist, setIsCartDrawerOpen } = useStore();

  const wishlistedProducts = wishlist
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach(prod => {
      addToCart(prod, 1);
    });
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
            Saved Wishlist
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {wishlistedProducts.length} curated items saved for future consideration
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add All to Bag</span>
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">Your wishlist is empty</h3>
          <p className="text-xs text-stone-500">
            Click the heart icon on any product or smart match result to save items here.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('shop')}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Discover Catalog
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

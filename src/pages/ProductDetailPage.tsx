import React, { useState } from 'react';
import { Product, Review } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Heart,
  ShoppingBag,
  Zap,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  SlidersHorizontal,
  Plus,
  Minus,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
  onSelectProduct: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Devika Singhania',
    rating: 5,
    date: 'Sep 21, 2026',
    title: 'Precision craftsmanship that completely exceeds the price.',
    comment: 'The texture and build quality are phenomenal. It arrived in plastic-free recycled paper packaging within 2 days in Bengaluru. Exactly what I was looking for.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'Vikram Joshi',
    rating: 5,
    date: 'Sep 18, 2026',
    title: 'Solid daily driver. Smart Match got it right.',
    comment: 'I followed NOVA Smart Match recommendations based on my budget constraint, and the product delivered on every single bullet point.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'Ananya Rao',
    rating: 4,
    date: 'Sep 14, 2026',
    title: 'Very happy with the build quality',
    comment: 'High grade finishing. Packaging was immaculate and customer service was quick when I asked a question about delivery timing.',
    verifiedPurchase: true
  }
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onBack,
  onSelectProduct,
  onNavigateTab
}) => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setIsCartDrawerOpen,
    addToRecentlyViewed
  } = useStore();

  const product = products.find(p => p.id === productId) || products[0];

  // Record to recently viewed
  React.useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product?.id]);

  // Gallery images
  const allImages = [
    product.image,
    ...(product.additionalImages || [])
  ];
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Selections
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : undefined
  );

  // Tabs for Specs / Reviews / Smart Match breakdown
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'smart-match'>('specs');

  // Review submission state
  const [reviewsList, setReviewsList] = useState<Review[]>(INITIAL_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const savingsAmount = product.originalPrice - product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, { color: selectedColor, size: selectedSize });
    setIsCartDrawerOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, { color: selectedColor, size: selectedSize });
    onNavigateTab('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim() || 'Verified Purchase Feedback',
      comment: newReviewComment.trim(),
      verifiedPurchase: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  // Related products in the same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-3 text-xs text-stone-500">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-stone-700 hover:text-stone-900 font-semibold cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
        <span>·</span>
        <span>{product.category}</span>
        <span>·</span>
        <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Contiguous Purchase Module (PDP Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery Stage */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Stage Image */}
          <div className="relative aspect-[4/3] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
            <img
              src={allImages[selectedImgIndex] || product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Badges / indicators */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isLowStock && (
                <span className="text-xs font-semibold text-amber-900 bg-amber-50/95 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-amber-200">
                  Only {product.stockCount || 3} left in stock
                </span>
              )}
              {product.isPriceDrop && (
                <span className="text-xs font-semibold text-emerald-900 bg-emerald-50/95 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-emerald-200">
                  Price dropped by ₹{product.priceDropAmount || 400}
                </span>
              )}
            </div>

            {/* Quick compare toggle */}
            <button
              onClick={() => toggleCompare(product.id)}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                inComp
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white/90 text-stone-700 hover:text-emerald-700 border border-stone-200'
              }`}
              title="Add to Compare Matrix"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails row */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImgIndex === idx
                      ? 'border-emerald-700 shadow-sm'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Key Bullet Highlights */}
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-800">
              Key Engineering Highlights
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="font-semibold text-stone-800">{product.brand}</span>
                <span>·</span>
                <span>{product.category}</span>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">Verified Stock</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold font-display text-stone-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 mt-2.5">
                <div className="flex text-amber-600 items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-900">{product.rating}</span>
                <span className="text-xs text-stone-500 font-mono-data">
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="py-3 border-y border-stone-100 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold font-mono-data text-stone-950">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm font-mono-data text-stone-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Inclusive of all taxes (18% GST). Free shipping on this order.
                </p>
              </div>

              {discountPercent > 0 && (
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md block">
                    Save {discountPercent}%
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    ₹{savingsAmount.toLocaleString('en-IN')} off MRP
                  </span>
                </div>
              )}
            </div>

            {/* Color variants if any */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-2">
                  Finish: <span className="font-normal text-stone-600">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-semibold'
                          : 'border-stone-300 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size variants if any */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-2">
                  Size: <span className="font-normal text-stone-600">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 text-xs font-medium rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                        selectedSize === size
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                          : 'border-stone-300 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Wishlist */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-l-lg transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-mono-data font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-r-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 py-2 px-3 border rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  inWish
                    ? 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-stone-300 text-stone-700 hover:border-stone-400 bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
                <span>{inWish ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now with 1-Click</span>
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Dispatches within 24 hours · Carbon-neutral air express</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>14-day hassle-free doorstep returns and full refund</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>1-Year replacement warranty under authorized manufacturer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Smart Match Assessment, Customer Reviews */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-6 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-colors relative cursor-pointer ${
              activeTab === 'specs' ? 'text-stone-900 border-b-2 border-emerald-700' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('smart-match')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-colors relative flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'smart-match' ? 'text-emerald-800 border-b-2 border-emerald-700' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>NOVA Smart Assessment</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-colors relative cursor-pointer ${
              activeTab === 'reviews' ? 'text-stone-900 border-b-2 border-emerald-700' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Reviews ({reviewsList.length})
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-4 border-t border-stone-100">
              {Object.entries(product.specs).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-stone-100 text-xs"
                >
                  <span className="font-medium text-stone-600">{key}</span>
                  <span className="font-mono-data text-stone-900 font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Smart Match Assessment */}
        {activeTab === 'smart-match' && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Why NOVA Recommends This Product</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Evaluated against rigorous materials, durability benchmarks, and real buyer satisfaction ratings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Ideal Intended Users
                </h4>
                <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                  {product.smartMatchMeta.idealFor.map((user, i) => (
                    <li key={i}>{user}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Primary Strengths
                </h4>
                <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                  {product.smartMatchMeta.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Honest Trade-off Notice
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{product.smartMatchMeta.tradeoffs}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Customer Ratings & Verified Feedback
                </h3>
                <p className="text-xs text-stone-500">
                  {product.rating} average based on {product.reviewsCount} verified purchase orders.
                </p>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3.5 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {/* Review form simulation */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Share Your Experience
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-stone-600 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={e => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-600 block mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={e => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Subpar</option>
                      <option value={1}>1 Star - Unsatisfied</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1">Headline</label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={e => setNewReviewTitle(e.target.value)}
                    placeholder="Summary of your review"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1">Detailed Feedback</label>
                  <textarea
                    rows={3}
                    value={newReviewComment}
                    onChange={e => setNewReviewComment(e.target.value)}
                    placeholder="What did you like or dislike? How does it perform in your daily routine?"
                    required
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>
            )}

            {/* Reviews list */}
            <div className="space-y-4 divide-y divide-stone-100">
              {reviewsList.map(rev => (
                <div key={rev.id} className="pt-4 first:pt-0 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-sm border border-emerald-200">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-stone-400 font-mono-data text-[11px]">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-600">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>

                  <h5 className="text-xs font-bold text-stone-900">{rev.title}</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
                Related Essentials
              </h2>
              <h3 className="text-xl font-bold font-display text-stone-900 mt-1">
                More in {product.category}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

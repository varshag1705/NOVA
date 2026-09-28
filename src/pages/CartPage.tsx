import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Trash2,
  Bookmark,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  ArrowLeft
} from 'lucide-react';

interface CartPageProps {
  onNavigateTab: (tab: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigateTab, onSelectProduct }) => {
  const {
    cart,
    savedForLater,
    updateCartQuantity,
    removeFromCart,
    saveForLater,
    moveToCartFromSaved,
    removeSavedForLater,
    cartSubtotal,
    couponDiscount,
    shippingFee,
    taxAmount,
    grandTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingProgress,
    amountNeededForFreeShipping
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
            Shopping Bag
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('shop')}
          className="text-xs font-semibold text-stone-700 hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Shipping Progress Alert */}
      <div className="bg-stone-100 rounded-xl p-4 border border-stone-200">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-stone-800">
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-800">
                ✓ Free Express Air Delivery Unlocked
              </span>
            ) : (
              <span>
                Add <span className="font-bold text-stone-950">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</span> more to qualify for Free Shipping
              </span>
            )}
          </span>
          <span className="font-mono-data text-stone-600 font-semibold">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-700 h-full rounded-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart items */}
        <div className="lg:col-span-8 space-y-4">
          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold text-stone-900">Your bag is empty</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore curated electronics, minimalist apparel, and clean living essentials.
              </p>
              <button
                onClick={() => onNavigateTab('shop')}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
              {cart.map(item => (
                <div key={item.product.id} className="p-5 flex flex-col sm:flex-row gap-5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => onSelectProduct(item.product.id)}
                    className="w-24 h-24 object-cover rounded-xl bg-stone-100 shrink-0 cursor-pointer border border-stone-200"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-semibold text-stone-500">
                            {item.product.brand} · {item.product.category}
                          </span>
                          <h4
                            onClick={() => onSelectProduct(item.product.id)}
                            className="text-sm font-bold text-stone-900 hover:text-emerald-800 cursor-pointer transition-colors"
                          >
                            {item.product.name}
                          </h4>
                          {item.selectedColor && (
                            <span className="text-xs text-stone-500 block mt-0.5">
                              Finish: {item.selectedColor}
                            </span>
                          )}
                        </div>

                        <span className="text-sm font-bold font-mono-data text-stone-950">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono-data font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <button
                          onClick={() => saveForLater(item.product.id)}
                          className="text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Save for Later</span>
                        </button>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved for Later Section */}
          {savedForLater.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold font-display text-stone-900">
                Saved for Later ({savedForLater.length})
              </h3>
              <div className="divide-y divide-stone-100">
                {savedForLater.map(item => (
                  <div key={item.product.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-lg bg-stone-100 border border-stone-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">{item.product.name}</h4>
                        <span className="text-xs font-mono-data text-stone-600 font-bold block mt-0.5">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => moveToCartFromSaved(item.product.id)}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Move to Bag
                      </button>
                      <button
                        onClick={() => removeSavedForLater(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold font-display text-stone-900">
              Order Summary
            </h3>

            {/* Promo Code Box */}
            <div>
              {!activeCoupon ? (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={e => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="Promo code (e.g. NOVA10)"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
                </form>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-900">{activeCoupon.code}</span>
                    <p className="text-[11px] text-emerald-700 mt-0.5">{activeCoupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-900 text-xs font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="font-mono-data text-stone-900 font-medium">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Savings</span>
                  <span className="font-mono-data">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono-data text-stone-900 font-medium">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Goods & Service Tax (18% GST)</span>
                <span className="font-mono-data text-stone-900 font-medium">
                  ₹{taxAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-stone-950 border-t border-stone-200 pt-3">
                <span>Total Amount</span>
                <span className="font-mono-data">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Proceed to checkout */}
            <button
              onClick={() => onNavigateTab('checkout')}
              disabled={cart.length === 0}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 disabled:bg-stone-300 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Certified 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

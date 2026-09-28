import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, Bookmark } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (tab: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    saveForLater,
    cartSubtotal,
    couponDiscount,
    shippingFee,
    taxAmount,
    grandTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    amountNeededForFreeShipping,
    freeShippingProgress
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

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

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    onNavigate('checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    onNavigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-base font-semibold text-stone-900 font-display">Shopping Bag</h2>
              <span className="text-xs text-stone-500 font-mono-data">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-stone-50 p-3.5 border-b border-stone-200">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-stone-700">
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold">
                    ✓ You have qualified for Free Express Delivery
                  </span>
                ) : (
                  <span>
                    Add <span className="font-semibold text-stone-900">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</span> more for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono-data text-stone-500">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm text-stone-500">Your bag is currently empty.</p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigate('shop');
                  }}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 py-3 border-b border-stone-100 last:border-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-2">
                        <span>{item.product.brand}</span>
                        {item.selectedColor && (
                          <>
                            <span>·</span>
                            <span>{item.selectedColor}</span>
                          </>
                        )}
                        {item.selectedSize && (
                          <>
                            <span>·</span>
                            <span>Size: {item.selectedSize}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-l transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono-data font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-r transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => saveForLater(item.product.id)}
                          className="text-[11px] text-stone-500 hover:text-stone-900 flex items-center gap-0.5"
                          title="Save for later"
                        >
                          <Bookmark className="w-3 h-3" />
                          <span className="hidden sm:inline">Save</span>
                        </button>

                        <span className="text-xs font-bold text-stone-950 font-mono-data">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-stone-50/50 space-y-3">
              {/* Promo input */}
              {!activeCoupon ? (
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={e => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="Coupon code (e.g. NOVA10)"
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-stone-300 rounded-md uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-900 px-3 py-2 rounded-md border border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Coupon <strong>{activeCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-900 text-xs font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono-data text-stone-900">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Promo Discount</span>
                    <span className="font-mono-data">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-mono-data text-stone-900">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (18% GST)</span>
                  <span className="font-mono-data text-stone-900">
                    ₹{taxAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-mono-data">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleViewCart}
                  className="w-full py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  View Full Cart & Saved Items
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

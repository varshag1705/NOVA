import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Address, Order } from '../types';
import {
  Check,
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Package,
  Sparkles
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigateTab: (tab: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigateTab }) => {
  const {
    cart,
    savedAddresses,
    addAddress,
    createOrder,
    cartSubtotal,
    couponDiscount,
    taxAmount,
    shippingFee,
    grandTotal
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Address selection / form
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    savedAddresses[0]?.id || ''
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Bengaluru');
  const [newAddrState, setNewAddrState] = useState('Karnataka');
  const [newAddrPincode, setNewAddrPincode] = useState('560038');

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<string>(
    'Express Air Courier (1-2 Business Days)'
  );

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('482');

  // Completed order
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const selectedAddress =
    savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0];

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrStreet || !newAddrPincode) return;

    addAddress({
      name: newAddrName,
      phone: newAddrPhone || '+91 98765 43210',
      street: newAddrStreet,
      city: newAddrCity,
      state: newAddrState,
      pincode: newAddrPincode,
      isDefault: false
    });
    setShowNewAddressForm(false);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) return;

    const newOrder = createOrder({
      address: selectedAddress,
      deliveryMethod,
      paymentMethod:
        paymentMethod === 'UPI'
          ? `UPI (${upiId})`
          : paymentMethod === 'Card'
          ? `Credit Card (${cardNumber.slice(-4)})`
          : paymentMethod
    });

    setCompletedOrder(newOrder);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold font-display text-stone-900">Your bag is empty</h2>
        <p className="text-xs text-stone-500">
          Add items to your shopping bag before proceeding to checkout.
        </p>
        <button
          onClick={() => onNavigateTab('shop')}
          className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Progress Stepper */}
      {step < 4 && (
        <div className="border-b border-stone-200 pb-6">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 1
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                1
              </span>
              <span className={`text-xs font-semibold ${step >= 1 ? 'text-stone-900' : 'text-stone-400'}`}>
                Address
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-emerald-800' : 'bg-stone-200'}`} />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 2
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                2
              </span>
              <span className={`text-xs font-semibold ${step >= 2 ? 'text-stone-900' : 'text-stone-400'}`}>
                Delivery
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-emerald-800' : 'bg-stone-200'}`} />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 3
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                3
              </span>
              <span className={`text-xs font-semibold ${step >= 3 ? 'text-stone-900' : 'text-stone-400'}`}>
                Payment
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content by Step */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold font-display text-stone-900">
                Select Delivery Address
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Choose where your items should be dispatched.
              </p>
            </div>

            {/* Saved Addresses list */}
            <div className="space-y-3">
              {savedAddresses.map(addr => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                    selectedAddressId === addr.id
                      ? 'border-emerald-700 bg-emerald-50/40 ring-1 ring-emerald-700/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">{addr.name}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] text-emerald-800 bg-emerald-100/60 px-1.5 py-0.2 rounded font-medium">
                          Default Address
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-xs font-mono-data text-stone-500">Phone: {addr.phone}</p>
                  </div>

                  <div className="mt-1">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedAddressId === addr.id
                          ? 'border-emerald-700 bg-emerald-700'
                          : 'border-stone-300'
                      }`}
                    >
                      {selectedAddressId === addr.id && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Address Accordion */}
            <div>
              {!showNewAddressForm ? (
                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>+ Add a new delivery address</span>
                </button>
              ) : (
                <form
                  onSubmit={handleSaveNewAddress}
                  className="bg-white p-5 rounded-xl border border-stone-200 space-y-3"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    New Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={newAddrName}
                        onChange={e => setNewAddrName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        required
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={newAddrPhone}
                        onChange={e => setNewAddrPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={newAddrStreet}
                      onChange={e => setNewAddrStreet(e.target.value)}
                      placeholder="Apartment, Building, Street"
                      required
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">City</label>
                      <input
                        type="text"
                        value={newAddrCity}
                        onChange={e => setNewAddrCity(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">State</label>
                      <input
                        type="text"
                        value={newAddrState}
                        onChange={e => setNewAddrState(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Pincode</label>
                      <input
                        type="text"
                        value={newAddrPincode}
                        onChange={e => setNewAddrPincode(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Save & Select Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Continue to Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right summary preview */}
          <div className="md:col-span-4 bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Cart Summary
            </h3>
            <div className="divide-y divide-stone-100 text-xs">
              {cart.map(item => (
                <div key={item.product.id} className="py-2.5 flex justify-between gap-2">
                  <span className="text-stone-700 line-clamp-1">
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span className="font-mono-data font-bold text-stone-900 shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
              <span>Total Payable</span>
              <span className="font-mono-data">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Delivery Method */}
      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold font-display text-stone-900">
                Choose Delivery Speed
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                All shipments are tracked in real-time with signature verification.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'Express Air Courier (1-2 Business Days)',
                  title: 'Express Air Courier (1-2 Business Days)',
                  subtitle: 'Dispatched via priority BlueDart air freight with live SMS ETA.',
                  fee: 'FREE with Orders > ₹999'
                },
                {
                  id: 'Eco-Friendly Carbon Neutral Dispatch (3-4 Days)',
                  title: 'Eco-Friendly Carbon Neutral Dispatch (3-4 Days)',
                  subtitle: 'Packed with 100% recycled biodegradable pulp and green logistics.',
                  fee: 'FREE'
                },
                {
                  id: 'Standard Ground Delivery (4-5 Days)',
                  title: 'Standard Ground Delivery (4-5 Days)',
                  subtitle: 'Reliable ground shipping directly to your doorstep.',
                  fee: 'FREE'
                }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setDeliveryMethod(opt.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    deliveryMethod === opt.id
                      ? 'border-emerald-700 bg-emerald-50/40 ring-1 ring-emerald-700/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-stone-900">{opt.title}</span>
                    <p className="text-xs text-stone-500">{opt.subtitle}</p>
                    <span className="text-[11px] font-semibold text-emerald-800 block mt-1">
                      {opt.fee}
                    </span>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-4 ${
                      deliveryMethod === opt.id
                        ? 'border-emerald-700 bg-emerald-700'
                        : 'border-stone-300'
                    }`}
                  >
                    {deliveryMethod === opt.id && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Address</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Delivering To:
            </h3>
            <div className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
              <span className="font-bold text-stone-900 block">{selectedAddress?.name}</span>
              <span>{selectedAddress?.street}</span>
              <span className="block">{selectedAddress?.city}, {selectedAddress?.pincode}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold font-display text-stone-900">
                Payment Method
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                All transactions are encrypted and processed through RBI-authorized payment gateways.
              </p>
            </div>

            {/* Payment method selector tabs */}
            <div className="grid grid-cols-4 gap-2">
              {['UPI', 'Card', 'Net Banking', 'Cash on Delivery'].map(m => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
                    paymentMethod === m
                      ? 'border-emerald-700 bg-emerald-800 text-white shadow-xs'
                      : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Payment input views */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
              {paymentMethod === 'UPI' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-800 block">
                    Instant UPI Transfer (Zero Convenience Fee)
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="yourname@okhdfcbank"
                      className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono-data"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300"
                    >
                      Verified
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Supports Google Pay, PhonePe, Paytm, CRED & BHIM. A payment approval push will be sent to your mobile.
                  </p>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-800 block">
                    Credit or Debit Card
                  </span>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg font-mono-data focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Expiry MM/YY</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg font-mono-data focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        maxLength={4}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg font-mono-data focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Net Banking' && (
                <div className="space-y-3 text-xs">
                  <span className="font-bold text-stone-800 block">Select Your Bank</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak', 'Others'].map(b => (
                      <button
                        key={b}
                        type="button"
                        className="p-2 border border-stone-200 rounded-lg hover:border-emerald-600 text-stone-700 text-left font-medium"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div className="space-y-2 text-xs text-stone-600">
                  <span className="font-bold text-stone-900 block">
                    Cash on Delivery (COD) Available
                  </span>
                  <p>
                    Please keep the exact cash amount of <strong>₹{grandTotal.toLocaleString('en-IN')}</strong> ready at the time of delivery. Delivery agent will present the sealed verification QR code.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Delivery</span>
              </button>

              <button
                onClick={handlePlaceOrder}
                className="px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Authorize & Place Order</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Order Breakdown
            </h3>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-data text-stone-900">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span className="font-mono-data">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-mono-data text-stone-900">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (18% GST)</span>
                <span className="font-mono-data text-stone-900">
                  ₹{taxAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-stone-950 pt-3 border-t border-stone-200">
                <span>Final Total</span>
                <span className="font-mono-data">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Order Confirmation */}
      {step === 4 && completedOrder && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Order Confirmed & Payment Verified
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Thank you, {completedOrder.address.name}
            </h2>
            <p className="text-xs text-stone-500">
              Confirmation receipt sent to your phone and email. Order ID:{' '}
              <strong className="text-stone-900 font-mono-data">{completedOrder.id}</strong>
            </p>
          </div>

          {/* Visual Receipt Card */}
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Tracking Reference</span>
              <span className="font-mono-data font-bold text-stone-900">
                {completedOrder.trackingNumber}
              </span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Delivery Address</span>
              <span className="text-stone-800 font-medium text-right max-w-xs">
                {completedOrder.address.street}, {completedOrder.address.city} - {completedOrder.address.pincode}
              </span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Estimated Arrival</span>
              <span className="text-emerald-800 font-bold">
                {completedOrder.estimatedDelivery}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-bold text-stone-900">Total Paid</span>
              <span className="font-mono-data font-extrabold text-stone-950 text-sm">
                ₹{completedOrder.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => onNavigateTab(`tracking?orderId=${completedOrder.id}`)}
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Track Order Live
            </button>
            <button
              onClick={() => onNavigateTab('shop')}
              className="px-6 py-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

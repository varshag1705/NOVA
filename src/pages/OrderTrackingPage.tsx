import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';
import {
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MapPin,
  Search,
  Phone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface OrderTrackingPageProps {
  initialOrderId?: string;
  onNavigateTab: (tab: string) => void;
  onSelectProduct: (productId: string) => void;
}

const TIMELINE_STEPS: OrderStatus[] = [
  'Ordered',
  'Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  initialOrderId,
  onNavigateTab,
  onSelectProduct
}) => {
  const { orders } = useStore();

  const [searchId, setSearchId] = useState(initialOrderId || (orders[0]?.id || 'NC-98421'));
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(() => {
    return (
      orders.find(o => o.id.toLowerCase() === (initialOrderId || 'NC-98421').toLowerCase()) ||
      orders[0]
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      o => o.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrder(found);
    }
  };

  const getStepIndex = (status: OrderStatus) => TIMELINE_STEPS.indexOf(status);
  const currentStepIndex = selectedOrder ? getStepIndex(selectedOrder.status) : 4;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-stone-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
          Live Order Tracking
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Monitor your package in real-time across dispatch, air freight, and final doorstep delivery.
        </p>
      </div>

      {/* Search Order Bar & Order Selector */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex-1 w-full flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              placeholder="Search by Order ID (e.g. NC-98421, NC-87112)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 uppercase font-mono-data"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
          >
            Locate Package
          </button>
        </form>

        {/* Quick picker from user's orders */}
        <div className="flex items-center gap-2 text-xs w-full md:w-auto">
          <span className="text-stone-500 whitespace-nowrap">Your Orders:</span>
          <select
            value={selectedOrder?.id || ''}
            onChange={e => {
              const o = orders.find(ord => ord.id === e.target.value);
              if (o) {
                setSelectedOrder(o);
                setSearchId(o.id);
              }
            }}
            className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono-data focus:outline-none cursor-pointer"
          >
            {orders.map(o => (
              <option key={o.id} value={o.id}>
                {o.id} · {o.status} ({o.items[0]?.product.name.slice(0, 20)}...)
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedOrder ? (
        <div className="space-y-8">
          {/* Main Visual Tracking Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8">
            {/* Top header status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
              <div>
                <span className="text-[11px] font-mono-data text-stone-500 uppercase tracking-widest">
                  Order Reference: {selectedOrder.id}
                </span>
                <h2 className="text-2xl font-bold font-display text-stone-900 mt-0.5">
                  Status: {selectedOrder.status}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Tracking No: <span className="font-mono-data font-semibold text-stone-800">{selectedOrder.trackingNumber}</span> · Dispatched via {selectedOrder.deliveryMethod}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-right sm:min-w-44">
                <span className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider block">
                  Estimated Arrival
                </span>
                <span className="text-sm font-extrabold text-emerald-950 font-display">
                  {selectedOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* 6-Step Visual Timeline */}
            <div className="relative pt-4 pb-2">
              {/* Desktop Timeline Bar */}
              <div className="hidden md:grid grid-cols-6 gap-2 relative">
                {/* Connecting track line */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-stone-200 z-0">
                  <div
                    className="h-full bg-emerald-700 transition-all duration-500"
                    style={{
                      width: `${(currentStepIndex / (TIMELINE_STEPS.length - 1)) * 100}%`
                    }}
                  />
                </div>

                {TIMELINE_STEPS.map((stepName, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={stepName} className="flex flex-col items-center text-center relative z-10 space-y-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all ${
                          isCurrent
                            ? 'bg-emerald-800 text-white ring-4 ring-emerald-100 font-bold scale-110 shadow-sm'
                            : isCompleted
                            ? 'bg-emerald-700 text-white font-medium'
                            : 'bg-white border-2 border-stone-300 text-stone-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>

                      <div>
                        <span
                          className={`text-xs font-semibold block ${
                            isCurrent
                              ? 'text-emerald-900 font-bold'
                              : isCompleted
                              ? 'text-stone-900'
                              : 'text-stone-400'
                          }`}
                        >
                          {stepName}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-emerald-700 font-medium block mt-0.5 animate-pulse">
                            ● In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Vertical Timeline */}
              <div className="md:hidden space-y-4">
                {TIMELINE_STEPS.map((stepName, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={stepName} className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                          isCurrent
                            ? 'bg-emerald-800 text-white ring-4 ring-emerald-100 font-bold'
                            : isCompleted
                            ? 'bg-emerald-700 text-white'
                            : 'bg-stone-100 text-stone-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div>
                        <span
                          className={`text-xs font-bold ${
                            isCurrent ? 'text-emerald-900' : isCompleted ? 'text-stone-900' : 'text-stone-400'
                          }`}
                        >
                          {stepName}
                        </span>
                        {isCurrent && (
                          <span className="text-[11px] text-emerald-700 block">
                            Current active stage
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier & Transit Details Box */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px] block">
                  Delivery Associate
                </span>
                <span className="font-bold text-stone-900 text-sm block">Vikram K.</span>
                <div className="flex items-center gap-1.5 text-stone-600">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="font-mono-data">+91 98110 54321</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px] block">
                  Shipping Destination
                </span>
                <span className="font-bold text-stone-900 block">{selectedOrder.address.name}</span>
                <p className="text-stone-600 leading-snug">
                  {selectedOrder.address.street}, {selectedOrder.address.city} - {selectedOrder.address.pincode}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px] block">
                  Delivery Guarantee
                </span>
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Contactless Doorstep PIN</span>
                </div>
                <p className="text-stone-500 text-[11px]">
                  Provide your 4-digit SMS passcode upon physical package handover.
                </p>
              </div>
            </div>

            {/* Itemized Contents */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                Items Inside Shipment ({selectedOrder.items.length})
              </h3>
              <div className="divide-y divide-stone-100">
                {selectedOrder.items.map(item => (
                  <div
                    key={item.product.id}
                    onClick={() => onSelectProduct(item.product.id)}
                    className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-stone-500">
                          Qty: {item.quantity} · {item.selectedColor || item.product.brand}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold font-mono-data text-stone-900">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
          <p className="text-xs text-stone-500">Order reference not found. Please verify your ID.</p>
        </div>
      )}
    </div>
  );
};

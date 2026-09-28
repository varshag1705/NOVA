import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  User,
  Package,
  MapPin,
  Clock,
  Heart,
  ChevronRight,
  ShieldCheck,
  Check,
  Plus
} from 'lucide-react';

interface ProfilePageProps {
  onNavigateTab: (tab: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigateTab,
  onSelectProduct
}) => {
  const {
    orders,
    savedAddresses,
    wishlist,
    recentlyViewed,
    products,
    addAddress
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'recent' | 'settings'>('orders');

  // New address state
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // Recently viewed products
  const recentProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !street || !pincode) return;

    addAddress({
      name,
      phone: phone || '+91 98765 43210',
      street,
      city: city || 'Bengaluru',
      state: state || 'Karnataka',
      pincode,
      isDefault: false
    });

    setShowAddAddr(false);
    setName('');
    setStreet('');
    setPincode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile summary */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-stone-900 text-white font-display text-xl font-bold flex items-center justify-center">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl font-bold font-display text-stone-900">Aarav Sharma</h1>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">
                NOVA Member
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              aarav.sharma@example.com · +91 98765 43210
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-stone-600">
          <div className="text-center">
            <span className="font-mono-data font-bold text-stone-900 text-base block">
              {orders.length}
            </span>
            <span className="text-stone-400">Total Orders</span>
          </div>
          <div className="text-center">
            <span className="font-mono-data font-bold text-stone-900 text-base block">
              {wishlist.length}
            </span>
            <span className="text-stone-400">Wishlist</span>
          </div>
          <div className="text-center">
            <span className="font-mono-data font-bold text-stone-900 text-base block">
              {savedAddresses.length}
            </span>
            <span className="text-stone-400">Addresses</span>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-stone-200 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-semibold uppercase tracking-wider transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'text-stone-900 border-b-2 border-emerald-700'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 font-semibold uppercase tracking-wider transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'addresses'
              ? 'text-stone-900 border-b-2 border-emerald-700'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Delivery Addresses ({savedAddresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recent')}
          className={`pb-3 font-semibold uppercase tracking-wider transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'recent'
              ? 'text-stone-900 border-b-2 border-emerald-700'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Recently Viewed ({recentProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 font-semibold uppercase tracking-wider transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'text-stone-900 border-b-2 border-emerald-700'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Account Settings</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-data font-bold text-stone-900 text-sm">
                      {order.id}
                    </span>
                    <span className="text-stone-400">·</span>
                    <span className="text-xs text-stone-500">{order.date}</span>
                    <span className="text-stone-400">·</span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Tracking: <span className="font-mono-data">{order.trackingNumber}</span> · {order.deliveryMethod}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-bold font-mono-data text-stone-950">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => onNavigateTab(`tracking?orderId=${order.id}`)}
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Track Live</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Items in order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items.map(item => (
                  <div
                    key={item.product.id}
                    onClick={() => onSelectProduct(item.product.id)}
                    className="flex items-center gap-3 p-2 bg-stone-50 rounded-xl cursor-pointer hover:bg-stone-100/80 transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-stone-500 block">
                        Qty: {item.quantity} · ₹{item.product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900">Saved Addresses</h2>
            <button
              onClick={() => setShowAddAddr(!showAddAddr)}
              className="px-3.5 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          {showAddAddr && (
            <form onSubmit={handleAddAddress} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">Add Address</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Recipient Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="px-3 py-1.5 text-xs border border-stone-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-stone-300 rounded-md"
                />
              </div>
              <input
                type="text"
                placeholder="Street & House/Flat No."
                value={street}
                onChange={e => setStreet(e.target.value)}
                required
                className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-stone-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-stone-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  required
                  className="px-3 py-1.5 text-xs border border-stone-300 rounded-md"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-800 text-white rounded-md text-xs font-semibold"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddAddr(false)}
                  className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded-md text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedAddresses.map(addr => (
              <div
                key={addr.id}
                className="bg-white rounded-xl border border-stone-200 p-5 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">{addr.name}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <span className="text-xs text-stone-500 font-mono-data block">
                  {addr.phone}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Recently Viewed */}
      {activeTab === 'recent' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900">Recently Viewed Products</h2>
            <p className="text-xs text-stone-500">Stored locally in your active session</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Account Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 space-y-6 max-w-2xl">
          <h2 className="text-sm font-bold text-stone-900">Member Preferences</h2>
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-stone-600 block mb-1">Display Name</label>
              <input
                type="text"
                defaultValue="Aarav Sharma"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-stone-50"
              />
            </div>
            <div>
              <label className="text-stone-600 block mb-1">Registered Email</label>
              <input
                type="email"
                defaultValue="aarav.sharma@example.com"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-stone-50"
              />
            </div>
            <div>
              <label className="text-stone-600 block mb-1">Currency Preference</label>
              <input
                type="text"
                disabled
                defaultValue="INR (₹) — Indian Rupee"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg text-stone-500 bg-stone-100"
              />
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-700" />
                <span className="text-stone-700 font-medium">
                  Receive Sunday NOVA Editions & Smart Match Drop Alerts
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

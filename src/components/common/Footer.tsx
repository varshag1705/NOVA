import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      addToast('Subscribed', 'Thank you for subscribing to NOVA Editions.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800">
      {/* Trust & Craftsmanship Bar */}
      <div className="border-b border-stone-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-stone-800/80 rounded-lg text-emerald-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Smart Match Intelligence</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Algorithmic alignment balancing budget, materials, and real verified use cases.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-stone-800/80 rounded-lg text-emerald-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Express Ground & Air</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Complimentary carbon-neutral shipping on all domestic orders over ₹999.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-stone-800/80 rounded-lg text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Authentic Provenance</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Direct artisan and brand partnerships. Zero counterfeit compromise.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-stone-800/80 rounded-lg text-emerald-400 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">14-Day Seamless Returns</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Doorstep pickup with instant store credit or original payment refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand info */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xl font-bold font-display text-white tracking-tight">
              NOVA CART
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Shopping that understands you. Curated essentials engineered with materials that last, design that calms, and intelligence that listens.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-stone-500">
              <span>Bengaluru</span>
              <span>·</span>
              <span>Mumbai</span>
              <span>·</span>
              <span>New Delhi</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-wider font-semibold text-stone-200">Shop</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setCurrentTab('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('smart-match')}
                  className="hover:text-emerald-400 text-emerald-500 font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  NOVA Smart Match
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trending Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Flash Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-wider font-semibold text-stone-200">Assistance</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setCurrentTab('tracking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('profile')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Saved Addresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('wishlist')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Wishlist
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Warranty & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              NOVA Editions
            </h5>
            <p className="text-xs text-stone-400 leading-relaxed">
              Curated Sunday field notes on minimalist product engineering, material discoveries, and private studio releases.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-stone-800/80 p-3 rounded-lg border border-emerald-900/50">
                <Check className="w-4 h-4" />
                <span>You are subscribed. Welcome to the cohort.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="flex-1 px-3 py-2 text-xs bg-stone-800 text-stone-100 border border-stone-700 rounded-lg placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-stone-950 text-xs font-semibold rounded-lg hover:bg-stone-200 transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-10 mt-10 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} NOVA CART Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-stone-400 transition-colors">Terms of Commerce</span>
            <span className="hover:text-stone-400 transition-colors">Security Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

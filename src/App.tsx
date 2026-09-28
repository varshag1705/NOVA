import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { CartDrawer } from './components/common/CartDrawer';
import { CompareDrawer } from './components/common/CompareDrawer';
import { Chatbot } from './components/common/Chatbot';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SmartMatchPage } from './pages/SmartMatchPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ProfilePage } from './pages/ProfilePage';
import { WishlistPage } from './pages/WishlistPage';

function MainAppContent() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('All');
  const [shopSearchQuery, setShopSearchQuery] = useState<string>('');
  const [smartMatchInitialQuery, setSmartMatchInitialQuery] = useState<string>('');
  const [trackingInitialOrderId, setTrackingInitialOrderId] = useState<string>('');

  // Handle URL hash or tab navigation with params
  const handleNavigateTab = (destination: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (destination.startsWith('smart-match?q=')) {
      const q = decodeURIComponent(destination.split('?q=')[1] || '');
      setSmartMatchInitialQuery(q);
      setCurrentTab('smart-match');
      setSelectedProductId(null);
      return;
    }

    if (destination.startsWith('tracking?orderId=')) {
      const oId = decodeURIComponent(destination.split('?orderId=')[1] || '');
      setTrackingInitialOrderId(oId);
      setCurrentTab('tracking');
      setSelectedProductId(null);
      return;
    }

    setCurrentTab(destination);
    setSelectedProductId(null);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setShopSearchQuery(query);
    setShopCategoryFilter('All');
    setCurrentTab('shop');
    setSelectedProductId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50/70 text-stone-900 font-body">
      <Header
        currentTab={currentTab}
        setCurrentTab={handleNavigateTab}
        onSearchSubmit={handleSearchSubmit}
        setSelectedProductId={setSelectedProductId}
      />

      <main className="flex-1">
        {selectedProductId ? (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => setSelectedProductId(null)}
            onSelectProduct={handleSelectProduct}
            onNavigateTab={handleNavigateTab}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomePage
                onSelectProduct={handleSelectProduct}
                onNavigateTab={handleNavigateTab}
                onSetCategoryFilter={(cat) => {
                  setShopCategoryFilter(cat);
                  setShopSearchQuery('');
                }}
              />
            )}

            {currentTab === 'shop' && (
              <ShopPage
                initialCategory={shopCategoryFilter}
                initialSearch={shopSearchQuery}
                onSelectProduct={handleSelectProduct}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {currentTab === 'smart-match' && (
              <SmartMatchPage
                initialQuery={smartMatchInitialQuery}
                onSelectProduct={handleSelectProduct}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {currentTab === 'cart' && (
              <CartPage
                onNavigateTab={handleNavigateTab}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentTab === 'checkout' && (
              <CheckoutPage
                onNavigateTab={handleNavigateTab}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentTab === 'tracking' && (
              <OrderTrackingPage
                initialOrderId={trackingInitialOrderId}
                onNavigateTab={handleNavigateTab}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentTab === 'profile' && (
              <ProfilePage
                onNavigateTab={handleNavigateTab}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentTab === 'wishlist' && (
              <WishlistPage
                onSelectProduct={handleSelectProduct}
                onNavigateTab={handleNavigateTab}
              />
            )}
          </>
        )}
      </main>

      <Footer setCurrentTab={handleNavigateTab} />

      {/* Global Overlays & Modals */}
      <CartDrawer onNavigate={handleNavigateTab} />
      <CompareDrawer />
      <Chatbot />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}

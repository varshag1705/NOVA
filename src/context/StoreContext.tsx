import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, CartItem, Address, Order, ToastMessage, OrderStatus } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface Coupon {
  code: string;
  type: 'percent' | 'flat' | 'free_shipping';
  value: number;
  description: string;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  'NOVA10': { code: 'NOVA10', type: 'percent', value: 10, description: '10% off entire order' },
  'WELCOME20': { code: 'WELCOME20', type: 'flat', value: 500, description: '₹500 flat discount on orders over ₹2,000' },
  'FREESHIP': { code: 'FREESHIP', type: 'free_shipping', value: 0, description: 'Complimentary Express delivery' }
};

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    street: '402, Lotus Grandeur, 14th Main, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    street: 'WeWork Galaxy, 43 Residency Road, Shanthala Nagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560025',
    isDefault: false
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'NC-98421',
    date: '2026-09-24',
    items: [
      {
        product: SAMPLE_PRODUCTS[0], // Aether ANC Over-Ear Studio Headphones
        quantity: 1,
        selectedColor: 'Matte Obsidian'
      },
      {
        product: SAMPLE_PRODUCTS[6], // AeroFlask Matte Vacuum Insulated Bottle 750ml
        quantity: 1,
        selectedColor: 'Forest Sage'
      }
    ],
    subtotal: 4098,
    discount: 410,
    tax: 663,
    shipping: 0,
    total: 4351,
    status: 'Out for Delivery',
    address: DEFAULT_ADDRESSES[0],
    deliveryMethod: 'Express Air Courier (1-2 Days)',
    paymentMethod: 'UPI (aarav@okaxis)',
    trackingNumber: 'DEL-BLR-89217740',
    estimatedDelivery: 'Today by 6:00 PM',
    timeline: [
      { step: 'Ordered', label: 'Order Placed', timestamp: 'Sep 24, 09:15 AM', completed: true },
      { step: 'Confirmed', label: 'Payment Verified', timestamp: 'Sep 24, 09:20 AM', completed: true },
      { step: 'Packed', label: 'Inspected & Sealed at Hub', timestamp: 'Sep 24, 02:40 PM', completed: true },
      { step: 'Shipped', label: 'Dispatched via Air Freight', timestamp: 'Sep 25, 06:10 AM', completed: true },
      { step: 'Out for Delivery', label: 'Courier On Route', timestamp: 'Sep 28, 08:30 AM', completed: true, current: true, note: 'Rider: Vikram K. (+91 98110 54321)' },
      { step: 'Delivered', label: 'Delivery Handover', completed: false }
    ]
  },
  {
    id: 'NC-87112',
    date: '2026-09-12',
    items: [
      {
        product: SAMPLE_PRODUCTS[9], // Botanica Squalane & Ceramide Barrier Serum
        quantity: 2
      }
    ],
    subtotal: 2598,
    discount: 260,
    tax: 420,
    shipping: 0,
    total: 2758,
    status: 'Delivered',
    address: DEFAULT_ADDRESSES[0],
    deliveryMethod: 'Standard Ground Delivery',
    paymentMethod: 'Credit Card (•••• 4921)',
    trackingNumber: 'DEL-BLR-74829910',
    estimatedDelivery: 'Sep 15, 2026',
    timeline: [
      { step: 'Ordered', label: 'Order Placed', timestamp: 'Sep 12, 04:30 PM', completed: true },
      { step: 'Confirmed', label: 'Payment Verified', timestamp: 'Sep 12, 04:35 PM', completed: true },
      { step: 'Packed', label: 'Quality Checked', timestamp: 'Sep 13, 11:00 AM', completed: true },
      { step: 'Shipped', label: 'In Transit', timestamp: 'Sep 13, 05:20 PM', completed: true },
      { step: 'Out for Delivery', label: 'Out for Delivery', timestamp: 'Sep 15, 09:10 AM', completed: true },
      { step: 'Delivered', label: 'Delivered to Recipient', timestamp: 'Sep 15, 01:25 PM', completed: true, current: true, note: 'Signed by resident' }
    ]
  }
];

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  compareList: string[];
  savedAddresses: Address[];
  orders: Order[];
  activeCoupon: Coupon | null;
  toasts: ToastMessage[];
  isCartDrawerOpen: boolean;
  isCompareOpen: boolean;
  savedForLater: CartItem[];

  // Cart operations
  addToCart: (product: Product, quantity?: number, options?: { color?: string; size?: string }) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  saveForLater: (productId: string) => void;
  moveToCartFromSaved: (productId: string) => void;
  removeSavedForLater: (productId: string) => void;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist operations
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently viewed
  addToRecentlyViewed: (productId: string) => void;

  // Comparison
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  setIsCompareOpen: (open: boolean) => void;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Toasts
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Addresses & Orders
  addAddress: (address: Omit<Address, 'id'>) => void;
  createOrder: (orderInfo: {
    address: Address;
    deliveryMethod: string;
    paymentMethod: string;
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Price calculations
  cartSubtotal: number;
  couponDiscount: number;
  shippingFee: number;
  taxAmount: number;
  grandTotal: number;
  totalCartItemCount: number;
  freeShippingProgress: number; // 0 to 100
  amountNeededForFreeShipping: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);

  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('nova_cart_items');
      return stored ? JSON.parse(stored) : [
        { product: SAMPLE_PRODUCTS[0], quantity: 1, selectedColor: 'Matte Obsidian' }
      ];
    } catch {
      return [{ product: SAMPLE_PRODUCTS[0], quantity: 1, selectedColor: 'Matte Obsidian' }];
    }
  });

  // Saved for later
  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('nova_saved_later');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nova_wishlist');
      return stored ? JSON.parse(stored) : [SAMPLE_PRODUCTS[1].id, SAMPLE_PRODUCTS[5].id];
    } catch {
      return [SAMPLE_PRODUCTS[1].id, SAMPLE_PRODUCTS[5].id];
    }
  });

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nova_recently_viewed');
      return stored ? JSON.parse(stored) : [
        SAMPLE_PRODUCTS[0].id,
        SAMPLE_PRODUCTS[1].id,
        SAMPLE_PRODUCTS[9].id,
        SAMPLE_PRODUCTS[21].id
      ];
    } catch {
      return [SAMPLE_PRODUCTS[0].id, SAMPLE_PRODUCTS[1].id, SAMPLE_PRODUCTS[9].id, SAMPLE_PRODUCTS[21].id];
    }
  });

  // Compare list
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Drawer
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Addresses
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    try {
      const stored = localStorage.getItem('nova_addresses');
      return stored ? JSON.parse(stored) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('nova_orders');
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Coupon state
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nova_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed saving cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_saved_later', JSON.stringify(savedForLater));
    } catch (e) {
      console.warn('Failed saving saved for later', e);
    }
  }, [savedForLater]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed saving wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.warn('Failed saving recently viewed', e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed saving orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_addresses', JSON.stringify(savedAddresses));
    } catch (e) {
      console.warn('Failed saving addresses', e);
    }
  }, [savedAddresses]);

  // Toast handler
  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, options?: { color?: string; size?: string }) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selectedColor: options?.color || next[existingIndex].selectedColor,
          selectedSize: options?.size || next[existingIndex].selectedSize
        };
        return next;
      } else {
        return [...prev, {
          product,
          quantity,
          selectedColor: options?.color || (product.colors ? product.colors[0] : undefined),
          selectedSize: options?.size || (product.sizes ? product.sizes[0] : undefined)
        }];
      }
    });

    addToast('Added to Cart', `${product.name} (x${quantity}) added.`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(i => i.product.id !== productId));
    if (item) {
      addToast('Removed from Cart', `${item.product.name} was removed.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const saveForLater = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    if (!item) return;
    setCart(prev => prev.filter(i => i.product.id !== productId));
    setSavedForLater(prev => [...prev.filter(i => i.product.id !== productId), item]);
    addToast('Saved for Later', `${item.product.name} moved to saved items.`, 'info');
  };

  const moveToCartFromSaved = (productId: string) => {
    const item = savedForLater.find(i => i.product.id === productId);
    if (!item) return;
    setSavedForLater(prev => prev.filter(i => i.product.id !== productId));
    setCart(prev => [...prev, item]);
    addToast('Moved to Cart', `${item.product.name} returned to your cart.`, 'success');
  };

  const removeSavedForLater = (productId: string) => {
    setSavedForLater(prev => prev.filter(i => i.product.id !== productId));
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', product?.name, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to Wishlist', product?.name, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Recently viewed
  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  // Product Comparison (max 4 products)
  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        addToast('Comparison Full', 'You can compare a maximum of 4 products.', 'warning');
        return prev;
      }
      const prod = products.find(p => p.id === productId);
      addToast('Added to Compare', `${prod?.name} added to comparison matrix.`, 'info');
      return [...prev, productId];
    });
  };

  const isInCompare = (productId: string) => compareList.includes(productId);

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[cleanCode];
    if (!coupon) {
      return { success: false, message: 'Invalid promo code. Try "NOVA10" or "WELCOME20".' };
    }
    setActiveCoupon(coupon);
    addToast('Coupon Applied', `Code ${cleanCode}: ${coupon.description}`, 'success');
    return { success: true, message: `Applied ${coupon.code} successfully!` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    addToast('Coupon Removed', 'Standard pricing restored.', 'info');
  };

  // Address
  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addressData,
      id: 'addr-' + Date.now()
    };
    setSavedAddresses(prev => [...prev, newAddress]);
    addToast('Address Saved', 'New delivery address has been added.', 'success');
  };

  // Orders
  const createOrder = ({
    address,
    deliveryMethod,
    paymentMethod
  }: {
    address: Address;
    deliveryMethod: string;
    paymentMethod: string;
  }): Order => {
    const orderId = 'NC-' + Math.floor(10000 + Math.random() * 90000);
    const trackingNumber = 'DEL-BLR-' + Math.floor(10000000 + Math.random() * 90000000);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const newOrder: Order = {
      id: orderId,
      date: dateStr,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: couponDiscount,
      tax: taxAmount,
      shipping: shippingFee,
      total: grandTotal,
      status: 'Confirmed',
      address,
      deliveryMethod,
      paymentMethod,
      trackingNumber,
      estimatedDelivery: '3 Business Days',
      timeline: [
        {
          step: 'Ordered',
          label: 'Order Placed',
          timestamp: 'Just now',
          completed: true
        },
        {
          step: 'Confirmed',
          label: 'Payment Verified',
          timestamp: 'Just now',
          completed: true,
          current: true,
          note: `Payment authorized via ${paymentMethod}`
        },
        {
          step: 'Packed',
          label: 'Fulfillment & Quality Verification',
          completed: false
        },
        {
          step: 'Shipped',
          label: 'Dispatched with Tracking',
          completed: false
        },
        {
          step: 'Out for Delivery',
          label: 'Courier Delivery Run',
          completed: false
        },
        {
          step: 'Delivered',
          label: 'Delivered to Doorstep',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
  };

  // Price calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const totalCartItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const FREE_SHIPPING_THRESHOLD = 999;
  const STANDARD_SHIPPING_FEE = 149;

  const couponDiscount = useMemo(() => {
    if (!activeCoupon) return 0;
    if (activeCoupon.type === 'percent') {
      return Math.round((cartSubtotal * activeCoupon.value) / 100);
    }
    if (activeCoupon.type === 'flat') {
      return cartSubtotal >= 2000 ? activeCoupon.value : 0;
    }
    return 0;
  }, [activeCoupon, cartSubtotal]);

  const shippingFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (activeCoupon?.type === 'free_shipping') return 0;
    return cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  }, [cart.length, cartSubtotal, activeCoupon]);

  const taxAmount = useMemo(() => {
    // 18% GST calculation on discounted subtotal
    const taxableBase = Math.max(0, cartSubtotal - couponDiscount);
    return Math.round(taxableBase * 0.18);
  }, [cartSubtotal, couponDiscount]);

  const grandTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    return Math.max(0, cartSubtotal - couponDiscount + taxAmount + shippingFee);
  }, [cart.length, cartSubtotal, couponDiscount, taxAmount, shippingFee]);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        compareList,
        savedAddresses,
        orders,
        activeCoupon,
        toasts,
        isCartDrawerOpen,
        isCompareOpen,
        savedForLater,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        saveForLater,
        moveToCartFromSaved,
        removeSavedForLater,
        setIsCartDrawerOpen,

        toggleWishlist,
        isInWishlist,
        addToRecentlyViewed,

        toggleCompare,
        isInCompare,
        removeFromCompare,
        clearCompare,
        setIsCompareOpen,

        applyCoupon,
        removeCoupon,
        addToast,
        removeToast,

        addAddress,
        createOrder,
        getOrderById,

        cartSubtotal,
        couponDiscount,
        shippingFee,
        taxAmount,
        grandTotal,
        totalCartItemCount,
        freeShippingProgress,
        amountNeededForFreeShipping
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export type Category = 
  | 'Electronics'
  | 'Fashion'
  | 'Beauty'
  | 'Home'
  | 'Fitness'
  | 'Accessories'
  | 'Grocery'
  | 'Travel';

export interface ProductSpec {
  [key: string]: string;
}

export interface SmartMatchMeta {
  idealFor: string[];
  useCases: string[];
  budgetTier: 'budget' | 'mid-range' | 'premium';
  strengths: string[];
  tradeoffs: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: ProductSpec;
  tags: ('smart-pick' | 'trending' | 'flash-deal' | 'lifestyle' | 'new-drop')[];
  inStock: boolean;
  stockCount?: number;
  isLowStock?: boolean;
  isPriceDrop?: boolean;
  priceDropAmount?: number;
  smartMatchMeta: SmartMatchMeta;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export type OrderStatus = 'Ordered' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface OrderTimelineStep {
  step: OrderStatus;
  label: string;
  timestamp?: string;
  completed: boolean;
  current?: boolean;
  note?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  address: Address;
  deliveryMethod: string;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
  timeline: OrderTimelineStep[];
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning';
}

export interface SmartMatchQuery {
  rawQuery: string;
  category?: string;
  maxBudget?: number;
  priorities: string[];
}

export interface SmartMatchResult {
  product: Product;
  matchScore: number;
  reasons: string[];
  budgetFit: 'well-under' | 'perfect-fit' | 'slight-stretch';
  savingsAmount: number;
}

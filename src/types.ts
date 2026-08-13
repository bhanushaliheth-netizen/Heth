export type ProductCategory = 'ALL' | 'APPAREL' | 'ACCESSORIES' | 'COLLECTIBLES' | 'DESK' | 'TECH';

export type Universe = 'ALL' | 'GOOGLE' | 'ANDROID' | 'YOUTUBE' | 'AI';

export type FitOption = 'Relaxed' | 'Regular' | 'Oversized' | 'Slim';

export type StyleOption = 'Minimal' | 'Street' | 'Tech' | 'Playful' | 'Futuristic' | 'Casual' | 'Creative';

export type ColorOption = 'Neutral' | 'Blue' | 'Red' | 'Yellow' | 'Green' | 'Mixed';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  universe: Universe;
  price: number; // In INR (₹)
  rating: number;
  reviewCount: number;
  description: string;
  sizes: string[];
  colors: string[];
  fitOptions: FitOption[];
  image: string;
  tags: string[];
  featured?: boolean;
  limited?: boolean;
  tryOnAvailable: boolean;
  styleTags: StyleOption[];
  colorVibe: ColorOption;
  recommendedFor?: string; // e.g. "Relaxed fit lovers"
}

export interface StyleProfile {
  fit: FitOption;
  style: StyleOption;
  colors: ColorOption;
  favoriteCategories: string[];
  styleMatch: number;
  energy: string;
  detectedColors?: string[];
  userImage?: string; // Base64 or object URL of scanned photo
}

export type QuizIdentity = 'EXPLORER' | 'CREATOR' | 'BUILDER' | 'FUTURIST' | 'PLAYFUL';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    identity: QuizIdentity;
    sublabel?: string;
  }[];
}

export interface QuizResult {
  identity: QuizIdentity;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  traits: string[];
  recommendedProductIds: string[];
}

export interface CartItem {
  cartId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  selectedFit: FitOption;
  quantity: number;
  customText?: string;
  customIcon?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pin: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export interface UserXP {
  points: number;
  level: number;
  levelTitle: string;
  unlockedRewards: {
    levelRequired: number;
    title: string;
    unlocked: boolean;
  }[];
}

export interface SavedLook {
  id: string;
  title: string;
  productIds: string[];
  userImage?: string;
  fit: FitOption;
  createdAt: string;
}

export interface GeminiChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
  recommendedProductIds?: string[];
}

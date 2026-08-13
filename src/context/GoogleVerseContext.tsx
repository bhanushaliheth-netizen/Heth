import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  StyleProfile,
  QuizResult,
  Order,
  UserXP,
  SavedLook,
  Universe,
  ProductCategory,
  ShippingDetails,
  FitOption,
} from '../types';
import { PRODUCTS } from '../data/products';

interface GoogleVerseContextType {
  cart: CartItem[];
  wishlist: string[];
  styleProfile: StyleProfile | null;
  quizResult: QuizResult | null;
  orders: Order[];
  userXP: UserXP;
  savedLooks: SavedLook[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedUniverse: Universe;
  setSelectedUniverse: (u: Universe) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (c: ProductCategory) => void;
  
  // Modal States
  activeModal: 'scanner' | 'quiz' | 'customizer' | 'tryon' | 'cart' | 'checkout' | 'profile' | 'detail' | 'orderConfirmed' | null;
  setActiveModal: (m: 'scanner' | 'quiz' | 'customizer' | 'tryon' | 'cart' | 'checkout' | 'profile' | 'detail' | 'orderConfirmed' | null) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (p: Product | null) => void;
  selectedProductForTryOn: Product | null;
  setSelectedProductForTryOn: (p: Product | null) => void;
  latestOrder: Order | null;

  // Actions
  addToCart: (product: Product, size?: string, color?: string, fit?: FitOption, quantity?: number, customText?: string, customIcon?: string) => void;
  removeFromCart: (cartId: string) => void;
  updateCartQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  updateStyleProfile: (profile: StyleProfile) => void;
  updateQuizResult: (result: QuizResult) => void;
  addXP: (amount: number, reason: string) => void;
  placeOrder: (shippingDetails: ShippingDetails, paymentMethod: string) => Order;
  saveLook: (title: string, productIds: string[], userImage?: string, fit?: FitOption) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const initialXP: UserXP = {
  points: 100,
  level: 1,
  levelTitle: 'Google Novice',
  unlockedRewards: [
    { levelRequired: 2, title: 'Android Vinyl Sticker Pack', unlocked: false },
    { levelRequired: 5, title: 'Free Express Shipping', unlocked: false },
    { levelRequired: 10, title: 'Limited Drop Access Pass', unlocked: false },
  ],
};

const GoogleVerseContext = createContext<GoogleVerseContextType | undefined>(undefined);

export const GoogleVerseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gv_wishlist');
      return saved ? JSON.parse(saved) : ['gv-01', 'gv-18'];
    } catch {
      return ['gv-01', 'gv-18'];
    }
  });

  const [styleProfile, setStyleProfileState] = useState<StyleProfile | null>(() => {
    try {
      const saved = localStorage.getItem('gv_styleProfile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [quizResult, setQuizResultState] = useState<QuizResult | null>(() => {
    try {
      const saved = localStorage.getItem('gv_quizResult');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('gv_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userXP, setUserXP] = useState<UserXP>(() => {
    try {
      const saved = localStorage.getItem('gv_userXP');
      return saved ? JSON.parse(saved) : initialXP;
    } catch {
      return initialXP;
    }
  });

  const [savedLooks, setSavedLooks] = useState<SavedLook[]>(() => {
    try {
      const saved = localStorage.getItem('gv_savedLooks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniverse, setSelectedUniverse] = useState<Universe>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');

  const [activeModal, setActiveModal] = useState<'scanner' | 'quiz' | 'customizer' | 'tryon' | 'cart' | 'checkout' | 'profile' | 'detail' | 'orderConfirmed' | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProductForTryOn, setSelectedProductForTryOn] = useState<Product | null>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('gv_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gv_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (styleProfile) localStorage.setItem('gv_styleProfile', JSON.stringify(styleProfile));
  }, [styleProfile]);

  useEffect(() => {
    if (quizResult) localStorage.setItem('gv_quizResult', JSON.stringify(quizResult));
  }, [quizResult]);

  useEffect(() => {
    localStorage.setItem('gv_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gv_userXP', JSON.stringify(userXP));
  }, [userXP]);

  useEffect(() => {
    localStorage.setItem('gv_savedLooks', JSON.stringify(savedLooks));
  }, [savedLooks]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addXP = (amount: number, reason: string) => {
    setUserXP((prev) => {
      const newPoints = prev.points + amount;
      let level = prev.level;
      let levelTitle = prev.levelTitle;

      if (newPoints >= 1000) {
        level = 10;
        levelTitle = 'Googleverse Visionary';
      } else if (newPoints >= 650) {
        level = 3;
        levelTitle = 'Google Creator';
      } else if (newPoints >= 300) {
        level = 2;
        levelTitle = 'Google Explorer';
      }

      const updatedRewards = prev.unlockedRewards.map((reward) => ({
        ...reward,
        unlocked: level >= reward.levelRequired,
      }));

      showToast(`+${amount} XP: ${reason}!`);

      return {
        points: newPoints,
        level,
        levelTitle,
        unlockedRewards: updatedRewards,
      };
    });
  };

  const addToCart = (
    product: Product,
    size?: string,
    color?: string,
    fit?: FitOption,
    quantity: number = 1,
    customText?: string,
    customIcon?: string
  ) => {
    const selectedSize = size || product.sizes[0] || 'M';
    const selectedColor = color || product.colors[0] || 'Default';
    const selectedFit = fit || product.fitOptions[0] || 'Regular';
    const cartId = `${product.id}-${selectedSize}-${selectedColor}-${selectedFit}-${customText || ''}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          cartId,
          product,
          selectedSize,
          selectedColor,
          selectedFit,
          quantity,
          customText,
          customIcon,
        },
      ];
    });

    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
    showToast('Removed item from cart');
  };

  const updateCartQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        addXP(20, 'Added item to Wishlist');
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const updateStyleProfile = (profile: StyleProfile) => {
    setStyleProfileState(profile);
    addXP(50, 'Completed AI Style Scan');
  };

  const updateQuizResult = (result: QuizResult) => {
    setQuizResultState(result);
    addXP(50, 'Completed Google Identity Quiz');
  };

  const placeOrder = (shippingDetails: ShippingDetails, paymentMethod: string) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 2000 ? 0 : 150;
    const total = subtotal + shipping;

    const newOrder: Order = {
      id: `GV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal,
      shipping,
      total,
      shippingDetails,
      paymentMethod,
      status: 'Confirmed',
      estimatedDelivery: '3–5 business days',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    addXP(100, 'Completed Purchase');
    setActiveModal('orderConfirmed');
    return newOrder;
  };

  const saveLook = (title: string, productIds: string[], userImage?: string, fit: FitOption = 'Relaxed') => {
    const newLook: SavedLook = {
      id: `look-${Date.now()}`,
      title,
      productIds,
      userImage,
      fit,
      createdAt: new Date().toISOString(),
    };
    setSavedLooks((prev) => [newLook, ...prev]);
    showToast(`Saved look: ${title}`);
  };

  return (
    <GoogleVerseContext.Provider
      value={{
        cart,
        wishlist,
        styleProfile,
        quizResult,
        orders,
        userXP,
        savedLooks,
        searchQuery,
        setSearchQuery,
        selectedUniverse,
        setSelectedUniverse,
        selectedCategory,
        setSelectedCategory,
        activeModal,
        setActiveModal,
        selectedProductForDetail,
        setSelectedProductForDetail,
        selectedProductForTryOn,
        setSelectedProductForTryOn,
        latestOrder,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        updateStyleProfile,
        updateQuizResult,
        addXP,
        placeOrder,
        saveLook,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </GoogleVerseContext.Provider>
  );
};

export const useGoogleVerse = () => {
  const ctx = useContext(GoogleVerseContext);
  if (!ctx) throw new Error('useGoogleVerse must be used within GoogleVerseProvider');
  return ctx;
};

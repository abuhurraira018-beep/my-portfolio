"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from "react";
import { Product } from "@/types/product";
import { initialProducts } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastNotification {
  id: string;
  type: "success" | "info" | "warning" | "danger";
  message: string;
}

interface ShopContextType {
  // Products Management
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => boolean;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  taxAmount: number;
  discountAmount: number;
  cartTotal: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Toast
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  showToast: (message: string, type?: "success" | "info" | "warning" | "danger") => void;

  // Hydration readiness
  isHydrated: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS = "nexora_products_v1";
const LOCAL_STORAGE_CART = "nexora_cart_v1";
const LOCAL_STORAGE_WISHLIST = "nexora_wishlist_v1";

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load state from localStorage on mount safely
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }

      const savedCart = localStorage.getItem(LOCAL_STORAGE_CART);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedWishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.warn("Could not load stored data from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save products to localStorage when changed
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(updatedProducts));
    } catch (e) {
      console.error("Failed to persist products to localStorage:", e);
    }
  };

  // Save cart to localStorage
  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(updatedCart));
    } catch (e) {
      console.error("Failed to persist cart to localStorage:", e);
    }
  };

  // Save wishlist to localStorage
  const saveWishlist = (updatedWishlist: string[]) => {
    setWishlist(updatedWishlist);
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST, JSON.stringify(updatedWishlist));
    } catch (e) {
      console.error("Failed to persist wishlist to localStorage:", e);
    }
  };

  // Toast System
  const showToast = (message: string, type: "success" | "info" | "warning" | "danger" = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastNotification = { id, type, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product Management (Admin/Demo CRUD)
  const addProduct = (newProdData: Omit<Product, "id">) => {
    const id = `prod-${Date.now().toString(36)}`;
    const newProduct: Product = {
      ...newProdData,
      id,
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    showToast(`Product "${newProduct.name}" created successfully.`, "success");
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    });
    saveProducts(updated);

    // Also update product reference in cart if present
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === id) {
          const updatedProd = updated.find((p) => p.id === id);
          return updatedProd ? { ...item, product: updatedProd } : item;
        }
        return item;
      })
    );

    showToast("Product updated successfully.", "success");
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);

    // Also remove from cart and wishlist
    const newCart = cart.filter((item) => item.product.id !== id);
    saveCart(newCart);

    const newWishlist = wishlist.filter((item) => item !== id);
    saveWishlist(newWishlist);

    showToast(`Product "${target?.name || id}" deleted.`, "info");
  };

  const resetProductsToDefault = () => {
    setProducts(initialProducts);
    try {
      localStorage.removeItem(LOCAL_STORAGE_PRODUCTS);
    } catch (e) {
      console.error(e);
    }
    showToast("Product catalog reset to default initial data.", "info");
  };

  // Cart Operations
  const addToCart = (product: Product, quantity: number = 1): boolean => {
    if (product.stock <= 0) {
      showToast(`"${product.name}" is currently out of stock.`, "warning");
      return false;
    }

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      const desiredQty = currentQty + quantity;

      if (desiredQty > product.stock) {
        showToast(
          `Cannot add more. Available stock for "${product.name}" is ${product.stock}.`,
          "warning"
        );
        return false;
      }

      const updated = [...cart];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: desiredQty,
      };
      saveCart(updated);
      showToast(`Updated "${product.name}" quantity to ${desiredQty} in cart.`, "success");
      return true;
    } else {
      if (quantity > product.stock) {
        showToast(`Cannot add ${quantity} units. Available stock is ${product.stock}.`, "warning");
        return false;
      }

      const updated = [...cart, { product, quantity }];
      saveCart(updated);
      showToast(`Added "${product.name}" to cart.`, "success");
      return true;
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const targetProduct = products.find((p) => p.id === productId);
    const maxStock = targetProduct?.stock ?? 999;

    if (quantity > maxStock) {
      showToast(`Requested quantity exceeds available stock (${maxStock}).`, "warning");
      return;
    }

    const updated = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });

    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    const updated = cart.filter((i) => i.product.id !== productId);
    saveCart(updated);
    if (item) {
      showToast(`Removed "${item.product.name}" from cart.`, "info");
    }
  };

  const clearCart = () => {
    saveCart([]);
    showToast("Your shopping cart has been cleared.", "info");
  };

  // Promo Code
  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "NEXORA10") {
      setPromoCode("NEXORA10");
      setDiscountPercent(10);
      showToast("Promo code NEXORA10 applied! 10% discount.", "success");
      return { success: true, message: "10% discount applied!" };
    } else if (clean === "WELCOME20") {
      setPromoCode("WELCOME20");
      setDiscountPercent(20);
      showToast("Promo code WELCOME20 applied! 20% discount.", "success");
      return { success: true, message: "20% discount applied!" };
    } else {
      showToast("Invalid promotional coupon code.", "danger");
      return { success: false, message: "Invalid code. Try 'NEXORA10' or 'WELCOME20'." };
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountPercent(0);
    showToast("Promotional code removed.", "info");
  };

  // Derived calculations
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (discountPercent <= 0) return 0;
    return (cartSubtotal * discountPercent) / 100;
  }, [cartSubtotal, discountPercent]);

  const subtotalAfterDiscount = Math.max(0, cartSubtotal - discountAmount);

  const shippingFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (subtotalAfterDiscount >= siteConfig.shipping.freeShippingThreshold) {
      return 0;
    }
    return siteConfig.shipping.standardShippingFee;
  }, [cart.length, subtotalAfterDiscount]);

  const taxAmount = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotalAfterDiscount * siteConfig.shipping.taxRate;
  }, [cart.length, subtotalAfterDiscount]);

  const cartTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotalAfterDiscount + shippingFee + taxAmount;
  }, [cart.length, subtotalAfterDiscount, shippingFee, taxAmount]);

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    const targetProduct = products.find((p) => p.id === productId);
    if (wishlist.includes(productId)) {
      const updated = wishlist.filter((id) => id !== productId);
      saveWishlist(updated);
      showToast(`Removed "${targetProduct?.name || 'Item'}" from wishlist.`, "info");
    } else {
      const updated = [...wishlist, productId];
      saveWishlist(updated);
      showToast(`Added "${targetProduct?.name || 'Item'}" to wishlist.`, "success");
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        taxAmount,
        discountAmount,
        cartTotal,
        promoCode,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        toasts,
        removeToast,
        showToast,
        isHydrated,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

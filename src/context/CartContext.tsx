import { useState, type ReactNode } from "react";
import type { Product } from "../api/products";
import { CartContext } from "./CartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((currentItems) =>
      currentItems.some((item) => item.id === product.id)
        ? currentItems
        : [...currentItems, product],
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// CartContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { userId } = useContext(UserContext);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(false);

  // Fetch cart count from API
  const fetchCartCount = useCallback(async () => {
    const token = localStorage.getItem("marketpulsetoken");
    if (!userId || !token) {
      setCartCount(0);
      setCart({ products: [] });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/cart/getCart/${userId}`
      );
      
      if (response.data.success && response.data.cart) {
        const cartData = response.data.cart;
        setCart(cartData);
        
        // Calculate total count of all items in cart
        const totalCount = cartData.products?.reduce(
          (sum, item) => sum + (item.count || 0),
          0
        ) || 0;
        setCartCount(totalCount);
      } else {
        setCartCount(0);
        setCart({ products: [] });
      }
    } catch (error) {
      // If cart not found (404), set count to 0
      if (error.response?.status === 404) {
        setCartCount(0);
        setCart({ products: [] });
      } else {
        console.error("Error fetching cart count:", error);
        // Don't reset on other errors to avoid flickering
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Update cart count manually (for immediate UI updates)
  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  // Update cart data
  const updateCart = (cartData) => {
    setCart(cartData || { products: [] });
    const totalCount = cartData?.products?.reduce(
      (sum, item) => sum + (item.count || 0),
      0
    ) || 0;
    setCartCount(totalCount);
  };

  // Refresh cart count
  const refreshCart = useCallback(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  // Fetch cart when userId changes
  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cart,
        loading,
        updateCartCount,
        updateCart,
        refreshCart,
        fetchCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;


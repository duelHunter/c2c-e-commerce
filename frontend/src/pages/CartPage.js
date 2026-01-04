import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CartPage() {
  const { userId } = useContext(UserContext);
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ products: [] });
  const [error, setError] = useState("");

  const [prices, setPrices] = useState({
    originalPrice: 0,
    savings: 0,
    totalPrice: 0,
  });

  // Fetch Cart Details
  const fetchCartDetails = async () => {
    // Check if user is logged in
    const token = localStorage.getItem("marketpulsetoken");
    if (!userId || !token) {
      setError("Please login to view your cart");
      setLoading(false);
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/cart/getCart/${userId}`
      );
      if (response.data.success) {
        const cartData = response.data.cart || { products: [] };
        setCart(cartData);
        calculatePrices(cartData?.products || []);
        // Update cart context
        updateCart(cartData);
      } else {
        setError(response.data.message || "Failed to fetch cart");
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      // If cart not found (404), show empty cart instead of error
      if (err.response?.status === 404) {
        const emptyCart = { products: [] };
        setCart(emptyCart);
        updateCart(emptyCart);
        setError("");
      } else {
        setError("Failed to fetch cart details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  //////////////////////////////////////////////////////////calculatePrices
  const calculatePrices = (products) => {
    if (!products) return;

    const originalPrice = products.reduce(
      (acc, item) => acc + item.product.price * item.count,
      0
    );

    // Calculate savings (you can modify this logic based on your requirements)
    const savings = products.reduce(
      (acc, item) => acc + item.product.price * item.count * 0.1, // 10% savings example
      0
    );

    const totalPrice = originalPrice - savings;

    setPrices({
      originalPrice: parseFloat(originalPrice.toFixed(2)),
      savings: parseFloat(savings.toFixed(2)),
      totalPrice: parseFloat(totalPrice.toFixed(2)),
    });

    console.log(originalPrice, savings, totalPrice);
  };

  // Function to Update Cart Item Quantity
  const updateCartItemQuantity = async (productId, count) => {
    if (count < 1) {
      toast.warning("Minimum quantity is 1");
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem("marketpulsetoken");
    if (!userId || !token) {
      toast.warning("Please login to update cart");
      navigate("/login");
      return;
    }

    // Ensure productId is a string
    const productIdStr = productId?.toString ? productId.toString() : productId;
    
    if (!productIdStr) {
      toast.error("Invalid product ID");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/cart/updateCartItem`,
        {
          userId: userId.toString(),
          productId: productIdStr,
          count: parseInt(count, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const cartData = response.data.cart || { products: [] };
        setCart(cartData);
        calculatePrices(cartData?.products || []);
        // Update cart context
        updateCart(cartData);
        // Don't show success toast for every increment/decrement to avoid spam
        // toast.success("Cart item updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update cart item");
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
      if (error.response?.status === 404) {
        // Cart might have been deleted or product removed, refresh cart
        toast.warning("Cart item not found. Refreshing cart...");
        setTimeout(() => {
          fetchCartDetails();
        }, 1000);
      } else {
        toast.error(error.response?.data?.message || "Failed to update cart item");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to Remove Item from Cart
  const removeCartItem = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/cart/removeItem`,
        {
          data: {
            userId,
            productId,
          },
        }
      );

      if (response.data.success) {
        const cartData = response.data.cart || { products: [] };
        setCart(cartData);
        calculatePrices(cartData.products || []);
        // Update cart context
        updateCart(cartData);
        toast.success(response.data.message || "Item removed from cart");
      } else {
        toast.error(response.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [userId]); // Re-fetch when userId changes

  return (
    <div>
      <section className="bg-white py-4 antialiased dark:bg-gray-900 sm:py-6 md:py-8 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 2xl:px-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl md:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-4 sm:mt-6 md:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {/* item list is start here */}
              <div className="p-3 sm:p-4 md:p-6">
                {loading && <p>Loading...</p>}
                {error && !loading && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                {!loading && !error && cart.products && cart.products.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {cart.products.map((item) => (
                      <div
                        key={item.product._id}
                        className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-4 md:p-6"
                      >
                        <div className="space-y-4 sm:flex sm:items-start sm:gap-4 md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <a href="#" className="shrink-0 sm:order-1 md:order-1">
                            <img
                              className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded dark:hidden"
                              src={
                                item.product.images?.[0]?.url
                                  ? `${process.env.REACT_APP_UPLOADS}${item.product.images[0].url}`
                                  : "/placeholder-image.png"
                              }
                              alt={item.product.title || "Product Image"}
                              loading="lazy"
                            />

                            <img
                              className="hidden h-16 w-16 sm:h-20 sm:w-20 dark:block object-cover rounded"
                              src={
                                item.product.images?.[0]?.url
                                  ? `${process.env.REACT_APP_UPLOADS}${item.product.images[0].url}`
                                  : "/placeholder-image.png"
                              }
                              alt={item.product.title || "Product Image"}
                              loading="lazy"
                            />
                          </a>

                          <label htmlFor="counter-input" className="sr-only">
                            Choose quantity:
                          </label>
                          <div className="flex items-center justify-between sm:order-3 sm:justify-end md:order-3">
                            <div className="flex items-center">
                              <button
                                onClick={() => {
                                  if (item.count <= 1) {
                                    toast.warning("Minimum quantity is 1");
                                    return;
                                  }
                                  updateCartItemQuantity(
                                    item.product._id || item.product,
                                    item.count - 1
                                  );
                                }}
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                className="inline-flex h-6 w-6 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <input
                                type="text"
                                id="counter-input"
                                data-input-counter
                                className="w-12 sm:w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                placeholder=""
                                value={item.count}
                                readOnly
                              />
                              <button
                                onClick={() =>
                                  updateCartItemQuantity(
                                    item.product._id || item.product,
                                    item.count + 1
                                  )
                                }
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                className="inline-flex h-6 w-6 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="text-end sm:order-4 sm:w-24 md:w-32">
                              <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                                Rs.{item.product.price}
                              </p>
                            </div>
                          </div>

                          <div className="w-full min-w-0 flex-1 space-y-2 sm:space-y-4 sm:order-2 sm:max-w-md">
                            <a
                              href="#"
                              className="text-sm sm:text-base font-medium text-gray-900 hover:underline dark:text-white line-clamp-2"
                            >
                              {item.product.title}
                            </a>

                            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                              <button
                                type="button"
                                className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                  />
                                </svg>
                                Add to Favorites
                              </button>

                              <button
                                onClick={() => removeCartItem(item.product._id)}
                                type="button"
                                className="inline-flex items-center text-xs sm:text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !loading && !error && (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
                      <a
                        href="/"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Continue Shopping
                      </a>
                    </div>
                  )
                )}
              </div>
              {/* item list end here */}
              {/* product suggestion starts */}
              <div className="mt-6 sm:mt-8 lg:mt-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                  People also bought
                </h3>
                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-4 sm:space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" className="overflow-hidden rounded block">
                      <img
                        className="mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                        alt="imac image"
                      />
                      <img
                        className="mx-auto hidden h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                        alt="imac image"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        className="text-base sm:text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        iMac 27"
                      </a>
                      <p className="mt-2 text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400 line-clamp-2">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        <span className="line-through"> $399,99 </span>
                      </p>
                      <p className="text-base sm:text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                        $299
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-6 flex items-center gap-2.5">
                      <button
                        data-tooltip-target="favourites-tooltip-1"
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="favourites-tooltip-1"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Add to favourites
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          className="-ms-2 me-2 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4 sm:space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" className="overflow-hidden rounded block">
                      <img
                        className="mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                        alt="imac image"
                      />
                      <img
                        className="mx-auto hidden h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
                        alt="imac image"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        className="text-base sm:text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        Playstation 5
                      </a>
                      <p className="mt-2 text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400 line-clamp-2">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        <span className="line-through"> $799,99 </span>
                      </p>
                      <p className="text-base sm:text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                        $499
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-6 flex items-center gap-2.5">
                      <button
                        data-tooltip-target="favourites-tooltip-2"
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="favourites-tooltip-2"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Add to favourites
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          className="-ms-2 me-2 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4 sm:space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" className="overflow-hidden rounded block">
                      <img
                        className="mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                        alt="imac image"
                      />
                      <img
                        className="mx-auto hidden h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                        alt="imac image"
                      />
                    </a>
                    <div>
                      <a
                        href="#"
                        className="text-base sm:text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        Apple Watch Series 8
                      </a>
                      <p className="mt-2 text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400 line-clamp-2">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        <span className="line-through"> $1799,99 </span>
                      </p>
                      <p className="text-base sm:text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                        $1199
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-6 flex items-center gap-2.5">
                      <button
                        data-tooltip-target="favourites-tooltip-3"
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="favourites-tooltip-3"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Add to favourites
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>

                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          className="-ms-2 me-2 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* product suggestion ends here */}
            </div>

            {/* payment and total section starts here */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-4 sm:space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-2 sm:gap-4">
                      <dt className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                        Rs.{prices.originalPrice.toFixed(2)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-2 sm:gap-4">
                      <dt className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-sm sm:text-base font-medium text-green-600">
                        -Rs.{prices.savings.toFixed(2)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-2 sm:gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                        Rs.{prices.totalPrice.toFixed(2)}
                      </dd>
                    </dl>
                  </div>
                </div>

                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to Checkout
                </a>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
            {/* payment and total section ends here */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartPage;

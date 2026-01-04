// ProductCard.jsx
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({
  id,
  productName,
  price,
  imageSrc,
  discount
}) => {
  console.log("product id is, ", id);

  //get userId using useContext
  const { userId } = useContext(UserContext);
  const { refreshCart } = useContext(CartContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);
  console.log("user id is (from useContext), ", userId);

  // Check if product is in wishlist
  useEffect(() => {
    const checkWishlistStatus = async () => {
      const token = localStorage.getItem("marketpulsetoken");
      if (!userId || !token) {
        setIsInWishlist(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/wishlist/check/${userId}/${id}`
        );
        if (response.data.success) {
          setIsInWishlist(response.data.isInWishlist);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkWishlistStatus();
  }, [userId, id]);
  
  // Function to handle Add to Cart
  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    
    // Check if user is logged in
    const token = localStorage.getItem("marketpulsetoken");
    if (!userId || !token) {
      toast.warning("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/cart/createCart`, 
        {
          userId: userId,
          productId: id,
          count: 1, 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        toast.success("Item added to cart successfully!");
        // Refresh cart count in header
        refreshCart();
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Check if error is due to authentication
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.warning("Please login to add items to cart");
        navigate("/login");
      } else {
        toast.error("An error occurred while adding the item to the cart.");
      }
    }
  };

  // Function to handle Add to Wishlist
  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigation when clicking the button

    const token = localStorage.getItem("marketpulsetoken");
    if (!userId || !token) {
      toast.warning("Please login to add items to wishlist");
      navigate("/login");
      return;
    }

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_API_URL}/wishlist/remove`,
          {
            data: {
              userId,
              productId: id,
            },
          }
        );
        if (response.data.success) {
          setIsInWishlist(false);
          toast.success("Removed from wishlist");
        }
      } else {
        // Add to wishlist
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/wishlist/add`,
          {
            userId,
            productId: id,
          }
        );
        if (response.data.success) {
          setIsInWishlist(true);
          toast.success("Added to wishlist");
        } else if (response.data.message === "Product already in wishlist") {
          setIsInWishlist(true);
          toast.info("Product already in wishlist");
        }
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.warning("Please login to manage wishlist");
        navigate("/login");
      } else {
        toast.error("An error occurred while managing wishlist.");
      }
    }
  };

  return (
    <div>
      <Link to={`/product/${id}`}>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="h-56 w-full">
            <img
              className="mx-auto h-full dark:hidden"
              src={`${process.env.REACT_APP_UPLOADS}${imageSrc}`}
              alt={productName}
            />
            <img
              className="mx-auto hidden h-full dark:block"
              src={imageSrc}
              alt={productName}
            />
          </div>
          <div className="pt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              {discount && (
                <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                  Up to {discount} off
                </span>
              )}
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Quick look</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleAddToWishlist}
                  className={`rounded-lg p-2 transition-colors ${
                    isInWishlist
                      ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <span className="sr-only">Add to Favorites</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isInWishlist ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {productName}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Rs.{price}
            </p>

            <button
              className="mt-4 w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

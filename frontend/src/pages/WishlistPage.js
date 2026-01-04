import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function WishlistPage() {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState({ products: [] });
  const [error, setError] = useState("");

  // Fetch Wishlist Details
  const fetchWishlist = async () => {
    const token = localStorage.getItem("marketpulsetoken");
    if (!userId || !token) {
      setError("Please login to view your wishlist");
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/wishlist/${userId}`
      );
      if (response.data.success) {
        setWishlist(response.data.wishlist || { products: [] });
      } else {
        setError(response.data.message || "Failed to fetch wishlist");
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      if (err.response?.status === 404) {
        setWishlist({ products: [] });
        setError("");
      } else {
        setError("Failed to fetch wishlist details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem("marketpulsetoken");
    if (!userId || !token) {
      toast.warning("Please login to manage wishlist");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/wishlist/remove`,
        {
          data: {
            userId,
            productId,
          },
        }
      );

      if (response.data.success) {
        const updatedWishlist = response.data.wishlist || { products: [] };
        setWishlist(updatedWishlist);
        toast.success("Item removed from wishlist");
      } else {
        toast.error(response.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <section className="bg-white py-4 antialiased dark:bg-gray-900 sm:py-6 md:py-8 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 2xl:px-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl md:text-2xl mb-6">
            My Wishlist
          </h2>

          {loading && <p className="text-center py-8">Loading...</p>}
          {error && !loading && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {!loading && !error && wishlist.products && wishlist.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {wishlist.products.map((item) => (
                <div
                  key={item.product._id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 hover:shadow-md transition-shadow"
                >
                  <Link to={`/product/${item.product._id}`}>
                    <div className="h-48 w-full mb-4 overflow-hidden rounded-lg">
                      <img
                        className="h-full w-full object-cover"
                        src={
                          item.product.images?.[0]?.url
                            ? `${process.env.REACT_APP_UPLOADS}${item.product.images[0].url}`
                            : "/placeholder-image.png"
                        }
                        alt={item.product.title || "Product"}
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.product.title}
                    </h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Rs.{item.product.price}
                    </p>
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={() => removeFromWishlist(item.product._id)}
                      className="flex-1 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/product/${item.product._id}`}
                      className="flex-1 rounded-lg bg-primary-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-24 w-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Your wishlist is empty
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Start adding products you love to your wishlist!
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-block rounded-lg bg-primary-700 px-6 py-3 text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                >
                  Browse Products
                </Link>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default WishlistPage;


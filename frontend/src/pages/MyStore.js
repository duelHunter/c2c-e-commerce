import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListItemsModel from "../components/ListItemsModel";

function MyStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's products
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem("marketpulsetoken");
        if (!token) {
          setError("Please login to view your store");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/product/getMyProducts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data.products || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.msg || err.response?.data?.error || "Failed to load products");
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  // Refresh products after a new product is created
  const handleProductCreated = () => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem("marketpulsetoken");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/product/getMyProducts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Error refreshing products:", err);
      }
    };
    fetchMyProducts();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
        <div className="flex justify-center items-center min-h-64">
          <p className="text-lg">Loading your products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Store</h1>
        <button
          onClick={() => {
            // Trigger the ListItemsModel modal
            const event = new CustomEvent('openListModal');
            window.dispatchEvent(event);
          }}
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
        >
          + List New Item
        </button>
      </div>

      {products.length === 0 ? (
        <ListItemsModel onProductCreated={handleProductCreated} showEmptyState={true} />
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              You have <span className="font-semibold">{products.length}</span> item{products.length !== 1 ? 's' : ''} listed
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {product.images && product.images.length > 0 && product.images[0]?.url ? (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_API_URL}${product.images[0].url}`}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">No Image</div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Rs. {product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Qty: {product.quantity}
                    </span>
                  </div>
                  {product.sold > 0 && (
                    <div className="mt-2 text-sm text-green-600">
                      Sold: {product.sold}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                const event = new CustomEvent('openListModal');
                window.dispatchEvent(event);
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
            >
              + List Another Item
            </button>
          </div>
          {/* Render ListItemsModel without empty state for modal functionality */}
          <ListItemsModel onProductCreated={handleProductCreated} showEmptyState={false} />
        </>
      )}
    </div>
  );
}

export default MyStore;

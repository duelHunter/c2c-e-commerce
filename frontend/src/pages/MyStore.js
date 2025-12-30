import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import ListItemsModel from "../components/ListItemsModel";

function MyStore() {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

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

  // Delete product
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(productId);
      const token = localStorage.getItem("marketpulsetoken");
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/product/deleteProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Remove product from state
      setProducts(products.filter(p => p._id !== productId));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  // Handle edit - open edit modal (we'll use the ListItemsModel for editing)
  const handleEdit = (product) => {
    // Store product data for editing
    setEditingId(product._id);
    // Trigger edit modal with product data
    const event = new CustomEvent('openEditModal', { detail: product });
    window.dispatchEvent(event);
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
          
          {/* List View */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            {product.images && product.images.length > 0 && product.images[0]?.url ? (
                              <img
                                src={`${process.env.REACT_APP_UPLOADS}${product.images[0].url}`}
                                alt={product.title}
                                className="h-16 w-16 object-cover rounded"
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <Link to={`/product/${product._id}`}>
                              <div className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                {product.title}
                              </div>
                            </Link>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          Rs. {product.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.sold || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                            disabled={editingId === product._id}
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                            disabled={deletingId === product._id}
                          >
                            {deletingId === product._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

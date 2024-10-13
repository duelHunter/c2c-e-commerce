import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

/////////////////////////send request to backend using fetch api
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/product/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "Error fetching product");
        setLoading(false);
      }
    };
  
    fetchProductData();
  }, [productId]);

    // Handle loading and error states
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Product Image and Info */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">${product.price}</p>

          {/* Quantity Selector */}
          {/* <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 font-medium">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-16 p-2 border border-gray-300 rounded-md text-center"
            />
          </div> */}

          {/* Add to Cart Button */}
          {/* <button
            onClick={}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-500"
          >
            Add to Cart
          </button> */}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
        <p className="text-gray-700">{product.details}</p>
      </div>
    </div>
  );
}

export default ProductPage;

import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ProductPage({ products }) {
  const { productId } = useParams(); // Get productId from URL
  const product = products.find((p) => p.id === parseInt(productId)); // Find product by ID

  const [quantity, setQuantity] = useState(1);

  // Handler for adding product to the cart
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
    // Add your logic to add the product to the cart here
  };

  // Return null or some error message if the product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

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
          <div className="flex items-center mb-6">
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
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-500"
          >
            Add to Cart
          </button>
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

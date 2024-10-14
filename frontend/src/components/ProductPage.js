import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

/////////////////////////send request to backend using fetch api
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/product/getSelectedProduct/${productId}`);
        console.log(response);
        setProduct(response.data.product);
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1>{product.title}</h1>
    </div>
  );
}

export default ProductPage;

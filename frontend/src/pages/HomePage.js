import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
// import Meta from "../components/Meta";
function HomePage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   // Fetch products from the backend
   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/product/getAllproducts`); 
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-2xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            productName={product.title}
            price={product.price}
            imageSrc={
              product.images && product.images.length > 0 && product.images[0]?.url
                ? product.images[0].url
                : "/placeholder-image.png"
            }
            discount='35%'
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

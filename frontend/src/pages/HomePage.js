import React from "react";
import { Link } from "react-router-dom";
import mainBanner from "../images/main-banner-1.jpg";
import catBanner from "../images/catbanner-01.jpg";
import catBanner2 from "../images/catbanner-02.jpg";
import catBanner3 from "../images/catbanner-03.jpg";
import catBanner4 from "../images/catbanner-04.jpg";
import service from "../images/service.png";
import service2 from "../images/service-02.png";
import service3 from "../images/service-03.png";
import service4 from "../images/service-04.png";
import service5 from "../images/service-05.png";
import brand1 from "../images/brand-01.png";
import brand2 from "../images/brand-02.png";
import brand3 from "../images/brand-03.png";
import brand4 from "../images/brand-04.png";
import brand5 from "../images/brand-05.png";
import brand6 from "../images/brand-06.png";
import brand7 from "../images/brand-07.png";
import brand8 from "../images/brand-08.png";
import blog1 from "../images/blog-1.jpg";
import camera from "../images/camera.jpg";
import tv from "../images/tv.jpg";
import watches from "../images/watch.jpg";
import gaming from "../images/headphone.jpg";
// import Marquee from "react-fast-marquee";
// import BlogCard from "../components/BlogCard";
// import ProductCard from "../components/ProductCard";
// import SpecialProduct from "../components/SpecialProduct";
import AppleWatch from "../images/subbanner-01.webp";
import laptop from "../images/subbanner-02.webp";
import phone from "../images/subbanner-03.webp";
import speaker from "../images/subbanner-04.webp";
import ProductCard from "../components/ProductCard";
// import Meta from "../components/Meta";
function HomePage() {
  // Array of product data
  const products = [
    {
      id: 1,
      productName: 'iMac 2024',
      price: 2999.99,
      imageSrc: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg',
      discount: '35%',
    },
    {
      id: 2,
      productName: 'MacBook Pro',
      price: 1999.99,
      imageSrc: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro.svg',
      discount: '20%',
    },
    // Add 6 more products similarly
    {
      id: 3,
      productName: 'iPhone 14',
      price: 999.99,
      imageSrc: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone.svg',
      discount: '10%',
    },
    {
      id: 4,
      productName: 'Apple Watch',
      price: 399.99,
      imageSrc: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch.svg',
      discount: '15%',
    },
    {
      id: 5,
      productName: 'AirPods Pro',
      price: 249.99,
      imageSrc: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/airpods.svg',
      discount: null,
    },
    {
      id: 6,
      productName: 'iPad Pro',
      price: 1099.99,
      imageSrc: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad.svg',
      discount: '25%',
    },
    {
      id: 7,
      productName: 'HomePod',
      price: 299.99,
      imageSrc: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/homepod.svg',
      discount: null,
    },
    {
      id: 8,
      productName: 'Apple TV 4K',
      price: 179.99,
      imageSrc: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-tv.svg',
      discount: '5%',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-2xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            id={product.id}
            productName={product.productName}
            price={product.price}
            imageSrc={product.imageSrc}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

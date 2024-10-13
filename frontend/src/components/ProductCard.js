// ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, productName, price, imageSrc, discount }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <a href="#">
          <img className="mx-auto h-full dark:hidden" src={`${process.env.REACT_APP_UPLOADS}${imageSrc}`} alt={productName} />
          <img className="mx-auto hidden h-full dark:block" src={imageSrc} alt={productName} />
        </a>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          {discount && (
            <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              Up to {discount} off
            </span>
          )}
          <div className="flex items-center justify-end gap-1">
            <button type="button" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Quick look</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
            <button type="button" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Add to Favorites</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" d="M16.5 3.5A3.5 3.5 0 0 1 20 7a3.5 3.5 0 0 1-1.525 2.887l-.975.617v7.021a1.5 1.5 0 0 1-1.5 1.5h-8a1.5 1.5 0 0 1-1.5-1.5V10.5l-.975-.617A3.5 3.5 0 0 1 4 7a3.5 3.5 0 0 1 3.5-3.5h9Z" />
              </svg>
            </button>
          </div>
        </div>

        <a href="#">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{productName}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">${price}</p>
        </a>

        <button className="mt-4 w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800">
          Add to cart
        </button>
        <Link
              to={`/product/${id}`}
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-500"
            >
              View Product
            </Link>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import axios from "axios";  
//change this
import acc from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";

function Header() {
  const { setUserId } = useContext(UserContext);
  const { cartCount } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("marketpulsetoken");

      if (token) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/isLogedin`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response && response.status === 200) {
            setIsLoggedIn(true);
            const userId = response.data.user.id;
            console.log("user id is ", userId);
            setUserId(userId);
          } else {
            // Token is expired or invalid
            localStorage.removeItem("marketpulsetoken");
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("marketpulsetoken");
          setIsLoggedIn(false);
        }
      }
    };

    checkLoginStatus();
  }, [setUserId]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      {/* First header - Top banner */}
      <header className="bg-gray-800 text-white py-2 sm:py-3 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 sm:gap-0 text-xs sm:text-sm">
          <div className="text-center sm:text-left">
            <p className="mb-0">Free shipping over Rs.500 & Free Shipping</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="mb-0">
              Hotline:{" "}
              <a className="text-white hover:underline" href="tel:+9478324653">
                +94 783 24653
              </a>
            </p>
          </div>
        </div>
      </header>
      
      {/* Second header - Main header */}
      <header className="bg-gray-900 text-white py-2 sm:py-3 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Logo */}
            <div className="w-full sm:w-auto sm:flex-shrink-0 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl">
                <Link className="text-white hover:text-gray-300" to={"/"}>
                  Market Pulse
                </Link>
              </h3>
            </div>
            
            {/* Search Bar */}
            <div className="w-full sm:w-1/2 lg:w-2/5 order-3 sm:order-2">
              <div className="flex">
                <input
                  type="text"
                  className="form-input w-full py-2 px-3 sm:px-4 border rounded-l-md text-gray-900 text-sm sm:text-base"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                />
                <span className="bg-gray-700 text-white p-2 border border-gray-600 rounded-r-md cursor-pointer hover:bg-gray-600">
                  <BsSearch className="text-base sm:text-lg" />
                </span>
              </div>
            </div>
            
            {/* Icons Section */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-end gap-3 sm:gap-2 md:gap-4 order-2 sm:order-3 sm:flex-shrink-0">
              <Link className="flex items-center hover:text-gray-300 transition-colors" to={"/mystore"}>
                <img src={acc} alt="Compare" className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm hidden sm:inline">My Store</span>
              </Link>
              <Link className="flex items-center hover:text-gray-300 transition-colors" to={"/wishlist"}>
                <img src={wishlist} alt="Wishlist" className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm hidden md:inline">
                  <span className="hidden lg:inline">Favourite </span>
                  <span className="hidden sm:inline">Wishlist</span>
                </span>
              </Link>
              <a 
                className="flex items-center hover:text-gray-300 transition-colors" 
                href={isLoggedIn ? `${process.env.REACT_APP_FRONTEND_URL}/profile` : `${process.env.REACT_APP_FRONTEND_URL}/signup`}
              >
                <img src={user} alt="User" className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm hidden sm:inline">{isLoggedIn ? "My Account" : "Sign Up"}</span>
              </a>  
              <Link to={'/cart'} className="flex items-center hover:text-gray-300 transition-colors relative">
                <img src={cart} alt="Cart" className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-1.5 py-0.5 rounded-full font-semibold min-w-[20px] text-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm hidden sm:inline">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Third header - Navigation */}
      <header className="bg-gray-800 text-white py-2 sm:py-3 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Categories Button */}
            <div>
              <div className="relative inline-block text-left">
                <button
                  className="bg-transparent border-0 text-white px-2 sm:px-4 py-2 flex items-center gap-2 hover:text-gray-300 transition-colors"
                  type="button"
                  id="dropdownMenuButton1"
                  aria-expanded="false"
                >
                  <img src={menu} alt="Menu" className="w-5 h-5 sm:w-7 sm:h-7" />
                  <span className="text-sm sm:text-base">Shop Categories</span>
                </button>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              <NavLink to={"/"} className="hover:text-gray-300 transition-colors text-sm lg:text-base">HOME</NavLink>
              <NavLink to={"/store"} className="hover:text-gray-300 transition-colors text-sm lg:text-base">OUR STORE</NavLink>
              <NavLink to={"/blog"} className="hover:text-gray-300 transition-colors text-sm lg:text-base">BLOGS</NavLink>
              <NavLink to={"/contact"} className="hover:text-gray-300 transition-colors text-sm lg:text-base">CONTACT</NavLink>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              <div className="flex flex-col space-y-3">
                <NavLink 
                  to={"/"} 
                  className="hover:text-gray-300 transition-colors text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </NavLink>
                <NavLink 
                  to={"/store"} 
                  className="hover:text-gray-300 transition-colors text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  OUR STORE
                </NavLink>
                <NavLink 
                  to={"/blog"} 
                  className="hover:text-gray-300 transition-colors text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  BLOGS
                </NavLink>
                <NavLink 
                  to={"/contact"} 
                  className="hover:text-gray-300 transition-colors text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;

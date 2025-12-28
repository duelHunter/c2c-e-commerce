import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "../context/UserContext";

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

  return (
    <div>
      <header className="bg-gray-800 text-white py-3 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex justify-between">
          <div>
            <p className="mb-0">Free shipping over Rs.500 & Free Shipping</p>
          </div>
          <div>
            <p className="mb-0 text-right">
              Hotline:{" "}
              <a className="text-white" href="tel:+91 8291735882">
                +94 783 24653
              </a>
            </p>
          </div>
        </div>
      </header>
      {/* Second header */}
      <header className="bg-gray-900 text-white py-3 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-1/6 text-center">
            <h3 className="text-xl">
              <Link className="text-white" to={"/"}>
                Market Pulse
              </Link>
            </h3>
          </div>
          <div className="w-1/2">
            <div className="flex">
              <input
                type="text"
                className="form-input w-full py-2 px-4 border rounded-l-md"
                placeholder="Search Product Here..."
                aria-label="Search Product Here..."
              />
              <span className="bg-gray-700 text-white p-2 border border-gray-600 rounded-r-md">
                <BsSearch className="text-lg" />
              </span>
            </div>
          </div>
          <div className="w-1/4 flex justify-between">
            <Link className="flex items-center" to={"/mystore"}>
              <img src={acc} alt="Compare" className="w-6 h-6 mr-2" />
              <p>My Store</p>
            </Link>
            <Link className="flex items-center">
              <img src={wishlist} alt="Wishlist" className="w-6 h-6 mr-2" />
              <p>Favourite <br /> Wishlist</p>
            </Link>
            <a className="flex items-center" href={isLoggedIn ? `${process.env.REACT_APP_FRONTEND_URL}/profile` : `${process.env.REACT_APP_FRONTEND_URL}/signup`}>
              <img src={user} alt="User" className="w-6 h-6 mr-2" />
              <p>{isLoggedIn ? "My Account" : "Sign Up"}</p>
            </a>  
            <Link to={'/cart'} className="flex items-center">
              <img src={cart} alt="Cart" className="w-6 h-6 mr-2" />
              <div className="flex flex-col">
                <span className="bg-white text-black p-1 rounded-full">0</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
      {/* Third header */}
      <header className="bg-gray-800 text-white py-3 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="relative inline-block text-left">
                <img src={menu} alt="Menu" className="w-7 h-7" />
                <button
                  className="bg-transparent border-0 text-white px-4 py-2"
                  type="button"
                  id="dropdownMenuButton1"
                  aria-expanded="false"
                >
                  Shop Categories
                </button>
              </div>
            </div>
            <div className="flex space-x-6">
              <NavLink to={"/"} className="hover:text-gray-300">HOME</NavLink>
              <NavLink to={"/store"} className="hover:text-gray-300">OUR STORE</NavLink>
              <NavLink to={"/blog"} className="hover:text-gray-300">BLOGS</NavLink>
              <NavLink to={"/contact"} className="hover:text-gray-300">CONTACT</NavLink>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import acc from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import jwt_decode from "jwt-decode";

function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // useEffect(() => {
    //     // Check if the token exists in local storage
    //     const token = localStorage.getItem("token");
    
    //     if (token) {
    //       try {
    //         // Decode the token to get user information
    //         const decodedToken = jwt_decode(token);
    
    //         // Check if the token is expired
    //         const currentTime = Date.now() / 1000; // in seconds
    //         if (decodedToken.exp > currentTime) {
    //           setIsLoggedIn(true);
    //         } else {
    //           // Token is expired
    //           localStorage.removeItem("token");
    //         }
    //       } catch (error) {
    //         console.error("Invalid token:", error);
    //         localStorage.removeItem("token");
    //       }
    //     }
    //   }, []);



    return (
        <>
            <header className="bg-gray-800 text-white py-3">
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
            {/* ///////////////////// */}
            <header className="bg-gray-900 text-white py-3">
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
                        <Link className="flex items-center">
                            <img src={acc} alt="Compare" className="w-6 h-6 mr-2" />
                            <p>Compare <br /> Products</p>
                        </Link>
                        <Link className="flex items-center">
                            <img src={wishlist} alt="Wishlist" className="w-6 h-6 mr-2" />
                            <p>Favourite <br /> Wishlist</p>
                        </Link>
                        <a className="flex items-center" href={isLoggedIn ? "http://localhost:3000/profile" : "http://signup.localhost:3000/"}>
                            <img src={user} alt="User" className="w-6 h-6 mr-2" />
                            <p>{isLoggedIn ? "My Account" : "Sign Up"}</p>
                        </a>  
                        
                        <Link className="flex items-center">
                            <img src={cart} alt="Cart" className="w-6 h-6 mr-2" />
                            <div className="flex flex-col">
                                <span className="bg-white text-black p-1 rounded-full">0</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
            {/* ///////////////////////////////////////// */}
            <header className="bg-gray-800 text-white py-3">
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
                                {/* <ul
                                    className="absolute left-0 mt-2 bg-white text-black border border-gray-200 rounded-lg shadow-lg"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <li>
                                        <Link className="block px-4 py-2 hover:bg-gray-100" to="/">
                                            Action
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="block px-4 py-2 hover:bg-gray-100" to="/s">
                                            Another action
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="block px-4 py-2 hover:bg-gray-100" to="/">
                                            Something else here
                                        </Link>
                                    </li>
                                </ul> */}
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
        </>
    );
}

export default Header;
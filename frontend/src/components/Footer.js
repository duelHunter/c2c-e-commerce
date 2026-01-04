import React from "react";
import newsLetter from "../images/newsletter.png";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="py-8 bg-gray-800 text-white px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2 flex items-center mb-4 md:mb-0">
            <img src={newsLetter} alt="Newsletter" className="mr-4" />
            <h3 className="text-lg">Sign Up for Newsletter</h3>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex">
              <input
                type="text"
                className="form-input py-2 px-4 border border-gray-300 rounded-l-md"
                placeholder="Your Email Address"
                aria-label="Your Email Address"
              />
              <button className="bg-blue-600 text-white py-2 px-4 border border-blue-700 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-8 bg-gray-900 text-white px-4 md:px-8 lg:px-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl mb-4">Contact Us</h4>
            <address className="text-base mb-3">
              147 Kottawa Road, Nugegoda
            </address>
            <a href="tel:+91 8291735882" className="block mb-2">
              +94117551111
            </a>
            <a href="mailto:contact.marketpulse@gmail.com" className="block mb-2">
              contact.marketpulse@gmail.com
            </a>
            <div className="flex gap-4 mt-4">
              <a
                href="http://localhost:3000/profile"
                target="_blank"
                rel="noreferrer"
                className="text-white text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="http://localhost:3000/profile"
                target="_blank"
                rel="noreferrer"
                className="text-white text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="http://localhost:3000/profile"
                target="_blank"
                rel="noreferrer"
                className="text-white text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="http://localhost:3000/profile"
                target="_blank"
                rel="noreferrer"
                className="text-white text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl mb-4">Information</h4>
            <Link to="/privacy-policy" className="block py-2 hover:text-gray-300">Privacy Policy</Link>
            <Link to="/refund-policy" className="block py-2 hover:text-gray-300">Refund Policy</Link>
            <Link to="/shipping-policy" className="block py-2 hover:text-gray-300">Shipping Policy</Link>
            <Link to="/terms-of-service" className="block py-2 hover:text-gray-300">Terms of Service</Link>
          </div>
          <div>
            <h4 className="text-xl mb-4">Account</h4>
            <Link to="/search" className="block py-2 hover:text-gray-300">Search</Link>
            <Link to="/about-us" className="block py-2 hover:text-gray-300">About Us</Link>
            <Link to="/faq" className="block py-2 hover:text-gray-300">FAQ</Link>
            <Link to="/contact" className="block py-2 hover:text-gray-300">Contact</Link>
          </div>
          <div>
            <h4 className="text-xl mb-4">Quick Links</h4>
            <Link to="/accessories" className="block py-2 hover:text-gray-300">Accessories</Link>
            <Link to="/laptops" className="block py-2 hover:text-gray-300">Laptops</Link>
            <Link to="/headphones" className="block py-2 hover:text-gray-300">Headphones</Link>
            <Link to="/tables" className="block py-2 hover:text-gray-300">Tables</Link>
            <Link to="/watches" className="block py-2 hover:text-gray-300">Watches</Link>
          </div>
        </div>
      </footer>
      <footer className="py-4 bg-gray-900 text-white px-4 md:px-8 lg:px-16">
        <div className="container mx-auto text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Powered by Market Pulse</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

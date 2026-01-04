// App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import Profile from "./pages/Profile";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import MyStore from "./pages/MyStore";
import ProductPage from "./components/ProductPage";
import HeaderFooterLayout from "./components/HeaderFooterLayout";
import EmptyLayout from "./components/EmptyLayout";
import UserProvider from "./context/UserContext";
import CartProvider from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/Toast";
import CheckoutForm from "./components/CheckoutForm"; 
import { Elements } from "@stripe/react-stripe-js"; 
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute"; 

// Load your Stripe publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
console.log("key is  ",process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const totalPrice = 989;
const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <ToastContainer />
            <Routes>
          {/* EmptyLayout for pages without header and footer */}
          <Route path="/" element={<EmptyLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* HeaderFooterLayout for pages with header and footer */}
          <Route path="/" element={<HeaderFooterLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mystore"
              element={
                <ProtectedRoute>
                  <MyStore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />
            
            {/* Route for product page with dynamic productId */}
            <Route path="/product/:productId" element={<ProductPage />} />

            {/* Route for Checkout */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm totalPrice={totalPrice} />
                  </Elements>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      </ToastProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default App;

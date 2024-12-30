// App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import MyStore from "./pages/MyStore";
import ProductPage from "./components/ProductPage";
import HeaderFooterLayout from "./components/HeaderFooterLayout";
import EmptyLayout from "./components/EmptyLayout";
import UserProvider from "./context/UserContext";
import CheckoutForm from "./components/CheckoutForm"; 
import { Elements } from "@stripe/react-stripe-js"; 
import { loadStripe } from "@stripe/stripe-js"; 

// Load your Stripe publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const totalPrice = 100.0;
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* EmptyLayout for pages without header and footer */}
          <Route path="/" element={<EmptyLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* HeaderFooterLayout for pages with header and footer */}
          <Route path="/" element={<HeaderFooterLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/mystore" element={<MyStore />} />
            
            {/* Route for product page with dynamic productId */}
            <Route path="/product/:productId" element={<ProductPage />} />

            {/* Route for Checkout */}
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutForm totalPrice={totalPrice} />
                </Elements>
              }
            />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

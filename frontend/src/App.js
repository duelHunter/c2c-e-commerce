import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Profile from './pages/Profile';
import Signup from './components/SignUp';
import Login from './components/Login'; 

// import About from './pages/About'; 
// import Contact from './pages/Contact';
import useSubdomain from './hooks/useSubdomain';
import HeaderFooterLayout from './components/HeaderFooterLayout';
import EmptyLayout from './components/EmptyLayout';

const App = () => {
  const subdomain = useSubdomain();

  return (
    <Router>
      <Routes>
        {subdomain === 'signup' || subdomain === 'login' ? (
          <>
            <Route path="/" element={<EmptyLayout />}>
              {subdomain === 'signup' && <Route index element={<Signup />} />}
              {subdomain === 'login' && <Route index element={<Login />} />}
         
            </Route>
          </>
        ) : (
          <Route path="/" element={<HeaderFooterLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />

            {/* <Route path="/contact" element={<Contact />} /> */}

            <Route path="/cart" element={<CartPage />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;

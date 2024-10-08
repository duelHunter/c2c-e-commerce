import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';
import Login from './pages/Login'; 
import MyStore from './pages/MyStore';
// import About from './pages/About'; 
// import Contact from './pages/Contact';
import HeaderFooterLayout from './components/HeaderFooterLayout';
import EmptyLayout from './components/EmptyLayout';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<EmptyLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<HeaderFooterLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path='/mystore' element={ <MyStore/>} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;

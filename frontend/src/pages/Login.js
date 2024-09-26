// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../firebase';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const siteId = queryParams.get('siteid');
  const coPartnerId = queryParams.get('co_partnerId');
  const usingSSL = queryParams.get('UsingSSL');
  const rv4 = queryParams.get('rv4');
  // const ru = queryParams.get('ru');
  const signInUrl = queryParams.get('signInUrl');

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const jwtResponse = await axios.post('http://localhost:5000/api/auth/login', {
        idToken: idToken,

      });
      const{ token } = jwtResponse.data;
      console.log(token); 
      console.log(jwtResponse);

      // document.cookie = `marketpulsetoken=${token}; domain=.localhost; path=/; SameSite=None`;
      
      localStorage.setItem('marketpulsetoken', token);
      //redirect to home page
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const jwtResponse = await axios.post('http://localhost:5000/api/auth/login', {
        idToken: idToken,

      });
      const{ token } = jwtResponse.data;
      console.log(token); 
/////////////////////////////////////////////////
      // document.cookie = `token=${token}; domain=.127.0.0.1:3000; path=/; SameSite=Lax`;
      localStorage.setItem('marketpulsetoken', token);
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  useEffect(() => {
    console.log({ siteId, coPartnerId, usingSSL, rv4, signInUrl });
  }, [siteId, coPartnerId, usingSSL, rv4, signInUrl]);

  return (
    <div className="signup-container">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="name@company.com" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300
                   text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                     dark:focus:border-blue-500" value={formData.password} onChange={handleInputChange} required />
                </div>

                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4
                 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Login
                </button>
              </form>
              <button onClick={handleGoogleLogin} type="button" className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none
                 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center
                  dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                  <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                </svg>
                Login in with Google
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet? <a href="http://localhost:3000/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbyzMozMlPmtMafFa2WKkESrQUVBQfSW8",
  authDomain: "market-pulse-2b2d3.firebaseapp.com",
  projectId: "market-pulse-2b2d3",
  storageBucket: "market-pulse-2b2d3.appspot.com",
  messagingSenderId: "858771054169",
  appId: "1:858771054169:web:b846ac6e83dc9265bf5b48",
  measurementId: "G-X0WKF6ZSY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

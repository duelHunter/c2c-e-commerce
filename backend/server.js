const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");
const helmet = require('helmet');
const path = require('path');

dotenv.config(); 

const app = express();

// Set COOP header to 'same-origin'
app.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin' }));

app.use(cors({
  // allow to frontend URL
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to set COOP header
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
// Middleware
app.use(express.json());

//connect the mongodb connection
connectDB();

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/// Routes///
app.use('/api/auth',require('./routes/userRoute'));
app.use('/api/product', require('./routes/productRoute'));
app.use('/api/cart', require('./routes/cartRoute'));
app.use('/api/payment', require('./routes/paymentRoute'));
app.use('/api/wishlist', require('./routes/wishlistRoute'));

const PORT = process.env.PORT || 5000;
// console.log(process.env.MONGO_URI);

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle port already in use error gracefully
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error(`Please either:`);
    console.error(`  1. Stop the process using port ${PORT}`);
    console.error(`  2. Or change the PORT in your .env file\n`);
    console.error(`To find and kill the process on Windows:`);
    console.error(`  netstat -ano | findstr :${PORT}`);
    console.error(`  taskkill /PID <PID> /F\n`);
    process.exit(1);
  } else {
    throw error;
  }
});

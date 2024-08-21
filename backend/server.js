const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");
const helmet = require('helmet');

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

/// Routes///
app.use('/api/auth',require('./routes/userRoute'));

const PORT = process.env.PORT || 5000;
// console.log(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

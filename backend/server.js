const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");

dotenv.config(); 

const app = express();

app.use(cors({
  // allow to frontend URL
  origin: 'http://signup.localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
// Middleware
app.use(express.json());

//connect the mongodb connection
connectDB();

/// Routes///
app.use('/api/auth',require('./routes/userRoute'));

const PORT = process.env.PORT || 5000;
// console.log(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

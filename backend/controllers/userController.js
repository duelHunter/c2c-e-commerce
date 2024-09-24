const User = require('../models/User');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
    console.log("Register request received");
    const { idToken, username } = req.body;
    console.log(`ID Token: ${idToken}, Username: ${username}`);

    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log("Decoded token:", decodedToken);
        const { uid, email } = decodedToken;

        // Check if the user exists
        let user = await User.findOne({ firebaseUID: uid });

        if (!user) {
            // Create a new user
            user = new User({ firebaseUID: uid, email, username });
            await user.save();
        }

        // Create JWT token
        const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { idToken } = req.body;

    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email } = decodedToken;

        // Check if the user exists
        let user = await User.findOne({ firebaseUID: uid });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create JWT token
        const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(400).json({ error: error.message });
    }
};

let blacklist = new Set();

exports.logoutUser = asyncHandler(async (req, res) => {

    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    // const token = req.cookies.marketpulsetoken;
    console.log(`Token received for logout: ${token}`);

    if (token) {
        try {
            // Verify token
            jwt.verify(token, JWT_SECRET);

            // Add token to blacklist
            blacklist.add(token);

            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Error in logoutUser:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(400).json({ message: 'Token is missing' });
    }
});


//=======================================================get profile details
exports.getProfileDetails = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    console.log(id);
    //calling to a util function
    validateMongoDbId(id);
  
    try {
      const userDetails = await User.findById(id);
      res.json(userDetails);
    } catch (error) {
      throw new Error(error);
    }
  });

//======================================================update Profile Details
exports.updateProfileDetails = asyncHandler(async (req, res, next) => {
  console.log(req.body);
    const { id } = req.user;
    validateMongoDbId(id);
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          email: req?.body?.email,
          username: req?.body?.username,
          address: req?.body?.address,
          mobileNo: req?.body?.mobileNo,
          cart: req?.body?.cart,

        },
        {
          new: true,
        }
      ).select("-firebaseUID -cart");//dont return sensitive data to frontend
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });
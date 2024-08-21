const User = require('../models/User');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');

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
    // Extract token from cookies======////req.cookies.marketpulsetoken || 
    const token = req.headers.authorization?.split(' ')[1];
    // const token = req.cookies.marketpulsetoken;
    console.log(`Token received for logout: ${token}`);

    if (token) {
        try {
            // Verify token
            jwt.verify(token, JWT_SECRET);

            // Add token to blacklist
            blacklist.add(token);

            // Optionally, expire the token immediately by setting an expiration date in the past
            res.cookie('marketpulsetoken', '', { expires: new Date(0), path: '/' });

            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Error in logoutUser:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(400).json({ message: 'Token is missing' });
    }
});

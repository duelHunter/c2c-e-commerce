const User = require('../models/User');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');
const dotenv = require('dotenv');



dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


exports.registerUser = async (req, res)=>{
    console.log("message got successfully");
    const { idToken, username } = req.body;
    console.log(idToken, username);
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      console.log("decodedToken is ", decodedToken);
      const { uid, email } = decodedToken;
  
      let user = await User.findOne({ firebaseUID: uid });
  
      if (!user) {
        user = new User({ firebaseUID: uid, email, username });
        await user.save();
      }
  
      // Create JWT token
      const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '300s' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { idToken } = req.body;

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, email } = decodedToken;
  
      let user = await User.findOne({ firebaseUID: uid });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Create JWT token
      const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '300s' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}


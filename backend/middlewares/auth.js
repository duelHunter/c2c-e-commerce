const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { isBlacklisted } = require('../utils/tokenBlacklist');

dotenv.config();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Check if token is blacklisted
  if (isBlacklisted(token)) {
    return res.status(401).json({ msg: 'Token has been invalidated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authenticateToken;

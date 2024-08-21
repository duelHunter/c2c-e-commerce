const {registerUser, loginUser, logoutUser} = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// router.post("/cart", authenticateToken, kkk);

// Example protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
  });

module.exports = router;



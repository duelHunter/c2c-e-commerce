const {
  registerUser, 
  loginUser, 
  logoutUser, 
  getProfileDetails, 
  updateProfileDetails,
  deleteAccount,
} = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticateToken, getProfileDetails);
router.put("/updateProfileDetails", authenticateToken, updateProfileDetails);
router.delete("/deleteAccount", authenticateToken, deleteAccount);

router.post("/isLogedin", authenticateToken, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

// Example protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
  });

module.exports = router;



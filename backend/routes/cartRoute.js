const express = require("express");
const router = express.Router();
const {createCart, getCart, removeCartItem, updateCartItem} = require('../controllers/cartController');
// const authenticateToken = require("../middlewares/auth");

router.post("/createCart", createCart);
router.delete('/removeItem', removeCartItem);
router.get('/getCart/:userId', getCart);
router.put('/updateCartItem', updateCartItem);
module.exports = router;

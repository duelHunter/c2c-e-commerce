const express = require("express");
const router = express.Router();
const {createCart, removeCartItem} = require('../controllers/cartController');
// const authenticateToken = require("../middlewares/auth");

router.post("/createCart", createCart);
router.delete('/:userId/product/:productId', removeCartItem);

module.exports = router;

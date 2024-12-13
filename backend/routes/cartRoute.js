const express = require("express");
const router = express.Router();
const {createCart} = require('../controllers/cartController');
// const authenticateToken = require("../middlewares/auth");

router.post("/createCart", createCart);



module.exports = router;

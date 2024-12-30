const express = require('express');
const router = express.Router();
const {createPayment} = require('../controllers/paymentController');

router.post("/create-payment-intent", createPayment);

module.exports = router;

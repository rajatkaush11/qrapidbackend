// order.router.js
const express = require('express');
const router = express.Router();
const OrderController = require('../controller/order.controller');

router.post('/orders', OrderController.createOrder);

module.exports = router;

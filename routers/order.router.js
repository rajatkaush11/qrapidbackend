const express = require('express');
const { createOrder } = require('../controllers/order.controller');
const router = express.Router();

// POST /orders - Create a new order
router.post('/orders', createOrder);

module.exports = router;

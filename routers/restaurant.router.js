const express = require('express');
const router = express.Router();
const RestaurantController = require('../controller/restaurant.controller');

// Endpoint for creating a restaurant
router.post('/restaurant', RestaurantController.createRestaurant);

module.exports = router;

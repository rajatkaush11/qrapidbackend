const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const RestaurantController = require('../controller/restaurant.controller');

// Create a new restaurant
router.post('/', authenticate, RestaurantController.createRestaurant);

// Get restaurant by user
router.get('/', authenticate, RestaurantController.getRestaurantByUser);

module.exports = router;

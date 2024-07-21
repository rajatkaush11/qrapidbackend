const express = require('express');
const router = express.Router();
const RestaurantController = require('../controller/restaurant.controller');

// No authentication middleware used here
router.post('/', RestaurantController.createRestaurant);
router.get('/', RestaurantController.getRestaurantByUser);

module.exports = router;

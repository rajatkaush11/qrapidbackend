// routers/restaurant.router.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const RestaurantController = require('../controller/restaurant.controller');

router.post('/', authenticate, RestaurantController.createRestaurant);
router.get('/', authenticate, RestaurantController.getRestaurantByUser);

module.exports = router;

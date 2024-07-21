const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const RestaurantController = require('../controllers/restaurant.controller');

router.post('/restaurants', authenticate, RestaurantController.createRestaurant);
router.get('/restaurants', authenticate, RestaurantController.getRestaurantByUser);

module.exports = router;

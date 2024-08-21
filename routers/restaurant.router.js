const express = require('express');
const router = express.Router();
const RestaurantController = require('../controller/restaurant.controller');

router.post('/restaurant', RestaurantController.createRestaurant);
router.get('/restaurant/:uid', RestaurantController.getRestaurantByUid);

module.exports = router;

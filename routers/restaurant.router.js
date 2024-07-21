const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');
const RestaurantController = require('../controller/restaurant.controller');

router.post('/restaurants', authenticate, upload.single('image'), RestaurantController.createRestaurant);
router.get('/restaurants', authenticate, RestaurantController.getRestaurantByUser);

module.exports = router;

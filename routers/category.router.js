const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const CategoryController = require('../controller/category.controller');

router.post('/', authenticate, CategoryController.createCategory);
router.get('/categories/:restaurantId', authenticate, CategoryController.getCategoriesByRestaurant);
router.get('/items/:categoryId', authenticate, CategoryController.getItemsByCategory);

module.exports = router;

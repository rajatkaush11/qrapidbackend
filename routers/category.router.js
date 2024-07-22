const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const CategoryController = require('../controller/category.controller');

router.post('/categories', authenticate, CategoryController.createCategory);
router.get('/categories', authenticate, CategoryController.getCategoriesByUser);
router.put('/categories/:id', authenticate, CategoryController.updateCategory); // Ensure the route is correct

module.exports = router;
